import { useRef } from 'react';
import { ImageOff, RefreshCcw, Upload } from 'lucide-react';
import { resolveImage } from '../../services/contentService';

export default function ImageUpload({ value, onChange, label = 'Image', hint, preset = '' }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      // Downscale very large images to keep localStorage small.
      const img = new Image();
      img.onload = () => {
        const MAX = 1400;
        if (img.width <= MAX && img.height <= MAX) {
          onChange(dataUrl);
        } else {
          const scale = Math.min(1, MAX / img.width, MAX / img.height);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          onChange(canvas.toDataURL('image/jpeg', 0.82));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const src = value ? resolveImage(value) : '';

  return (
    <div className="a-field">
      <span className="a-field__label">{label}</span>
      <div className="a-imgupload">
        <div className="a-imgupload__preview">
          {src ? (
            <img src={src} alt="Upload preview" />
          ) : (
            <span>
              <ImageOff aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="a-imgupload__controls">
          <div className="a-row">
            <button
              type="button"
              className="a-btn a-btn--secondary a-btn--sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload aria-hidden="true" /> Upload
            </button>
            {preset ? (
              <button
                type="button"
                className="a-btn a-btn--ghost a-btn--sm"
                onClick={() => onChange(preset)}
              >
                <RefreshCcw aria-hidden="true" /> Use default
              </button>
            ) : null}
          </div>
          <span className="a-imgupload__meta">
            {src ? 'Stored as: ' : 'No image — '}
            {src ? src.slice(0, 60) : 'upload a PNG / JPG (max ~1400px).'}
          </span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {hint ? <span className="a-field__hint">{hint}</span> : null}
    </div>
  );
}