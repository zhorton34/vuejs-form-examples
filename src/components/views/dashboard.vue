<template>
    <div id='app' v-cloak>
        <div class="flex items-center justify-between flex-wrap shadow-xl mb-6 vue-nav">
            <img height='150' width='150' :src='logo' />
        </div>

        <ul class="flex flex-wrap">
            <li class="w-full m-2" v-for="(example, key) in examples" :key="`example.${key}`"  @click="activate(key)">
                <a v-if="example.disabled" class="inline-block py-1 px-3 text-gray-400 cursor-not-allowed" :href="`#${example.title(' ', '-')}`">
                    {{ example.title }}
                </a>
                <a v-else-if="example.show" :href="`#${example.title.replace(' ', '-')}`" class='inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white'>
                    {{ example.title }}
                </a>
                <a v-else-if="!example.show" class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" :href="`#${example.title.replace(' ', '-')}`">
                    {{ example.title }}
                </a>
            </li>
        </ul>

        <div id="paper">
            <div id="pattern">
                <div id="content">
                    {{ showing.title }} Notes
                    <br/><br/>{{ showing.description }}
                </div>
            </div>
        </div>

        <component :is="showing.is" ref="active"/>
    </div>
</template>

<script>
    const examples = require('@Api/examples.js').default;

    console.log('dash examples: ', examples);
    export default {
        name: 'dashboard-view',
		data: () => ({ examples: [] }),

        created() {
        	this.examples = examples.map(example => ({
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

