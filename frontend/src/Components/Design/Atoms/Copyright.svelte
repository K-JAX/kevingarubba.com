<script>
    import { fade } from 'svelte/transition';
    let year = new Date().getFullYear();
</script>

<small transition:fade={{duration: 3000}} class="copy-text self-center uppercase bold text-gray-500">Kevin Garubba &copy;{year}</small>


<style>
    .copy-text{
        font-size: 0.55em;
        transform: rotate(-90deg);
        letter-spacing: 7px;
        white-space: nowrap;
        cursor: vertical-text; 
    }
</style>