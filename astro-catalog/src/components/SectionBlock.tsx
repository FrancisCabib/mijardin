import type { CatalogSection } from '../lib/types';
import { ServiceCard } from './ServiceCard';

type SectionBlockProps = {
	section: CatalogSection;
	/** Número de sección (1-based) para el N° del herbario. */
	sectionNumber: number;
	/** Cantidad de cards de catálogo antes de esta sección (para el N° de specimen). */
	specimenStart: number;
	/** Oculta la sección cuando el filtro activo no la incluye. */
	hidden: boolean;
};

export function SectionBlock({ section, sectionNumber, specimenStart, hidden }: SectionBlockProps) {
	const sectionNum = String(sectionNumber).padStart(2, '0');

	// Asigna a cada servicio su índice global (para N° de specimen y delay de reveal).
	let counter = specimenStart;
	const categories = section.categories.map((category) => ({
		category,
		services: category.services.map((service) => {
			const globalIndex = counter;
			counter += 1;
			return { service, globalIndex };
		}),
	}));

	return (
		<section
			className="catalog-section reveal"
			id={section.slug}
			data-section-slug={section.slug}
			data-section-num={sectionNum}
			hidden={hidden}
		>
			<header className="section-header section-header--flyer reveal">
				<span className="section-header__rule" aria-hidden="true" />
				<div className="section-header__inner">
					<h2 data-section-num={sectionNum}>{section.name}</h2>
					{section.description && <p>{section.description}</p>}
				</div>
				<span className="section-header__rule" aria-hidden="true" />
			</header>

			{categories.length > 0 ? (
				<div className="category-group-list">
					{categories.map(({ category, services }) => (
						<div className="category-group" key={category.id}>
							<h3>{category.name}</h3>
							<div className="card-grid">
								{services.map(({ service, globalIndex }) => (
									<ServiceCard
										key={service.id}
										service={service}
										categoryName={category.name}
										specimenNumber={String(globalIndex + 1).padStart(3, '0')}
										revealIndex={globalIndex}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="empty-state">
					<p>Esta sección no tiene categorías asignadas.</p>
				</div>
			)}
		</section>
	);
}
