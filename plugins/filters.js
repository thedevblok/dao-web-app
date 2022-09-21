import Vue from "vue"
import { DateTime } from 'luxon'

Vue.filter('formatDate', function(value) {
  if (value) {
    return DateTime.fromISO(value).toFormat('ff')
  }
})