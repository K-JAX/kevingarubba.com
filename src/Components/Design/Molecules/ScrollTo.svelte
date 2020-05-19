<script>
    import {onMount} from 'svelte';

    export let className="", style="", delay=0;
    let loaded = false;

    onMount(async() => {
        setTimeout(function(){
            loaded = true;
        }, delay)
    })
</script>

<div class="{className} {loaded ? 'loaded' : ''} arrow-container flex flex-col w-6 h-12 relative" style="{style}">
    <div class="arrow first w-6 h-6 absolute"></div>
    <div class="arrow second w-6 h-6 absolute"></div>
    <!-- <div class="arrow third w-6 h-6"></div> -->
</div>

<style lang="scss">
.arrow-container{
    opacity: 0;
    overflow: hidden;
    &.loaded{
        opacity: 1;
    }
}
.arrow{
    top:0;
    left:0;
    opacity: 0;
    border: 2px solid black;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
    &.first{
        // animation-delay: 1s;
        animation: arrowOne 3s infinite forwards;

    }
    &.second{
        animation: arrowTwo 3s infinite forwards;
    }
}

@keyframes arrowOne{
    0%{
        opacity: 0;
        transform: translateY(0%) rotate(45deg);
    }
    45%{
        opacity: 0.25;
        transform: translateY(0%) rotate(45deg);
    }
    55%{
        opacity: 1;
        transform: translateY(65%) rotate(45deg);
    }
    90%{
        opacity: 1;
        transform: translateY(65%) rotate(45deg);
    }
    100%{
        opacity: 1;
        transform: translateY(200%) rotate(45deg);

    }
}

@keyframes arrowTwo{
    0%{
        opacity: 1;
        transform: translateY(65%) rotate(45deg);
    }
    45%{
        opacity: 1;
        transform: translateY(75%) rotate(45deg);   
    }
    50%{
        opacity: 0.25;
        transform: translateY(200%) rotate(45deg);
    }
    51%{
        opacity: 0;
        transform: translateY(-50%) rotate(45deg);
    }
    55%{
        opacity: 0.25;
        transform: translateY(0%) rotate(45deg);
    }
    90%{
        opacity: 0.25;
        transform: translateY(0%) rotate(45deg);
    }
    100%{
        opacity: 0.25;
        transform: translateY(50%) rotate(45deg);
    }
}

</style>