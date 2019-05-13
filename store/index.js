/**
 * nuxt规定 store/index.js此处为根状态 其他命名文件都为次级模块被引入
 * 该文件保留app全局状态
 */
export const state = () => ({
    counter: 0,
    token: '', //标识登陆状态
})

export const mutations = {
    increment(state) {
        state.counter++
    },
    setToken(state, value = "") {
        state.token = value;
    },
    clearToken(state) {
        state.token = ""
    }
}

export const actions = {
    setToken({ commit }, value) { //设置token
        commit('setToken', value);
    },
    clearToken(context) {
        context.commit('clearToken');
    }
}