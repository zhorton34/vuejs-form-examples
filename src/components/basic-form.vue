<template>
  <form class='form'>	
	<h1> {{ title | capitalize }} </h1>

  	<input type='text' name='name' placeholder="Name" />
  	<input type='email' name='email' placeholder="Email" />
  	<input type='text' name='phone_number' placeholder="Phone Number"/>
  	<button type='submit'>
  		Save {{ title }}
  	</button>
  </form>
</template>

<script>
export default {
  name: 'basic-form',
  data() {
  	return {
  		title: 'Basic Form',
  		name: null,
  		email: null,
  		phone_number: null
  	}
  },
  filters: {
  	capitalize(string) {
  		return string.charAt(0).toUpperCase() + string.slice(1)
  	}
  }
}
</script>

<style>
	.align-left {
		text-align: left;
	}
</style>