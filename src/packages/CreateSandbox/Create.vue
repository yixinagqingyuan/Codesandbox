<template>
    <header class="header">
        <span>创建组件</span>
    </header>
    <PersonalTemplates></PersonalTemplates>
</template>
<script setup lang="ts">
import PersonalTemplates from './PersonalTemplates/index.vue'
import { templatesOfficial } from 'apis/index'
templatesOfficial().then(res => {
    console.log(res)
})
</script>
<style lang="scss" scoped>
.header {}
</style>