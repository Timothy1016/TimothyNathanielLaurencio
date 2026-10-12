(() => {
  const messages = {
    en: {
      ready: 'Ready', inUse: 'In use', maintenance: 'Maintenance', available: 'Ready', units: 'units', workspaceReset: 'Sample workspace reset.',
      checkOut: 'Check out', returnItem: 'Return', markReady: 'Mark ready',
      assignedNone: '—', assignedYou: 'Sample user', checkedOut: 'Item checked out in this sample.', returned: 'Item returned in this sample.', markedReady: 'Item marked ready in this sample.',
      noMatches: 'No sample equipment matches this search.', locationMeeting: 'Meeting Room A', locationEvent: 'Event Kit', locationCabinet: 'Media Cabinet', locationShelf: 'Studio Shelf',
      stockLow: 'Low stock', stockOk: 'In stock', inventoryLoaded: 'Inventory sample loaded.', categoryAccessories: 'Accessories', categoryStorage: 'Storage', categoryAdapters: 'Adapters', sale: 'Record sale −1', restock: 'Restock +5',
      saleDone: 'Sample sale recorded; quantity updated.', restockDone: 'Sample restock recorded; quantity updated.',
      keyword: 'KEYWORD', identifier: 'IDENTIFIER', number: 'NUMBER', operator: 'OPERATOR', punctuation: 'PUNCTUATION',
      lexerPass: 'Tokens generated', lexerError: 'Unsupported character', parsePass: 'Declaration passed', parseFail: 'Outside the example grammar',
      noIr: 'No simplified output was generated.', irIntro: 'SIMPLIFIED INTERMEDIATE OUTPUT',
      parserSuccess: 'The example declaration passed the syntax check.', parserFailure: 'Tokens were found, but the declaration does not match the example grammar.', lexerFailure: 'The input contains a character this sample lexer does not support.',
      exampleRestored: 'Example restored.', cartEmpty: 'Your sample cart is empty.', addToOrder: 'Add to sample order',
      decrease: 'Decrease quantity for', increase: 'Increase quantity for', added: 'Added to the sample order.',
      cartCleared: 'Sample cart cleared.', orderReviewed: 'Sample order reviewed; nothing was submitted.', cartReady: 'Sample cart updated.',
      questToDo: 'TO DO', questDone: 'DONE', questProgress: '{count} of 4 missions completed', questStart: 'Choose a mission to begin.', questOneComplete: 'Mission complete. Keep going.', questAllComplete: 'All four missions complete. You have tried each workflow.', questReset: 'Quest progress reset. Choose a mission to begin.'
    },
    zh: {
      ready: '可用', inUse: '使用中', maintenance: '维护中', available: '可用', units: '件', workspaceReset: '示例工作区已重置。',
      checkOut: '借出', returnItem: '归还', markReady: '标记为可用',
      assignedNone: '—', assignedYou: '示例用户', checkedOut: '示例设备已借出。', returned: '示例设备已归还。', markedReady: '示例设备已标记为可用。',
      noMatches: '没有符合搜索条件的示例设备。', locationMeeting: '会议室 A', locationEvent: '活动设备箱', locationCabinet: '媒体柜', locationShelf: '工作室架',
      stockLow: '库存偏低', stockOk: '库存充足', inventoryLoaded: '库存示例已加载。', categoryAccessories: '配件', categoryStorage: '存储', categoryAdapters: '转接器', sale: '记录销售 −1', restock: '补货 +5',
      saleDone: '示例销售已记录，库存数量已更新。', restockDone: '示例补货已记录，库存数量已更新。',
      keyword: '关键字', identifier: '标识符', number: '数字', operator: '运算符', punctuation: '标点符号',
      lexerPass: '已生成词法单元', lexerError: '不支持的字符', parsePass: '声明语句通过', parseFail: '不符合示例语法',
      noIr: '未生成简化输出。', irIntro: '简化的中间输出',
      parserSuccess: '示例声明语句通过了语法检查。', parserFailure: '已找到词法单元，但声明语句不符合示例语法。', lexerFailure: '输入中包含此示例词法分析器不支持的字符。',
      exampleRestored: '已恢复示例。', cartEmpty: '示例购物车为空。', addToOrder: '加入示例订单',
      decrease: '减少数量：', increase: '增加数量：', added: '已加入示例订单。',
      cartCleared: '示例购物车已清空。', orderReviewed: '已查看示例订单；没有提交任何内容。', cartReady: '示例购物车已更新。',
      questToDo: '待完成', questDone: '已完成', questProgress: '已完成 {count} / 4 个任务', questStart: '选择一个任务开始体验。', questOneComplete: '任务完成，继续加油。', questAllComplete: '四个任务全部完成。你已体验所有工作流程。', questReset: '任务进度已重置。选择一个任务开始体验。'
    },
    id: {
      ready: 'Siap', inUse: 'Dipakai', maintenance: 'Dalam perawatan', available: 'Siap', units: 'unit', workspaceReset: 'Workspace contoh direset.',
      checkOut: 'Pinjamkan', returnItem: 'Kembalikan', markReady: 'Tandai siap',
      assignedNone: '—', assignedYou: 'Pengguna contoh', checkedOut: 'Item contoh berhasil dipinjamkan.', returned: 'Item contoh berhasil dikembalikan.', markedReady: 'Item contoh ditandai siap digunakan.',
      noMatches: 'Tidak ada peralatan contoh yang cocok dengan pencarian ini.', locationMeeting: 'Ruang Rapat A', locationEvent: 'Perlengkapan Acara', locationCabinet: 'Lemari Media', locationShelf: 'Rak Studio',
      stockLow: 'Stok menipis', stockOk: 'Stok tersedia', inventoryLoaded: 'Contoh inventaris dimuat.', categoryAccessories: 'Aksesori', categoryStorage: 'Penyimpanan', categoryAdapters: 'Adaptor', sale: 'Catat penjualan −1', restock: 'Tambah stok +5',
      saleDone: 'Penjualan contoh dicatat; jumlah stok diperbarui.', restockDone: 'Penambahan stok contoh dicatat; jumlah diperbarui.',
      keyword: 'KATA KUNCI', identifier: 'IDENTIFIER', number: 'ANGKA', operator: 'OPERATOR', punctuation: 'TANDA BACA',
      lexerPass: 'Token dibuat', lexerError: 'Karakter tidak didukung', parsePass: 'Deklarasi valid', parseFail: 'Di luar tata bahasa contoh',
      noIr: 'Keluaran sederhana tidak dibuat.', irIntro: 'KELUARAN ANTARA SEDERHANA',
      parserSuccess: 'Deklarasi contoh lolos pemeriksaan sintaks.', parserFailure: 'Token ditemukan, tetapi deklarasi tidak sesuai tata bahasa contoh.', lexerFailure: 'Input memuat karakter yang tidak didukung lexer contoh ini.',
      exampleRestored: 'Contoh dipulihkan.', cartEmpty: 'Keranjang contoh masih kosong.', addToOrder: 'Tambahkan ke pesanan contoh',
      decrease: 'Kurangi jumlah', increase: 'Tambah jumlah', added: 'Ditambahkan ke pesanan contoh.',
      cartCleared: 'Keranjang contoh dikosongkan.', orderReviewed: 'Pesanan contoh ditinjau; tidak ada yang dikirim.', cartReady: 'Keranjang contoh diperbarui.',
      questToDo: 'BELUM', questDone: 'SELESAI', questProgress: '{count} dari 4 misi selesai', questStart: 'Pilih misi untuk memulai.', questOneComplete: 'Misi selesai. Lanjutkan.', questAllComplete: 'Semua empat misi selesai. Kamu sudah mencoba setiap alur kerja.', questReset: 'Progres misi direset. Pilih misi untuk memulai.'
    }
  };
  const lang = () => {
    const value = document.documentElement.lang.toLowerCase();
    return value.startsWith('zh') ? 'zh' : value === 'id' ? 'id' : 'en';
  };
  const t = key => messages[lang()][key] || messages.en[key] || key;

  // A small, browser-local quest guides visitors through the four sample workflows.
  const questOrder = ['equipment', 'inventory', 'compiler', 'coffee'];
  const questStorageKey = 'portfolio-project-lab-quest-v1';
  const questSteps = document.querySelectorAll('[data-mission-step]');
  const questProgress = document.getElementById('lab-quest-progress');
  const questFill = document.getElementById('lab-quest-progress-fill');
  const questCount = document.getElementById('lab-quest-count');
  const questSummary = document.getElementById('lab-quest-summary');
  const questLive = document.getElementById('lab-quest-live');
  let questState = {};
  let questNoticeKey = 'questStart';
  if (questProgress) {
    try {
      const savedQuest = JSON.parse(localStorage.getItem(questStorageKey) || '{}');
      questState = Object.fromEntries(questOrder.map(key => [key, savedQuest[key] === true]));
    } catch (error) { questState = {}; }
  }
  function renderQuest(noticeKey) {
    if (!questProgress) return;
    if (noticeKey) questNoticeKey = noticeKey;
    const completed = questOrder.filter(key => questState[key]).length;
    questCount.textContent = completed + ' / ' + questOrder.length;
    questSummary.textContent = t('questProgress').replace('{count}', String(completed));
    questProgress.setAttribute('aria-valuenow', String(completed));
    questFill.style.width = (completed / questOrder.length * 100) + '%';
    questSteps.forEach(step => {
      const key = step.dataset.missionStep;
      const done = questState[key] === true;
      step.classList.toggle('is-complete', done);
      const state = document.getElementById('lab-quest-state-' + key);
      if (state) state.textContent = t(done ? 'questDone' : 'questToDo');
    });
    if (questLive) questLive.textContent = t(questNoticeKey);
  }
  function completeQuestMission(key) {
    if (!questProgress || !questOrder.includes(key) || questState[key]) return;
    questState[key] = true;
    try { localStorage.setItem(questStorageKey, JSON.stringify(questState)); } catch (error) { /* Keep progress for this visit if storage is unavailable. */ }
    const allComplete = questOrder.every(mission => questState[mission]);
    renderQuest(allComplete ? 'questAllComplete' : 'questOneComplete');
  }
  const questReset = document.getElementById('lab-quest-reset');
  if (questReset) questReset.addEventListener('click', () => {
    questState = Object.fromEntries(questOrder.map(key => [key, false]));
    try { localStorage.removeItem(questStorageKey); } catch (error) { /* The in-memory state is still reset. */ }
    renderQuest('questReset');
  });
  renderQuest('questStart');

  // Equipment workflow: all state is in memory and resets with the page.
  const equipmentBody = document.getElementById('equipment-rows');
  if (equipmentBody) {
    const initialEquipment = [
      {id:'EQ-014', name:'Projector PX-01', location:'locationMeeting', state:'available', assigned:false},
      {id:'EQ-022', name:'Wireless Mic Set', location:'locationEvent', state:'inUse', assigned:true},
      {id:'EQ-031', name:'Mirrorless Camera', location:'locationCabinet', state:'maintenance', assigned:false},
      {id:'EQ-037', name:'Tripod Pro', location:'locationShelf', state:'available', assigned:false}
    ];
    let equipment = initialEquipment.map(item => ({...item}));
    let equipmentFeedbackKey = null;
    const search = document.getElementById('equipment-search');
    const filter = document.getElementById('equipment-filter');
    const feedback = document.getElementById('equipment-feedback');
    const stateLabel = state => state === 'available' ? t('available') : state === 'inUse' ? t('inUse') : t('maintenance');
    function renderEquipment() {
      const query = (search.value || '').trim().toLowerCase();
      const selectedState = filter.value;
      const visible = equipment.filter(item => (selectedState === 'all' || item.state === selectedState) && (item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query) || t(item.location).toLowerCase().includes(query)));
      equipmentBody.replaceChildren();
      if (!visible.length) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = t('noMatches');
        row.appendChild(cell);
        equipmentBody.appendChild(row);
        return;
      }
      visible.forEach(item => {
        const row = document.createElement('tr');
        const asset = document.createElement('td');
        const name = document.createElement('strong');
        name.textContent = item.name;
        const location = document.createElement('small');
        location.textContent = item.id + ' · ' + t(item.location);
        asset.append(name, location);
        const stateCell = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = 'state-pill';
        badge.dataset.state = item.state;
        badge.textContent = stateLabel(item.state);
        stateCell.appendChild(badge);
        const assigned = document.createElement('td');
        assigned.textContent = item.assigned ? t('assignedYou') : t('assignedNone');
        const actionCell = document.createElement('td');
        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'table-action';
        action.textContent = item.state === 'available' ? t('checkOut') : item.state === 'inUse' ? t('returnItem') : t('markReady');
        action.setAttribute('aria-label', action.textContent + ' ' + item.name);
        action.addEventListener('click', () => {
          if (item.state === 'available') { item.state = 'inUse'; item.assigned = true; equipmentFeedbackKey = 'checkedOut'; feedback.textContent = t(equipmentFeedbackKey); }
          else if (item.state === 'inUse') { item.state = 'available'; item.assigned = false; equipmentFeedbackKey = 'returned'; feedback.textContent = t(equipmentFeedbackKey); }
          else { item.state = 'available'; item.assigned = false; equipmentFeedbackKey = 'markedReady'; feedback.textContent = t(equipmentFeedbackKey); }
          if (equipmentFeedbackKey === 'checkedOut') completeQuestMission('equipment');
          renderEquipment();
        });
        actionCell.appendChild(action);
        row.append(asset, stateCell, assigned, actionCell);
        equipmentBody.appendChild(row);
      });
    }
    search.addEventListener('input', renderEquipment);
    filter.addEventListener('change', renderEquipment);
    document.getElementById('equipment-reset').addEventListener('click', () => {
      equipment = initialEquipment.map(item => ({...item}));
      search.value = '';
      filter.value = 'all';
      equipmentFeedbackKey = 'workspaceReset'; feedback.textContent = t(equipmentFeedbackKey);
      renderEquipment();
    });
    renderEquipment();
  }

  // Stock workflow: sample sales and restocks only affect this in-memory preview.
  const inventoryList = document.getElementById('inventory-list');
  let refreshInventory = null;
  if (inventoryList) {
    const startingInventory = [
      {id:'P-101', name:'USB-C Hub', category:'Accessories', quantity:8, threshold:3},
      {id:'P-102', name:'Portable SSD 1 TB', category:'Storage', quantity:2, threshold:3},
      {id:'P-103', name:'Laptop Stand', category:'Accessories', quantity:3, threshold:2},
      {id:'P-104', name:'HDMI Adapter', category:'Adapters', quantity:10, threshold:3}
    ];
    let inventory = startingInventory.map(item => ({...item}));
    let inventoryFeedbackKey = 'inventoryLoaded';
    const feedback = document.getElementById('inventory-feedback');
    function renderInventory() {
      const lowCount = inventory.filter(item => item.quantity <= item.threshold).length;
      const unitCount = inventory.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById('inventory-product-count').textContent = String(inventory.length);
      document.getElementById('inventory-low-count').textContent = String(lowCount);
      document.getElementById('inventory-unit-count').textContent = String(unitCount);
      inventoryList.replaceChildren();
      inventory.forEach(item => {
        const card = document.createElement('article');
        card.className = 'inventory-item';
        const detail = document.createElement('div');
        const heading = document.createElement('h3');
        heading.textContent = item.name;
        const sub = document.createElement('p');
        sub.textContent = item.id + ' · ' + t('category' + item.category);
        detail.append(heading, sub);
        const side = document.createElement('div');
        side.className = 'inventory-item-side';
        const badge = document.createElement('span');
        badge.className = 'stock-pill';
        badge.dataset.stock = item.quantity <= item.threshold ? 'low' : 'ok';
        badge.textContent = item.quantity <= item.threshold ? t('stockLow') : t('stockOk');
        const quantity = document.createElement('strong');
        quantity.className = 'inventory-quantity';
        quantity.textContent = String(item.quantity) + ' ' + t('units');
        const actions = document.createElement('div');
        actions.className = 'inventory-actions';
        const sale = document.createElement('button');
        sale.type = 'button'; sale.textContent = t('sale'); sale.disabled = item.quantity < 1;
        sale.setAttribute('aria-label', t('sale') + ' · ' + item.name);
        sale.addEventListener('click', () => { if (item.quantity > 0) { item.quantity -= 1; inventoryFeedbackKey = 'saleDone'; feedback.textContent = t(inventoryFeedbackKey); renderInventory(); } });
        const restock = document.createElement('button');
        restock.type = 'button'; restock.textContent = t('restock');
        restock.setAttribute('aria-label', t('restock') + ' · ' + item.name);
        restock.addEventListener('click', () => { const wasLow = item.quantity <= item.threshold; item.quantity += 5; inventoryFeedbackKey = 'restockDone'; feedback.textContent = t(inventoryFeedbackKey); if (item.id === 'P-102' && wasLow) completeQuestMission('inventory'); renderInventory(); });
        actions.append(sale, restock);
        side.append(badge, quantity, actions);
        card.append(detail, side);
        inventoryList.appendChild(card);
      });
    }
    refreshInventory = renderInventory;
    renderInventory();
    feedback.textContent = t(inventoryFeedbackKey);
  }

  // Restricted browser companion for the C# compiler case study.
  const compilerSource = document.getElementById('compiler-source');
  let compilerHasRun = false;
  function compileSample() {
    const tokenHost = document.getElementById('compiler-tokens');
    if (!compilerSource || !tokenHost) return;
    const source = compilerSource.value;
    const tokenPattern = /[A-Za-z_][A-Za-z0-9_]*|\d+|==|[+*/=;(){}-]/y;
    const tokens = [];
    let index = 0;
    let lexicalError = false;
    while (index < source.length) {
      if (/\s/.test(source[index])) { index += 1; continue; }
      tokenPattern.lastIndex = index;
      const match = tokenPattern.exec(source);
      if (!match) { lexicalError = true; break; }
      const value = match[0];
      let type = 'punctuation';
      if (/^\d+$/.test(value)) type = 'number';
      else if (/^[A-Za-z_]/.test(value)) type = value === 'int' || value === 'return' ? 'keyword' : 'identifier';
      else if (/^[+*/=-]|^==$/.test(value)) type = 'operator';
      tokens.push({value, type});
      index = tokenPattern.lastIndex;
    }
    tokenHost.replaceChildren();
    tokens.forEach(token => {
      const chip = document.createElement('span');
      chip.className = 'compiler-token';
      const value = document.createElement('span'); value.textContent = token.value;
      const kind = document.createElement('small'); kind.textContent = t(token.type);
      chip.append(value, kind); tokenHost.appendChild(chip);
    });
    const lexerState = document.getElementById('compiler-lexer-state');
    const parserState = document.getElementById('compiler-parser-state');
    const ir = document.getElementById('compiler-ir');
    const feedback = document.getElementById('compiler-feedback');
    const supported = /^int\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*\d+(?:\s*[+*/-]\s*\d+)*\s*;$/.test(source.trim());
    lexerState.textContent = lexicalError ? t('lexerError') : t('lexerPass');
    parserState.textContent = lexicalError ? t('parseFail') : supported ? t('parsePass') : t('parseFail');
    parserState.dataset.result = !lexicalError && supported ? 'pass' : 'fail';
    if (!lexicalError && supported) {
      const parts = source.trim().match(/^int\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*;$/);
      ir.textContent = t('irIntro') + '\nDECLARE ' + parts[1] + '\nEVALUATE ' + parts[2] + '\nSTORE result in ' + parts[1];
      feedback.textContent = t('parserSuccess');
      completeQuestMission('compiler');
    } else {
      ir.textContent = t('noIr');
      feedback.textContent = lexicalError ? t('lexerFailure') : t('parserFailure');
    }
    lexerState.dataset.result = lexicalError ? 'fail' : 'pass';
  }
  if (compilerSource) {
    document.getElementById('compiler-run').addEventListener('click', () => { compilerHasRun = true; compileSample(); });
    document.getElementById('compiler-reset').addEventListener('click', () => {
      compilerSource.value = 'int total = 4 + 7;';
      compilerHasRun = false;
      document.getElementById('compiler-tokens').replaceChildren();
      document.getElementById('compiler-lexer-state').textContent = t('ready');
      document.getElementById('compiler-parser-state').textContent = lang() === 'zh' ? '等待输入' : lang() === 'id' ? 'Menunggu input' : 'Waiting for input';
      document.getElementById('compiler-ir').textContent = lang() === 'zh' ? '运行示例解析器以查看简化输出。' : lang() === 'id' ? 'Jalankan parser contoh untuk melihat keluaran sederhana.' : 'Run the sample parser to inspect a simplified output.';
      document.getElementById('compiler-feedback').textContent = t('exampleRestored');
    });
  }

  // Coffee cart: quantity and totals are real interactions, but checkout is a no-op.
  const products = {
    cappuccino: {name:'Cappuccino', price:4.50},
    latte: {name:'Caffè Latte', price:4.75},
    americano: {name:'Americano', price:3.80},
    mocha: {name:'Mocha', price:5.10}
  };
  const cart = Object.create(null);
  const cartLines = document.getElementById('coffee-cart-lines');
  function renderCart() {
    if (!cartLines) return;
    cartLines.replaceChildren();
    const ids = Object.keys(cart).filter(id => cart[id] > 0);
    document.getElementById('coffee-place-order').disabled = ids.length === 0;
    if (!ids.length) {
      const empty = document.createElement('p'); empty.className = 'cart-empty'; empty.textContent = t('cartEmpty'); cartLines.appendChild(empty);
      document.getElementById('coffee-total').textContent = '$0.00';
      return;
    }
    let total = 0;
    ids.forEach(id => {
      const product = products[id];
      const quantity = cart[id];
      const row = document.createElement('div'); row.className = 'cart-demo-line';
      const itemInfo = document.createElement('div');
      const name = document.createElement('strong'); name.textContent = product.name;
      const price = document.createElement('small'); price.textContent = '$' + product.price.toFixed(2) + ' × ' + quantity;
      itemInfo.append(name, price);
      const controls = document.createElement('div'); controls.className = 'cart-demo-controls';
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', t('decrease') + ' ' + product.name);
      minus.addEventListener('click', () => { cart[id] -= 1; if (cart[id] <= 0) delete cart[id]; document.getElementById('coffee-feedback').textContent = t('cartReady'); renderCart(); });
      const count = document.createElement('span'); count.textContent = String(quantity);
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', t('increase') + ' ' + product.name);
      plus.addEventListener('click', () => { cart[id] += 1; document.getElementById('coffee-feedback').textContent = t('cartReady'); renderCart(); });
      controls.append(minus, count, plus); row.append(itemInfo, controls); cartLines.appendChild(row);
      total += product.price * quantity;
    });
    document.getElementById('coffee-total').textContent = '$' + total.toFixed(2);
  }
  document.querySelectorAll('[data-coffee]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.coffee;
    cart[id] = (cart[id] || 0) + 1;
    document.getElementById('coffee-feedback').textContent = products[id].name + ' · ' + t('added');
    renderCart();
  }));
  const clearCart = document.getElementById('coffee-clear');
  if (clearCart) clearCart.addEventListener('click', () => {
    Object.keys(cart).forEach(key => delete cart[key]);
    document.getElementById('coffee-feedback').textContent = t('cartCleared'); renderCart();
  });
  const placeOrder = document.getElementById('coffee-place-order');
  if (placeOrder) placeOrder.addEventListener('click', () => { document.getElementById('coffee-feedback').textContent = t('orderReviewed'); completeQuestMission('coffee'); });
  renderCart();

  window.addEventListener('portfolio-language-change', () => {
    if (equipmentBody) { document.getElementById('equipment-search').dispatchEvent(new Event('input')); if (equipmentFeedbackKey) document.getElementById('equipment-feedback').textContent = t(equipmentFeedbackKey); }
    if (refreshInventory) { refreshInventory(); document.getElementById('inventory-feedback').textContent = t(inventoryFeedbackKey); }
    if (compilerHasRun) compileSample();
    if (cartLines) { document.getElementById('coffee-feedback').textContent = t('cartReady'); renderCart(); }
    renderQuest();
  });
})();
