<template>
    <form class='form' @submit.prevent>
        <h1>{{ title }}</h1>

        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.email" placeholder="Email" />

        <button :disabled='form.empty()' @click="submit">
            Submit
        </button>

        <live-editor/>
    </form>
</template>

<script>
    import form from 'vuejs-form'

    export default {
        name: 'example-two',

        data: () => ({
            form: form({ name: '', email: '' })
        }),

        methods: {
            submit(form) {
                console.log("Form Input: ", this.form.all());
            }
        }
    }
</script>
