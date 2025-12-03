import React from 'react'
import './RecapSlideshow.css'

const RecapSlideshow = ({ images = [], topImages = null, bottomImages = null, speed = 30, height = 140, frame = false, frameStyle = 'polaroid', frameMode = 'polaroid', frameSrc = '', frameBottomSrc = '' }) => {
	const defaultFrameSrc = frameSrc || new URL('../assets/photo_asset_5.png', import.meta.url).href
	const defaultFrameBottom = frameBottomSrc || new URL('../assets/photo_asset_6.png', import.meta.url).href
	const defaultImages = [
		new URL('../assets/photo_asset_1.png', import.meta.url).href,
		new URL('../assets/photo_asset_2.png', import.meta.url).href,
	]

	// Determine top/bottom image sets (priority: explicit prop -> `images` prop -> defaults)
	const topImgs = (topImages && topImages.length) ? topImages : (images && images.length ? images : defaultImages)
	const bottomImgs = (bottomImages && bottomImages.length) ? bottomImages : (images && images.length ? images : defaultImages)

	// duplicate to allow seamless looping (translate -50%)
	const topSequence = [...topImgs, ...topImgs]
	const bottomSequence = [...bottomImgs, ...bottomImgs]

	const styleVars = {
		['--marquee-speed']: `${speed}s`,
		['--marquee-height']: `${height}px`,
	}

	return (
		<section className="recap-slideshow" style={styleVars} aria-hidden={false}>
			{/* Top row: left -> right (normal) */}
			<div className="recap-row">
				<div className="recap-track">
					{topSequence.map((s, i) => (
						<div className={`recap-item ${frame ? 'has-frame' : ''} ${frameStyle ? `frame-${frameStyle}` : ''}`} key={`top-${i}`}>
									<div className="recap-photo-wrapper">
										<img className="recap-photo" src={s} alt="recap" loading="lazy" />
										{frame && frameMode === 'polaroid' && (
											<div className="recap-frame-decor" aria-hidden="true"></div>
										)}
										{frame && frameMode === 'tile' && (
											<>
												<div
													className="recap-tile"
													aria-hidden="true"
													style={{ backgroundImage: `url(${defaultFrameSrc})` }}
												/>
												<div
													className="recap-tile-bottom"
													aria-hidden="true"
													style={{ backgroundImage: `url(${defaultFrameBottom})` }}
												/>
											</>
										)}
									</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom row: right -> left (reverse) */}
			<div className="recap-row reverse">
				<div className="recap-track">
							{bottomSequence.map((s, i) => (
						<div className={`recap-item ${frame ? 'has-frame' : ''} ${frameStyle ? `frame-${frameStyle}` : ''}`} key={`bot-${i}`}>
									<div className="recap-photo-wrapper">
										<img className="recap-photo" src={s} alt="recap" loading="lazy" />
										{frame && frameMode === 'polaroid' && (
											<div className="recap-frame-decor" aria-hidden="true"></div>
										)}
										{frame && frameMode === 'tile' && (
											<>
												<div
													className="recap-tile"
													aria-hidden="true"
													style={{ backgroundImage: `url(${defaultFrameSrc})` }}
												/>
												<div
													className="recap-tile-bottom"
													aria-hidden="true"
													style={{ backgroundImage: `url(${defaultFrameBottom})` }}
												/>
											</>
										)}
									</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default RecapSlideshow

