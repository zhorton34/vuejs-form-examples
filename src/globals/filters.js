import Vue from 'vue'

Vue.filter('capitalize', string => string.charAt(0).toUpperCase() + string.slice(1))