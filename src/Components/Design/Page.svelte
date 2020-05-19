<script>
    // Modules
    import { Router, Route } from 'svelte-routing';
    import { fly } from 'svelte/transition';

    // Components
    import Header from './Organisms/Header.svelte';
    import Footer from './Molecules/Footer.svelte';
    import Sidebar from './Organisms/Sidebar.svelte';
	import Home from "./Templates/Home.svelte";
	import About from "./Templates/About.svelte";
    import Projects from "./Templates/Projects.svelte";
    import ProjectSingle from "./Templates/ProjectSingle.svelte";
    import Default from "./Templates/Default.svelte";
    import NotFound from "./Templates/NotFound.svelte";
    import FormDefault from "../Functional/FormDefault.svelte"
    export let url = "";

    
</script>

<Header />
<FormDefault />
<Sidebar />
<main transition:fly={{y: 50, duration: 2000}} class="site-main container mx-auto md:mt-24 mt-48 pl-20 md:pl-20 pr-16">
    <Router url="{url}">
            <Route path="projects/:slug" key="add-client" exact let:params><ProjectSingle slug="{params.slug}" /></Route>
            <Route path="projects" component="{Projects}" />
            <Route path="about"><About /></Route>
            <Route path="/" exact ><Home /></Route>
            <Route path="/:slug" key="add-client" exact let:params><Default slug="{params.slug}" /></Route>
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
    </Router>
</main>
<Footer />

<style>

    .site-main{

    }


</style>