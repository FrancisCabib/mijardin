import { useEffect, useRef, useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { getWhatsappNumber } from '../lib/env';
import {
	buildQuoteBlockForMessage,
	draftToProductText,
	formatClp,
	getDeliveryForZone,
} from '../lib/order';

/** Etiqueta de comuna para el mensaje de WhatsApp. */
function zoneLabelForMessage(zone: string): string {
	if (zone === 'copiapo') return 'Copiapó ($10.000 despacho)';
	if (zone === 'tierra-amarilla') return 'Tierra Amarilla ($3.000 despacho)';
	return 'No indicada';
}

export function OrderDrawer() {
	const { items, removeItem, clear, isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } =
		useOrder();

	const [deliveryZone, setDeliveryZone] = useState('');
	const [status, setStatus] = useState('');

	const fabRef = useRef<HTMLButtonElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const wasOpenRef = useRef(false);

	const whatsappNumber = getWhatsappNumber();

	// Abrir el drawer desde enlaces #pedido y desde el hash de la URL.
	useEffect(() => {
		if (window.location.hash === '#pedido') openDrawer();

		const onHashChange = () => {
			if (window.location.hash === '#pedido') openDrawer();
		};
		const onDocClick = (e: MouseEvent) => {
			const target = e.target;
			if (!(target instanceof Element)) return;
			if (!target.closest('a[href="#pedido"]')) return;
			e.preventDefault();
			openDrawer();
		};

		window.addEventListener('hashchange', onHashChange);
		document.addEventListener('click', onDocClick);
		return () => {
			window.removeEventListener('hashchange', onHashChange);
			document.removeEventListener('click', onDocClick);
		};
	}, [openDrawer]);

	// Clase del body, foco al abrir/cerrar y cierre con Escape.
	useEffect(() => {
		document.body.classList.toggle('order-drawer-open', isDrawerOpen);

		if (isDrawerOpen) {
			const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 320);
			const onKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					e.preventDefault();
					closeDrawer();
				}
			};
			document.addEventListener('keydown', onKeyDown);
			wasOpenRef.current = true;
			return () => {
				window.clearTimeout(focusTimer);
				document.removeEventListener('keydown', onKeyDown);
			};
		}

		if (wasOpenRef.current) {
			fabRef.current?.focus();
			wasOpenRef.current = false;
		}
		return undefined;
	}, [isDrawerOpen, closeDrawer]);

	const count = items.length;

	// Cotización en vivo (subtotal + despacho + total).
	const withAmounts = items.filter((i) => i.priceAmount != null);
	const subtotal = withAmounts.reduce((acc, i) => acc + (i.priceAmount ?? 0), 0);
	const missing = items.length - withAmounts.length;
	const delivery = getDeliveryForZone(deliveryZone);

	const subtotalText = withAmounts.length ? formatClp(subtotal) : '—';
	let deliveryText: string;
	let totalText: string;
	if (delivery) {
		deliveryText = `${delivery.label} · ${formatClp(delivery.amount)}`;
		totalText = withAmounts.length ? formatClp(subtotal + delivery.amount) : '—';
	} else {
		deliveryText = 'Selecciona comuna abajo';
		totalText = withAmounts.length ? `${formatClp(subtotal)} + despacho` : '—';
	}

	const countText = count === 0 ? '' : count === 1 ? '1 producto' : `${count} productos`;
	const fabAriaLabel =
		count > 0
			? `Pedido en grupo, ${count} producto${count === 1 ? '' : 's'}`
			: 'Pedido en grupo';

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!whatsappNumber) {
			setStatus('Falta configurar VITE_WHATSAPP_NUMBER para enviar el pedido.');
			return;
		}

		const formData = new FormData(e.currentTarget);
		const line = (key: string) => String(formData.get(key) ?? '').trim();

		const base = draftToProductText(items);
		const detalles = line('detalles');
		const productText =
			base && detalles ? `${base}\n\nDetalles del pedido: ${detalles}` : base || detalles;

		if (!productText) {
			setStatus(
				'Agrega productos con "Añadir" o escribe el pedido en "Detalles del pedido".',
			);
			return;
		}
		setStatus('');

		const zone = line('deliveryZone');
		const quoteBlock = items.length > 0 ? `\n\n${buildQuoteBlockForMessage(items, zone)}` : '';

		const message = [
			'Hola, envío datos para cotizar/pedir:',
			`Nombre: ${line('name')}`,
			`Teléfono: ${line('phone')}`,
			`Tipo de cliente: ${line('clientType') || 'No indicado'}`,
			`Comuna despacho (cotizador): ${zoneLabelForMessage(zone)}`,
			`Productos:\n${productText}`,
			`Fecha entrega: ${line('deliveryDate') || 'No definida'}`,
			`Dirección/Comuna: ${line('deliveryAddress') || 'No indicada'}`,
			quoteBlock,
		].join('\n');

		const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	return (
		<div className={`order-drawer${isDrawerOpen ? ' is-open' : ''}`}>
			<button
				type="button"
				className={`catalog-jump-pedido${count > 0 ? ' catalog-jump-pedido--has-items' : ''}`}
				ref={fabRef}
				aria-expanded={isDrawerOpen}
				aria-controls="pedido-panel"
				aria-label={fabAriaLabel}
				aria-hidden={isDrawerOpen || undefined}
				tabIndex={isDrawerOpen ? -1 : undefined}
				onClick={() => toggleDrawer()}
			>
				<span className="catalog-jump-pedido__label">Pedido en grupo</span>
				<span
					className="catalog-jump-pedido__badge"
					hidden={count === 0}
					aria-hidden="true"
				>
					{count}
				</span>
			</button>

			<div
				className="order-drawer__backdrop"
				aria-hidden="true"
				onClick={() => closeDrawer()}
			/>

			<div
				id="pedido-panel"
				className="order-drawer__sheet"
				role="dialog"
				aria-modal="true"
				aria-labelledby="order-drawer-title"
				aria-hidden={!isDrawerOpen}
			>
				<div className="order-drawer__chrome">
					<p className="order-drawer__panel-title">Tu pedido</p>
					<button
						type="button"
						className="order-drawer__close"
						aria-label="Cerrar panel"
						onClick={() => closeDrawer()}
					>
						Cerrar
					</button>
				</div>

				<section
					id="pedido"
					className="order-section order-section--drawer"
					aria-label="Pedido en grupo"
				>
					<header className="section-header section-header--flyer">
						<span className="section-header__rule" aria-hidden="true" />
						<div className="section-header__inner">
							<h2 id="order-drawer-title">Haz tu pedido rápido</h2>
							<p>Completa estos datos y se enviarán directo por WhatsApp.</p>
						</div>
						<span className="section-header__rule" aria-hidden="true" />
					</header>

					{count > 0 && (
						<div className="order-basket">
							<div className="order-basket-header">
								<h3 className="order-basket-title">Tu pedido</h3>
								<p className="order-basket-count" aria-live="polite">
									{countText}
								</p>
							</div>
							<ul className="order-basket-list">
								{items.map((item, index) => (
									<li className="order-basket-item" key={index}>
										<span className="order-basket-item-text">
											{item.title}
											{item.price && (
												<span className="order-basket-price">{item.price}</span>
											)}
											{item.category && (
												<span className="order-basket-cat">{item.category}</span>
											)}
										</span>
										<button
											type="button"
											className="order-basket-remove"
											aria-label="Quitar producto del pedido"
											onClick={() => removeItem(index)}
										>
											Quitar
										</button>
									</li>
								))}
							</ul>
							<div className="order-quote-summary">
								<p className="order-quote-line">
									<span>Subtotal productos</span>
									<span>{subtotalText}</span>
								</p>
								<p className="order-quote-line">
									<span>Despacho</span>
									<span>{deliveryText}</span>
								</p>
								<p className="order-quote-line order-quote-total">
									<span>Total estimado</span>
									<span>{totalText}</span>
								</p>
								{missing > 0 && (
									<p className="order-quote-note">
										{missing} producto{missing === 1 ? '' : 's'} sin precio en el
										catálogo; no entran en el subtotal.
									</p>
								)}
							</div>
							<button
								type="button"
								className="order-basket-clear"
								onClick={() => clear()}
							>
								Vaciar lista
							</button>
						</div>
					)}

					<form className="order-form" onSubmit={handleSubmit}>
						<div className="order-grid">
							<label>
								Nombre y apellido
								<input
									ref={nameInputRef}
									name="name"
									type="text"
									required
									placeholder="Ej: Jacqueline Soto"
								/>
							</label>
							<label>
								Teléfono
								<input
									name="phone"
									type="tel"
									required
									placeholder="Ej: +56 9 1234 5678"
								/>
							</label>
							<label>
								Tipo de cliente
								<select name="clientType" required defaultValue="">
									<option value="">Seleccione</option>
									<option value="Particular">Particular</option>
									<option value="Empresa">Empresa</option>
								</select>
							</label>
							<label>
								Comuna de entrega (despacho)
								<select
									name="deliveryZone"
									value={deliveryZone}
									onChange={(e) => setDeliveryZone(e.target.value)}
								>
									<option value="">
										Seleccione para incluir despacho en el total
									</option>
									<option value="copiapo">Copiapó — $10.000</option>
									<option value="tierra-amarilla">Tierra Amarilla — $3.000</option>
								</select>
							</label>
							<label>
								Fecha de entrega
								<input name="deliveryDate" type="date" />
							</label>
							<label>
								Comuna o dirección
								<input
									name="deliveryAddress"
									type="text"
									placeholder="Ej: Copiapó centro"
								/>
							</label>
						</div>
						<label className="order-details-field">
							Detalles del pedido (opcional)
							<span className="order-product-hint">
								Puedes complementar lo que agregaste con "Añadir", o describir el
								pedido aquí si prefieres. No es obligatorio.
							</span>
							<textarea
								name="detalles"
								rows={3}
								placeholder="Ej: horario de entrega, color, dedicatoria"
							/>
						</label>
						<div className="order-actions">
							<button type="submit" className="hero-cta">
								Enviar datos por WhatsApp
							</button>
							<p className="order-form-status" aria-live="polite">
								{status}
							</p>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
