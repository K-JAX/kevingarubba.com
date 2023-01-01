<script>
	// // components
	import SVGText from '@components/design/atoms/SVGText.svelte';

	export let className = '';
	let links = [];
	export let data;
	links = data.items.map((item) => {
		return {
			...item,
			slug: item.title == 'Home' ? '/' : item.slug
		};
	});
	export let active = '';

	// let loadState = false;

	let addActive = () => {
		// if( ready == true ){
		active = active === 'active' ? 'closed' : 'active';
		// }
	};

	// function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
	// 	const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

	// 	// The object returned here is spread on the anchor element's attributes
	// 	if (isActive) {
	// 		return { class: 'active' };
	// 	}
	// 	return {};
	// }
</script>

<nav class={`site-nav ${className} fixed w-full h-full flex content-left justify-start`}>
	<ul class="flex flex-col text-left mt-32 ml-32 md:ml-2 justify-start">
		{#each links as link, i}
			<li
				class="nav-item after list-none text-5xl my-2"
				style={`animation-delay: ${i * 1 + 3}00ms;`}
			>
				<a href={link.slug} on:click={addActive}>
					<span class="link-text" style={`transition-delay: ${i * 2 + 4}00ms`}>
						<SVGText
							text={link.title}
							width="300px"
							startGrad="rgb(154,180,182)"
							endGrad="rgb(19,26,50)"
							hoverStartGrad="rgb(255,255,255)"
							hoverEndGrad="rgb(255,255,255)"
						/>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	.site-nav {
		margin-top: 100px; // temporary to allow room to click burger in this mess of a UI
		right: 100%;
		opacity: 0;
		transition: opacity 1.5s, right 0s 1.5s;
		@media all and (max-width: 767px) {
			transition: opacity 0.5s;
		}
		background: rgba(255, 255, 255, 0.9);
		.nav-item {
			position: relative;
			&:after {
				position: absolute;
				z-index: 5;
				left: 0;
				top: 0;
				bottom: 0;
				width: 0;
				height: 75%;
				margin-top: auto;
				margin-bottom: auto;
				background: black;
				animation-delay: inherit;
			}
			.link-text {
				opacity: 0;
				transition: 0.5s;
				@media all and (max-width: 767px) {
					transition: none;
				}
			}
		}
	}

	.site-nav.active {
		right: 0;
		transition: opacity 1.5s, right 0s 0s;
		@media all and (max-width: 767px) {
			transition: opacity 0.5s;
		}
		opacity: 1;
		z-index: 5;

		.nav-item {
			&:after {
				animation: fillOut 0.85s;
				animation-delay: inherit;
				@media all and (max-width: 767px) {
					animation: none;
				}
			}
			.link-text {
				opacity: 1;
			}
			&:hover {
				// background: black;
				&:after {
					width: 100% !important;
					transition: 0.5s !important;
					z-index: -1;
				}
			}
		}
	}

	@keyframes fillOut {
		0% {
			width: 0;
			left: 0;
		}
		50% {
			width: 100%;
			left: 0;
		}
		51% {
			width: 100%;
			left: initial;
			left: auto;
			right: 0;
		}
		100% {
			width: 0;
			left: initial;
			left: auto;
			right: 0;
		}
	}
</style>
