import { error } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */

export const load = async () => {
	const res = await fetch(`${PUBLIC_API_KEY}/wp/v2/pages/?slug=about`);

	if (res) {
		let data = await res.json();
		return {
			pageData: await (Array.isArray(data) ? data[0] : data)
		};
	}
	throw error(404, 'Not found');
};
