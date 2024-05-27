<div class="feature-link-group">
  <a href="https://sayitwithflair.com">
    <div class="hover-effect flair" />
    <div class="title">Watercolor</div>
  </a>
  <a href="https://instantcardgrading.com">
    <div class="hover-effect flair" />
    <div class="title">Instant Card Grading</div>
  </a>
  <a href="https://ionhipster.com">
    <div class="hover-effect flair" />
    <div class="title">ionhipster</div>
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

  .flair {
    background-image: url("/watercolor.jpg");
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
