<template>
  <div>
    <div class="row mx-auto my-auto" style="max-width: 900px">
      <div class="col-12 col-md-6 p-2">
        <page-card
          icon="edit"
          title="Contribute"
          description="Onboard as a DAO contributor"
          link="https://github.com/aqifi-dao"
          :secondLink="{
            title: 'Form',
            link: 'https://forms.gle/LmczU5hYfqHrcE7W6',
          }"
        />
        <page-card
          v-if="false"
          icon="edit"
          title="NFT"
          description="Manage and explore digital collectibles."
          page="nft"
        />
      </div>
      <div class="col-12 col-md-6 p-2">
        <page-card
          icon="edit"
          title="Statistics"
          description="Visualize various statistics related to Aqifi and your wallet."
          page="stats"
        />
      </div>
      <div class="col-12 col-md-6 p-2">
        <page-card
          icon="edit"
          title="Voting"
          description="View and participate to votes on system parameters and functionalities"
          page="vote"
        />
      </div>
      <div class="col-12 col-md-6 p-2" v-if="false">
        <page-card
          icon="edit"
          title="DEX"
          description="Write infos about your DEX."
          disabled
          coming-soon
        />
      </div>
      <div class="col-12 col-md-6 p-2">
        <page-card
          icon="edit"
          title="Staking Stats"
          description="View global staking statistics"
          page="staking-pool"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import PageCard from "~/components/Cards/PageCard";

export default {
  components: {
    VueCountdown,
    PageCard,
  },
  data() {
    return {
      launchTime: "Aug 18, 2021 12:00:01:00 GMT",
    };
  },
  computed: {
    time() {
      const d = new Date(this.launchTime);
      const d2 = new Date();
      const n = d.getTime() - d2.getTime();
      console.log(n);
      return n;
    },
  },
};
</script>
<style lang="scss">
.countdown p {
  margin-top: 20px;
  font-size: 24px;
  font-family: "goblin";
  color: #ffffff;
  text-align: center;
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
  @media all and (max-width: 600px) {
    font-size: 16px;
  }
}
</style>
