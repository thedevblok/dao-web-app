<template>
  <div class="vote-list-holder">
    <div class="row text-center">
      <div class="col-12">
        <h1 class="main-title mb-1"> Mint GlobeHeads NFT <nuxt-link to="/nft/collection/globeheadsnft" class="btn btn-success btn-simple ml-2">Back</nuxt-link></h1>
      </div>
    </div>
    <div class="row mx-auto text-center" style="max-width: 760px;">
      <div class="col-12 text-center" v-if="!currentAccount">
        <h3 class="mt-5">You must connect a wallet in the top right corner</h3>
      </div>
      <div v-else class="col-12">
          <h3 class="sub-title mt-4">Please choose your package.</h3>
          <div class="row mx-auto text-center" style="max-width: 760px;">
            <div v-if="selectedPackage.price" class="col-12">
              <hr/>
              <h2>Selected package: {{ selectedPackage.title }}</h2>
              <h2>Price: {{ selectedPackage.price }} {{ selectedPackage.currency }}</h2>
              <h4>To pay for your package, please send exactly {{ selectedPackage.price }} {{ selectedPackage.currency }} to the following ETH address:</h4>
              <h3 class="font-weight-bold my-5">
                {{ buyAddress }}
                <a @click="copy(buyAddress)" class="btn btn-success btn-simple ml-2">
                  <span v-if="copied">Copied</span>
                  <span v-else>Copy</span>
                </a>
              </h3>
              <h4>Once the transaction is confirmed on the blockchain, you will be able to see your NFTs on your <nuxt-link to="view">GlobeHeadsNFT View page</nuxt-link></h4>
              <a @click="resetBuyChoice()" class="card-link info btn btn-info btn-simple mt-5">Change package</a>
            </div>
            <div
              v-else
              v-for="packageOption in packageOptions"
              :key="packageOption.id"
              class="col-12 col-md-6 mb-4"
            >
              <Card
                class="h-100 text-center "
              >
                <div class="row h-100">
                  <div class="col-12 d-flex flex-column justify-content-between">
                    <div>
                      <h3 class="card-title">{{ packageOption.title }} </h3>
                      <h5 class="card-text flex-grow-1">Price: {{ packageOption.price }} {{ packageOption.currency }}</h5>
                    </div>
                    <div>
                      <a @click="triggerBuyChoice(packageOption.title, packageOption.price, packageOption.currency)" class="card-link info btn btn-info btn-simple">Choose option</a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Cards/Card.vue';

export default {
  components: {
    Card
  },
  data() {
    return {
      copied: false,
      buyAddress: "0x4c3EFd41160E13D6d12002a1Aca923876B7Ef50f",
      selectedPackage: {
          title: null,
          price: null,
          currency: null
      },
      packageOptions: [
        {
          id: 1,
          title: '1 GlobeHead',
          price: 0.06,
          currency: 'ETH'
        },
        {
          id: 2,
          title: '3 GlobeHeads',
          price: 0.18,
          currency: 'ETH'
        },
        {
          id: 3,
          title: '5 GlobeHeads',
          price: 0.3,
          currency: 'ETH'
        },
        {
          id: 4,
          title: '10 GlobeHeads',
          price: 0.6,
          currency: 'ETH'
        },
        {
          id: 5,
          title: '50 GlobeHeads',
          price: 3.00,
          currency: 'ETH'
        },
        {
          id: 6,
          title: '100 GlobeHeads',
          price: 6.00,
          currency: 'ETH'
        }
      ]
    }
  },
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
  methods: {
    triggerBuyChoice(title, price, currency) {
      this.selectedPackage = {
        title: title,
        price: price,
        currency: currency
      }
    },
    resetBuyChoice() {
      this.selectedPackage = {
        title: null,
        price: null,
        currency: null
      }
    },
    copy(text) {
      const self = this
      navigator.clipboard.writeText(text);
      this.copied = true
      const w = setTimeout(function() {
        self.copied = false
      }, 1000)
    }
  }
}
</script>