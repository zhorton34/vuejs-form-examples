import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './global/components.js';
import './global/filters.js';

new Vue({
  render: h => h(App),
}).$mount('#app')
