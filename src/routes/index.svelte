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

  :global(.big-logo) {
    margin: 32px auto;
    width: 160px;
    height: 160px;
    filter: drop-shadow(32px 32px 80px #00000010);
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
    max-width: 96.25%;
    width: 480px;
    height: 256px;
  }

  a {
    text-decoration: none;
    color: inherit;
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
      <img
        class="store apple"
        src="app-store.png"
        alt="Flair: Sticker Design Maker" />
    </a>
    <br />
    <a
      href="https://play.google.com/store/apps/details?id=com.triangles12.flairapp">
      <img
        class="store google"
        src="google-play.png"
        alt="Flair: Sticker Design Maker" />
    </a>
  </div>

  <br />
  <br />

  <div class="card-list">
    <div>
      <img class="card" src="themes-feature.svg" alt="Popular Themes" />
      <div class="container-text">Popular Themes, Specially Picked For You</div>
    </div>
    <div>
      <img
        class="card"
        src="stickers-feature.svg"
        alt="Make Your Own Stickers" />
      <div class="container-text">Make Your Own Stickers and Sticker Packs</div>
    </div>
    <div>
      <img class="card" src="tools-feature.svg" alt="Design Tools" />
      <div class="container-text">Intuitive Graphic Design Tools</div>
    </div>
    <div>
      <img class="card" src="share-feature.svg" alt="Share Your Stickers" />
      <div class="container-text">Share Your Stickers Anywhere!</div>
    </div>
  </div>
  <br />
</div>
<br />
