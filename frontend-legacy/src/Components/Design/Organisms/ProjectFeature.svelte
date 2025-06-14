<script>
    // modules
    import { onMount } from "svelte";

    // components
    import DescriptionPanel from "../Molecules/DescriptionPanel.svelte";

    export let data;

    let image, title, year, tags, swatches, link;

    const defineProps = () => {
        title = data.title.rendered;
        year = data.date.slice(0, 4);

        image =
            data._embedded["wp:featuredmedia"][0].media_details.sizes.large
                .source_url;
        link = data.slug;
        tags = data._embedded["wp:term"][0];
        swatches = data.acf.swatch;
    };

    onMount(async () => {
        defineProps();
    });
</script>

<div
    class="project-feature flex flex-row flex-grow-0 flex-shrink-0 justify-start
    content-end w-full h-full shadow-lg"
    style="{`background-image: url(${image});`}"
>
    <DescriptionPanel {title} {year} {tags} {swatches} {link} />
</div>

<style lang="scss">
    .project-feature {
        flex: 1;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        @media all and (max-width: 767px) {
            background-position: top center;
        }
    }
</style>
