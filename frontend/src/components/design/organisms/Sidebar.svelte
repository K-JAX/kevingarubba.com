<script>
	// Modules

	// Compnents
	import SocialNav from '@components/design/molecules/SocialNav.svelte';
</script>

<aside
	class="sidebar flex flex-col content-center justify-center w-32 md:w-full
    h-full md:h-24"
>
	<div class="sidebar-line absolute mx-auto" />
	<!-- <SocialNav /> -->
</aside>

<style lang="scss">
	.sidebar {
		position: fixed;
		z-index: 5;
		// width: 148px;
		left: 0;
		@media all and (max-width: 767px) {
			position: absolute;
			bottom: 60px;
			left: initial;
		}
		.sidebar-line {
			top: 117px;
			left: 0;
			right: 0;
			width: 6px;
			box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.25);
			animation: goDown 2s 1.38s forwards;
			@media all and (max-width: 767px) {
				display: none;
			}
		}
	}

	@keyframes goDown {
		0% {
			height: 0;
		}
		100% {
			height: 100%;
		}
	}
</style>
