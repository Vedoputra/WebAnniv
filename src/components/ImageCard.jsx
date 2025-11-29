import React from 'react'

export default function ImageCard({ src, alt, onClick }) {
  return (
    <button className="image-card" onClick={onClick} aria-label={`Buka ${alt}`}>
      <img src={src} alt={alt} loading="lazy" />
    </button>
  )
}