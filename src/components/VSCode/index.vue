
<template>
    <div id="vscode-container">
        <MonacoEditor theme="vs-dark" language="javascript" :options="options" @change="onChange">
        </MonacoEditor>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from 'packages/MonacoEditor/index.vue';
const options = {
    value: '', // 初始值
    foldingStrategy: 'indentation', // 代码可分小段折叠
    automaticLayout: true, // 自适应布局
    overviewRulerBorder: false, // 不要滚动条的边框
    autoClosingBrackets: true,
    tabSize: 2, // tab 缩进长度
    minimap: {
        enabled: false, // 不要小地图
    },
}
const onChange = () => {

}
</script>
<style lang="scss" scoped>
#vscode-container {
    width: 100%;
    height: 100%;
    z-index: 30;
}
</style>
