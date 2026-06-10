import type { ReactNode } from 'react';
import { Atmosphere } from './Atmosphere';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useStickyMarker } from '../hooks/useStickyMarker';

type LayoutProps = {
	children: ReactNode;
	/** Cambia cuando cambia el contenido del catálogo; re-dispara los observers. */
	contentKey: unknown;
};

/**
 * Marco de la página: capas atmosféricas, marcador de sección sticky,
 * contenido y grano de papel. Equivale a Layout.astro.
 */
export function Layout({ children, contentKey }: LayoutProps) {
	useScrollReveal(contentKey);
	const sticky = useStickyMarker(contentKey);

	return (
		<>
			<Atmosphere />

			<div
				className={`sticky-section-marker${sticky.visible ? ' is-visible' : ''}`}
				aria-hidden="true"
			>
				<span className="sticky-section-marker__pref">N°</span>
				<span>{sticky.num}</span>
			</div>

			<main className="site-content">{children}</main>

			<div className="grain-overlay" aria-hidden="true" />
		</>
	);
}
