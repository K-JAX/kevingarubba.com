<script>
	import { Router, Route } from 'svelte-routing';

    import Header from './Organisms/Header.svelte';
    import Footer from './Molecules/Footer.svelte';
	import Home from "./Templates/Home.svelte";
	import About from "./Templates/About.svelte";
    import Projects from "./Templates/Projects.svelte";
    import Default from "./Templates/Default.svelte";
    import NotFound from "./Templates/NotFound.svelte";

    export let url = "";

</script>

<Header />

<Router url="{url}">
        <Route path="projects/:id" component="{Projects}" />
        <Route path="projects" component="{Projects}" />
        <Route path="about"><About /></Route>
        <Route path="/" exact ><Home /></Route>
        <Route path="/:slug" key="add-client" exact let:params><Default slug="{params.slug}" /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
</Router>
<Footer />