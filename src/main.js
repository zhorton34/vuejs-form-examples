import '@TailwindCSS'
import Vue from 'vue'
import axios from 'axios'
import DashboardView from '@View/dashboard'

const project = { render: created => created(DashboardView) }

new Vue(project).$mount('#app')
