<script>
    // modules
    import { onMount, afterUpdate } from "svelte";
    import { Router, Link, navigate } from "svelte-routing";
    import queryString from "query-string";
    import { fly, fade } from "svelte/transition";
    import { expoInOut } from "svelte/easing";

    // components
    import Head from "../../Functional/Head.svelte";
    import PageTitle from "../Atoms/PageTitle.svelte";
    import FacetPanel from "../Molecules/FacetPanel.svelte";
    // props
    export let location;

    // variables
    let posts = [];
    let workflowTaxonomies = [];
    let techTaxonomies = [];
    let yearArray = [];
    let filter = false;
    let categoryFilters = [];
    let query = "";
    let parsed = {};
    let pageData = {};
    let storedState = "";
    const apiURL = process.env.api_url;
    let queryParams = queryString.parse(location.search);
    let workflowSelection =
        queryParams.workflow === undefined || queryParams.workflow === ""
            ? ""
            : queryParams.workflow;
    let techSelection =
        queryParams.tech === undefined || queryParams.tech === ""
            ? ""
            : queryParams.tech;
    let yearSelection =
        queryParams.year === undefined || queryParams.year === ""
            ? ""
            : queryParams.year;
    const getUnifiedQueryString = () => {
        queryParams = queryString.parse(location.search);
        let workflow =
            queryParams.workflow === undefined || queryParams.workflow === ""
                ? ""
                : "workflow=" + queryParams.workflow;
        let tech =
            queryParams.tech === undefined || queryParams.tech === ""
                ? ""
                : "&tech=" + queryParams.tech;
        let year =
            queryParams.year !== undefined && queryParams.year !== ""
                ? "&after=" +
                  queryParams.year +
                  "-01-00T00:00:00&before=" +
                  (parseInt(queryParams.year) + 1) +
                  "-01-00T00:00:00"
                : "";
        let unifiedQuery = `${workflow}${tech}${year}`;
        return unifiedQuery;
    };

    const getData = async (query = "") => {
        let [
            pageResponse,
            workflowTaxResponse,
            techTaxResponse,
            projResponse
        ] = await Promise.all([
            fetch(`${apiURL}/wp/v2/pages?slug=projects`),
            fetch(`${apiURL}/wp/v2/workflow?hide_empty=true`),
            fetch(`${apiURL}/wp/v2/tech?hide_empty=true`),
            fetch(`${apiURL}/wp/v2/project?_embed&${getUnifiedQueryString()}`)
        ]);
        let page = await pageResponse.json();
        if (page[0] !== "") {
            pageData = page[0];
        }
        workflowTaxonomies = await workflowTaxResponse.json();
        techTaxonomies = await techTaxResponse.json();
        posts = await projResponse.json();
        storedState = location.search;
    };

    const getYears = async () => {
        const res = await fetch(`${apiURL}/wp/v2/project`);
        const data = await res.json();
        let dataArray = [];
        data.forEach(dataItem => {
            if (!dataArray.includes(dataItem.year)) {
                dataArray.push(dataItem.year);
            }
        });
        yearArray = dataArray;
    };

    onMount(async () => {
        getData();
        getYears();
    });
    afterUpdate(async () => {
        if (location.search != storedState) {
            getData();
            getYears();
        }
    });
    const addQuery = (group, e) => {
        let workflow = "workflow=" + workflowSelection;
        let tech = "tech=" + techSelection;
        let year = "year=" + yearSelection;
        let queryString = `${workflow}&${tech}&${year}`;
        navigate("/projects/?" + queryString, { replace: false });
    };
</script>

<Head pageTagData="{pageData}" />
<div class="flex sm:flex-wrap flex-row">
    <div class="w-64 sm:w-full mr-5 md:mr-0 mb-8">
        <PageTitle title="Projects" />
        <p
            in:fade="{{ duration: 2000, delay: 2000 }}"
            out:fade="{{ duration: 500 }}"
            class="text-gray-500 ml-0 md:ml-6"
        >
            Select below to filter.
        </p>
        {#if workflowTaxonomies != []}
            <div
                in:fly="{{ y: 176, duration: 1500, delay: 350, easing: expoInOut }}"
                out:fly="{{ y: 176 }}"
            >
                <FacetPanel
                    title="Workflow"
                    facets="{workflowTaxonomies}"
                    bind:groupSelection="{workflowSelection}"
                    {addQuery}
                    inputType="{'checkbox'}"
                />
            </div>
        {/if}
        {#if techTaxonomies != []}
            <div
                in:fly="{{ y: 176, duration: 1500, delay: 450, easing: expoInOut }}"
                out:fly="{{ y: 176 }}"
            >
                <FacetPanel
                    title="Tech Stack"
                    facets="{techTaxonomies}"
                    bind:groupSelection="{techSelection}"
                    {addQuery}
                    inputType="{'checkbox'}"
                />
            </div>
        {/if}

        {#if yearArray != []}
            <div
                in:fly="{{ y: 176, duration: 1500, delay: 550, easing: expoInOut }}"
                out:fly="{{ y: 176 }}"
            >
                <FacetPanel
                    title="Year"
                    facets="{yearArray}"
                    bind:groupSelection="{yearSelection}"
                    {addQuery}
                    inputType="radio"
                    all="{true}"
                />
            </div>
        {/if}
    </div>

    <div class="sm:w-full">
        {#if posts != '' && posts !== undefined && posts !== []}
            <ul class="w-full flex row flex-wrap md:flex md:justify-around">
                {#each posts as post, i}
                    <li
                        class="project-tile inline-block mb-8 mr-8 md:mr-0
                        overflow-hidden"
                        in:fly="{{ y: 176, duration: 1500, delay: 50, easing: expoInOut }}"
                        out:fly="{{ y: 176 }}"
                    >
                        <Link to="projects/{post.slug}">
                            <div
                                class="thumb-container relative before w-full
                                h-64 md:h-auto overflow-hidden flex
                                justify-center items-center"
                                in:fly="{{ y: -256, duration: 1500, delay: 50, easing: expoInOut }}"
                                out:fly="{{ y: -256 }}"
                            >
                                {#if post._embedded['wp:featuredmedia']}
                                    <img
                                        class="w-full"
                                        alt="project"
                                        src="{post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url}"
                                    />
                                {:else}
                                    <div
                                        class="w-full h-full bg-grayWhite"
                                    ></div>
                                {/if}
                                <p
                                    class="absolute text-lg text-white my-3 mx-3"
                                    style="left: 0;"
                                >
                                    {post.title.rendered}
                                </p>
                            </div>
                        </Link>
                    </li>
                {/each}
            </ul>
        {:else}
            <p></p>
        {/if}
    </div>

</div>

<style lang="scss">
    .project-tile {
        width: 22em;
        @media all and (max-width: 767px) {
            width: 12em;
        }
        .thumb-container {
            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0);
                transition: 0.25s;
            }
            p {
                opacity: 0;
                bottom: 0;
                transition: bottom 0.5s, opacity 0.7s;
            }
        }
        &:hover {
            .thumb-container {
                &:before {
                    background: rgba(0, 0, 0, 0.35);
                }
                p {
                    opacity: 1;
                    bottom: 0.25em;
                }
            }
        }
    }
</style>
