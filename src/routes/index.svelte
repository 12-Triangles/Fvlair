<style>
  * {
    margin: 0px;
    font-family: 'Inter', sans-serif;
  }

  :global(body) {
    margin: 0px;
    background-color: #6f1f8f !important;
    color: #222222;
    font-family: 'Inter', sans-serif;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    position: relative;
    z-index: 1;
  }

  .bokeh {
    width: 100%;
    height: 100%;
    background-color: #6f1f8f;
    z-index: 0;
    position: absolute;
    overflow-x: hidden;
    top: 0px;
    left: 0px;
  }

  .left-bokeh {
    position: absolute;
    background-color: #ff5f6996;
    left: -10%;
    top: -10%;
    width: 100%;
    height: 60%;
    border-radius: 50%;
    filter: blur(150px);
  }

  .right-bokeh {
    position: absolute;
    background-color: #ff5f6996;
    right: -40%;
    top: -40%;
    width: 120%;
    height: 80%;
    border-radius: 50%;
    filter: blur(150px);
  }

  .big-logo {
    margin: 32px auto;
    max-width: 200px;
    filter: drop-shadow(32px 32px 80px #00000010);
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
    min-width: 200px;
    max-width: 200px;
    margin: 0px auto 8px;
  }

  .flair-text {
    text-align: center;
    font-size: 32px;
    margin: auto;

    max-width: 680px;
    width: 96.25%;
    color: rgb(255, 255, 255);
  }

  .container-text {
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin: 16px 0px 80px;
  }

  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: auto 16px;
  }

  .card {
    width: 96.25%;
    max-width: 480px;
    height: auto;
  }

  .quick-links-flair {
    display: flex;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin: 0px auto 32px;
    max-width: 640px;
    align-items: center;
    justify-content: space-evenly;
    color: white;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .contact {
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin: auto;
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

  @media (max-width: 500px) {
    .flair-text {
      font-size: 24px;
    }

    .container-text {
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>

<div class="bokeh">
  <div class="left-bokeh" />
  <div class="right-bokeh" />
</div>
<div class="card-container">

  <a href="/">
    <img class="big-logo" src="flairLogo.svg" alt="Flair Logo" />
  </a>
  <div class="flair-text">
    Flair makes it easy to create customized stickers to personalize your text
    and photo messages.
  </div>
  <br />
  <br />
  <div class="app-stores">
    <a
      href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526">
      <img class="store" src="app-store.png" alt="" />
    </a>
    <br />
    <a
      href="https://play.google.com/store/apps/details?id=com.triangles12.flairapp">
      <img class="store" src="google-play.png" alt="" />
    </a>
  </div>

  <br />
  <br />

  <div class="card-list">
    <div>
      <img class="card" src="themes-feature.svg" alt="" />
      <div class="container-text">Popular Themes, Specially Picked For You</div>
    </div>
    <div>
      <img class="card" src="stickers-feature.svg" alt="" />
      <div class="container-text">Make Your Own Stickers and Sticker Packs</div>
    </div>
    <div>
      <img class="card" src="tools-feature.svg" alt="" />
      <div class="container-text">Intuitive Graphic Design Tools</div>
    </div>
    <div>
      <img class="card" src="share-feature.svg" alt="" />
      <div class="container-text">Share Your Stickers Anywhere!</div>
    </div>
  </div>
  <br />
  <div class="quick-links-flair">
    <a href="/curious">Tech Support</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/flair-about">Flair FAQ</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/terms">Terms of Service</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/privacy">Data Privacy</a>
  </div>

  <div class="small-logo">
    <a href="/">
      <img class="small-logo" src="flairLogo.svg" alt="flair logo" />
    </a>
    <a href="https://12triangles.com">
      <img
        class="small-logo"
        src="12TrianglesWhite.svg"
        alt="12 Triangles logo" />
    </a>
  </div>
  <br />
  <div class="contact">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>
</div>
<br />
