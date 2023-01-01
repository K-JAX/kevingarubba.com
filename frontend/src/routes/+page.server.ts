import { error } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	// const post = await getPostFromDatabase(params.slug);
	const res = await fetch(`${PUBLIC_API_KEY}`);

	if (res) {
		return res.json();
	}

	throw error(404, 'Not found');
};
