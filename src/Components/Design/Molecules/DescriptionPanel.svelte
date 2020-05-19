<script>
    // modules
    import { Link } from 'svelte-routing';
    import { ArrowRightIcon } from 'svelte-feather-icons';
    
    // components
    import SVGText from '../Atoms/SVGText.svelte';
    import Button from '../Atoms/Button.svelte';

    export let title, year, tags, swatches, link;
    let arrow = '<i class="ml-5 fas fa-chevron-circle-right">';


</script>

<div class="description-panel w-64 mt-auto md:mr-0 md:mx-0 mx-32 -mb-5 px-8 py-3 bg-white rounded-lg shadow-2xl">
    <h4 class="text-sm tracking-wider bold uppercase"><SVGText text="Featured" startGrad={'#3196BE'} endGrad={'#2FA6AE'} /></h4>
    <h2>{title}</h2>
    <h3 class="text-gray-600 font-bold">{year}</h3>
    {#if tags}
    <ul class="inline-block">
        {#each tags as tag }
            <Link to={`projects/${tag.slug}`} ><li class="inline-block mr-1"><Button priority="tag" >#{tag.name}</Button></li></Link>
        {/each}
    </ul>
    {/if}
    {#if swatches}
    <p class="mt-4 mb-2">Swatch</p>
    <ul>
        {#each swatches as swatch }
            <li class="inline-block mr-2"><div class="rounded-full w-12 h-12" style={`background: ${swatch.color};`}></div></li>
        {/each}
    </ul>
    {/if}
    <!-- <Link to={`projects/${link}`} ><button class="bg-topaz text-white rounded-full my-3 p-3">See Project {@html arrow }</button></Link> -->
    <Link to={`projects/${link}`} ><Button priority="primary" className="my-5" >See Project {@html arrow }</Button></Link>
</div>

<style>
.description-panel{
    box-sizing: content-box;
}

</style>