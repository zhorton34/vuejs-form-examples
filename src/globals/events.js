import Vue from 'vue'

window.Event = new Vue()
Event.fire = Event.$emit
Event.listen = Event.$on
Event.forget = Event.$off
Event.listenOnce = Event.$once

Vue.Event = Event