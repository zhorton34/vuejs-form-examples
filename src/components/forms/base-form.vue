<template>
    <form class='form'>
        <h1>{{ form.display.title }}</h1>

        <input v-for='(field, key) in form.fields' :key="`${field.name}.index`" 
            v-model='form.input[field.name]' 
            v-bind='field' 
        />

        <button @click.prevent="submit(form)">
            {{ form.display.button }}
        </button>
    </form>
</template>

<script>
    export default {
        name: 'base-form',

        data: () => ({
            build: {
                display: {
                    title: 'Login',
                    button: 'Login'
                },

               input: { 
                    email: '', 
                    password: '' 
                },

                fields: [
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'password', placeholder: 'Password', type: 'text' },
                ],
            },      
        }),

        created() {
            window.form = this.form
        },
        computed: {
            form() {
                const form = { ...this.build }

                form.only = (...keys) => {
                    let check

                    if (Array.isArray(keys)) {
                        check = Array.isArray(keys[0]) ? keys[0] : keys
                    } else {
                        check = [keys]
                    }
                    
                    return Object.keys(this.build.input)
                        .filter(name => check.includes(name))
                        .reduce((only, field) => ({ 
                            [field]: this.build.input[field], 
                            ...only 
                        }), {})
                }

                form.prependField = (field) => {
                    this.build.input[field.name] = ''

                    this.build.fields = [field, ...form.fields]
                
                    this.$forceUpdate()

                }

                form.appendField = (field) => {
                    this.build.input[field.name] = ''

                    this.build.fields = [...this.build.fields, field]
                
                    this.$forceUpdate()
                }

                form.replaceField = (field) => {
                    this.build.fields = this.build.fields.map(current => current.name === field.name ? field : current)
                
                    this.$forceUpdate()
                }

                form.updateField = (field) => {
                    this.build.fields = this.build.fields.map(current => current.name === field.name ? ({...current, ...field }) : current)

                    this.$forceUpdate()
                }

                form.forgetField = (name) => {
                    this.build.fields = [ ...this.build.fields.filter(field => field.name !== name) ]

                    const input = { ...this.build.input }

                    delete input[name]

                    this.build.input = { ...input }

                    this.$forceUpdate()
                }

                form.has = (...keys) => {
                    let check

                    if (Array.isArray(keys)) {
                        check = Array.isArray(keys[0]) ? keys[0] : keys
                    } else {
                        check = [keys]
                    }

                    return Object.keys(this.build.input).filter(name => keys.includes(name)).length === keys.length
                }

                form.empty = (...keys) => {
                    let check

                    if (Array.isArray(keys)) {
                        check = Array.isArray(keys[0]) ? keys[0] : keys
                    } else {
                        check = [keys]
                    }

                    return check.map(name => this.build.input[name]).filter(
                        value => 0 === value.length 
                        || /^\s*$/.test(value) 
                        || value === null 
                        || typeof value === undefined)
                    .length === check.length
                }

                const proxy = new Proxy(form, {
                    get (target, key) {
                        if (!key || key === 'all') {
                            return target.input
                        }

                        if (Object.keys(target.input).includes(key)) {
                            return target.input[key]
                        }

                        return target[key]
                    },

                    set (target, key, value) {
                        if (Object.keys(target.input).includes(key)) {
                            target.input[key] = value
                        }

                        else {
                            target[key] = value
                        }
                    }
                })


                
                return proxy
            }
        },

        methods: {
            submit(form) {
                console.log(form.name)
            }
        }
    }
</script>