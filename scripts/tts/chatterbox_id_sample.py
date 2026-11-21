"""Eksperimen: Chatterbox-TTS-Indonesian (grandhigh, Apache-2.0). Suara bawaan, dua gaya."""
import os
import time

import torch
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS
from huggingface_hub import hf_hub_download
from lines import LINES
from safetensors.torch import load_file

# Versi 0.1.1 memuat sebagian berkas tanpa map_location; paksa ke CPU (runner tanpa GPU).
_load = torch.load
torch.load = lambda *a, **k: _load(*a, **{**k, "map_location": torch.device("cpu")})

os.makedirs("tts-out", exist_ok=True)
model = ChatterboxTTS.from_pretrained(device="cpu")
ckpt = hf_hub_download(repo_id="grandhigh/Chatterbox-TTS-Indonesian", filename="t3_cfg.safetensors")
model.t3.load_state_dict(load_file(ckpt, device="cpu"))

for style, kw in {"tenang": {"exaggeration": 0.4, "cfg_weight": 0.5}, "ekspresif": {"exaggeration": 0.7, "cfg_weight": 0.4}}.items():
    for name, text in LINES.items():
        t0 = time.time()
        wav = model.generate(text, **kw)
        ta.save(f"tts-out/cbid-{style}-{name}.wav", wav, model.sr)
        print(style, name, f"{time.time() - t0:.1f}s")
