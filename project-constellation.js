(() => {
  const root = document.querySelector('.project-constellation');
  if (!root) return;

  const stage = root.querySelector('.constellation-stage');
  const canvas = root.querySelector('.constellation-canvas');
  const nodes = Array.from(root.querySelectorAll('.constellation-node[data-project]'));
  const spokes = Array.from(root.querySelectorAll('.constellation-spoke'));
  const edges = Array.from(root.querySelectorAll('.constellation-edge'));
  const title = root.querySelector('#constellation-selected-title');
  const summary = root.querySelector('#constellation-selected-summary');
  const focus = root.querySelector('#constellation-selected-focus');
  const stack = root.querySelector('#constellation-selected-stack');
  const caseLink = root.querySelector('#constellation-case-link');
  const demoLink = root.querySelector('#constellation-demo-link');
  const selectedIndex = root.querySelector('#constellation-selected-index');
  const zoomValue = root.querySelector('#constellation-zoom');
  const zoomOut = root.querySelector('[data-map-zoom-out]');
  const zoomIn = root.querySelector('[data-map-zoom-in]');
  const resetButton = root.querySelector('[data-map-reset]');
  if (!stage || !canvas || !nodes.length || !title || !summary || !focus || !stack || !caseLink || !demoLink) return;

  const copy = {
    en: {case: 'Case study ↗', sample: 'Try sample demo ↗', live: 'Open live project ↗', research: 'Read research summary ↗'},
    zh: {case: '项目案例 ↗', sample: '试用示例演示 ↗', live: '打开在线项目 ↗', research: '阅读研究摘要 ↗'},
    id: {case: 'Studi kasus ↗', sample: 'Coba demo sampel ↗', live: 'Buka proyek live ↗', research: 'Baca ringkasan riset ↗'}
  };
  const initialPositions = new Map(nodes.map(node => [node.dataset.project, {
    x: node.style.getPropertyValue('--node-x'),
    y: node.style.getPropertyValue('--node-y')
  }]));
  let selected = nodes[0];
  let highlightedProject = null;
  let scale = 1;
  let panX = 0;
  let panY = 0;
  let panPointer = null;
  let dragNode = null;
  let suppressedClick = null;
  const minScale = 0.9;
  const maxScale = 1.5;

  function language() {
    const value = document.documentElement.lang.toLowerCase();
    return value.startsWith('zh') ? 'zh' : value === 'id' ? 'id' : 'en';
  }

  function field(node, name, lang) {
    return node.getAttribute('data-' + name + '-' + lang) || node.getAttribute('data-' + name + '-en') || '';
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function isSmallScreen() {
    return window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  }

  function nodePoint(node) {
    const x = parseFloat(node.style.getPropertyValue('--node-x')) || 50;
    const y = parseFloat(node.style.getPropertyValue('--node-y')) || 50;
    return {x: 900 * x / 100, y: 560 * y / 100};
  }

  function curvePath(start, end, bend = 0) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const offset = length * bend;
    const c1x = start.x + dx * .34 + nx * offset;
    const c1y = start.y + dy * .34 + ny * offset;
    const c2x = end.x - dx * .34 + nx * offset;
    const c2y = end.y - dy * .34 + ny * offset;
    return `M${start.x.toFixed(1)} ${start.y.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  }

  function redrawConnections() {
    if (isSmallScreen()) return;
    const hub = {x: 450, y: 280};
    spokes.forEach((spoke, index) => {
      const node = nodes.find(item => item.dataset.project === spoke.dataset.project);
      if (node) spoke.setAttribute('d', curvePath(hub, nodePoint(node), index % 2 ? -.055 : .055));
    });
    edges.forEach((edge, index) => {
      const from = nodes.find(item => item.dataset.project === edge.dataset.from);
      const to = nodes.find(item => item.dataset.project === edge.dataset.to);
      if (from && to) edge.setAttribute('d', curvePath(nodePoint(from), nodePoint(to), index % 2 ? -.1 : .1));
    });
  }

  function setGraphFocus(projectId) {
    highlightedProject = projectId || null;
    stage.classList.toggle('has-focus', Boolean(highlightedProject));
    if (!highlightedProject) {
      nodes.forEach(node => node.classList.remove('is-related', 'is-dimmed'));
      [...spokes, ...edges].forEach(path => path.classList.remove('is-active', 'is-dimmed'));
      return;
    }

    const related = new Set([highlightedProject]);
    edges.forEach(edge => {
      if (edge.dataset.from === highlightedProject) related.add(edge.dataset.to);
      if (edge.dataset.to === highlightedProject) related.add(edge.dataset.from);
    });
    nodes.forEach(node => {
      const isRelated = related.has(node.dataset.project);
      node.classList.toggle('is-related', isRelated);
      node.classList.toggle('is-dimmed', !isRelated);
    });
    spokes.forEach(path => {
      const active = related.has(path.dataset.project);
      path.classList.toggle('is-active', active);
      path.classList.toggle('is-dimmed', !active);
    });
    edges.forEach(path => {
      const active = path.dataset.from === highlightedProject || path.dataset.to === highlightedProject;
      path.classList.toggle('is-active', active);
      path.classList.toggle('is-dimmed', !active);
    });
  }

  function update(node, focusGraph = true) {
    selected = node;
    const lang = language();
    nodes.forEach(item => {
      const active = item === node;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    root.dataset.selected = node.dataset.project || '';
    if (selectedIndex) {
      const index = nodes.indexOf(node) + 1;
      selectedIndex.textContent = `${String(index).padStart(2, '0')} / ${String(nodes.length).padStart(2, '0')}`;
    }
    title.textContent = field(node, 'title', lang);
    summary.textContent = field(node, 'summary', lang);
    focus.textContent = field(node, 'focus', lang);
    stack.textContent = node.dataset.stack || '';
    caseLink.href = node.dataset.case || '#projects';
    caseLink.textContent = copy[lang].case;
    demoLink.href = node.dataset.demo || node.dataset.case || '#projects';
    const type = node.dataset.demoType || 'sample';
    demoLink.textContent = copy[lang][type] || copy[lang].sample;
    if (type === 'live') {
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
    } else {
      demoLink.removeAttribute('target');
      demoLink.removeAttribute('rel');
    }
    if (focusGraph) setGraphFocus(node.dataset.project);
  }

  function directionalNeighbor(current, key) {
    const origin = current.getBoundingClientRect();
    const ox = origin.left + origin.width / 2;
    const oy = origin.top + origin.height / 2;
    const directions = {
      ArrowLeft: [-1, 0], ArrowRight: [1, 0],
      ArrowUp: [0, -1], ArrowDown: [0, 1]
    };
    const [dx, dy] = directions[key];
    const candidates = nodes.filter(node => node !== current).map(node => {
      const rect = node.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - ox;
      const y = rect.top + rect.height / 2 - oy;
      const primary = x * dx + y * dy;
      const cross = Math.abs(x * dy - y * dx);
      return {node, primary, score: primary > 0 ? primary + cross * 1.5 : Infinity};
    }).filter(item => Number.isFinite(item.score));
    if (candidates.length) return candidates.sort((a, b) => a.score - b.score)[0].node;
    const index = nodes.indexOf(current);
    const forward = key === 'ArrowRight' || key === 'ArrowDown';
    return nodes[(index + (forward ? 1 : nodes.length - 1)) % nodes.length];
  }

  function focusNode(node) {
    update(node);
    try { node.focus({preventScroll: true}); } catch (_) { node.focus(); }
  }

  function applyView() {
    canvas.style.setProperty('--map-scale', scale);
    canvas.style.setProperty('--map-pan-x', `${panX}px`);
    canvas.style.setProperty('--map-pan-y', `${panY}px`);
    if (zoomValue) zoomValue.textContent = `${Math.round(scale * 100)}%`;
    if (zoomOut) zoomOut.disabled = scale <= minScale;
    if (zoomIn) zoomIn.disabled = scale >= maxScale;
  }

  function setZoom(value) {
    scale = clamp(value, minScale, maxScale);
    const maxX = Math.max(0, stage.clientWidth * (scale - 1) / 2);
    const maxY = Math.max(0, stage.clientHeight * (scale - 1) / 2);
    panX = clamp(panX, -maxX, maxX);
    panY = clamp(panY, -maxY, maxY);
    applyView();
  }

  function resetView() {
    scale = 1;
    panX = 0;
    panY = 0;
    nodes.forEach(node => {
      const position = initialPositions.get(node.dataset.project);
      if (!position) return;
      node.style.setProperty('--node-x', position.x);
      node.style.setProperty('--node-y', position.y);
    });
    redrawConnections();
    applyView();
    setGraphFocus(selected?.dataset.project || null);
  }

  function endNodeDrag(event) {
    if (!dragNode || dragNode.pointerId !== event.pointerId) return;
    const wasMoved = dragNode.moved;
    const node = dragNode.node;
    dragNode = null;
    node.classList.remove('is-dragging');
    stage.classList.remove('is-node-dragging');
    if (wasMoved) suppressedClick = {node, expires: performance.now() + 450};
  }

  nodes.forEach(node => {
    node.addEventListener('pointerdown', event => {
      if (isSmallScreen() || event.button !== 0 || event.isPrimary === false) return;
      event.stopPropagation();
      const point = nodePoint(node);
      dragNode = {node, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: point.x / 9, y: point.y / 5.6, moved: false};
      try { node.setPointerCapture(event.pointerId); } catch (_) {}
    });
    node.addEventListener('pointermove', event => {
      if (!dragNode || dragNode.node !== node || dragNode.pointerId !== event.pointerId) return;
      const dx = event.clientX - dragNode.startX;
      const dy = event.clientY - dragNode.startY;
      if (!dragNode.moved && Math.hypot(dx, dy) < 5) return;
      dragNode.moved = true;
      node.classList.add('is-dragging');
      stage.classList.add('is-node-dragging');
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      node.style.setProperty('--node-x', `${clamp(dragNode.x + dx / rect.width * 100, 10, 90)}%`);
      node.style.setProperty('--node-y', `${clamp(dragNode.y + dy / rect.height * 100, 12, 86)}%`);
      redrawConnections();
    });
    node.addEventListener('pointerup', endNodeDrag);
    node.addEventListener('pointercancel', endNodeDrag);
    node.addEventListener('click', event => {
      if (suppressedClick?.node === node && performance.now() < suppressedClick.expires) {
        event.preventDefault();
        event.stopPropagation();
        suppressedClick = null;
        return;
      }
      update(node);
    });
    node.addEventListener('keydown', event => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        focusNode(directionalNeighbor(node, event.key));
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusNode(nodes[0]);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusNode(nodes[nodes.length - 1]);
      }
    });
    node.addEventListener('pointerenter', () => setGraphFocus(node.dataset.project));
    node.addEventListener('pointerleave', () => setGraphFocus(selected?.dataset.project || null));
    node.addEventListener('focus', () => setGraphFocus(node.dataset.project));
    node.addEventListener('blur', () => setGraphFocus(selected?.dataset.project || null));
  });

  stage.addEventListener('pointerdown', event => {
    if (isSmallScreen() || event.button !== 0 || event.target.closest('.constellation-node,.constellation-controls')) return;
    panPointer = {id: event.pointerId, startX: event.clientX, startY: event.clientY, x: panX, y: panY};
    stage.classList.add('is-panning');
    try { stage.setPointerCapture(event.pointerId); } catch (_) {}
    event.preventDefault();
  });
  stage.addEventListener('pointermove', event => {
    if (!panPointer || panPointer.id !== event.pointerId) return;
    panX = panPointer.x + event.clientX - panPointer.startX;
    panY = panPointer.y + event.clientY - panPointer.startY;
    const maxX = Math.max(0, stage.clientWidth * (scale - 1) / 2);
    const maxY = Math.max(0, stage.clientHeight * (scale - 1) / 2);
    panX = clamp(panX, -maxX, maxX);
    panY = clamp(panY, -maxY, maxY);
    applyView();
  });
  function endPan(event) {
    if (panPointer && panPointer.id === event.pointerId) {
      panPointer = null;
      stage.classList.remove('is-panning');
    }
  }
  stage.addEventListener('pointerup', endPan);
  stage.addEventListener('pointercancel', endPan);
  stage.addEventListener('wheel', event => {
    if (isSmallScreen()) return;
    event.preventDefault();
    setZoom(scale * (event.deltaY < 0 ? 1.1 : 1 / 1.1));
  }, {passive: false});
  stage.addEventListener('dragstart', event => event.preventDefault());

  zoomOut?.addEventListener('click', () => setZoom(scale / 1.16));
  zoomIn?.addEventListener('click', () => setZoom(scale * 1.16));
  resetButton?.addEventListener('click', resetView);
  window.addEventListener('portfolio-language-change', () => update(selected, Boolean(highlightedProject)));
  window.addEventListener('resize', redrawConnections);
  if ('ResizeObserver' in window) new ResizeObserver(redrawConnections).observe(stage);

  redrawConnections();
  applyView();
  update(selected, false);
})();
