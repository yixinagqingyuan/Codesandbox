
<template>
    <div class="Explorer">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="文件" name="1">
                <vue-tree-list v-for="model in catalogueStructure" @on-click="onClick" @change-name="onChangeName"
                    @delete-node="onDel" @add-node="onAddNode" @on-drop="drop" @drop-before="dropBefore"
                    @drop-after="dropAfter" :model="model">
                </vue-tree-list>
            </el-collapse-item>
            <el-collapse-item title="依赖" name="2">
            </el-collapse-item>
        </el-collapse>
    </div>

</template>
<script setup lang="ts">
import { VueTreeList } from 'components/VueTreeList'
import { searchTree } from 'utils/index'
import { useStore } from 'vuex'
import { ref, watchEffect } from 'vue';
import { useCurrentCode } from 'packages/hooks/index'
const { entryFile, catalogueStructure }: any = useCurrentCode()
const store = useStore()
const props = defineProps({
    directories: Array,
    modules: Array
})
store.dispatch('setCurrentCode', searchTree(catalogueStructure.value, entryFile.value))
const activeNames = ref(['1'])
const onDel = (node) => {
    // eslint-disable-next-line no-console
    console.log(node)
    node.remove()
}

const onChangeName = (params) => {
    // eslint-disable-next-line no-console
    console.log(params)
}

const onAddNode = (params) => {
    // eslint-disable-next-line no-console
    console.log(params)
}

const onClick = (params) => {
    store.dispatch('setCurrentCode', params)
}

const drop = (e) => {
    // eslint-disable-next-line no-console
    console.log(e)
}

const dropBefore = ({ node, src, target }) => {
    // eslint-disable-next-line no-console
    console.log('drop-before', node, src, target)
}

const dropAfter = ({ node, src, target }) => {
    // eslint-disable-next-line no-console
    console.log('drop-after', node, src, target)
}
</script>
<style lang="scss" scoped>
.Explorer {
    height: 100%;
    width: 100%;

    :deep(.el-collapse-item__header) {
        padding-left: 10px;
    }

    :deep(.el-collapse-item__content) {
        padding: 8px;
    }
}
</style>
