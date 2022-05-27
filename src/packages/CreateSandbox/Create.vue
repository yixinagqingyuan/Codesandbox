<template>
    <header class="header">
        <span>{{ officialTemplateInfos.title }}</span>
    </header>
    <PersonalTemplates :officialTemplateInfos="officialTemplateInfos.sandboxes"></PersonalTemplates>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PersonalTemplates from './PersonalTemplates/index.vue'
import { templatesOfficial } from 'apis/index'
let officialTemplateInfos: any = ref({})
templatesOfficial().then(res => {
    officialTemplateInfos.value = res.data[0]
})

</script>
<style lang="scss" scoped>
</style>