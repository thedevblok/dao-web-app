<template>
  <div class="vote-list-holder">
    <div class="row text-center">
      <div class="col-12">
        <h1 class="main-title mb-1">VOTE ATTENDANCES</h1>
      </div>
    </div>
    <div class="row mx-auto text-center" style="max-width: 760px">
      <div class="col-12">
        <h3 class="sub-title mt-4">
          You can collect your AQA that have finished their staking period here.
        </h3>
        <div v-if="!currentAccount">
          <h3 class="ml-6">You must connect a wallet</h3>
        </div>
        <div v-else-if="voteAttendances.length > 0">
          <el-table :data="voteAttendances">
            <el-table-column
              min-width="150"
              label="Date"
              property="date"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="Amount"
              property="amount"
            ></el-table-column>
            <el-table-column
              min-width="100"
              label="Weight"
              property="totalWeight"
            ></el-table-column>
            <el-table-column min-width="120" label="Action" property="position">
              <template v-slot:default="table">
                <a
                  class="btn btn-info btn-sm btn-simple"
                  size="mini"
                  @click="withdrawFromAttendance(table.row.attendanceId)"
                  :disabled="loading"
                >
                  <span v-if="loading === false">Withdraw</span
                  ><span v-else>Withdrawing...</span>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <h3 class="ml-6">No vote attendance ready to withdraw</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as luxon from "luxon";
import formatCryptoAmount from "@/util/utils.js";
import { Table, TableColumn } from "element-ui";
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data: () => ({
    voteAttendances: [],
    loading: false,
  }),
  computed: {
    ...mapGetters({
      getAccount: "getAccount",
      qaoApprovalLimit: "getQaoApprovalLimit",
    }),
    currentAccount: {
      get() {
        return this.getAccount;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  watch: {
    currentAccount() {
      if (this.currentAccount) {
        this.getVoteAttendances();
      }
    },
  },
  async mounted() {
    await this.getVoteAttendances();
  },
  methods: {
    async withdrawFromAttendance(attendanceId) {
      const self = this;
      try {
        const accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
          self.loading = true;
          const account = accounts[0];
          const ethUtils = window.web3.utils;
          const gasPrice = await window.web3.eth.getGasPrice();
          const adjustedGasPrice = new ethUtils.BN(gasPrice)
            .add(new ethUtils.BN(10000000000))
            .toString();

          const gasLimit = await window.qaoVotingEngineContract.methods
            .withdrawFromVoteAttendance(attendanceId)
            .estimateGas({
              from: account,
              gasPrice: adjustedGasPrice,
            });

          const voteWithdrawn = await window.qaoVotingEngineContract.methods
            .withdrawFromVoteAttendance(attendanceId)
            .send({
              from: account,
              gasPrice: adjustedGasPrice,
              gasLimit: gasLimit,
            });

          this.loading = false;
          if (voteWithdrawn.status) {
            self.$emit("voteWithdrawn");
            self.$swal.fire({
              icon: "success",
              title: "Vote Attendance Withdrawn",
            });
          }
        }
      } catch (e) {
        self.loading = false;
        let currentError = e.message ? e.message : e;
        self.$swal.fire({
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
    async getVoteAttendances() {
      if (this.currentAccount) {
        const currentVoteAttendances = await this.$axios.$get(
          "/api/get-mature-vote-attendances",
          {
            params: {
              address: this.currentAccount,
              voteId: this.voteId,
            },
          }
        );

        this.voteAttendances = [];

        const ethUtils = window.web3.utils;

        currentVoteAttendances.forEach((element) => {
          this.voteAttendances.push({
            voteId: element.voteId,
            address: element.address,
            amount: formatCryptoAmount(element.amount, "wei"),
            attendanceId: element.attendanceId,
            lockWeeks: element.lockWeeks,
            position: element.position == 1 ? "For" : "Against",
            date: luxon.DateTime.fromMillis(
              parseInt(element.timestamp) * 1000
            ).toFormat("y-MM-dd HH:mm"),
            totalWeight: formatCryptoAmount(element.totalWeight, "wei"),
            withdrawn: element.withdrawn,
          });
        });
        console.log(this.voteAttendances);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vote-list-holder {
  padding: 0px 40px;
  @media all and (max-width: 600px) {
    padding: 0px 28px;
  }
}
p {
  font-family: "goblin";
}

.red-text {
  color: red;
}
</style>
