/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CATALOG_API_URL?: string;
	readonly VITE_WHATSAPP_NUMBER?: string;
	readonly VITE_CATALOG_LOGO?: string;
	readonly VITE_CATALOG_LINE?: string;
	readonly VITE_CATALOG_CONTACT?: string;
	readonly VITE_CATALOG_FOOTER?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
