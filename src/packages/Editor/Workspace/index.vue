
<template>
    <Explorer :directories="currentSandbox.directories" :modules="currentSandbox.modules"></Explorer>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import Explorer from 'components/Explorer/index.vue'
const store = useStore()
const currentSandbox = computed(() => store.state.currentSandbox)
</script>
<style lang="scss" scoped>
</style>
