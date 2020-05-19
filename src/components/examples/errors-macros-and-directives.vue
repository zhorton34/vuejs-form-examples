<template>
    <form class='form' @submit.prevent>
        <h1>{{ title }}</h1>

        <input v-model="form.email" placeholder="Email" />
        <input v-model="form.password" placeholder="Password" />
        <input v-model="form.password_confirmation" placeholder="Password Confirmation" />

        <button @click="submit">
            Submit
        </button>

        <live-editor />
    </form>
</template>

<script>
    import form from 'vuejs-form'

    export default {
        name: 'errors-macros-and-directives',

        data: () => ({
            form: form({
                email: null,
                password: null,
                password_confirmation: null,
            })
            .rules({
                email: 'required|email',
                password: 'required|min:5|confirmed',
                password_confirmation: 'required|min:5|same:password'
            })
        }),

        methods: {
            submit() {
            	if (this.form.validate().errors().any()) return;


                console.log("Form Input: ", this.form.all());
            }
        }
    }
</script>
