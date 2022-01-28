
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './ui/index.js',

	output: {
		filename: 'js/main.js',
		path: path.resolve(__dirname, '../../public')
	},

	performance: {
		hints: "warning",
		maxAssetSize: 1048576,
		maxEntrypointSize: 1048576,
	},

	plugins: [
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	},

	devServer: {
		open: true
	}
};
