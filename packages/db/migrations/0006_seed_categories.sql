-- Taksonomi awal (D30): 10 kategori + topik, hasil riset kategori November 2026.
-- INSERT OR IGNORE agar aman bila kategori dengan slug sama sudah dibuat manual.
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_keuangan-pribadi', NULL, 'keuangan-pribadi', 'Keuangan Pribadi', 'Atur gaji, lunasi utang, menabung, dan mulai berinvestasi.', 'Gaji habis sebelum tanggal 25?', 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_anggaran-arus-kas', 'cat_keuangan-pribadi', 'anggaran-arus-kas', 'Anggaran & Arus Kas', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_utang-pinjol-paylater', 'cat_keuangan-pribadi', 'utang-pinjol-paylater', 'Lunasi Utang, Pinjol & Paylater', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_dana-darurat-menabung', 'cat_keuangan-pribadi', 'dana-darurat-menabung', 'Dana Darurat & Menabung', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_investasi-pemula', 'cat_keuangan-pribadi', 'investasi-pemula', 'Investasi Pemula', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_tujuan-keuangan-keluarga', 'cat_keuangan-pribadi', 'tujuan-keuangan-keluarga', 'Tujuan Besar Keluarga', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_pajak-administrasi', 'cat_keuangan-pribadi', 'pajak-administrasi', 'Pajak & Urusan Administrasi', NULL, NULL, 6);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_kebiasaan-disiplin', NULL, 'kebiasaan-disiplin', 'Kebiasaan & Disiplin', 'Bangun kebiasaan baik yang bertahan dan tinggalkan yang merugikan.', 'Udah 5 kali mulai olahraga, berhenti lagi?', 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_membangun-kebiasaan', 'cat_kebiasaan-disiplin', 'membangun-kebiasaan', 'Membangun Kebiasaan Baru', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_berhenti-kebiasaan-buruk', 'cat_kebiasaan-disiplin', 'berhenti-kebiasaan-buruk', 'Berhenti Kebiasaan Buruk', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_rutinitas-pagi-malam', 'cat_kebiasaan-disiplin', 'rutinitas-pagi-malam', 'Rutinitas Pagi & Malam', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_rajin-membaca', 'cat_kebiasaan-disiplin', 'rajin-membaca', 'Rajin Membaca', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_konsistensi-motivasi', 'cat_kebiasaan-disiplin', 'konsistensi-motivasi', 'Konsistensi & Motivasi', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_produktivitas-fokus', NULL, 'produktivitas-fokus', 'Produktivitas & Fokus', 'Rencanakan hari, jaga fokus, dan selesaikan yang penting.', 'Sibuk seharian tapi kerjaan nggak kelar?', 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_rencana-harian-mingguan', 'cat_produktivitas-fokus', 'rencana-harian-mingguan', 'Rencana Harian & Mingguan', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_fokus-anti-prokrastinasi', 'cat_produktivitas-fokus', 'fokus-anti-prokrastinasi', 'Fokus & Anti-Prokrastinasi', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_target-resolusi', 'cat_produktivitas-fokus', 'target-resolusi', 'Target & Resolusi', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_kerja-cerdas-ai', 'cat_produktivitas-fokus', 'kerja-cerdas-ai', 'Kerja Cerdas dengan AI', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_belajar-mencatat', 'cat_produktivitas-fokus', 'belajar-mencatat', 'Belajar & Mencatat Efektif', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_karier-pekerjaan', NULL, 'karier-pekerjaan', 'Karier & Pekerjaan', 'Dapat kerja, naik gaji, dan berkembang di tempat kerja.', 'Lamar 50 kerjaan, nggak ada panggilan?', 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_cv-lamaran', 'cat_karier-pekerjaan', 'cv-lamaran', 'CV & Lamaran Kerja', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_wawancara-kerja', 'cat_karier-pekerjaan', 'wawancara-kerja', 'Wawancara Kerja', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_gaji-negosiasi', 'cat_karier-pekerjaan', 'gaji-negosiasi', 'Gaji & Negosiasi', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_pindah-karier', 'cat_karier-pekerjaan', 'pindah-karier', 'Pindah Karier & Skill Baru', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_berkembang-di-kantor', 'cat_karier-pekerjaan', 'berkembang-di-kantor', 'Bertahan & Berkembang di Kantor', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_kesehatan-mental', NULL, 'kesehatan-mental', 'Kesehatan Mental & Emosi', 'Kelola stres, cemas, dan emosi lewat latihan mandiri sehari-hari.', 'Kepikiran terus sampai susah tidur?', 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_stres-cemas', 'cat_kesehatan-mental', 'stres-cemas', 'Stres & Cemas', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_overthinking', 'cat_kesehatan-mental', 'overthinking', 'Overthinking', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_burnout', 'cat_kesehatan-mental', 'burnout', 'Burnout & Lelah Kerja', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_percaya-diri', 'cat_kesehatan-mental', 'percaya-diri', 'Percaya Diri & Insecure', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_emosi-journaling', 'cat_kesehatan-mental', 'emosi-journaling', 'Mengelola Emosi & Journaling', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_kesehatan-kebugaran', NULL, 'kesehatan-kebugaran', 'Kesehatan & Kebugaran', 'Mulai olahraga, makan lebih sehat, dan tidur lebih nyenyak.', 'Pengen turun 5 kg tapi selalu gagal diet?', 6);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_mulai-olahraga', 'cat_kesehatan-kebugaran', 'mulai-olahraga', 'Mulai Olahraga', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_pola-makan', 'cat_kesehatan-kebugaran', 'pola-makan', 'Pola Makan & Berat Badan', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_tidur-berkualitas', 'cat_kesehatan-kebugaran', 'tidur-berkualitas', 'Tidur Berkualitas', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_energi-harian', 'cat_kesehatan-kebugaran', 'energi-harian', 'Energi Harian', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_cek-kesehatan', 'cat_kesehatan-kebugaran', 'cek-kesehatan', 'Cek Kesehatan Rutin', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_komunikasi-relasi', NULL, 'komunikasi-relasi', 'Komunikasi & Relasi', 'Bicara dengan percaya diri dan bangun hubungan yang sehat.', 'Grogi tiap disuruh presentasi?', 7);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_public-speaking', 'cat_komunikasi-relasi', 'public-speaking', 'Public Speaking & Presentasi', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_komunikasi-asertif', 'cat_komunikasi-relasi', 'komunikasi-asertif', 'Komunikasi Asertif', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_networking-pertemanan', 'cat_komunikasi-relasi', 'networking-pertemanan', 'Networking & Pertemanan', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_konflik', 'cat_komunikasi-relasi', 'konflik', 'Konflik Sehari-hari', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_asmara-pernikahan', 'cat_komunikasi-relasi', 'asmara-pernikahan', 'Asmara & Persiapan Menikah', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_bisnis-penghasilan', NULL, 'bisnis-penghasilan', 'Bisnis & Penghasilan Tambahan', 'Mulai usaha sampingan, jualan online, dan freelance.', 'Gaji cuma numpang lewat, pengen punya pemasukan lain?', 8);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_ide-usaha', 'cat_bisnis-penghasilan', 'ide-usaha', 'Ide & Uji Usaha Sampingan', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_jualan-online', 'cat_bisnis-penghasilan', 'jualan-online', 'Jualan Online', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_freelance-jasa', 'cat_bisnis-penghasilan', 'freelance-jasa', 'Freelance & Jasa', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_konten-personal-branding', 'cat_bisnis-penghasilan', 'konten-personal-branding', 'Konten & Personal Branding', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_harga-pembukuan', 'cat_bisnis-penghasilan', 'harga-pembukuan', 'Harga Jual & Pembukuan', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_keluarga-parenting', NULL, 'keluarga-parenting', 'Keluarga & Parenting', 'Asuh anak, jaga hubungan dengan pasangan, dan atur rumah tangga.', 'Anak susah lepas dari HP?', 9);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_anak-gawai', 'cat_keluarga-parenting', 'anak-gawai', 'Anak & Gawai', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_pengasuhan-usia-dini', 'cat_keluarga-parenting', 'pengasuhan-usia-dini', 'Pengasuhan Usia Dini', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_peran-ayah', 'cat_keluarga-parenting', 'peran-ayah', 'Peran Ayah', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_komunikasi-pasangan', 'cat_keluarga-parenting', 'komunikasi-pasangan', 'Komunikasi Pasangan', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_rumah-tangga', 'cat_keluarga-parenting', 'rumah-tangga', 'Mengelola Rumah Tangga', NULL, NULL, 5);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('cat_mindset-makna-hidup', NULL, 'mindset-makna-hidup', 'Mindset & Makna Hidup', 'Temukan ketenangan, arah hidup, dan cara memutuskan dengan yakin.', 'Umur segini kok rasanya belum jadi apa-apa?', 10);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_stoikisme', 'cat_mindset-makna-hidup', 'stoikisme', 'Stoikisme & Ketenangan', NULL, NULL, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_tujuan-hidup', 'cat_mindset-makna-hidup', 'tujuan-hidup', 'Tujuan Hidup & Nilai Pribadi', NULL, NULL, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_quarter-life', 'cat_mindset-makna-hidup', 'quarter-life', 'Quarter-Life Crisis', NULL, NULL, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_syukur-bahagia', 'cat_mindset-makna-hidup', 'syukur-bahagia', 'Syukur & Bahagia', NULL, NULL, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `hook`, `order`) VALUES ('top_keputusan-besar', 'cat_mindset-makna-hidup', 'keputusan-besar', 'Mengambil Keputusan Besar', NULL, NULL, 5);
