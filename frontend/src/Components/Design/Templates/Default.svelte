<script>
    // Modules
    import { onMount, afterUpdate } from "svelte";
    import { fly } from "svelte/transition";
    import { expoInOut } from "svelte/easing";
    import queryString from "query-string";

    // Components
    import PageTitle from "../Atoms/PageTitle.svelte";
    import Head from "../../Functional/Head.svelte";
    import NotFound from "./NotFound.svelte";
    import FormDefault from "../../Functional/FormDefault.svelte";

    let data = [];
    let pageData = [];
    let title = "";
    let content = "";
    let metaFields = [];
    let isLoaded = false;
    let storedState = "";
    let successMessage = "";
    let error = "";
    let loading = false;
    export let slug;

    const apiURL = process.env.api_url;

    const getData = async () => {
        const res = await fetch(`${apiURL}/wp/v2/pages/?slug=${slug}`);
        const json = await res.json();
        data = json;
        if (data[0] !== undefined) {
            pageData = data[0];
            title = pageData.title.rendered;
            content = pageData.content.rendered;
        }
        storedState = slug;
    };

    onMount(async () => {
        getData();
    });

    afterUpdate(async () => {
        if (slug != storedState) {
            getData();
        }
    });
</script>

<FormDefault />

{#if data != ''}
    <Head pageTagData="{pageData}" />

    </script>
    <section>
        <PageTitle className="my-5" {title} />
        <div
            class="overflow-hidden"
            in:fly="{{ y: 1176, duration: 1500, delay: 50, easing: expoInOut }}"
            out:fly="{{ y: 1176 }}"
        >
            <div
                in:fly="{{ y: -1256, duration: 1500, delay: 50, easing: expoInOut }}"
                out:fly="{{ y: -1256 }}"
            >
                {@html content}
            </div>
        </div>
    </section>
{:else}
    <NotFound />
{/if}
