<script>
    // modules
    import { onMount, afterUpdate } from "svelte";
    import { fade, fly } from "svelte/transition";
   	import { expoInOut } from 'svelte/easing';

    // components
    import Head from "../../Functional/Head.svelte";
    import PageTitle from "../Atoms/PageTitle.svelte";
    import Ribbon from '../Atoms/Ribbon.svelte';
    import Button from '../Atoms/Button.svelte';
    import ScrollTo from '../Molecules/ScrollTo.svelte';

    const apiURL = process.env.SAPPER_APP_API_URL;
    let data = [];
    let pageData = [];
    let title = "";
    let content = "";
    let metaFields = [];
    let storedState = "";
    let slug = "about";
    let y;

    const getData = async () => {
        const res = await fetch(`${apiURL}/wp/v2/pages/?slug=about`);
        const json = await res.json();
        data = json;
        if (data[0] !== undefined) {
            pageData = data[0];
        }
        storedState = slug;
    };

    onMount(async () => {
        getData();
    });

    let visible = false;

	function typewriter(node, { speed = 30, delay = 500 }) {
        const valid = (
            node.childNodes.length === 1 &&
                node.childNodes[0].nodeType === Node.TEXT_NODE
            );
    
        if (!valid) {
            throw new Error(`This transition only works on elements with a single text node child`);
        }
    
        const text = node.textContent;
        const duration = text.length * speed;

        return {
            duration,
            tick: t => {
                node.textContent = '';
                setTimeout(function(){
                    const i = ~~(text.length * t);
                    node.textContent = text.slice(0, i);
                }, delay + duration);
            }
        };

	}

</script>

<svelte:window bind:scrollY={y} />

{#if data != ''}
<Head pageTagData="{pageData}" />

<section>
    <PageTitle title="About" style="position: relative; z-index:4;" height="25"/>
    <div class="flex sm:flex-col-reverse flex-row">
        <div class="sm:w-full w-3/5 mt-32 md:mt-4 mx-2" style="z-index: 4; transform: translate(0,{Math.min(100, y / 5)}px);">
            <h2 class="text-6xl font-bold" in:typewriter={{speed: 100, delay: 1000}} out:fly>{pageData.acf.hero_title}</h2>
            <div class="w-3/4">
                <code class="typed" in:typewriter={{speed: 20, delay: -700}} out:fly>{pageData.acf.hero_text}</code>
            </div>
            <ScrollTo delay={5700} />
        </div>
        <div in:fly={{x: 281, duration: 1500, delay: 1000}} out:fly={{x: 281, duration: 1500}} class="sm:w-3/4 w-2/5 md:mt-4 mt-8" style="overflow: hidden; transform: translate(0,{Math.min(24, y / 35)}px);">
            {#if pageData.acf.hero_image !== undefined}
            <!-- <img data-aos="fade-left" data-aos-duration="1500" width=562 src={pageData.acf.hero_image.sizes.medium_large} alt={pageData.acf.hero_image.alt} /> -->
            <img in:fly={{x: -562, duration: 1500, delay: 1000}} out:fly={{x: -562, duration: 1500}} width=562 src={pageData.acf.hero_image.sizes.medium_large} alt={pageData.acf.hero_image.alt} />
            {/if}
        </div>
    </div>
    <Ribbon className="overlay absolute w-1/2 h-1/2 md:w-1/2" style="top: 0; right: 0;" strokeWidth="300" points="-200,-600 1900,1100" />
    <Ribbon className="background" style="width: 100%; left: 0; right: 0;" strokeWidth="150" points="1200,150 -200,1000" shadow={false} />
    
</section>

<section class="my-40 text-center">
    <h2 data-aos="fade-up" data-aos-duration="1500" class="text-4xl mb-8">{pageData.acf.specialty_section_title}</h2>

    <ul class="flex flex-row flex-wrap justify-around">
    {#each pageData.acf.my_specialties as specialty, i}
        <li data-aos="fade-up" data-aos-duration="1500" data-aos-delay="{i}00" class="w-1/4 md:w-1/2">
            <figure class="flex flex-col justify-center content-center">
                {#if specialty.icon != undefined}
                    <img class="mx-auto my-5 lg:w-3/4" width={specialty.icon.sizes['thumbnail-width']} src={specialty.icon.sizes.thumbnail} alt={specialty.icon.alt} />
                {/if}
                <figcaption class="text-center uppercase font-light text-lg" > {specialty.icon_text}</figcaption>
            </figure>
        </li>
    {/each}
    </ul>
</section>

<section class="my-32 text-center w-full">
    <h2 data-aos="fade-up" data-aos-duration="1500" class="text-3xl mb-8">{pageData.acf.tech_list_title}</h2>
    <ul class="flex flex-row w-full flex-wrap">
    {#each pageData.acf.tech_list as tech_item, i}
        <li data-aos="fade-up" data-aos-duration="1500" data-aos-delay="{i}00" class="w-1/2 md:w-full p-2 ">
            <figure class="flex flex-row bg-gray-100 rounded-l-full shadow-xl" style="border-top-right-radius: 3999px; border-bottom-right-radius: 3999px;">
            {#if tech_item.tech_icon != undefined}
                <img class="w-16 p-1 ml-1 mr-3" src={tech_item.tech_icon.sizes.thumbnail} alt={tech_item.tech_icon.alt} />
            {/if}
            <figcaption class="flex items-center font-bold text-xl text-left">{tech_item.tech_label}</figcaption>
            </figure>
        </li>
    {/each}
    </ul>
</section>
<section class="my-32 flex flex-row flex-wrap">
    {#if pageData.acf.final_message_image != undefined}
    <div data-aos="fade-right" data-aos-duration="1500" class="w-3/5 lg:w-full">
        <img src={pageData.acf.final_message_image.sizes.medium_large} alt={pageData.acf.final_message_image.alt} />
    </div>
    {/if}
    <div data-aos="fade-left" data-aos-duration="1500" class="w-2/5 lg:w-full lg:mt-5 px-16">
        <h2 class="text-6xl font-bold leading-none mb-12">{@html pageData.acf.final_message_title}</h2>
        <code>{@html pageData.acf.final_message_description}</code>
    </div>
</section>

{#if pageData.acf.call_to_action_section != undefined}
<section class="my-48 lg:my-24 text-center">
    <h2 data-aos="fade-up" data-aos-duration="1500" class="text-5xl">{pageData.acf.call_to_action_section.section_title}</h2>
    <div data-aos="fade-up" data-aos-duration="1500" class="my-16">{pageData.acf.call_to_action_section.section_description}</div>
    <div data-aos="fade-up" data-aos-duration="1500" class="flex align-center justify-center">
    {#each pageData.acf.call_to_action_section.call_to_action_buttons as cta_button}
        <Button priority={cta_button.is_primary ? 'primary' : 'tertiary'} className="mx-5" >{cta_button.cta_link.title} <span>{@html cta_button.is_primary ? '<i class="ml-5 fas fa-chevron-circle-right">' : '' }</span>
        </Button>
    {/each}
    </div>
</section>
{/if}
{:else}
<h1>Loading</h1>
{/if}

<style>

.typed:after {
    content: "|";
    position: relative;
    animation: blink 500ms linear infinite alternate;
}

@keyframes blink {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>
