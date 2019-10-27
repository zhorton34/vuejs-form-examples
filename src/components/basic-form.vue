<template>
  <div>
    <!-- 1. add new boolean data property -->
    <!-- 2. add toggleForm method -->
    <!-- 3. add v-if='show.form' on form element -->
    <!-- 4. Add button to trigger toggle form method -->
<!--     
    <button @click='toggleForm'>
      {{ show.form ? 'Hide' : 'Show' }} Form
    </button>
 -->

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