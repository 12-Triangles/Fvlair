<script>
  import { onMount } from 'svelte'

  onMount(() => {
    window.scrollTo(0, 0)
  })
</script>

<style>
  .title {
    margin: 126px 0px 32px 0px;
    font-size: 48px;
    font-weight: 800;
    line-height: 58.09px;
  }

  .section {
    margin: auto;

    font-size: 24px;
    font-weight: 700;
    max-width: 740px;
  }

  .body-text {
    margin: auto;
    color: white;
    line-height: 2;
    max-width: 740px;
  }
  .date-text {
    margin: auto;
    margin-bottom: 160px;
    color: #999999;
    line-height: 2;
    max-width: 740px;
  }
  a {
    color: white;
    text-decoration: underline;
    font-size: 16px;
    /* font-weight: 00; */
  }

  div {
    margin: auto;
    color: white;
    line-height: 2;
    max-width: 740px;
    list-style-type: none;
  }

  li:before {
    content: '📄';
    /* margin-left: -20px; */
    margin-right: 8px;
  }

  hr {
    height: 1px;
    border-width: 0;
    color: white;
    background-color: white;
    margin-bottom: 24px;
  }
</style>

<div>
  <div class="title">Flair Docs</div>
  <br />

  <aside>
    This documentation describes the core features of Flair. We will update the
    content as new features get implemented. 🖤 12 Triangles
  </aside>
  <br />
  <div class="section">👉 Getting Started</div>
  <li>
    <a href="/">Creating your first sticker</a>
  </li>
  <li>
    <a href="/">Understanding Flair's UI</a>
  </li>
  <li>
    <a href="/">Switching UI themes</a>
  </li>
  <li>
    <a href="/">Sticker Packs</a>
  </li>
  <li>
    <a href="/">Gestures</a>
  </li>
  <li>
    <a href="/">FAQ</a>
  </li>
  <hr />
  <div class="section">🍭 Understanding Sticker Design</div>
  <li>
    <a href="/">Working with 2D layers</a>
  </li>
  <li>
    <a href="/">Working with Images</a>
  </li>
  <li>
    <a href="/">Working with Text</a>
  </li>
  <li>
    <a href="/">Marker Tool</a>
  </li>
  <li>
    <a href="/">Layer Controls</a>
  </li>
</div>
