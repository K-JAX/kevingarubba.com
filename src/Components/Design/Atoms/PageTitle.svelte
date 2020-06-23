<script>
	import { fade } from 'svelte/transition';

    export let title = '', className = '', style = '';
</script>
{#if title !== ''}    
    <h1 transition:fade={{delay:3000, duration: 1000}} class={`${className} text-base font-bold tracking-widest uppercase before`} style={`${style}`}><span>{@html title}</span></h1>
{/if}
<style>

h1:before{
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