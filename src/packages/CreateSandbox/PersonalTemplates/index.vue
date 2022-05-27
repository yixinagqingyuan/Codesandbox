<template>
    <div class="temp-container">
        <el-row :gutter="20">
            <el-col :span="6" v-for="temp in officialTemplateInfos">
                <el-button type="primary" @click="openSandbox(temp)">{{ temp.alias }}</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    officialTemplateInfos: any
}>()
const openSandbox = (temp) => {
    console.log(temp)
}
</script>
<style lang="scss" scoped>
</style>