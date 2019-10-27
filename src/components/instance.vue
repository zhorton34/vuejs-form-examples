<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'VueComponentInstance',
  data() {
  	return {
  		name: 'hello world',
  	}
  },
  filters: {
  	capitalize(string) {
  		return string.capitalize()
  	}
  },

}
</script>

