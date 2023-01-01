<script>
    // Modules
    import { fade, fly } from 'svelte/transition';

    // Components
    import SVGText from './SVGText.svelte';

    // Props
    export let title, description;
    
</script>

<div class="inline-block self-center -mt-10 md:mt-0 md:self-start">
    <h1 in:fly="{{ x: -80, duration: 2000, delay: 1000 }}"  class="site-title bg-whiteFade text-3xl md:text-xl font-hairline uppercase"><SVGText text={title} width="300px" startGrad='rgb(130,134,184)' endGrad='rgb(0,0,4)' /></h1>
    <h2 in:fly="{{ x: -80, duration: 2000, delay: 1400 }}" class="site-description"><SVGText text={description} width="300px" startGrad='rgb(124,74,94)' endGrad='rgb(55,170,195)' /></h2>
</div>

<style>
    .site-title{
        /* background-color: rgba(255,255,255,0.85); */
        margin-bottom: -8px;
        letter-spacing: 3px;
    }
    .site-description{
        /* background-color: rgba(255,255,255,0.175); */
    }
</style>
