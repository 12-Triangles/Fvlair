<script>
  import { onMount } from 'svelte'

  onMount(() => {
    window.scrollTo(0, 0)
  })
</script>

<style>
  .heading {
    max-width: 576px;
    width: 96.25%;
    text-align: left;
    padding: auto 16px;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    color: white;
    margin: 16px auto;
  }

  .text {
    padding: auto 16px;
    max-width: 576px;
    width: 96.25%;
    font-size: 16px;
    line-height: 29px;
    color: white;
    margin: auto;
    margin-bottom: 48px;
  }

  hr {
    background: white;
    border: white;
    width: 96px;
    height: 2px;
    margin: 16px auto 48px;
  }

  .component-container {
    max-width: 1200px;
    width: 92.5%;
    height: 100%;
    margin: 0px auto auto;
    display: flex;
    flex-direction: column;
    padding-left: 3.75%;
    padding-right: 3.75%;
    background-color: #6f1f8f;
  }

  a {
    color: inherit !important;
    margin: auto;
  }
</style>

<br />
<br />
<div class="component-container">
  <a href="/">
    <img class="big-logo" src="flairLogo.svg" alt="Flair Logo" />
  </a>
  <div class="heading">Tell me about Flair!</div>
  <div class="text">
    Flair is a simple but powerful sticker design app that makes it easy to
    create, organize, and share custom stickers anywhere.
    <br />
    <br />
    We provide a curated library of over 5000 high quality backgrounds, fonts,
    and design elements; updated weekly—so you always have the perfect sticker
    designs for any holiday or event.
    <br />
    <br />
    Our organized approach to managing stickers, sticker packs, and materials
    makes creating and sharing consistent/branded content a breeze.
    <br />
    <br />
    14+ intuitive graphic design tools enable quick layer editing, texturing,
    and masking not previously possible without desktop software.
    <br />
    <br />
    Stickers can be shared directly to Snapchat, WhatsApp, and Facebook
    Messenger, copied to your clipboard, or saved to your photo library.
    <br />
    <br />
    We hope you enjoy it!
  </div>
  <br />
  <hr />
  <br />
  <div class="heading">
    I’m not here to learn about Flair. I’ve got a problem with my copy of the
    app!
  </div>
  <div class="text">
    Please visit our
    <a href="/docs">support website.</a>
    <br />
    P.S. App development is very hard. We’ll try to solve your issue quickly and
    to the best of our abilities.
  </div>
  <br />
  <hr />
  <br />
  <div class="heading">
    I, on the other hand, AM here to learn about Flair. Where can I download it?
  </div>
  <div class="text">
    <a
      href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526">
      Apple App Store
    </a>
    or
    <a
      href="https://play.google.com/store/apps/details?id=com.triangles12.flairapp">
      Google Play Store.
    </a>
    Free to download.
    <br />
    <br />
    Flair Pro is $1.99/month, $11.99/year, or $35.99/once to unlock all
    materials and unlimited sticker packs.
  </div>

  <br />
  <div class="heading">Can I sell the stickers I make on Flair?</div>
  <div class="text">
    Maybe. You can totally contact the artists seperately to work out licensing
    or credit if needed! We’ve included contact info where possible to make it
    easy for you to get in touch with the original artist.
  </div>
  <br />
  <div class="heading">Will Flair be localized to my language?</div>
  <div class="text">
    Flair uses English by default but will be translated to Hindi, Portuguese,
    Spanish, French, Indonesian, German, Filipino, and Italian.
  </div>
  <br />
  <hr />
  <br />
  <div class="heading">Who made this?</div>
  <div class="text">
    Flair was developed by 12 Triangles, an independent app development studio
    based in Omaha, Nebraska.
  </div>
  <br />
  <div class="heading">
    Could you tell me more about your development process?
  </div>
  <div class="text">
    Sure! We’ve been keeping a pretty terrible record of things on our
    <a href="https://ionhipster.com">development blog.</a>
    There you can find art and process posts, photos from the studio, and more.
  </div>
  <br />
  <div class="heading">What technology was Flair built with?</div>
  <div class="text">
    Flair is being developed using Angular, Ionic, Capacitor, and uses many
    Firebase features. We also generate SVGs using magic. ✨
  </div>
  <br />
  <div class="heading">You didn’t answer my question!</div>
  <div class="text">
    Come talk to us on
    <a href="https://twitter.com/12triangles">Twitter!</a>
    If you’re having a technical problem, please head to our
    <a href="/docs">support site.</a>
  </div>
  <br />
  <br />
  <br />
  <br />
</div>
