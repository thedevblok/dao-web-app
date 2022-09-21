<template v-if="account">
<v-container class="qao-ui">
  <qao-header-bar />
  <v-row class="middle ecosystem">
    <v-col cols=12>
      <vote-view :vote-id="voteId" />
    </v-col>
  </v-row>
  <v-row class="bottom">
  </v-row>
</v-container>
</template>

<script>
import VoteView from '@/components/Qao/vote/VoteView.vue'

export default {
  components: {
    VoteView,
    
  },
  data () {
    return {
      voteId: this.$route.params.id
    }
  }
}
</script>

