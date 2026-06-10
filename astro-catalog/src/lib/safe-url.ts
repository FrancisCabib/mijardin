const HREF_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * Sanitizes URLs used in anchor href (API/hero CTA). Blocks javascript:, data:, etc.
 */
export function sanitizeHref(raw: string | null | undefined): string {
	if (raw == null) return '#';
	const s = String(raw).trim();
	if (!s) return '#';
	if (s.startsWith('#')) return s;
	// Same-document or site-relative paths (reject protocol-relative //evil.com)
	if (s.startsWith('/') && !s.startsWith('//')) return s;
	if (s.startsWith('./') || s.startsWith('../')) return s;
	if (s.startsWith('//')) {
		try {
			const u = new URL(s, 'https://example.org');
			if (HREF_PROTOCOLS.has(u.protocol)) return u.href;
		} catch {
			/* ignore */
		}
		return '#';
	}
	try {
		const u = new URL(s);
		if (HREF_PROTOCOLS.has(u.protocol.toLowerCase())) return u.href;
	} catch {
		/* ignore */
	}
	return '#';
}

/**
 * Sanitizes image src from API or env. Allows http(s) and same-origin paths.
 */
export function sanitizeImageSrc(raw: string | null | undefined): string | null {
	if (raw == null) return null;
	const s = String(raw).trim();
	if (!s) return null;
	if (s.startsWith('/') && !s.startsWith('//')) return s;
	if (s.startsWith('//')) {
		try {
			const u = new URL(s, 'https://example.org');
			const p = u.protocol.toLowerCase();
			if (p === 'http:' || p === 'https:') return u.href;
		} catch {
			/* ignore */
		}
		return null;
	}
	try {
		const u = new URL(s);
		const p = u.protocol.toLowerCase();
		if (p === 'http:' || p === 'https:') return u.href;
	} catch {
		/* ignore */
	}
	return null;
}
