<template>
	<div class='example-box' v-if='show'>
		<h4><u>Example</u></h4>
		<slot>
			Example Content
		</slot>
	</div>
</template>

<script>
	export default {
		name: 'example-box',
		props: {
			show: {
				type: Boolean,
				default: true,
				required: false,
			}
		},
	}
</script>