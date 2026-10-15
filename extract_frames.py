import av
import os
import sys
from PIL import Image

video_path = "gemini_generated_video_12fdb18a_gwr_video_mvp.mp4"
output_dir = os.path.join("public", "sequence")
os.makedirs(output_dir, exist_ok=True)

container = av.open(video_path)
stream = container.streams.video[0]

print("Video stream found:", stream, flush=True)
print("Codec:", stream.codec_context.name, flush=True)
duration = float(stream.duration * stream.time_base) if stream.duration else 0.0
fps = float(stream.average_rate) if stream.average_rate else 24.0
frames_est = stream.frames or int(duration * fps) or 100

print(f"Duration: {duration}s, FPS: {fps}, Estimated Frames: {frames_est}", flush=True)

# First pass: collect pts or count
TARGET_FRAMES = 100
step = max(1, frames_est // TARGET_FRAMES) if frames_est > 0 else 1

frame_count = 0
saved_count = 0

for frame in container.decode(video=0):
    if frame_count % step == 0 and saved_count < TARGET_FRAMES:
        img = frame.to_image()
        # Resize if width > 1920
        if img.width > 1920:
            h = int(img.height * (1920 / img.width))
            img = img.resize((1920, h), Image.Resampling.BILINEAR)
        
        fname = f"frame_{saved_count:03d}.webp"
        target_path = os.path.join(output_dir, fname)
        img.save(target_path, "WEBP", quality=80)
        saved_count += 1
        if saved_count % 10 == 0:
            print(f"Saved {saved_count}/{TARGET_FRAMES} frames...", flush=True)
    frame_count += 1

print(f"DONE! Saved total {saved_count} frames to {output_dir}", flush=True)
