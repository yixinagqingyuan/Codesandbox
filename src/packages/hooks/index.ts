import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCurrentCode = () => {
    const store = useStore()
    return {
        currentCode: computed(() => {
            return store.state.currentCode
        }),
        entryFile: computed(() => {
            return store.getters.entryFile
        }),
        store,
        currentSandbox: store.state.currentSandbox,
        catalogueStructure: computed(() => store.getters.catalogueStructure)

    }
}
