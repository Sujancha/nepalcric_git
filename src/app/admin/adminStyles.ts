import React from 'react';

export const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 0,
  padding: '0.5rem 0',
  color: '#E8E8E8',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-mukta), sans-serif',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s',
};

export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-barlow), sans-serif',
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  color: '#6B7280',
  marginBottom: '0.5rem',
};

export const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

export const saveBtnStyle: React.CSSProperties = {
  background: '#C41E3A',
  color: '#E8E8E8',
  border: 'none',
  padding: '0.75rem 2rem',
  fontFamily: 'var(--font-barlow), sans-serif',
  fontSize: '0.8rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  borderRadius: 2,
};

export const cancelBtnStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#6B7280',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '0.75rem 2rem',
  fontFamily: 'var(--font-barlow), sans-serif',
  fontSize: '0.8rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  borderRadius: 2,
};
