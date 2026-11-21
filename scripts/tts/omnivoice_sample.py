"""Eksperimen narasi OmniVoice (k2-fsa, Apache-2.0; 646 bahasa termasuk Indonesia).

Kalimat pertama memakai suara otomatis (seed tetap), lalu kalimat berikutnya meniru suara
kalimat pertama supaya narator konsisten. Dijalankan di GitHub Actions (CPU).
"""
import inspect
import os
import time

import soundfile as sf
import torch
from omnivoice import OmniVoice

LINES = {
    "01-pembuka": "Lepas dari Jerat Paylater. Buku tentang cicilan kecil yang diam-diam memotong gaji bulan depan.",
    "02-pertanyaan": "Pernah merasa gajian baru dua minggu, tapi saldo sudah tipis? Kalau iya, kamu tidak sendirian.",
    "03-nadia": "Kenalkan Nadia. Dalam sembilan bulan, cicilannya tumbuh jadi tujuh, totalnya satu koma enam juta rupiah sebulan.",
}
SEEDS = [int(s) for s in os.environ.get("SEEDS", "7,21,42").split(",")]

os.makedirs("tts-out", exist_ok=True)
model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map="cpu", dtype=torch.float32)
params = inspect.signature(model.generate).parameters
print("generate params:", list(params))
lang = {"language": "id"} if "language" in params else {"language_id": "id"} if "language_id" in params else {}

items = list(LINES.items())
for seed in SEEDS:
    torch.manual_seed(seed)
    first_name, first_text = items[0]
    t0 = time.time()
    audio = model.generate(text=first_text, **lang)
    ref = f"tts-out/s{seed}-{first_name}.wav"
    sf.write(ref, audio[0], 24000)
    print(seed, first_name, f"{time.time() - t0:.1f}s")
    for name, text in items[1:]:
        t0 = time.time()
        audio = model.generate(text=text, ref_audio=ref, ref_text=first_text, **lang)
        sf.write(f"tts-out/s{seed}-{name}.wav", audio[0], 24000)
        print(seed, name, f"{time.time() - t0:.1f}s")
