<script>
  import MediaQuery from "./MediaQuery.svelte";
  import { beforeUpdate } from "svelte";
  //   import { MetaTags } from 'svelte-meta-tags'
  export let atDocs = false;
  beforeUpdate(() => {
    if (location !== undefined) {
      atDocs =
        location.href === "http://localhost:1234/docs" ||
        location.href === "https://sayitwithflair.com/docs";
    }
  });
</script>

<div class="page-container">
  <!-- Desktop -->
  <MediaQuery query="(min-width: 700px)" let:matches>
    {#if matches}
      <div class="container">
        <nav class="nav-bar">
          <div class="links">
            <a href="https://12triangles.com" class="home-button"
              >12 Triangles</a
            >
            <a class="link" href="/">Flair</a>
          </div>
          <div class="links">
            <a class="link" href="/how-to-use-flair">How to Flair</a>
            <a class="link" href="/themes">Themes</a>
          </div>
        </nav>
        <div class="slot">
          <slot />
        </div>
      </div>
    {/if}
  </MediaQuery>
  <!-- Mobile -->
  <MediaQuery query="(max-width: 699px)" let:matches>
    {#if matches}
      <div class="container-mobile">
        <nav class="nav-bar">
          <div class="links">
            <a href="https://12triangles.com" class="home-button"
              >12 Triangles</a
            >
            <a class="link" href="/">Flair</a>
          </div>
          <div class="links">
            <a class="link" href="/how-to-flair">Help</a>
            <a class="link" href="/themes">Themes</a>
          </div>
        </nav>
        <div class="slot">
          <slot />
        </div>
      </div>
    {/if}
  </MediaQuery>
</div>

<style>
  :global(body) {
    margin: 0px;
    background-color: #6f1f8f;
    font-family: "Inter", sans-serif;
  }

  .slot {
    color: white;
    max-width: 96.25%;
    width: 2000px;
    margin: auto;
    display: flex;
  }

  .nav-bar {
    width: 100%;
    text-transform: uppercase;
    justify-content: space-between;
    background-color: #222;
    height: 42px;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
  }

  .home-button {
    background: linear-gradient(219.01deg, #eb6c85 0%, #c265e8 100%);
    padding: 12px;
    color: #f4eaec;
    font-weight: 700;
    display: flex;
    flex-direction: column;
  }

  .links {
    color: white;
    font-weight: 700;
    height: 42px;
    display: flex;
  }

  a {
    color: #fff !important;

    text-decoration: none;
  }

  a:hover {
    background-color: #444;
    text-shadow: none;
  }

  .link {
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
</style>
