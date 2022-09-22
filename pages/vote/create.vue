<template v-if="account">
  <div>
    <h1 class="main-title text-center">CREATE VOTE</h1>
    <card class="mx-auto my-10 transparent" style="max-width: 750px">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 p-2">
            <p class="text-justify">
              The ability to create a new vote is available for anyone but
              requires to have understanding of AQA community and ecosystem.
              This is the governance part ruled by the community, which will
              rule the entire AQA ecosystem. This ability requires user to lock
              100M for at least 1 week and will automatically lock
              <b>97.5m</b> AQA tokens As Loyalty fees being charged; Burning
              <b>1.25m</b> and depositing <b>1.25m</b> in the reward pool for
              staker tax fees Choose wisely on what the community should take a
              decision.
            </p>
          </div>
        </div>
      </div>
      <form v-if="qaoApprovalLimit > 0" class="container-fluid">
        <div class="row">
          <div class="col-12 p-2">
            <base-input
              label="Vote title"
              name="voteHeading"
              v-validate="validations.voteHeading"
              v-model="voteHeading"
              :error="getError('voteHeading')"
            >
            </base-input>
          </div>
          <div class="col-12 p-2">
            <base-input label="Vote description">
              <textarea
                name="voteDescription"
                class="form-control h-200"
                v-model="voteDescription"
              >
              </textarea>
            </base-input>
          </div>
          <div class="col-12 p-2">
            <base-input
              label="Lock Weeks (Must be between 1 and 520)"
              name="lockTime"
              v-validate="validations.lockTime"
              v-model="lockTime"
              :error="getError('lockTime')"
            >
            </base-input>
          </div>
          <div class="col-12 p-2 text-center">
            <base-button
              native-type="submit"
              class="qao-secondary-btn btn"
              :class="{ disabled: loading }"
              @click.prevent="validateForm()"
            >
              <span v-if="loading">Creating.. </span>
              <span v-else>Create vote</span>
            </base-button>
          </div>
        </div>
      </form>
      <div class="row" v-else>
        <div class="col">
          <span class="top-line"></span>
          <span class="bottom-line"></span>
          <div class="list-holder text-center" v-if="account">
            <h2 class="sub-title">You must approve AQA to create a vote</h2>
            <approval-button />
          </div>
          <div class="list-holder text-center" v-else>
            <h2 class="sub-title">
              You must connect to your wallet to create a vote
            </h2>
            <web-3-wallet />
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApprovalButton from "~/components/Qao/web3/ApprovalButton";
import Web3Wallet from "@/components/Qao/web3/Web3Wallet.vue";

export default {
  components: {
    ApprovalButton,
    Web3Wallet,
  },
  data() {
    return {
      loading: false,
      valid: false,
      voteHeading: "",
      voteDescription: "",
      lockTime: 1,
      validations: {
        voteHeading: {
          required: true,
          max: 100,
        },
        voteDescription: {
          required: true,
          min: 100,
        },
        lockTime: {
          required: true,
          min_value: 1,
          max_value: 520,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      qaoBalance: "getQaoBalance",
      account: "getAccount",
      qaoApprovalLimit: "getQaoApprovalLimit",
    }),
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validateForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.createVote();
        }
      });
    },
    async createVote() {
      const self = this;
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
          const gasLimit = await window.qaoVotingEngineContract.methods
            .createVote(this.lockTime)
            .estimateGas({
              from: account,
              gasPrice: adjustedGasPrice,
            });

          const createdVote = await window.qaoVotingEngineContract.methods
            .createVote(this.lockTime)
            .send({
              from: account,
              gasPrice: adjustedGasPrice,
              gasLimit: gasLimit,
            });
          this.loading = false;
          if (createdVote.status) {
            this.$swal.fire({
              icon: "success",
              title: "Vote Created",
              onClose: self.voteCreated(),
            });
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
    voteCreated() {
      const self = this;
      setTimeout(function () {
        self.$router.push("/vote");
      }, 4000);
    },
  },
};
</script>

<style>
.h-200 {
  min-height: 200px;
}
</style>
