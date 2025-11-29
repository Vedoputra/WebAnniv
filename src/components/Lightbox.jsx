import React from 'react'
import { motion } from 'framer-motion'

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const content = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
}

export default function Lightbox({ src, alt, onClose, onPrev, onNext }) {
  return (
    <motion.div className="lightbox" role="dialog" aria-modal="true" variants={overlay} initial="hidden" animate="visible" exit="hidden">
      <button className="lightbox-close" onClick={onClose} aria-label="Tutup">×</button>
      <button className="lightbox-prev" onClick={onPrev} aria-label="Sebelumnya">‹</button>
      <motion.div className="lightbox-content" variants={content} initial="hidden" animate="visible" transition={{ type: 'spring', stiffness: 240, damping: 24 }}>
        <img src={src} alt={alt} />
      </motion.div>
      <button className="lightbox-next" onClick={onNext} aria-label="Selanjutnya">›</button>
    </motion.div>
  )
}