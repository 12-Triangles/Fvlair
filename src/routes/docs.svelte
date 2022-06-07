<script context="module">
  // Get all posts of markdown type
  const allPosts = import.meta.glob('./*.md')
  let body = []
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata }
      }),
    )
  }

  export const load = async () => {
    const posts = await Promise.all(body)

    return {
      props: {
        posts,
      },
    }
  }
</script>

<script>
  import { onMount } from 'svelte'
  // import { MetaTags } from 'svelte-meta-tags'
  import MediaQuery from './MediaQuery.svelte'

  onMount(() => {
    window.scrollTo(0, 0)
  })
  export let posts
  // Sort the posts based on when they were created
  export let sortedPosts = posts.sort((a, b) => {
    return a.metadata.created > b.metadata.created
      ? 1
      : a.metadata.created < b.metadata.created
      ? -1
      : 0
  })

  // Get the Getting Started posts
  export const gettingStarted = sortedPosts.filter((post) => {
    return post.metadata.tag === 'Getting Started'
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
    margin: 16px auto 8px;
    font-size: 24px;
    font-weight: 700;
    max-width: 740px;
  }

  aside {
    background-color: #f2f2f2;
    border-radius: 4px;
    padding: 12px;

    display: flex;
  }

  .aside-text {
    color: #222;
  }

  .aside-image {
    margin-top: 0px;
    margin-bottom: 8px;
  }
  /* .body-text {
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
  } */
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
    margin-top: 64px;
    margin-bottom: 24px;
  }
</style>

<div>
  <div class="title">Flair Docs</div>
  <br />

  <aside>
    <div class="aside-image">💡</div>
    &nbsp; &nbsp;
    <div class="aside-text">
      This documentation describes the core features of Flair. We will update
      the content as new features get implemented. 🖤 12 Triangles
    </div>
  </aside>

  <div class="section">👉 Getting Started</div>
  {#each gettingStarted as post}
    <li>
      <a href={post.path.replace('.md', '')}>{post.metadata.title}</a>
    </li>
  {/each}
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
