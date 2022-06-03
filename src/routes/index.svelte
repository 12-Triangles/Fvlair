<style>
  :global(body) {
    margin: 0px;
    border-top: 8px solid #ff8438;
    background-color: #6f1f8f;
    color: #222222;
    /* font-size: 21px; */
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
    border: 1px solid blue;
  }

  .big-logo {
    margin: 48px auto;
    max-width: 200px;
    filter: drop-shadow(32px 32px 80px #00000010);
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

    border: 1px solid red;
  }

  .card {
    width: 96.25%;
    max-width: 480px;
    height: auto;
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

<br />
<br />
<div class="card-container">
  <a href="/">
    <img class="big-logo" src="static/flairLogo.svg" alt="Flair Logo" />
  </a>
  <!-- <img class="big-text" src="assets/comingSoon.svg" alt="Coming Soon Text" /> -->
  <!-- <br /> -->
  <div class="flair-text">
    Flair makes it easy to create customized stickers to personalize your text
    and photo messages.
  </div>
  <br />
  <br />
  <br />
  <br />

  <div class="card-list">
    <div>
      <img class="card" src="static/themes-feature.svg" alt="" />
      <div class="container-text">Popular Themes, Specially Picked For You</div>
    </div>
    <div>
      <img class="card" src="static/stickers-feature.svg" alt="" />
      <div class="container-text">Make Your Own Stickers and Sticker Packs</div>
    </div>
    <div>
      <img class="card" src="static/tools-feature.svg" alt="" />
      <div class="container-text">Intuitive Graphic Design Tools</div>
    </div>
    <div>
      <img class="card" src="static/share-feature.svg" alt="" />
      <div class="container-text">Share Your Stickers Anywhere!</div>
    </div>
  </div>
  <br />
  <div class="flex-me quick-links-flair">
    <a href="/support">Tech Support</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/flair-about">Flair FAQ</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/terms">Terms of Service</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="/privacy">Data Privacy</a>
  </div>

  <div class="flex-me small-logo">
    <a href="/flair">
      <img class="small-logo" src="assets/flairLogo.svg" alt="flair logo" />
    </a>
    <a href="">
      <img
        class="small-logo"
        src="assets/12TrianglesWhite.svg"
        alt="12 Triangles logo" />
    </a>
  </div>
  <br />
  <div class="contact">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>
</div>
<br />
