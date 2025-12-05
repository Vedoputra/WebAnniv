import React, { useRef, useState } from 'react'
import './Photobooth.css'

// Simple Photobooth: choose up to 3 images, position them into a frame,
// export as PNG, and offer share/download options.
export default function Photobooth() {
  const [slots, setSlots] = useState([null, null, null, null])
  const [message, setMessage] = useState('')
  const [cameraSlot, setCameraSlot] = useState(null) // which slot is using camera
  const [stream, setStream] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  // Real-time canvas update whenever slots change
  React.useEffect(() => {
    renderToCanvas(true)
  }, [slots])

  async function renderToCanvas(isPreview = false) {
    const canvas = canvasRef.current
    if (!canvas) return null
    const ctx = canvas.getContext('2d')
    const w = 540  // Match frame width from image
    const h = 1560 // Match frame height from image
    canvas.width = w
    canvas.height = h

    // Background (soft pink matching frame)
    ctx.fillStyle = '#ffd4e5'
    ctx.fillRect(0, 0, w, h)

    // Draw four photos stacked vertically matching frame positions
    // Slot positions based on your frame design
    const slots_config = [
      { x: 30, y: 340, w: 480, h: 260 },   // Slot 1
      { x: 30, y: 633, w: 480, h: 260 },   // Slot 2  
      { x: 30, y: 940, w: 480, h: 260 },   // Slot 3
      { x: 30, y: 1240, w: 480, h: 260 }   // Slot 4
    ]

    for (let i = 0; i < 4; i++) {
      const slot = slots[i]
      const config = slots_config[i]
      
      // Save context for clipping
      ctx.save()
      
      // Create rounded rectangle clipping path
      const radius = 30
      ctx.beginPath()
      ctx.moveTo(config.x + radius, config.y)
      ctx.lineTo(config.x + config.w - radius, config.y)
      ctx.quadraticCurveTo(config.x + config.w, config.y, config.x + config.w, config.y + radius)
      ctx.lineTo(config.x + config.w, config.y + config.h - radius)
      ctx.quadraticCurveTo(config.x + config.w, config.y + config.h, config.x + config.w - radius, config.y + config.h)
      ctx.lineTo(config.x + radius, config.y + config.h)
      ctx.quadraticCurveTo(config.x, config.y + config.h, config.x, config.y + config.h - radius)
      ctx.lineTo(config.x, config.y + radius)
      ctx.quadraticCurveTo(config.x, config.y, config.x + radius, config.y)
      ctx.closePath()
      ctx.clip()
      
      if (slot && slot.url) {
        // draw image with cover scaling so it fills the slot completely
        // eslint-disable-next-line no-await-in-loop
        const img = await loadImage(slot.url)
        
        let drawSource = img
        
        // Don't rotate - result is already correct
        // If image is landscape (width > height), flip 180° to fix upside-down issue
        // if (img.width > img.height) {
        //   const off = document.createElement('canvas')
        //   off.width = img.width
        //   off.height = img.height
        //   const octx = off.getContext('2d')
        //   octx.translate(off.width / 2, off.height / 2)
        //   // octx.rotate(Math.PI)  // Rotate 180 degrees
        //   octx.drawImage(img, -img.width / 2, -img.height / 2)
        //   drawSource = off
        // }
        
        // Use cover scaling: fill the slot completely, center-crop if needed
        const { sw, sh } = coverImageSize(drawSource.width, drawSource.height, config.w, config.h)
        const offsetX = config.x + Math.round((config.w - sw) / 2)
        const offsetY = config.y + Math.round((config.h - sh) / 2)
        ctx.drawImage(drawSource, 0, 0, drawSource.width, drawSource.height, offsetX, offsetY, sw, sh)
      } else {
        // placeholder - light blue sky background
        ctx.fillStyle = '#d4eeff'
        ctx.fillRect(config.x, config.y, config.w, config.h)
      }
      
      // Restore context
      ctx.restore()
    }

    // Load and draw frame overlay on top
    try {
      const frameUrl = new URL('../assets/frame_photobooth.png', import.meta.url).href
      // eslint-disable-next-line no-await-in-loop
      const frameImg = await loadImage(frameUrl)
      ctx.drawImage(frameImg, 0, 0, w, h)
    } catch (e) {
      // Frame not found, skip overlay
      console.warn('Frame overlay not found:', e)
    }

    if (isPreview) return null // Just render, don't export blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  function fitImage(iw, ih, maxW, maxH) {
    const r = Math.min(maxW / iw, maxH / ih)
    return { sw: Math.round(iw * r), sh: Math.round(ih * r) }
  }

  // Cover scaling: scale so image fills destination completely (may crop edges)
  function coverImageSize(iw, ih, destW, destH) {
    const r = Math.max(destW / iw, destH / ih)
    return { sw: Math.round(iw * r), sh: Math.round(ih * r) }
  }

  async function handleExport() {
    setMessage('Rendering...')
    const blob = await renderToCanvas()
    if (!blob) {
      setMessage('Gagal membuat gambar')
      return
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'photobooth.png'
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Gambar siap diunduh')
  }

  async function handleShare() {
    setMessage('Preparing share...')
    const blob = await renderToCanvas()
    if (!blob) return setMessage('Gagal membuat gambar')
    const file = new File([blob], 'photobooth.png', { type: 'image/png' })
    // Try Web Share API with files
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await navigator.share({ files: [file], title: 'Photobooth', text: 'My photobooth png' })
        setMessage('Dibagikan lewat share dialog')
        return
      } catch (e) {
        // fallthrough
      }
    }

    // Fallback: open mail client with instructions (attachment not supported via mailto)
    const mailto = `mailto:?subject=Photobooth&body=Hi! Please find the photobooth image attached. I exported it from the site. (If it didn't attach, download the PNG and attach manually).`
    window.location.href = mailto
    setMessage('Membuka email klien; lampirkan file photobooth secara manual jika perlu')
  }

  function clearSlot(i) {
    const next = [...slots]
    next[i] = null
    setSlots(next)
  }

  async function openCamera(idx) {
    setCameraSlot(idx)
    setMessage('Meminta akses kamera...')
    
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMessage('❌ Kamera tidak didukung di browser ini. Gunakan HTTPS atau browser modern (Chrome/Firefox).')
      setCameraSlot(null)
      return
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      })
      setStream(mediaStream)
      setMessage('Kamera aktif — posisikan dan tekan Ambil Foto')
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
    } catch (err) {
      let errorMsg = 'Gagal membuka kamera: '
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg += 'Izin kamera ditolak. Izinkan akses kamera di pengaturan browser.'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMsg += 'Kamera tidak ditemukan di perangkat ini.'
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMsg += 'Kamera sedang digunakan aplikasi lain.'
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        errorMsg += 'Kamera tidak mendukung pengaturan yang diminta.'
      } else if (err.name === 'NotSupportedError') {
        errorMsg += 'Akses kamera memerlukan HTTPS. Gunakan https:// atau ngrok.'
      } else {
        errorMsg += err.message || 'Error tidak diketahui. Pastikan menggunakan HTTPS.'
      }
      
      setMessage(errorMsg)
      setCameraSlot(null)
    }
  }

  function startCountdown() {
    setCountdown(3)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          capturePhoto()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  function capturePhoto() {
    if (!videoRef.current || cameraSlot === null) return
    const video = videoRef.current
    const tempCanvas = document.createElement('canvas')
    
    // Detect if we're in landscape mode on mobile
    const isLandscapeMobile = window.innerWidth <= 900 && window.matchMedia('(orientation: landscape)').matches
    
    if (isLandscapeMobile) {
      // In landscape mobile, video is rotated 90deg, so swap dimensions
      tempCanvas.width = video.videoHeight
      tempCanvas.height = video.videoWidth
      const ctx = tempCanvas.getContext('2d')
      
      // Apply same transform as CSS: rotate 90deg then mirror
      ctx.translate(tempCanvas.width / 2, tempCanvas.height / 2)
      ctx.rotate(Math.PI / 2) // 90 degrees
      ctx.scale(-1, 1) // mirror horizontally
      ctx.drawImage(video, -video.videoWidth / 2, -video.videoHeight / 2, video.videoWidth, video.videoHeight)
    } else {
      // Normal portrait mode or desktop
      tempCanvas.width = video.videoWidth
      tempCanvas.height = video.videoHeight
      const ctx = tempCanvas.getContext('2d')
      
      // Just mirror horizontally to match preview
      ctx.translate(tempCanvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0)
    }
    
    tempCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const next = [...slots]
      next[cameraSlot] = { file: blob, url }
      setSlots(next)
      closeCamera()
      setMessage(`Foto ${cameraSlot + 1} tersimpan`)
    }, 'image/png')
  }

  function closeCamera() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
      setStream(null)
    }
    setCameraSlot(null)
    setCountdown(null)
    if (videoRef.current) videoRef.current.srcObject = null
  }


  return (
    <section className="photobooth">
      <h2>PhotoBooth</h2>
      <p className="muted">Lets Take a Moments & Capture every moment</p>

      {/* Camera modal */}
      {cameraSlot !== null && (
        <div className="camera-modal">
          <div className="camera-box">
            <div className="camera-header">
              <span>Foto {cameraSlot + 1} dari 3</span>
            </div>
            <div className="camera-preview-wrap">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              {countdown !== null && (
                <div className="countdown-overlay">
                  <div className="countdown-number">{countdown}</div>
                </div>
              )}
            </div>
            <div className="camera-controls">
              <button onClick={startCountdown} disabled={countdown !== null} className="capture-btn">
                {countdown === null ? '📸 Capturing...' : 'Tunggu...'}
              </button>
              <button onClick={closeCamera} className="cancel">Batal</button>
            </div>
          </div>
        </div>
      )}

      <div className="photobooth-grid">
        <div className="photobooth-canvas-wrap">
          <canvas ref={canvasRef} className="photobooth-canvas" />
        </div>

        <div className="photobooth-controls">
          <div className="slots-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="slot-card" key={i}>
                <div className="slot-preview">
                  {slots[i] ? (
                    <img src={slots[i].url} alt={`slot-${i}`} />
                  ) : (
                    <div className="placeholder-box">
                      <span className="slot-number">{i + 1}</span>
                    </div>
                  )}
                </div>
                <div className="slot-footer">
                  {slots[i] ? (
                    <button className="retake-btn" onClick={() => { clearSlot(i); openCamera(i); }}>📷 Ulang</button>
                  ) : (
                    <button className="camera-btn" onClick={() => openCamera(i)}>📷 Ambil Foto</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="actions">
            <button onClick={handleExport} className="export-btn">Unduh PNG</button>
            <button onClick={handleShare} className="share-btn">Bagikan / Email</button>
          </div>
          {message && <p className="status">{message}</p>}
        </div>
      </div>
    </section>
  )
}
