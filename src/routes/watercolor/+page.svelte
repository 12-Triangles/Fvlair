<script>
  import AppStoreLink from "../../components/appStoreLink.svelte";

  import Background from "../../components/background.svelte";
  import Cards from "../../components/cards.svelte";
  import Footer from "../../components/footer.svelte";
  import Header from "../../components/header.svelte";
  import Themes from "../../components/themes.svelte";

  const appLink = "https://apps.apple.com/us/app/flair-watercolor-stickers/id6503091334";
  const backgroundImageName = "watercolorBig";
</script>

<!-- Background -->
<Background path={backgroundImageName}></Background>
<!-- Main Page -->
<div class="page-container">
  <!-- Header -->
  <Header></Header>
  <AppStoreLink link={appLink}></AppStoreLink>
  <!-- Cards -->
  <Cards></Cards>
  <!-- More Themes -->
  <Themes></Themes>

  <!-- Footer -->
  <AppStoreLink link={appLink}></AppStoreLink>
  <Footer></Footer>
</div>
