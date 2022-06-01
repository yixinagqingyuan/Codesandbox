import { createStore } from 'vuex'
import { data } from './dome'
console.log(data)
// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            currentSandbox: data,
            currentCode: {
                title: '',
                code: ''
            }
        }
    },
    mutations: {
        setCurrentCode(state: any, code) {
            state.currentCode = code
        }
    }
})