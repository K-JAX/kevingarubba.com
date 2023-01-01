<script>
    export let image = {},
        name = "",
        siteURL = "";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { expoOut, elasticOut, sineIn } from "svelte/easing";

    let cleanedURL = "";

    const cleanURL = () => {
        let reg = /http.?:\/\//;
        let match = reg.exec(siteURL);
        cleanedURL = siteURL.replace(
            reg,
            '<span class="text-gray-600">' + match + "</span>"
        );
        return cleanedURL;
    };

    onMount(async () => {
        cleanURL();
    });

    function rotateHang(node, { duration, delay }) {
        return {
            duration,
            delay,
            css: t => {
                const eased = elasticOut(t);
                const zipped = expoOut(t);
                const slow = sineIn(t);

                return `
                    opacity: ${slow * 2};
                    transform: perspective(800px) translateX(${-100 +
                        zipped * 100}px) rotateY(${-30 + eased * 20}deg);`;
            }
        };
    }
</script>

<div
    in:fly="{{ x: 50, delay: 2000 }}"
    out:fly="{{ x: 200 }}"
    class="-ml-24 md:ml-0 lg:px-12 px-16 lg:py-12 py-20"
    style="overflow: hidden;"
>
    <div
        class="browser-frame w-full rounded-md bg-gray-500 shadow-2xl"
        in:rotateHang="{{ duration: 2000, delay: 1500 }}"
        out:fly="{{ x: -400 }}"
    >
        <header class="w-full h-16">
            <div class="flex justify-between">
                {#if siteURL !== ''}
                    <a href="{siteURL}" target="_blank">
                        <button
                            class="mt-2 -mb-1 uppercase text-xs font-semibold
                            tracking-wideset underline rounded-md px-4 py-2
                            bg-gray-300"
                        >
                            Click to view site
                            <i class="fas fa-link ml-2"></i>
                        </button>
                    </a>
                {:else}
                    <button
                        class="mt-2 -mb-1 uppercase text-xs font-semibold
                        tracking-wideset rounded-md px-4 py-2 bg-gray-300
                        cursor-default"
                    >
                        {name}
                    </button>
                {/if}
                <div class="w-12 h-4 mt-1 mr-2 flex justify-between">
                    <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                    <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                    <div class="w-3 h-3 rounded-full bg-gray-100"></div>
                </div>
            </div>
            <div class="w-full flex h-6 bg-gray-300">
                <div class="w-full h-full mx-2 my-px px-2 border-2 bg-white">
                    <p style="font-size: 0.75em;">
                        {@html cleanedURL}
                    </p>
                </div>
            </div>
        </header>
        {#if image != {}}
            <img class="w-full" alt="{image.alt}" src="{image.source_url}" />
        {/if}
    </div>
</div>

<style lang="scss">
    .browser-frame {
        transform: perspective(800px) rotateY(-10deg);
        transition: 0.25s;
        &:hover {
            transform: perspective(800px) rotateY(0deg);
        }
    }
</style>
