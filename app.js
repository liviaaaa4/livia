
const S5 = ["Tidak pernah", "Kurang dari 1 jam", "1 hingga kurang dari 2 jam", "2 hingga kurang dari 4 jam", "4 jam atau lebih"];
const S7 = ["Tidak pernah", "Kurang dari 1 sampai 2 jam", "Kurang dari 3 sampai 4 jam", "Kurang dari 5 sampai 7 jam", "8 jam atau lebih"]; // soal 10 dan 20 (indikator, tidak masuk skor)
const d = t => "Dalam sehari, berapa lama kamu " + t + "?";
// [kategori, pertanyaan, pilihan]. Skor tiap jawaban = urutan pilihan (A = 0, B = 1, dst).
const Q = [
  ["Akademik", d("duduk saat mengikuti perkuliahan"), S5],
  ["Akademik", d("duduk saat mengerjakan tugas kuliah"), S5],
  ["Akademik", d("duduk menggunakan laptop untuk membuat tugas atau laporan"), S5],
  ["Akademik", d("duduk saat belajar menggunakan materi digital untuk persiapan ujian"), S5],
  ["Sosial/Menunggu", d("duduk sambil menunggu jadwal perkuliahan berikutnya"), S5],
  ["Digital/Komunikasi", d("duduk menggunakan HP untuk membaca atau membalas pesan pribadi dan grup pertemanan"), S5],
  ["Digital/Hiburan", d("duduk menonton film, serial, atau siaran langsung di televisi atau perangkat digital"), S5],
  ["Digital/Hiburan", d("duduk bermain gim setelah kegiatan kuliah"), S5],
  ["Digital/Hiburan", d("duduk saat berkumpul dengan teman tanpa banyak bergerak"), S5],
  ["Total durasi duduk", "Secara keseluruhan, berapa lama kamu duduk saat terjaga dalam sehari, termasuk kuliah, mengerjakan tugas, dan aktivitas lainnya?", S7],
  ["Istirahat dan Waktu Luang", d("rebahan di tempat tidur setelah kuliah karena merasa lelah"), S5],
  ["Istirahat dan Waktu Luang", d("rebahan sambil membaca atau membalas pesan pribadi dan grup pertemanan"), S5],
  ["Membaca dan Aktivitas Audio", d("rebahan sambil membaca buku, komik, atau bacaan nonakademik"), S5],
  ["Membaca dan Aktivitas Audio", d("rebahan sambil mendengarkan musik atau podcast tanpa melakukan aktivitas fisik lain"), S5],
  ["Digital/Hiburan", d("rebahan sambil bermain gim di HP"), S5],
  ["Digital/Hiburan", d("rebahan sambil menonton video pendek di HP"), S5],
  ["Istirahat dan Waktu Luang", d("rebahan saat menunda mengerjakan tugas kuliah"), S5],
  ["Istirahat dan Waktu Luang", d("rebahan saat terjaga pada siang hari, di luar waktu tidur"), S5],
  ["Istirahat dan Waktu Luang", "Pada hari Sabtu dan Minggu, rata-rata berapa lama kamu rebahan saat terjaga karena memilih beraktivitas di kos atau rumah?", S5],
  ["Total durasi rebahan", "Secara keseluruhan, berapa lama kamu rebahan saat terjaga dalam sehari, di luar waktu tidur?", S7]
];
// Skor utama = soal 1-9 dan 11-19 (18 soal x maks 4 = 72). Soal 10 dan 20 hanya indikator, tidak masuk skor.
const CATS = ["Akademik", "Sosial/Menunggu", "Digital/Komunikasi", "Digital/Hiburan", "Istirahat dan Waktu Luang", "Membaca dan Aktivitas Audio"];
const MAKS = 72, isInd = k => k.startsWith("Total");
const C = {
  "Akademik": ["bag", "#ffd84d"], "Sosial/Menunggu": ["sit", "#ffb3c7"], "Digital/Komunikasi": ["chat", "#8ec5ff"],
  "Digital/Hiburan": ["tv", "#ff9a76"], "Istirahat dan Waktu Luang": ["bed", "#c3b3ff"], "Membaca dan Aktivitas Audio": ["book", "#c7e36b"],
  "Total durasi duduk": ["chair", "#7fd6c2"], "Total durasi rebahan": ["sofa", "#7fd6c2"]
};
const ACT = {
  "Akademik": ["Berdiri atau jalan sejenak di sela kuliah dan mengerjakan tugas; belajar sambil berdiri bergantian", "Tiap 30–45 menit duduk", "2–5 menit"],
  "Sosial/Menunggu": ["Saat menunggu jadwal kuliah, jalan keliling kampus atau naik-turun tangga", "Selama jeda kuliah", "10–15 menit"],
  "Digital/Komunikasi": ["Balas pesan sambil berdiri atau berjalan", "Tiap kali membalas pesan", "5–10 menit"],
  "Digital/Hiburan": ["Peregangan atau gerak ringan saat jeda episode atau antar ronde gim", "Tiap 30–45 menit", "3–5 menit"],
  "Istirahat dan Waktu Luang": ["Ganti sebagian rebahan dengan jalan santai atau beres-beres", "Setelah kuliah dan akhir pekan", "15–30 menit"],
  "Membaca dan Aktivitas Audio": ["Baca atau dengarkan musik/podcast sambil duduk tegak atau berjalan", "Saat membaca atau mendengarkan", "Selama sesi"]
};
const APPS = [
  ["Stand Up! The Work Break Timer", "Pengingat berdiri dan istirahat berkala", "Android", ["Akademik", "Digital/Hiburan"]],
  ["Stretchly", "Pengingat jeda dan peregangan di laptop", "Windows, macOS, Linux", ["Akademik", "Digital/Hiburan"]],
  ["Apple Kesehatan (pengingat berdiri)", "Memantau langkah dan mengingatkan berdiri, dengan Apple Watch", "iPhone, Apple Watch", ["Akademik", "Sosial/Menunggu"]],
  ["Samsung Health", "Pencatat langkah, aktivitas, dan target harian", "Android (Samsung)", ["Sosial/Menunggu", "Istirahat dan Waktu Luang"]],
  ["Digital Wellbeing / Screen Time", "Membatasi waktu layar dan mengatur jeda", "Android / iPhone", ["Digital/Komunikasi", "Digital/Hiburan", "Membaca dan Aktivitas Audio"]],
  ["Pacer", "Penghitung langkah dan target jalan kaki", "Android, iPhone", ["Sosial/Menunggu", "Istirahat dan Waktu Luang", "Membaca dan Aktivitas Audio"]],
  ["Strava", "Mencatat jalan, lari, dan sepeda, plus komunitas", "Android, iPhone", ["Istirahat dan Waktu Luang"]],
  ["Nike Run Club", "Panduan lari untuk pemula", "Android, iPhone", ["Istirahat dan Waktu Luang"]]
];
// Lima kategori tingkat sedentari (nilai 0-100, dibagi rata)
const LV = [{ k: "sangat rendah", max: 20 }, { k: "rendah", max: 40 }, { k: "sedang", max: 60 }, { k: "tinggi", max: 80 }, { k: "sangat tinggi", max: 100 }];
const KATS = LV.map(l => l.k), kat = v => (LV.find(l => v <= l.max) || LV[4]).k;
const KET = {
  "sangat rendah": "Kebiasaan harianmu sangat aktif. Pertahankan, dan tetap jaga waktu duduk dan rebahanmu.",
  "rendah": "Kebiasaan harianmu tergolong aktif. Pertahankan, dan jaga supaya waktu duduk dan rebahannya tidak naik.",
  "sedang": "Waktu duduk dan rebahanmu cukup banyak. Perubahan kecil sudah akan terasa.",
  "tinggi": "Kamu menghabiskan banyak waktu dengan duduk dan rebahan. Mulai pelan-pelan dari satu kebiasaan.",
  "sangat tinggi": "Waktu duduk dan rebahanmu sangat banyak. Mulailah dengan jeda aktif yang singkat dan rutin."
};

// ===== UTIL =====
const LOGO_SRC = "logo.png";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const SL = { "Akademik": "Akademik", "Sosial/Menunggu": "Menunggu", "Digital/Komunikasi": "Komunikasi", "Digital/Hiburan": "Hiburan", "Istirahat dan Waktu Luang": "Istirahat", "Membaca dan Aktivitas Audio": "Membaca & Audio" };
const IC = {
  chair: '<path d="M7 3v9M7 12h10M8 12v9M16 12v9"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M9 21h6M12 17v4"/>', pc: '<rect x="5" y="5" width="14" height="10" rx="1"/><path d="M2 19h20"/>',
  bag: '<path d="M8 7a4 4 0 0 1 8 0M6 9h12v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM9 14h6"/>',
  sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2M6 16v3M18 16v3"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  back: '<path d="M15 5l-7 7 7 7"/>', next: '<path d="M9 5l7 7-7 7"/>',
  chat: '<path d="M3 4h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8l-3 3v-3H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM17 9h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v3l-3-3h-5"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.8"/>',
  cycle: '<path d="M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5M18 3v4h-4M6 21v-4h4"/>',
  mind: '<path d="M12 3a6 6 0 0 0-6 6c0 2 1 3 2 4v3h6v-3c1-1 2-2 2-4a6 6 0 0 0-6-6zM9 20h6M10 9h4M10 12h4"/>',
  sit: '<circle cx="9" cy="5" r="2"/><path d="M9 8v6h6l1 6M9 14l-3 6"/>', stretch: '<circle cx="12" cy="4" r="2"/><path d="M12 7v7M12 9l-5-3M12 9l5-3M12 14l-4 7M12 14l4 7"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 14.5V21M9.6 11l-6.2-1.8M14.4 11l6.2-1.8"/>',
  lie: '<circle cx="5" cy="9" r="2"/><path d="M8 11h9a3 3 0 0 1 3 3v2H3v-3M3 16v3M20 16v3"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M6 12h3l1.5-3 2 5 1.5-2H18"/>'
};
const ic = (k, s = 20, w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const ARR = '<svg width="18" height="10" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 7h23M18 1l6 6-6 6"/></svg>';
const BARS = '<svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M1 2h20M1 8h20M1 14h20"/></svg>';
const app = document.getElementById("app");
let A = Array(Q.length).fill(null), i = 0, who = { n: "", u: "", e: "", g: "", k: "", c: false }, LAP = null, PAY = null, STX = "";
const newId = () => "r" + Math.random().toString(36).slice(2, 10); // diawali huruf agar tidak dibaca Sheets sebagai angka
let SID = newId();

// ===== KERANGKA HALAMAN =====
const STEPS = ["Informasi", "Data Diri", "Kuesioner", "Hasil"];
const stepper = n => `<div class="stp">${STEPS.map((t, j) => `<div class="sg"><i class="${j + 1 == n ? "on" : j + 1 < n ? "done" : ""}">${j + 1 < n ? "✓" : j + 1}</i><span>${t}</span></div>`).join("")}</div>`;
function hdr() {
  return `<header class="hd"><div class="hd-in"><a class="wm" href="#" onclick="landing();return false">LIVIA</a>
<nav class="dn" aria-label="Navigasi utama"><a href="#" onclick="landing();return false">Beranda</a><a href="#" onclick="info();return false">Tentang sedentari</a><a href="#" onclick="adminLogin();return false">Admin</a></nav>
<button class="hb" aria-label="Menu" onclick="menu()">${BARS}</button>
<nav class="mn" id="mn"><a href="#" onclick="landing();return false">Beranda</a><a href="#" onclick="info();return false">Tentang sedentari</a><a href="#" onclick="adminLogin();return false">Admin</a></nav></div></header>`;
}
function menu() { document.getElementById("mn").classList.toggle("open") }
function page(n, inner, cls) {
  app.className = cls || "";
  app.innerHTML = `${hdr()}<main class="card in">${n ? stepper(n) : ""}${inner}</main>`;
  window.scrollTo(0, 0);
}

// ===== 1. LANDING =====
const fi = (k, s, css) => `<span class="fi" style="${css}">${ic(k, s, 1.2)}</span>`;
function landing() {
  app.className = "land";
  app.innerHTML = `${hdr()}<div class="rpb" id="rpb"></div><section class="ld in"><div class="ld-in">
<div class="ld-art">${fi("lie", 30, "top:0;left:44%")}${fi("sit", 28, "top:10%;left:9%")}${fi("clock", 26, "top:8%;right:11%")}${fi("stretch", 28, "top:52%;left:4%")}${fi("heart", 30, "top:46%;right:6%")}${fi("wheel", 30, "bottom:2%;left:22%")}${fi("pc", 28, "bottom:4%;right:20%")}
<img class="lg" src="${LOGO_SRC}" alt="Logo LIVIA" width="124" height="124"></div>
<div class="ld-txt"><h1 class="bn">LIVIA</h1><div class="tg">Live Better, Live Aware</div>
<p class="ls">Kenali dan pahami kebiasaanmu.<br>Mulai perubahan kecil yang berarti!</p>
<button class="pl lime" onclick="go('tentang')">Mulai sekarang ${ARR}</button></div></div>
<svg class="sh sh-m" viewBox="0 0 600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<path d="M0 262C120 238 240 282 330 292C440 300 500 220 600 80V300H0Z" fill="#FFF8E7"/><path d="M0 60C70 90 110 140 140 215L150 300H0Z" fill="#D9EF45"/><path d="M520 300L600 215V300Z" fill="#D9EF45"/>
<g fill="#172A3A"><path d="M548 165C530 185 530 215 548 235C566 215 566 185 548 165Z"/><path d="M548 225C525 215 508 225 503 250C525 255 545 245 548 225Z"/><path d="M550 210C573 200 590 210 595 230C573 238 554 230 550 210Z"/><rect x="546" y="232" width="4" height="62" rx="2"/></g></svg>
<svg class="sh sh-d" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<path d="M0 205C260 170 500 236 780 242C1080 248 1260 150 1440 52V260H0Z" fill="#FFF8E7"/><path d="M0 70C90 100 160 170 200 260H0Z" fill="#D9EF45"/><path d="M1290 260L1440 140V260Z" fill="#D9EF45"/>
<g fill="#172A3A" transform="translate(800 -34)"><path d="M548 165C530 185 530 215 548 235C566 215 566 185 548 165Z"/><path d="M548 225C525 215 508 225 503 250C525 255 545 245 548 225Z"/><path d="M550 210C573 200 590 210 595 230C573 238 554 230 550 210Z"/><rect x="546" y="232" width="4" height="62" rx="2"/></g></svg></section>${about()}`;
  window.scrollTo(0, 0);
}

// ===== 2. DATA DIRI =====
const rd = (f, a) => `<div class="rd">${a.map(v => `<button class="rb ${who[f] == v ? "on" : ""}" onclick="pk('${f}','${v}')"><i></i>${v}</button>`).join("")}</div>`;
const pg = (f, a) => `<div class="pg">${a.map(v => `<button class="${who[f] == v ? "on" : ""}" onclick="pk('${f}','${v}')">${v}</button>`).join("")}</div>`;
function pk(f, v) { who[f] = v; showForm() }
function showForm() {
  page(2, `<div class="cols"><div class="c1 panel"><img class="pl-logo" src="${LOGO_SRC}" alt="" width="64" height="64"><h1 class="h1">Welcome, Liviwers!</h1><p class="sb">Ready To Check Your Life?</p>
<ul class="pts"><li>20 pertanyaan tentang kebiasaan duduk dan rebahan</li><li>Hasil lengkap dikirim dalam bentuk PDF ke email kamu</li></ul></div>
<div class="c2"><div class="fgrid">
<div class="f full"><label class="lb">Nama Lengkap</label><input class="fld" placeholder="Masukkan Nama Lengkap" value="${esc(who.n)}" oninput="who.n=this.value;ok()" autocomplete="name"></div>
<div class="f"><label class="lb">Usia</label><input class="fld" type="number" min="5" max="100" placeholder="Masukkan Usia Anda" value="${esc(who.u)}" oninput="who.u=this.value;ok()"></div>
<div class="f"><label class="lb">Jenis Kelamin</label>${rd("g", ["Laki-laki", "Perempuan"])}</div>
<div class="f full"><label class="lb">Aktivitas Utama</label>${pg("k", ["Pelajar", "Mahasiswa", "Pekerja", "Lainnya"])}</div>
<div class="f full"><label class="lb">Email</label><input class="fld" type="email" placeholder="Masukkan Email Aktif" value="${esc(who.e)}" oninput="who.e=this.value;ok()" autocomplete="email"></div></div>
<label class="cb"><input type="checkbox" ${who.c ? "checked" : ""} onchange="who.c=this.checked;ok()"><span>Saya setuju hasil kuesioner (PDF) dikirim ke email ini.</span></label>
<button class="pl" id="go" onclick="startQuiz()">Lanjut ${ARR}</button></div></div>`);
  ok();
}
function ok() {
  const b = document.getElementById("go");
  if (b) b.disabled = !(who.n.trim() && who.u && who.g && who.k && who.c && /^\S+@\S+\.\S+$/.test(who.e.trim()));
}

// ===== 3. TENTANG SEDENTARI (satu halaman dengan beranda) =====
function info() { landing(); setTimeout(() => go("tentang"), 60) }
const about = () => `<section class="tt" id="tentang"><div class="tt-in">
<aside class="tt-side"><div class="tt-ic">${ic("lie", 34, 1.8)}</div><h2 class="tt-h">Informasi Perilaku Sedentari</h2>
<p>Yuk, kenali lebih dalam tentang perilaku sedentari dan dampaknya bagi kesehatan!</p>
<ol class="toc"><li><a href="#s1" onclick="go('s1');return false">Apa itu perilaku sedentari?</a></li><li><a href="#s2" onclick="go('s2');return false">Beda dengan kurang aktivitas fisik</a></li><li><a href="#s3" onclick="go('s3');return false">Kenapa perlu diperhatikan?</a></li><li><a href="#s4" onclick="go('s4');return false">Anjuran WHO</a></li></ol></aside>
<div class="tt-body">
<article id="s1" class="cd c1"><div class="cd-h"><span class="nb">1</span><h3>Apa itu perilaku sedentari?</h3></div>
<div class="cd-b"><div class="il"><svg viewBox="0 0 240 160" role="img" aria-label="Ilustrasi orang rebahan di bean bag sambil memegang ponsel"><circle cx="168" cy="40" r="17" fill="#fff" stroke="#172A3A" stroke-width="2.5"/><path d="M168 30v10l7 4" stroke="#172A3A" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M212 150v-30" stroke="#3E7D46" stroke-width="3"/><path d="M212 128c-14-4-20-14-18-26 12 4 18 14 18 26zM212 120c10-2 18-10 18-22-12 2-18 10-18 22z" fill="#6BBF59"/><path d="M203 150h18l-3-14h-12z" fill="#E6A87A"/><path d="M14 142c0-30 22-46 62-46s74 14 74 40c0 10-6 16-22 16H36c-14 0-22-4-22-10z" fill="#1F3A5A"/><path d="M60 104c20-4 50-2 78 12l-4 12c-26-8-50-8-72-4z" fill="#6AA4D8"/><path d="M58 74c-6 14-6 28 4 36l24-6c-4-14-4-24-8-34z" fill="#9EC7EE"/><circle cx="74" cy="60" r="11" fill="#F1C9A5"/><path d="M62 58c0-12 10-18 20-14 6 3 6 10 2 12-8-4-16-2-22 2z" fill="#233046"/><rect x="92" y="72" width="9" height="15" rx="2" fill="#172A3A" transform="rotate(-18 96 80)"/></svg></div><div><p><b>Perilaku sedentari adalah</b> kondisi saat kita <b>menghabiskan</b> sebagian besar waktu dalam posisi duduk, berbaring, atau minim bergerak dengan energi yang sangat rendah.</p>
<p class="note">Yang dihitung hanya saat terjaga; tidur tidak termasuk.</p></div></div></article>
<article id="s2" class="cd c2"><div class="cd-h"><span class="nb">2</span><h3>Apa bedanya sedentari dengan kurang aktivitas fisik?</h3></div>
<p>Sedentari dan kurang aktivitas fisik adalah dua hal yang berbeda. <b>Perbedaannya</b> terletak pada <b>tingkat gerakan dan pengeluaran energi.</b></p>
<div class="duo"><div class="sd"><b><i>${ic("sit", 16, 2)}</i>Sedentari:</b><ul><li>Minim bergerak</li><li>Posisi duduk atau berbaring</li><li>Pengeluaran energi rendah</li></ul></div>
<div class="ak"><b><i>${ic("stretch", 16, 2)}</i>Aktivitas fisik:</b><ul><li>Bergerak aktif</li><li>Melibatkan otot dan tenaga</li><li>Pengeluaran energi tinggi</li></ul></div></div>
<p class="note">Kamu bisa rutin berolahraga, tetapi tetap sedentari jika sisa harinya banyak dihabiskan sambil duduk atau rebahan.</p></article>
<article id="s3" class="cd c3"><div class="cd-h"><span class="nb">3</span><h3>Kenapa sedentari perlu diperhatikan?</h3></div>
<p>Terlalu banyak waktu sedentari dapat berdampak buruk bagi kesehatan, baik secara fisik maupun mental.</p>
<div class="trio"><div><span class="ci2" style="background:#FFA987">${ic("heart", 28, 2)}</span>Meningkatkan risiko penyakit jantung dan diabetes tipe 2</div>
<div><span class="ci2" style="background:#D79BFF">${ic("cycle", 28, 2)}</span>Memicu obesitas dan gangguan metabolisme</div>
<div><span class="ci2" style="background:#F6F7A6">${ic("mind", 28, 2)}</span>Menurunkan kesehatan mental (meningkatkan stres, kecemasan, dan rasa lelah)</div></div>
<p class="note" style="margin-top:14px">Hubungan ini berupa keterkaitan, jadi bukan berarti semua orang yang banyak duduk pasti sakit.</p></article>
<article id="s4" class="cd c4"><div class="cd-h"><span class="nb">4</span><h3>Anjuran WHO</h3></div>
<p>World Health Organization (WHO) menyarankan agar kita membatasi waktu sedentari dan lebih banyak bergerak setiap hari.</p>
<h4>Rekomendasi WHO</h4><p>Kurangi waktu duduk lama dan lakukan aktivitas fisik dengan intensitas sedang minimal 150 menit per minggu (untuk orang dewasa).</p>
<div class="cd-b"><div><h4>Tips sederhana:</h4><ul class="tips"><li>Berdiri atau berjalan setiap 30–60 menit</li><li>Gunakan tangga daripada lift</li><li>Lakukan peregangan ringan</li></ul></div><div class="il il4"><svg viewBox="0 0 150 110" role="img" aria-label="Ilustrasi dua orang bersepeda"><g fill="none" stroke="#172A3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="26" cy="82" r="19"/><circle cx="68" cy="82" r="19"/><path d="M26 82l14-24h22l6 24M40 58l12 24M36 52h12"/><circle cx="92" cy="82" r="19"/><circle cx="130" cy="82" r="19"/><path d="M92 82l12-24h20l6 24M104 58l12 24M100 52h12"/></g><path d="M40 30l16 18-9 6-16-12z" fill="#D9534F"/><circle cx="40" cy="24" r="8" fill="#F1C9A5"/><path d="M104 30l16 18-9 6-16-12z" fill="#4D9C94"/><circle cx="104" cy="24" r="8" fill="#F1C9A5"/><path d="M32 22c2-8 12-10 16-4-5-2-11-1-16 4z" fill="#233046"/><path d="M96 22c2-8 12-10 16-4-5-2-11-1-16 4z" fill="#233046"/></svg></div></div></article>
<div class="go" id="cta"><div><h3>Sekarang, giliran kebiasaanmu</h3><p>20 pertanyaan singkat tentang durasi duduk dan rebahanmu dalam 7 hari terakhir.</p></div><button class="pl" onclick="showForm()">Lanjut tes ${ARR}</button></div>
<div class="small">Rujukan: WHO, <i>Guidelines on Physical Activity and Sedentary Behaviour</i> (2020); Sedentary Behaviour Research Network, konsensus terminologi (2017). Informasi ini bersifat edukasi dan bukan pengganti saran tenaga kesehatan.</div>
</div></div></section>`;
function go(id) { const e = document.getElementById(id); if (e) e.scrollIntoView({ behavior: "smooth", block: "start" }) }
function scrollFx() {
  const b = document.getElementById("rpb"); if (!b) return;
  const e = document.documentElement;
  b.style.width = e.scrollTop / Math.max(1, e.scrollHeight - e.clientHeight) * 100 + "%";
}
window.addEventListener("scroll", scrollFx, { passive: true });

// ===== 4. KUESIONER =====
function startQuiz() { i = 0; quiz() }
const SK = { "Akademik": "akad", "Sosial/Menunggu": "tunggu", "Digital/Komunikasi": "chat", "Digital/Hiburan": "tv", "Istirahat dan Waktu Luang": "bed", "Membaca dan Aktivitas Audio": "book", "Total durasi duduk": "chair", "Total durasi rebahan": "sofa" };
// ilustrasi garis per kategori (ditampilkan samar di panel kiri kuesioner)
const SC = {
  akad: '<rect x="90" y="96" width="140" height="84" rx="6"/><path d="M70 180h180l-10 14H80zM110 116h100M110 134h70M110 152h90M30 194h260M236 60l36-14 36 14-36 14zM250 70v16c12 8 26 8 44 0V70M244 162h44v10h-44zM250 172h38v10h-38z"/>',
  tunggu: '<circle cx="160" cy="88" r="54"/><path d="M160 88V56M160 88l22 14M160 34v8M160 134v8M106 88h8M206 88h8M70 192h180M78 192v32M242 192v32M74 168h172v24"/>',
  chat: '<rect x="118" y="24" width="84" height="176" rx="14"/><path d="M148 40h24M40 70h80v36H40zM56 106l-6 14 20-14M200 122h84v36h-84zM264 158l8 14-22-14M54 88h50M214 140h58"/>',
  tv: '<rect x="56" y="34" width="208" height="130" rx="10"/><path d="M128 164l-14 26h92l-14-26M100 196h120M146 76l44 24-44 24z"/>',
  bed: '<path d="M36 176h248M36 176v38M284 176v38M36 148h248v28"/><rect x="48" y="120" width="64" height="28" rx="10"/><path d="M128 148v-14a14 14 0 0 1 14-14h122a16 16 0 0 1 16 16v12M236 36a28 28 0 1 0 30 40 22 22 0 0 1-30-40zM180 50v10M175 55h10"/>',
  book: '<path d="M160 76c-30-18-70-18-100-4v132c30-14 70-14 100 4 30-18 70-18 100-4V72c-30-14-70-14-100 4zM160 76v132M80 104h56M80 126h56M184 104h56M184 126h56M108 52a52 52 0 0 1 104 0M100 40h14v28h-14zM206 40h14v28h-14z"/>',
  chair: '<path d="M100 30h22v104h92l26 86M122 134l-14 88M204 134l-8 88M84 224h170"/>',
  sofa: '<path d="M36 124a22 22 0 0 1 22-22h204a22 22 0 0 1 22 22v70H36zM36 160h248M58 194v26M262 194v26"/><rect x="70" y="78" width="80" height="30" rx="14"/>'
};
function quiz() {
  const q = Q[i], last = i == Q.length - 1;
  const wk = i == 18 ? "Gunakan rata-rata hari Sabtu dan Minggu. Waktu tidur tidak dihitung." : "Rata-rata per hari dalam 7 hari terakhir. Waktu tidur tidak dihitung.";
  page(3, `<div class="qs" style="--ac:${C[q[0]][1]}"><aside class="qs-l"><div class="scene"><svg viewBox="0 0 320 240" aria-hidden="true">${SC[SK[q[0]]]}</svg></div><div class="qs-t"><small>${isInd(q[0]) ? "Indikator" : "Kategori"}</small><b>${q[0]}</b><span class="qs-n">Soal ${i + 1} dari ${Q.length}</span></div></aside>
<div class="qs-r"><div class="qh"><span class="ci">${ic(C[q[0]][0], 24)}</span><div class="qt"><small>${isInd(q[0]) ? "Indikator" : "Kategori"}</small><b>${q[0]}</b></div><div class="qn">${i + 1} dari ${Q.length}</div></div><div class="pb"><i style="width:${(i / Q.length) * 100}%"></i></div><h2 class="qq">${q[1]}</h2><div class="hn">${ic("clock", 14)}<span>${wk}</span></div>
${q[2].map((o, j) => `<button class="op ${A[i] === j ? "on" : ""}" onclick="ans(${j},this)"><b>${String.fromCharCode(65 + j)}</b>${o}</button>`).join("")}
<div class="nv"><button class="rn" aria-label="Sebelumnya" onclick="back()">${ic("back", 18, 2.2)}</button>
${last ? `<button class="pl" style="margin:0" id="nx" ${A[i] === null ? "disabled" : ""} onclick="next()">Lihat hasil ${ARR}</button>` : `<button class="rn" aria-label="Berikutnya" id="nx" ${A[i] === null ? "disabled" : ""} onclick="next()">${ic("next", 18, 2.2)}</button>`}</div></div></div>`);
}
function ans(j, el) {
  A[i] = j;
  document.querySelectorAll(".op").forEach(o => o.classList.remove("on"));
  el.classList.add("on");
  document.getElementById("nx").disabled = false;
}
function next() { if (A[i] === null) return; i < Q.length - 1 ? (i++, quiz()) : result() }
function back() { i ? (i--, quiz()) : showForm() }

// ===== 5. HASIL =====
function hitung(Z) {
  const cs = {}; CATS.forEach(c => cs[c] = { s: 0, n: 0 });
  let skor = 0;
  Q.forEach((q, j) => { if (cs[q[0]]) { cs[q[0]].s += Z[j]; cs[q[0]].n++; skor += Z[j] } });
  const v = Math.round(skor / MAKS * 100);
  const br = CATS.map(c => ({ c, v: Math.round(cs[c].s / (cs[c].n * 4) * 100) })).sort((a, b) => b.v - a.v);
  return { skor, v, br, k: kat(v) };
}
// Menyusun laporan lengkap dari array jawaban (indeks 0-based). Dipakai untuk hasil, PDF, dan dashboard admin.
function susun(Z, tgl) {
  const { skor, v, br, k } = hitung(Z);
  const top = br.slice(0, 3).filter(b => b.v > 33), tc = (top.length ? top : br.slice(0, 2)).map(b => b.c);
  const apps = APPS.map((a, j) => ({ a, s: a[3].filter(t => tc.includes(t)).length, j })).filter(x => x.s > 0).sort((x, y) => y.s - x.s || x.j - y.j).slice(0, 5).map(x => x.a.slice(0, 3));
  const acts = tc.map(c => [c, ...ACT[c]]);
  return {
    tgl, nilai: v, kategori: k, skor, maks: MAKS, br, acts, apps,
    duduk: Q[9][2][Z[9]], rebahan: Q[19][2][Z[19]],
    qa: Q.map((q, j) => [j + 1, q[0], q[1], q[2][Z[j]], isInd(q[0]) ? "indikator" : Z[j]])
  };
}
const tglDari = t => { const x = new Date(t); return isNaN(x) ? hari() : x.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) };
const hari = () => new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
const huruf = Z => Z.map(x => String.fromCharCode(65 + x)).join("");
const P = (r, a) => [150 + r * Math.cos(a * Math.PI / 180), 150 - r * Math.sin(a * Math.PI / 180)];
function seg(a0, a1, r0 = 88, r1 = 140) {
  const [x0, y0] = P(r1, a0), [x1, y1] = P(r1, a1), [x2, y2] = P(r0, a1), [x3, y3] = P(r0, a0);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r1} ${r1} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}A${r0} ${r0} 0 0 0 ${x3.toFixed(1)} ${y3.toFixed(1)}Z`;
}
const GA = [[178, 146], [142, 110], [106, 74], [70, 38], [34, 2]];
const gauge = () => `<svg class="gg" viewBox="0 0 300 170" role="img" aria-label="Pengukur tingkat sedentari, lima tingkat">
${GA.map((a, j) => `<path class="g${j + 1}" d="${seg(a[0], a[1])}"/>`).join("")}
<g id="nd" style="transform-origin:150px 150px;transform:rotate(0deg);transition:transform 1.3s cubic-bezier(.2,.8,.2,1)"><polygon points="54,150 150,128 150,172"/></g>
<circle cx="150" cy="150" r="17" class="hub"/><circle cx="150" cy="150" r="7" class="hub2"/></svg>`;
function result() {
  LAP = susun(A, hari()); STX = "";
  PAY = { type: "respons", id: SID, nama: who.n.trim(), usia: who.u, email: who.e.trim(), jk: who.g, status: who.k, nilai: LAP.nilai, kategori: LAP.kategori, skor: LAP.skor, duduk: LAP.duduk, rebahan: LAP.rebahan, jawaban: huruf(A), laporan: LAP };
  hasil(); kirim();
}
function hasil() {
  const v = LAP.nilai, k = LAP.kategori, br = CATS.map(c => LAP.br.find(b => b.c == c));
  page(4, `<div class="cols"><div class="c1"><h1 class="h1">Hai, ${esc(who.n.trim().split(" ")[0])}!</h1><p class="sb">Berikut adalah hasil analisis perilaku sedentari-mu.</p>
${gauge()}<div class="pct"><span id="num">0</span>%</div><div class="pcl">Perilaku Sedentarimu</div><div class="kt">Kategori ${k}</div>
<div class="lvl">${LV.map(l => `<span class="${l.k == k ? "on" : ""}">${l.k}</span>`).join("")}</div>
<p class="ket">${KET[k]}</p></div><div class="c2">
<div class="lab" style="margin-top:0">Lifestyle Score</div>
<div class="tiles">${br.map(b => `<div class="tl"><b>${b.v}%</b>${ic(C[b.c][0], 30, 1.6)}<span>${SL[b.c]}</span></div>`).join("")}</div>
<button class="pl o sm" style="margin:8px auto 0" onclick="detailHasil()">Lihat detail hasil ${ARR}</button>
<button class="pl" style="margin-top:22px" onclick="again()">Ulangi Kuesioner</button>
<div class="rwb"><button class="rn" aria-label="Kembali" onclick="i=Q.length-1;quiz()">${ic("back", 18, 2.2)}</button>
<div class="nt"><div id="st">${STX}</div><div class="ct">Hasil akhir akan dikirim melalui alamat email. Jika tidak menerima email hubungi kami:<br><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></div></div></div>
<div class="small">Kategori bersifat operasional prototipe dan belum divalidasi · bukan alat diagnosis medis</div></div></div>`);
  setTimeout(() => {
    const nd = document.getElementById("nd"); if (nd) nd.style.transform = `rotate(${v * 1.8}deg)`;
    let c = 0; const s = setInterval(() => { c += Math.max(1, Math.round(v / 30)); if (c >= v) { c = v; clearInterval(s) } const e = document.getElementById("num"); if (e) e.textContent = c }, 35);
  }, 100);
}
function detailHasil() {
  page(4, `<div class="cols"><div class="c1"><h1 class="h1">Detail Hasil</h1><p class="sb">Nilai ${LAP.nilai}% · kategori ${LAP.kategori} · skor mentah ${LAP.skor} dari ${LAP.maks}</p>
<div class="lab">Total durasi</div><div class="dur"><div><small>Duduk saat terjaga</small>${LAP.duduk}</div><div><small>Rebahan saat terjaga</small>${LAP.rebahan}</div></div></div><div class="c2">
<div class="lab">Lifestyle Score</div>${LAP.br.map((b, j) => `<div class="rw"><span>${ic(C[b.c][0])}</span><span class="nm">${b.c}${j == 0 && b.v > 33 ? "<em>PALING TINGGI</em>" : ""}</span><span class="v">${b.v}</span><div class="t"><i style="width:${b.v}%"></i></div></div>`).join("")}
<p class="ket" style="margin-top:18px">Rekomendasi kegiatan dan aplikasi yang sesuai dengan hasilmu ada di PDF yang dikirim ke emailmu.</p>
<div class="nv"><button class="rn" aria-label="Kembali" onclick="hasil()">${ic("back", 18, 2.2)}</button><button class="pl o" style="margin:0" onclick="again()">Ulangi kuesioner</button></div></div></div>`);
}

// ===== PENYIMPANAN LOKAL (mode demo) =====
function lokal() { try { return JSON.parse(localStorage.getItem("livia") || "[]") } catch (e) { return [] } }
function simpanLokal(p) {
  const l = lokal().filter(x => x.id !== p.id);
  l.push({ waktu: new Date().toISOString(), id: p.id, nama: p.nama, usia: p.usia, email: p.email, jk: p.jk, status: p.status, nilai: p.nilai, kategori: p.kategori, skor: p.skor, duduk: p.duduk, rebahan: p.rebahan, jawaban: p.jawaban, email_status: "demo (tidak dikirim)" });
  try { localStorage.setItem("livia", JSON.stringify(l)) } catch (e) { }
}
async function api(o) {
  const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(o) });
  return r.json();
}

// ===== PENGIRIMAN PDF OTOMATIS (responden) =====
function setSt(h) { STX = h; const e = document.getElementById("st"); if (e) e.innerHTML = h }
const resend = ` <a href="#" onclick="kirim();return false">Kirim ulang PDF</a>`;
async function kirim() {
  const em = esc(PAY.email);
  if (!ENDPOINT) { simpanLokal(PAY); return setSt("Mode demo: PDF tidak dikirim karena server belum dihubungkan.") }
  setSt(`Mengirim PDF hasil lengkapmu ke <b>${em}</b>…`);
  try {
    const j = await api(PAY), s = String(j.status || "");
    if (s === "terkirim") setSt(`Hasil akhir (PDF) sudah dikirim ke <b>${em}</b>. Cek inbox dan folder spam.`);
    else if (s.startsWith("dilewati")) setSt(`PDF baru saja dikirim ke <b>${em}</b>. Tunggu 2 menit jika ingin mengirim ulang.${resend}`);
    else if (s.startsWith("kuota")) setSt(`Kuota pengiriman hari ini habis. Admin akan memberikan PDF-mu secara manual.`);
    else if (s.startsWith("sistem")) setSt(`Sistem sedang sibuk.${resend}`);
    else if (s.startsWith("email")) setSt(`Alamat email <b>${em}</b> tidak valid. Ulangi kuesioner dengan email yang benar.`);
    else setSt(`PDF belum berhasil dikirim.${resend}`);
  } catch (e) {
    setSt(`Permintaan sudah dikirim ke <b>${em}</b>, tetapi statusnya tidak bisa dibaca. Cek inbox dan folder spam dalam beberapa menit.${resend}`);
  }
}
function again() { A = Array(Q.length).fill(null); LAP = PAY = null; STX = ""; SID = newId(); startQuiz() }

// ===== DASHBOARD ADMIN =====
let ADM = { rows: [], q: "", kat: "semua", key: "" };
function adminLogin(msg) {
  page(0, `<div class="kick">Khusus admin</div><h1 class="h1">Dashboard LIVIA</h1>
<p class="sb">${ENDPOINT ? "Kata sandi diperiksa oleh server." : "Mode demo: data diambil dari perangkat ini. Kata sandi bawaan: " + esc(ADMIN_DEMO_PW)}</p>
<label class="lb">Kata sandi</label><input class="fld" id="pw" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')adminGo()">
<div class="er">${esc(msg || "")}</div><button class="pl" id="ab" onclick="adminGo()">Masuk ${ARR}</button>`);
}
async function adminGo() {
  const b = document.getElementById("ab"); b.disabled = true;
  ADM.key = document.getElementById("pw").value;
  try { await muat(); adminView() } catch (e) { adminLogin(typeof e === "string" ? e : "Kata sandi salah atau data tidak bisa dimuat.") }
}
async function muat() {
  if (ENDPOINT) { const j = await api({ type: "admin", key: ADM.key }); if (!j.ok) throw String(j.status || "Kata sandi salah."); ADM.rows = j.respons || [] }
  else { if (ADM.key !== ADMIN_DEMO_PW) throw "Kata sandi salah."; ADM.rows = lokal() }
}
function zOf(r) {
  const s = String(r.jawaban || ""); if (s.length !== Q.length) return null;
  const Z = [...s].map(c => c.charCodeAt(0) - 65);
  return Z.every((x, j) => x >= 0 && x < Q[j][2].length) ? Z : null;
}
const dt = t => { const x = new Date(t); return isNaN(x) ? "" : x.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) + " " + x.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) };
function adminView() {
  const R = ADM.rows, n = R.length, nv = n ? Math.round(R.reduce((s, r) => s + (+r.nilai || 0), 0) / n * 10) / 10 : "–";
  const ct = k => R.filter(r => kat(+r.nilai) == k).length, tk = R.filter(r => r.email_status === "terkirim").length;
  page(0, `<div class="adh"><div><div class="kick">Peran: admin</div><h1 class="h1" style="margin:0">Dashboard responden</h1></div>
<div class="chips"><button onclick="reload()">Muat ulang</button><button onclick="ADM.key='';landing()">Keluar</button></div></div>
<div class="stats"><div class="stat"><b>${n}</b><span>Responden</span></div><div class="stat"><b>${nv}</b><span>Rata-rata nilai</span></div>${KATS.map(k => `<div class="stat"><b>${ct(k)}</b><span>${k}</span></div>`).join("")}<div class="stat"><b>${tk}</b><span>PDF terkirim</span></div></div>
<div class="chips" style="margin-bottom:12px">${["semua", ...KATS].map(v => `<button class="${ADM.kat == v ? "on" : ""}" onclick="ADM.kat='${v}';adminView()">${v == "semua" ? "Semua kategori" : v}</button>`).join("")}</div>
<input class="fld" placeholder="Cari nama atau email…" value="${esc(ADM.q)}" oninput="ADM.q=this.value;isiTabel()">
<div class="tbw" id="tbl"></div>
<div class="nv" style="flex-wrap:wrap;gap:10px"><button class="pl sm" style="margin:0" onclick="csvRingkas()">Unduh ringkasan (CSV)</button><button class="pl o sm" style="margin:0" onclick="csvLengkap(ADM.rows)">Unduh soal dan jawaban (CSV)</button></div>`, "wide");
  isiTabel();
}
function isiTabel() {
  const qq = ADM.q.toLowerCase().trim(), L = ADM.rows.slice().sort((a, b) => String(b.waktu).localeCompare(String(a.waktu)))
    .filter(r => (ADM.kat == "semua" || kat(+r.nilai) == ADM.kat) && (!qq || (r.nama + " " + r.email).toLowerCase().includes(qq)));
  document.getElementById("tbl").innerHTML = `<table class="tb"><tr><th>Waktu</th><th>Nama</th><th>Usia</th><th>JK</th><th>Aktivitas</th><th>Email</th><th>Nilai</th><th>Kategori</th><th>Status email</th><th></th></tr>
${L.length ? L.map(r => `<tr><td>${dt(r.waktu)}</td><td><b>${esc(r.nama)}</b></td><td>${esc(r.usia)}</td><td>${esc(r.jk)}</td><td>${esc(r.status)}</td><td>${esc(r.email)}</td><td><b>${esc(r.nilai)}</b></td><td>${kat(+r.nilai)}</td><td>${esc(r.email_status || "-")}</td><td><button class="mini" onclick="detail('${esc(r.id)}')">Detail</button></td></tr>`).join("") : `<tr><td colspan="10">Belum ada data.</td></tr>`}</table>`;
}
async function reload() { try { await muat(); adminView() } catch (e) { adminLogin(typeof e === "string" ? e : "Gagal memuat data.") } }
function detail(id) {
  const r = ADM.rows.find(x => String(x.id) === String(id)); if (!r) return adminView();
  const Z = zOf(r), L = Z ? susun(Z, tglDari(r.waktu)) : null, ide = esc(r.id);
  page(0, `<button class="rn" aria-label="Kembali" onclick="adminView()">${ic("back", 18, 2.2)}</button>
<div class="kick" style="margin-top:18px">Detail responden</div><h1 class="h1">${esc(r.nama)}</h1>
<table class="tb"><tr><td><small>Usia</small>${esc(r.usia)} tahun</td><td><small>Jenis kelamin</small>${esc(r.jk)}</td><td><small>Aktivitas utama</small>${esc(r.status)}</td></tr>
<tr><td><small>Email</small>${esc(r.email)}</td><td><small>Waktu mengisi</small>${dt(r.waktu)}</td><td><small>Status email</small>${esc(r.email_status || "-")}</td></tr></table>
<div class="stats"><div class="stat"><b>${esc(r.nilai)}%</b><span>Nilai</span></div><div class="stat"><b style="font-size:1.4rem;text-transform:capitalize">${kat(+r.nilai)}</b><span>Kategori</span></div><div class="stat"><b>${esc(r.skor)}/${MAKS}</b><span>Skor mentah</span></div></div>
${L ? `<div class="lab">Total durasi</div><div class="dur"><div><small>Duduk saat terjaga</small>${L.duduk}</div><div><small>Rebahan saat terjaga</small>${L.rebahan}</div></div>
<div class="lab">Lifestyle Score</div>${L.br.map(b => `<div class="rw"><span>${ic(C[b.c][0])}</span><span class="nm">${b.c}</span><span class="v">${b.v}</span><div class="t"><i style="width:${b.v}%"></i></div></div>`).join("")}
<div class="lab">Soal dan jawaban</div><div class="tbw"><table class="tb"><tr><th>No</th><th>Kategori</th><th>Pertanyaan</th><th>Jawaban</th><th>Skor</th></tr>
${Q.map((q, j) => `<tr><td>${j + 1}</td><td>${q[0]}</td><td>${q[1]}</td><td><b>${String.fromCharCode(65 + Z[j])}.</b> ${q[2][Z[j]]}</td><td>${isInd(q[0]) ? "indikator" : Z[j]}</td></tr>`).join("")}</table></div>`
      : `<div class="nt">Data jawaban responden ini tidak lengkap atau tidak cocok dengan daftar soal saat ini.</div>`}
<div class="nt" id="ast" style="display:none"></div>
<div class="nv" style="flex-wrap:wrap;gap:10px;margin-top:22px">${L ? `<button class="pl sm" style="margin:0" onclick="csvLengkap([ADM.rows.find(x=>String(x.id)==='${ide}')])">Unduh soal dan jawaban (CSV)</button><button class="pl sm" style="margin:0" onclick="unduhPdf('${ide}')">Download PDF</button>` : ""}
<button class="pl o sm" style="margin:0" onclick="hapus('${ide}')">Hapus data</button></div>`, "wide");
}
async function unduhPdf(id) {
  const r = ADM.rows.find(x => String(x.id) === String(id)), Z = r && zOf(r), b = document.getElementById("ast"); if (!Z) return;
  b.style.display = "block";
  if (!ENDPOINT) { b.textContent = "Mode demo: unduh PDF membutuhkan server."; return }
  b.textContent = "Menyiapkan PDF…";
  try {
    const j = await api({ type: "admin_pdf", key: ADM.key, id: r.id, laporan: susun(Z, tglDari(r.waktu)) });
    if (!j.ok) throw String(j.status || "gagal");
    const bin = atob(j.data), u8 = new Uint8Array(bin.length);
    for (let k = 0; k < bin.length; k++) u8[k] = bin.charCodeAt(k);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([u8], { type: "application/pdf" })); a.download = j.nama || "Hasil-LIVIA.pdf"; a.click();
    b.textContent = "PDF diunduh: " + (j.nama || "");
  } catch (e) { b.textContent = "Gagal menyiapkan PDF: " + (typeof e === "string" ? e : "server tidak merespons.") }
}
async function hapus(id) {
  if (!confirm("Hapus data responden ini? Tindakan ini tidak bisa dibatalkan.")) return;
  try {
    if (ENDPOINT) { const j = await api({ type: "admin_hapus", key: ADM.key, id }); if (!j.ok) return alert("Gagal menghapus: " + (j.status || "")) }
    else { try { localStorage.setItem("livia", JSON.stringify(lokal().filter(x => String(x.id) !== String(id)))) } catch (e) { } }
    ADM.rows = ADM.rows.filter(x => String(x.id) !== String(id)); adminView();
  } catch (e) { alert("Gagal menghubungi server.") }
}
const csvCell = v => { let s = String(v ?? ""); if (/^[=+\-@]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"' };
function unduh(nama, baris) {
  const t = "\ufeff" + baris.map(b => b.map(csvCell).join(",")).join("\r\n"), a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([t], { type: "text/csv;charset=utf-8" })); a.download = nama; a.click();
}
function csvRingkas() {
  if (!ADM.rows.length) return alert("Belum ada data.");
  const p = j => String(j + 1).padStart(2, "0"), b = [["waktu", "id", "nama", "usia", "email", "jenis_kelamin", "aktivitas_utama", "nilai", "kategori", "skor_mentah", "total_duduk", "total_rebahan", "status_email", ...Q.map((_, j) => "J" + p(j)), ...Q.map((_, j) => "S" + p(j))]];
  ADM.rows.forEach(r => { const Z = zOf(r); b.push([r.waktu, r.id, r.nama, r.usia, r.email, r.jk, r.status, r.nilai, r.kategori, r.skor, r.duduk, r.rebahan, r.email_status, ...Q.map((_, j) => Z ? String.fromCharCode(65 + Z[j]) : ""), ...Q.map((_, j) => Z ? Z[j] : "")]) });
  unduh("livia-ringkasan.csv", b);
}
function csvLengkap(rows) {
  const b = [["waktu", "nama", "usia", "email", "jenis_kelamin", "aktivitas_utama", "no", "kategori", "pertanyaan", "jawaban", "skor"]];
  rows.forEach(r => { const Z = r && zOf(r); if (!Z) return; Q.forEach((q, j) => b.push([r.waktu, r.nama, r.usia, r.email, r.jk, r.status, j + 1, q[0], q[1], String.fromCharCode(65 + Z[j]) + ". " + q[2][Z[j]], isInd(q[0]) ? "indikator" : Z[j]])) });
  if (b.length < 2) return alert("Belum ada data.");
  unduh("livia-soal-jawaban.csv", b);
}

landing();
