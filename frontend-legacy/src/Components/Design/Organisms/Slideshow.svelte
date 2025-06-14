<script>
    // modules
    import { onMount } from "svelte";
    import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";

    // components
    import ProjectFeature from "./ProjectFeature.svelte";

    // variables
    export let data;
    export let duration = 4000;
    export let transition = 2000;
    let index = 0;
    let timer;
    let currentSlide, prevSlide;

    // Timer funciton

    const userSlide = n => {
        clearTimeout(timer);
        incrementSlide(n);
        timer = setTimeout(function() {
            showSlides();
        }, duration);
    };

    const incrementSlide = n => {
        index += n;
        if (data.length > 0) {
            prevSlide = index - 1;
        }
        if (index >= data.length) {
            index = 0;
        } else if (index < 0) {
            index = data.length - 1;
        }
        currentSlide = index;
    };

    const showSlides = () => {
        incrementSlide(1);
        timer = setTimeout(function() {
            showSlides();
        }, duration);
    };

    onMount(async () => {
        showSlides();
    });
</script>

<div class="slideshow-container relative flex ">
    <button
        class="slide-control prev"
        on:click="{() => {
            userSlide(-1);
        }}"
    >
        <ChevronLeftIcon />
    </button>
    <button
        class="slide-control next"
        on:click="{() => {
            userSlide(1);
        }}"
    >
        <ChevronRightIcon />
    </button>
    <ul>
        {#each data as slide, i}
            <li
                class="{`${currentSlide == i ? 'currentSlide' : ''} ${prevSlide == i ? 'prevSlide' : ''} slide w-full h-full`}"
                style="{`transition: ${transition}ms`}"
            >
                <ProjectFeature data="{slide}" />
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .slideshow-container {
        height: 74vh;
    }

    .slide-control {
        z-index: 2;
        position: absolute;
        width: 50px;
        height: 50px;
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        @media all and (max-width: 767px) {
            width: 65px;
            height: 65px;
            top: initial;
        }
        &.prev {
            left: 0em;
            @media all and (max-width: 767px) {
                left: initial;
                right: 75px;
            }
        }
        &.next {
            right: 0em;
            @media all and (max-width: 767px) {
                right: 10px;
            }
        }
    }
    .slide {
        z-index: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 50px;
    }

    .currentSlide {
        z-index: 1;
        opacity: 1;
        left: 0em;
    }

    .prevSlide {
        left: 50px;
        top: 10px;
        opacity: 0;
        transition: opacity 1s, top 1s, left 0s 1s !important;
    }
</style>
