
<template>
    <div id="preview"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
    store.dispatch('setClient', "#preview")
})

</script>
<style lang="scss" scoped>
</style>
