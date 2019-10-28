<template>
	<div class='basic-button'>
		<!-- 1. Emit event when button is clicked -->
  		<button :style='buttonStyle'>
        	{{ title }}
		</button>
	</div>
</template>

<script>
	export default {
		name: 'basic-button',
		props: {
			title: {
				type: String,
				default: 'Save',
				required: false,
				// validate that empty string is not passed for button title
				validator: function (title) {
        			return title.length > 0;
      			},
			},
			color: {
				type: String,
				default: '#0275d8',
				required: false,
			}
		},
		computed: {
			buttonStyle() {
				return {
					backgroundColor: this.color,
				}
			}
		},
	};
</script>

<style>
	.basic-button { 
		width: 100vw; 
		height: 45px;
	}
	.basic-button > button {
  		width: 100%;
  		font-weight: bolder;
  		text-align: center;
  		border: 1px solid #d5d5d5;
  		border-radius: 3px;
  		margin-top: 5px;
  		font-size: 25px;
  		height: 45px;
  		padding-left: 20px;
  		background-color: #0275d8;
  		color: #fff;
	}
</style>