---
layout: page
title: "Contact Us"
label: "Get in Touch"
lead: "We respond to all enquiries within 24 hours. No sales pressure — just a straight conversation about your payment stack."
description: "Contact Ebiya.sg for payment systems consulting. 24-hour response guarantee."
permalink: /contact/
---

<section class="section" aria-labelledby="contact-heading">
  <div class="container">
    <div class="contact-layout">

      <!-- Left: contact info -->
      <div class="contact-panel">
        <div class="guarantee-badge">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          24-hour response guarantee
        </div>

        <div class="contact-detail">
          <div class="contact-detail__icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <div>
            <p class="contact-detail__label">Email</p>
            <p class="contact-detail__value">
              <a href="mailto:{{ site.data.site.email }}">{{ site.data.site.email }}</a>
            </p>
          </div>
        </div>

        <div class="contact-detail">
          <div class="contact-detail__icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.68 10.32 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
          </div>
          <div>
            <p class="contact-detail__label">WhatsApp</p>
            <p class="contact-detail__value">
              <a href="{{ site.data.site.whatsapp }}" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
            </p>
          </div>
        </div>

        <div class="contact-detail">
          <div class="contact-detail__icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.56 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
          </div>
          <div>
            <p class="contact-detail__label">Telegram</p>
            <p class="contact-detail__value">
              <a href="{{ site.data.site.telegram }}" target="_blank" rel="noopener noreferrer">Message on Telegram</a>
            </p>
          </div>
        </div>

        <div class="contact-detail">
          <div class="contact-detail__icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div>
            <p class="contact-detail__label">Location</p>
            <p class="contact-detail__value">{{ site.data.site.address }}</p>
          </div>
        </div>

        <div class="contact-info__actions">
          <a href="{{ site.data.site.whatsapp }}" class="btn btn--primary btn--full" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.68 10.32 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            WhatsApp Us Now
          </a>
          <a href="{{ site.data.site.assessment_url }}" class="btn btn--secondary btn--full" target="_blank" rel="noopener noreferrer">
            Run Free Assessment
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <!-- Replace YOUR_FORM_ID with your Formspree form ID -->
      <div class="contact-form">
        <h2 class="contact-form__title">Send us a message</h2>

        <form
          id="contact-form"
          action="https://formspree.io/f/xwvweokr"
          method="POST"
          novalidate
        >
          <div class="form-grid">

            <div class="form-group">
              <label class="form-label form-label--required" for="company">Company Name</label>
              <input
                class="form-input"
                type="text"
                id="company"
                name="company"
                placeholder="Acme Travel Pte Ltd"
                required
                autocomplete="organization"
              >
              <span class="form-error" role="alert">This field is required.</span>
            </div>

            <div class="form-group">
              <label class="form-label form-label--required" for="name">Your Name</label>
              <input
                class="form-input"
                type="text"
                id="name"
                name="name"
                placeholder="Jane Smith"
                required
                autocomplete="name"
              >
              <span class="form-error" role="alert">This field is required.</span>
            </div>

            <div class="form-group form-grid--full">
              <label class="form-label form-label--required" for="email">Email Address</label>
              <input
                class="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="jane@example.com"
                required
                autocomplete="email"
              >
              <span class="form-error" role="alert">Please enter a valid email address.</span>
            </div>

            <div class="form-group">
              <label class="form-label form-label--required" for="business_type">Business Type</label>
              <select class="form-select" id="business_type" name="business_type" required>
                <option value="" disabled selected>Select your industry</option>
                <option value="airline">Airline</option>
                <option value="hotel">Hotel / OTA</option>
                <option value="ecommerce">E-commerce</option>
                <option value="marketplace">Marketplace</option>
                <option value="ticketing">Ticketing</option>
                <option value="saas">SaaS</option>
                <option value="other">Other</option>
              </select>
              <span class="form-error" role="alert">Please select a business type.</span>
            </div>

            <div class="form-group">
              <label class="form-label form-label--required" for="volume">Monthly Transaction Volume</label>
              <select class="form-select" id="volume" name="volume" required>
                <option value="" disabled selected>Select a range</option>
                <option value="under_100k">Under $100k</option>
                <option value="100k_500k">$100k – $500k</option>
                <option value="500k_2m">$500k – $2M</option>
                <option value="2m_10m">$2M – $10M</option>
                <option value="over_10m">Over $10M</option>
              </select>
              <span class="form-error" role="alert">Please select a volume range.</span>
            </div>

            <div class="form-group form-grid--full">
              <label class="form-label" for="message">Tell Us About Your Challenges</label>
              <textarea
                class="form-textarea"
                id="message"
                name="message"
                placeholder="e.g. High decline rates in Thailand, want to enable GoPay, looking to reduce processing costs..."
                rows="5"
              ></textarea>
              <p class="form-help">Optional — the more detail you share, the more useful our first response will be.</p>
            </div>

          </div>

          <div class="contact-form__actions">
            <button type="submit" class="btn btn--primary btn--lg" data-submit>
              Send Message
            </button>
            <p class="contact-form__note">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              Your information is kept strictly confidential.
            </p>
          </div>

          <div class="form-message form-message--success" id="form-success" role="alert">
            Message sent. We'll get back to you within 24 hours.
          </div>
          <div class="form-message form-message--error" id="form-error" role="alert">
            Something went wrong. Please email us directly at <a href="mailto:{{ site.data.site.email }}">{{ site.data.site.email }}</a>.
          </div>
        </form>
      </div>

    </div>
  </div>
</section>
