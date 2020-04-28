<script>
    import { Router, Link } from 'svelte-routing';
    


  export let to = "";

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: "active" };
    }
    return {};
  }
</script>


<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="projects">Projects</Link>
        <Link to="contact">Contact</Link>
        <Link to="sample-page" getProps="{getProps}">Sample Page</Link>
    </nav>
</Router>