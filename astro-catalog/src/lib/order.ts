/**
 * Lógica del carrito de pedido: borrador en localStorage, cotización y
 * armado del mensaje de WhatsApp. Portado del script de la página Astro.
 */

export type DraftItem = {
	title: string;
	category: string;
	price: string;
	priceAmount: number | null;
};

export const STORAGE_KEY = 'catalog_order_draft';

/** Comunas de despacho disponibles en el cotizador. */
export type DeliveryZone = '' | 'copiapo' | 'tierra-amarilla';

export function formatClp(amount: number): string {
	try {
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			maximumFractionDigits: 0,
		}).format(amount);
	} catch {
		return `$${amount.toLocaleString('es-CL')}`;
	}
}

export function getDeliveryForZone(zone: string): { amount: number; label: string } | null {
	if (zone === 'copiapo') return { amount: 10_000, label: 'Copiapó' };
	if (zone === 'tierra-amarilla') return { amount: 3_000, label: 'Tierra Amarilla' };
	return null;
}

function inferPriceAmountFromRaw(o: Record<string, unknown>): number | null {
	if (typeof o.priceAmount === 'number' && Number.isFinite(o.priceAmount)) return o.priceAmount;
	const p = o.price;
	if (typeof p !== 'string' || !p.trim()) return null;
	const digits = p.replace(/\D/g, '');
	if (!digits) return null;
	const n = parseInt(digits, 10);
	return Number.isFinite(n) ? n : null;
}

/** Lee y normaliza el borrador del pedido desde localStorage. */
export function loadDraft(): DraftItem[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.map((item): DraftItem | null => {
				if (!item || typeof item !== 'object') return null;
				const o = item as Record<string, unknown>;
				const title = typeof o.title === 'string' ? o.title.trim() : '';
				if (!title) return null;
				return {
					title,
					category: typeof o.category === 'string' ? o.category.trim() : '',
					price: typeof o.price === 'string' ? o.price.trim() : '',
					priceAmount: inferPriceAmountFromRaw(o),
				};
			})
			.filter((item): item is DraftItem => item !== null);
	} catch {
		return [];
	}
}

/** Persiste el borrador del pedido en localStorage. */
export function saveDraft(items: DraftItem[]): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		/* almacenamiento no disponible */
	}
}

/** Lista numerada de productos para el mensaje de WhatsApp. */
export function draftToProductText(items: DraftItem[]): string {
	return items
		.map((item, i) => {
			const price = item.price ? ` — ${item.price}` : '';
			const cat = item.category ? ` (${item.category})` : '';
			return `${i + 1}. ${item.title}${cat}${price}`;
		})
		.join('\n');
}

/** Bloque de cotización (subtotal + despacho + total) para el mensaje de WhatsApp. */
export function buildQuoteBlockForMessage(items: DraftItem[], zone: string): string {
	const withAmounts = items.filter((i) => i.priceAmount != null);
	const subtotal = withAmounts.reduce((acc, i) => acc + (i.priceAmount ?? 0), 0);
	const missing = items.length - withAmounts.length;
	const delivery = getDeliveryForZone(zone);

	const lines = ['--- Cotización ---', `Subtotal productos: ${formatClp(subtotal)}`];
	if (missing > 0) {
		lines.push(
			`Nota: ${missing} ítem${missing === 1 ? '' : 's'} sin precio en catálogo (no sumados arriba).`,
		);
	}
	if (delivery) {
		lines.push(`Despacho (${delivery.label}): ${formatClp(delivery.amount)}`);
		lines.push(`Total estimado: ${formatClp(subtotal + delivery.amount)}`);
	} else {
		lines.push(
			'Despacho: no indicado en el formulario (Copiapó $10.000 / Tierra Amarilla $3.000).',
		);
	}
	return lines.join('\n');
}
