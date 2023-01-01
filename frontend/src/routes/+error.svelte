<script>
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
</script>
<h1>Hello, is it me you're looking for</h1>
<!-- <p><strong>404</strong> Page not found.</p> -->
<p>{$page.error.message}</p>