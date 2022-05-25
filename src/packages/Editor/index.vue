<template>
    <div class="container" :style="{ lineHeight: 'initial', backgroundColor: 'transparent' }">
        <Header></Header>
        <div class="fullscreen">
            <div class="editor">
                <splitpanes class="default-theme">
                    <pane min-size="10" size="15" max-size="25">
                        <Workspace></Workspace>
                    </pane>
                    <pane size="85">
                        <MainWorkspace></MainWorkspace>
                    </pane>
                </splitpanes>

                <el-dialog v-model="showNewSandboxModal" title="Create Sandbox" :show-close="false" width="40%">
                    <CreateSandbox></CreateSandbox>
                </el-dialog>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import Header from 'components/header/index.vue'
import MainWorkspace from './MainWorkspace/index.vue'
import Workspace from './Workspace/index.vue'
import CreateSandbox from 'packages/CreateSandbox/index.vue'
defineProps({
    showNewSandboxModal: Boolean
})

</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &.Resizer {
        background: 'black';
        background-clip: padding-box;
    }

    .fullscreen {
        display: flex;
        flex: auto;
        width: 100%;
        height: 100%;

        .editor {
            position: fixed;
            left: 0;
            top: 48px;
            right: 0;
            bottom: 0;
            height: auto;
            z-index: 9;

            .splitpanes__pane {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Helvetica, Arial, sans-serif;
                color: rgba(255, 255, 255, 0.6);
                font-size: 5px;
            }

        }
    }
}
</style>
