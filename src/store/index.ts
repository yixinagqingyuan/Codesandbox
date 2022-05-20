import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state: any) {
            state.count++
        }
    }
})