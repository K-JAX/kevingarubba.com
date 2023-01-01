<script>
	export let title, description;

	// Components
	import Logo from '@components/design/atoms/Logo.svelte';
	import SiteTitle from '@components/design/atoms/SiteTitle.svelte';
</script>

<div class="site-title-header">
	<a href="/" class="no-underline">
		<div class="logo-container flex flex-row md:content-start">
			<Logo />
			<SiteTitle {title} {description} />
		</div>
	</a>
</div>

<style lang="scss">
	.site-title-header {
		width: 300px;
	}
	.logo-container {
		height: 140px;
		/* overflow: hidden; */
		@media all and (max-width: 767px) {
			height: 100%;
		}
	}
</style>
