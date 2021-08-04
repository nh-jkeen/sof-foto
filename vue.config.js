module.exports = {
    devServer: {
        https: false,
    },
	publicPath: process.env.NODE_ENV === 'production' ? '/sof-foto/' : '/',
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/_shared.scss";`,
			},
		},
	},
	pages: {
		index: {
			entry: 'src/index/main.ts',
			template: 'public/index.html',
			title: 'index',
			chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
		},
		launch: {
			entry: 'src/launch/launch.ts',
			template: 'public/launch.html',
			title: 'launch',
			chunks: [ 'chunk-vendors', 'chunk-common', 'launch' ]
		}
	}
}