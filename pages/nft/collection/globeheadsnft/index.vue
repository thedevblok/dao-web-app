<template>
<div class="container" style="height: calc(100vh - 180px);">
  <div class="row mx-auto my-auto" style="max-width: 900px;">
    <div class="col-12 p-2">
      <h2 class="text-center">Globe Heads NFT</h2>
    </div>
  </div>
  <div class="row mx-auto my-auto" style="max-width: 900px;">
    <div class="col-12 col-md-6 p-2">
      <page-card
          icon="edit"
          title="Buy"
          description="Buy and mint GlobeHeads NFT."
          page="/nft/collection/globeheadsnft/mint"
      />
    </div>
    <div class="col-12 col-md-6 p-2">
      <page-card
          icon="edit"
          title="View"
          description="View your GlobeHeads NFTs and transactions."
          page="/nft/collection/globeheadsnft/view"
      />
    </div>
  </div>
</div>
</template>

<script>
import PageCard from "~/components/Cards/PageCard";

export default {
  components: {
    PageCard,
  },
  data() {
    return {}
  },
}
</script>

