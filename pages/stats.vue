<template>
  <div>
    <div class="row mx-auto" style="max-width: 750px">
      <div class="col-12 px-4 py-2 mb-4">
        <div
          class="nomics-ticker-widget mb-4"
          data-name="AQIFI"
          data-base="AQIFI"
          data-quote="USD"
        ></div>
        <script src="https://widget.nomics.com/embed.js"></script>
        <!-- Component to be used when we have the api call
        <br/><br/>
        <ticker/>-->
      </div>
      <div class="col-12 px-4 py-2">
        <base-alert v-if="atLeastOneConnectedAccount" type="default">
          <div class="d-flex align-items-center mb-2">
            <i
              class="tim-icons icon-alert-circle-exc mr-2"
              style="font-size: 1.5rem"
            ></i>
            <h3 class="m-0">No wallet connected</h3>
          </div>
          <p>
            You must connect your wallet in order to see statistics related to
            you wallet. The connect button is on the top bar of the page.
          </p>
        </base-alert>
        <account v-else />
      </div>
    </div>
  </div>
</template>

<script>
import BaseAlert from "@/components/BaseAlert";
import Account from "@/components/Qao/Account";
import Web3Wallet from "@/components/Qao/web3/Web3Wallet";
import Ticker from "@/components/Stats/Ticker";
import { mapGetters } from "vuex";

export default {
  components: {
    Web3Wallet,
    Account,
    BaseAlert,
    Ticker,
  },
  mounted() {
    console.log("mounted");
    // console.log(this.blueBarChart.chartData);
    // this.blueBarChart.chartData.datasets[0].data = ;
  },
  computed: {
    ...mapGetters({
      atLeastOneConnectedAccount: "atLeastOneConnectedAccount",
      providerName: "getProviderName",
    }),
  },
};
</script>

<style>
.nomics-ticker-widget-embedded::after {
  content: "";
  background-size: 37px 37px;
  background-image: url("https://thedevblok.github.io/aqifi/images/new_logo_5-removebg-preview.png");
  filter: invert(1);
  z-index: 1;
  width: 37px;
  height: 37px;
  background-color: #000;
  position: absolute;
  top: 29px;
  left: 18px;
}
</style>
