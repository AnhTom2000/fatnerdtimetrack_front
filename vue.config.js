module.exports = {
    assetsDir: 'static',
    outputDir: 'dist',
    lintOnSave: false,
    productionSourceMap: false,
    runtimeCompiler: true,
    chainWebpack: () => { },
    configureWebpack: {
        externals: {
            // "vue-router": 'VueRouter',
            // axios: "axios",
            // "element-ui": 'ELEMENT',
            // vuex: "Vuex"
        }
    },
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://www.ccocc.co',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}