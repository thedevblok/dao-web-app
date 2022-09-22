<template v-if="account">
  <div>
    <h1 class="main-title text-center">
      VOTE ATTENDANCE FOR VOTE #{{ voteId }}
    </h1>
    <card class="mx-auto my-10 transparent" style="max-width: 750px">
      <div class="pb-4">
        <nuxt-link :to="'/vote/' + voteId" class="btn">Back to vote</nuxt-link>
      </div>
      <form v-if="qaoApprovalLimit > 0" class="container-fluid">
        <div class="row">
          <div class="col-12 p-2 pb-3 checkbox-radios">
            <base-radio v-model="votePosition" name="1"
              >I am FOR the proposition</base-radio
            >
            <base-radio v-model="votePosition" name="2"
              >I am AGAINST the proposition</base-radio
            >
          </div>
          <div class="col-12 p-2">
            <base-input
              :label="`Vote amount (${qaoBalance} AQA available)`"
              name="voteAmount"
              v-validate="validations.voteAmount"
              v-model="voteAmount"
              :error="getError('voteAmount')"
            >
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
              <span v-if="loading">Submitting.. </span>
              <span v-else>Submit vote attendance</span>
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
import { BaseRadio } from "@/components/index";

export default {
  components: {
    ApprovalButton,
    Web3Wallet,
    BaseRadio,
  },
  data() {
    return {
      voteId: this.$route.params.voteId,
      loading: false,
      valid: false,
      voteAmount: "",
      votePosition: false,
      lockTime: 1,
      validations: {
        voteAmount: {
          required: true,
          min_value: 1,
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
          this.createVoteAttendance();
        }
      });
    },
    async createVoteAttendance() {
      try {
        const accounts = await window.web3.eth.getAccounts();
        let position = false;
        if (this.votePosition === "1") {
          position = true;
        } else if (this.votePosition === "2") {
          position = false;
        } else {
          this.$swal.fire({
            title: "No position",
            text: "You need to choose a position.",
            icon: "error",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-danger btn-fill",
            },
          });
          return false;
        }
        if (accounts.length > 0) {
          this.loading = true;
          const account = accounts[0];
          const ethUtils = window.web3.utils;
          const gasPrice = await window.web3.eth.getGasPrice();
          const adjustedGasPrice = new ethUtils.BN(gasPrice)
            .add(new ethUtils.BN(10000000000))
            .toString();

          const gasLimit = await window.qaoVotingEngineContract.methods
            .vote(
              this.voteId,
              ethUtils.toWei(this.voteAmount, "ether"),
              this.lockTime,
              position
            )
            .estimateGas({
              from: account,
              gasPrice: adjustedGasPrice,
            });

          const voteCompleted = await window.qaoVotingEngineContract.methods
            .vote(
              this.voteId,
              ethUtils.toWei(this.voteAmount, "ether"),
              this.lockTime,
              position
            )
            .send({
              from: account,
              gasPrice: adjustedGasPrice,
              gasLimit: gasLimit,
            });

          this.loading = false;
          if (voteCompleted.status) {
            this.$emit("voteCompleted");
            self.$swal.fire({
              icon: "success",
              title: "Vote Attendance Created",
            });
            this.voteAttendanceCreated();
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
    voteAttendanceCreated() {
      const self = this;
      setTimeout(function () {
        self.$router.push("/vote/" + self.voteId);
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
