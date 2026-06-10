import { useEffect } from 'react';

/**
 * Scroll reveal coreografiado: observa los elementos con clase `.reveal` y les
 * añade `.is-visible` al entrar en viewport (animación definida en global.css).
 * Vuelve a escanear el DOM cuando cambia `dep` (p. ej. al cargar el catálogo).
 */
export function useScrollReveal(dep: unknown): void {
	useEffect(() => {
		if (typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
		);

		document
			.querySelectorAll('.reveal:not(.is-visible)')
			.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [dep]);
}
