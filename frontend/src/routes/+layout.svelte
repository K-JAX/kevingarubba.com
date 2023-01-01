<script>
	import { page } from '$app/stores';
	import Header from '@components/design/organisms/Header.svelte';
	import Sidebar from '@components/design/organisms/Sidebar.svelte';
	export let data;
	// console.log(data.navData);
</script>

<Header navData={data.navData} />
<Sidebar />
<!-- <Transition url={$page.url}> -->
<slot />
<!-- </Transition> -->
