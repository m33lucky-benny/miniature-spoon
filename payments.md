---
layout: page
title: "Payment Services"
label: "Services"
lead: "End-to-end payment systems consulting for Southeast Asia. From a free diagnostic to full implementation and ongoing optimisation."
description: "Payment systems consulting services for Southeast Asia — free assessment, implementation, and ongoing support."
permalink: /payments/
---

<!-- Services detail -->
<section class="section" id="assessment" aria-labelledby="services-detail-heading">
  <div class="container">
    <div class="section-header section-header--center">
      <p class="section-label">
        <span class="accent-dot" aria-hidden="true"></span>
        Services &amp; Pricing
      </p>
      <h2 class="section-title" id="services-detail-heading">
        The right engagement for <span class="accent">where you are now</span>
      </h2>
    </div>

    <div class="services-layout">
      {% for service in site.data.services %}
      <div class="pricing-card {% if service.featured %}pricing-card--featured{% endif %}">
        {% if service.badge %}
        <span class="pricing-card__badge">{{ service.badge }}</span>
        {% endif %}

        <p class="pricing-card__name">{{ service.name }}</p>

        <div class="pricing-card__price">
          <span class="pricing-card__amount">{{ service.price }}</span>
          <span class="pricing-card__note">{{ service.price_note }}</span>
        </div>

        <p class="pricing-card__desc">{{ service.description }}</p>

        <hr class="pricing-card__divider">

        <ul class="pricing-card__features">
          {% for feat in service.features %}
          <li class="pricing-card__feature">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            {{ feat }}
          </li>
          {% endfor %}
        </ul>

        <div class="pricing-card__cta">
          {% if service.cta_external %}
          <a href="{{ service.cta_url }}" class="btn {% if service.featured %}btn--primary{% else %}btn--secondary{% endif %} btn--full" target="_blank" rel="noopener noreferrer">
            {{ service.cta_label }}
          </a>
          {% else %}
          <a href="{{ service.cta_url | relative_url }}" class="btn {% if service.featured %}btn--primary{% else %}btn--secondary{% endif %} btn--full">
            {{ service.cta_label }}
          </a>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- Payment methods supported -->
<section class="section section--dark" aria-labelledby="methods-heading">
  <div class="container">
    <div class="section-header section-header--center">
      <p class="section-label">
        <span class="accent-dot" aria-hidden="true"></span>
        Payment Methods
      </p>
      <h2 class="section-title" id="methods-heading">
        Every method that <span class="accent">matters in SEA</span>
      </h2>
      <p class="section-body">We cover card networks, regional wallets, bank transfers, QR schemes, and buy-now-pay-later across all six markets.</p>
    </div>

    <div class="payments-methods">
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V10h16v8zm0-10H4V6h16v2z"/></svg>
        <div>
          <p class="method-row__name">Visa / Mastercard / Amex</p>
          <p class="method-row__type">Card networks</p>
        </div>
      </div>
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"/></svg>
        <div>
          <p class="method-row__name">PayNow / DuitNow / PromptPay</p>
          <p class="method-row__type">Real-time bank transfer / QR</p>
        </div>
      </div>
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
        <div>
          <p class="method-row__name">GrabPay / GoPay / GCash / TrueMoney</p>
          <p class="method-row__type">Super-app wallets</p>
        </div>
      </div>
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"/></svg>
        <div>
          <p class="method-row__name">OVO / ShopeePay / Maya / ZaloPay</p>
          <p class="method-row__type">E-wallet / fintech</p>
        </div>
      </div>
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
        <div>
          <p class="method-row__name">Virtual Account / Bank Transfer</p>
          <p class="method-row__type">Indonesia &amp; Philippines</p>
        </div>
      </div>
      <div class="method-row fade-up">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
        <div>
          <p class="method-row__name">QRIS / InstaPay / VNPay</p>
          <p class="method-row__type">National QR schemes</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Compliance -->
<section class="section" aria-labelledby="compliance-heading">
  <div class="container">
    <div class="layout-aside layout-aside--reverse">
      <div class="benefits-grid benefits-grid--align-start">
        <div class="benefit-item fade-up">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          <p class="benefit-item__title">PCI-DSS Guidance</p>
          <p class="benefit-item__body">Practical scope reduction and compliance checklist tailored to your integration architecture.</p>
        </div>
        <div class="benefit-item fade-up">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <p class="benefit-item__title">Local Regulatory Mapping</p>
          <p class="benefit-item__body">MAS, OJK, BOT, BSP, SBV — we map your obligations in each market before you go live.</p>
        </div>
        <div class="benefit-item fade-up">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          <p class="benefit-item__title">Fraud &amp; Risk Framework</p>
          <p class="benefit-item__body">Velocity rules, 3DS configuration, and chargeback response workflows built for SEA fraud patterns.</p>
        </div>
        <div class="benefit-item fade-up">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>
          <p class="benefit-item__title">Chargeback Management</p>
          <p class="benefit-item__body">Dispute workflows, evidence templates, and rate benchmarking to keep you under network thresholds.</p>
        </div>
      </div>
      <div>
        <p class="section-label">
          <span class="accent-dot" aria-hidden="true"></span>
          Compliance &amp; Risk
        </p>
        <h2 class="section-title" id="compliance-heading">
          Risk frameworks built for <span class="accent">SEA realities</span>
        </h2>
        <p class="section-body">
          Payment fraud patterns in Southeast Asia are materially different from Western markets. Account takeover, promo abuse, and first-party fraud require localised rules — not copy-pasted playbooks.
        </p>
        <p class="section-body">
          We build risk frameworks that balance fraud prevention with conversion. Overly aggressive rules cost you good customers; we find the right threshold for your vertical.
        </p>
        <a href="{{ '/contact/' | relative_url }}" class="btn btn--primary btn--lg">
          Discuss your risk setup
        </a>
      </div>
    </div>
  </div>
</section>

{% include cta-block.html %}
