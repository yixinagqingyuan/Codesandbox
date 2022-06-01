
<template>
    <div id="vscode-container" @keydown.prevent.s="save($event)">
        <!-- <MonacoEditor theme="vs-dark" language="javascript" :options="options" @change="onChange">
        </MonacoEditor> -->
        <Codemirror :type="type" :code="currentCode.code"></Codemirror>
    </div>
</template>
<script setup lang="ts">
// import MonacoEditor from 'packages/MonacoEditor/index.vue';
import Codemirror from 'packages/Codemirror/index.vue'
import { useCurrentCode } from 'packages/hooks/index'
import { computed } from 'vue'
const { currentCode }: any = useCurrentCode()
// 为啥这里不走响应式
const type = computed(() => {
    console.log(currentCode)
    return 'js'
})
function save(e) {
    console.log(e)
}
// const options = {
//     value: "function hello() {\n\talert('Hello world!');\n}",
//     foldingStrategy: 'indentation', // 代码可分小段折叠
//     automaticLayout: true, // 自适应布局
//     overviewRulerBorder: false, // 不要滚动条的边框
//     autoClosingBrackets: true,
//     tabSize: 2, // tab 缩进长度
//     minimap: {
//         enabled: false, // 不要小地图
//     },
// }
// const onChange = () => {

// }
</script>
<style lang="scss" scoped>
#vscode-container {
    width: 100%;
    height: 100%;
    z-index: 30;
}
</style>
