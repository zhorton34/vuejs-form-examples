<template>
    <div id='app' v-cloak>
        <div class="flex items-center justify-between flex-wrap shadow-xl mb-6 vue-nav">
            <img height='150' width='150' :src='logo' />
        </div>

        <ul class="flex flex-wrap">
            <li class="w-full m-2" v-for="(example, key) in examples" :key="`example.${key}`"  @click="activate(key)">
                <a v-if="example.disabled" class="inline-block py-1 px-3 text-gray-400 cursor-not-allowed">
                    {{ example.title }}
                </a>
                <a v-else-if="example.show" class='inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white'>
                    {{ example.title }}
                </a>
                <a v-else-if="!example.show" class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3">
                    {{ example.title }}
                </a>
            </li>
        </ul>

        <transition name="slide-down">
            <div id="paper" v-if="show.description">
                <div id="pattern">
                    <div id="content">
                        
                    </div>
                </div>
            </div>
        </transition>
        <component :is="showing.is" ref="active"/>
    </div>
</template>

<script>
    const examples = require('@Api/examples.js').default;

    export default {
        name: 'dashboard-view',
		data: () => ({ examples: [], show: { description: true } }),

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

        watch: {
        	showing: {
        		deep: true,
                immediate: false,
                handler({ code, description }) {
        			this.show.description = false;

        			this.$nextTick(() => {
						this.show.description = true;

						this.$nextTick(() => {
					        this.$root.$emit('type', code);
					        this.$root.$emit('write', description);
						})
					});
                }
            }
        },
        methods: {
        	activate(key) {
                this.examples = this.examples.map((example, index) => ({
                    ...example,
                    show: index === key,
                }));
            }
        },
    }
</script>

<style>
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }

    /** SLIDEDOWN **/

    .slide-down-enter, .slide-down-leave-to {
        opacity: 0;
        transform: translateY(-100%);
    }

    .slide-down-enter-active, .slide-down-leave-active {
        transition: opacity .4s, transform .4s ease-in-out;
    }
</style>
