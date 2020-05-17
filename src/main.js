import '@TailwindCSS'
import Vue from 'vue'
import DashboardView from '@View/dashboard'
import LiveEditor from '@Api/support/live-editor.vue';

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

Vue.component('live-editor', LiveEditor);

const project = { render: created => created(DashboardView) };


new Vue(project).$mount('#app');

