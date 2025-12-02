import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import images from '../data/image'

// Animation variants
const pageVariants = {
  initial: { 
    rotateY: 90, 
    opacity: 0, 
    scale: 0.8,
    transformPerspective: 1200
  },
  animate: { 
    rotateY: 0, 
    opacity: 1, 
    scale: 1,
    transformPerspective: 1200
  },
  exit: { 
    rotateY: -90, 
    opacity: 0, 
    scale: 0.8,
    transformPerspective: 1200
  }
}

const polaroidVariants = {
  initial: { 
    scale: 0.8, 
    opacity: 0, 
    y: 50,
    rotateX: 10
  },
  animate: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: { 
    scale: 1.05, 
    y: -10, 
    rotateX: -5,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" } 
  }
}

const stickerVariants = {
  animate: (i) => ({
    rotate: [0, 8, -8, 0],
    scale: [1, 1.2, 1],
    y: [0, -3, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay: i * 0.8
    }
  })
}

// Sample memory data - customize with your own photos and captions
const memories = [
  {
    id: 1,
    photo: images[0],
    caption: 'First Date ❤️',
    date: 'January 2024',
    stickers: ['💕', '✨'],
    rotation: -2
  },
  {
    id: 2,
    photo: images[1],
    caption: 'Beach Trip 🌊',
    date: 'March 2024',
    stickers: ['🏖️', '☀️'],
    rotation: 1.5
  },
  {
    id: 3,
    photo: images[2],
    caption: 'Coffee Date ☕',
    date: 'April 2024',
    stickers: ['☕', '🍰'],
    rotation: -1
  },
  {
    id: 4,
    photo: images[3],
    caption: 'Sunset Walk 🌅',
    date: 'May 2024',
    stickers: ['🌅', '💑'],
    rotation: 2
  },
  {
    id: 5,
    photo: images[4],
    caption: 'Anniversary 🎉',
    date: 'June 2024',
    stickers: ['🎂', '🎈'],
    rotation: -1.5
  },
  {
    id: 6,
    photo: images[5],
    caption: 'Movie Night 🎬',
    date: 'July 2024',
    stickers: ['🍿', '🎥'],
    rotation: 1
  },
]

// Floating hearts animation variants
const heartVariants = {
  animate: (i) => ({
    y: [-20, -100, -20],
    x: [0, Math.sin(i) * 20, 0],
    rotate: [0, 360],
    scale: [2.0, 2.5, 2.0],
    opacity: [0.7, 1, 0.3],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
      delay: i * 0.8
    }
  })
}

export default function Activities() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(memories.length / itemsPerPage)

  // Import floating assets from src/assets
  const asset1 = new URL('../assets/photo_asset_1.png', import.meta.url).href
  const asset2 = new URL('../assets/photo_asset_2.png', import.meta.url).href

  // Generate floating assets using photo_asset_1 and photo_asset_2
  const floatingAssets = [
    { src: asset1, alt: 'asset1' },
    { src: asset2, alt: 'asset2' },
    { src: asset1, alt: 'asset1' },
    { src: asset2, alt: 'asset2' },
    { src: asset1, alt: 'asset1' },
    { src: asset2, alt: 'asset2' },
    { src: asset1, alt: 'asset1' },
    { src: asset2, alt: 'asset2' },
    { src: asset1, alt: 'asset1' },
    { src: asset2, alt: 'asset2' }
  ]

  const currentMemories = memories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className="scrapbook-section">
      {/* Floating Assets Background */}
      <div className="floating-hearts-bg">
        {floatingAssets.map((asset, i) => (
          <motion.img
            key={i}
            className="floating-asset"
            variants={heartVariants}
            animate="animate"
            custom={i}
            src={asset.src}
            alt={asset.alt}
            style={{
              position: 'absolute',
              left: `${10 + (i * 8) % 80}%`,
              top: `${20 + (i * 12) % 60}%`,
              width: `${40 + (i % 3) * 20}px`,
              height: 'auto',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="scrapbook-header">
        <h2 className="scrapbook-title">Our Memory Book ❤️</h2>
        <p className="scrapbook-subtitle"></p>
      </div>

      <div className="scrapbook-container">
        <div className="scrapbook-book">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="scrapbook-page"
              initial={{ 
                opacity: 0, 
                x: 20
              }}
              animate={{ 
                opacity: 1, 
                x: 0
              }}
              exit={{ 
                opacity: 0, 
                x: -20
              }}
              transition={{ 
                duration: 0.4, 
                ease: 'easeOut'
              }}
            >
              <div className="scrapbook-grid">
                {currentMemories.map((memory, idx) => (
                  <motion.div
                    key={memory.id}
                    className="scrapbook-item"
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={polaroidVariants}
                    transition={{ 
                      delay: idx * 0.2, 
                      duration: 0.6
                    }}
                    style={{
                      originX: 0.5,
                      originY: 0.5
                    }}
                  >
                    {/* Polaroid-style photo with rotation */}
                    <motion.div 
                      className="polaroid"
                      style={{
                        rotate: memory.rotation
                      }}
                    >
                      <motion.div 
                        className="polaroid-photo"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img src={memory.photo} alt={memory.caption} />
                      </motion.div>
                      <div className="polaroid-caption">
                        <p className="memory-caption">{memory.caption}</p>
                        <p className="memory-date">{memory.date}</p>
                      </div>

                      {/* Decorative tape */}
                      <motion.div 
                        className="tape tape-top"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.2 + 0.5, duration: 0.3 }}
                      ></motion.div>

                      {/* Animated Stickers */}
                      <div className="stickers">
                        {memory.stickers.map((sticker, i) => (
                          <motion.span 
                            key={i} 
                            className={`sticker sticker-${i}`}
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{
                              delay: idx * 0.2 + i * 0.3 + 0.8,
                              duration: 0.5,
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            <motion.span
                              variants={stickerVariants}
                              animate="animate"
                              custom={i}
                            >
                              {sticker}
                            </motion.span>
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Page Navigation */}
        <motion.div 
          className="scrapbook-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="scrapbook-btn scrapbook-btn-prev"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ← Previous
          </motion.button>
          <motion.span 
            className="scrapbook-page-indicator"
            key={currentPage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Page {currentPage + 1} of {totalPages}
          </motion.span>
          <motion.button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1}
            className="scrapbook-btn scrapbook-btn-next"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Next →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
