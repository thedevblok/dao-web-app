<template>
<div>

  <h1 class="main-title text-center">
    🌐 QAO Vote #{{ voteId }}
  </h1>
  <card
    class="mx-auto transparent"
    style="max-width: 750px;"
  >
    <div class="pb-4">
      <nuxt-link to="/vote" class="btn btn-info">Back</nuxt-link>
    </div>
    <div class="vote-details-holder">
      <h4 class="sub-title">
        {{ vote.title }}
      </h4>
      <pre class="pt-4">{{ vote.description }}</pre>
      <hr class="my-6" />
      <h4 class="sub-title text-left">
        Details
      </h4>
      <p><b>Start date:</b> {{ vote.startDate }}</p>
      <p><b>End date:</b> {{ vote.endDate }}</p>
      <p><b>For:</b> {{ vote.votePositive }}</p>
      <p><b>Against:</b> {{ vote.voteNegative }}</p>
    </div>

    <div v-if="currentAccount">
      <hr class="my-6" />
      <div class="text-left">
        <nuxt-link v-if="vote.active" class="btn btn-info text-center" :to="'/vote/attendance/'+voteId">Add a Vote</nuxt-link>
        <p v-else>Vote ended</p>
      </div>
    </div>
    <div v-else>
      No account connected
    </div>
  </card>

  <card
    v-if="currentAccount"
    class="mx-auto"
    card-body-classes="table-full-width"
    style="max-width: 750px;"
  >
    <h3 slot="header" class="card-title font-weight-bold text-center">My Votes</h3>
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
      <el-table-column
        min-width="120"
        label="Lock weeks"
        property="lockWeeks"
      ></el-table-column>
      <el-table-column
        min-width="100"
        label="Position"
        property="position"
      ></el-table-column>
    </el-table>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p>Total Amount: {{this.totalAmount}}</p>
          <p>Total Weight: {{this.totalWeight}}</p>
        </div>
      </div>
    </div>
  </card>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as luxon from 'luxon'
  import formatCryptoAmount from '@/util/utils.js'
  import Decimal from 'decimal.js'
  import { Table, TableColumn } from 'element-ui'

  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    props: {
      voteId: {
        type: String,
        default: null
      }
    },
    data: () => ({
      loading: false,
      vote: {
        title: '',
        description: '',
        votePositive: '',
        voteNegative: '',
        startDate: '',
        endDate: '',
        voteId: '',
        valid: ''
      },
      voteAttendances: [],
      totalAmount: 0,
      totalWeight: 0
    }),
    computed: {
      ...mapGetters({
        getAccount: 'getAccount',
        qaoApprovalLimit: 'getQaoApprovalLimit'
      }),
      currentAccount: {
        get() {
          return this.getAccount
        },
        set(newValue) {
          return newValue
        }
      }
    },
    watch: {
      currentAccount() {
        if (this.currentAccount) {
          this.getVoteAttendances()
        }
      }
    },
    async mounted() {
      this.currentAccount = this.getAccount
      const currentVote = await this.$axios.$get('/api/get-vote', {
        params: {
          voteId: this.voteId
        }
      });

      this.vote = {
        title: currentVote.heading,
        description: currentVote.description,
        votePositive: formatCryptoAmount(currentVote.votePositive, 'wei'),
        voteNegative: formatCryptoAmount(currentVote.voteNegative, 'wei'),
        startDate: luxon.DateTime.fromMillis(parseInt(currentVote.timestamp) * 1000).toFormat('y-MM-dd HH:mm'),
        endDate: luxon.DateTime.fromMillis(parseInt(currentVote.timestamp) * 1000).plus({weeks: 1}).toFormat('y-MM-dd HH:mm'),
        active: luxon.DateTime.fromMillis(parseInt(currentVote.timestamp) * 1000).plus({weeks: 1}) > luxon.DateTime.now() ? true : false,
        voteId: currentVote.voteId,
        valid: currentVote.valid
      }

      if (this.currentAccount) {
        this.getVoteAttendances()
      }
      return true
    },
    methods: {
      async getVoteAttendances() {
        if (this.currentAccount) {
          const currentVoteAttendances = await this.$axios.$get('/api/get-vote-attendances', {
            params: {
              address: this.currentAccount,
              voteId: this.voteId
            }
          });

          this.voteAttendances = [];

          const ethUtils = window.web3.utils

          currentVoteAttendances.forEach(element => {
            this.voteAttendances.push({
              voteId: element.voteId,
              address: element.address,
              amount: formatCryptoAmount(element.amount, 'wei'),
              attendanceId: element.attendanceId,
              lockWeeks: element.lockWeeks,
              position: element.position == 1 ? 'For' : 'Against',
              date: luxon.DateTime.fromMillis(parseInt(element.timestamp) * 1000).toFormat('y-MM-dd HH:mm'),
              totalWeight: formatCryptoAmount(element.totalWeight, 'wei'),
              withdrawn: element.withdrawn,
            })

            this.totalAmount = this.totalAmount + parseInt(element.amount)
            this.totalWeight = new Decimal(this.totalWeight).add(new Decimal(element.totalWeight))
          });
          this.totalAmount = formatCryptoAmount(this.totalAmount, 'wei')
          this.totalWeight = formatCryptoAmount(this.totalWeight, 'wei')
        }
      }
    }
  }
</script>

<style>
pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>