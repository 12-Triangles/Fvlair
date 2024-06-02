<h1>Flair Texture Library</h1>
<div class="feature-link-group">
  <a href="/acrylic">
    <div class="hover-effect acrylic" />
    <div class="title">acrylic</div>
  </a>
  <a href="/black-ink">
    <div class="hover-effect soon" />
    <div class="title">black ink</div>
  </a>
  <!-- <a href="/collage-paper">
    <div class="hover-effect soon" />
    <div class="title">collage paper</div>
  </a> -->
  <a href="/colorful-foil">
    <div class="hover-effect soon" />
    <div class="title">colorful foil</div>
  </a>
  <a href="/colorful-marble">
    <div class="hover-effect soon" />
    <div class="title">colorful marble</div>
  </a>
  <!-- <a href="/gold foil">
    <div class="hover-effect soon" />
    <div class="title">gold foil</div>
  </a> -->
  <a href="/gold-marble">
    <div class="hover-effect soon" />
    <div class="title">gold marble</div>
  </a>
  <a href="/gold-paper">
    <div class="hover-effect soon" />
    <div class="title">gold paper</div>
  </a>
  <a href="/gradients">
    <div class="hover-effect soon" />
    <div class="title">gradients</div>
  </a>
  <!-- <a href="/halftone">
    <div class="hover-effect soon" />
    <div class="title">halftone</div>
  </a> -->
  <a href="/holographic">
    <div class="hover-effect soon" />
    <div class="title">holographic</div>
  </a>
  <!-- <a href="/mixed-media">
    <div class="hover-effect soon" />
    <div class="title">mixed media</div>
  </a> -->
  <a href="/pastel">
    <div class="hover-effect pastel" />
    <div class="title">pastel</div>
  </a>
  <a href="/pretty-textures">
    <div class="hover-effect soon" />
    <div class="title">pretty textures</div>
  </a>
  <!-- <a href="/retro">
    <div class="hover-effect soon" />
    <div class="title">retro</div>
  </a> -->
  <a href="/watercolor">
    <div class="hover-effect watercolor" />
    <div class="title">Watercolor</div>
  </a>
</div>
<br />

<style>
  .feature-link-group {
    display: flex;
    flex-wrap: wrap;
    margin: 64px auto;
    max-width: 960px;
    justify-content: center;
  }

  .hover-effect {
    width: 240px;
    height: 240px;
    margin: auto 32px;
    border-radius: 120px;
    background-size: contain;
  }

  .hover-effect:hover {
    box-shadow: 0 0 0 16px #fff inset;
    transition: all 0.25s;
  }

  .hover-effect:not(:hover) {
    box-shadow: 0 0 0 0px #fff inset;
    transition: all 0.25s;
  }

  .watercolor {
    background-image: url("/watercolor.jpg");
    background-position: center;
    background-size: cover;
  }

  .pastel {
    background-image: url("/pastel.jpg");
    background-position: center;
    background-size: cover;
  }


  .acrylic {
    background-image: url("/acrylic.jpg");
    background-position: center;
    background-size: cover;
  }

  .soon {
    background-image: url("/soon.jpg");
    background-position: center;
    background-size: cover;
  }

  .title {
    text-transform: uppercase;
    /* color: #6f1f8f; */
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    padding-top: 16px;
    padding-bottom: 32px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
