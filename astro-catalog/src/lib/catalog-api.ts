import type { CatalogLayoutResponse } from './types';
import { assertCatalogLayout } from './catalog-layout-parse';

// Margen amplio: la primera petición tras levantar Herd (Laravel + MySQL en frío)
// puede tardar varios segundos.
const FETCH_TIMEOUT_MS = 30_000;

/**
 * URL del endpoint del catálogo.
 * - Vacío    → '/api/catalog-layout' (mismo origen; en dev lo resuelve el proxy de Vite).
 * - Definido → URL absoluta indicada en VITE_CATALOG_API_URL (requiere CORS en Laravel).
 */
function resolveApiUrl(): string {
	const configured = String(import.meta.env.VITE_CATALOG_API_URL ?? '').trim();
	return configured || '/api/catalog-layout';
}

export async function getCatalogLayout(): Promise<CatalogLayoutResponse> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	let response: Response;
	try {
		response = await fetch(resolveApiUrl(), {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
			cache: 'no-store',
			signal: controller.signal,
		});
	} catch {
		if (controller.signal.aborted) {
			throw new Error(
				`La API del catálogo no respondió en ${FETCH_TIMEOUT_MS / 1000}s. ` +
					'Verifica que Herd / Laravel esté corriendo y reintenta.',
			);
		}
		throw new Error('No se pudo conectar con la API del catálogo.');
	} finally {
		clearTimeout(timeoutId);
	}

	if (!response.ok) {
		throw new Error(`La API del catálogo respondió con HTTP ${response.status}.`);
	}

	const json: unknown = await response.json();
	return assertCatalogLayout(json);
}
