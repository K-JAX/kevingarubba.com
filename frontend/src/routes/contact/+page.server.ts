import { PUBLIC_API_KEY } from '$env/static/public';
/** @type {import('./$types').PageServerLoad} */
/** @type {import('./$types').Actions} */

export async function load(event){
	return {
		form: JSON.stringify(event)
	}
}

export const actions = {
	sendMail: async (e) => {

		const data = await e.request.formData();

		const res = await fetch(
			`${PUBLIC_API_KEY}/contact-form-7/v1/contact-forms/110/feedback`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: await new URLSearchParams(data).toString()
			}
		)
		const json = await res.json();

		if(!json){
			return {success: false, response: "Internal Error"}
		}

		if(json.status !== "mail_sent"){
			return {success: false, response: json}
		}

		return { success: true, response: json}
	
	}
};