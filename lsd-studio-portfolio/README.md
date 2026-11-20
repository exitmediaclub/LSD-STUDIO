# LSD STUDIO — Creative Design Portfolio

Website portofolio bergaya **desktop macOS** (latar terang, foto besar blur di tengah, thumbnail karya tersebar seperti ikon desktop, dock, dan Spotlight search).
Dibangun dengan **Next.js 15 (App Router) + TypeScript + Tailwind CSS + GSAP ScrollTrigger**.

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:3000
npm run build && npm start   # mode produksi
```

## Halaman

| Route | Isi |
|---|---|
| `/` Home | Top banner (push button **LSD STUDIO**), header responsif (logo kiri, tombol drawer kanan), hero besar dengan **scroll-based video scrubbing (GSAP ScrollTrigger)**, ikon karya ala desktop, dock, tombol fullscreen & search, shortcut folder karya, proyek populer |
| `/projects` | Most Popular, ILLUSTRATION, LOGOFOLIO, Design Graphic, SOCIAL MEDIA HANDLING, BRANDING |
| `/game` | Soon Q1 2027 + countdown, fitur gameplay, screenshot, music player, credits |
| `/profile` | Foto, nama LSD STUDIO, deskripsi, Workflow, Tools, tombol Behance/TikTok/Instagram/WhatsApp, tombol kreatif **CONTACT ME** |
| `/about` | 6 paragraf + "© 2026 LSD STUDIO. Semua hak dilindungi." |

## Mengganti konten

**Semua teks, link, dan daftar karya ada di satu file: `src/data/site.ts`.**

- **Link sosial**: objek `SOCIALS` (Behance, TikTok, Instagram, WhatsApp, email).
- **Gambar karya**: taruh di `public/images/...`, lalu isi field `image` pada proyek (contoh `image: "/images/projects/logo-01.jpg"`). Kalau dikosongkan, website menampilkan thumbnail generatif otomatis.
- **Ikon desktop di hero**: `DESKTOP_ICONS` (label, link, gambar, posisi `x`/`y` dalam %).
- **Foto profil**: simpan di `public/images/profile.jpg`, lalu isi `PROFILE.photo = "/images/profile.jpg"`.
- **Musik game**: taruh file audio di `public/audio/` dan isi `src` pada `GAME.music`.

### Video hero (scroll scrubbing)

Ganti `public/videos/hero.mp4` dan `public/images/hero-poster.jpg` dengan video & foto Anda.
Agar scrubbing halus, encode dengan keyframe di setiap frame:

```bash
ffmpeg -i input.mp4 -c:v libx264 -g 1 -crf 22 -an -movflags +faststart -vf "scale=1280:-2" public/videos/hero.mp4
```

Usahakan video pendek (4–8 detik) dan ukuran file di bawah ±8 MB.

## Struktur

```
src/
  app/            # halaman (page.tsx per route) + layout & globals.css
  components/     # TopBanner, Header (drawer), ScrollVideoHero, Dock, Spotlight,
                  # ProjectCard, Artwork, ContactMeButton, MusicPlayer, Countdown, Reveal, ...
  data/site.ts    # SEMUA KONTEN
public/
  videos/hero.mp4, images/hero-poster.jpg   # contoh, silakan ganti
```

Warna utama diatur di `tailwind.config.ts` (`paper`, `ink`, `muted`, `select`).
