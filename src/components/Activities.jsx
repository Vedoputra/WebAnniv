import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import images from '../data/image'

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

export default function Activities() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(memories.length / itemsPerPage)

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
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="scrapbook-grid">
                {currentMemories.map((memory, idx) => (
                  <motion.div
                    key={memory.id}
                    className="scrapbook-item"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.4 }}
                    style={{
                      transform: `rotate(${memory.rotation}deg)`
                    }}
                  >
                    {/* Polaroid-style photo */}
                    <div className="polaroid">
                      <div className="polaroid-photo">
                        <img src={memory.photo} alt={memory.caption} />
                      </div>
                      <div className="polaroid-caption">
                        <p className="memory-caption">{memory.caption}</p>
                        <p className="memory-date">{memory.date}</p>
                      </div>

                      {/* Decorative tape */}
                      <div className="tape tape-top"></div>

                      {/* Stickers */}
                      <div className="stickers">
                        {memory.stickers.map((sticker, i) => (
                          <span key={i} className={`sticker sticker-${i}`}>
                            {sticker}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page Navigation */}
        <div className="scrapbook-nav">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="scrapbook-btn scrapbook-btn-prev"
          >
            ← Previous
          </button>
          <span className="scrapbook-page-indicator">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1}
            className="scrapbook-btn scrapbook-btn-next"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}
