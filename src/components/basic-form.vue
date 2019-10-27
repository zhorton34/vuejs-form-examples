<template>
  <div>
    <form class='form'> 
      <h1> {{ title }} </h1>
      <input type='text' name='name' placeholder="Name" v-model='name'/>
      <input type='email' name='email' placeholder="Email" v-model='email' />
      <input type='text' name='phone_number' placeholder="Phone Number" v-model='phone_number' />

      <!-- Pass data to child component via props -->
      <basic-button color='#0275d8' :title="`Save ${title}`" />
    </form>
  </div>
</template>

<script>
import BasicButton from './basic-button.vue';

export default {
  name: 'basic-form',
  components: { BasicButton },

  data() {
    return {
      title: 'Basic Form',
      name: null,
      email: null,
      phone_number: null
    }
  },
}
</script>