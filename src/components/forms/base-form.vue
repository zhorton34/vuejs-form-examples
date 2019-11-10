<template>
    <form class='form'>
        <h1 v-href='"https://google.com"'>{{ form.title | capitalize }}</h1>
        <input v-for='(field, key) in form.fields' 
            :key="`field.${key}`" 
            :type='field.type'
            :placeholder='field.placeholder'
            v-model='form.input[field.key]'
        />

        <base-button v-on:onClick='save' :text='`Save ${form.title}`' />
    </form>
</template>

<script>
    // parent component
    import BaseButton from '@Button/base-button'
    import MixinLifeCycleHooks from './life-cycle-hooks.mixin.js'
    export default {
        name: 'base-form',
        mixins: [MixinLifeCycleHooks],
        components: { BaseButton },
        filters: {
            capitalize: string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`,
        },
        directives: {
            href(el, binding, vnode) {
                el.onclick = () => window.location = binding.value
            }
        },
        data() {
            return {
                form: {
                    title: 'base form',
                    fields: [
                        {
                            key: 'name',
                            type: 'text',
                            placeholder: 'Name'
                        },
                        {
                            key: 'email',
                            type: 'email',
                            placeholder: 'Email'
                        },
                        {
                            key: 'city',
                            type: 'text',
                            placeholder: 'City Location'
                        },
                    ],
                    input: {
                        name: null,
                        email: null,
                        city: null,
                    }
                },
            }
        },

        methods: {
            onFormChange(updated, old) {
                // console.log('onFormChange method referenced in watcher: ', { updated, old })
            },
            save() {
                this.form.input.name = '"Mutate" to trigger the beforeUpdate and updated life cycle hooks'
                console.log("Form Input:", this.form.input)
            }
        },
        watch: {
            form: {
                deep: true,
                immediate: true,
                handler: 'onFormChange',
            }   
        }
    }
</script>