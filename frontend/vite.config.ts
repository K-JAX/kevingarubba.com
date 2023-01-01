import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve('./src/components'),
			'@stories': path.resolve('./src/stories')
		}
	},
	plugins: [sveltekit()]
};

export default config;
