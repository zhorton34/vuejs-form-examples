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
  /**
   * Life Cycle Hooks
   */
  beforeCreate() {
    console.log('Hook 1: beforeCreate, js object for component has not been created yet')
  },
  created() {
    console.log('Hook 2: created, js object for component is created ~ but component is NOT mounted to DOM')
  },
  beforeMount() {
    console.log('Hook 3: beforeMount, component has not been mounted to DOM yet, but is about to be')
  },
  mounted() {
    console.log('Hook 4: mounted, component has been mounted to DOM')
  },
  beforeUpdate() {
    console.log('Hook 5: before update, component template is about to update')
  },
  updated() {
    console.log('Hook 6: updated, component template has just finished updating')
  },
  beforeDestroy() {
    console.log('Hook 7: component is about to be destroyed')
  },
  destroyed() {
    console.log('Hook 8: component isntance has been destroyed')
  },
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