
<template>
    <Editor :showNewSandboxModal="showNewSandboxModal"></Editor>
</template>
<script setup lang="ts">
import Editor from 'packages/Editor/index.vue'
defineProps({
    showNewSandboxModal: Boolean
})
</script>
<style lang="scss" scoped>
</style>
