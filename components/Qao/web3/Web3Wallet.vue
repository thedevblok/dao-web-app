<template>
  <div class="d-inline-flex align-items-center">
    <base-button v-if="!providerName" @click="initializeWallet" simple size="sm" type="info">Connect</base-button>
    <base-button v-else @click="disconnectWallet" simple size="sm" type="info">Disconnect</base-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Web3 from 'web3'
import qaoAbi from '@/contracts/qaoAbi'
import qaoVotingEngineAbi from '@/contracts/qaoVotingEngineAbi'

export default {
  name: 'Web3Wallet',
  props: {
    fullWallet: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      web3: null,
      provider: null,
      address: null,
    }
  },
  computed: {
    ...mapGetters({
      atLeastOneConnectedAccount: 'atLeastOneConnectedAccount',
      providerName: 'getProviderName',
      networkName: 'getNetworkName'
    }),
  },
  mounted() {
    if (window.localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      this.initializeWallet()
    }
  },
  methods: {
    async initializeWallet() {
      try {
        window.provider = await this.$web3Modal.connect()
        window.web3 = new Web3(window.provider)
        window.qaoContract = new window.web3.eth.Contract(
          qaoAbi.abi,
          process.env.QAO_TOKEN_ADDRESS
        )
        window.qaoVotingEngineContract = new window.web3.eth.Contract(
          qaoVotingEngineAbi.abi,
          process.env.QAO_VOTING_ENGINE_ADDRESS
        )

        await this.getProviderMetadata()

        window.provider.on('accountsChanged', async () => {
          await this.getProviderMetadata()
        })

        window.provider.on('chainChanged', async () => {
          await this.getProviderMetadata()
        })

        window.provider.on('disconnect', async () => {
          await this.getProviderMetadata()
        })

        window.provider.on('connect', async () => {
          await this.getProviderMetadata()
        })
      } catch (e) {
        this.disconnectWallet();
        let currentError = e.message ? e.message : e
        this.$swal.fire({
          title: 'Error',
          text: currentError,
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-danger btn-fill',
          },
        })
      }
    },
    async getProviderMetadata() {
      try {
        const accounts = await window.web3.eth.getAccounts()
        const networkId = await window.web3.eth.net.getId()
        const providerName = await this.getProviderName()
        const networkName = await this.getNetworkName()
        let qaoApprovalLimit = 0

        let qaoBalance = '0'
        let ethBalance = '0'
        let account = null
        let connectedAccounts = 0

        if (accounts.length > 0) {
          ;[account] = accounts
          connectedAccounts = accounts.length
        }

        if ((await this.contractIsDeployedOnNetwork()) && accounts.length > 0) {
          const notWeiQaoBalance = await window.qaoContract.methods
            .balanceOf(account)
            .call()
          const notWeiEthBalance = await window.web3.eth.getBalance(account)
          qaoApprovalLimit = await window.qaoContract.methods
            .allowance(account, process.env.QAO_VOTING_ENGINE_ADDRESS)
            .call()

          this.$store.dispatch('triggerQaoApprovalLimit', qaoApprovalLimit)
          qaoBalance = await window.web3.utils.fromWei(
            notWeiQaoBalance,
            'ether'
          )
          ethBalance = await window.web3.utils.fromWei(
            notWeiEthBalance,
            'ether'
          )
        }

        const providerMetadata = {
          qaoBalance,
          ethBalance,
          account,
          networkName,
          providerName,
          networkId,
          connectedAccounts,
          qaoApprovalLimit,
        }

        this.$store.dispatch('syncProvider', providerMetadata)
      } catch (e) {
        let currentError = e.message ? e.message : e
        this.$swal.fire({
          title: 'Error',
          text: currentError,
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-danger btn-fill',
          },
        })
      }
    },
    async contractIsDeployedOnNetwork() {
      try {
        await window.qaoContract.methods.symbol().call()
        return true
      } catch (e) {
        return false
      }
    },
    async getProviderName() {
      if (await window.provider.isMetaMask) return 'MetaMask'
      else return 'WalletConnect'
    },
    async getNetworkName() {
      const networkId = await window.web3.eth.net.getId()
      switch (networkId) {
        case 1:
          return 'Mainnet'
        case 2:
          return 'Morden'
        case 3:
          return 'Ropsten'
        case 4:
          return 'Rinkeby'
        case 5:
          return 'Goerli'
        case 42:
          return 'Kovan'
        default:
          return 'Unknown'
      }
    },
    async disconnectWallet() {
      window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
      await this.$web3Modal.clearCachedProvider();
      window.web3 = null;
      window.provider = null;
      this.$store.commit('removeProvider');
    },
  },
}
</script>
<style lang="scss">
.web3modal-modal-lightbox {
  z-index: 999999 !important;
  font-family: 'arial';
}
.web3modal-provider-description {
  font-size: 0.7rem;
  margin-top: 1rem;
}
a:hover {
  cursor: pointer;
}
</style>
