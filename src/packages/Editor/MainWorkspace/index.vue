
<template>
    <splitpanes class="default-theme">
        <pane min-size="30" size="50" max-size="70">
            <CodeEditor></CodeEditor>
        </pane>
        <pane>
            <DevTools></DevTools>
        </pane>
    </splitpanes>
</template>
<script setup lang="ts">
import CodeEditor from 'components/VSCode/index.vue'
import DevTools from 'components/DevTools/index.vue'
</script>
<style lang="scss" scoped>
</style>
