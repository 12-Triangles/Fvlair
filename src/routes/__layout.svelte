<script lang="ts">
  // import MediaQuery from './MediaQuery.svelte';
  import { beforeUpdate } from 'svelte'
  //   import { MetaTags } from 'svelte-meta-tags'
  export let atDocs = false
  beforeUpdate(() => {
    if (location !== undefined) {
      atDocs =
        location.href === 'http://localhost:1234/docs' ||
        location.href === 'https://sayitwithflair.com/docs'
    }
  })
</script>

<style>
  :global(body) {
    margin: 0px;
    background-color: #6f1f8f;
    font-family: 'Inter', sans-serif;
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

  .footer-link {
    padding: 0px;
    background-color: #6f1f8f;
  }

  .footer-link:hover {
    text-decoration: underline;
    background-color: #6f1f8f;
  }

  .quick-links-flair {
    max-width: 96.25%;
    width: 2000px;
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin: 0px auto 32px;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .contact {
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin: auto;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    align-items: center;
    justify-content: space-evenly;
  }

  .small-logo {
    display: flex;
    justify-content: center;
    height: 66px;
    width: 60px;
    margin: auto;
    padding: 0px 16px;
    color: white;
  }

  .copyright {
    padding: 16px 16px 16px;
    color: white;
    text-align: center;
    font-size: 12px;
  }
</style>

<div class="slot">
  <slot />
</div>
<div class="nav-bar">
  <div class="links">
    <a href="https://12triangles.com" class="home-button">12 Triangles</a>
    <a class="link" href="/">Flair</a>
  </div>
  <div class="links">
    <a class="link" href="/docs">Docs</a>
    <a class="link" href="https://ionhipster.com">Blog</a>
  </div>
</div>
<br />
<br />
<br />
<div class="quick-links-flair">
  <a class="footer-link" href="/docs">Tech Support</a>
  &nbsp;&nbsp;-&nbsp;&nbsp;
  <a class="footer-link" href="/flair-about">Flair FAQ</a>
  &nbsp;&nbsp;-&nbsp;&nbsp;
  <a class="footer-link" href="/terms">Terms of Service</a>
  &nbsp;&nbsp;-&nbsp;&nbsp;
  <a class="footer-link" href="/privacy">Data Privacy</a>
</div>

<div class="small-logo">
  <a class="footer-link" href="/">
    <img class="small-logo" src="flairLogo.svg" alt="flair logo" />
  </a>
  <a class="footer-link" href="https://12triangles.com">
    <img
      class="small-logo"
      src="12TrianglesWhite.svg"
      alt="12 Triangles logo" />
  </a>
</div>
<br />
<div class="contact">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>
<div class="copyright">© 12 Triangles, LLC 2022</div>
<br />
