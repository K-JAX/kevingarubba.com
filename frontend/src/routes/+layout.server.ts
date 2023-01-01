import { error } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	console.log(PUBLIC_API_KEY);
	const res = await fetch(`${PUBLIC_API_KEY}/menus/v1/locations/menu-1`);

	if (res) {
		return { navData: await res.json() };
	}

	throw error(404, 'Not found');
};
