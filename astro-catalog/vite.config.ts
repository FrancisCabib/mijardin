import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	// Origen del Laravel para el proxy de /api en desarrollo (solo se usa aquí).
	const proxyTarget = env.CATALOG_API_ORIGIN?.trim() || 'http://floreria-mi-jardin.test';

	return {
		plugins: [react()],
		server: {
			// Puerto histórico de la app (coincide con CORS_ALLOWED_ORIGINS de Laravel).
			port: 4321,
			proxy: {
				// El cliente llama a /api/catalog-layout (mismo origen) y Vite lo reenvía
				// a Laravel: así no hace falta CORS en desarrollo.
				'/api': {
					target: proxyTarget,
					changeOrigin: true,
					// Hace visibles en la terminal los fallos del proxy
					// (Herd apagado, DNS, etc.) en vez de un cuelgue silencioso.
					configure: (proxy) => {
						proxy.on('error', (err) => {
							console.error(`[proxy] /api → ${proxyTarget} falló: ${err.message}`);
						});
					},
				},
			},
		},
	};
});
