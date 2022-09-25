<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
    <side-bar :background-color="sidebarBackground">
      <template slot-scope="props" slot="links">
        <sidebar-item
          :link="{
            name: 'Ecosystem',
            icon: 'tim-icons icon-components',
            path: '/',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Contribute',
            icon: 'tim-icons icon-coins',
            path: 'https://dao.aqifi.com',
            external: true,
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Statistics',
            icon: 'tim-icons icon-chart-bar-32',
            path: '/stats',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Voting',
            icon: 'tim-icons icon-bullet-list-67',
            path: '/vote',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Staking stats',
            icon: 'tim-icons icon-lock-circle',
            path: '/staking-pool',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div :class="{ content: !isFullScreenRoute }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <nuxt />
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute"></content-footer>
    </div>
    <play-sound />
  </div>
</template>
<script>
/* eslint-disable no-new */
import SidebarShare from "@/components/Layout/SidebarSharePlugin";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardContent from "@/components/Layout/Content.vue";
import ContentFooter from "@/components/Layout/ContentFooter.vue";
import DashboardNavbar from "@/components/Layout/DashboardNavbar.vue";
import SidebarFixedToggleButton from "@/components/Layout/SidebarFixedToggleButton.vue";
import PlaySound from "@/components/Qao/PlaySound.vue";
import { SlideYDownTransition, ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition,
    SidebarShare,
    PlaySound,
  },
  data() {
    return {
      sidebarBackground: "blue", //vue|blue|orange|green|red|primary
    };
  },
  computed: {
    isFullScreenRoute() {
      return this.$route.path === "/maps/full-screen";
    },
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("sidebar");
        initScrollbar("main-panel");
        initScrollbar("sidebar-wrapper");

        docClasses.add("perfect-scrollbar-on");
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
