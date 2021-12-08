<script>
    // modules
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";
    import { fly, fade } from "svelte/transition";

    // components
    import PageTitle from "../Atoms/PageTitle.svelte";

    export let projectData = {};

    let title = "";
    let brandName = "";
    let featuredImage = {};
    let workflows = [];
    let tech = [];
    let year = "";
    let swatch = [];
    let projectSize = "";

    onMount(async () => {
        if (projectData[0] !== {}) {
            title = projectData.title.rendered;
            brandName = projectData.acf.brand_name
                ? projectData.acf.brand_name
                : title;
            workflows = projectData._embedded["wp:term"].filter(
                term => term[0].taxonomy == "workflow"
            )[0];
            tech = projectData._embedded["wp:term"].filter(
                term => term[0].taxonomy == "tech"
            )[0];
            year = projectData.year;
            swatch = projectData.acf.swatch;
            projectSize = projectData.acf.project_size;
        }
    });
</script>

<Link to="projects">
    <i in:fade="{{ duration: 2000, delay: 2000 }}" out:fade>Projects</i>
</Link>
<PageTitle
    title="{brandName}"
    containerClass="-ml-10 md:-ml-16 text-6xl"
    className="text-6xl lg:text-3xl flex tracking-widest overflow-hidden"
    height="192"
/>
<dl class="project-deets mt-5">
    <div
        class="flex w-1/2 justify-between"
        in:fly="{{ y: -100, delay: 1000, duration: 1000 }}"
        out:fly="{{ y: -100, duration: 1000 }}"
    >
        {#if workflows !== []}
            <div class="mr-10">
                <dt>Workflow</dt>
                {#each workflows as workflow}
                    <dd>{workflow.name}</dd>
                {/each}
            </div>
        {/if}
        {#if tech !== []}
            <div>
                <dt>Tech</dt>
                {#each tech as techItem}
                    <dd>{techItem.name}</dd>
                {/each}
            </div>
        {/if}
    </div>
    <div
        in:fly="{{ y: 50, delay: 1750, duration: 1000 }}"
        out:fly="{{ y: 50, duration: 500 }}"
    >
        {#if projectSize !== undefined}
            <dt>Project Size</dt>
            <dd>{projectSize}</dd>
        {/if}
        {#if year !== ''}
            <dt>Year</dt>
            <dd>{year}</dd>
        {/if}
    </div>
    {#if swatch !== []}
        <div
            in:fly="{{ y: -50, delay: 1750, duration: 1000 }}"
            out:fly="{{ y: -50, duration: 500 }}"
        >
            <dt>Color Swatch</dt>
            <div class="flex flex-wrap w-1/2 lg:w-full -ml-2">
                {#each swatch as color}
                    <dd
                        class="rounded-full w-12 h-12 shadow-lg mx-2 my-1"
                        style="{`background-color: ${color.color};`}"
                    ></dd>
                {/each}
            </div>
        </div>
    {/if}
</dl>

<style lang="scss">
    .project-deets {
        dt {
            margin: 1em 0 0.35em;
            font-size: 1.125em;
            font-weight: 600;
            color: #ccc;
            text-transform: uppercase;
        }
        dd {
            font-weight: 700;
            font-size: 0.9em;
        }
    }
</style>
