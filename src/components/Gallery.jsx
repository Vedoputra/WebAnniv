import React, { useState } from 'react'
import ImageCard from './ImageCard'
import Lightbox from './Lightbox'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export default function Gallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(null)

  function openAt(index) {
    setCurrentIndex(index)
  }

  function close() {
    setCurrentIndex(null)
  }

  function prev() {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  function next() {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <section className="gallery-section">
      <motion.div className="gallery-grid" variants={container} initial="hidden" animate="visible">
        {images.map((src, idx) => (
          <ImageCard key={idx} src={src} alt={`Foto ${idx + 1}`} onClick={() => openAt(idx)} />
        ))}
      </motion.div>

      {currentIndex !== null && (
        <Lightbox
          src={images[currentIndex]}
          alt={`Foto ${currentIndex + 1}`}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}