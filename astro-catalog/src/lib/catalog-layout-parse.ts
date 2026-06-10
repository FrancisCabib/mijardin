import type { CatalogLayoutResponse } from './types';

function isRecord(v: unknown): v is Record<string, unknown> {
	return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/**
 * Validación mínima en runtime para que un JSON malformado u hostil no rompa la app.
 */
export function assertCatalogLayout(data: unknown): CatalogLayoutResponse {
	if (!isRecord(data)) {
		throw new Error('Invalid catalog response');
	}
	if (!isRecord(data.hero)) {
		throw new Error('Invalid catalog response');
	}
	if (!Array.isArray(data.sections)) {
		throw new Error('Invalid catalog response');
	}
	const stringFields = ['pre_headline', 'headline', 'sub_headline', 'cta_text', 'cta_url'] as const;
	for (const key of stringFields) {
		const v = data.hero[key];
		if (v != null && typeof v !== 'string') {
			throw new Error('Invalid catalog response');
		}
	}
	if (data.meta != null && !isRecord(data.meta)) {
		throw new Error('Invalid catalog response');
	}
	for (const sec of data.sections) {
		if (!isRecord(sec) || typeof sec.slug !== 'string' || !Array.isArray(sec.categories)) {
			throw new Error('Invalid catalog response');
		}
		for (const cat of sec.categories) {
			if (!isRecord(cat) || !Array.isArray(cat.services)) {
				throw new Error('Invalid catalog response');
			}
			for (const svc of cat.services) {
				if (!isRecord(svc) || typeof svc.title !== 'string') {
					throw new Error('Invalid catalog response');
				}
			}
		}
	}
	return data as CatalogLayoutResponse;
}
