module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/sof-foto/' : '/',
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/_shared.scss";`,
			},
		},
	},
}