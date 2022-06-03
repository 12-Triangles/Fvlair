<script lang="ts">
  // import MediaQuery from './MediaQuery.svelte';
  import { onMount, beforeUpdate } from 'svelte'
  //   import { MetaTags } from 'svelte-meta-tags'
  //   export let isHome = false
  //   beforeUpdate(() => {
  //     if (location !== undefined) {
  //       isHome =
  //         location.href === 'http://localhost:3000/' ||
  //         location.href === 'https://ionhipster.com/'
  //     }
  //   })
</script>

<style>
  .slot {
    max-width: 96.25%;
    width: 2000px;
    margin: auto;
  }

  .container {
    max-width: 96.25%;
    width: 2000px;
    margin: auto;
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
    background-color: #222;
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

<div class="container">
  <!-- <nav class="flex cen">
    <div>&nbsp;&nbsp;&nbsp;</div>
    <div class="flex col">
      <a href="/">
        <img
          class="header-img"
          src="/ionHipsterMustache.svg"
          alt="ionhipster" />
      </a>
      <div class="spacer">&nbsp;</div>
    </div>
    <div class="spacer">&nbsp;</div>
    <div class="tagline">
      {#if isHome}
        <b>ionhipster</b>
        is a journal of notes, tips, and tricks on Ionic development.
        <div class="spacer">&nbsp;</div>
      {/if}
      {#if !isHome}
        <div class="spacer">&nbsp;</div>
      {/if}
    </div>
    <div class="spacer">&nbsp;</div>
  </nav> -->
  <br />
  <br />
  <br />
  <div class="slot">
    <slot />
  </div>
</div>
<!-- <MetaTags
  title="ionhipster"
  description="A journal of notes, tips, and tricks on Ionic development." />

<br />
<br />
<MediaQuery query="(min-width: 700px)" let:matches>
  {#if matches}
    {#if !isHome}
      <br />
    {/if}

    <div class="container">
      <nav class="flex cen">
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div class="flex col">
          <a href="/">
            <img
              class="header-img"
              src="/ionHipsterMustache.svg"
              alt="ionhipster" />
          </a>
          <div class="spacer">&nbsp;</div>
        </div>
        <div class="spacer">&nbsp;</div>
        <div class="tagline">
          {#if isHome}
            <b>ionhipster</b>
            is a journal of notes, tips, and tricks on Ionic development.
            <div class="spacer">&nbsp;</div>
          {/if}
          {#if !isHome}
            <div class="spacer">&nbsp;</div>
          {/if}
        </div>
        <div class="spacer">&nbsp;</div>
      </nav>
      <br />
      <br />
      <br />
      <div class="slot">
        <slot />
      </div>
    </div>
  {/if}
</MediaQuery>
<MediaQuery query="(max-width: 699px)" let:matches>
  {#if matches}
    <div class="container-mobile">
      <nav class="flex col cen">
        <div class="spacer">&nbsp;</div>
        <a href="/">
          <img
            class="header-img"
            src="/ionHipsterMustache.svg"
            alt="ionhipster" />
        </a>
        {#if isHome}
          <div class="spacer">&nbsp;</div>
        {/if}
        <div class="tagline-mobile">
          {#if isHome}
            <b>ionhipster</b>
            is a journal of notes, tips, and tricks on Ionic development.
          {/if}
        </div>
      </nav>
      <br />
      <br />
      <br />
      <div class="slot">
        <slot />
      </div>
    </div>
  {/if}
</MediaQuery> -->
<div class="nav-bar">
  <a href="/" class="home-button">12 Triangles</a>
  <div class="links">
    <a class="link" href="https://sayitwithflair.com">Flair</a>
    <a class="link" href="https://ionhipster.com">Blog</a>
  </div>
</div>
<br />
<br />
<br />
<!-- <div class="license">
  <img
    aria-hidden="true"
    class="cc"
    src="/cc.svg"
    title="Creative Commons"
    alt="Creative Commons" />
  <img
    aria-hidden="true"
    class="cc"
    src="/by.svg"
    title="Attribution"
    alt="Attribution" />
  <img
    aria-hidden="true"
    class="cc"
    src="/nc.svg"
    title="Non-Commercial"
    alt="Non-Commercial" />
  ionhipster.com is released under a
  <a href="https://creativecommons.org/licenses/by-nc/4.0/" rel="license">
    Creative Commons BY-NC License
  </a>
  .
</div>
<br />
<br />
<div class="flex cen">
  <div class="spacer">&nbsp;</div>
  <a href="/">
    <img class="footer-image" src="ionHipsterMustache.svg" alt="ionhipster" />
  </a>
  <br />
  <a href="https://12triangles.com">
    <img class="footer-image" src="/12TrianglesDark.svg" alt="12 Triangles" />
  </a>
  <div class="spacer">&nbsp;</div>
</div>
<br /> -->
<div class="copyright">© 12 Triangles, LLC 2022</div>
<br />
