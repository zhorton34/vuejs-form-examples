<template>
    <form class='form' @submit.prevent>
        <h1>{{ title }}</h1>

        <input v-model="form.name" placeholder="Name" />

        <input type='checkbox' v-model="form.terms_of_service" />

        <button :disabled='form.empty()' @click="submit">
            Submit
        </button>

        <live-editor/>
    </form>
</template>

<script>
	import form from 'vuejs-form'

	export default {
		name: 'boolean',

		data: () => ({
			form: form({ name: '', email: '' })
		}),

		methods: {
			submit() {
				console.log("Form Input: ", this.form.all());
			}
		}
	}
</script>
