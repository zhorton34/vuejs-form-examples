<template>
  <div>
    <!-- 1. Add toggleButtonText computed property -->
    <!-- 2. Replace ternary with toggleButtonText computed property  -->
    <!-- 3. Replace toggleForm method with show.form = !show.form -->
    <button @click='toggleForm'>
      {{ show.form ? 'Hide' : 'Show' }} Form
    </button>

    <form class='form' v-if='show.form'>
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
      show: {
        form: true
      },
      title: 'Basic Form',
      name: null,
      email: null,
      phone_number: null
    }
  },

  computed: {
    // toggle form button text will ONLY re-execute when its dependencies update
    // its only dependency is this.show.form, when this.show.form updates
    // this computed property will re-execute
    toggleButtonText() {
      return this.show.form ? 'Hide Form' : 'Show Form'
    }
  },

  methods: {
    toggleForm() {
      this.show.form = !this.show.form
    }
  },
}
</script>