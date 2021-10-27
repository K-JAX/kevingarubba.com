<script>
    // modules
    import { onMount } from "svelte";
    import { Router, Link } from "svelte-routing";

    // components
    import SVGText from '../Atoms/SVGText.svelte';

    export let className;
    export let active = '';

    let links = [];
    let loadState = false;

    let addActive = () => {
        // if( ready == true ){
            active = active === 'active' ? 'closed' : 'active';
        // }
    }

    const apiURL = process.env.SAPPER_APP_API_URL;

    onMount(async() => {
        const res = await fetch(`${apiURL}/menus/v1/locations/menu-1`)
        const json = await res.json()
        links = json.items
        loadState = true;
    })

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
        const isActive =
            href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        // The object returned here is spread on the anchor element's attributes
        if (isActive) {
            return { class: "active" };
        }
        return {};
    }
</script>

<Router>
    <nav class={`site-nav ${className} fixed w-full h-full flex content-left justify-start`}>
        <ul class="flex flex-col text-left mt-32 ml-32 justify-start">
        {#each links as link, i}
            <li class="nav-item after list-none text-5xl my-2" style={`animation-delay: ${ (i * 1) + 3 }00ms;`}>
                <Link to={link.slug} on:click={addActive}>
                    <span class="link-text" style={`transition-delay: ${ (i * 2) + 4 }00ms`}>
                        <SVGText text={link.title} width="300px" startGrad='rgb(154,180,182)' endGrad='rgb(19,26,50)' hoverStartGrad='rgb(255,255,255)' hoverEndGrad='rgb(255,255,255)' />
                    </span>
                </Link>
            </li>
        {/each}
        </ul>
    </nav>
</Router>


<style lang="scss">
.site-nav{
    right: 100%;
    opacity: 0;
    transition: opacity 1.5s, right 0s 1.5s;
    background: rgba(255,255,255,0.9);
    .nav-item{
        position: relative;
        &:after{
            position: absolute;
            z-index: 5;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            height:75%;
            margin-top: auto;
            margin-bottom: auto;
            background: black;
            animation-delay: inherit;
        }
        .link-text{
            opacity: 0;
            transition: 0.5s;

        }
    }
}

.site-nav.active{
    right: 0;
    transition: opacity 1.5s, right 0s 0s;
    opacity: 1;
    z-index: 5;

    .nav-item{
        &:after{
            animation: fillOut 0.85s;
            animation-delay: inherit;

        }
        .link-text{
            opacity: 1;
        }
        &:hover{
            // background: black;
            &:after{
                width: 100% !important;
                transition: 0.5s !important;
                z-index: -1;

            }
        }
    }
}

@keyframes fillOut{
    0%{
        width: 0;
        left: 0;
    }
    50%{
        width: 100%;
        left:0;
    }
    51%{
        width: 100%;
        left:initial;
        left: auto;
        right:0;
    }
    100%{
        width: 0;
        left:initial;
        left: auto;
        right:0;
    }
}
</style>