<template>
    <div id='app' v-cloak>
        <top-navigation />

        <ul class="flex flex-wrap">
            <li class="w-full m-2" v-for="(example, key) in examples" :key="`example.${key}`" @click="activate(key)">
                <a class="inline-block border rounded py-1 px-3" :class="example.show ? 'border-blue-5000 bg-blue-500 text-white' : 'border-white hover:border-gray-200 text-blue-500 hover:bg-gray-200'" style="cursor:pointer" >
                    {{ example.title }}
                </a>
            </li>
        </ul>

        <transition name="slide-down">
            <div id="paper" v-if="show.description">
                <div id="pattern">
                    <div id="content" v-text="showing.description">
                    </div>
                </div>
            </div>
        </transition>
        <component :is="showing.is" ref="active"/>
    </div>
</template>

<script>
    import TopNavigation from '../sections/top-navigation';

    const examples = require('@Api/examples.js').default;

    export default {
        name: 'dashboard-view',
		components: { TopNavigation },

		data: () => ({
            examples: [],
            show: { description: true }
		}),

        created() {
        	this.examples = examples.map(example => ({
                ...example,
                show: false
            }));

            this.examples[0].show = true;
        },

        computed: {
        	showing: $this => $this.examples.find(({ show }) => show === true),
		},

        watch: {
        	showing: {
        		deep: true,
                immediate: false,
                handler({ code }) {
					this.$root.$emit('type', code);
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
