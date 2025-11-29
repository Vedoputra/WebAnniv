import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Sign.css'

export default function Sign() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)

  // Load wishes from localStorage on mount
  useEffect(() => {
    const savedWishes = localStorage.getItem('anniversaryWishes')
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes))
      } catch (e) {
        console.error('Failed to load wishes:', e)
      }
    }
  }, [])

  // Save wishes to localStorage whenever it changes
  useEffect(() => {
    if (wishes.length > 0) {
      localStorage.setItem('anniversaryWishes', JSON.stringify(wishes))
    }
  }, [wishes])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    }

    setWishes([newWish, ...wishes])
    setName('')
    setMessage('')
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const deleteWish = (wishId) => {
    const updatedWishes = wishes.filter(wish => wish.id !== wishId)
    setWishes(updatedWishes)
    if (updatedWishes.length === 0) {
      localStorage.removeItem('anniversaryWishes')
    }
  }

  return (
    <section className="sign-section">
      <div className="sign-container">
        {/* Header */}
        <motion.div 
          className="sign-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="sign-title">Wishes for Our Future 💌</h2>
          <p className="sign-subtitle">Tulis harapan dan doa untuk tahun-tahun indah selanjutnya</p>
        </motion.div>

        {/* Envelope */}
        <motion.div 
          className="envelope-wrapper"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={() => !isOpen && setIsOpen(true)}>
            <div className="envelope-flap"></div>
            <div className="envelope-body"></div>
            
            {!isOpen && (
              <motion.div 
                className="envelope-seal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="seal-icon">💕</span>
                <p className="tap-hint">Klik untuk membuka</p>
              </motion.div>
            )}
          </div>

          {/* Letter */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="letter"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -120, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="letter-paper">
                  {/* Close Button */}
                  <button 
                    className="letter-close-btn" 
                    onClick={() => setIsOpen(false)}
                    type="button"
                    aria-label="Tutup surat"
                  >
                    ✕
                  </button>

                  {/* Decorative elements */}
                  <div className="letter-doodles">
                    <span className="doodle doodle-1">💝</span>
                    <span className="doodle doodle-2">✨</span>
                    <span className="doodle doodle-3">💕</span>
                    <span className="doodle doodle-4">🌸</span>
                  </div>

                  <form onSubmit={handleSubmit} className="letter-form">
                    <div className="letter-header-text">
                      <p className="letter-greeting">Dear Our Future Self,</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Dari:</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama kamu..."
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Harapan & Doa:</label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan harapan dan doa untuk tahun-tahun mendatang..."
                        className="form-textarea"
                        rows="6"
                        required
                      />
                    </div>

                    <button type="submit" className="submit-btn">
                      <span>📮</span> Kirim Harapan
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="success-toast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <span className="success-icon">✓</span>
              <p>Harapan kamu telah tersimpan! 💖</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishes Display */}
        {wishes.length > 0 && (
          <motion.div 
            className="wishes-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="wishes-title">Harapan yang Telah Dikirim 💌</h3>
            <div className="wishes-grid">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  className="wish-card"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button 
                    className="wish-delete-btn"
                    onClick={() => deleteWish(wish.id)}
                    aria-label="Hapus harapan"
                    title="Hapus harapan"
                  >
                    🗑️
                  </button>
                  <div className="wish-header">
                    <span className="wish-from">Dari: {wish.name}</span>
                    <span className="wish-date">{wish.date}</span>
                  </div>
                  <p className="wish-message">{wish.message}</p>
                  <div className="wish-footer">
                    <span className="wish-heart">💕</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
