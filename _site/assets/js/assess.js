// =============================================================================
// PAYMENT ASSESSMENT TOOL — client-side, no server required
// =============================================================================

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Questions
  // ---------------------------------------------------------------------------

  var QUESTIONS = [
    {
      id: 1, key: 'businessType',
      question: 'What is your business type?',
      type: 'select',
      options: ['OTA (Online Travel Agency)', 'Hotel / Accommodation', 'Tour Operator', 'Airline', 'Activity / Experience Booking', 'E-commerce', 'Marketplace', 'Other']
    },
    {
      id: 2, key: 'countriesCurrencies',
      question: 'What countries do you sell in, and what currencies do you accept?',
      type: 'textarea',
      placeholder: 'e.g. Singapore (SGD), Malaysia (MYR), Thailand (THB)...'
    },
    {
      id: 3, key: 'paymentMethods',
      question: 'What payment methods do you currently offer?',
      type: 'multiselect',
      options: ['Credit / Debit Cards', 'Digital Wallets (GrabPay, Touch\'n Go, etc.)', 'BNPL (Buy Now Pay Later)', 'Crypto', 'Bank Transfer / Direct Debit', 'Cash on Delivery']
    },
    {
      id: 4, key: 'currentPSPs',
      question: 'Who are your current PSPs / payment gateways?',
      type: 'text',
      placeholder: 'e.g. Stripe, Adyen, 2C2P, iPay88...'
    },
    {
      id: 5, key: 'monthlyVolume',
      question: 'What is your approximate monthly transaction volume (USD)?',
      type: 'select',
      options: ['Under $10K', '$10K \u2013 $50K', '$50K \u2013 $100K', '$100K \u2013 $500K', '$500K \u2013 $1M', 'Over $1M']
    },
    {
      id: 6, key: 'approvalRate',
      question: 'What is your current payment approval / success rate?',
      type: 'select',
      options: ['Below 70%', '70 \u2013 79%', '80 \u2013 89%', '90 \u2013 94%', '95% or above', "I don't know"]
    },
    {
      id: 7, key: 'abandonmentRate',
      question: 'What is your average cart abandonment rate at checkout?',
      type: 'select',
      options: ['Below 40%', '40 \u2013 60%', '60 \u2013 80%', 'Above 80%', "I don't know"]
    },
    {
      id: 8, key: 'localPaymentMethods',
      question: 'Do you offer local payment methods for each market you sell in?',
      type: 'yes_no'
    },
    {
      id: 9, key: 'chargebackRate',
      question: 'What is your current chargeback rate?',
      type: 'select',
      options: ['Below 0.5%', '0.5 \u2013 1%', '1 \u2013 2%', 'Above 2%', "I don't know"]
    },
    {
      id: 10, key: 'fallbackMechanism',
      question: 'Do you have a payment fallback / retry mechanism if a transaction fails?',
      type: 'yes_no'
    },
    {
      id: 11, key: 'painPoints',
      question: 'What are your top pain points with your current payment setup?',
      type: 'textarea',
      placeholder: 'e.g. high decline rates, limited local payment options, slow payouts, complex reconciliation...'
    }
  ];

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  var state = {
    screen: 'welcome',
    lead: {},
    answers: {},
    qIndex: 0
  };

  // ---------------------------------------------------------------------------
  // Scoring
  // ---------------------------------------------------------------------------

  function clamp(n) { return Math.max(1, Math.min(10, n)); }

  function hasMultiplePSPs(a) {
    var p = (a.currentPSPs || '').toLowerCase();
    return p.indexOf(',') !== -1 || p.indexOf(' and ') !== -1;
  }

  function scoreCoverage(a) {
    var s = 5;
    if (a.localPaymentMethods === 'yes') s += 3;
    else if (a.localPaymentMethods === 'no') s -= 2;
    var m = (a.paymentMethods || '').toLowerCase();
    if (m.indexOf('wallet') !== -1) s += 1;
    if (m.indexOf('bnpl') !== -1)   s += 1;
    if (m.indexOf('bank') !== -1)   s += 1;
    return clamp(s);
  }

  function scoreRouting(a) {
    var s = 4;
    if (a.fallbackMechanism === 'yes') s += 4; else s -= 1;
    if (hasMultiplePSPs(a)) s += 2;
    return clamp(s);
  }

  function scoreCost(a) {
    var s = 5;
    var v = a.monthlyVolume || '';
    if (v.indexOf('Over') !== -1 || v.indexOf('$1M') !== -1) s += 2;
    else if (v.indexOf('$500K') !== -1 || v.indexOf('$100K') !== -1) s += 1;
    if (hasMultiplePSPs(a)) s += 1;
    return clamp(s);
  }

  function scoreResilience(a) {
    var s = 3;
    if (a.fallbackMechanism === 'yes') s += 5;
    if (hasMultiplePSPs(a)) s += 2;
    return clamp(s);
  }

  function scoreReconciliation(a) {
    var s = 4;
    if (hasMultiplePSPs(a)) s -= 2;
    var v = a.monthlyVolume || '';
    if (v.indexOf('Over') !== -1 || v.indexOf('$1M') !== -1) s += 3;
    return clamp(s);
  }

  function scoreCompliance(a) {
    var s = 6;
    var cb = a.chargebackRate || '';
    if (cb.indexOf('Below 0.5') !== -1) s += 2;
    else if (cb.indexOf('Above 2') !== -1 || cb.indexOf('1 \u2013 2') !== -1) s -= 1;
    var bt = (a.businessType || '').toLowerCase();
    if (bt.indexOf('airline') !== -1 || bt.indexOf('hotel') !== -1) s += 1;
    return clamp(s);
  }

  function getScoreClass(s) {
    if (s >= 8) return 'assess-score--high';
    if (s >= 5) return 'assess-score--mid';
    return 'assess-score--low';
  }

  function getDimensionFinding(dimension, s) {
    var map = {
      Coverage:       ['Missing critical local payment methods for target markets', 'Limited coverage \u2014 expansion opportunities identified', 'Good payment method coverage across markets'],
      Routing:        ['No smart routing logic, single-PSP dependency risk', 'Basic routing setup, optimisation opportunities exist', 'Intelligent routing maximising approval rates'],
      Cost:           ['Processing costs likely not optimised \u2014 rate review needed', 'Moderate cost optimisation, some improvements possible', 'Well-optimised payment cost structure'],
      Resilience:     ['High risk of payment failures \u2014 no backup systems in place', 'Some redundancy exists but gaps in fallback coverage', 'Robust payment resilience with proper fallback mechanisms'],
      Reconciliation: ['Manual reconciliation processes, high operational overhead', 'Semi-automated reconciliation, some manual work remains', 'Streamlined reconciliation across all payment channels'],
      Compliance:     ['Compliance gaps present \u2014 regulatory risk exists', 'Basic compliance met, enhancements recommended', 'Strong compliance posture across all markets']
    };
    var tier = s < 5 ? 0 : s < 8 ? 1 : 2;
    return map[dimension][tier];
  }

  function buildReport() {
    var a = state.answers;
    var scores = {
      Coverage:       scoreCoverage(a),
      Routing:        scoreRouting(a),
      Cost:           scoreCost(a),
      Resilience:     scoreResilience(a),
      Reconciliation: scoreReconciliation(a),
      Compliance:     scoreCompliance(a)
    };

    var total = Object.keys(scores).reduce(function (sum, k) { return sum + scores[k]; }, 0);

    var scorecard = Object.keys(scores).map(function (k) {
      return { label: k, score: scores[k], finding: getDimensionFinding(k, scores[k]) };
    });

    var sorted = scorecard.slice().sort(function (a, b) { return a.score - b.score; });
    var weakest  = [sorted[0].label.toLowerCase(), sorted[1].label.toLowerCase()];
    var strongest = sorted[sorted.length - 1].label.toLowerCase();
    var company   = state.lead.company || 'Your business';

    var summary = company + ' shows strength in ' + strongest + ' but has critical gaps in ' + weakest[0] + ' and ' + weakest[1] + '. Immediate focus on these areas could increase payment conversion by 15\u201325%.';

    // Recommendations
    var recs = [];
    if (scores.Coverage < 7)     recs.push({ n: 1, title: 'Implement Local Payment Methods',  desc: "Add region-specific wallets (GrabPay, Touch'n Go, DANA) to increase conversion in SEA markets.", impact: '+15\u201325% conversion rate' });
    if (scores.Routing < 6)      recs.push({ n: 2, title: 'Deploy Smart Payment Routing',      desc: 'Intelligent routing maximises approval rates and reduces processing costs across PSPs.',        impact: '+8% approval rate, \u221215% processing costs' });
    if (scores.Resilience < 5)   recs.push({ n: 3, title: 'Add Payment Fallback System',       desc: 'Backup PSPs and retry logic prevent revenue loss from payment failures.',                      impact: 'Prevent 3\u20135% revenue loss' });
    if (scores.Cost < 5)         recs.push({ n: 4, title: 'Renegotiate Processing Rates',      desc: 'At your volume, better interchange rates and processing agreements are achievable.',           impact: '\u221210\u201320% processing fees' });
    if (recs.length === 0)       recs.push({ n: 1, title: 'Maintain and Monitor',              desc: 'Your payment setup is strong. Schedule quarterly audits to stay ahead of market changes.',   impact: 'Sustained performance' });
    recs = recs.slice(0, 3);

    // Quick wins
    var wins = [];
    if (a.localPaymentMethods === 'no') wins.push('Enable at least one local wallet per market \u2014 start with GrabPay for Singapore and Malaysia.');
    if (a.fallbackMechanism === 'no')   wins.push('Set up basic payment retry logic for declined transactions \u2014 low effort, immediate impact.');
    if (a.approvalRate && (a.approvalRate.indexOf('70') !== -1 || a.approvalRate.indexOf('Below') !== -1)) wins.push('Optimise 3DS settings to reduce false declines and checkout friction.');
    if (wins.length === 0) wins.push('Schedule a quarterly payment audit to maintain your current strong performance.');

    // Suggested stack
    var countries = (a.countriesCurrencies || '').toLowerCase();
    var bt = (a.businessType || '').toLowerCase();
    var wallets = ['GrabPay (SG/MY)'];
    if (countries.indexOf('indonesia') !== -1) wallets.push('DANA, OVO (ID)');
    if (countries.indexOf('thailand')  !== -1) wallets.push('TrueMoney (TH)');
    if (countries.indexOf('vietnam')   !== -1) wallets.push('MoMo, ZaloPay (VN)');
    if (countries.indexOf('philippines') !== -1) wallets.push('GCash, Maya (PH)');
    var primary = (bt.indexOf('airline') !== -1 || bt.indexOf('hotel') !== -1) ? 'Adyen' : 'Stripe';
    var crossBorder = (bt.indexOf('airline') !== -1 || bt.indexOf('hotel') !== -1) ? 'Sabre Payment Solutions' : 'Adyen';
    var stack = { primary: primary, wallets: wallets.join(', '), crossBorder: crossBorder, fraud: 'Stripe Radar' };

    // Next steps
    var nextSteps;
    if (total < 25)      nextSteps = { label: 'Full Consulting Engagement',  desc: 'Significant gaps require a strategic overhaul. We recommend a 4\u20136 month consulting engagement.' };
    else if (total < 40) nextSteps = { label: 'Integration Project',         desc: 'Focus on routing optimisation and local payment methods. Typical 2\u20133 month implementation.' };
    else                 nextSteps = { label: 'Tactical Improvements',        desc: 'Licensing review for better rates and a compliance audit are recommended. 4\u20136 week engagement.' };

    return { total: total, scorecard: scorecard, summary: summary, recs: recs, wins: wins, stack: stack, nextSteps: nextSteps };
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  function app() { return document.getElementById('assess-app'); }

  function progressBar(pct) {
    return '<div class="assess-progress" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Assessment progress"><div class="assess-progress__fill" style="width:' + pct + '%"></div></div>';
  }

  function on(id, event, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
  }

  function onAll(selector, event, fn) {
    document.querySelectorAll(selector).forEach(function (el) { el.addEventListener(event, fn); });
  }

  // ---------------------------------------------------------------------------
  // Screens
  // ---------------------------------------------------------------------------

  function renderWelcome() {
    app().innerHTML =
      '<div class="assess-welcome">' +
        '<span class="assess-badge">Free \u00b7 No Sign-up Required</span>' +
        '<h1 class="assess-welcome__title">Payment Systems<br>Assessment</h1>' +
        '<p class="assess-welcome__sub">Get a personalised scorecard across 6 payment dimensions in under 5 minutes.</p>' +
        '<ul class="assess-welcome__list">' +
          '<li>Coverage &amp; local payment methods</li>' +
          '<li>Routing &amp; approval rate optimisation</li>' +
          '<li>Cost &amp; fee structure analysis</li>' +
          '<li>Resilience &amp; fallback mechanisms</li>' +
          '<li>Reconciliation efficiency</li>' +
          '<li>Compliance posture</li>' +
        '</ul>' +
        '<button class="btn btn--primary btn--lg" id="assess-start-btn">Start Free Assessment</button>' +
      '</div>';

    on('assess-start-btn', 'click', function () {
      state.screen = 'lead';
      render();
    });
  }

  function renderLead() {
    app().innerHTML =
      progressBar(0) +
      '<div class="assess-card">' +
        '<p class="assess-step-label">Getting started</p>' +
        '<h2 class="assess-card__title">Tell us about yourself</h2>' +
        '<form id="assess-lead-form" class="assess-form" novalidate>' +
          '<div class="form-group">' +
            '<label class="form-label" for="f-company">Company Name <span aria-hidden="true">*</span></label>' +
            '<input class="form-input" type="text" id="f-company" name="company" required placeholder="Your company name" value="' + (state.lead.company || '') + '">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="f-name">Your Name <span aria-hidden="true">*</span></label>' +
            '<input class="form-input" type="text" id="f-name" name="name" required placeholder="Your full name" value="' + (state.lead.name || '') + '">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="f-email">Email Address <span aria-hidden="true">*</span></label>' +
            '<input class="form-input" type="email" id="f-email" name="email" required placeholder="you@company.com" value="' + (state.lead.email || '') + '">' +
          '</div>' +
          '<p class="assess-error" id="assess-error" hidden>Please fill in all fields with a valid email.</p>' +
          '<div class="assess-nav">' +
            '<span></span>' +
            '<button type="submit" class="btn btn--primary">Next &rarr;</button>' +
          '</div>' +
        '</form>' +
      '</div>';

    on('assess-lead-form', 'submit', function (e) {
      e.preventDefault();
      var company = document.getElementById('f-company').value.trim();
      var name    = document.getElementById('f-name').value.trim();
      var email   = document.getElementById('f-email').value.trim();
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var err     = document.getElementById('assess-error');
      if (!company || !name || !emailRe.test(email)) { err.hidden = false; return; }
      err.hidden = true;
      state.lead = { company: company, name: name, email: email };
      state.screen = 'question';
      state.qIndex = 0;
      render();
    });
  }

  function renderQuestion() {
    var q       = QUESTIONS[state.qIndex];
    var total   = QUESTIONS.length;
    var pct     = Math.round(((state.qIndex + 2) / (total + 3)) * 100);
    var saved   = state.answers[q.key] || '';
    var isLast  = state.qIndex === total - 1;

    var inputHtml = '';

    if (q.type === 'select') {
      inputHtml = '<div class="assess-options" role="radiogroup" aria-labelledby="assess-q">' +
        q.options.map(function (opt) {
          var sel = saved === opt;
          return '<label class="assess-option' + (sel ? ' assess-option--selected' : '') + '">' +
            '<input type="radio" name="ans" value="' + opt + '"' + (sel ? ' checked' : '') + '>' +
            '<span>' + opt + '</span></label>';
        }).join('') +
        '</div>';

    } else if (q.type === 'yes_no') {
      inputHtml = '<div class="assess-options assess-options--yesno" role="radiogroup" aria-labelledby="assess-q">' +
        ['Yes', 'No'].map(function (opt) {
          var val = opt.toLowerCase();
          var sel = saved === val;
          return '<label class="assess-option assess-option--lg' + (sel ? ' assess-option--selected' : '') + '">' +
            '<input type="radio" name="ans" value="' + val + '"' + (sel ? ' checked' : '') + '>' +
            '<span>' + opt + '</span></label>';
        }).join('') +
        '</div>';

    } else if (q.type === 'multiselect') {
      var savedArr = saved ? saved.split('|') : [];
      inputHtml = '<div class="assess-options assess-options--multi" role="group" aria-labelledby="assess-q">' +
        q.options.map(function (opt) {
          var sel = savedArr.indexOf(opt) !== -1;
          return '<label class="assess-option' + (sel ? ' assess-option--selected' : '') + '">' +
            '<input type="checkbox" name="ans" value="' + opt + '"' + (sel ? ' checked' : '') + '>' +
            '<span>' + opt + '</span></label>';
        }).join('') +
        '</div>';

    } else if (q.type === 'text') {
      inputHtml = '<input class="form-input" type="text" id="assess-freetext" name="ans" placeholder="' + (q.placeholder || '') + '" value="' + saved + '">';

    } else if (q.type === 'textarea') {
      inputHtml = '<textarea class="form-input form-textarea" id="assess-freetext" name="ans" placeholder="' + (q.placeholder || '') + '" rows="4">' + saved + '</textarea>';
    }

    app().innerHTML =
      progressBar(pct) +
      '<div class="assess-card">' +
        '<p class="assess-step-label">Question ' + (state.qIndex + 1) + ' of ' + total + '</p>' +
        '<h2 class="assess-card__title" id="assess-q">' + q.question + '</h2>' +
        '<form id="assess-q-form" class="assess-form" novalidate>' +
          inputHtml +
          '<p class="assess-error" id="assess-error" hidden>Please select or enter an answer to continue.</p>' +
          '<div class="assess-nav">' +
            '<button type="button" class="btn btn--ghost" id="assess-back-btn">&larr; Back</button>' +
            '<button type="submit" class="btn btn--primary">' + (isLast ? 'See My Results' : 'Next &rarr;') + '</button>' +
          '</div>' +
        '</form>' +
      '</div>';

    // Highlight selected on change
    onAll('.assess-option input', 'change', function (e) {
      var input = e.target;
      if (input.type === 'radio') {
        document.querySelectorAll('.assess-option').forEach(function (l) { l.classList.remove('assess-option--selected'); });
      }
      input.closest('.assess-option').classList.toggle('assess-option--selected', input.checked);
    });

    on('assess-back-btn', 'click', function () {
      if (state.qIndex === 0) { state.screen = 'lead'; } else { state.qIndex--; }
      render();
    });

    on('assess-q-form', 'submit', function (e) {
      e.preventDefault();
      var value = '';
      if (q.type === 'multiselect') {
        var checked = document.querySelectorAll('input[name="ans"]:checked');
        value = Array.from(checked).map(function (c) { return c.value; }).join('|');
      } else if (q.type === 'text' || q.type === 'textarea') {
        var el = document.getElementById('assess-freetext');
        value = el ? el.value.trim() : '';
      } else {
        var radio = document.querySelector('input[name="ans"]:checked');
        value = radio ? radio.value : '';
      }
      var err = document.getElementById('assess-error');
      if (!value) { err.hidden = false; return; }
      err.hidden = true;
      state.answers[q.key] = value;
      if (isLast) { state.screen = 'report'; } else { state.qIndex++; }
      render();
    });
  }

  function renderReport() {
    var r    = buildReport();
    var pct  = Math.round((r.total / 60) * 100);
    var grade = pct >= 75 ? 'Strong' : pct >= 50 ? 'Moderate' : 'Needs Work';

    var scorecardHtml = r.scorecard.map(function (item) {
      var cls = getScoreClass(item.score);
      return '<div class="assess-scorecard__item">' +
        '<div class="assess-scorecard__row">' +
          '<span class="assess-scorecard__label">' + item.label + '</span>' +
          '<span class="assess-scorecard__score ' + cls + '">' + item.score + '/10</span>' +
        '</div>' +
        '<div class="assess-scorecard__track"><div class="assess-scorecard__fill ' + cls + '" style="width:' + (item.score * 10) + '%"></div></div>' +
        '<p class="assess-scorecard__finding">' + item.finding + '</p>' +
      '</div>';
    }).join('');

    var recsHtml = r.recs.map(function (rec) {
      return '<div class="assess-rec">' +
        '<div class="assess-rec__num">' + rec.n + '</div>' +
        '<div class="assess-rec__body">' +
          '<strong class="assess-rec__title">' + rec.title + '</strong>' +
          '<p class="assess-rec__desc">' + rec.desc + '</p>' +
          '<span class="assess-rec__impact">' + rec.impact + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    var winsHtml = r.wins.map(function (w) { return '<li>' + w + '</li>'; }).join('');

    var stackHtml =
      '<div class="assess-stack__item"><span class="assess-stack__label">Primary PSP</span><strong>' + r.stack.primary + '</strong></div>' +
      '<div class="assess-stack__item"><span class="assess-stack__label">Local Wallets</span><strong>' + r.stack.wallets + '</strong></div>' +
      '<div class="assess-stack__item"><span class="assess-stack__label">Cross-Border</span><strong>' + r.stack.crossBorder + '</strong></div>' +
      '<div class="assess-stack__item"><span class="assess-stack__label">Fraud &amp; Risk</span><strong>' + r.stack.fraud + '</strong></div>';

    app().innerHTML =
      progressBar(100) +
      '<div class="assess-report">' +

        '<div class="assess-report__header">' +
          '<span class="assess-badge">Assessment Complete</span>' +
          '<h2 class="assess-report__title">Your Payment Systems Report</h2>' +
          '<p class="assess-report__company">' + state.lead.company + '</p>' +
          '<div class="assess-total-score">' +
            '<div class="assess-total-score__ring">' +
              '<span class="assess-total-score__num">' + r.total + '</span>' +
              '<span class="assess-total-score__denom">/60</span>' +
            '</div>' +
            '<div class="assess-total-score__meta">' +
              '<strong>' + grade + '</strong>' +
              '<span>Overall Score</span>' +
            '</div>' +
          '</div>' +
          '<p class="assess-report__summary">' + r.summary + '</p>' +
        '</div>' +

        '<div class="assess-section">' +
          '<h3 class="assess-section__title">Scorecard</h3>' +
          '<div class="assess-scorecard">' + scorecardHtml + '</div>' +
        '</div>' +

        '<div class="assess-section">' +
          '<h3 class="assess-section__title">Top Recommendations</h3>' +
          '<div class="assess-recs">' + recsHtml + '</div>' +
        '</div>' +

        '<div class="assess-section">' +
          '<h3 class="assess-section__title">Quick Wins</h3>' +
          '<ul class="assess-wins">' + winsHtml + '</ul>' +
        '</div>' +

        '<div class="assess-section">' +
          '<h3 class="assess-section__title">Suggested Payment Stack</h3>' +
          '<div class="assess-stack">' + stackHtml + '</div>' +
        '</div>' +

        '<div class="assess-cta-block">' +
          '<h3 class="assess-cta-block__title">' + r.nextSteps.label + '</h3>' +
          '<p class="assess-cta-block__desc">' + r.nextSteps.desc + '</p>' +
          '<div class="assess-cta-block__actions">' +
            '<a href="/contact/" class="btn btn--primary btn--lg">Book a Consultation</a>' +
            '<a href="/assess/" class="btn btn--ghost">Retake Assessment</a>' +
          '</div>' +
        '</div>' +

      '</div>';
  }

  // ---------------------------------------------------------------------------
  // Router
  // ---------------------------------------------------------------------------

  function render() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if      (state.screen === 'welcome')  renderWelcome();
    else if (state.screen === 'lead')     renderLead();
    else if (state.screen === 'question') renderQuestion();
    else if (state.screen === 'report')   renderReport();
  }

  document.addEventListener('DOMContentLoaded', render);

}());
