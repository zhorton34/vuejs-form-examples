<template>
  <div>
    <button @click='show.form = !show.form'>
      {{ toggleButtonText }}
    </button>

    <!-- 1. add updateMeWhenFormChanges data property -->
    <!-- 2. add show watcher -->
    <!-- 3. add deep property to show watcher -->
    <!-- 4. Try loading page with and without deep property -->
    <!-- 5. Add immediate property to show watcher -->
    <!-- 6. Look at example box immedietly when page loads in comparison to when there is no immediate property -->
    <!-- 7. Move watcher callback to methods, and reference it as a string -->
    <example-box>
      {{ updateMeWhenFormChanges }}
    </example-box>

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
      updateMeWhenFormChanges: null, 
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
  watch: {
    show: {
      // watcher wont initially work because form is nested within show
      // deep: true,  
      // watcher wont work on page load unless we set immediate to true
      // immediate: true,
      // handler can be defined directly as a callback function, or we can reference one of our component methods
      // as a string
      handler(show) {
        this.updateMeWhenFormChanges = show
      },
    }
  }
}
</script>