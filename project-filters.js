(() => {
  const section = document.querySelector('.about-projects');
  if (!section) return;

  const buttons = [...section.querySelectorAll('[data-project-filter]')];
  const cards = [...section.querySelectorAll('.about-project-card[data-project-category]')];
  const earlierLinks = [...section.querySelectorAll('.additional-projects [data-project-category]')];
  const earlierDemos = [...section.querySelectorAll('.additional-projects [data-demo-category]')];
  const earlierSection = section.querySelector('.additional-projects');
  const status = section.querySelector('#project-filter-status');
  if (!buttons.length || !status) return;

  const language = () => {
    const lang = document.documentElement.lang.toLowerCase();
    return lang.startsWith('zh') ? 'zh' : lang === 'id' ? 'id' : 'en';
  };
  const statusCopy = {
    en: (count, category) => category === 'all' ? `Showing all ${count} projects` : `Showing ${count} ${count === 1 ? 'project' : 'projects'} in ${({ product: 'Products', research: 'Research', tools: 'Tools' })[category]}`,
    zh: (count, category) => category === 'all' ? `显示全部 ${count} 个项目` : `显示 ${count} 个${({ product: '产品', research: '研究', tools: '工具' })[category]}项目`,
    id: (count, category) => category === 'all' ? `Menampilkan semua ${count} proyek` : `Menampilkan ${count} proyek kategori ${({ product: 'produk', research: 'riset', tools: 'tools' })[category]}`
  };

  function showCategory(category) {
    buttons.forEach(button => {
      const active = button.dataset.projectFilter === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    let count = 0;
    cards.forEach(card => {
      const visible = category === 'all' || card.dataset.projectCategory === category;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    earlierLinks.forEach(link => {
      const visible = category === 'all' || link.dataset.projectCategory === category;
      link.hidden = !visible;
      if (visible) count += 1;
    });
    earlierDemos.forEach(link => {
      link.hidden = category !== 'all' && link.dataset.demoCategory !== category;
    });
    if (earlierSection) earlierSection.hidden = !earlierLinks.some(link => !link.hidden);
    status.textContent = statusCopy[language()](count, category);
  }

  buttons.forEach(button => button.addEventListener('click', () => showCategory(button.dataset.projectFilter)));
  window.addEventListener('portfolio-language-change', () => showCategory(section.querySelector('[aria-pressed="true"]')?.dataset.projectFilter || 'all'));
  showCategory('all');
})();
