<template>
  <div>
    <button @click='show.form = !show.form'>
      {{ toggleButtonText }}
    </button>

    <form class='form' v-if='show.form'>
      <!-- Filter -->
      <!-- 1. Register Filter -->
      <!-- 2. Pipe title through filter -->
      <!-- {{ title | capitalize }} -->
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
  /**
   * Assets
   */ 
  components: { BasicButton },

  filters: {
    // register capitalize filter
    capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),
  },
  directives: {
    // Register v-href directive
    href: {
      bind(element, binding) {
        element.href = binding.value;
        element.addEventListener("click", event => {
          event.preventDefault();
          window.location = event.target.href;
        });
      }
    }
  },

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
}
</script>