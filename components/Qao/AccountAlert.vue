<template>
  <div v-if="atLeastOneConnectedAccount">
    <v-alert class="custom-alert" dense border="left" type="warning">
      We noticed that you did not have any connected account in
      {{ providerName }}, please connect at least one account.
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      atLeastOneConnectedAccount: 'atLeastOneConnectedAccount',
      providerName: 'getProviderName',
    }),
  },
}
</script>
<style lang="scss">
.custom-alert {
  font-family: 'goblin';
}
</style>
