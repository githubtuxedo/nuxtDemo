// 组件1的状态
// export const state = () => ({
//     num: 0
// })

// export const mutations = {
//     increment(state) {
//         state.num++
//     },
//     decrement(state) {
//         state.num--
//     }
// }

// export const actions = {
//         increment(context) {
//             context.commit('increment');
//         },
//         decrement(context) {
//             context.commit('decrement');
//         }
//     }
module.exports = {
    state: () => ({
        num: 0,
    }),
    mutations: { //便于操作多个state,通过commit触发 此方法执行同步处理
        increment(state) {
            state.num++
        },
        decrement(state, product) {
            state.num--
        }
    },
    actions: { //便于操作多个mutations,通过dispatch触发   此方法可执行异步处理
        increment(context) { //context和使用$store拥有相同的对象和方法
            context.commit("increment");
            //这里还可以触发其他mutations方法
        },
        decrement({ commit, state }, product) {
            console.log(product);
            commit("decrement", product);
        }
    }

}