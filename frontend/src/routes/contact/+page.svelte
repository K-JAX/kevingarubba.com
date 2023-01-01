<script>
	import { enhance } from '$app/forms';
	import {page} from "$app/stores";
	import TransitionContainer from "@components/functional/TransitionContainer.svelte";

	
	export let data;
	export let form;
	let validation;
	$: {
		if(form){
			validation = form.success;
		}
	}
</script>

<TransitionContainer>
	<h1>Contact</h1>

	<form action="?/sendMail" method="post" use:enhance>
		<label for="your-name">Name</label>
		<input type="text" name="your-name" id="your-name">
		<label for="email">Email</label>
		<input type="email" name="your-email" id="your-email">
		<label for="message">Message</label>
		<textarea name="message" id="your-message" cols="30" rows="10"></textarea>	
		<input type="submit" value="Send" />
	</form>

	{#if validation === true}
	<p>{form.response.message}</p>
	{:else if validation === false}
	<p>{form.response.message}</p>
	{/if}
</TransitionContainer>