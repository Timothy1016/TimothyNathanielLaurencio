(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isZh = () => document.documentElement.lang.toLowerCase().startsWith('zh');
  const isId = () => document.documentElement.lang.toLowerCase() === 'id';
  const idCopy = {
    'Homepage guide':'Panduan beranda','This homepage is evidence-first: public projects, engineering capabilities, academic work, services, and a direct contact path.':'Beranda ini mengutamakan bukti: proyek publik, kemampuan rekayasa, karya akademik, layanan, dan jalur kontak langsung.',
    'If you are reviewing Timothy for a role or research opportunity, start with Selected Work. EquipmentHub is the fastest project to inspect because it has a public repository and live site.':'Jika Anda meninjau Timothy untuk peluang kerja atau riset, mulailah dari Proyek Pilihan. EquipmentHub paling cepat ditinjau karena memiliki repositori publik dan situs aktif.',
    'See selected work':'Lihat proyek pilihan','About page guide':'Panduan halaman tentang','This page explains the background behind the portfolio: Computer Science, teaching, community work, learning, and how those experiences shaped the way Timothy builds.':'Halaman ini menjelaskan latar belakang portofolio: Ilmu Komputer, mengajar, kegiatan komunitas, pembelajaran, dan pengaruhnya terhadap cara Timothy membangun produk.',
    'Read this page for context and personality. If you need a faster professional scan, the online resume is more concise.':'Baca halaman ini untuk memahami latar belakang dan kepribadian. Untuk tinjauan profesional yang cepat, gunakan CV online yang lebih ringkas.','Open resume':'Buka CV',
    'Journey page guide':'Panduan halaman perjalanan','Journey is the chronological version of the story. It connects education, tutoring, community responsibilities, project work, and the next academic chapter.':'Journey menyajikan kisah secara kronologis, menghubungkan pendidikan, kegiatan mengajar, tanggung jawab komunitas, proyek, dan rencana akademik berikutnya.',
    'Use the chapters to understand progression rather than individual achievements. For technical proof, jump back to Selected Work.':'Gunakan bagian-bagiannya untuk memahami perkembangan, bukan hanya pencapaian terpisah. Untuk bukti teknis, lihat kembali Proyek Pilihan.',
    'Research page guide':'Panduan halaman riset','This page summarizes Timothy’s academic work on energy-efficient resource scheduling in 5G and the research direction he wants to develop further.':'Halaman ini merangkum karya akademik Timothy tentang penjadwalan sumber daya 5G hemat energi dan arah riset yang ingin dikembangkan.',
    'Start with the research question and method, then use the contact page if you want to discuss the work, graduate study, or collaboration.':'Mulailah dari pertanyaan dan metode riset. Gunakan halaman kontak untuk berdiskusi tentang karya ini, studi pascasarjana, atau kolaborasi.','Discuss research':'Diskusikan riset',
    'Resume guide':'Panduan CV','This is the scan-friendly version of Timothy’s profile: education, selected projects, academic work, experience, skills, and links to evidence.':'Ini versi profil Timothy yang mudah ditinjau: pendidikan, proyek pilihan, karya akademik, pengalaman, keterampilan, dan tautan pendukung.',
    'Use the online version for quick review. Use Download PDF when you need the conventional CV format.':'Gunakan versi online untuk tinjauan cepat. Unduh PDF jika membutuhkan format CV konvensional.','Contact Timothy':'Hubungi Timothy',
    'Services guide':'Panduan layanan','This page explains the website work Timothy takes on, what is normally included, and where the project scope should stay intentionally small and focused.':'Halaman ini menjelaskan jenis proyek website yang dikerjakan Timothy, cakupan umum, serta batas proyek yang tetap terarah.',
    'Check Good Fit / Usually Not a Fit first. If the project matches, use the project inquiry form to send scope, timeline, and references.':'Periksa bagian Cocok / Kurang Cocok terlebih dahulu. Jika sesuai, kirim cakupan, jadwal, dan referensi melalui formulir proyek.','Start a project':'Mulai proyek',
    'Contact guide':'Panduan kontak','Use this page for direct contact. Email works best for detailed professional or research conversations; the project form is structured for website inquiries.':'Gunakan halaman ini untuk menghubungi langsung. Email cocok untuk pembahasan profesional atau riset yang terperinci; formulir proyek dibuat untuk permintaan website.',
    'For a website project, use Project Inquiry. For roles, research, or general questions, email is the clearest route.':'Untuk proyek website, gunakan formulir brief proyek. Untuk pekerjaan, riset, atau pertanyaan umum, hubungi melalui email.','Project inquiry':'Brief proyek',
    'EquipmentHub guide':'Panduan EquipmentHub','This case study is grounded in a public repository. It covers inventory, custody, events, maintenance, weekly checks, reporting, IndexedDB persistence, and JSON backup/import.':'Studi kasus ini didukung repositori publik. Cakupannya meliputi inventaris, peminjaman, acara, pemeliharaan, pemeriksaan mingguan, laporan, penyimpanan IndexedDB, serta impor dan ekspor JSON.',
    'Start with the system scope and engineering decisions, then open the repository or live site to verify the implementation.':'Mulailah dari cakupan sistem dan keputusan rekayasa, lalu buka repositori atau situs aktif untuk melihat implementasinya.','Open repository':'Buka repositori',
    'Learning Chinese guide':'Panduan Learning Chinese','This case study shows a larger product architecture: Next.js 16, React 19, TypeScript, Supabase, spaced repetition, HSK content, handwriting tools, games, stories, OCR-assisted lookup, and learning insights.':'Studi kasus ini menunjukkan arsitektur produk yang lebih besar: Next.js 16, React 19, TypeScript, Supabase, pengulangan berkala, materi HSK, alat tulis tangan, permainan, cerita, pencarian berbantuan OCR, dan wawasan belajar.',
    'Use the architecture and feature evidence to understand the scale of the product, then inspect the public repository for implementation depth.':'Tinjau arsitektur dan bukti fiturnya untuk memahami skala produk, lalu periksa repositori publik untuk detail implementasi.','Knowing Your Emotions guide':'Panduan Knowing Your Emotions',
    'This case study focuses on an offline-capable multilingual PWA with a 68-emotion library, local accounts, notes, favorites, history, client-side analysis, and an optional Flask/SQLite backend.':'Studi kasus ini membahas PWA multibahasa yang dapat digunakan offline, dengan pustaka 68 emosi, akun lokal, catatan, favorit, riwayat, analisis di sisi klien, serta backend Flask/SQLite opsional.',
    'Start with the offline/PWA architecture and privacy choices, then inspect the public repository for the client and optional backend implementation.':'Mulailah dari arsitektur offline/PWA dan pilihan privasi, lalu periksa repositori publik untuk implementasi klien dan backend opsional.','Compiler project guide':'Panduan proyek compiler',
    'This is an earlier engineering project focused on tokenization, parsing, intermediate representation, and the interface around those compiler stages.':'Ini proyek rekayasa terdahulu yang berfokus pada tokenisasi, parsing, representasi perantara, dan antarmuka untuk tahapan compiler tersebut.',
    'Treat this as an engineering exercise rather than the strongest current portfolio evidence. The public-project case studies on the homepage are more representative of current work.':'Anggap ini sebagai latihan rekayasa, bukan bukti utama karya terbaru. Studi kasus proyek publik di beranda lebih mewakili pekerjaan saat ini.',
    'Coffee app guide':'Panduan aplikasi kopi','This is an earlier product/UI exercise. Demo data and interface behavior are shown as representative material rather than production evidence.':'Ini latihan produk dan UI terdahulu. Data demo dan perilaku antarmuka ditampilkan sebagai contoh, bukan bukti produksi.',
    'Use this page to inspect interaction thinking. For stronger implementation evidence, open EquipmentHub or Learning Chinese.':'Gunakan halaman ini untuk meninjau rancangan interaksi. Untuk bukti implementasi yang lebih kuat, buka EquipmentHub atau Learning Chinese.','See EquipmentHub':'Lihat EquipmentHub',
    'Earlier inventory guide':'Panduan inventaris terdahulu','This older inventory case study uses representative/demo data. EquipmentHub is now the stronger public implementation of operational inventory workflows.':'Studi kasus inventaris lama ini menggunakan data contoh. EquipmentHub kini menjadi implementasi publik yang lebih kuat untuk alur kerja operasional inventaris.',
    'Use this page for the older design rationale, then compare it with EquipmentHub to see how the implementation evolved.':'Gunakan halaman ini untuk memahami pertimbangan desain sebelumnya, lalu bandingkan dengan EquipmentHub untuk melihat perkembangannya.','Lost route':'Halaman tidak ditemukan',
    'This page is not available. The link may be old, moved, or mistyped. The navigator can take you back to the current portfolio structure.':'Halaman ini tidak tersedia. Tautan mungkin sudah lama, dipindah, atau salah ketik. Panduan ini dapat membantu Anda kembali ke struktur portofolio saat ini.',
    'Return home and use Selected Work or the command palette to find the current page.':'Kembali ke beranda dan gunakan Proyek Pilihan atau panel navigasi untuk menemukan halaman yang tersedia.','Next step':'Langkah berikutnya',
    'You reached the project inquiry success page. You can return to the portfolio, review work, or send a direct email if anything still needs context.':'Anda tiba di halaman konfirmasi brief proyek. Anda dapat kembali ke portofolio, meninjau karya, atau mengirim email jika ada hal yang perlu dijelaskan.',
    'Return to the homepage if you want to keep browsing, or use Contact for another message.':'Kembali ke beranda untuk melanjutkan penjelajahan, atau gunakan halaman Kontak untuk mengirim pesan lain.','Back home':'Kembali ke beranda',
    'TNL Rocket Navigator':'Panduan Portofolio TNL','Open TNL Rocket Navigator':'Buka Panduan Portofolio TNL','Close guide':'Tutup panduan','Explain this page':'Jelaskan halaman ini','Where should I start?':'Mulai dari mana?','Show strongest work':'Tampilkan karya unggulan','Resume':'CV','Contact':'Kontak','A lightweight site guide, not an AI chatbot. It only explains and navigates the portfolio.':'Panduan ringan untuk situs ini, bukan chatbot AI. Fungsinya menjelaskan dan membantu navigasi portofolio.','On this page:':'Di halaman ini:','Recommended path:':'Urutan yang disarankan:','Strongest implementation evidence:':'Bukti implementasi terkuat:','Start with EquipmentHub for a compact public system, then Learning Chinese for a larger modern product architecture.':'Mulailah dari EquipmentHub untuk melihat sistem publik yang ringkas, lalu buka Learning Chinese untuk arsitektur produk modern yang lebih besar.'
  };
  const t = (en, zh) => isZh() ? zh : isId() ? idCopy[en] || en : en;

  const contexts = {
    'index.html': {
      title:['Homepage guide','主页向导'],
      explain:['This homepage is evidence-first: public projects, engineering capabilities, academic work, services, and a direct contact path.','这个主页以真实证据为核心：公开项目、工程能力、学术工作、网站服务与直接联系方式。'],
      start:['If you are reviewing Timothy for a role or research opportunity, start with Selected Work. EquipmentHub is the fastest project to inspect because it has a public repository and live site.','如果你在评估 Timothy 的工作或研究能力，建议先看精选项目。EquipmentHub 最适合快速了解，因为它同时有公开仓库与在线版本。'],
      cta:['See selected work','查看精选项目','#work']
    },
    'about.html': {
      title:['About page guide','关于页面向导'],
      explain:['This page explains the background behind the portfolio: Computer Science, teaching, community work, learning, and how those experiences shaped the way Timothy builds.','这个页面讲的是作品集背后的经历：计算机科学、教学、社群工作与学习经历，以及这些经历如何影响 Timothy 的工作方式。'],
      start:['Read this page for context and personality. If you need a faster professional scan, the online resume is more concise.','想了解个人背景与思考方式可以读这个页面；如果想快速查看专业经历，在线简历会更直接。'],
      cta:['Open resume','查看简历','resume.html']
    },
    'journey.html': {
      title:['Journey page guide','经历页面向导'],
      explain:['Journey is the chronological version of the story. It connects education, tutoring, community responsibilities, project work, and the next academic chapter.','Journey 是时间线版本的个人经历，把教育、辅导教学、社群责任、项目实践与下一阶段学术计划连接起来。'],
      start:['Use the chapters to understand progression rather than individual achievements. For technical proof, jump back to Selected Work.','建议把这里当作成长脉络来阅读，而不是单独的成就列表。想看技术证据，可以回到精选项目。'],
      cta:['See selected work','查看精选项目','about.html#projects']
    },
    'research.html': {
      title:['Research page guide','研究页面向导'],
      explain:['This page summarizes Timothy’s academic work on energy-efficient resource scheduling in 5G and the research direction he wants to develop further.','这个页面总结 Timothy 关于 5G 节能资源调度的学术工作，以及未来希望继续发展的研究方向。'],
      start:['Start with the research question and method, then use the contact page if you want to discuss the work, graduate study, or collaboration.','建议先看研究问题与方法。如果想讨论研究、研究生学习或合作，可以直接进入联系页面。'],
      cta:['Discuss research','讨论研究','contact.html']
    },
    'resume.html': {
      title:['Resume guide','简历向导'],
      explain:['This is the scan-friendly version of Timothy’s profile: education, selected projects, academic work, experience, skills, and links to evidence.','这是方便快速浏览的在线简历：教育背景、精选项目、学术工作、经历、技能以及相关证据链接。'],
      start:['Use the online version for quick review. Use Download PDF when you need the conventional CV format.','在线版本适合快速浏览；如果需要传统 CV 格式，可以下载 PDF。'],
      cta:['Contact Timothy','联系 Timothy','contact.html']
    },
    'services.html': {
      title:['Services guide','服务页面向导'],
      explain:['This page explains the website work Timothy takes on, what is normally included, and where the project scope should stay intentionally small and focused.','这个页面说明 Timothy 可承接的网站项目、通常包含的交付内容，以及项目范围应该保持清晰和可控的边界。'],
      start:['Check Good Fit / Usually Not a Fit first. If the project matches, use the project inquiry form to send scope, timeline, and references.','建议先看适合与不适合的项目范围。如果匹配，可以通过项目咨询表单提交需求、时间与参考资料。'],
      cta:['Start a project','开始项目','contact.html#project']
    },
    'contact.html': {
      title:['Contact guide','联系页面向导'],
      explain:['Use this page for direct contact. Email works best for detailed professional or research conversations; the project form is structured for website inquiries.','这个页面用于直接联系。详细的工作或研究讨论建议使用 Email；网站项目则可以使用结构化的项目咨询表单。'],
      start:['For a website project, use Project Inquiry. For roles, research, or general questions, email is the clearest route.','网站项目建议使用项目咨询；工作机会、研究或一般问题则更适合直接发 Email。'],
      cta:['Project inquiry','项目咨询','#project']
    },
    'project-equipmenthub.html': {
      title:['EquipmentHub guide','EquipmentHub 案例向导'],
      explain:['This case study is grounded in a public repository. It covers inventory, custody, events, maintenance, weekly checks, reporting, IndexedDB persistence, and JSON backup/import.','这个案例基于公开 GitHub 仓库，涵盖库存、责任人、活动、维护、周检、报告、IndexedDB 持久化与 JSON 备份/导入。'],
      start:['Start with the system scope and engineering decisions, then open the repository or live site to verify the implementation.','建议先看系统范围与工程决策，再打开公开仓库或在线版本验证实现。'],
      cta:['Open repository','打开仓库','https://github.com/Timothy1016/EquipmentHub',true]
    },
    'project-learning-chinese.html': {
      title:['Learning Chinese guide','中文学习项目向导'],
      explain:['This case study shows a larger product architecture: Next.js 16, React 19, TypeScript, Supabase, spaced repetition, HSK content, handwriting tools, games, stories, OCR-assisted lookup, and learning insights.','这个案例展示了更大型的产品架构：Next.js 16、React 19、TypeScript、Supabase、间隔重复、HSK 内容、汉字书写、游戏、故事、OCR 辅助查询与学习洞察。'],
      start:['Use the architecture and feature evidence to understand the scale of the product, then inspect the public repository for implementation depth.','建议先通过架构与功能证据理解产品规模，再查看公开仓库了解实现深度。'],
      cta:['Open repository','打开仓库','https://github.com/Timothy1016/Learning-Chinese-Web',true]
    },
    'project-box-emotions.html': {
      title:['Knowing Your Emotions guide','Knowing Your Emotions 案例向导'],
      explain:['This case study focuses on an offline-capable multilingual PWA with a 68-emotion library, local accounts, notes, favorites, history, client-side analysis, and an optional Flask/SQLite backend.','这个案例聚焦一个支持离线使用的多语言 PWA，包含 68 种情绪资料库、本地账户、笔记、收藏、历史记录、客户端分析，以及可选的 Flask/SQLite 后端。'],
      start:['Start with the offline/PWA architecture and privacy choices, then inspect the public repository for the client and optional backend implementation.','建议先看离线/PWA 架构与隐私设计，再通过公开仓库查看客户端与可选后端实现。'],
      cta:['Open repository','打开仓库','https://github.com/Timothy1016/Knowing-your-emotion-web',true]
    },
    'project-compiler.html': {
      title:['Compiler project guide','编译器项目向导'],
      explain:['This is an earlier engineering project focused on tokenization, parsing, intermediate representation, and the interface around those compiler stages.','这是一个较早的工程项目，重点是词法分析、语法解析、中间表示，以及围绕编译流程构建的界面。'],
      start:['Treat this as an engineering exercise rather than the strongest current portfolio evidence. The public-project case studies on the homepage are more representative of current work.','建议把这个项目看作工程练习，而不是当前最强的作品证据。主页上的公开项目案例更能代表现在的工作。'],
      cta:['See current work','查看当前项目','about.html#projects']
    },
    'project-coffee.html': {
      title:['Coffee app guide','咖啡应用案例向导'],
      explain:['This is an earlier product/UI exercise. Demo data and interface behavior are shown as representative material rather than production evidence.','这是一个较早的产品与 UI 练习。页面中的 Demo 数据与界面行为用于展示设计与交互，不代表生产环境结果。'],
      start:['Use this page to inspect interaction thinking. For stronger implementation evidence, open EquipmentHub or Learning Chinese.','这个页面适合看交互思路。想看更强的实现证据，建议查看 EquipmentHub 或 Learning Chinese。'],
      cta:['See EquipmentHub','查看 EquipmentHub','project-equipmenthub.html']
    },
    'project-inventory.html': {
      title:['Earlier inventory guide','早期库存项目向导'],
      explain:['This older inventory case study uses representative/demo data. EquipmentHub is now the stronger public implementation of operational inventory workflows.','这个较早的库存案例使用代表性/Demo 数据。现在 EquipmentHub 是更完整、公开且可验证的库存运营实现。'],
      start:['Use this page for the older design rationale, then compare it with EquipmentHub to see how the implementation evolved.','可以先看这个页面的早期设计思路，再与 EquipmentHub 对比，了解实现如何演进。'],
      cta:['Open EquipmentHub','打开 EquipmentHub','project-equipmenthub.html']
    },
    '404.html': {
      title:['Lost route','页面不存在'],
      explain:['This page is not available. The link may be old, moved, or mistyped. The navigator can take you back to the current portfolio structure.','这个页面不存在，链接可能已过期、移动或输入错误。可以通过导航助手回到当前作品集结构。'],
      start:['Return home and use Selected Work or the command palette to find the current page.','返回主页后，可以从精选项目或快捷导航寻找当前内容。'],
      cta:['Back home','返回主页','index.html']
    },
    'success.html': {
      title:['Next step','下一步'],
      explain:['You reached the project inquiry success page. You can return to the portfolio, review work, or send a direct email if anything still needs context.','你已经进入项目咨询成功页面。接下来可以返回作品集、查看项目，或在需要补充信息时直接发送 Email。'],
      start:['Return to the homepage if you want to keep browsing, or use Contact for another message.','如果想继续浏览可以返回主页；如果要补充信息，可以再次进入联系页面。'],
      cta:['Back home','返回主页','index.html']
    }
  };
  const fallback = contexts['index.html'];
  const context = contexts[page] || fallback;
  const bodyTheme = !document.documentElement.dataset.theme && document.body.classList.contains('dark');

  const guide = document.createElement('div');
  guide.id = 'tnl-guide';
  if (bodyTheme || (!document.documentElement.dataset.theme && document.body)) guide.dataset.themeSource='body';
  guide.innerHTML = `
    <section class="tnl-guide-panel" id="tnl-guide-panel" role="dialog" aria-modal="false" aria-labelledby="tnl-guide-title" aria-hidden="true">
      <div class="tnl-guide-head">
        <div><span class="tnl-guide-kicker">TNL NAVIGATOR</span><strong id="tnl-guide-title"></strong></div>
        <button class="tnl-guide-close" type="button" aria-label="Close guide">×</button>
      </div>
      <div class="tnl-guide-body">
        <p class="tnl-guide-response" aria-live="polite"></p>
        <div class="tnl-guide-questions">
          <button class="tnl-guide-question" type="button" data-guide-action="explain" data-track="Rocket Guide Action" data-track-label="Explain page"><span></span><span>↗</span></button>
          <button class="tnl-guide-question" type="button" data-guide-action="start" data-track="Rocket Guide Action" data-track-label="Where to start"><span></span><span>↗</span></button>
          <button class="tnl-guide-question" type="button" data-guide-action="proof" data-track="Rocket Guide Action" data-track-label="Strongest work"><span></span><span>↗</span></button>
        </div>
        <div class="tnl-guide-actions">
          <a class="tnl-guide-link primary tnl-guide-context-link" data-track="Rocket Guide Context CTA"></a>
          <a class="tnl-guide-link" href="resume.html" data-track="Rocket Guide Resume"></a>
          <a class="tnl-guide-link" href="contact.html" data-track="Rocket Guide Contact"></a>
        </div>
        <p class="tnl-guide-note"></p>
      </div>
    </section>
    <button class="tnl-guide-avatar" type="button" aria-controls="tnl-guide-panel" aria-expanded="false" data-track="Rocket Guide Open">
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="tnl-rocket-shell-gradient" x1="22" y1="40" x2="42" y2="13" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#d8c09a"/><stop offset=".52" stop-color="#f0dfbf"/><stop offset="1" stop-color="#fff4dc"/>
          </linearGradient>
          <linearGradient id="tnl-rocket-flame-gradient" x1="32" y1="43" x2="32" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#f0c477"/><stop offset="1" stop-color="#c77a43"/>
          </linearGradient>
        </defs>
        <g class="rocket-stars" aria-hidden="true">
          <path class="rocket-star rocket-star-primary" d="M10 25l1.1 3.2 3.2 1.1-3.2 1.1L10 33.6l-1.1-3.2-3.2-1.1 3.2-1.1z"/>
          <path class="rocket-star rocket-star-secondary" d="M20 10l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>
          <circle class="rocket-star rocket-star-dot" cx="53" cy="51" r="1.15"/>
        </g>
        <g transform="rotate(45 32 32)">
          <g class="rocket-thrust">
            <path class="rocket-flame" d="M29.5 41.8c-.8 4.6.2 9 2.5 13 2.3-4 3.3-8.4 2.5-13-1.4 1.1-3.6 1.1-5 0z"/>
            <path class="rocket-flame-core" d="M30.7 43.1c-.2 3.1.3 5.9 1.3 8.3 1-2.4 1.5-5.2 1.3-8.3-.8.4-1.8.4-2.6 0z"/>
          </g>
          <g class="rocket-art">
            <path class="rocket-fin" d="M24.8 33.8 20.3 39.6l5 2.1 2.9-2.7z"/>
            <path class="rocket-fin" d="M39.2 33.8 43.7 39.6l-5 2.1-2.9-2.7z"/>
            <path class="rocket-body" d="M32 5.5c-4.7 5.1-7.7 12.3-7.7 21.2v12.1c0 4.5 3.2 7.4 7.7 7.4s7.7-2.9 7.7-7.4V26.7c0-8.9-3-16.1-7.7-21.2z"/>
            <path class="rocket-highlight" d="M27 26.2c0-7.8 1.8-14.1 4.1-18.1-3.6 4.8-5.8 11.3-5.8 18.4v12.2c0 1.8.6 3.4 1.7 4.5z"/>
            <path class="rocket-engine" d="M24.4 38.2c1.9 1.5 4.5 2.3 7.6 2.3s5.7-.8 7.6-2.3v3.6c-1.8 1.8-4.5 2.8-7.6 2.8s-5.8-1-7.6-2.8z"/>
            <path class="rocket-seam" d="M23 31.3c2.6 1.5 5.7 2.3 9 2.3s6.4-.8 9-2.3"/>
            <circle class="rocket-window-rim" cx="32" cy="21.8" r="4.5"/>
            <circle class="rocket-window" cx="32" cy="21.8" r="3.1"/>
            <path class="rocket-window-glint" d="M30.5 20.9a1.8 1.8 0 0 1 2-1"/>
          </g>
        </g>
      </svg>
    </button>`;
  document.body.appendChild(guide);

  const avatar = guide.querySelector('.tnl-guide-avatar');
  const panel = guide.querySelector('.tnl-guide-panel');
  const close = guide.querySelector('.tnl-guide-close');
  const title = guide.querySelector('#tnl-guide-title');
  const response = guide.querySelector('.tnl-guide-response');
  const questions = [...guide.querySelectorAll('.tnl-guide-question')];
  const contextLink = guide.querySelector('.tnl-guide-context-link');
  const resumeLink = guide.querySelector('a[href="resume.html"]');
  const contactLink = guide.querySelector('a[href="contact.html"]');
  const note = guide.querySelector('.tnl-guide-note');

  function currentText(pair){ return isZh()?pair[1]:isId()?(idCopy[pair[0]]||pair[0]):pair[0]; }
  function renderLanguage(){
    title.textContent=currentText(context.title);
    avatar.dataset.label=t('TNL Rocket Navigator','TNL 火箭向导');
    avatar.setAttribute('aria-label',t('Open TNL Rocket Navigator','打开 TNL 火箭向导'));
    close.setAttribute('aria-label',t('Close guide','关闭向导'));
    questions[0].querySelector('span').textContent=t('Explain this page','解释这个页面');
    questions[1].querySelector('span').textContent=t('Where should I start?','我应该从哪里开始？');
    questions[2].querySelector('span').textContent=t('Show strongest work','查看最强项目');
    contextLink.textContent=currentText(context.cta);
    contextLink.href=context.cta[2];
    if(context.cta[3]){contextLink.target='_blank';contextLink.rel='noopener noreferrer'}
    else{contextLink.removeAttribute('target');contextLink.removeAttribute('rel')}
    resumeLink.textContent=t('Resume','简历');
    contactLink.textContent=t('Contact','联系');
    note.textContent=t('A lightweight site guide, not an AI chatbot. It only explains and navigates the portfolio.','这是一个轻量的网站向导，不是 AI 聊天机器人；它只负责解释和导航作品集。');
    response.innerHTML=`<strong>${t('On this page:','当前页面：')}</strong> ${currentText(context.explain)}`;
  }
  function openGuide(){guide.classList.add('is-open');avatar.setAttribute('aria-expanded','true');panel.setAttribute('aria-hidden','false');}
  function closeGuide(){guide.classList.remove('is-open');avatar.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');avatar.focus({preventScroll:true});}
  avatar.addEventListener('click',()=>guide.classList.contains('is-open')?closeGuide():openGuide());
  close.addEventListener('click',closeGuide);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&guide.classList.contains('is-open'))closeGuide()});
  document.addEventListener('pointerdown',e=>{if(guide.classList.contains('is-open')&&!guide.contains(e.target))closeGuide()});
  questions.forEach(btn=>btn.addEventListener('click',()=>{
    const action=btn.dataset.guideAction;
    if(action==='explain') response.innerHTML=`<strong>${t('On this page:','当前页面：')}</strong> ${currentText(context.explain)}`;
    if(action==='start') response.innerHTML=`<strong>${t('Recommended path:','建议路线：')}</strong> ${currentText(context.start)}`;
    if(action==='proof') response.innerHTML=`<strong>${t('Strongest implementation evidence:','最强实现证据：')}</strong> ${t('Start with EquipmentHub for a compact public system, then Learning Chinese for a larger modern product architecture.','先看 EquipmentHub，快速了解一个完整公开系统；再看 Learning Chinese，了解更大型的现代产品架构。')}`;
  }));
  window.addEventListener('portfolio-language-change',renderLanguage);
  const langObserver=new MutationObserver(()=>renderLanguage());
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  renderLanguage();
})();
