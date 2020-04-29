<script>
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


	import Form from '@Form/base-form'
	
	export default {
		extends: Form,

		data: () => ({
            text: { title: 'Login', button: 'Login' },

            validator: ({
                email: 'min:8|email|required',
                password: 'min:8|required'
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
		}),
	}
</script>	
