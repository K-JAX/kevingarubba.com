<script>
    export let points;
    export let className;
    export let shadow = true;
    export let style;
    export let strokeWidth = 200;
</script>

<svg class={`${className} ribbon`} style={`${style}`} viewBox="0 0 1000 1000">
    <defs>
        <filter id="overlayShadow" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="-5" dy="5" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.35 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
    </defs>
    <polyline stroke-width={`${strokeWidth}`} filter={`${shadow ? 'url(#overlayShadow)' : '' }`} points={points} />
</svg>

<style lang="scss">
.ribbon{
    position: absolute;
    top: 0;
    &.overlay{
        z-index: 3;
        polyline{
            stroke-dasharray: 1000 1000;
            stroke-dashoffset: 250;
            animation: dash 0.75s 1.5s forwards;
        }
    }
    &.background {
        z-index: -1;
        polyline{
            stroke-dasharray: 1300 1200;
            stroke-dashoffset: 1135;
            animation: dashBG 0.75s 2.15s forwards;

        }
    }
    polyline{
        stroke: #eee;
    }
}

@keyframes dash {
    to{
        stroke-dashoffset: -750;
    }
}

@keyframes dashBG{
    to{
        stroke-dashoffset: -200;
    }
}

</style>