<script>
	// Modules
	import { fade } from 'svelte/transition';

	// Components
	import Page from "./Components/Design/Page.svelte";

	import {durVal} from "./Components/Functional/SiteLoadCookie.svelte"

</script>


<div class="svelte-root flex flex-row" transition:fade="{{duration: durVal}}">
	<Page />
</div>

<style lang="scss" global>
	@import "./Components/Design/theme.scss";

	.svelte-root{
		min-height: 100vh;

	}
	
</style>