import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCurrentCode = () => {
    const store = useStore()
    return {
        currentCode: computed(() => store.state.currentCode),
    }
}