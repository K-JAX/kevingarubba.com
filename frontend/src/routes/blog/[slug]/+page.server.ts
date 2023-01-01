import { error } from '@sveltejs/kit';
import { PUBLIC_API_KEY } from '$env/static/public';


/** @type {import('./$types').PageLoad} */
export const load = async ({params}) => {

	const res = await fetch(`${PUBLIC_API_KEY}/wp/v2/posts/?slug=${params.slug}`);

	if(res){
		const json = await res.json();
		return {
		  post: {
			title: json[0].title.rendered,
			content: json[0].content.rendered
		  }
		};
	}
	throw error(404, 'Not Found');
  }