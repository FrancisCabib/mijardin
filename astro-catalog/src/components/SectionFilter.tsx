type SectionChip = {
	name: string;
	slug: string;
};

type SectionFilterProps = {
	sections: SectionChip[];
	/** Filtro activo: 'all' o el slug de una sección. */
	activeFilter: string;
	onSelect: (value: string) => void;
};

export function SectionFilter({ sections, activeFilter, onSelect }: SectionFilterProps) {
	return (
		<nav className="section-filter" aria-label="Filtrar catálogo por sección">
			<p className="section-filter__label" id="section-filter-label">
				Sección del catálogo
			</p>
			<div
				className="section-filter__chips"
				role="group"
				aria-labelledby="section-filter-label"
			>
				<button
					type="button"
					className={`section-filter__chip${activeFilter === 'all' ? ' is-active' : ''}`}
					aria-pressed={activeFilter === 'all'}
					onClick={() => onSelect('all')}
				>
					Todas
				</button>
				{sections.map((s) => (
					<button
						key={s.slug}
						type="button"
						className={`section-filter__chip${activeFilter === s.slug ? ' is-active' : ''}`}
						aria-pressed={activeFilter === s.slug}
						onClick={() => onSelect(s.slug)}
					>
						{s.name}
					</button>
				))}
			</div>
		</nav>
	);
}
