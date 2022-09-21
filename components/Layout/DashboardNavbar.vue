<template>
<div>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <a class="navbar-brand">{{ routeName }}</a>
    </div>
  </base-nav>
  <web3-wallet class="header-wallet"></web3-wallet>
</div>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import SidebarToggleButton from './SidebarToggleButton';
import Web3Wallet from "~/components/Qao/web3/Web3Wallet";

export default {
  components: {
    SidebarToggleButton,
    CollapseTransition,
    BaseNav,
    Modal,
    Web3Wallet,
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split('/')
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style lang="scss" scoped>
.top-navbar {
  top: 0px;
}

.header-wallet {
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 10000;
}

.wallet {
  background: #FFFFFF00;
  transition: background-color .3s ease;
  &:hover {
    background: #FFFFFF08
  }
}

.wallet-dropdown {
  ul {
    background-color: #525f7f;
  }
  .wallet-popup {
    padding: 20px;
    height: 256px;
    width: 280px;
  }
}
.lock {
  color: white;
  font-size: 25px;
  &.big {
    font-size: 80px;
  }
}
</style>
