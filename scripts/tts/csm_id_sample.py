"""Eksperimen: CSM-1B Indonesian (Ellbendls, Apache-2.0, 81 penutur). Beberapa penutur dicoba."""
import os
import time

import soundfile as sf
import torch
from lines import LINES
from transformers import AutoProcessor, CsmForConditionalGeneration

REPO = "Ellbendls/csm-1b-indonesian-fine-tuned"
SPEAKERS = [int(s) for s in os.environ.get("SPEAKERS", "0,7,19,33,52,70").split(",")]

os.makedirs("tts-out", exist_ok=True)
# Repo berisi adapter LoRA: pasang di atas model dasarnya bila bobot penuh tidak ada.
try:
    model = CsmForConditionalGeneration.from_pretrained(REPO)
except OSError:
    from peft import PeftModel

    base = CsmForConditionalGeneration.from_pretrained("unsloth/csm-1b")
    model = PeftModel.from_pretrained(base, REPO).merge_and_unload()
try:
    processor = AutoProcessor.from_pretrained(REPO)
except OSError:
    processor = AutoProcessor.from_pretrained("unsloth/csm-1b")
torch.manual_seed(1)
for spk in SPEAKERS:
    for name, text in LINES.items():
        t0 = time.time()
        inputs = processor(f"[{spk}]{text}", add_special_tokens=True)
        out = model.generate(**inputs, max_new_tokens=200, depth_decoder_temperature=0.8, output_audio=True)
        sf.write(f"tts-out/csm{spk:02d}-{name}.wav", out[0].to(torch.float32).numpy(), 24000)
        print(spk, name, f"{time.time() - t0:.1f}s")
