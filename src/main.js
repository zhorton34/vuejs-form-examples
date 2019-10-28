import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './globals/components.js'
import './globals/directives.js'
import './globals/filters.js'
import './globals/mixins.js'
import './globals/events.js'

new Vue({ render: h => h(App) }).$mount('#app')
