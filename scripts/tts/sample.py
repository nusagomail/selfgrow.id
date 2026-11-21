"""Eksperimen narasi open source (Chatterbox Multilingual, lisensi MIT) untuk video pengantar.

Bahasa Indonesia belum didukung resmi; dicoba dengan bahasa Melayu ("ms").
Dijalankan di GitHub Actions (CPU). Hasil: tts-out/*.wav.
"""
import os
import time

import torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

LINES = {
    "01-pembuka": "Lepas dari Jerat Paylater. Buku tentang cicilan kecil yang diam-diam memotong gaji bulan depan.",
    "02-pertanyaan": "Pernah merasa gajian baru dua minggu, tapi saldo sudah tipis? Kalau iya, kamu tidak sendirian.",
    "03-nadia": "Kenalkan Nadia. Dalam sembilan bulan, cicilannya tumbuh jadi tujuh, totalnya satu koma enam juta rupiah sebulan.",
}

os.makedirs("tts-out", exist_ok=True)
model = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
for name, text in LINES.items():
    t0 = time.time()
    wav = model.generate(text, language_id="ms")
    ta.save(f"tts-out/{name}.wav", wav, model.sr)
    print(name, f"{time.time() - t0:.1f}s")
