import React, { useState } from 'react'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Activities from './components/Activities'
import Photobooth from './components/Photobooth'
import Sign from './components/Sign'
import images, {recapImages, recapImages2} from './data/image'
import RecapSlideshow from './components/RecapSlideshow'



export default function App() {
  const [page, setPage] = useState(0) // 0 = hero, 1 = gallery

  function openGallery() {
    setPage(1)
  }

  function backToHero() {
    setPage(0)
  }

  function openPhotobooth() {
    setPage(2)
  }

  return (
    <div className="app">
      <main>
        {page === 0 ? (
          <>
            <Hero onOpenGallery={openGallery} onOpenPhotobooth={openPhotobooth} />
            <Activities />
            {/* Recap slideshow shown on the hero page; top uses recapImages, bottom uses recapImages2 */}
            <RecapSlideshow topImages={recapImages} bottomImages={recapImages2} speed={28} height={120} frame={true} frameMode="tile" />
            <Sign />
          </>
        ) : page === 1 ? (
          <section className="page-with-back">
            <div className="top-controls">
              <button className="back-btn" onClick={backToHero} aria-label="Kembali ke halaman utama">← Kembali</button>
            </div>
            <Gallery images={images} />
          </section>
        ) : (
          <section className="page-with-back">
            <div className="top-controls">
              <button className="back-btn" onClick={backToHero} aria-label="Kembali ke halaman utama">← Kembali</button>
            </div>
            <Photobooth />
          </section>
        )}
      </main>

      <footer className="footer">
        <small>Created with ❤️</small>
      </footer>
    </div>
  )
}