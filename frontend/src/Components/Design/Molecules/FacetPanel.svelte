<script>

    let dropped = false;

    export let title, facets, groupSelection, addQuery, inputType, all=false;

    const dropdown = () => {
        dropped = dropped == false ? true : false;
    }

</script>

<div class="relative w-full my-4 px-8 py-3 bg-white rounded-lg shadow-xl">
    <h3 class="font-bold text-gray-800">{title}</h3>
    <button on:click={dropdown} class={`dropdown-btn ${dropped ? 'dropped' : ''} before transition duration-150 rounded-full absolute bg-gray-400 mt-6 mr-5 p-5 hidden sm:block`} ></button>
    <hr class="my-3">
    <form class={`${dropped ? 'dropped' : ''}`}>
        <ul>
            {#if all}
                <li><label class={`filter-label ${groupSelection == '' ? "text-gray-600" : "text-gray-500"}`}><input type="radio" for="year" bind:group={groupSelection} value='' on:change={addQuery(groupSelection, this)} /> All</label></li>
            {/if}
            {#each facets as facet}
                <li>
                    {#if inputType == 'checkbox'}
                        <label class={`filter-label ${groupSelection.includes(facet.id) ? "text-gray-600" : "text-gray-500"}`}><input type='checkbox' bind:group={groupSelection} value={facet.id ? facet.id : facet} on:change={addQuery(groupSelection, this)} /> {facet.name ? facet.name : facet}</label>
                    {:else if inputType == 'radio'}
                        <label class={`filter-label ${groupSelection.includes(facet) ? "text-gray-600" : "text-gray-500"}`}><input type='radio' bind:group={groupSelection} value={facet.id ? facet.id : facet} on:change={addQuery(groupSelection, this)} /> {facet.name ? facet.name : facet}</label>
                    {/if}
                </li>
            {/each}
        </ul>
    </form>
</div>

<style lang="scss">
    .dropdown-btn{
        right: 0;
        top: 0;
        &.dropped{
            transform: rotateX(180deg);
        }
        &:before{
            position: absolute;
            border: 2px solid #444;
            border-top: none;
            border-left: none;
            width: 35%;
            height: 35%;
            top: 0;
            bottom: 0.25em;
            left: 0;
            right: 0;
            margin:auto;
            transform: rotate(45deg);
        }
    }
    @media all and (max-width: 767px){
        form{
            display: none;
            &.dropped{
                display: block;
            }
        }
    }
</style>