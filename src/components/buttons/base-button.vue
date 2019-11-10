<template>
    <button v-on:click.prevent='$emit("onClick")'>
        {{ text }}
    </button>
</template>

<script>
	// child component
	export default {
		name: 'base-button',
		props: ['text'],
	}
</script>