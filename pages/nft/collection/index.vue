<template>
<div class="container d-flex" style="height: calc(100vh - 180px);">
  <div class="row mx-auto my-auto" style="max-width: 900px;">
    <div class="col-12 p-2">
      <page-card
        v-if="active"
        icon="edit"
        title="First Collection NFT"
        description="Write text here."
        page="/nft/collection/globeheadsnft"
      />
      <page-card
        v-else
        icon="edit"
        title="First Collection NFT"
        description="Write text here."
        disabled
        coming-soon
      />
    </div>
  </div>
</div>
</template>

<script>
import PageCard from "~/components/Cards/PageCard";
import * as luxon from 'luxon';

export default {
  components: {
    PageCard,
  },
  data() {
    return {}
  },
  computed: {
    active: function() {
      var d1 = luxon.DateTime.utc(2021, 10, 21, 23, 30);
      var d2 = luxon.DateTime.utc();

      console.log(d1)
      console.log(d2)

      console.log(d2 > d1); //=> true
      return d2 > d1;
    }
  },
  mounted: function() {
    console.log(this.active)
  }
}
</script>

