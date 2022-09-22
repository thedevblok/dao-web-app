<template>
  <div>
    <p>
      Once approving, please wait for the process to finish on the blockchain
      before quitting this page.
    </p>
    <v-btn
      id="approve-btn"
      class="qao-secondary-btn btn"
      :class="{ disabled: loading }"
      @click="approveQao"
    >
      <span v-if="loading">Approving... </span> <span v-else>Approve AQA</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async approveQao() {
      try {
        const accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
          this.loading = true;
          const account = accounts[0];
          const ethUtils = window.web3.utils;
          const gasPrice = await window.web3.eth.getGasPrice();
          const adjustedGasPrice = new ethUtils.BN(gasPrice)
            .add(new ethUtils.BN(10000000000))
            .toString();
          console.log(adjustedGasPrice);
          const qaoApprovalLimit = await window.qaoContract.methods
            .approve(
              process.env.QAO_VOTING_ENGINE_ADDRESS,
              new ethUtils.BN("2000000000000000000000000000000")
            )
            .send({ from: account, gasPrice: adjustedGasPrice });
          this.loading = false;
          if (qaoApprovalLimit.status) {
            this.$store.dispatch(
              "triggerQaoApprovalLimit",
              2000000000000000000000000000000
            );
          }
        }
      } catch (e) {
        this.loading = false;
        let currentError = e.message ? e.message : e;
        this.$swal.fire({
          title: "Error",
          text: currentError,
          icon: "error",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger btn-fill",
          },
        });
      }
    },
  },
};
</script>
