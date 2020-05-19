<script>
    // export let href = '';
    export let className = '';
    export let priority = 'tertiary';

    let priorityClass;
    
    switch(priority){
        case 'primary':
            priorityClass = "bg-topaz text-white px-8 shadow-md hover:shadow-lg"
            break;
        case 'secondary':
            priorityClass = "bg-agua text-white px-8 shadow-md hover:shadow-lg"
            break;
        case 'tertiary':
            priorityClass = "bg-black text-white px-8 shadow-md hover:shadow-lg"
            break;
        case 'tag':
            priorityClass = "bg-gray-300 text-gray-700 hover:bg-gray-400 px-4"
            break;
        default:
            priorityClass = "bg-gray-300 text-gray-700 px-8"
    }
    
</script>

<button class={`${priorityClass} ${className} rounded-full py-2`}><slot></slot></button>


<style>
button{
    justify-self: end;
    transition: 0.25s;
}
</style>