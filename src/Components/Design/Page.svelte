<script>
	import { Router, Route } from 'svelte-routing';

    import Header from './Organisms/Header.svelte';
    import Footer from './Molecules/Footer.svelte';
	import Home from "./Templates/Home.svelte";
	import About from "./Templates/About.svelte";
    import Blog from "./Templates/Blog.svelte";

    export let url = "";

</script>

<Header />
<Router url="{url}">
    <div>
        <Route path="blog/:id" component="{Blog}" />
        <Route path="blog" component="{Blog}" />
        <Route path="about" component="{About}" />
        <Route path="/"><Home /></Route>
    </div>
</Router>
<Footer />