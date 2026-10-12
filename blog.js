(() => {
  const posts = Array.isArray(window.PORTFOLIO_BLOG_POSTS) ? window.PORTFOLIO_BLOG_POSTS : [];
  const language = () => {
    const lang = document.documentElement.lang.toLowerCase();
    return lang.startsWith('zh') ? 'zh' : lang === 'id' ? 'id' : 'en';
  };
  const textFor = (value, lang = language()) => typeof value === 'string' ? value : value?.[lang] || value?.en || '';
  const localeFor = lang => ({ en: 'en-US', zh: 'zh-CN', id: 'id-ID' })[lang];
  const wordsFor = text => {
    const hanCount = (text.match(/\p{Script=Han}/gu) || []).length;
    const nonHan = text.replace(/\p{Script=Han}/gu, ' ');
    const wordCount = (nonHan.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
    return Math.max(1, Math.ceil(hanCount / 400 + wordCount / 220));
  };
  const readTime = (minutes, lang = language()) => {
    if (lang === 'zh') return `${minutes} 分钟阅读`;
    if (lang === 'id') return `${minutes} mnt baca`;
    return `${minutes} min read`;
  };

  function initArchive() {
    const list = document.querySelector('[data-blog-entries]');
    const empty = document.querySelector('[data-blog-empty]');
    const note = document.querySelector('.blog-note');
    const controls = document.querySelector('[data-blog-controls]');
    const filterGroup = document.querySelector('[data-blog-filters]');
    const status = document.querySelector('[data-blog-status]');
    if (!list || !empty || !controls || !filterGroup || !status || !posts.length) return;

    const allLabel = { en: 'All stories', zh: '全部文章', id: 'Semua cerita' };
    const countLabel = (count, lang) => lang === 'zh'
      ? `显示 ${count} 篇文章`
      : lang === 'id' ? `Menampilkan ${count} cerita` : `Showing ${count} ${count === 1 ? 'story' : 'stories'}`;
    const categories = [...new Map(posts.map(post => [post.category?.key, post.category]).filter(([key, value]) => key && value)).values()];
    let active = 'all';

    empty.hidden = true;
    if (note) note.hidden = true;
    controls.hidden = false;

    function makeCard(post, lang) {
      const card = document.createElement('article');
      card.className = 'blog-card';
      card.dataset.category = post.category?.key || '';

      const meta = document.createElement('div');
      meta.className = 'blog-post-meta';
      const date = document.createElement('time');
      date.className = 'blog-date';
      date.dateTime = post.date || '';
      if (post.date) {
        const dateValue = new Date(`${post.date}T12:00:00`);
        date.textContent = Number.isNaN(dateValue.getTime()) ? post.date : new Intl.DateTimeFormat(localeFor(lang), { year: 'numeric', month: 'short', day: 'numeric' }).format(dateValue);
      }
      const category = document.createElement('span');
      category.className = 'blog-category';
      category.textContent = textFor(post.category?.label, lang);
      const minutes = Number(post.readingMinutes) || wordsFor(textFor(post.readingText, 'en'));
      const time = document.createElement('span');
      time.className = 'blog-reading-time';
      time.textContent = readTime(minutes, lang);
      meta.append(date, category, time);

      const copy = document.createElement('div');
      copy.className = 'blog-post-copy';
      const eyebrow = document.createElement('p');
      eyebrow.className = 'blog-post-eyebrow';
      eyebrow.textContent = textFor(post.eyebrow, lang) || textFor(post.category?.label, lang);
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = post.url || '#';
      link.textContent = textFor(post.title, lang);
      heading.append(link);
      const summary = document.createElement('p');
      summary.className = 'blog-summary';
      summary.textContent = textFor(post.summary, lang);
      const read = document.createElement('a');
      read.className = 'blog-read-link';
      read.href = post.url || '#';
      read.append(document.createTextNode(lang === 'zh' ? '阅读文章 ' : lang === 'id' ? 'Baca cerita ' : 'Read story '));
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      read.append(arrow);
      copy.append(eyebrow, heading, summary, read);

      const cover = document.createElement('div');
      cover.className = 'blog-cover';
      cover.setAttribute('aria-hidden', 'true');
      const quote = document.createElement('span');
      quote.className = 'cover-quote';
      quote.textContent = '“';
      const coverText = document.createElement('div');
      const coverCategory = document.createElement('span');
      coverCategory.textContent = textFor(post.category?.label, lang);
      const mark = document.createElement('strong');
      mark.textContent = String(post.issue || '01').padStart(2, '0');
      coverText.append(coverCategory, mark);
      const rule = document.createElement('span');
      rule.className = 'cover-line';
      cover.append(quote, coverText, rule);
      card.append(meta, copy, cover);
      return card;
    }

    function renderFilters(lang) {
      filterGroup.replaceChildren();
      const choices = [{ key: 'all', label: allLabel[lang] }, ...categories.map(category => ({ key: category.key, label: textFor(category.label, lang) }))];
      choices.forEach(choice => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'blog-filter-button';
        button.textContent = choice.label;
        button.dataset.blogFilter = choice.key;
        button.setAttribute('aria-pressed', String(choice.key === active));
        button.classList.toggle('is-active', choice.key === active);
        button.addEventListener('click', () => {
          active = choice.key;
          renderFilters(language());
          renderCards(language());
        });
        filterGroup.append(button);
      });
    }

    function renderCards(lang) {
      list.replaceChildren(...posts.filter(post => active === 'all' || post.category?.key === active).map(post => makeCard(post, lang)));
      status.textContent = countLabel(list.childElementCount, lang);
    }

    renderFilters(language());
    renderCards(language());
    window.addEventListener('portfolio-language-change', () => {
      renderFilters(language());
      renderCards(language());
    });
  }

  function initArticle() {
    const article = document.querySelector('[data-blog-article]');
    const body = article?.querySelector('.article-prose');
    const readNode = article?.querySelector('[data-blog-read-time]');
    const toc = article?.querySelector('[data-blog-toc]');
    if (!article || !body || !readNode || !toc) return;

    const draft = article.hasAttribute('data-blog-draft-template');
    const readFallback = {
      en: 'Added when the story is ready',
      zh: '故事准备好后补充',
      id: 'Diisi saat cerita siap'
    };
    function renderReadTime() {
      readNode.textContent = draft ? readFallback[language()] : readTime(wordsFor(body.innerText || body.textContent));
    }

    function slug(text, index) {
      const value = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
      return value || `section-${index + 1}`;
    }

    const headings = [...body.querySelectorAll('h2, h3')];
    const seen = new Set();
    toc.replaceChildren();
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const base = slug(heading.textContent, index);
        let id = base;
        let suffix = 2;
        while (seen.has(id) || document.getElementById(id)) id = `${base}-${suffix++}`;
        heading.id = id;
      }
      seen.add(heading.id);
      const item = document.createElement('li');
      if (heading.tagName === 'H3') item.className = 'article-toc-subitem';
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      item.append(link);
      toc.append(item);
    });
    if (!headings.length) {
      toc.closest('.article-toc')?.setAttribute('hidden', '');
    } else {
      const links = [...toc.querySelectorAll('a')];
      const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-15% 0px -72% 0px' }) : null;
      headings.forEach(heading => observer?.observe(heading));
    }

    function renderRelated() {
      const section = article.querySelector('[data-related-section]');
      const list = article.querySelector('[data-related-items]');
      if (!section || !list) return;
      const tags = (article.dataset.blogTags || '').split(',').map(tag => tag.trim()).filter(Boolean);
      const related = posts.map(post => ({ post, score: (post.tags || []).filter(tag => tags.includes(tag)).length }))
        .filter(item => item.score > 0 && item.post.slug !== article.dataset.blogSlug)
        .sort((a, b) => b.score - a.score).slice(0, 3);
      list.replaceChildren();
      if (!related.length) {
        section.hidden = true;
        return;
      }
      section.hidden = false;
      related.forEach(({ post }) => {
        const link = document.createElement('a');
        link.className = 'article-related-link';
        link.href = post.url || '#';
        const category = document.createElement('span');
        category.textContent = textFor(post.category?.label, language());
        const title = document.createElement('strong');
        title.textContent = textFor(post.title, language());
        const read = document.createElement('small');
        read.textContent = readTime(Number(post.readingMinutes) || 1, language());
        link.append(category, title, read);
        list.append(link);
      });
    }

    renderReadTime();
    renderRelated();
    window.addEventListener('portfolio-language-change', () => {
      renderReadTime();
      renderRelated();
      [...toc.querySelectorAll('a')].forEach((link, index) => {
        if (headings[index]) link.textContent = headings[index].textContent.trim();
      });
    });
  }

  initArchive();
  initArticle();
})();
