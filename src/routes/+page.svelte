<script>
  import AppStoreLink from "../components/appStoreLink.svelte";

  import Background from "../components/background.svelte";
  import Cards from "../components/cards.svelte";
  import Footer from "../components/footer.svelte";
  import Header from "../components/header.svelte";
  import Themes from "../components/themes.svelte";
</script>

<!-- Background -->
<Background></Background>
<!-- Main Page -->
<div class="page-container">
  <!-- Header -->
  <Header></Header>
  <AppStoreLink></AppStoreLink>
  <!-- Cards -->
  <Cards></Cards>
  <!-- More Themes -->
  <Themes></Themes>

  <!-- Footer -->
  <AppStoreLink></AppStoreLink>
  <Footer></Footer>
</div>
