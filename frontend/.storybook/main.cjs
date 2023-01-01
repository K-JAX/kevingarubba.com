const path = require('path');
module.exports = {
	preprocess: import('../svelte.config.js').preprocess,
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/svelte-vite',
		options: {}
	}
};
