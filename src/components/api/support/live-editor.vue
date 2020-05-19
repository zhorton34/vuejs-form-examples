<template>
    <div class="live-editor mt-10">
        <h1 class="ml-6 mb-4 mt-4 text-2xl">Live Form Editor</h1>

        <div class="flex flex-wrap">
            <textarea id='type-out' ref='code' class='w-full' rows="2" v-model="expression">{{ expression }}</textarea>

            <pre class='code code-js w-full'><label>Output</label><code>{{ output }}</code></pre>
        </div>
    </div>
</template>

<script>
	import TypeIt from "typeit";

	export default {
    	data: () => ({
			expression: '',
            typeIt: null,
            output: '',
    	}),

        created() {
			this.$root.$on('type', code => this.type(code));
        },

        mounted() {
    		this.typeIt = new TypeIt('#type-out', {
				cursorSpeed: 1000,
    			lifeLike: true,
                cursor: true,
                html: false,
                afterStep: async (step, instance) => {
					this.expression = this.$el.querySelector('#type-out').value;
					this.run();
				}
            });

			this.$root.$emit('type', this.$parent.$parent.showing.code);
        },

        methods: {
            type(code) {
				document.querySelector('#type-out').value = '';

				this.typeIt.type(code, { delay: 250 }).go();
            },

    		run() {
    			let code = this.expression.replace(/form./g, 'this.form.');
    			let endsWithSemicolon = code[code.length -1] === ';';

    			if (endsWithSemicolon) {
    				this.output = eval(code);
                }

    			if (code.length === 0) {
    				this.output = eval("\"Empty\"");
                }
			}
        },

    	computed: {
    		form: $this => $this.$parent.form,
            showing: $this => $this.$parent.$parent.showing
		},
    }
</script>

<style scoped>

    .cursor:after {
        animation: cursor 1s infinite;
        content: '_';
        opacity: 0;
    }

    @keyframes cursor {
        0% {
            opacity: 0;
        }
        40% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    textarea {
        width: 90%;
        margin-left: 5%;
        border: 1px solid #d5d5d5;
        padding: 10px;
        margin-right: 10px;
        border-radius: 3px;
        background-color: #333;
        font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
    }
    input.editor {
        width: 28vw !important;
        margin: 20px 25px !important;
        border-radius: 4px !important;
        border: 1px solid #292929 !important;
        position: relative !important;
        margin-top: 10px !important;
        font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
        display: block !important;
        /* margin: 0 0 0 60px; */
        padding: 15px 16px 14px !important;
        border-left: 1px solid #555 !important;
        overflow-x: auto !important;
        font-size: 13px !important;
        line-height: 19px !important;
        color: #38a169 !important;
    }

    div.live-editor {
        color: #fff;
        background: radial-gradient(circle at 50% 0, #82cce0, #2187c1);
        padding:0;
        margin:0;
        position: fixed;
        left: 0;
        bottom: 0;
    }

    #wrapper {
        padding:5%;
        margin:0 auto;
    }

    /* CSS Simple Pre Code */
    pre {
        background: #333;
        white-space: pre;
        word-wrap: break-word;
        overflow: auto;
    }

    pre.code {
        margin: 20px 25px;
        border-radius: 4px;
        border: 1px solid #292929;
        position: relative;
    }

    pre.code label {
        font-family: sans-serif;
        font-weight: bold;
        font-size: 13px;
        color: #ddd;
        position: absolute;
        left: 1px;
        top: 15px;
        text-align: center;
        width: 60px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: none;
    }

    pre.code code {
        font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
        display: block;
        margin: 0 0 0 60px;
        padding: 15px 16px 14px;
        border-left: 1px solid #555;
        overflow-x: auto;
        font-size: 13px;
        line-height: 19px;
        color: #ddd;
    }

    pre::after {
        padding: 0;
        width: auto;
        height: auto;
        position: absolute;
        right: 18px;
        top: 14px;
        font-size: 12px;
        color: #ddd;
        line-height: 20px;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        transition: all 0.3s ease;
    }

    pre:hover::after {
        opacity: 0;
        visibility: visible;
    }

    pre.code-css code {
        color: #91a7ff;
    }

    pre.code-html code, textarea {
        color: #aed581;
    }

    pre.code-javascript code {
        color: #ffa726;
    }

    pre.code-jquery code {
        color: #4dd0e1;
    }
</style>
