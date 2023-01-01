<script>
	import { fly, fade } from 'svelte/transition';
	// export let data;
	// import Slideshow from '@components/design/organisms/Slideshow.svelte';
	import TransitionContainer from '@components/functional/TransitionContainer.svelte';
</script>

<svelte:head>
	<title>Kevin Garubba Design &amp; Development</title>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-52438733-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'UA-52438733-1');
	</script>
</svelte:head>

<TransitionContainer animType="fade">
	<h1>Home placeholder text</h1>
</TransitionContainer>

<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700);
	body {
		background: #fff;
		color: rgb(132, 140, 140);
		font-family: 'Roboto', san-serif;
	}

	h1 {
		font-weight: 100;
		font-size: 27px;
		color: #90b8b2;
	}

	p {
		font-weight: 300;
	}

	.warning-content {
		position: absolute;
		width: 100%;
		height: 100%;
		text-align: center;
		margin: 0;
	}
</style>
