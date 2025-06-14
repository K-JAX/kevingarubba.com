<script>
    import { fly } from "svelte/transition";
    import { backOut } from "svelte/easing";

    import { onMount } from "svelte";

    export let title = "",
        containerClass = "",
        className = "",
        style = "",
        height = 50;

    let text, placeHolderText;

    onMount(async () => {});
</script>

{#if title !== ''}
    <div class="{`${containerClass}`}" style="{`overflow-y:hidden;`}">
        <h1
            bind:this="{text}"
            class="{`${className} text-base font-bold tracking-widest uppercase before ml-0 md:ml-6`}"
            style="{`${style}`}"
            in:fly="{{ y: height, delay: 1000, duration: 1000, easing: backOut }}"
            out:fly="{{ y: height }}"
        >
            <span>
                {@html title}
            </span>
        </h1>
    </div>
{/if}

<style lang="scss">
    h1:before {
        position: relative;
        display: inline-block;
        width: 17px;
        height: 4px;
        background-color: black;
        top: 0;
        margin-top: 0.7em;
        margin-bottom: 0.2em;
        margin-right: 20px;
    }
</style>
