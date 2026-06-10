import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { SectionBlock } from './components/SectionBlock';
import { SectionFilter } from './components/SectionFilter';
import { OrderDrawer } from './components/OrderDrawer';
import { OrderProvider } from './context/OrderContext';
import { getCatalogLayout } from './lib/catalog-api';
import { sanitizeHref } from './lib/safe-url';
import {
	BRAND_NAME,
	BRAND_PITCH,
	BRAND_TAGLINE,
	getCatalogFooter,
	getCatalogLine,
	getContactLine,
	getLogoSrc,
} from './lib/env';
import type { CatalogLayoutResponse } from './lib/types';

export function App() {
	const [data, setData] = useState<CatalogLayoutResponse | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeFilter, setActiveFilter] = useState('all');
	const [reloadKey, setReloadKey] = useState(0);

	// Carga del catálogo desde la API de Laravel. Se repite al pulsar "Reintentar".
	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setErrorMessage(null);

		getCatalogLayout()
			.then((res) => {
				if (!cancelled) setData(res);
			})
			.catch((error: unknown) => {
				if (cancelled) return;
				console.error('[catalog]', error);
				setErrorMessage(
					error instanceof Error ? error.message : 'No se pudo cargar el catálogo.',
				);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [reloadKey]);

	// Preselecciona el filtro si el hash de la URL coincide con una sección.
	useEffect(() => {
		if (!data) return;
		const hash = decodeURIComponent(window.location.hash.replace(/^#/, '')).trim();
		if (hash && data.sections.some((s) => s.slug === hash)) {
			setActiveFilter(hash);
		}
	}, [data]);

	// Al filtrar por una sección concreta, hace scroll hacia ella.
	useEffect(() => {
		if (activeFilter === 'all') return;
		document
			.getElementById(activeFilter)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [activeFilter]);

	const sections = data?.sections ?? [];

	const hero = {
		preHeadline: (data?.hero?.pre_headline ?? BRAND_TAGLINE).trim() || BRAND_TAGLINE,
		headline: (data?.hero?.headline ?? '').trim(),
		subHeadline: (data?.hero?.sub_headline ?? BRAND_PITCH).trim() || BRAND_PITCH,
		ctaText: (data?.hero?.cta_text ?? 'Ver catálogo').trim() || 'Ver catálogo',
		ctaUrl:
			sanitizeHref((data?.hero?.cta_url ?? '#catalogo').trim() || '#catalogo') || '#catalogo',
	};

	const logoSrc = getLogoSrc();
	const catalogLine = getCatalogLine();
	const contactLine = getContactLine();
	const catalogFooter = getCatalogFooter();

	// N° de specimen acumulado: cards de catálogo antes de cada sección.
	let specimenAcc = 0;
	const specimenStarts = sections.map((s) => {
		const start = specimenAcc;
		specimenAcc += s.categories.reduce((n, c) => n + c.services.length, 0);
		return start;
	});

	return (
		<OrderProvider>
			<Layout contentKey={data}>
				<div className="catalog-sheet">
					<Hero
						brandName={BRAND_NAME}
						logoSrc={logoSrc}
						preHeadline={hero.preHeadline}
						headline={hero.headline || undefined}
						catalogLine={catalogLine}
						contactLine={contactLine || undefined}
						subHeadline={hero.subHeadline}
						ctaText={hero.ctaText}
						ctaUrl={hero.ctaUrl}
						secondaryCtaText="Pedido en grupo"
						secondaryCtaUrl="#pedido"
					/>

					{loading && (
						<div className="empty-state">
							<p>Cargando catálogo…</p>
						</div>
					)}

					{errorMessage && (
						<div className="empty-state">
							<p>
								<strong>No disponible:</strong> {errorMessage}
							</p>
							<button
								type="button"
								className="hero-cta"
								onClick={() => setReloadKey((k) => k + 1)}
							>
								Reintentar
							</button>
						</div>
					)}

					{!loading && !errorMessage && sections.length === 0 && (
						<div className="empty-state">
							<p>No hay secciones publicadas en este momento.</p>
						</div>
					)}

					<div id="catalogo" className="catalog-main">
						{!errorMessage && sections.length > 1 && (
							<SectionFilter
								sections={sections.map((s) => ({ name: s.name, slug: s.slug }))}
								activeFilter={activeFilter}
								onSelect={setActiveFilter}
							/>
						)}

						{sections.map((section, i) => (
							<SectionBlock
								key={section.id}
								section={section}
								sectionNumber={i + 1}
								specimenStart={specimenStarts[i]}
								hidden={activeFilter !== 'all' && activeFilter !== section.slug}
							/>
						))}
					</div>

					<footer className="catalog-flyer-footer" role="contentinfo">
						<p className="catalog-flyer-footer__text">{catalogFooter}</p>
					</footer>
				</div>
			</Layout>

			<OrderDrawer />
		</OrderProvider>
	);
}
