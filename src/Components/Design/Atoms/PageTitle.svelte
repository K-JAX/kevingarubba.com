<script>
    export let title = '', className = '', style = '';
</script>

<h1 class={`${className} text-base font-bold tracking-widest uppercase before`} style={`${style}`}>{title}</h1>

<style>
h1:before{
    position: relative;
    display: inline-block;
    width: 17px;
    height: 4px;
    background-color: black;
    top: 0;
    bottom: 0;
    margin-bottom: 0.25em;
    margin-right: 0.5em;
}
</style>