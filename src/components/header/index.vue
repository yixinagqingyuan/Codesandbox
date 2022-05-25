
<template>
    <header class="header">
        <div class="title">
            CodeSandbox
        </div>
    </header>
</template>
<script setup lang="ts">
import Editor from 'packages/Editor/index.vue'
defineProps({
    showNewSandboxModal: Boolean
})
</script>
<style lang="scss" scoped>
.header {
    box-sizing: border-box;
    height: 48px;
    background-color: #151515;
    color: #ffffff;
    border-bottom: 1px solid;
    border-color: #242424;
    display: flex;
    padding: 0 20px;

    .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #ffffff;
        font-size: 14px;
    }
}
</style>
