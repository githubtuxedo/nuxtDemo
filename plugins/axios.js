// axios 配置 自定义实例 目的：为了增加拦截器 直接配置nuxt.config暂时未找到好方法
import Vue from 'vue'


import axios from 'axios'

// export default ({ store }) => axios.create({
const $axios = axios.create({
    baseURL: process.env.baseUrl
})


/**配置超时时间 */
$axios.defaults.timeout = 5000

/**配置请求拦截器 */
$axios.interceptors.request.use(
    (config) => {
        console.log('request before:');
        // config.headers.Authorization = `token ${test}`;
        if (false) {
            config.headers.Authorization = `token ${test}`; //如果已登录 设置请求header中的token
        }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)


/**配置相应拦截器 */
$axios.interceptors.response.use(response => {
    console.log('request after:', response.status);

}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401: //返回401，清除token信息并跳转登陆页面
                $store.commit(types.LOGOUT);
                $router.replace({
                    path: 'login',
                    query: { redirect: $store.$router.currentRoute.fullPath }
                })
                break;
            default:
                break;
        }
    }
    return Promise.reject(error.response);
})
export default $axios;