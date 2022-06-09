import { createStore } from 'vuex'
import { data } from './dome'
import { SandpackClient } from "packages/SandpackClient";
import { setCatalogue, conversionCode } from 'utils/index'
let SandpackClientStore = null
// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            currentSandbox: data,
            currentCode: {
                title: '',
                code: ''
            },
        }
    },
    mutations: {
        SETCURRENTCODE(state: any, code) {
            state.currentCode = code
        },
        SETCURRENTSANDBOX(state) {
            const modules = state.currentSandbox.modules
            modules.find((item) => {
                if (item.id == state.currentCode.id) {
                    item.code = state.currentCode.code
                    return
                }

            })
        }
    },
    actions: {
        setCurrentCode({ commit }, code) {
            commit('SETCURRENTCODE', code)
        },
        setClient({ getters }, el) {
            SandpackClientStore = new SandpackClient(
                el,
                getters.project,
                {
                    showOpenInCodeSandbox: false
                }
            );
        },
        setUpdatePreview({ commit, getters }) {
            commit('SETCURRENTSANDBOX')
            SandpackClientStore.updatePreview(getters.project);
        },

    },
    getters: {
        // 入口文件
        entryFile(state) {
            return state.currentSandbox.entry.split('/')
        },
        // 文件目录
        catalogueStructure(state) {
            return setCatalogue(state.currentSandbox)
        },
        // 项目代码
        project(state) {
            return conversionCode(state.currentSandbox)
        }
    }
})