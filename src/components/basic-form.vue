<template>
  <div>
    <button @click='show.form = !show.form'>
      {{ toggleButtonText }}
    </button>

    <form class='form' v-if='show.form'>
      <h1> {{ title | capitalize }} </h1>
      <input type='text' name='name' placeholder="Name" v-model='name'/>
      <input type='email' name='email' placeholder="Email" v-model='email' />
      <input type='text' name='phone_number' placeholder="Phone Number" v-model='phone_number' />

      <!-- 1. Emit event from basic-button component -->
      <!-- 2. Trigger callback function when BasicButton emits event -->
      <!-- GLOBAL EVENT SYSTEM -->
      <!-- 3. Create Global Vue Event Bus -->
      <!-- 4. Add Global Vue Event Bus To Vue Prototype -->
      <!-- 5. Provide Event.fire, Event.listen, Event.listenOnce, Event.off Examples -->
      <basic-button color='#0275d8' :title="`Save ${title}`"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'basic-form',
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