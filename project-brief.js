(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const steps = [...form.querySelectorAll('[data-brief-step]')];
  const back = form.querySelector('[data-brief-back]');
  const next = form.querySelector('[data-brief-next]');
  const submit = form.querySelector('[data-brief-submit]');
  const whatsapp = form.querySelector('#whatsappBrief');
  const count = form.querySelector('#brief-step-count');
  const progress = form.querySelector('#brief-progress');
  const progressFill = progress?.querySelector('span');
  const status = form.querySelector('#brief-step-status');
  if (steps.length !== 5 || !back || !next || !submit || !count || !progress || !status) return;

  const translations = {
    en: {
      stepNames: ['Project', 'Features', 'Timing', 'Contact', 'Review'],
      featureRequired: 'Choose at least one feature or select “Not sure yet — please advise.”',
      notProvided: 'Not provided', featureNone: 'No features selected'
    },
    zh: {
      stepNames: ['项目', '功能', '时间安排', '联系方式', '确认'],
      featureRequired: '请至少选择一项功能，或选择“尚未确定 — 请给建议”。',
      notProvided: '未填写', featureNone: '尚未选择功能'
    },
    id: {
      stepNames: ['Proyek', 'Fitur', 'Waktu', 'Kontak', 'Tinjau'],
      featureRequired: 'Pilih minimal satu fitur atau pilih “Belum yakin — mohon sarankan.”',
      notProvided: 'Belum diisi', featureNone: 'Belum ada fitur yang dipilih'
    }
  };
  const getLanguage = () => {
    const lang = document.documentElement.lang.toLowerCase();
    return lang.startsWith('zh') ? 'zh' : lang === 'id' ? 'id' : 'en';
  };
  const stepLabel = index => {
    const lang = getLanguage();
    return lang === 'zh'
      ? `第 ${index + 1} 步，共 ${steps.length} 步：${translations[lang].stepNames[index]}`
      : lang === 'id'
        ? `Langkah ${index + 1} dari ${steps.length}: ${translations[lang].stepNames[index]}`
        : `Step ${index + 1} of ${steps.length}: ${translations[lang].stepNames[index]}`;
  };
  let active = 0;

  form.classList.add('is-wizard');
  form.noValidate = true;

  function formValue(id) {
    return document.getElementById(id)?.value?.trim() || '';
  }

  function selectedLabel(id) {
    const select = document.getElementById(id);
    const option = select?.selectedOptions?.[0];
    return option && !option.disabled ? option.textContent.trim() : '';
  }

  function updateReview() {
    const lang = getLanguage();
    const copy = translations[lang];
    const features = [...form.querySelectorAll('input[name="features[]"]:checked')]
      .map(input => input.closest('label')?.querySelector('span')?.textContent.trim() || input.value);
    const values = {
      topic: selectedLabel('topic'),
      goal: formValue('goal'),
      features: features.join(', '),
      featureNotes: formValue('featureNotes'),
      timeline: selectedLabel('timeline'),
      budget: selectedLabel('budget'),
      reference: formValue('reference'),
      name: formValue('name'),
      email: formValue('email')
    };

    form.querySelectorAll('[data-review-value]').forEach(node => {
      const key = node.dataset.reviewValue;
      const value = values[key] || (key === 'features' ? copy.featureNone : copy.notProvided);
      node.replaceChildren();
      if (key === 'reference' && values.reference) {
        try {
          const url = new URL(values.reference);
          if (url.protocol === 'https:' || url.protocol === 'http:') {
            const link = document.createElement('a');
            link.href = url.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = values.reference;
            node.append(link);
            return;
          }
        } catch (_) {}
      }
      node.textContent = value;
    });
  }

  function renderStep(shouldFocus = false) {
    if (active === steps.length - 1) updateReview();
    steps.forEach((step, index) => {
      step.hidden = index !== active;
      step.setAttribute('aria-hidden', String(index !== active));
    });
    back.hidden = active === 0;
    next.hidden = active === steps.length - 1;
    submit.hidden = active !== steps.length - 1;
    if (whatsapp) whatsapp.hidden = active !== steps.length - 1;
    count.textContent = stepLabel(active);
    status.textContent = stepLabel(active);
    progress.setAttribute('aria-valuemax', String(steps.length));
    progress.setAttribute('aria-valuenow', String(active + 1));
    progress.setAttribute('aria-valuetext', stepLabel(active));
    progressFill.style.width = `${((active + 1) / steps.length) * 100}%`;
    if (shouldFocus) {
      const heading = steps[active].querySelector('h3');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
  }

  function stepIssue(index) {
    if (index === 1) {
      const featureInputs = [...steps[index].querySelectorAll('input[name="features[]"]')];
      const first = featureInputs[0];
      if (first) first.setCustomValidity('');
      if (featureInputs.length && !featureInputs.some(field => field.checked)) {
        return { field: first, message: translations[getLanguage()].featureRequired };
      }
    }
    const fields = [...steps[index].querySelectorAll('input, select, textarea')];
    const invalid = fields.find(field => field.willValidate && !field.checkValidity());
    return invalid ? { field: invalid } : null;
  }

  function validateStep(index) {
    const issue = stepIssue(index);
    if (!issue) return true;
    if (issue.message) issue.field.setCustomValidity(issue.message);
    issue.field.reportValidity();
    issue.field.focus({ preventScroll: true });
    return false;
  }

  next.addEventListener('click', () => {
    if (!validateStep(active)) return;
    active = Math.min(active + 1, steps.length - 1);
    renderStep(true);
  });
  back.addEventListener('click', () => {
    active = Math.max(active - 1, 0);
    renderStep(true);
  });
  form.querySelectorAll('[data-brief-edit]').forEach(button => {
    button.addEventListener('click', () => {
      const target = Number(button.dataset.briefEdit);
      if (!Number.isInteger(target) || target < 0 || target > 3) return;
      active = target;
      renderStep(true);
    });
  });
  form.addEventListener('submit', event => {
    if (active !== steps.length - 1) {
      event.preventDefault();
      if (!validateStep(active)) return;
      active = Math.min(active + 1, steps.length - 1);
      renderStep(true);
      return;
    }
    for (let index = 0; index < steps.length - 1; index += 1) {
      const issue = stepIssue(index);
      if (!issue) continue;
      event.preventDefault();
      active = index;
      renderStep(false);
      if (issue.message) issue.field.setCustomValidity(issue.message);
      issue.field.reportValidity();
      issue.field.focus({ preventScroll: true });
      return;
    }
  });
  window.addEventListener('portfolio-language-change', () => renderStep(false));
  renderStep();
})();
