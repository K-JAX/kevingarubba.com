<script>
    // Modules
    import { onMount } from "svelte";
    let ready = false;

    onMount(async () => {
        ready = true;
    });
</script>

{#if ready}
    <svg
        class="svg-logo -mt-2 w-32 h-32 md:w-20 md:h-20"
        viewBox="0 0 1000 1000"
    >

        <mask id="gMask">
            <!-- Everything under a white pixel will be visible -->
            <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
            <polyline
                points="1050, 0 565, 505 1050, 500"
                fill="black"
            ></polyline>
            <!-- Everything under a black pixel will be invisible -->
            <path
                d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95
                Q10,65,10,35 Z"
                fill="black"
            ></path>
        </mask>

        <defs>
            <linearGradient id="ringgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                    offset="0%"
                    style="stop-color:rgb(0,0,0);stop-opacity:0.125"
                ></stop>
                <stop
                    offset="100%"
                    style="stop-color:rgb(0,0,0);stop-opacity:1"
                ></stop>
            </linearGradient>
            <linearGradient
                id="angelgrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientTransform="rotate(135)"
            >
                <stop
                    offset="0%"
                    style="stop-color:rgb(10,10,10);stop-opacity:1"
                ></stop>
                <stop
                    offset="15%"
                    style="stop-color:rgb(111,111,111);stop-opacity:1"
                ></stop>
                <stop
                    offset="17%"
                    style="stop-color:rgb(255,255,255);stop-opacity:1"
                ></stop>
                <stop
                    offset="35%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
                <stop
                    offset="50%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
                <stop
                    offset="100%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
            </linearGradient>
            <linearGradient
                id="angelgrad2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientTransform="rotate(45)"
            >
                <stop
                    offset="0%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
                <stop
                    offset="37%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
                <stop
                    offset="52%"
                    style="stop-color:rgb(255,255,255);stop-opacity:1"
                ></stop>
                <stop
                    offset="55%"
                    style="stop-color:rgb(177,177,177);stop-opacity:1"
                ></stop>
                <stop
                    offset="100%"
                    style="stop-color:rgb(0,0,0);stop-opacity:1"
                ></stop>
            </linearGradient>
            <filter id="vertShadow" x="-450%" y="0" width="540%" height="200%">
                <feOffset
                    result="offOut"
                    in="SourceAlpha"
                    dx="-30"
                    dy="0"
                ></feOffset>
                <feColorMatrix
                    result="matrixOut"
                    in="offOut"
                    type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.45 0"
                ></feColorMatrix>
                <feGaussianBlur
                    result="blurOut"
                    in="matrixOut"
                    stdDeviation="20"
                ></feGaussianBlur>
                <feBlend
                    in="SourceGraphic"
                    in2="blurOut"
                    mode="normal"
                ></feBlend>

            </filter>
        </defs>
        <polyline class="top-angle" points="1050, 0 550, 505"></polyline>
        <polyline class="bottom-angle" points="550, 495 1050, 1000"></polyline>

        <circle
            class="ring"
            cx="500"
            cy="500"
            r="300"
            mask="url(#gMask)"
        ></circle>

        <rect class="vert" x="48%" y="0" filter="url(#vertShadow)"></rect>

    </svg>
{/if}

<style lang="scss">
    $time: 1s;
    $delay: 0.5s;

    .svg-logo {
        position: relative;
        display: inline-block;
        @media all and(max-width: 768px) {
        }
    }

    .ring {
        fill: none;
        stroke: url(#ringgrad);
        stroke-width: 20;
        stroke-dasharray: 1695 1695;
        stroke-dashoffset: 1695px;
        animation: drawCircle $time $delay forwards;
    }

    @keyframes drawCircle {
        0% {
            stroke-dashoffset: 1695px;
        }
        100% {
            stroke-dashoffset: 0px;
        }
    }

    .vert {
        fill: #fff;
        width: 50px;
        height: 1000px;
        stroke-linecap: square;
        transform: rotate(90deg);
        /*   opacity: 0; */
        fill-opacity: 0;
        transform-origin: center center;
        animation: spinVert $time $delay forwards;
    }

    @keyframes spinVert {
        0% {
            transform: rotate(90deg);
            fill-opacity: 0.3;
        }
        100% {
            transform: rotate(360deg);
            fill-opacity: 1;
        }
    }

    .top-angle {
        stroke: #000;
        fill: none;
        stroke-width: 20;
        stroke: url(#angelgrad);
        stroke-dasharray: 800 800;
        stroke-dashoffset: -800;
        animation: sprout $time 0.75s forwards;
    }

    .bottom-angle {
        stroke: #000;
        fill: none;
        stroke-width: 20;
        stroke: #000;
        stroke: url(#angelgrad2);
        stroke-dasharray: 800 800;
        stroke-dashoffset: 800;
        animation: sproutReverse $time $delay forwards;
    }

    @keyframes sprout {
        0% {
            stroke-dashoffset: -800;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes sproutReverse {
        0% {
            stroke-dashoffset: 800;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
</style>
