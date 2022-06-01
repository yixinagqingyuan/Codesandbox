
<template>
    <div id="preview"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { SandpackClient } from "packages/SandpackClient";
import { VUE_TEMPLATE_3, VANILLA_TEMPLATE } from './dome'
onMounted(() => {
    const client = new SandpackClient(
        "#preview", // iframe selector or element itself
        VUE_TEMPLATE_3,
        {
            showOpenInCodeSandbox: false
        }
    );

    // client.updatePreview({
    //     files: {
    //         "/index.js": {
    //             code: `console.log('New Text!')`,
    //         },
    //     },
    //     entry: "/index.js",
    //     dependencies: {
    //         uuid: "latest",
    //     },
    // });
})

</script>
<style lang="scss" scoped>
</style>
