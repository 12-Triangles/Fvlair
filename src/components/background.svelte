<script>
  export let path = "";

  // console.log("*** SET FILTER", location.pathname);
  const isHome = location.pathname === "/" || path === "";
  let imagePath = isHome ? "" : `url(/${path}.jpg)`;
  let overlayColor = isHome ? "#ff5f6996" : "#22222217";
</script>

<div class="bokeh" style="--imagePath: {imagePath}">
  <div class="left-bokeh" style="--overlayColor: {overlayColor}" />
  <div class="right-bokeh" style="--overlayColor: {overlayColor}" />
</div>

<style>
  .bokeh {
    width: 100%;
    height: 100%;
    background-image: var(--imagePath);
    background-color: #6f1f8f;
    background-size: cover;
    z-index: 0;
    position: fixed;
    overflow-x: hidden;
    top: 0px;
    left: 0px;
  }

  .left-bokeh {
    position: absolute;
    background-color: var(--overlayColor);
    left: -10%;
    top: -10%;
    width: 100%;
    height: 60%;
    border-radius: 50%;
    filter: blur(150px);
  }

  .right-bokeh {
    position: absolute;
    background-color: var(--overlayColor);
    right: -40%;
    top: -40%;
    width: 120%;
    height: 80%;
    border-radius: 50%;
    filter: blur(150px);
  }
</style>
