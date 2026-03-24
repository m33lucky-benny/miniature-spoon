/* =============================================================================
   MAIN JS — no inline scripts, no event handler attributes
   ============================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Scroll progress bar
  ----------------------------------------------------------------------- */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      var scrolled = window.scrollY;
      var total    = document.documentElement.scrollHeight - window.innerHeight;
      var pct      = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct + "%";
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     Header scroll state
  ----------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     Mobile nav toggle
  ----------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle  = document.getElementById("nav-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Active nav link
  ----------------------------------------------------------------------- */
  function initActiveNav() {
    var path = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".site-nav__link").forEach(function (link) {
      var href = link.getAttribute("href").replace(/\/$/, "") || "/";
      if (href === path || (href !== "/" && path.startsWith(href))) {
        link.classList.add("is-active");
      }
    });
  }

  /* -----------------------------------------------------------------------
     Intersection observer — fade-up animations
  ----------------------------------------------------------------------- */
  function initFadeUp() {
    if (!("IntersectionObserver" in window)) {
      // Fallback: make all items visible
      document.querySelectorAll(".fade-up").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".fade-up").forEach(function (el) {
      obs.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     FAQ accordion
  ----------------------------------------------------------------------- */
  function initFaq() {
    document.querySelectorAll(".faq-item__question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item    = btn.closest(".faq-item");
        var isOpen  = item.classList.contains("is-open");
        var answer  = item.querySelector(".faq-item__answer");

        // Close all others
        document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
          if (open !== item) {
            open.classList.remove("is-open");
            open.querySelector(".faq-item__question")
                .setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      });
    });
  }

  /* -----------------------------------------------------------------------
     Contact form — Formspree AJAX with graceful fallback
  ----------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var msgSuccess = document.getElementById("form-success");
    var msgError   = document.getElementById("form-error");
    var submitBtn  = form.querySelector("[data-submit]");

    function setFieldError(field, msg) {
      var group = field.closest(".form-group");
      if (!group) return;
      group.classList.add("has-error");
      var errEl = group.querySelector(".form-error");
      if (errEl) errEl.textContent = msg;
      field.classList.add("is-invalid");
    }

    function clearFieldError(field) {
      var group = field.closest(".form-group");
      if (!group) return;
      group.classList.remove("has-error");
      field.classList.remove("is-invalid");
    }

    function validateForm() {
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (field) {
        clearFieldError(field);
        if (!field.value.trim()) {
          setFieldError(field, "This field is required.");
          valid = false;
        }
      });

      var emailField = form.querySelector("[type=email]");
      if (emailField && emailField.value.trim()) {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          setFieldError(emailField, "Please enter a valid email address.");
          valid = false;
        }
      }

      return valid;
    }

    // Clear errors on input
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () { clearFieldError(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      // Hide any previous messages
      if (msgSuccess) msgSuccess.classList.remove("is-visible");
      if (msgError)   msgError.classList.remove("is-visible");

      if (submitBtn) submitBtn.classList.add("is-loading");

      var data = new FormData(form);

      fetch(form.action, {
        method:  "POST",
        body:    data,
        headers: { "Accept": "application/json" }
      })
      .then(function (res) {
        if (submitBtn) submitBtn.classList.remove("is-loading");
        if (res.ok) {
          form.reset();
          if (msgSuccess) msgSuccess.classList.add("is-visible");
          form.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          if (msgError) msgError.classList.add("is-visible");
        }
      })
      .catch(function () {
        if (submitBtn) submitBtn.classList.remove("is-loading");
        if (msgError)  msgError.classList.add("is-visible");
      });
    });
  }

  /* -----------------------------------------------------------------------
     Smooth scroll for anchor links (respects prefers-reduced-motion)
  ----------------------------------------------------------------------- */
  function initSmoothScroll() {
    var prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id     = link.getAttribute("href").slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var offset = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("scroll-padding-top") || "0",
          10
        );
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* -----------------------------------------------------------------------
     Boot
  ----------------------------------------------------------------------- */
  function init() {
    initScrollProgress();
    initHeaderScroll();
    initMobileNav();
    initActiveNav();
    initFadeUp();
    initFaq();
    initContactForm();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
