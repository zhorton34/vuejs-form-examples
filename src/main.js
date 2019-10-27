import Vue from 'vue'
import App from './App.vue'
import ExampleBox from './slots/example-box.vue'

Vue.config.productionTip = false
Vue.component('example-box', ExampleBox);


new Vue({ render: h => h(App) }).$mount('#app')
