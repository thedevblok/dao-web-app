<template>
<div class="container d-flex" style="height: calc(100vh - 180px);">
  <div class="row mx-auto my-auto" style="max-width: 900px;">
    <div class="col-12 p-2">
      <page-card
          icon="edit"
          title="Collections"
          description="View collections powered by our DAO Ecosystem."
          page="/nft/collection"
      />
    </div>
    <div class="col-12 col-md-6 p-2">
      <page-card
          icon="edit"
          title="OpenSea"
          description="Manage and explore digital collectibles on OpenSea."
          link="https://opensea.io"
      />
    </div>
    <div class="col-12 col-md-6 p-2">
      <page-card
          icon="edit"
          title="Museum"
          description="Enter our Metaverse."
          link="https://www.cryptovoxels.com/"
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

