import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { CatalogService } from '../lib/types';
import { sanitizeImageSrc } from '../lib/safe-url';
import { getWhatsappNumber } from '../lib/env';
import { useOrder } from '../context/OrderContext';

type ServiceCardProps = {
	service: CatalogService;
	categoryName?: string;
	/** N° de specimen ya formateado (ej. "042"). */
	specimenNumber: string;
	/** Índice global de la card, para escalonar el delay del scroll reveal. */
	revealIndex: number;
};

const STAMP_DURATION_MS = 1100;

export function ServiceCard({
	service,
	categoryName = 'Catalogo',
	specimenNumber,
	revealIndex,
}: ServiceCardProps) {
	const { addItem } = useOrder();
	const [stampKey, setStampKey] = useState(0);
	const [showStamp, setShowStamp] = useState(false);
	const stampTimer = useRef<number | null>(null);

	useEffect(
		() => () => {
			if (stampTimer.current !== null) clearTimeout(stampTimer.current);
		},
		[],
	);

	const imageSrc = sanitizeImageSrc(service.image_url);
	const whatsappNumber = getWhatsappNumber();

	const productMessage = [
		'Hola, me interesa este producto del catalogo:',
		`Producto: ${service.title}`,
		categoryName ? `Categoria: ${categoryName}` : null,
		service.price_formatted ? `Precio: ${service.price_formatted}` : null,
		'Quisiera mas informacion y disponibilidad.',
	]
		.filter(Boolean)
		.join('\n');
	const productWhatsappUrl = whatsappNumber
		? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(productMessage)}`
		: '#';

	const cardStyle = { '--reveal-delay': `${(revealIndex % 8) * 60}ms` } as CSSProperties;

	function handleAdd() {
		addItem({
			title: service.title,
			category: categoryName,
			price: service.price_formatted ?? '',
			priceAmount: service.price ?? null,
		});

		// Sello "ramo recogido": se reimprime en cada añadido (salvo reduced-motion).
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (stampTimer.current !== null) clearTimeout(stampTimer.current);
		setStampKey((k) => k + 1);
		setShowStamp(true);
		stampTimer.current = window.setTimeout(() => setShowStamp(false), STAMP_DURATION_MS);
	}

	return (
		<article
			className="service-card service-card--flyer reveal"
			data-specimen-num={specimenNumber}
			style={cardStyle}
		>
			<div className="media">
				{imageSrc ? (
					<img src={imageSrc} alt={service.title} loading="lazy" />
				) : (
					<div className="image-placeholder">Sin imagen</div>
				)}
			</div>

			<div className="content">
				<div className="card-specimen-line" aria-hidden="true">
					<span className="card-specimen-line__num">N° {specimenNumber}</span>
					<span className="card-floral-rule" />
				</div>

				<h3>{service.title}</h3>

				{(service.short_description || service.price_formatted) && (
					<p className="flyer-meta">
						{service.price_formatted && (
							<span className="flyer-meta__price">{service.price_formatted}</span>
						)}
						{service.short_description && (
							<span className="flyer-meta__desc">{service.short_description}</span>
						)}
					</p>
				)}

				{service.subtitle && <p className="subtitle">{service.subtitle}</p>}

				<div className="service-card-actions">
					<button
						type="button"
						className="add-to-order-btn"
						data-add-to-order
						onClick={handleAdd}
					>
						<span>Añadir</span>
						<span className="arrow" aria-hidden="true">→</span>
					</button>
					{whatsappNumber ? (
						<a
							className="whatsapp-product-btn"
							href={productWhatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>WhatsApp</span>
							<span className="arrow" aria-hidden="true">→</span>
						</a>
					) : (
						<span className="whatsapp-product-btn whatsapp-product-btn--disabled">
							WhatsApp no configurado
						</span>
					)}
				</div>
			</div>

			{showStamp && (
				<div key={stampKey} className="specimen-stamp is-stamping">
					<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<circle className="specimen-stamp__circle" cx="80" cy="80" r="73" />
						<circle
							cx="80"
							cy="80"
							r="64"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.6"
							strokeDasharray="2 4"
						/>
						<text
							className="specimen-stamp__text"
							x="80"
							y="58"
							textAnchor="middle"
							style={{ fontSize: '11px', letterSpacing: '0.22em' }}
						>
							RAMO
						</text>
						<text
							className="specimen-stamp__text"
							x="80"
							y="74"
							textAnchor="middle"
							style={{ fontSize: '11px', letterSpacing: '0.22em' }}
						>
							RECOGIDO
						</text>
						<line x1="46" y1="82" x2="114" y2="82" stroke="currentColor" strokeWidth="0.6" />
						<text
							className="specimen-stamp__text"
							x="80"
							y="100"
							textAnchor="middle"
							style={{ fontSize: '13px', letterSpacing: '0.22em' }}
						>
							N° {specimenNumber}
						</text>
						<text
							x="80"
							y="116"
							textAnchor="middle"
							fill="currentColor"
							style={{ fontSize: '14px' }}
						>
							❁
						</text>
						<text
							className="specimen-stamp__text"
							x="80"
							y="130"
							textAnchor="middle"
							style={{ fontSize: '7px', letterSpacing: '0.3em' }}
						>
							FLORERÍA · MI JARDÍN
						</text>
					</svg>
				</div>
			)}
		</article>
	);
}
