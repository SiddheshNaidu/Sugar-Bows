import { useState, useRef } from 'react'
import Button from '@/components/ui/Button'

export default function PhotoUpload({ onUpload, currentPhoto }) {
  const [preview, setPreview] = useState(currentPhoto || null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
    onUpload(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="photo-upload">
      <div
        className={`photo-upload__zone ${dragActive ? 'photo-upload__zone--active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload photo"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="photo-upload__preview" />
        ) : (
          <div className="photo-upload__placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p className="photo-upload__text">
              Drag & drop your photo here<br />
              <span>or click to browse</span>
            </p>
            <p className="photo-upload__hint">JPG, PNG up to 5MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
          className="sr-only"
        />
      </div>
      {preview && (
        <Button variant="ghost" size="sm" onClick={() => { setPreview(null); onUpload(null) }}>
          Remove Photo
        </Button>
      )}
      <style>{`
        .photo-upload__zone {
          border: 2px dashed var(--color-light-gray);
          border-radius: var(--radius-xl);
          padding: var(--space-10);
          text-align: center;
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
          background: var(--color-white);
          overflow: hidden;
        }
        .photo-upload__zone:hover,
        .photo-upload__zone--active {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }
        .photo-upload__preview {
          max-height: 300px;
          border-radius: var(--radius-lg);
          margin: 0 auto;
        }
        .photo-upload__placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          color: var(--color-gray);
        }
        .photo-upload__text {
          font-size: var(--text-sm);
          color: var(--color-medium-gray);
          line-height: 1.6;
        }
        .photo-upload__text span {
          color: var(--color-primary);
          font-weight: 500;
        }
        .photo-upload__hint {
          font-size: var(--text-xs);
          color: var(--color-gray);
        }
      `}</style>
    </div>
  )
}
