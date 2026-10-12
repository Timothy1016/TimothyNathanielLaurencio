(() => {
  function setCvLanguage(value) {
    const current = (value || document.documentElement.lang || "en").toLowerCase();
    const language = current.startsWith("zh") ? "zh" : current === "id" ? "id" : "en";
    document.querySelectorAll("[data-cv-en][data-cv-zh][data-cv-id]").forEach((element) => {
      const file = element.getAttribute("data-cv-" + language);
      if (!file) return;
      if (element.tagName === "OBJECT") element.setAttribute("data", file + "#view=FitH");
      else if (element.hasAttribute("href")) element.setAttribute("href", file);
    });
  }
  window.addEventListener("portfolio-language-change", (event) => setCvLanguage(event.detail?.language));
  setCvLanguage();

  const modal = document.getElementById('cvPreviewModal');
  if (!modal) return;
  const dialog = modal.querySelector('.cv-preview-dialog');
  const closeButton = modal.querySelector('.cv-preview-close');
  let returnFocus = null;
  const open = (trigger) => {
    returnFocus = trigger;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cv-preview-open');
    requestAnimationFrame(() => closeButton?.focus());
  };
  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cv-preview-open');
    returnFocus?.focus();
  };
  document.querySelectorAll('[data-cv-preview-trigger]').forEach((button) => {
    button.addEventListener('click', () => open(button));
  });
  modal.querySelectorAll('[data-cv-close]').forEach((button) => button.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('a[href],button:not([disabled]),object.cv-preview-frame')];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
