<template>
    <form class='form'>
        <h1>Base Form</h1>
        <input
            type='text'
            name='name'
            placeholder='Name'
        />
        <input
            type='text'
            name='city'
            placeholder='City Location'
        />
        <input
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
    }
</script>