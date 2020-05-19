<script>
    import { onMount } from 'svelte';
    export let active = '';
    let ready = false;
    let addActive = () => {
        if( ready == true ){
            active = active === 'active' ? 'closed' : 'active';
        }
    }
    onMount(async () => {
        setTimeout(function(){
            ready = true;

        }, 1000)
    })
</script>

<button class={`burger mt-4 md:mt-0 ${ready ? 'ready' : ''} ${active}`} on:click={addActive}>
    <div class="burger-icon">
        <div class="burger-container">
            <span class="bun-top"></span>
            <span class="burger-filling"></span>
            <span class="bun-bottom"></span>
        </div>
    </div>
 
    <div class="burger-ring">
        <svg class="svg-ring">
            <path class="path" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
        </svg>
    </div>
    
    <svg width="0" height="0">
        <mask id="mask">
            <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
        </mask>
    </svg>
    
    <div class="path-burger">
      <div class="animate-path">
        <div class="path-rotation"></div>
      </div>
    </div>
    
</button>


<style lang="scss">
    $color: #000;
    $animation: 0.5s;

    .burger{
        position: relative;
        width: 68px;
        height: 68px;
        padding: 0.5em;
        transition: 0.25s;
        overflow: hidden;
        border: none;
        -webkit-touch-callout: none;
        user-select: none;
        cursor: pointer;
        &:hover{
            background: transparent;
            
        }
        .path-burger{
            position: absolute;
            top: 0;
            left: 0;
            width: 68px;
            height: 68px;
            mask: url(#mask);
            -webkit-mask-box-image: url('images/mask.svg');
        }

        .animate-path {
            position: absolute;
            top: 0;
            left: 0;
            height: 68px;
            width: 68px;
        }

        .path-rotation {
            height: 34px;
            width: 34px;
            margin: 34px 34px 0 0;
            transform: rotate(0deg);
            transform-origin: 100% 0;
            &:before {
                content: '';
                display: block;
                width: 30px;
                height: 34px;
                margin:  0 4px 0 0;
                background: $color;
            }
        }

        // box rotation animation
        @keyframes rotate-out {
            0% {
                transform: rotate(0deg);
            }
            40% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes rotate-in {
            0% {
                transform: rotate(360deg);
            }
            40% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }
        
        &.active{
            .path {
                animation: dash-in $animation linear normal;
                animation-fill-mode:forwards;
            }
            .animate-path {
                animation: rotate-in $animation linear normal;
                animation-fill-mode:forwards;
            }
        }
        &.closed{
            .path {
                animation: dash-out $animation linear normal;
                animation-fill-mode:forwards;
            }
            .animate-path {
                animation: rotate-out $animation linear normal;
                animation-fill-mode:forwards;
            }
        }
        
        .path {
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            stroke-linejoin: round;
        }
        
        @keyframes dash-in {
            0% {
                stroke-dashoffset: 240;
            }
            40% {
                stroke-dashoffset: 240;
            }
            100% {
                stroke-dashoffset: 0;
            }
            }
            @keyframes dash-out {
            0% {
                stroke-dashoffset: 0;
            }
            40% {
                stroke-dashoffset: 240;
            }
            100% {
                stroke-dashoffset: 240;
            }
        }


        .burger-icon {
            position: absolute;
            padding: 20px 16px;
            height: 68px;
            width: 68px;
            top: 0;
            left: 200px;
            transition: 0.25s left, 0.25s 0.15s transform;
        }
        &.ready .burger-icon{
            animation: flyIn 0.45s forwards;
        }

        @keyframes flyIn {
            0%{
                left: 100%;
                transform: skew(-25deg) rotate(2deg) translateZ(0);
            }
            75%{
                left: -5px;
                transform: skew(5deg) rotate(-4deg) translateZ(0);
            }
            88%{
                left: 1px;
                transform: skew(-8deg) rotate(1deg) translateZ(0);
            }
            100%{
                left: 0;
                transform: skew(0deg) translateZ(0);

            }
        }        

        .burger-container{
            position: relative;
            height: 28px;
            width: 36px;
        }

        .bun-top,
        .burger-filling,
        .bun-bottom{
            position: absolute;
            display: block;
            height: 4px;
            width: 36px;
            border-radius: 2px;
            background: $color;
            
        }
        .bun-top{
            top: 0;
            transform-origin: 34px 2px;
        }
        .burger-filling{
            top: 12px;
        }
        .bun-bottom{
            bottom: 0;
            transform-origin: 34px 2px;
        }

        .burger-ring{
            position: absolute;
            top: 0;
            left: 0;
            width: 68px;
            height: 68px;
        }

        .svg-ring{
            width: 68px;
            height: 68px;
        }

        // bun animations 
        &.active {
            .bun-top {
                animation: bun-top-out $animation linear normal;
                animation-fill-mode:forwards;
            }
            .bun-bottom {
                animation: bun-bot-out $animation linear normal;
                animation-fill-mode:forwards;
            }
        }
        &.closed {
            .bun-top {
                animation: bun-top-in $animation linear normal;
                animation-fill-mode:forwards;
            }
            .bun-bottom {
                animation: bun-bot-in $animation linear normal;
                animation-fill-mode:forwards;
            }
        }
        @keyframes bun-top-out {
            0% {
                left: 0;
                top: 0;
                transform: rotate(0deg);
            }
            20% {
                left: 0;
                top: 0;
                transform: rotate(15deg);
            }
            80% {
                left: -5px;
                top: 0;
                transform: rotate(-60deg);
            }
            100% {
                left: -5px;
                top: 1px;
                transform: rotate(-45deg);
            }
        }

        @keyframes bun-bot-out {
            0% {
                left: 0;
                transform: rotate(0deg);
            }
            20% {
                left: 0;
                transform: rotate(-15deg);
            }
            80% {
                left: -5px;
                transform: rotate(60deg);
            }
            100% {
                left: -5px;
                transform: rotate(45deg);
            }
        }

        @keyframes bun-top-in {
            0% {
                left: -5px;
                bot: 0;
                transform: rotate(-45deg);
            }
            20% {
                left: -5px;
                bot: 0;
                transform: rotate(-60deg);
            }
            80% {
                left: 0;
                bot: 0;
                transform: rotate(15deg);
            }
            100% {
                left: 0;
                bot: 1px;
                transform: rotate(0deg);
            }
        }
        
        @keyframes bun-bot-in {
            0% {
                left: -5px;
                transform: rotate(45deg);
            }
            20% {
                left: -5px;
                bot: 0;
                transform: rotate(60deg);
            }
            80% {
                left: 0;
                bot: 0;
                transform: rotate(-15deg);
            }
            100% {
                left: 0;
                transform: rotate(0deg);
            }
        }
     
        // burger filling
        &.active {
            .burger-filling {
                animation: burger-fill-out $animation linear normal;
                animation-fill-mode:forwards;
            }
        }

        &.closed {
            .burger-filling {
                animation: burger-fill-in $animation linear normal;
                animation-fill-mode:forwards;
            }
        }

        @keyframes burger-fill-in {
            0% {
                width: 0;
                left: 36px;
            }
            40% {
                width: 0;
                left: 40px;
            }
            80% {
                width: 36px;
                left: -6px;
            }
            100% {
                width: 36px;
                left: 0px;
            }
        }

        @keyframes burger-fill-out {
            0% {
                width: 36px;
                left: 0px;
            }
            20% {
                width: 42px;
                left: -6px;
            }

            40% {
                width: 0;
                left: 40px;
            }

            100% {
                width: 0;
                left: 36px;
            }
        }
        
    }
</style>