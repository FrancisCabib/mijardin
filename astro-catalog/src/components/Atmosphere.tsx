/**
 * Capas atmosféricas decorativas (sin interacción): fondo parallax CSS,
 * follaje SVG en las 4 esquinas, pétalos cayendo y viñeta.
 * Todo `aria-hidden`. Animaciones definidas en global.css.
 */
export function Atmosphere() {
	return (
		<>
			<div className="site-parallax" aria-hidden="true">
				<div className="site-parallax__layer site-parallax__layer--far" />
				<div className="site-parallax__layer site-parallax__layer--near" />
			</div>

			<div className="foliage-layer" aria-hidden="true">
				<svg className="foliage foliage--tl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
						<path d="M0 0 Q 30 40, 70 75 Q 110 110, 150 130" />
						<g className="foliage__leaf">
							<path d="M30 30 Q 18 20, 8 26 Q 18 38, 30 30 Z" />
							<path d="M30 30 L 14 26" />
						</g>
						<g className="foliage__leaf">
							<path d="M55 55 Q 45 38, 32 38 Q 38 56, 55 55 Z" />
							<path d="M55 55 L 38 42" />
						</g>
						<g className="foliage__leaf">
							<path d="M80 80 Q 90 60, 95 50 Q 75 60, 80 80 Z" />
							<path d="M80 80 L 88 58" />
						</g>
						<g className="foliage__leaf">
							<path d="M115 110 Q 100 96, 88 98 Q 100 118, 115 110 Z" />
							<path d="M115 110 L 96 104" />
						</g>
						<g className="foliage__leaf">
							<path d="M140 124 Q 152 108, 158 98 Q 138 102, 140 124 Z" />
							<path d="M140 124 L 150 104" />
						</g>
						<circle className="foliage__bud" cx="148" cy="135" r="3.5" fill="currentColor" />
					</g>
				</svg>

				<svg className="foliage foliage--tr" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
						<path d="M200 0 Q 170 40, 130 75 Q 90 110, 50 130" />
						<g className="foliage__leaf">
							<path d="M170 30 Q 182 20, 192 26 Q 182 38, 170 30 Z" />
							<path d="M170 30 L 186 26" />
						</g>
						<g className="foliage__leaf">
							<path d="M145 55 Q 155 38, 168 38 Q 162 56, 145 55 Z" />
							<path d="M145 55 L 162 42" />
						</g>
						<g className="foliage__leaf">
							<path d="M120 80 Q 110 60, 105 50 Q 125 60, 120 80 Z" />
							<path d="M120 80 L 112 58" />
						</g>
						<g className="foliage__leaf">
							<path d="M85 110 Q 100 96, 112 98 Q 100 118, 85 110 Z" />
							<path d="M85 110 L 104 104" />
						</g>
						<g className="foliage__leaf">
							<path d="M60 124 Q 48 108, 42 98 Q 62 102, 60 124 Z" />
							<path d="M60 124 L 50 104" />
						</g>
						<circle className="foliage__bud" cx="52" cy="135" r="3.5" fill="currentColor" />
					</g>
				</svg>

				<svg className="foliage foliage--bl" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
					<g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
						{/* Raíces / tallo subiendo desde el suelo */}
						<path d="M50 240 L 50 180 Q 48 130, 60 80" />
						<path d="M50 240 Q 30 220, 18 200" />
						<path d="M50 240 Q 72 222, 88 208" />
						<path d="M50 240 Q 38 232, 22 230" />
						<path d="M50 240 Q 70 232, 90 234" />
						{/* Hojas en el tallo */}
						<g className="foliage__leaf">
							<path d="M52 175 Q 35 168, 24 172 Q 38 186, 52 175 Z" />
							<path d="M52 175 L 32 172" />
						</g>
						<g className="foliage__leaf">
							<path d="M54 140 Q 72 132, 84 138 Q 70 152, 54 140 Z" />
							<path d="M54 140 L 76 134" />
						</g>
						<g className="foliage__leaf">
							<path d="M58 105 Q 40 98, 28 102 Q 44 116, 58 105 Z" />
							<path d="M58 105 L 38 100" />
						</g>
						<g className="foliage__leaf">
							<path d="M58 75 Q 76 68, 88 72 Q 74 86, 58 75 Z" />
							<path d="M58 75 L 80 70" />
						</g>
						{/* Flor en la punta */}
						<g transform="translate(60 70)">
							<circle r="3" fill="currentColor" />
							<ellipse cx="0" cy="-7" rx="3.5" ry="6" />
							<ellipse cx="6" cy="-3" rx="3.5" ry="6" transform="rotate(70)" />
							<ellipse cx="6" cy="3" rx="3.5" ry="6" transform="rotate(110)" />
							<ellipse cx="-6" cy="-3" rx="3.5" ry="6" transform="rotate(-70)" />
							<ellipse cx="-6" cy="3" rx="3.5" ry="6" transform="rotate(-110)" />
						</g>
					</g>
				</svg>

				<svg className="foliage foliage--br" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
					<g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
						<path d="M150 240 L 150 180 Q 152 130, 140 80" />
						<path d="M150 240 Q 170 220, 182 200" />
						<path d="M150 240 Q 128 222, 112 208" />
						<path d="M150 240 Q 162 232, 178 230" />
						<path d="M150 240 Q 130 232, 110 234" />
						<g className="foliage__leaf">
							<path d="M148 175 Q 165 168, 176 172 Q 162 186, 148 175 Z" />
							<path d="M148 175 L 168 172" />
						</g>
						<g className="foliage__leaf">
							<path d="M146 140 Q 128 132, 116 138 Q 130 152, 146 140 Z" />
							<path d="M146 140 L 124 134" />
						</g>
						<g className="foliage__leaf">
							<path d="M142 105 Q 160 98, 172 102 Q 156 116, 142 105 Z" />
							<path d="M142 105 L 162 100" />
						</g>
						<g className="foliage__leaf">
							<path d="M142 75 Q 124 68, 112 72 Q 126 86, 142 75 Z" />
							<path d="M142 75 L 120 70" />
						</g>
						<g transform="translate(140 70)">
							<circle r="3" fill="currentColor" />
							<ellipse cx="0" cy="-7" rx="3.5" ry="6" />
							<ellipse cx="6" cy="-3" rx="3.5" ry="6" transform="rotate(70)" />
							<ellipse cx="6" cy="3" rx="3.5" ry="6" transform="rotate(110)" />
							<ellipse cx="-6" cy="-3" rx="3.5" ry="6" transform="rotate(-70)" />
							<ellipse cx="-6" cy="3" rx="3.5" ry="6" transform="rotate(-110)" />
						</g>
					</g>
				</svg>
			</div>

			<div className="petal-layer" aria-hidden="true">
				<span className="petal petal--rose petal--1" />
				<span className="petal petal--gold petal--2" />
				<span className="petal petal--sage petal--3" />
				<span className="petal petal--rose petal--4" />
				<span className="petal petal--blush petal--5" />
				<span className="petal petal--gold petal--6" />
				<span className="petal petal--rose petal--7" />
				<span className="petal petal--sage petal--8" />
				<span className="petal petal--blush petal--9" />
				<span className="petal petal--gold petal--10" />
			</div>

			<div className="vignette" aria-hidden="true" />
		</>
	);
}
