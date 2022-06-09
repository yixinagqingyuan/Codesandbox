<template>
    <div :id="model.id" class="vtl-node" :class="{ 'vtl-leaf-node': !isFolder, 'vtl-tree-node': isFolder }">
        <!-- 这也是为了拖动 -->
        <div class="vtl-border vtl-up" :class="{ 'vtl-active': isDragEnterUp }" @drop="dropBefore"
            @dragenter="dragEnterUp" @dragover="dragOverUp" @dragleave="dragLeaveUp" />
        <div :class="treeNodeClass" :draggable="true" @dragstart="dragStart" @dragover="dragOver" @dragenter="dragEnter"
            @dragleave="dragLeave" @drop="drop" @dragend="dragEnd" @mouseover="mouseOver" @mouseout="mouseOut"
            @click.stop="toggle">
            <el-icon v-if="isFolder" color="#409eff" :size="16">
                <FolderOpened />
            </el-icon>
            <el-icon v-else color="#409eff" :size="16">
                <Document />
            </el-icon>
            <span class="vtl-node-content" v-if="!editable">
                {{ model.title }}
            </span>
            <input v-else class="vtl-input" type="text" ref="nodeInput" :value="model.name" @input="updateName"
                @blur="setUnEditable" />
            <div class="vtl-operation" v-show="isHover">
                <el-icon @click.stop.prevent="addChild(false)" :size="14" v-if="isFolder">
                    <FolderAdd />
                </el-icon>
                <el-icon @click.stop.prevent="addChild(true)" :size="14" v-if="isFolder">
                    <DocumentAdd />
                </el-icon>
                <el-icon @click.stop.prevent="setEditable" :size="14">
                    <EditPen />
                </el-icon>
                <el-icon @click.stop.prevent="delNode" :size="14">
                    <Close />
                </el-icon>
            </div>
        </div>
        <!-- 这是为了拖动的 -->
        <div v-if="model.children && model.children.length > 0 && expanded" class="vtl-border vtl-bottom"
            :class="{ 'vtl-active': isDragEnterBottom }" @drop="dropAfter" @dragenter="dragEnterBottom"
            @dragover="dragOverBottom" @dragleave="dragLeaveBottom"></div>
    </div>
    <div class="vtl-tree-margin" v-show="expanded" v-if="isFolder">
        <vue-tree-list @on-click="(depth) => $emit('on-click', depth)"
            @change-name="(depth) => $emit('change-name', depth)" @delete-node="(depth) => $emit('delete-node', depth)"
            @add-node="(depth) => $emit('add-node', depth)" @on-drop="(depth) => $emit('on-drop', depth)"
            @drop-before="(depth) => $emit('drop-before', depth)" @drop-after="(depth) => $emit('drop-after', depth)"
            v-for="newmodel in model.children" :model="newmodel" :key="newmodel.id">
        </vue-tree-list>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { TreeNode } from './Tree'
import { useCurrentCode } from 'packages/hooks/index'
const { currentCode }: any = useCurrentCode()
let compInOperation = null
const props = withDefaults(defineProps<{
    model: any,

}>(), {
    model: () => ({}),
})
const emit = defineEmits(['on-click', 'change-name', 'delete-node', 'add-node', 'drop-before', 'drop-after', 'on-drop'])
const isHover = ref(false)
const editable = ref(false)
const isDragEnterUp = ref(false)
const isDragEnterBottom = ref(false)
const isDragEnterNode = ref(false)
const expanded = ref(true)
const nodeInput = ref(null)
const isFolder = computed(() => {
    return props.model.children ? props.model.children.length : false
})
const isSelected = computed(() => currentCode.value.id === props.model.id)
const treeNodeClass = computed(() => {
    return {
        'vtl-node-main': true,
        'vtl-active': isDragEnterNode.value,
        'selected': isSelected.value
    }
})
const updateName = (e) => {
    var oldName = props.model.name
    props.model.changeName(e.target.value)
    emit('change-name', {
        id: props.model.id,
        oldName: oldName,
        newName: e.target.value,
        node: props.model
    })
}
const delNode = () => {
    emit('delete-node', props.model)
}

const setEditable = () => {
    editable.value = true
    nextTick(() => {
        const $input = nodeInput.value
        $input.focus()
        $input.setSelectionRange(0, $input.value.length)
    })
}
const setUnEditable = (e) => {
    editable.value = false
    var oldName = props.model.name
    props.model.changeName(e.target.value)
    emit('change-name', {
        id: props.model.id,
        oldName: oldName,
        newName: e.target.value,
        eventType: 'blur'
    })
}
const toggle = () => {
    if (isFolder.value) {
        expanded.value = !expanded.value
    } else {
        emit('on-click', {
            toggle: toggle,
            ...props.model
        })
    }
}
const mouseOver = () => {
    if (props.model.disabled) return
    isHover.value = true
}

const mouseOut = () => {
    isHover.value = false
}
const addChild = (isLeaf: any) => {
    const name = ''
    expanded.value = true
    var node = new TreeNode({ name, isLeaf })
    props.model.addChildren(node, true)
    emit('add-node', node)
}

const dragStart = (e) => {
    compInOperation = this
    e.dataTransfer.setData('data', 'data')
    e.dataTransfer.effectAllowed = 'move'
    return true
}
const dragEnd = () => {
    compInOperation = null
}
const dragOver = (e) => {
    e.preventDefault()
    return true
}
const dragEnter = () => {
    if (!compInOperation) return
    if (compInOperation.model.id === props.model.id || !compInOperation || isFolder)
        return
    isDragEnterNode.value = true
}
const dragLeave = () => {
    isDragEnterNode.value = false
}
const drop = () => {
    if (!compInOperation) return
    const oldParent = compInOperation.model.parent
    compInOperation.model.moveInto(props.model)
    isDragEnterNode.value = false
    emit('on-drop', {
        target: props.model,
        node: compInOperation.model,
        src: oldParent
    })
}

const dragEnterUp = () => {
    if (!compInOperation) return
    isDragEnterUp.value = true
}
const dragOverUp = (e) => {
    e.preventDefault()
    return true
}
const dragLeaveUp = () => {
    if (!compInOperation) return
    isDragEnterUp.value = false
}
const dropBefore = () => {
    if (!compInOperation) return
    const oldParent = compInOperation.model.parent
    compInOperation.model.insertBefore(props.model)
    isDragEnterUp.value = false
    emit('drop-before', {
        target: props.model,
        node: compInOperation.model,
        src: oldParent
    })
}

const dragEnterBottom = () => {
    if (!compInOperation) return
    isDragEnterBottom.value = true
}
const dragOverBottom = (e) => {
    e.preventDefault()
    return true
}
const dragLeaveBottom = () => {
    if (!compInOperation) return
    isDragEnterBottom.value = false
}
const dropAfter = () => {
    if (!compInOperation) return
    const oldParent = compInOperation.model.parent
    compInOperation.model.insertAfter(props.model)
    isDragEnterBottom.value = false
    emit('drop-after', {
        target: props.model,
        node: compInOperation.model,
        src: oldParent
    })
}

</script>
<style lang="scss" rel="stylesheet/less">
.vtl-border {
    height: 5px;

    &.vtl-up {
        margin-top: -5px;
        background-color: transparent;
    }

    &.vtl-bottom {
        background-color: transparent;
    }

    &.vtl-active {
        border-bottom: 3px dashed blue;
        /*background-color: blue;*/
    }
}

.vtl-node-main {
    display: flex;
    align-items: center;
    padding: 5px 0 5px 1rem;
    cursor: pointer;

    &.selected {
        background-color: rgb(36, 36, 36);
    }

    .vtl-input {
        border: none;
        max-width: 150px;
        border-bottom: 1px solid blue;
    }

    .vtl-node-content {
        color: rgb(153, 153, 153);
        padding-left: 5px;
        font-size: 14px;
        display: inline-block;
    }

    &:hover {
        .vtl-node-content {
            color: #fff;
        }
    }

    &.vtl-active {
        outline: 2px dashed pink;
    }

    .vtl-operation {
        padding-left: 2rem;
        letter-spacing: 1px;
    }
}

.vtl-tree-margin {
    padding-left: 2em;
}
</style>
