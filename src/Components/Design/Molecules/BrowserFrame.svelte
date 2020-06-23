<script>
    export let image = {}, siteURL="";
    import {onMount} from "svelte";

    let cleanedURL = '';

    const cleanURL = () => {
        let reg = /http.?:\/\//;
        let match = reg.exec(siteURL);
        cleanedURL = siteURL.replace(reg, '<span class="text-gray-600">'+ match +'</span>');
        return cleanedURL;
    }

    onMount(async() => {
        cleanURL();
    })
    
    
</script>

<div class="w-full rounded-md -ml-10 md:ml-0 bg-gray-500 shadow-2xl">
    <header class="w-full h-16">
        <div class="flex justify-between">
            <a href={siteURL} target="_blank" ><button class="mt-2 -mb-1 uppercase text-xs font-semibold tracking-wideset underline rounded-md px-4 py-2 bg-gray-300">Click to view site <i class="fas fa-link ml-2"></i></button></a>
            <div class="w-12 h-4 mt-1 mr-2 flex justify-between">
                <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                <div class="w-3 h-3 rounded-full bg-gray-100"></div>
            </div>
        </div>
        <div class="w-full flex h-6 bg-gray-300">
            <div class="w-full h-full mx-2 my-px px-2 border-2 bg-white">
                <p style="font-size: 0.75em;">{@html cleanedURL}</p>
            </div>
        </div>
    </header>
    {#if image != {}}
    <img class="w-full" alt="{image.alt}" src="{image.source_url}" />
    {/if}
</div>