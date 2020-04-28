<script>
	// Modules
	import { fade } from 'svelte/transition';

	// Components
	import Page from "./Components/Design/Page.svelte";
	// import SiteLoadCookie from "./Components/Functional/SiteLoadCookie.svelte"

	import {durVal} from "./Components/Functional/SiteLoadCookie.svelte"

</script>

<main transition:fade="{{duration: durVal}}">
	<Page />
</main>

<style lang="scss" global>
	@import "./Components/Design/theme.scss";
</style>