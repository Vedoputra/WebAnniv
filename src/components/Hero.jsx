import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const balloonVariants = {
  float: (i) => ({
    y: [-10, -40 - i * 8, -10],
    x: [0, i % 2 === 0 ? -6 : 6, 0],
    transition: {
      duration: 6 + i * 0.8,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  }),
}

// Photo floating variants (float upward and fade)
const photoVariants = {
  floatUp: (i) => ({
    y: [0, -120 - i * 8, 0],
    opacity: [1, 0.95, 0.0],
    x: [0, i % 2 === 0 ? -8 : 8, 0],
    transition: {
      duration: 5 + i * 0.6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
      delay: i * 0.4,
    },
  }),
}

// Default embedded SVG placeholder used when user hasn't added a photo to `/public/photo_hero.png`.
const placeholderDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='120' height='160'>
    <rect width='100%' height='100%' rx='12' fill='%23ffdfe6' />
    <g fill='%23ff9fb8' opacity='0.9'>
      <circle cx='30' cy='40' r='10' />
      <circle cx='70' cy='30' r='8' />
    </g>
  </svg>
`)}`

export default function Hero({ onOpenGallery, onOpenPhotobooth }) {
  // Determine which photo source to use: try public `/photo_hero.png` then `src/assets/photo_hero.png`
  const [photoSrc, setPhotoSrc] = useState(placeholderDataUrl)
  const thumbs = new Array(5).fill(null)

  useEffect(() => {
    let mounted = true
    const tryLoad = (url) =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
      })

    ;(async () => {
      // 1) public root
      if (!(await tryLoad('/photo_hero.png'))) {
        // 2) try src/assets (Vite serves assets referenced by new URL)
        const assetUrl = new URL('../assets/photo_hero.png', import.meta.url).href
        if (await tryLoad(assetUrl)) {
          if (mounted) setPhotoSrc(assetUrl)
          return
        }
        // else leave placeholder
      } else {
        if (mounted) setPhotoSrc('/photo_hero.png')
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1>Happy Anniversary 4th</h1>
          <p className="subtitle">Sedikit Kado Kecil Dari Kenangan - Kenangan Kita</p>
          <div className="hero-ctas">
            <button className="cta" onClick={onOpenGallery} aria-label="Buka galeri">Buka Galeri 🎁</button>
            <button className="cta" onClick={onOpenPhotobooth} aria-label="Take a moment">Take a moment</button>
          </div>
        </div>

        <div className="balloon-area" aria-hidden>
          {/* decorative balloons */}
          {[0, 1, 2, 3, 4].map((b, i) => (
            <motion.div key={i} className={`balloon balloon-${i}`} custom={i} variants={balloonVariants} animate="float" />
          ))}

          {/* floating photo thumbnails (small images that float upward) */}
          <div className="hero-photos" aria-hidden>
            {thumbs.map((_, i) => (
              <motion.img
                key={i}
                className="hero-photo"
                src={photoSrc}
                alt="photo thumbnail"
                custom={i}
                variants={photoVariants}
                animate="floatUp"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
