// Creative Element — front-end behavior.
// One free-sample form, opened by every CTA on the page (course lesson 10).
(function () {
  'use strict';

  const SERVICES = [
    'Heat-pump installs',
    'Furnace / boiler service',
    'AC tune-ups or installs',
    'Ductless mini-splits',
    'Maintenance plans',
    'Something else',
  ];

  function formHtml(idPrefix) {
    const opts = SERVICES.map((s) => `<option>${s}</option>`).join('');
    return `
      <p class="eyebrow">Free sample ad</p>
      <h2 id="${idPrefix}-title">Get one free sample ad for your business</h2>
      <p class="muted">Tell us a little about your company. We'll reply with five quick questions, use only the details you approve, and send you the ad. No contract.</p>
      <form class="lead" novalidate data-lead-form>
        <div class="two">
          <div class="field"><label for="${idPrefix}-name">Your name</label><input id="${idPrefix}-name" name="name" autocomplete="name" maxlength="80" required><span class="err" data-err="name"></span></div>
          <div class="field"><label for="${idPrefix}-company">Company</label><input id="${idPrefix}-company" name="company" autocomplete="organization" maxlength="120" required><span class="err" data-err="company"></span></div>
        </div>
        <div class="two">
          <div class="field"><label for="${idPrefix}-email">Email</label><input id="${idPrefix}-email" name="email" type="email" autocomplete="email" maxlength="160" required><span class="err" data-err="email"></span></div>
          <div class="field"><label for="${idPrefix}-phone">Phone <span class="muted">(optional)</span></label><input id="${idPrefix}-phone" name="phone" type="tel" autocomplete="tel" maxlength="30"><span class="err" data-err="phone"></span></div>
        </div>
        <div class="two">
          <div class="field"><label for="${idPrefix}-town">Town you're based in</label><input id="${idPrefix}-town" name="town" maxlength="80" required><span class="err" data-err="town"></span></div>
          <div class="field"><label for="${idPrefix}-service">What should the ad promote?</label><select id="${idPrefix}-service" name="service" required><option value="">Choose one</option>${opts}</select><span class="err" data-err="service"></span></div>
        </div>
        <div class="field"><label for="${idPrefix}-message">Anything else? <span class="muted">(optional)</span></label><textarea id="${idPrefix}-message" name="message" rows="3" maxlength="1000"></textarea><span class="err" data-err="message"></span></div>
        <div class="hp" aria-hidden="true"><label for="${idPrefix}-website">Leave this empty</label><input id="${idPrefix}-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="check"><input type="checkbox" name="consent" required> <span>It's OK for Creative Element to email me about my free sample. <span class="muted">We won't add you to a newsletter.</span></span></label>
        <span class="err" data-err="consent"></span>
        <button class="btn" type="submit">Request my free sample</button>
        <p class="form-status" role="status" data-status></p>
      </form>`;
  }

  function clearErrors(form) {
    form.querySelectorAll('[data-err]').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('.field.invalid').forEach((el) => el.classList.remove('invalid'));
  }

  function showErrors(form, errors) {
    Object.entries(errors).forEach(([key, msg]) => {
      const slot = form.querySelector(`[data-err="${key}"]`);
      if (slot) slot.textContent = msg;
      const input = form.querySelector(`[name="${key}"]`);
      if (input && input.closest('.field')) input.closest('.field').classList.add('invalid');
    });
    const first = form.querySelector('.field.invalid input, .field.invalid select');
    if (first) first.focus();
  }

  function clientValidate(data) {
    const errors = {};
    ['name', 'company', 'email', 'town', 'service'].forEach((k) => {
      if (!data[k]) errors[k] = 'Required';
    });
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Check the format';
    if (data.phone && !/^[0-9+().\-\s]{7,30}$/.test(data.phone)) errors.phone = 'Check the format';
    if (!data.consent) errors.consent = 'Please confirm we can contact you about your sample';
    return errors;
  }

  function wireForm(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors(form);
      const status = form.querySelector('[data-status]');
      status.className = 'form-status';
      status.textContent = '';
      const fd = new FormData(form);
      const data = {};
      fd.forEach((v, k) => (data[k] = typeof v === 'string' ? v.trim() : v));
      data.consent = form.querySelector('[name="consent"]').checked;
      data.source = location.pathname.replace(/^\//, '') || 'home';
      const errors = clientValidate(data);
      if (Object.keys(errors).length) return showErrors(form, errors);

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok && body.ok) {
          form.reset();
          status.classList.add('ok');
          status.textContent = "Thanks, got it. We'll email you within one business day with five quick questions.";
        } else if (body.errors) {
          showErrors(form, body.errors);
        } else {
          status.classList.add('bad');
          status.textContent = body.error || 'Something went wrong. Please email hello@creative-element.net.';
        }
      } catch {
        status.classList.add('bad');
        status.textContent = 'Network problem. Please try again or email hello@creative-element.net.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  // Dialog shared by every CTA on the page.
  let dialog;
  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'sample';
    dialog.setAttribute('aria-labelledby', 'dlg-title');
    dialog.innerHTML = `<div class="dialog-inner"><button class="dialog-close" type="button" aria-label="Close">×</button>${formHtml('dlg')}</div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
    wireForm(dialog.querySelector('form'));
    return dialog;
  }

  document.querySelectorAll('[data-open-sample]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (typeof HTMLDialogElement === 'undefined') return; // fall back to /free-sample
      e.preventDefault();
      const d = ensureDialog();
      d.showModal();
      const first = d.querySelector('input[name="name"]');
      if (first) first.focus();
    });
  });

  const inline = document.querySelector('[data-inline-form]');
  if (inline) {
    inline.innerHTML = formHtml('page');
    wireForm(inline.querySelector('form'));
  }

  // Site config: pilot price line (hidden until a real price + honest reason are set).
  fetch('/site.json')
    .then((r) => (r.ok ? r.json() : null))
    .then((cfg) => {
      if (!cfg || !cfg.pilot) return;
      const line = document.querySelector('[data-pilot-line]');
      const reason = document.querySelector('[data-pilot-reason]');
      if (line && cfg.pilot.price && cfg.pilot.quantity && cfg.pilot.days) {
        line.textContent = `Like it? Our pilot is ${cfg.pilot.quantity} finished ads in ${cfg.pilot.days} business days for $${cfg.pilot.price}.`;
      }
      if (reason && cfg.pilot.honestReason) reason.textContent = cfg.pilot.honestReason;
    })
    .catch(() => {});

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // Portfolio grid from /portfolio/manifest.json.
  const grid = document.querySelector('[data-portfolio]');
  if (grid) {
    fetch('/portfolio/manifest.json')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then(({ items = [] }) => {
        grid.innerHTML = items
          .map((it) => {
            const media = it.src
              ? `<video src="${encodeURI(it.src)}" ${it.poster ? `poster="${encodeURI(it.poster)}"` : ''} controls playsinline preload="metadata" aria-label="${esc(it.role)} ad"></video>`
              : `<div class="placeholder">${esc(it.role)} ad<br>in production</div>`;
            return `<article class="work-card">${media}<div class="meta"><div class="role">${esc(it.role)}</div><div class="muted">${esc(it.job)}</div><div class="label">${esc(it.label || 'Demo, fictional business')}</div></div></article>`;
          })
          .join('');
      })
      .catch(() => {});
  }

  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
})();
