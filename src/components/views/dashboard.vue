<template>
    <div id='app' v-cloak>
        <div class="flex items-center justify-between flex-wrap shadow-xl mb-6 vue-nav">
            <img height='150' width='150' :src='logo' />
        </div>

        <ul class="flex flex-wrap">
            <li class="w-full m-2" v-for="(example, key) in examples" :key="`example.${key}`"  @click="activate(key)">
                <a v-if="example.disabled" class="inline-block py-1 px-3 text-gray-400 cursor-not-allowed" :href="`#${example.name.replace(' ', '-')}`">
                    {{ example.name }}
                </a>
                <a v-else-if="example.show" :href="`#${example.name.replace(' ', '-')}`" class='inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white'>
                    {{ example.name }}
                </a>
                <a v-else-if="!example.show" class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" :href="`#${example.name.replace(' ', '-')}`">
                    {{ example.name }}
                </a>
            </li>
        </ul>

        <div id="paper">
            <div id="pattern">
                <div id="content">
                    {{ showing.name }} Notes
                    <br/><br/>{{ showing.description }}
                </div>
            </div>
        </div>

        <component :is="showing.is" ref="active"/>
    </div>
</template>

<script>
	import ExampleOne from '@Form/one';
	import ExampleTwo from '@Form/two';

    export default {
        name: 'dashboard-view',
		data: () => ({
			examples: [
				{
					is: ExampleOne,
					name: 'Example One',
					description: `
					    "Simplest Form Setup"

					    "Use form.all() on submission to collect all form data."
					`,
                    code: `form.all();`,
				},
				{
					is: ExampleTwo,
					name: 'Example Two',
					description: `
					    "Similar To Example One"

					    "Use form.all() on submission to collect all form data."

					    "Disable Form Submit Button If Any Fields Are Empty Using Form.empty()"
					`,
                    code: `form.empty();`
				}
			],
		}),

        created() {
        	window.$created = this;
        	this.examples = this.examples.map(example => ({
                ...example,
                show: false
            }));

            this.examples[0].show = true;
        },
        computed: {
        	showing: $this => $this.examples.find(({ show }) => show === true),
			logo: () => 'https://camo.githubusercontent.com/4f5f2a67d153e06cf1420c22aaf228f518b35901/68747470733a2f2f7468756d62732e6766796361742e636f6d2f50696e6b5069657263696e6742756c6c2d73697a655f726573747269637465642e676966'
		},

        methods: {
        	activate(key) {
                this.examples = this.examples.map((example, index) => ({
                    ...example,
                    show: index === key,
                }))
            }
        },
    }
</script>

