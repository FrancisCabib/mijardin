import { Fragment, useEffect, useState } from 'react';

type HeroProps = {
	brandName?: string | null;
	logoSrc?: string | null;
	logoWidth?: number;
	preHeadline?: string | null;
	headline?: string | null;
	catalogLine?: string | null;
	contactLine?: string | null;
	subHeadline?: string | null;
	ctaText?: string | null;
	ctaUrl?: string | null;
	secondaryCtaText?: string | null;
	secondaryCtaUrl?: string | null;
};

const SEASON_NAMES = [
	'VERANO', 'VERANO', 'OTOÑO',
	'OTOÑO', 'OTOÑO', 'INVIERNO',
	'INVIERNO', 'INVIERNO', 'PRIMAVERA',
	'PRIMAVERA', 'PRIMAVERA', 'VERANO',
];
const EDITION_ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

function trimmed(value: string | null | undefined): string {
	return (value ?? '').trim();
}

export function Hero({
	brandName = 'Florería Mi Jardín',
	logoSrc = null,
	logoWidth = 180,
	preHeadline = 'Plantas, flores y regalos',
	headline = '',
	catalogLine = null,
	contactLine = null,
	subHeadline = 'Flores frescas, plantas y regalos con cariño para cada ocasión.',
	ctaText = 'Ver catálogo',
	ctaUrl = '#contacto',
	secondaryCtaText = null,
	secondaryCtaUrl = null,
}: HeroProps) {
	// El reveal por palabras se dispara tras montar (clip-path en global.css).
	const [revealed, setRevealed] = useState(false);
	useEffect(() => {
		let raf2 = 0;
		const raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => setRevealed(true));
		});
		return () => {
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
		};
	}, []);

	const logo = trimmed(logoSrc);
	const name = trimmed(brandName) || 'Florería Mi Jardín';
	const showPreHeadline = Boolean(trimmed(preHeadline));
	const secCta = Boolean(trimmed(secondaryCtaText) && trimmed(secondaryCtaUrl));

	const hasContent = Boolean(
		showPreHeadline ||
			trimmed(headline) ||
			trimmed(catalogLine) ||
			trimmed(contactLine) ||
			trimmed(subHeadline) ||
			trimmed(ctaText) ||
			secCta ||
			name,
	);

	if (!hasContent) return null;

	const year = new Date().getFullYear();
	const season = SEASON_NAMES[new Date().getMonth()];
	const edition = EDITION_ROMANS[(year - 2024) % 12] ?? 'I';
	const brandWords = name.split(/\s+/).filter(Boolean);

	return (
		<section className={`hero hero--flyer${revealed ? ' is-revealed' : ''}`}>
			<div className="catalog-meta-line" aria-hidden="true">
				<span>FLORES &amp; PLANTAS</span>
				<span className="catalog-meta-line__lozenge" />
				<span>VOL. {edition} · {season} {year}</span>
				<span className="catalog-meta-line__lozenge" />
				<span>DE CORTE FRESCO</span>
				<span className="catalog-meta-line__spacer" />
				<span>CATÁLOGO · MI JARDÍN</span>
			</div>

			<div className="hero-inner">
				{logo && (
					<div className="hero-flyer__logo-wrap">
						<img
							className="hero-flyer__logo"
							src={logo}
							alt={name}
							width={logoWidth}
							loading="eager"
							decoding="async"
						/>
					</div>
				)}

				{showPreHeadline && <p className="pre-headline">{preHeadline}</p>}

				<h1 className="hero-flyer__brand">
					{brandWords.map((word, i) => (
						<Fragment key={i}>
							{i > 0 && ' '}
							<span className="reveal-word">
								<span style={{ animationDelay: `${i * 90}ms` }}>{word}</span>
							</span>
						</Fragment>
					))}
				</h1>

				<div className="hero-flyer__signature" aria-hidden="true">
					<span className="hero-flyer__signature-line" />
					<span className="hero-flyer__signature-text">Cortado · Compuesto · Entregado</span>
					<span className="hero-flyer__signature-line" />
				</div>

				{trimmed(headline) && <p className="hero-flyer__headline-extra">{headline}</p>}

				{trimmed(subHeadline) && <p className="sub-headline">{subHeadline}</p>}

				{(trimmed(catalogLine) || trimmed(contactLine)) && (
					<div className="hero-meta-row">
						{trimmed(catalogLine) && <p className="hero-flyer__catalog">{catalogLine}</p>}
						{trimmed(contactLine) && <p className="hero-flyer__contact">{contactLine}</p>}
					</div>
				)}

				{(trimmed(ctaText) || secCta) && (
					<div className="hero-cta-row">
						{trimmed(ctaText) && (
							<a href={ctaUrl || '#contacto'} className="hero-cta">
								<span>{ctaText}</span>
								<span className="arrow" aria-hidden="true">→</span>
							</a>
						)}
						{secCta && (
							<a href={secondaryCtaUrl ?? '#'} className="hero-cta hero-cta--outline">
								<span>{secondaryCtaText}</span>
								<span className="arrow" aria-hidden="true">→</span>
							</a>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
