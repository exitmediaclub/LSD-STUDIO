/**
 * ============================================================
 *  SEMUA KONTEN WEBSITE LSD STUDIO ADA DI FILE INI.
 *  Ganti teks, link, dan path gambar sesuai karya Anda.
 *  Gambar taruh di /public/images lalu isi field `image`,
 *  contoh: image: "/images/projects/logo-01.jpg"
 *  Jika `image` kosong, website menampilkan thumbnail generatif otomatis.
 * ============================================================
 */

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  views?: string;
  likes?: string;
};

export const LOGO = {
  image: "LSD-LOGO.png",
  showTextWithImage: false,
  mark: "LSD-LOGO.png",
  text: "LSDSTUDIO",
};

export const BRAND = "LSDSTUDIO";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/game", label: "Game Segment" },
  { href: "/profile", label: "Profile" },
  { href: "/about", label: "About" },
] as const;

export const SOCIALS = {
  behance: "https://www.behance.net/username",
  tiktok: "https://www.tiktok.com/@username",
  instagram: "https://www.instagram.com/username",
  // Format WhatsApp: kode negara tanpa "+" / "0" di depan
  whatsapp: "https://wa.me/6281234567890?text=Halo%20LSD%20STUDIO%2C%20saya%20tertarik%20bekerja%20sama!",
  email: "mailto:hello@lsdstudio.com",
};

export const HERO = {
  // Video untuk efek scroll-scrubbing. Ganti dengan video Anda (MP4, H.264).
  // Encode dengan keyframe rapat agar scrubbing halus:
  // ffmpeg -i input.mp4 -c:v libx264 -g 1 -crf 22 -an -movflags +faststart public/videos/hero.mp4
  video: "/videos/hero.mp4",
  // Poster utama (foto besar di tengah, seperti referensi)
  poster: "/images/LSD-STUDIO.png",
  title: "LSDSTUDIO",
  subtitle: "Illustration · Logofolio · Branding · Social Media",
};

/* ---------------------- PROJECTS ---------------------- */

export const POPULAR_PROJECTS: Project[] = [
  { slug: "stage-visuals", title: "Stage Visuals", category: "Design Graphic", year: "2026", description: "Visual panggung untuk tur konser: layar LED, backdrop, dan motion loop.", tags: ["Ae", "Ps"], views: "52.4K", likes: "4.2K" },
  { slug: "kopi-senja", title: "Kopi Senja", category: "Branding", year: "2025", description: "Identitas visual lengkap brand kopi lokal: logo, kemasan, hingga signage.", tags: ["Ai", "Branding"], views: "38.1K", likes: "2.9K" },
  { slug: "pop-portrait", title: "Pop Portrait Series", category: "Illustration", year: "2025", description: "Seri ilustrasi potret bergaya pop-art untuk cover single musisi.", tags: ["Procreate", "Ps"], views: "31.7K", likes: "2.3K" },
];

export const PROJECT_CATEGORIES: {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}[] = [
  {
    id: "illustration",
    title: "ILLUSTRATION",
    description: "Ilustrasi digital untuk cover musik, merchandise, editorial, dan karakter.",
    projects: [
      { slug: "pop-portrait-1", title: "Pop Portrait", category: "Illustration", year: "2026", description: "Potret pop-art untuk cover single.", tags: ["Procreate"] },
      { slug: "fantasmagorie", title: "Fantasmagorie", category: "Illustration", year: "2025", description: "Ilustrasi surreal untuk poster pameran.", tags: ["Ps"] },
      { slug: "merch-tour", title: "Merch Tour", category: "Illustration", year: "2025", description: "Artwork kaos dan tote bag tur band.", tags: ["Ai"] },
      { slug: "night-city", title: "Night City", category: "Illustration", year: "2024", description: "Ilustrasi kota malam untuk editorial majalah.", tags: ["Procreate"] },
    ],
  },
  {
    id: "logofolio",
    title: "LOGOFOLIO",
    description: "Kumpulan logo dan logomark untuk berbagai brand dan komunitas.",
    projects: [
      { slug: "logo-senja", title: "Senja Coffee", category: "Logofolio", year: "2026", description: "Logomark kedai kopi dengan motif matahari terbenam.", tags: ["Ai"] },
      { slug: "logo-volt", title: "Volt Records", category: "Logofolio", year: "2025", description: "Logo label musik independen.", tags: ["Ai"] },
      { slug: "logo-kawan", title: "Kawan Sport", category: "Logofolio", year: "2025", description: "Logo komunitas futsal lokal.", tags: ["Ai"] },
      { slug: "logo-aksara", title: "Aksara Studio", category: "Logofolio", year: "2024", description: "Wordmark studio tipografi.", tags: ["Ai", "Glyphs"] },
    ],
  },
  {
    id: "graphic",
    title: "Design Graphic",
    description: "Poster, layout, cover album, dan materi promosi.",
    projects: [
      { slug: "stage-visuals-g", title: "Stage Visuals", category: "Graphic", year: "2026", description: "Backdrop dan visual LED untuk panggung konser.", tags: ["Ps", "Ae"] },
      { slug: "collage-anim", title: "Collage Animations", category: "Graphic", year: "2025", description: "Kolase grafis bergerak untuk promo rilisan.", tags: ["Ae"] },
      { slug: "vinyl-cover", title: "Vinyl Cover", category: "Graphic", year: "2025", description: "Desain cover piringan hitam edisi terbatas.", tags: ["Ps", "Ai"] },
      { slug: "tour-poster", title: "Tour Poster", category: "Graphic", year: "2024", description: "Seri poster tur 6 kota.", tags: ["Ps"] },
    ],
  },
  {
    id: "social",
    title: "SOCIAL MEDIA HANDLING",
    description: "Pengelolaan konten, feed planning, dan desain konten media sosial brand.",
    projects: [
      { slug: "sm-skincare", title: "Glow Skincare", category: "Social Media", year: "2026", description: "Feed Instagram & konten TikTok bulanan. +120% engagement.", tags: ["IG", "TikTok"] },
      { slug: "sm-coffee", title: "Senja Coffee", category: "Social Media", year: "2025", description: "Content plan & desain feed kedai kopi.", tags: ["IG"] },
      { slug: "sm-fashion", title: "Urban Wear", category: "Social Media", year: "2025", description: "Kampanye drop koleksi baru streetwear.", tags: ["IG", "Reels"] },
      { slug: "sm-music", title: "Volt Records", category: "Social Media", year: "2024", description: "Konten rilisan musik dan teaser.", tags: ["TikTok"] },
    ],
  },
  {
    id: "branding",
    title: "BRANDING",
    description: "Sistem identitas visual menyeluruh: strategi, logo, warna, tipografi, hingga aplikasi.",
    projects: [
      { slug: "br-senja", title: "Kopi Senja", category: "Branding", year: "2025", description: "Brand identity, packaging, dan signage.", tags: ["Ai", "Packaging"] },
      { slug: "br-volt", title: "Volt Records", category: "Branding", year: "2025", description: "Identitas label musik & guideline.", tags: ["Ai", "Guideline"] },
      { slug: "br-glow", title: "Glow Skincare", category: "Branding", year: "2024", description: "Rebranding produk skincare lokal.", tags: ["Ai", "Ps"] },
      { slug: "br-kawan", title: "Kawan Sport", category: "Branding", year: "2024", description: "Identitas komunitas olahraga & jersey.", tags: ["Ai"] },
    ],
  },
];

/** Thumbnail yang tersebar seperti ikon desktop di hero (sesuai referensi). */
export const DESKTOP_ICONS: { label: string; href: string; image?: string; x: number; y: number }[] = [
  { label: "STAGE VISUALS", href: "/projects#graphic", x: 33, y: 26 },
  { label: "POP PORTRAIT", href: "/projects#illustration", x: 22, y: 38 },
  { label: "LOGOFOLIO", href: "/projects#logofolio", x: 60, y: 18 },
  { label: "KOPI SENJA", href: "/projects#branding", x: 67, y: 32 },
  { label: "VINYL COVER", href: "/projects#graphic", x: 40, y: 52 },
  { label: "COLLAGE ANIM", href: "/projects#graphic", x: 57, y: 50 },
  { label: "MERCH", href: "/projects#illustration", x: 52, y: 70 },
  { label: "GLOW IN THE DARK", href: "/projects#social", x: 75, y: 55 },
  { label: "FANTASMAGORIE", href: "/projects#illustration", x: 44, y: 72 },
  { label: "VOLT RECORDS", href: "/projects#logofolio", x: 82, y: 40 },
  { label: "TOUR POSTER", href: "/projects#graphic", x: 18, y: 58 },
  { label: "URBAN WEAR", href: "/projects#social", x: 70, y: 70 },
  { label: "BRANDING", href: "/projects#branding", x: 26, y: 20 },
  { label: "GAME 2027", href: "/game", x: 88, y: 22 },
];

/* ---------------------- GAME ---------------------- */

export const GAME = {
  title: "LSD STUDIO: Project 2027",
  tagline: "Petualangan kolase surreal di dunia yang tersusun dari poster, stiker, dan memori.",
  release: "Q1 2027",
  releaseDate: "2027-01-01T00:00:00+07:00",
  features: [
    { title: "Dunia Kolase", description: "Setiap level dibangun dari ilustrasi tangan dan kolase grafis yang hidup.", icon: "🖼️" },
    { title: "Puzzle Visual", description: "Susun ulang potongan gambar untuk membuka jalan baru.", icon: "🧩" },
    { title: "Cerita Bercabang", description: "Pilihanmu menentukan akhir cerita dan nasib karakter.", icon: "🧭" },
    { title: "Kustomisasi Karakter", description: "Ubah gaya karakter dengan stiker dan outfit unik.", icon: "🎭" },
    { title: "Soundtrack Original", description: "Musik lo-fi & synth yang beradaptasi dengan suasana.", icon: "🎧" },
    { title: "Photo Mode", description: "Abadikan momen terbaik dengan filter khas LSD STUDIO.", icon: "📸" },
  ],
  screenshots: [
    { title: "Kota Kertas", image: undefined as string | undefined },
    { title: "Galeri Mimpi", image: undefined as string | undefined },
    { title: "Boss Fight", image: undefined as string | undefined },
    { title: "Hub Karakter", image: undefined as string | undefined },
    { title: "Panggung Neon", image: undefined as string | undefined },
    { title: "Menu Stiker", image: undefined as string | undefined },
  ],
  // Isi `src` dengan file audio di /public/audio/... untuk mengaktifkan pemutar
  music: [
    { title: "Main Theme — Paper Dreams", duration: "3:42", src: "" },
    { title: "Collage City", duration: "2:58", src: "" },
    { title: "Sticker Shop", duration: "4:10", src: "" },
    { title: "Boss: The Censor", duration: "3:21", src: "" },
    { title: "Ending — New Canvas", duration: "5:03", src: "" },
  ],
  credits: [
    { role: "Game Director & Art", names: ["LSD STUDIO"] },
    { role: "Illustration", names: ["LSD STUDIO", "Nama Tim"] },
    { role: "Programmer", names: ["Nama Programmer"] },
    { role: "Music & Sound", names: ["Nama Composer"] },
    { role: "Special Thanks", names: ["Keluarga", "Teman-teman", "Komunitas"] },
  ],
};

/* ---------------------- PROFILE ---------------------- */

export const PROFILE = {
  // Taruh foto Anda di /public/images/profile.jpg lalu isi: "/images/profile.jpg"
  photo: "" as string,
  name: "LSD STUDIO",
  role: "Illustration · Logofolio · Branding · Social Media Handling",
  description:
    "LSD STUDIO adalah studio kreatif yang berfokus pada ilustrasi, logo, branding, dan pengelolaan media sosial. Kami percaya setiap brand punya cerita unik — tugas kami adalah menerjemahkannya menjadi visual yang berani, konsisten, dan mudah diingat di setiap titik sentuh.",
  workflow: [
    { step: "01", title: "Discovery", description: "Brief, riset brand, kompetitor, dan audiens untuk memahami tujuan proyek." },
    { step: "02", title: "Moodboard & Konsep", description: "Menyusun arah visual, referensi, palet warna, dan konsep kreatif." },
    { step: "03", title: "Sketsa & Eksplorasi", description: "Eksplorasi ide lewat sketsa kasar dan beberapa alternatif desain." },
    { step: "04", title: "Desain Final", description: "Penyempurnaan desain terpilih dengan detail dan presisi tinggi." },
    { step: "05", title: "Revisi", description: "Diskusi dan revisi bersama klien hingga hasil benar-benar pas." },
    { step: "06", title: "Delivery & Support", description: "Penyerahan file final, guideline, dan dukungan setelah proyek." },
  ],
  tools: [
    { name: "Adobe Illustrator", short: "Ai", color: "#FF9A00", bg: "#330000" },
    { name: "Adobe Photoshop", short: "Ps", color: "#31A8FF", bg: "#001E36" },
    { name: "After Effects", short: "Ae", color: "#9999FF", bg: "#00005B" },
    { name: "Procreate", short: "Pc", color: "#FFFFFF", bg: "#111111" },
    { name: "Figma", short: "Fg", color: "#FFFFFF", bg: "#A259FF" },
    { name: "InDesign", short: "Id", color: "#FF3366", bg: "#49021F" },
    { name: "CapCut", short: "Cc", color: "#FFFFFF", bg: "#000000" },
    { name: "Canva", short: "Cv", color: "#FFFFFF", bg: "#00C4CC" },
  ],
};

/* ---------------------- ABOUT ---------------------- */

export const ABOUT_PARAGRAPHS = [
  "LSD STUDIO lahir dari sebuah meja kerja kecil, laptop yang penuh tab terbuka, dan rasa penasaran yang tidak pernah habis tentang bagaimana sebuah gambar bisa membuat orang berhenti sejenak dan merasakan sesuatu. Dari sana, studio ini tumbuh menjadi ruang kreatif yang mengerjakan ilustrasi, logo, branding, desain grafis, hingga pengelolaan media sosial.",
  "Kami melihat desktop komputer sebagai metafora yang jujur tentang cara kami bekerja: berantakan, penuh folder, potongan referensi, dan file bernama 'final-final-revisi-3'. Website ini sengaja dibuat menyerupai desktop agar Anda bisa merasakan langsung ruang kerja kami — tempat setiap ide dimulai sebelum menjadi karya yang rapi.",
  "Di bidang ilustrasi, kami menggambar untuk cover musik, merchandise, editorial, dan karakter. Di logofolio dan branding, kami membangun identitas yang tidak hanya cantik, tetapi juga punya sistem yang jelas: logo, warna, tipografi, dan aturan penggunaannya, sehingga brand tetap konsisten di mana pun ia tampil.",
  "Sementara itu, layanan social media handling membantu brand tetap hidup setiap hari. Kami merancang content plan, membuat desain feed dan video pendek, serta membaca data performa agar setiap unggahan punya tujuan. Bagi kami, media sosial adalah etalase brand yang paling sering dikunjungi — jadi ia layak mendapat perhatian penuh.",
  "Proses kami selalu dimulai dengan mendengarkan. Kami percaya desain yang baik lahir dari pemahaman yang dalam tentang tujuan, audiens, dan cerita di balik sebuah brand. Setelah itu barulah eksplorasi dimulai — moodboard, sketsa, eksperimen warna dan bentuk — sampai kami menemukan bahasa visual yang paling tepat. Saat ini kami juga sedang mengembangkan proyek game pertama yang direncanakan rilis pada Q1 2027.",
  "Jika Anda punya brand, ide, atau cerita yang ingin dihidupkan, kami akan senang sekali berkolaborasi. Mari buka folder baru bersama, isi dengan ide-ide terbaik, dan ciptakan sesuatu yang tidak hanya dilihat, tetapi juga dirasakan dan diingat.",
];
