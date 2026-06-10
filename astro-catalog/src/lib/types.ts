export type CatalogTag = {
	id: number;
	name: string;
	slug: string;
};

export type CatalogService = {
	id: number;
	title: string;
	subtitle: string | null;
	short_description: string;
	long_description: string | null;
	price: number | null;
	price_formatted: string | null;
	image_url: string | null;
	tags: CatalogTag[];
};

export type CatalogCategory = {
	id: number;
	name: string;
	slug: string;
	services: CatalogService[];
};

export type CatalogSection = {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	is_active: boolean;
	starts_at: string | null;
	ends_at: string | null;
	categories: CatalogCategory[];
};

export type CatalogLayoutResponse = {
	meta: {
		generated_at: string;
		timezone: string;
	};
	hero: {
		pre_headline: string;
		headline: string;
		sub_headline: string;
		cta_text: string;
		cta_url: string;
	};
	sections: CatalogSection[];
};
