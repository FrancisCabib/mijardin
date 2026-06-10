import { useEffect, useState } from 'react';

type StickyState = {
	/** Número de la sección visible (ej. "03"). */
	num: string;
	/** Si el marcador debe mostrarse. */
	visible: boolean;
};

/**
 * Sigue qué `.catalog-section` está en viewport y devuelve su número para el
 * marcador sticky de la esquina superior derecha. Re-escanea cuando cambia `dep`.
 */
export function useStickyMarker(dep: unknown): StickyState {
	const [state, setState] = useState<StickyState>({ num: '00', visible: false });

	useEffect(() => {
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('.catalog-section[data-section-num]'),
		);
		if (sections.length === 0) {
			setState({ num: '00', visible: false });
			return;
		}

		const recompute = () => {
			let current: HTMLElement | null = null;
			let bestTop = -Infinity;
			for (const s of sections) {
				const r = s.getBoundingClientRect();
				if (r.top <= window.innerHeight * 0.35 && r.top > bestTop) {
					bestTop = r.top;
					current = s;
				}
			}
			if (current) {
				setState({ num: current.dataset.sectionNum ?? '00', visible: true });
			} else {
				setState((prev) => ({ ...prev, visible: false }));
			}
		};

		const observer = new IntersectionObserver(recompute, {
			threshold: [0, 0.1, 0.5, 1],
			rootMargin: '-20% 0px -50% 0px',
		});
		sections.forEach((s) => observer.observe(s));

		return () => observer.disconnect();
	}, [dep]);

	return state;
}
