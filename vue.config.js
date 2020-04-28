// vue config
const path = require('path')

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@TailwindCSS': path.resolve(__dirname, 'src/assets/css/tailwind.css'),
				'@View': path.resolve(__dirname, 'src/components/views/'),
				'@Auth': path.resolve(__dirname, 'src/components/auth/'),
				'@Form': path.resolve(__dirname, 'src/components/forms/'),
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
}