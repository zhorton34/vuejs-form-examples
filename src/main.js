import '@TailwindCSS'
import Vue from 'vue'
import DashboardView from '@View/dashboard'

const project = { render: created => created(DashboardView) };

import LiveEditor from '@Form/live-editor';

Vue.component('live-editor', LiveEditor);
Vue.mixin({
	computed: {
		title: $this => $this.$options.name
			.replace(/_/g, ' ')
			.replace(/-/g, ' ')
			.split(' ')
			.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
			.join(' ')
	}
});

new Vue(project).$mount('#app');

