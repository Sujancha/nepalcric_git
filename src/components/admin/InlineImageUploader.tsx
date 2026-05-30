'use client';

import { useState, useRef } from 'react';

interface InlineImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  playerId: string; // e.g., 'rohit-paudel', 'fanzone', 'locker-room'
  label?: string;
  currentValue?: string;
}

export default function InlineImageUploader({
  onUploadSuccess,
  playerId,
  label = 'फोटो अपलोड गर्नुस्',
  currentValue = '',
}: InlineImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: Let's support up to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('फोटो धेरै ठूलो भयो (अधिकतम ५MB)');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64WithPrefix = reader.result as string;
        // Strip data:image/...;base64, prefix
        const base64Data = base64WithPrefix.split(',')[1];
        
        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playerId: playerId || 'general',
            filename: file.name,
            contentBase64: base64Data,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? 'अपलोड असफल भयो');
        }

        setSuccess(true);
        onUploadSuccess(result.path);
        
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        setTimeout(() => setSuccess(false), 3000);
      };

      reader.onerror = () => {
        setError('फाइल पढ्न सकिएन।');
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'नेटवर्क त्रुटि: अपलोड हुन सकेन।');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={triggerFileSelect}
          disabled={uploading}
          style={{
            background: uploading ? '#374151' : 'rgba(196,30,58,0.08)',
            border: uploading ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(196,30,58,0.4)',
            color: uploading ? '#9CA3AF' : '#C41E3A',
            padding: '0.4rem 1rem',
            fontFamily: 'var(--font-barlow), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: uploading ? 'not-allowed' : 'pointer',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={(e) => {
            if (!uploading) {
              e.currentTarget.style.background = '#C41E3A';
              e.currentTarget.style.color = '#E8E8E8';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(196,30,58,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!uploading) {
              e.currentTarget.style.background = 'rgba(196,30,58,0.08)';
              e.currentTarget.style.color = '#C41E3A';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {uploading ? (
            <>
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#E8E8E8',
                  animation: 'adminPulse 1s linear infinite',
                }}
              />
              अपलोड हुँदैछ...
            </>
          ) : currentValue ? (
            '✓ तस्बिर परिवर्तन गर्नुस्'
          ) : (
            `↑ ${label}`
          )}
        </button>

        {currentValue && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.6rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', whiteSpace: 'nowrap' }}>
              {currentValue}
            </span>
            {/* Tiny image preview */}
            <div style={{ position: 'relative', width: '28px', height: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
              <img
                src={currentValue}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {success && (
          <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✓ सफलतापूर्वक अपलोड भयो!
          </span>
        )}

        {error && (
          <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.75rem', color: '#C41E3A', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ⚠ {error}
          </span>
        )}
      </div>
    </div>
  );
}
