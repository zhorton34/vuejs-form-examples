const path = require('path');

module.exports = {
	devServer: {
		host: 'vue.sanctum.local'
	},
	configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common',
				'@TailwindCSS': path.resolve(__dirname, 'src/assets/css/tailwind.css'),
				'@View': path.resolve(__dirname, 'src/components/views/'),
				'@Auth': path.resolve(__dirname, 'src/components/auth/'),
				'@Api': path.resolve(__dirname, 'src/components/api/'),
				'@Field': path.resolve(__dirname, 'src/components/fields/'),
				'@Button': path.resolve(__dirname, 'src/components/buttons/'),
				'@Plugin': path.resolve(__dirname, 'src/plugins/'),
			}
		}
	},
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'src/index.html',
			filename: 'index.html',
			title: 'Vue Api & Data Centric Component Design',
		    chunks: ['chunk-vendors', 'chunk-common', 'index']
		}
	}
};
