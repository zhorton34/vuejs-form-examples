import Vue from 'vue'
import App from './App.vue'

/**
 * Register Global Filters To Vue
 */
import './global/filters.js'

/**
 * Register Global Components To Vue
 */
import './global/components.js'

// Mount App Component To Dom Where <element id='app'></element>
new Vue({ render: h => h(App) }).$mount('#app')
