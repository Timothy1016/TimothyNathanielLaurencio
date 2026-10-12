(() => {
  const nav = document.querySelector('.resume-section-nav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);
  if (!sections.length) return;

  let frame = 0;
  function updateCurrentSection() {
    frame = 0;
    const marker = nav.getBoundingClientRect().bottom + 20;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
      else break;
    }
    links.forEach(link => {
      const selected = link.hash === '#' + current.id;
      link.classList.toggle('is-current', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateCurrentSection);
  }

  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateCurrentSection();
})();
