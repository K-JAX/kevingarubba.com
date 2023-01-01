import { error } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const res = await fetch(`${PUBLIC_API_KEY}/wp/v2/posts`);
	if (res) {
		return {
			posts: await res.json()
		};
	}

	throw error(404, 'Not found');
}
