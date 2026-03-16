// Loads a PNG, removes near-white background, and remaps dark navy pixels
// to white so the logo reads clearly on dark backgrounds.
// Same-origin only — no CORS header needed.
import { useState, useEffect } from 'react';

export default function TransparentLogo({ src, className, style, alt }) {
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new window.Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          const brightness = (r + g + b) / 3;

          if (brightness > 185) {
            // White / near-white / textured light background → fully transparent
            data[i + 3] = 0;
          } else if (brightness > 135) {
            // Soft anti-alias fringe → feather out
            const fade = (185 - brightness) / 50;
            data[i + 3] = Math.floor(a * fade);
          } else if (a > 30) {
            // Opaque colored pixel.
            // Gold pixels (avg ~159, warm/red-dominant) → keep as-is.
            // Dark navy pixels (avg ~62, blue-dominant) → remap to white
            // so they're readable on the dark navbar background.
            const isNavyLike = brightness < 110 && b > r + 8;
            if (isNavyLike) {
              // Fully remap to white — no interpolation so text is crisp
              data[i]     = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
            }
          }
        }

        ctx.putImageData(new ImageData(data, width, height), 0, 0);
        setProcessedSrc(canvas.toDataURL('image/png'));
      } catch {
        // Canvas tainted (CORS) — fall back to original
        setProcessedSrc(src);
      }
    };

    img.onerror = () => setProcessedSrc(src);
    img.src = src;
  }, [src]);

  return (
    <img
      src={processedSrc || src}
      className={className}
      style={style}
      alt={alt}
    />
  );
}
