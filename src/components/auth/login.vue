<script>
	import Form from '@Form/base-form'
	export default {
		extends: Form,

		data: () => ({
			build: ({
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
			})
		}),

		methods: {
			submit(form) {
				if (this.fails(form)) return
				
				console.log(form.only('email', 'password'))
			},

			fails(form) {
				if (!form.has('email', 'password') || form.empty('email', 'password')) {
					window.alert('whoops form not populate correcectly, try again!')				
				
					return false
				}	
			},

		}
	}
</script>	
