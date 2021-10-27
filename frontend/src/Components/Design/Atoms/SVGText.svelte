<script>
    // modules
    import { onMount, tick } from 'svelte';

    export let text;
    export let width = "100%";
    export let gRotate = "90";
    export let startGrad = 'rgb(190,190,190)';
    export let endGrad = 'rgb(20,20,20)';
    export let hoverStartGrad = '';
    export let hoverEndGrad = '';
    let mySVGText;
    let box;
    let height;
    let random = Math.round(Math.random()*10000);

    onMount(async() => {
        box = mySVGText.getBBox();
        height = box.height + 0

        // this.hoverStartGrad = hoverStartGrad;
        // this.hoverEndGrad = hoverEndGrad;
    })


    

</script>



<svg class="svg-text-component inline-block" viewBBox="0 0 240 80" width={width} height={height}>
    <defs>
        <linearGradient id={`textGradient-${random}`} x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform={`rotate(${gRotate})`}>
            <stop
                offset="0%"
                style={`stop-color:${startGrad};stop-opacity:1`}
            ></stop>
            <stop
                offset="100%"
                style={`stop-color:${endGrad};stop-opacity:1`}
            ></stop>
        </linearGradient>
        {#if hoverStartGrad && hoverEndGrad }
        <linearGradient id={`textGradient-hover`} x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform={`rotate(${gRotate})`}>
            <stop
                offset="0%"
                style={`stop-color:${hoverStartGrad};stop-opacity:1`}
            ></stop>
            <stop
                offset="100%"
                style={`stop-color:${hoverEndGrad};stop-opacity:1`}
            ></stop>
        </linearGradient>
        {/if}

    </defs>
    <text bind:this={mySVGText} fill={`url(#textGradient-${random})`} x='0' y='75%'>{text}</text>
    {#if hoverStartGrad && hoverEndGrad }
    <text class="hover-text" bind:this={mySVGText} fill={`url(#textGradient-hover)`} x='0' y='75%'>{text}</text>
    {/if}

</svg>
<style lang="scss">
.hover-text{
    opacity: 0;
    transition: 0.5s;
}

.svg-text-component{
    &:hover{
        .hover-text{
            opacity: 1;
        }
    }
}

</style>