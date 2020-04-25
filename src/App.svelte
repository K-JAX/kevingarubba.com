<script>
	import Page from "./Components/Design/Page.svelte";
	const mssg = process.env.isProd ? 'This is production mode' : FOO;
	
</script>

<svelte:head>
	<title>A whole new title</title>
</svelte:head>

<main>
	<Page />
</main>

<style lang="scss" global>
	@import "./Components/Design/theme.scss";
</style>