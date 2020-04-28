<script>
    import PageTitle from '../Atoms/PageTitle.svelte';
    import Head from '../../Functional/Head.svelte';

    import { fade } from 'svelte/transition';
</script>

<Head />
<section in:fade="{{duration: 2000}}">
    <PageTitle title="Home" />
</section>