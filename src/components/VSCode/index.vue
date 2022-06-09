
<template>
    <div id="vscode-container" @keydown.prevent.s="save($event)">
        <Codemirror :type="type" :code="code" @change="change"></Codemirror>
    </div>
</template>
<script setup lang="ts">
import Codemirror from 'packages/Codemirror/index.vue'
import { useCurrentCode } from 'packages/hooks/index'
import { computed } from 'vue'
const { currentCode, store }: any = useCurrentCode()
let newCode: any = ''

const code = computed(() => {
    newCode = currentCode.value.code
    return currentCode.value.code
})
const type = computed(() => {
    return (currentCode.value.title || '.js').split('.').pop().toLowerCase()
})
const change = (e) => {
    newCode = e
}
function save(e) {
    currentCode.value.code = newCode
    store.dispatch('setCurrentCode', currentCode.value)
    store.dispatch('setUpdatePreview');
}

</script>
<style lang="scss" scoped>
#vscode-container {
    width: 100%;
    height: 100%;
    z-index: 30;
}
</style>
