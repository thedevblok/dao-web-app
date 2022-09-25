<template>
  <Card class="h-100">
    <div class="row h-100">
      <div class="col-12 d-flex flex-column justify-content-between" v-if="title || description">
        <div>
          <div class="d-flex justify-content-between">
            <h3 v-if="title" class="card-title">{{ title }} </h3>
            <span v-if="comingSoon">
              <badge type="warning">Coming soon</badge>
            </span>
          </div>
          <p class="card-text flex-grow-1">{{ description }}</p>
        </div>
        <div>

          <nuxt-link v-if="page || disabled" :to="disabled ? '#' : page" class="pull-right card-link info btn btn-info btn-simple" :class="{disabled: disabled}" simple size="sm">Open</nuxt-link>
          <a v-else :href="link" target="_blank" class="pull-right card-link info btn btn-info btn-simple">Open</a>
          <a  v-if="secondLink" :href="secondLink.link" target="_blank" class="pull-right card-link info btn btn-info btn-simple">{{secondLink.title}}</a>

        </div>
      </div>
    </div>
  </Card>
</template>
<script>
import Badge from '../Badge.vue';
import Card from './Card.vue';

export default {
  name: 'page-card',
  components: {
    Card,
    Badge,
  },
  props: {
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comingSoon: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    page: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    secondLink: {
      type: Object,
      required: false
    }
  }
};
</script>
<style></style>
