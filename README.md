# ELRVD project page

A static GitHub Pages site for the capstone project **Extreme Low-Light RAW
Video Denoising with RViDeNet-ECBAM**. It presents the method, evaluation, and
side-by-side noisy-vs-denoised video comparisons.

Companion code repository: <https://github.com/lsy0163/ELRVD>

## Structure

```text
index.html        # Home — hero before/after, overview, headline results
method.html       # Architecture, ECBAM (ESA) attention, datasets, training
results.html      # RAW & PNG metrics, per-scene tables, alpha blending, YOLOv11x
gallery.html      # 8 noisy-vs-denoised before/after video comparisons
assets/
  css/style.css   # shared dark editorial theme
  js/main.js      # nav, scroll reveal, before/after sliders, lazy video play
  img/            # architecture diagram, comparison GIF
  media/          # web-optimized comparison videos (committed)
KCC_26.pdf        # KCC 2026 paper
videos/           # source clips (git-ignored — not committed)
```

## Publishing to GitHub Pages

1. Create a repo (e.g. `ELRVD-page`) and push this folder.
2. In **Settings → Pages**, set the source to the `main` branch, root (`/`).
3. The site is served at `https://<user>.github.io/ELRVD-page/`.

All asset paths are relative, so it works under a project sub-path without
changes. `.nojekyll` is included so the `assets/` folder is served as-is.

## Notes on the videos

The web-optimized clips in `assets/media/` are re-encoded for the browser
(H.264, ≤1080p, faststart). The original 4K noisy captures are 400–550 MB each
— above GitHub's 100 MB per-file limit — so the source `videos/` folder is
git-ignored. To regenerate the optimized clips from sources, re-encode each to
H.264 / yuv420p / `+faststart`, scaling 4K inputs to 1080p.
