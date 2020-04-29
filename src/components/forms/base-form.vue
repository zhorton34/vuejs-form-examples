<template>
    <form class='form'>
        <danger-alert v-for="(message, index) in messages.errors" :key="`${index}.error`" v-if="messages.errors.length > 0" :message='message'>
        </danger-alert>

        <h1>{{ text.title }}</h1>



        <input v-for='(field, key) in form.fields' :key="`${field.name}.index`" 
            v-model='form.input[field.name]' 
            v-bind='field'
        />

        <button @click.prevent="submit(form)">
            {{ text.button }}
        </button>
    </form>
</template>

<script>
    import Vue from 'vue'
    import DangerAlert from '../alerts/danger.vue'
    const CONSTANT_RULES = {
        boolean: {
            rule: ({ value }) => typeof value === 'boolean',
            message: ':attribute must be a boolean'
        },

        required: {
            rule: ({ value }) => [null, undefined, ''].includes(value) === false,
            message: `:attribute may not be null`
        },    
                
        email: {
            rule: ({ value }) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)),
            message: `:attribute must be an email`
        },

        phone: {
            rule: ({ value }) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
            message: `:attribute must be a phone number`
        },

        'max:limit': {
            rule: ({ value, limit }) => value.length <= limit,
            message: `:attribute must have at least :limit characters`
        },

        'min:limit': {
            rule: ({ value, limit }) => value.length >= limit,
            message: `:attribute must at least :limit characters`
        }
    }

    export default {
        name: 'base-form',

        components: { DangerAlert },

        data: () => ({
            text: { title: 'Login', button: 'Login' },

            validator: ({
                email: ['min:8'],
                password: ['min:8']
            }),

            build: {
                input: { 
                    email: '', 
                    password: '' 
                },

                fields: [
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'password', placeholder: 'Password', type: 'text' },
                ],
            },

            messages: {
                errors: []
            }       
        }),

        computed: {
            errors() {
                const check = objects => Object.keys(objects).map(v => ({ name: v, value: objects[v] }))

                // rule: ['min:40', 'max:50', etc...] (rules with ':')
                const filtered = ({ name, value, base, extra }) => {
                    const keys = Object.keys(CONSTANT_RULES)
                    const [key, filter] = keys.find(name => name.includes(base, ':')).split(':')

                    const checks = { value, [filter]: extra }
                    const { rule, message } = CONSTANT_RULES[`${key}:${filter}`]

                    return rule(checks) ? '__passed' : message.replace(':attribute', name).replace(`:${filter}`, extra)
                }

                // rule: ['email', 'required', 'string'] (rules without ':' filter)
                const normal = ({ name, value, base }) => {
                    const { rule, message } = CONSTANT_RULES[base]

                    return rule({ value }) ? '__passed' : message.replace(':attribute', name)
                }   

                const factory = ({ name, value }) => {
                    console.log({ name, value })
                    let validate = this.validator[name] 
                    let rules = Array.isArray(validate) ? validate : validate.split('|')

                    return rules.map(rule => rule.includes(':') 
                        ? filtered({ name, value, base: rule.split(':')[0], extra: rule.split(':')[1] }) 
                        : normal({ name, value, base: rule.split(':')[0] })
                    )
                }

                const validate = Object.keys(this.validator)                
                const validation = check(this.form.only(validate))


                return validation.map(factory).reduce((messages, group) => [
                        ...messages, 
                        ...group
                    ], 
                []).filter(message => message != '__passed')                
            },

            form() {
                const $this = this

                const bind = {
                    names: () => Object.keys($this.build.input),

                    parameter: keys => Array.isArray(keys) 
                            ? Array.isArray(keys[0]) ? keys[0] : keys
                            : [keys],

                    input(name, value) {
                        if (value === '__delete') {
                            delete $this.build.input[name]
                        } else {                    
                            $this.build.input[name] = value    
                        }

                        return bind 
                    },


                    fields(value, name = false) {
                        $this.build.fields = name 
                            ? $this.builds.fields.map(field => field.name === name ? value : field)
                            : value 

                        return bind 
                    },

                    updateField(update) {
                        $this.build.fields = $this.builds.fields.map(field => field.name === update.name ? ({
                            ...field,
                            ...update // merge current field with updated field
                        }) : field )

                        return bind
                    },

                    $forceUpdate: () => $this.$forceUpdate()
                }

                const form = { 
                    ...this.build,

                    /** 
                     * form.only('email', 'name') 
                     * 
                     * { email: 'example@name.com', name: 'jenal' } 
                     */
                    only: (...keys) => bind.names().filter(name => bind.parameter(keys).includes(name)).reduce(
                        (only, field) => ({ 
                            [field]: $this.build.input[field], 
                            ...only 
                        }), 
                    {}),
            
                    /**
                     * form.prepend({ name: 'Address', value: '5534 nw en street', placeholder: 'Address', class: 'location', type: 'text' })
                     *
                     * Example: Add Form Input Key And Prepends Field Object To form.fields 
                     * form.fields: [AddressField, ...ExistingFields]
                     * form.input: { address: '5534 nw en street', email: 'example@name.com', name: 'jenal' }
                     */                     
                    prepend: field => bind.input(field.name, field.value || '').fields([ field, ...$this.build.fields ]).$forceUpdate(),

                    /**
                     * form.append({ name: 'Address', value: '5534 nw en street', placeholder: 'Address', class: 'location', type: 'text' })
                     *
                     * Example: Add Form Input Key And Appends Field Object To form.fields 
                     * form.fields: [...ExistingFields, AddressField]
                     * form.input: { email: 'example@name.com', name: 'jenal', address: '5534 nw en street' }
                     */ 
                    append: field => bind.input(field.name, field.value || '').fields([ ...$this.build.fields, field ]).$forceUpdate(),

                     /**
                     * form.replace({ name: 'Address', value: '3sdfse street', placeholder: 'Update Address', class: 'change-css-class', type: 'text' })
                     *
                     * Example: Replace Current Field Based On Field Name (Works well for updating Css/Scss)
                     * WARNING: **completely REPLACES field**  
                     */ 
                    replace: field => bind.fields(field, field.name).$forceUpdate(),

                     /**
                     * form.update({ class: 'change-cool-css-class', name: 'name-field-is-required' })
                     *
                     * Example: Update Field Based On Field Name (Works well for updating Css/Scss)
                     * REQUIRES NAME FIELD  
                     */ 
                    update: field => bind.updateField(field).$forceUpdate(),

                    /**
                     * form.forget('name')
                     *
                     * Example Input: { email: 'exsdf@g.com', address: '233sdf' } // name input key and value were removed
                     * Example Fields: [EmailField, AddressField] // Name Field Was Removed
                     */
                    forget: field_by_name => bind.fields($this.build.fields.filter(field => field.name !== field_by_name)).input(field_by_name, '__delete').$forceUpdate(),


                    /**
                     * form.has('email', 'address')
                     *
                     * Determnes if the fields and form input exist on the given form 
                     */
                    has: (...keys) => bind.parameter(keys).filter(name => bind.names().includes(name)).length === bind.parameter(keys).length,

                    /**
                     * form.empty('email', 'address')
                     *
                     * Fields must exist on the form, but this checks if the given input values are empty (Empty string)
                     */
                     empty: (...keys) => bind.parameter(keys).map(name => $this.build.input[name])
                        .filter(value =>
                            0 === value.length 
                            || /^\s*$/.test(value) 
                            || value === null 
                            || typeof value === undefined
                        )
                        .length === bind.parameter(keys),

                    /**
                     * form.errors()
                     *
                     * ["Email is required", "address fails", 'etc...']
                     */ 
                     errors: () => $this.errors,


                    /**
                     * Determine if any form rules are currently failing
                     * 
                     * (bool)
                     */
                    hasErrors: () => $this.errors.length > 0
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
            failed(form) {
                console.log('failed')
            },
            passed(form) {
                console.log('passed')
            },
            validated(form) {
                this.messages.errors = this.errors 

                return this.errors.length < 1
            },
            submit(form) 
            {
                this.messages.errors = []

                if (this.validated(form)) {
                    this.passed(form)
                } else {
                    this.failed(form)
                }
            }
        }
    }
</script>