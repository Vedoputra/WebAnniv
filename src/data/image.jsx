// Clean file: only the intended exports below

// Image list for gallery and scrapbook.
// Images placed in `src/assets/` are referenced with `new URL(..., import.meta.url).href`.

const images = [
  new URL('../assets/IMG-20251203-WA0010.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0011.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0012.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0013.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0014.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0015.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0016.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0017.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0018.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0019.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0020.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0021.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0022.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0023.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0024.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0025.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0026.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0027.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0028.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0029.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0030.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0031.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0032.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0033.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0034.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0035.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0036.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0037.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0038.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0039.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0040.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0041.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0042.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0043.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0044.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0045.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0046.jpg', import.meta.url).href,
  new URL('../assets/IMG-20251203-WA0047.jpg', import.meta.url).href,
  // fallback / previously used images
  new URL('../assets/photo1.jpg', import.meta.url).href,
  new URL('../assets/photo_hero.png', import.meta.url).href,
]

// Named export for the recap slideshow selection.
// Edit this array to choose exactly which images appear in the recap slideshow.
// For example, use `recapImages = [images[0], images[3], images[8]]` to pick specific photos.
export const recapImages = [
  // default: first 12 images (customize as needed)
  images[12], images[13], images[14], images[15], images[16], images[17], images[18], images[19], images[20], images[21], images[22], images[23]
]

export const recapImages2 = [
  images[0], images[1], images[2], images[3], images[4], images[5], images[6], images[7], images[8], images[9], images[10], images[11]
]

export default images