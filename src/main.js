import './style.css';

const idText = {
  'Work': 'Karya', 'Capabilities': 'Layanan', 'Approach': 'Pendekatan', 'Team': 'Tim',
  'Start a conversation': 'Mari berdiskusi', 'Independent digital team · Indonesia & everywhere': 'Tim digital independen · Indonesia dan global',
  'WhatsApp number is not configured. Add WHATSAPP_NUMBER=62... to .env.': 'Nomor WhatsApp belum diatur. Tambahkan WHATSAPP_NUMBER=62... ke .env.',
  'Good work happens when': 'Hasil terbaik tercipta saat', 'ambition': 'ambisi', 'meets clarity.': 'bertemu dengan kejelasan.',
  'We turn complicated challenges into digital products and systems people can move forward with.': 'Kami mengubah tantangan yang rumit menjadi produk dan sistem digital yang membantu orang melangkah maju.',
  'Explore our work': 'Lihat karya kami', 'Get to know us': 'Kenali kami', 'Product thinking': 'Strategi produk', 'Technology': 'Teknologi', 'Delivery': 'Eksekusi',
  'Ideas into action': 'Ide menjadi aksi', 'MAKE IT': 'WUJUDKAN', 'MATTER': 'DAMPAKNYA', 'Discover': 'Pahami', 'Design': 'Rancang', 'Deliver': 'Wujudkan',
  'A little structure.': 'Sedikit struktur.', 'A lot of possibility.': 'Banyak kemungkinan.',
  'Our principles': 'Prinsip kami', 'Small team, broad perspective': 'Tim kecil, perspektif luas', 'Clear thinking, useful technology': 'Pemikiran jernih, teknologi tepat guna', 'Progress you can see': 'Kemajuan yang terlihat',
  'Selected work': 'Karya pilihan', 'Built around the': 'Berangkat dari', 'real work.': 'kebutuhan nyata.',
  'Every challenge has its own shape. We bring the right mix of strategy, design and engineering to make the next step clearer.': 'Setiap tantangan punya bentuknya sendiri. Kami memadukan strategi, desain, dan rekayasa agar langkah berikutnya lebih jelas.',
  'Loading projects': 'Memuat proyek', 'Preview examples — add your team\'s real projects through Team access.': 'Contoh pratinjau — tambahkan proyek asli tim melalui Akses tim.',
  'What we do': 'Layanan kami', 'From first question': 'Dari pertanyaan awal', 'to': 'hingga', 'lasting impact.': 'dampak jangka panjang.',
  'We work across the whole journey so the idea, the system and the people using it all fit together.': 'Kami mendampingi seluruh proses agar ide, sistem, dan orang yang menggunakannya terhubung dengan baik.',
  'Product & strategy': 'Produk & strategi', 'Find the opportunity, align the team and shape a product direction grounded in real needs.': 'Temukan peluang, satukan tim, dan tentukan arah produk berdasarkan kebutuhan nyata.',
  'Discovery · Roadmaps · Product thinking': 'Eksplorasi · Peta jalan · Strategi produk',
  'Digital experiences': 'Pengalaman digital', 'Make useful things easier to understand, easier to use and a pleasure to come back to.': 'Buat solusi yang mudah dipahami, nyaman digunakan, dan ingin dipakai kembali.',
  'UX/UI · Web · Mobile': 'UX/UI · Web · Mobile', 'Systems & integration': 'Sistem & integrasi',
  'Connect the tools, data and workflows that help good teams do their best work.': 'Hubungkan alat, data, dan alur kerja agar tim dapat bekerja lebih optimal.',
  'Platforms · Automation · IoT': 'Platform · Otomasi · IoT', 'Delivery & change': 'Implementasi & perubahan',
  'Move from a promising plan to practical adoption with steady, transparent delivery.': 'Wujudkan rencana menjadi solusi yang digunakan melalui proses yang terukur dan transparan.',
  'Engineering · Enablement · Delivery': 'Rekayasa · Pendampingan · Implementasi',
  'A better way to build': 'Cara yang lebih baik untuk membangun', 'Make the complex': 'Sederhanakan hal yang rumit', 'feel possible.': 'agar terasa mungkin.',
  'Our work starts with listening. Then we make progress visible, keep decisions close to the people they affect, and build for what comes next.': 'Kami memulai dengan mendengarkan. Kemajuan dibuat terlihat, keputusan melibatkan orang yang terdampak, dan solusi dirancang untuk kebutuhan berikutnya.',
  '01 / Understand': '01 / Pahami', 'Get close to the real problem.': 'Kenali masalah yang sebenarnya.',
  'We ask better questions, map the moving parts and agree on what success looks like together.': 'Kami menggali pertanyaan yang tepat, memahami berbagai faktor, lalu menyepakati ukuran keberhasilan bersama.',
  '02 / Shape': '02 / Rancang arah', 'Make a clear path forward.': 'Tentukan langkah yang jelas.',
  'We turn the big picture into a focused plan, test the important assumptions and bring people along.': 'Kami menyusun rencana yang fokus, menguji asumsi penting, dan melibatkan semua pihak.',
  '03 / Build': '03 / Wujudkan', 'Deliver value in the open.': 'Hadirkan hasil secara transparan.',
  'We work in small, useful increments, share progress early and leave your team ready for the next step.': 'Kami bekerja bertahap, membagikan kemajuan sejak awal, dan menyiapkan tim untuk langkah selanjutnya.',
  'The Alphanity difference': 'Keunggulan Alphanity', 'One team.': 'Satu tim.', 'Many disciplines.': 'Beragam keahlian.',
  'We bring product thinkers, designers, engineers and delivery leaders into the same conversation. Less handoff. More shared ownership.': 'Kami menyatukan pemikir produk, desainer, engineer, dan pemimpin implementasi. Lebih sedikit oper-operan, lebih banyak tanggung jawab bersama.',
  'Meet us where you are': 'Mulai dari kebutuhan Anda', 'MAKE': 'BUAT', 'THINGS': 'HAL YANG', 'BETTER': 'LEBIH BAIK',
  'Curious by nature.': 'Selalu ingin tahu.', 'Thoughtful by design.': 'Dirancang dengan penuh pertimbangan.',
  'Have a good challenge?': 'Punya tantangan menarik?', 'Let\'s make the': 'Mari wujudkan', 'next move count.': 'langkah berikutnya.',
  'Tell us what you\'re working through.': 'Ceritakan tantangan yang sedang Anda hadapi.', 'We\'ll find a useful place to start.': 'Kita cari titik awal yang tepat bersama.',
  'Talk with Alphanity': 'Hubungi Alphanity', 'Good work, made together.': 'Karya baik, dibuat bersama.', 'Team access': 'Akses tim',
  'Alphanity workspace': 'Ruang kerja Alphanity', 'Sign in to manage the projects shown on your site.': 'Masuk untuk mengelola proyek yang tampil di situs.',
  'Team password': 'Kata sandi tim', 'Enter your team password': 'Masukkan kata sandi tim', 'Continue': 'Lanjutkan',
  'Project library': 'Daftar proyek', 'Add a project': 'Tambah proyek', 'Sign out': 'Keluar',
  'Project name': 'Nama proyek', 'e.g. Operations workspace': 'mis. Ruang kerja operasional', 'Discipline': 'Bidang', 'Digital operations': 'Operasional digital',
  'Short description': 'Deskripsi singkat', 'What challenge did this work address?': 'Tantangan apa yang dijawab proyek ini?', 'Outcome or focus': 'Hasil atau fokus',
  'Clarity for every handoff': 'Alur kerja yang lebih jelas', 'Cover image': 'Gambar sampul', 'One image · JPG, PNG, or WebP · max 6 MB': 'Satu gambar · JPG, PNG, atau WebP · maks. 6 MB',
  'Accent': 'Warna aksen', 'Save project': 'Simpan proyek', 'Cancel edit': 'Batal mengedit', 'Published projects': 'Proyek terbit',
  'Edit': 'Edit', 'Delete': 'Hapus', 'No projects yet. Add your first one above.': 'Belum ada proyek. Tambahkan proyek pertama di atas.',
  'Edit project': 'Edit proyek', 'Project cover preview': 'Pratinjau gambar sampul proyek',
  'Focus': 'Fokus', 'Open navigation': 'Buka navigasi', 'Close dialog': 'Tutup dialog', 'Alphanity home': 'Beranda Alphanity',
  'View full image': 'Lihat gambar penuh', 'Close image preview': 'Tutup pratinjau gambar', 'Image preview': 'Pratinjau gambar',
  'Previous project': 'Proyek sebelumnya', 'Next project': 'Proyek berikutnya', 'Project': 'Proyek', 'Year': 'Tahun',
  'Abstract illustration of connected ideas': 'Ilustrasi abstrak dari ide-ide yang terhubung', 'Our principles': 'Prinsip kami',
  'Live project library': 'Daftar proyek aktif', 'Preview content': 'Konten pratinjau', 'Checking access…': 'Memeriksa akses…',
  'Saving…': 'Menyimpan…', 'Uploading cover…': 'Mengunggah sampul…', 'Project saved.': 'Proyek tersimpan.', 'Deleting…': 'Menghapus…',
  'Project deleted.': 'Proyek dihapus.', 'Choose a JPG, PNG, or WebP image.': 'Pilih gambar JPG, PNG, atau WebP.',
  'The cover image must be 6 MB or smaller.': 'Ukuran gambar sampul maksimal 6 MB.',
  'Admin API not found. Stop the old dev server, run npm run dev, then reload this page.': 'API admin tidak ditemukan. Hentikan server lama, jalankan npm run dev, lalu muat ulang halaman.',
  'That password did not match.': 'Kata sandi tidak cocok.', 'Sign in to manage projects.': 'Masuk untuk mengelola proyek.',
  'Project not found.': 'Proyek tidak ditemukan.', 'Use a JPG, PNG, or WebP cover image.': 'Gunakan gambar sampul JPG, PNG, atau WebP.',
  'The selected file does not match its image format.': 'Format file tidak sesuai dengan jenis gambarnya.',
  'Cover images must be 6 MB or smaller.': 'Ukuran gambar sampul maksimal 6 MB.', 'Choose an image file first.': 'Pilih file gambar terlebih dahulu.',
  'MySQL is not configured. Add DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, ADMIN_PASSWORD to .env.': 'MySQL belum dikonfigurasi. Tambahkan DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, dan ADMIN_PASSWORD ke .env.',
  'Main navigation': 'Navigasi utama', 'Could not load the project library. Check the MySQL connection.': 'Daftar proyek gagal dimuat. Periksa koneksi MySQL.',
  'Could not save the project.': 'Proyek gagal disimpan.', 'Project saved, but the cover image could not be uploaded.': 'Proyek tersimpan, tetapi gambar sampul gagal diunggah.',
  'Could not delete the project.': 'Proyek gagal dihapus.', 'Could not sign in.': 'Gagal masuk.',
  'Delete this project from the site?': 'Hapus proyek ini dari situs?',
  'Update project': 'Perbarui proyek', 'Project service unavailable': 'Layanan proyek tidak tersedia.',
  'Server returned an empty response. Restart the dev server with npm run dev.': 'Server memberi respons kosong. Mulai ulang dengan npm run dev.',
  'Server returned an unexpected response. Check that npm run dev is running.': 'Respons server tidak dikenali. Pastikan npm run dev sedang berjalan.',
  'An unexpected error occurred. Please try again.': 'Terjadi kesalahan. Silakan coba lagi.',
};

let currentLanguage = 'id';
try { if (localStorage.getItem('alphanity-language') === 'en') currentLanguage = 'en'; } catch {}
const translate = (english) => currentLanguage === 'id' ? (idText[english] || english) : english;
const englishText = Object.fromEntries(Object.entries(idText).map(([english, indonesian]) => [indonesian, english]));

const starterProjects = {
  en: [
    { id: 'demo-1', title: 'Operations workspace', category: 'Digital operations', year: 'Example', summary: 'A single, calm view for teams coordinating complex day-to-day work.', outcome: 'Clarity for every handoff', visual: 'mint' },
    { id: 'demo-2', title: 'Field service toolkit', category: 'Connected workflows', year: 'Example', summary: 'A mobile-first workflow that keeps field teams and the office in sync.', outcome: 'Work moves with the team', visual: 'lilac' },
    { id: 'demo-3', title: 'Decision intelligence', category: 'Data products', year: 'Example', summary: 'A thoughtful reporting experience that turns scattered signals into action.', outcome: 'Signals become decisions', visual: 'peach' },
  ],
  id: [
    { id: 'demo-1', title: 'Ruang kerja operasional', category: 'Operasional digital', year: 'Contoh', summary: 'Satu tampilan ringkas untuk tim yang mengoordinasikan pekerjaan harian.', outcome: 'Alur kerja yang lebih jelas', visual: 'mint' },
    { id: 'demo-2', title: 'Toolkit layanan lapangan', category: 'Alur kerja terhubung', year: 'Contoh', summary: 'Alur kerja yang menghubungkan tim lapangan dengan kantor lewat perangkat mobile.', outcome: 'Pekerjaan bergerak bersama tim', visual: 'lilac' },
    { id: 'demo-3', title: 'Intelijen keputusan', category: 'Produk data', year: 'Contoh', summary: 'Pengalaman pelaporan yang mengubah berbagai sinyal menjadi langkah nyata.', outcome: 'Sinyal menjadi keputusan', visual: 'peach' },
  ],
};

const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="Alphanity home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>alphanity<span class="wordmark-period">.</span></span>
      </a>
      <button class="menu-toggle" id="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#approach">Approach</a><a href="#team">Team</a>
      </nav>
      <div class="header-actions">
        <button class="language-toggle" id="language-toggle" type="button" aria-label="Switch language to Indonesian"><span>ID</span><b>/</b><span>EN</span></button>
        <a class="header-cta" data-whatsapp-link href="#" aria-disabled="true">Start a conversation <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <main id="top">
      <section class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-dot"></span> Independent digital team · Indonesia & everywhere</div>
          <h1>Good work happens when <em>ambition</em> meets clarity.</h1>
          <p class="hero-lede">We turn complicated challenges into digital products and systems people can move forward with.</p>
          <div class="hero-actions"><a class="button button-dark" href="#work">Explore our work <span>↓</span></a><a class="text-link" href="#contact">Get to know us <span>↗</span></a></div>
          <div class="hero-footnote"><span>Product thinking</span><b>·</b><span>Technology</span><b>·</b><span>Delivery</span></div>
        </div>
        <div class="hero-art" aria-label="Abstract illustration of connected ideas">
          <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-orbit orbit-three"></div>
          <div class="art-label label-top">Ideas into action <span>01—03</span></div>
          <div class="art-core"><span>A</span><small>MAKE IT<br>MATTER</small></div>
          <div class="art-node node-a"><span>01</span><i>Discover</i></div><div class="art-node node-b"><span>02</span><i>Design</i></div><div class="art-node node-c"><span>03</span><i>Deliver</i></div>
          <div class="art-caption">A little structure.<br>A lot of possibility.</div>
        </div>
      </section>

      <section class="trust-strip" aria-label="Our principles"><div class="section-wrap trust-inner"><span>Small team, broad perspective</span><span class="trust-line"></span><span>Clear thinking, useful technology</span><span class="trust-line"></span><span>Progress you can see</span></div></section>

      <section class="work-section section-wrap" id="work">
        <div class="section-heading"><div><p class="eyebrow eyebrow-dark">Selected work</p><h2>Built around the<br><em>real work.</em></h2></div><div class="section-intro"><p>Every challenge has its own shape. We bring the right mix of strategy, design and engineering to make the next step clearer.</p><span class="data-status" id="data-status"><i></i> Loading projects</span></div></div>
        <div class="project-grid" id="project-grid" aria-live="polite"></div>
        <p class="sample-note" id="sample-note" hidden>Preview examples — add your team's real projects through Team access.</p>
      </section>

      <section class="capabilities-section" id="capabilities"><div class="section-wrap capabilities-wrap">
        <div class="section-heading heading-light"><div><p class="eyebrow">What we do</p><h2>From first question<br>to <em>lasting impact.</em></h2></div><p class="section-intro">We work across the whole journey so the idea, the system and the people using it all fit together.</p></div>
        <div class="capability-grid">
          <article class="capability"><span class="cap-number">01</span><div class="cap-icon icon-spark">✳</div><h3>Product & strategy</h3><p>Find the opportunity, align the team and shape a product direction grounded in real needs.</p><span class="cap-tags">Discovery · Roadmaps · Product thinking</span></article>
          <article class="capability"><span class="cap-number">02</span><div class="cap-icon icon-grid">▦</div><h3>Digital experiences</h3><p>Make useful things easier to understand, easier to use and a pleasure to come back to.</p><span class="cap-tags">UX/UI · Web · Mobile</span></article>
          <article class="capability"><span class="cap-number">03</span><div class="cap-icon icon-flow">⌁</div><h3>Systems & integration</h3><p>Connect the tools, data and workflows that help good teams do their best work.</p><span class="cap-tags">Platforms · Automation · IoT</span></article>
          <article class="capability"><span class="cap-number">04</span><div class="cap-icon icon-arrow">↗</div><h3>Delivery & change</h3><p>Move from a promising plan to practical adoption with steady, transparent delivery.</p><span class="cap-tags">Engineering · Enablement · Delivery</span></article>
        </div>
      </div></section>

      <section class="approach-section section-wrap" id="approach">
        <div class="approach-top"><p class="eyebrow eyebrow-dark">A better way to build</p><h2>Make the complex<br><em>feel possible.</em></h2><p>Our work starts with listening. Then we make progress visible, keep decisions close to the people they affect, and build for what comes next.</p></div>
        <div class="steps"><article><span>01 / Understand</span><h3>Get close to the real problem.</h3><p>We ask better questions, map the moving parts and agree on what success looks like together.</p></article><article><span>02 / Shape</span><h3>Make a clear path forward.</h3><p>We turn the big picture into a focused plan, test the important assumptions and bring people along.</p></article><article><span>03 / Build</span><h3>Deliver value in the open.</h3><p>We work in small, useful increments, share progress early and leave your team ready for the next step.</p></article></div>
      </section>

      <section class="team-section" id="team"><div class="section-wrap team-wrap">
        <div class="team-copy"><p class="eyebrow eyebrow-dark">The Alphanity difference</p><h2>One team.<br><em>Many disciplines.</em></h2><p>We bring product thinkers, designers, engineers and delivery leaders into the same conversation. Less handoff. More shared ownership.</p><a class="text-link" href="#contact">Meet us where you are <span>↗</span></a></div>
        <div class="team-visual"><div class="team-stamp">MAKE<br>THINGS<br><em>BETTER</em></div><div class="team-orbit orbit-left"></div><div class="team-orbit orbit-right"></div><span class="team-caption">Curious by nature.<br>Thoughtful by design.</span></div>
      </div></section>

      <section class="contact-section section-wrap" id="contact"><div class="contact-card"><div class="contact-top"><p class="eyebrow">Have a good challenge?</p><span class="contact-spark">✳</span></div><h2>Let's make the<br><em>next move count.</em></h2><div class="contact-bottom"><p>Tell us what you're working through.<br>We'll find a useful place to start.</p><a class="button button-lime" data-whatsapp-link href="#" aria-disabled="true">Talk with Alphanity <span>↗</span></a></div></div></section>
    </main>

    <footer class="site-footer section-wrap"><a class="wordmark footer-wordmark" href="#top"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>alphanity<span class="wordmark-period">.</span></span></a><span class="footer-note">Good work, made together.</span><button class="team-access" id="team-access">Team access <span>↗</span></button><span class="copyright">© <span id="year"></span> Alphanity</span></footer>
  </div>

  <dialog class="admin-dialog" id="admin-dialog" aria-labelledby="dialog-title">
    <button class="dialog-close" id="dialog-close" aria-label="Close dialog">×</button>
    <div class="dialog-kicker">Alphanity workspace</div><h2 id="dialog-title">Team access</h2><p class="dialog-intro">Sign in to manage the projects shown on your site.</p>
    <form id="login-form" class="login-form"><label for="admin-password">Team password</label><input id="admin-password" type="password" autocomplete="current-password" required placeholder="Enter your team password"><button class="button button-dark" type="submit">Continue <span>↗</span></button><p class="form-message" id="login-message" role="status"></p></form>
    <section class="admin-panel" id="admin-panel" hidden>
      <div class="admin-panel-head"><div><span class="dialog-kicker">Project library</span><h3 id="project-form-title">Add a project</h3></div><button id="sign-out" class="quiet-button" type="button">Sign out</button></div>
      <form id="project-form" class="project-form">
        <input name="id" type="hidden">
        <label>Project name<input name="title" maxlength="100" required placeholder="e.g. Operations workspace"></label>
        <div class="form-row"><label>Discipline<input name="category" maxlength="60" required placeholder="Digital operations"></label><label>Year<input name="year" maxlength="12" placeholder="2026"></label></div>
        <label>Short description<textarea name="summary" rows="3" maxlength="260" required placeholder="What challenge did this work address?"></textarea></label>
        <label>Outcome or focus<input name="outcome" maxlength="100" required placeholder="Clarity for every handoff"></label>
        <label>Cover image<input name="cover_image_file" type="file" accept="image/jpeg,image/png,image/webp"><span class="upload-hint">One image · JPG, PNG, or WebP · max 6 MB</span><img class="cover-preview" id="cover-preview" alt="Project cover preview" hidden></label>
        <label>Accent<select name="visual"><option value="mint">Mint</option><option value="lilac">Lilac</option><option value="peach">Peach</option></select></label>
        <div class="admin-form-actions"><button class="button button-dark" type="submit" id="save-project">Save project</button><button class="quiet-button" type="button" id="cancel-edit" hidden>Cancel edit</button></div><p class="form-message" id="project-message" role="status"></p>
      </form>
      <div class="admin-list-head"><h3>Published projects</h3><span id="project-count">0</span></div><div id="admin-project-list" class="admin-project-list"></div>
    </section>
  </dialog>

  <dialog class="image-viewer" id="image-viewer" aria-labelledby="showcase-title">
    <button class="image-viewer-close" id="image-viewer-close" type="button" aria-label="Close image preview">×</button>
    <div class="showcase-layout">
      <div class="showcase-stage" id="showcase-stage">
        <img id="image-viewer-image" alt="">
        <div class="showcase-placeholder" id="showcase-placeholder" hidden><span>alphanity.</span><b>A</b></div>
      </div>
      <section class="showcase-info" aria-live="polite">
        <p class="eyebrow eyebrow-dark" id="showcase-category"></p>
        <div class="showcase-meta"><span id="showcase-year"></span><span id="showcase-counter"></span></div>
        <h2 id="showcase-title"></h2>
        <p class="showcase-summary" id="showcase-summary"></p>
        <div class="showcase-focus"><span id="showcase-focus-label">Focus</span><b id="showcase-outcome"></b></div>
        <div class="showcase-controls">
          <button id="showcase-previous" type="button" aria-label="Previous project">←</button>
          <button id="showcase-next" type="button" aria-label="Next project">→</button>
        </div>
        <div class="showcase-progress" aria-hidden="true"><span id="showcase-progress-bar"></span></div>
      </section>
    </div>
  </dialog>
`;

document.querySelector('#year').textContent = new Date().getFullYear();

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const preserveWhitespace = (source, replacement) => {
  const leading = source.match(/^\s*/)?.[0] || '';
  const trailing = source.match(/\s*$/)?.[0] || '';
  return `${leading}${replacement}${trailing}`;
};

const applyLanguage = () => {
  document.documentElement.lang = currentLanguage;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('#project-grid, #admin-project-list')) continue;
    let source = originalTextNodes.get(node);
    if (source === undefined) {
      const current = node.nodeValue;
      const trimmed = current.trim();
      source = currentLanguage === 'en' ? preserveWhitespace(current, englishText[trimmed] || trimmed) : preserveWhitespace(current, englishText[trimmed] || trimmed);
      originalTextNodes.set(node, source);
    }
    node.nodeValue = preserveWhitespace(source, translate(source.trim()));
  }

  document.querySelectorAll('[placeholder], [aria-label]').forEach((element) => {
    for (const attribute of ['placeholder', 'aria-label']) {
      if (!element.hasAttribute(attribute)) continue;
      let source = originalAttributes.get(element)?.[attribute];
      if (source === undefined) {
        const current = element.getAttribute(attribute);
        source = englishText[current] || current;
        originalAttributes.set(element, { ...originalAttributes.get(element), [attribute]: source });
      }
      element.setAttribute(attribute, translate(source));
    }
  });

  document.querySelector('#language-toggle').setAttribute('aria-label', currentLanguage === 'id' ? 'Ganti bahasa ke Inggris' : 'Ganti bahasa ke Indonesia');
  document.querySelector('#language-toggle').dataset.language = currentLanguage;
  document.title = currentLanguage === 'id' ? 'Alphanity — Karya baik, dibuat bersama' : 'Alphanity — Good work, made together';
  document.querySelector('meta[name="description"]').content = currentLanguage === 'id'
    ? 'Alphanity adalah tim digital independen yang mengubah tantangan rumit menjadi produk dan sistem yang bermanfaat.'
    : 'Alphanity is an independent digital team turning complicated challenges into useful products and systems.';
};

const visualLabels = {
  en: { mint: 'A shared view<br>of the work', lilac: 'Ready for<br>the field', peach: 'Signals into<br>decisions' },
  id: { mint: 'Satu tampilan<br>untuk semua', lilac: 'Siap untuk<br>tim lapangan', peach: 'Sinyal menjadi<br>keputusan' },
};
const artNumbers = { mint: '04', lilac: '24/7', peach: '360°' };
const projectMarkup = (project, index) => `
  <article class="project-card project-${esc(project.visual || ['mint', 'lilac', 'peach'][index % 3])}">
    <div class="project-art ${project.cover_image ? 'has-cover' : ''}">${project.cover_image ? `<button class="project-cover-trigger" type="button" data-view-image data-project-index="${index}" data-image-src="${esc(project.cover_image)}" data-image-alt="${esc(project.title)}" aria-label="${esc(translate('View full image'))}"><img class="project-cover" src="${esc(project.cover_image)}" alt=""></button>` : ''}<div class="project-art-top"><span>${esc(project.category)}</span><span>${esc(project.year || '')}</span></div>${project.cover_image ? '' : `<div class="project-art-shape"><div class="shape-window"><div class="shape-window-bar"><i></i><i></i><i></i></div><div class="shape-window-content"><b>${artNumbers[project.visual] || artNumbers[['mint', 'lilac', 'peach'][index % 3]]}</b><span>${visualLabels[currentLanguage][project.visual] || visualLabels[currentLanguage][['mint', 'lilac', 'peach'][index % 3]]}</span><div class="shape-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div><div class="shape-orb"></div></div>`}<span class="project-index">A / 0${index + 1}</span></div>
    <div class="project-copy"><div class="project-copy-top"><h3>${esc(project.title)}</h3><span class="project-arrow" aria-hidden="true">↗</span></div><p>${esc(project.summary)}</p><div class="project-result"><span>${esc(translate('Focus'))}</span><b>${esc(project.outcome)}</b></div></div>
  </article>`;

const projectGrid = document.querySelector('#project-grid');
const imageViewer = document.querySelector('#image-viewer');
const imageViewerImage = document.querySelector('#image-viewer-image');
const dataStatus = document.querySelector('#data-status');
const sampleNote = document.querySelector('#sample-note');
let projects = [];
let adminToken = '';

const showcase = {
  stage: document.querySelector('#showcase-stage'),
  image: imageViewerImage,
  placeholder: document.querySelector('#showcase-placeholder'),
  category: document.querySelector('#showcase-category'),
  year: document.querySelector('#showcase-year'),
  title: document.querySelector('#showcase-title'),
  summary: document.querySelector('#showcase-summary'),
  focusLabel: document.querySelector('#showcase-focus-label'),
  outcome: document.querySelector('#showcase-outcome'),
  counter: document.querySelector('#showcase-counter'),
  progress: document.querySelector('#showcase-progress-bar'),
};
let showcaseIndex = 0;
let showcaseReturnScrollY = 0;
let swipeStartX = null;

const currentShowcaseProjects = () => projects.length ? projects : starterProjects[currentLanguage];
const renderShowcaseSlide = () => {
  const items = currentShowcaseProjects();
  if (!items.length) return;
  const project = items[showcaseIndex];
  const hasImage = Boolean(project.cover_image);
  showcase.image.hidden = !hasImage;
  showcase.placeholder.hidden = hasImage;
  if (hasImage) {
    showcase.image.src = project.cover_image;
    showcase.image.alt = project.title;
  } else {
    showcase.image.removeAttribute('src');
    showcase.image.alt = '';
  }
  showcase.category.textContent = project.category || translate('Project');
  showcase.year.textContent = project.year ? `${translate('Year')} · ${project.year}` : '';
  showcase.title.textContent = project.title;
  showcase.summary.textContent = project.summary || '';
  showcase.focusLabel.textContent = translate('Focus');
  showcase.outcome.textContent = project.outcome || '';
  showcase.counter.textContent = `${String(showcaseIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  showcase.progress.style.width = `${((showcaseIndex + 1) / items.length) * 100}%`;
};

const moveShowcase = (direction) => {
  const items = currentShowcaseProjects();
  if (!items.length) return;
  showcaseIndex = (showcaseIndex + direction + items.length) % items.length;
  renderShowcaseSlide();
};

projectGrid.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-view-image]');
  if (!trigger) return;
  showcaseIndex = Number(trigger.dataset.projectIndex) || 0;
  showcaseReturnScrollY = window.scrollY;
  renderShowcaseSlide();
  imageViewer.showModal();
});
document.querySelector('#image-viewer-close').addEventListener('click', () => imageViewer.close());
document.querySelector('#showcase-previous').addEventListener('click', () => moveShowcase(-1));
document.querySelector('#showcase-next').addEventListener('click', () => moveShowcase(1));
imageViewer.addEventListener('click', (event) => { if (event.target === imageViewer) imageViewer.close(); });
imageViewer.addEventListener('close', () => {
  requestAnimationFrame(() => {
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, showcaseReturnScrollY);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  });
});
imageViewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveShowcase(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); moveShowcase(1); }
});
showcase.stage.addEventListener('pointerdown', (event) => { swipeStartX = event.clientX; });
showcase.stage.addEventListener('pointerup', (event) => {
  if (swipeStartX === null) return;
  const distance = event.clientX - swipeStartX;
  swipeStartX = null;
  if (Math.abs(distance) > 55) moveShowcase(distance > 0 ? -1 : 1);
});
showcase.stage.addEventListener('pointercancel', () => { swipeStartX = null; });

const configureWhatsAppLinks = async () => {
  let number = '';
  try {
    const response = await fetch('/api/config');
    if (response.ok) number = (await response.json()).whatsappNumber || '';
  } catch {}
  document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    const isConfigured = Boolean(number);
    link.href = isConfigured ? `https://wa.me/${number}` : '#';
    link.setAttribute('aria-disabled', String(!isConfigured));
    link.title = isConfigured ? '' : translate('WhatsApp number is not configured. Add WHATSAPP_NUMBER=62... to .env.');
    if (isConfigured) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
  });
};
document.querySelectorAll('[data-whatsapp-link]').forEach((link) => link.addEventListener('click', (event) => {
  if (link.getAttribute('aria-disabled') === 'true') event.preventDefault();
}));

const readApiResponse = async (response) => {
  const text = await response.text();
  if (!text.trim()) {
    throw new Error(translate('Server returned an empty response. Restart the dev server with npm run dev.'));
  }
  try { return JSON.parse(text); }
  catch {
    if (response.status === 404) throw new Error(translate('Admin API not found. Stop the old dev server, run npm run dev, then reload this page.'));
    throw new Error(translate('Server returned an unexpected response. Check that npm run dev is running.'));
  }
};

const localizeError = (message) => currentLanguage === 'id'
  ? (idText[message] || translate('An unexpected error occurred. Please try again.'))
  : message;

const setDataStatus = (message, state = '') => {
  dataStatus.innerHTML = `<i></i> ${esc(message)}`;
  dataStatus.className = `data-status ${state}`;
};

const renderProjects = (items) => {
  const visible = items.length ? items : starterProjects[currentLanguage];
  projectGrid.innerHTML = visible.map(projectMarkup).join('');
  sampleNote.hidden = items.length > 0;
};

const loadProjects = async () => {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error(translate('Project service unavailable'));
    projects = await response.json();
    renderProjects(projects);
    setDataStatus(translate('Live project library'), 'is-live');
  } catch {
    projects = [];
    renderProjects(projects);
    setDataStatus(translate('Preview content'), 'is-preview');
  }
};

const dialog = document.querySelector('#admin-dialog');
const loginForm = document.querySelector('#login-form');
const adminPanel = document.querySelector('#admin-panel');
const projectForm = document.querySelector('#project-form');
const projectMessage = document.querySelector('#project-message');
const loginMessage = document.querySelector('#login-message');
const adminProjectList = document.querySelector('#admin-project-list');
const coverPreview = document.querySelector('#cover-preview');
let previewObjectUrl = '';

const showCoverPreview = (source = '') => {
  if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
  previewObjectUrl = source.startsWith('blob:') ? source : '';
  coverPreview.src = source;
  coverPreview.hidden = !source;
};

const resetProjectForm = () => {
  projectForm.reset();
  projectForm.elements.id.value = '';
  showCoverPreview('');
  document.querySelector('#project-form-title').textContent = translate('Add a project');
  document.querySelector('#save-project').textContent = translate('Save project');
  document.querySelector('#cancel-edit').hidden = true;
};

const authorizedFetch = (url, options = {}) => fetch(url, {
  ...options,
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}`, ...(options.headers || {}) },
});

const renderAdminList = () => {
  document.querySelector('#project-count').textContent = projects.length;
  adminProjectList.innerHTML = projects.length ? projects.map((project) => `
    <article class="admin-project-row"><div class="admin-project-identity">${project.cover_image ? `<img class="admin-project-thumb" src="${esc(project.cover_image)}" alt="">` : '<span class="admin-project-thumb is-empty">A</span>'}<div><b>${esc(project.title)}</b><span>${esc(project.category)}</span></div></div><div><button type="button" data-edit="${project.id}">${esc(translate('Edit'))}</button><button type="button" data-delete="${project.id}">${esc(translate('Delete'))}</button></div></article>
  `).join('') : `<p class="admin-empty">${esc(translate('No projects yet. Add your first one above.'))}</p>`;
};

const refreshAdminProjects = async () => {
  const response = await authorizedFetch('/api/projects');
  if (!response.ok) throw new Error(translate('Could not load the project library. Check the MySQL connection.'));
  projects = await response.json();
  renderProjects(projects);
  renderAdminList();
  setDataStatus(translate('Live project library'), 'is-live');
};

document.querySelector('#team-access').addEventListener('click', () => dialog.showModal());
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

document.querySelector('#language-toggle').addEventListener('click', () => {
  currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
  try { localStorage.setItem('alphanity-language', currentLanguage); } catch {}
  applyLanguage();
  configureWhatsAppLinks();
  renderProjects(projects);
  if (!adminPanel.hidden) renderAdminList();
  if (dataStatus.classList.contains('is-live')) setDataStatus(translate('Live project library'), 'is-live');
  else if (dataStatus.classList.contains('is-preview')) setDataStatus(translate('Preview content'), 'is-preview');
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginMessage.textContent = translate('Checking access…');
  try {
    const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: document.querySelector('#admin-password').value }) });
    const result = await readApiResponse(response);
    if (!response.ok) throw new Error(localizeError(result.error || 'Could not sign in.'));
    adminToken = result.token;
    loginForm.hidden = true;
    adminPanel.hidden = false;
    loginMessage.textContent = '';
    try { await refreshAdminProjects(); }
    catch (error) { projectMessage.textContent = localizeError(error.message); }
  } catch (error) {
    loginMessage.textContent = localizeError(error.message);
  }
});

document.querySelector('#sign-out').addEventListener('click', () => {
  adminToken = '';
  adminPanel.hidden = true;
  loginForm.hidden = false;
  document.querySelector('#admin-password').value = '';
  resetProjectForm();
});

projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  projectMessage.textContent = translate('Saving…');
  const formData = new FormData(projectForm);
  const payload = Object.fromEntries(formData.entries());
  const id = payload.id;
  const coverFile = projectForm.elements.cover_image_file.files[0];
  delete payload.cover_image_file;
  delete payload.id;
  try {
    const response = await authorizedFetch(id ? `/api/projects/${encodeURIComponent(id)}` : '/api/projects', { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    const result = await readApiResponse(response);
    if (!response.ok) throw new Error(localizeError(result.error || 'Could not save the project.'));
    const savedId = id || result.id;
    projectForm.elements.id.value = savedId;
    if (coverFile) {
      projectMessage.textContent = translate('Uploading cover…');
      const uploadResponse = await fetch(`/api/projects/${encodeURIComponent(savedId)}/cover`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': coverFile.type },
        body: coverFile,
      });
      const uploadResult = await readApiResponse(uploadResponse);
      if (!uploadResponse.ok) throw new Error(localizeError(uploadResult.error || 'Project saved, but the cover image could not be uploaded.'));
    }
    await refreshAdminProjects();
    resetProjectForm();
    projectMessage.textContent = translate('Project saved.');
  } catch (error) { projectMessage.textContent = localizeError(error.message); }
});

document.querySelector('#cancel-edit').addEventListener('click', resetProjectForm);
projectForm.elements.cover_image_file.addEventListener('change', () => {
  const file = projectForm.elements.cover_image_file.files[0];
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    projectForm.elements.cover_image_file.value = '';
    showCoverPreview('');
    projectMessage.textContent = translate('Choose a JPG, PNG, or WebP image.');
    return;
  }
  if (file.size > 6 * 1024 * 1024) {
    projectForm.elements.cover_image_file.value = '';
    showCoverPreview('');
    projectMessage.textContent = translate('The cover image must be 6 MB or smaller.');
    return;
  }
  showCoverPreview(URL.createObjectURL(file));
  projectMessage.textContent = '';
});
adminProjectList.addEventListener('click', async (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  if (editId) {
    const project = projects.find((entry) => String(entry.id) === editId);
    if (!project) return;
    Object.entries(project).forEach(([key, value]) => { if (projectForm.elements[key]) projectForm.elements[key].value = value ?? ''; });
    showCoverPreview(project.cover_image || '');
    document.querySelector('#project-form-title').textContent = translate('Edit project');
    document.querySelector('#save-project').textContent = translate('Update project');
    document.querySelector('#cancel-edit').hidden = false;
    projectForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (deleteId && window.confirm(translate('Delete this project from the site?'))) {
    projectMessage.textContent = translate('Deleting…');
    try {
      const response = await authorizedFetch(`/api/projects/${encodeURIComponent(deleteId)}`, { method: 'DELETE' });
      const result = response.status === 204 ? {} : await readApiResponse(response);
      if (!response.ok) throw new Error(localizeError(result.error || 'Could not delete the project.'));
      await refreshAdminProjects();
      projectMessage.textContent = translate('Project deleted.');
    } catch (error) { projectMessage.textContent = localizeError(error.message); }
  }
});

const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

applyLanguage();
configureWhatsAppLinks();
loadProjects();
