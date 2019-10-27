<template>
  <div>
   <example-box>
      <!-- 1. Add v-model to input fields to bind component data to the input field value-->
      <!-- 2. Uncomment following code -->
      <!-- Name: {{ name }}<br> Email: {{ email }}<br> Phone Number: {{ phone_number }} -->
    </example-box>

    <form class='form'> 
      <h1> {{ title }} </h1>

      <input type='text' name='name' placeholder="Name" />
      <input type='email' name='email' placeholder="Email" />
      <input type='text' name='phone_number' placeholder="Phone Number" />

      <button type='submit'>
        Save {{ title }}
      </button>
    </form>

  </div>
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
}
</script>