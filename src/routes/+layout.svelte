<script>
  import MediaQuery from './MediaQuery.svelte'
  import { beforeUpdate } from 'svelte'
  //   import { MetaTags } from 'svelte-meta-tags'
  export let atDocs = false
  beforeUpdate(() => {
    if (location !== undefined) {
      atDocs =
        location.href === 'http://localhost:1234/docs' ||
        location.href === 'https://sayitwithflair.com/docs'

        console.log("*** LOCATAION", location.pathname)
    }
  })
</script>

<style>
  :global(body) {
    margin: 0px;
    background-color: #6f1f8f;
    font-family: 'Inter', sans-serif;
    /* background-image: url('/watercolor.jpg'); */
  }

  .slot {
    color: white;
    max-width: 96.25%;
    width: 2000px;
    margin: auto;
    display: flex;
    /* background-image: url('/watercolor.jpg'); */
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
    color: #1f172e;
    text-align: center;
    font-size: 12px;
    width: 100%;
    margin: auto auto 16px;
  }


  .app-stores {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 66%;
    max-width: 400px;
    margin: auto;
  }
  
  .store {
    
    width: 200px;
    height: 60px;
    margin: 0px auto 24px;
  }

  .page-container {
    /* background-image: url('/watercolor.jpg'); */
  }
</style>

<!-- <div class="slot">
  <slot />
</div> -->

<!-- <br />
<br />
<br />
<div class="app-stores">
  <a
    href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526">
    <img
      class="store apple"
      src="app-store.png"
      alt="Flair: Sticker Design Maker" />
  </a>
</div>
<br><br>
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
</div> -->
<!-- <br />
<div class="contact">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>
<div class="copyright">© 12 Triangles, LLC 2023</div>
<br /> -->
<div class="page-container">
  <!-- Desktop -->
  <MediaQuery query="(min-width: 700px)" let:matches>
    {#if matches}
      <div class="container">

        
    <nav class="nav-bar">
      <div class="links">
        <a href="https://12triangles.com" class="home-button">12 Triangles</a>
        <a class="link" href="/">Flair</a>
      </div>
      <div class="links">
        <a class="link" href="/how-to-use-flair">How to Flair</a>
        <a class="link" href="/themes">Themes</a>
      </div>
    </nav>
          <!-- <div class="spacer">&nbsp;</div>
          <div class="flex col">
            <a href="/">
              <img
                class="header-img"
                src="/acty.png"
                alt="Honda Acty EV Conversion" />
            </a>
            <div class="spacer">&nbsp;</div>
          </div>
          <div class="tagline">
            {#if isHome}
              <b>Acty EV</b>
              is a collection of notes, tips, and tricks for your journey in
              converting a Honda Acty to an electric vehicle.
              <div class="spacer">&nbsp;</div>
            {/if}
            {#if !isHome}
              <div class="spacer">&nbsp;</div>
            {/if}
          </div>
          <div class="spacer">&nbsp;</div> -->
        <!-- </nav> -->
        <!-- {#if isHome}
          <br />
        {/if} -->
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
            <a href="https://12triangles.com" class="home-button">12 Triangles</a>
            <a class="link" href="/">Flair</a>
          </div>
          <div class="links">
            <a class="link" href="/how-to-flair">Help</a>
            <a class="link" href="/themes">Themes</a>
          </div>
        </nav>
        <!-- <nav class="flex col cen">
          <div class="spacer">&nbsp;</div>
          <div>
            <a href="/">
              <img
                class="header-img"
                src="/acty.png"
                alt="Honda Acty EV Conversion" />
            </a>
          </div>
          {#if isHome}
            <div class="spacer">&nbsp;</div>
          {/if}
          <div class="tagline-mobile">
            {#if isHome}
              <b>Acty EV</b>
              is a collection of notes, tips, and tricks for your journey in
              converting a Honda Acty to an electric vehicle.
              <br />
              <br />
              <br />
            {/if}
          </div>
        </nav> -->
        <div class="slot">
          <slot />
        </div>
      </div>
    {/if}
  </MediaQuery>
  <!-- <div class="copyright">
    <div class="contact">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>
    <br>
    <div>
      <a href="https://12triangles.com">© 12 Triangles, 2024</a>
    </div>
  </div> -->
</div>