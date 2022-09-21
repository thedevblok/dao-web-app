<template>
<div class="vote-list-holder">
    <div class="row text-center">
      <div class="col-12">
        <h1 class="main-title mb-1"> Your GlobeHeads Profile <nuxt-link to="/nft/collection/globeheadsnft" class="btn btn-success btn-simple ml-2">Back</nuxt-link> </h1>
      </div>
    </div>
    <div class="row mx-auto text-center" style="max-width: 760px;">
      <div class="col-12">
          <h3 class="sub-title mt-4">You will see your transactions and NFTs below</h3>
          <div v-if="!currentAccount">
            <h3 class="ml-6">You must connect a wallet</h3>
          </div>
          <div v-else-if="transactions.length > 0">
            <h2>Your Transactions</h2>
            <el-table :data="transactions">
              <el-table-column
                min-width="150"
                label="From"
                property="from"
              ></el-table-column>
              <el-table-column
                min-width="100"
                label="Amount"
                property="amount"
              ></el-table-column>
              <el-table-column
                min-width="100"
                label="Processed"
                property="processed"
                :formatter="cellValueRenderer"
              ></el-table-column>
            </el-table>
            <hr/>
            <h2 class="pb-0 mb-4">Your NFTs</h2>
            <h6 v-if="nftList.length == 0">No NFT yet</h6>
            <div v-else class="row">
              <div v-for="nft in nftList" :key="nft.edition" class="col-12 col-sm-6 col-md-4 p-2 mb-2">
                <h4 class="mb-2 pb-0">{{ nft.name }}</h4>
                <img :src="nft.imageUrl" class="img-responsive" />
                <p v-if="!nft.minted" style="color:red;" class="my-2">Not minted yet</p>
                <div v-else>
                  <a :href="nft.openSeaUrl" class="btn btn-success btn-simple my-2" target="_blank">View on Open Sea</a>
                  <p v-if="!nft.transferred" style="color:yellow;" class="my-2">Not transfered yet</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h3 class="ml-6">No transaction yet</h3>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import formatCryptoAmount from '@/util/utils.js'
  import { Table, TableColumn } from 'element-ui'

  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data: () => ({
      transactions: [],
      nftList: [],
      loading: false
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
          this.getTransactions()
          this.getNftList()
        }
      }
    },
    async mounted() {
      await this.getTransactions();
      await this.getNftList();
    },
    methods: {
      cellValueRenderer(row, column, cellValue, index) {
        let value = cellValue;
        if (typeof row[column.property] === 'boolean') {
            value = String(cellValue);
        }
        return value;
      },
      async getTransactions() {
        if (this.currentAccount) {
          const currentTransactions = await this.$axios.$get('/api/get-eth-transactions', {
            params: {
              address: this.currentAccount
            }
          });

          this.transactions = [];

          currentTransactions.forEach(element => {
            this.transactions.push({
              from: element.from,
              amount: formatCryptoAmount(element.amount, 'wei'),
              processed: element.processed
            })
          });

        }
      },
      async getNftList() {
        if (this.currentAccount) {
          const nftList = await this.$axios.$get('/api/get-nft-list', {
            params: {
              address: this.currentAccount
            }
          });

          this.nftList = [];

          nftList.forEach(element => {
            this.nftList.push({
              editionNumber: element.editionNumber,
              name: element.name,
              minted: element.minted,
              transferred: element.transferred,
              imageUrl: element.imageUrl,
              openSeaUrl: element.openSeaUrl
            })
          });

        }
      }
    }
  }
</script>

<style>
.el-table th.el-table__cell {
  background-color: transparent !important;
}
</style>
