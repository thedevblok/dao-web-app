<template>
  <div class="ticker-metric d-flex flex-column mb-2">
    <label>{{ label }}</label>
    <p class="font-weight-600"><small :class="classes">{{ formattedValue }}</small></p>
  </div>
</template>
<script>

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isColored: {
      type: Boolean,
      required: false,
    },
    format: {
      type: String,
      validator(value) {
        return ['raw', 'rank', 'percentage', 'money'].includes(value)
      },
      required: true,
    }
  },
  computed: {
    classes() {
      if(this.isColored) {
        return {[this.value < 0 ? 'text-danger' : 'text-success']: true};
      } else {
        return {};
      }
    },
    formattedValue() {
      switch (this.format) {
        case 'raw':
          return this.value;
        case 'rank':
          return '#' + this.value;
        case 'percentage':
          return this.value + '%';
        case 'money':
          return new Intl.NumberFormat('en-US', {
            notation: "compact",
            compactDisplay: "short",
            style: 'currency',
            currency: 'USD'
          }).format(this.value);
      }
      return this.value;
    }
  }
}

</script>
<style lang="scss">
.ticker-metric {
  label {
    margin-bottom: 0;
  }
}
</style>