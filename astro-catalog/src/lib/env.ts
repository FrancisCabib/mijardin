import { sanitizeImageSrc } from './safe-url';

export const BRAND_NAME = 'Florería Mi Jardín';
export const BRAND_TAGLINE = 'Plantas, flores y regalos';
export const BRAND_PITCH = 'Flores frescas, plantas y regalos con cariño para cada ocasión.';

/** Logo por defecto: archivo presente en public/image_web/. */
const DEFAULT_LOGO_URL = '/image_web/logo-mijardin.png';

function envStr(value: string | undefined): string {
	return String(value ?? '').trim();
}

/** Número de WhatsApp (solo dígitos) o cadena vacía si no está configurado. */
export function getWhatsappNumber(): string {
	return envStr(import.meta.env.VITE_WHATSAPP_NUMBER).replace(/\D/g, '');
}

/** Logo del catálogo: URL de env saneada, o el archivo por defecto. */
export function getLogoSrc(): string {
	const envLogo = envStr(import.meta.env.VITE_CATALOG_LOGO);
	const safe = envLogo ? sanitizeImageSrc(envLogo) : null;
	return safe ?? DEFAULT_LOGO_URL;
}

/** Línea de catálogo del flyer (ej. "Catálogo 2026"). */
export function getCatalogLine(): string {
	return envStr(import.meta.env.VITE_CATALOG_LINE) || `Catálogo ${new Date().getFullYear()}`;
}

/** Línea de contacto del flyer (puede ir vacía). */
export function getContactLine(): string {
	return envStr(import.meta.env.VITE_CATALOG_CONTACT);
}

/** Texto del pie del catálogo. */
export function getCatalogFooter(): string {
	return (
		envStr(import.meta.env.VITE_CATALOG_FOOTER) ||
		'Entrega a coordinar | Horario a confirmar | Diseños personalizados disponibles'
	);
}
