<template>
  <card v-if="qaoBalance">
    <base-input
      v-model="qaoBalance"
      addon-left-icon="tim-icons icon-single-02"
      label="AQA Balance"
    />
    <base-input
      v-model="account"
      addon-left-icon="tim-icons icon-single-02"
      label="Account"
    />
  </card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      qaoBalance: "getQaoBalance",
      account: "getAccount",
    }),
  },
};
</script>
