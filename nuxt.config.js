const pkg = require('./package')

const _env = require('./_env');

process.env.BASE_URL = _env.ENV;


var path = require('path')
    // 给出正确的绝对路径
function resolve(dir) {
    return path.join(__dirname, './', dir)
}


module.exports = {
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    },
    mode: 'spa',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    // loading: '~components/loading.vue'       可自定义loading页面

    /*
     ** Global CSS
     */
    css: [
        'ant-design-vue/dist/antd.css',

        // 'quill/dist/quill.snow.css',
        // 'quill/dist/quill.bubble.css',
        // 'quill/dist/quill.core.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/antd-ui',
        {
            src: '~plugins/nuxt-quill-plugin.js',
            ssr: false, //仅在客户端渲染
        },
        // {
        //     src: '@/plugins/axios',
        //     ssr: false, //仅在客户端渲染
        // },
    ],
    router: {
        middleware: ['redirect'],
    },

    axios: {
        prefix: '/api',
        proxy: true, // Can be also an object with default options

        middleware: ['inteceptor'],
    },

    proxy: {
        '/api': { target: _env.proxy, pathRewrite: { '^/api': '/' } }
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        // '@nuxtjs/axios',
        '@nuxtjs/proxy',
    ],

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        vendor: [
            'axios',
            'vue-quill-editor',
        ],
        extend(config, ctx) {

        },
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]",
                        limit: 20000, // size <= 20KB
                    }
                }]
            }
        ]
    }
}