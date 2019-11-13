<template>
    <form class='form'>
        <h1>Base Form</h1>
        <input v-model='name'
            type='text'
            name='name'
            placeholder='Name'
        />
        <input v-model='city'
            type='text'
            name='city'
            placeholder='City Location'
        />
        <input v-model='email'
            type='email'
            name='email'
            placeholder='Email'
        />
        <button>
            Save Base Form
        </button>
    </form>
</template>

<script>
    export default {
        name: 'base-form',
        data() {
            return {
                name: null,
                city: null,
                email: null,
            }
        }
    }
</script>