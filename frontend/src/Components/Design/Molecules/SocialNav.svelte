<script>
    import { onMount } from "svelte";
    let links = [];
    let loadState = false;

    const apiURL = process.env.api_url;

    onMount(async () => {
        const res = await fetch(`${apiURL}/menus/v1/locations/social`);
        const json = await res.json();
        links = json.items;
        setTimeout(function() {
            loadState = true;
        }, 1000);
    });
</script>

<nav
    class="{`${loadState ? 'loaded' : ''} social-nav relative w-8 self-center mr-2`}"
>
    <ul>
        {#each links as link, i}
            <li
                class="my-6 py-2 text-center"
                style="{`transition: transform 0.25s ${Math.floor(i * 1.5 + 4.49)}00ms`}"
            >
                <a
                    href="{link.url}"
                    class="text-gray-400 hover:text-blue duration-500"
                    target="_blank"
                >
                    <span>{link.icon}</span>
                    <i class="{`text-3xl fab ${link.icon}`}"></i>

                </a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .social-nav {
        li {
            width: 100%;
            background: white;
            box-shadow: 0 0 3px 2px white;
            opacity: 0;
            transform: scale(0);
            transition: 0.25s;
        }
        &.loaded {
            li {
                opacity: 1;
                transform: scale(1);
            }
        }
    }
</style>
