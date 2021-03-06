<template>
    <div ref="monacoEditor" class="monaco_editor_container"></div>
</template>
<script setup lang="ts">
//https://github.com/FE-Mars/monaco-editor-vue/blob/master/src/index.js
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// @ts-ignore
(window as any).MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
};

interface Props {
    value?: string,
    language?: string,
    theme?: string,
    options?: any,
    editorMounted?: any,
    editorBeforeMount?: any
}
const props = withDefaults(defineProps<Props>(), {
    language: 'vue',
    theme: 'vs',
    options: () => ({}),
    editorMounted: () => () => { },
    editorBeforeMount: () => () => { }
})
let editor: any = null
let monacoEditor = ref(null)
function _editorBeforeMount() {
    const options = props.editorBeforeMount(monaco);
    return options || {};
}
function _getValue() {
    let editor = _getEditor();
    if (!editor) return '';
    return editor.getValue();
}
function _emitChange(value, event) {
    console.log(value, event)
    // this.$emit('change', value, event);
    // this.$emit('input', value);
}
function _setModel(value, original) {     //diff模式下设置model
    const originalModel = monaco.editor.createModel(original, props.language);
    const modifiedModel = monaco.editor.createModel(value, props.language);
    editor.setModel({
        original: originalModel,
        modified: modifiedModel
    });
}

function _editorMounted(editor) {
    props.editorMounted(editor, monaco);
    editor.onDidChangeModelContent(event => {
        const value = _getValue();
        _emitChange(value, event);
    });
}
// 初始化
function initMonaco() {
    const options = Object.assign(props.options, _editorBeforeMount());      //编辑器初始化前
    editor = monaco.editor.create(monacoEditor.value, {
        value: props.value,
        language: props.language,
        theme: props.theme,
        ...options
    });
    _editorMounted(editor);      //编辑器初始化后
}

function _getEditor() {
    if (!editor) return null;
    return editor;
}


function _setValue(value) {
    let editor = this._getEditor();
    if (editor) return editor.setValue(value);
}


onMounted(() => {
    initMonaco()
})
onBeforeUnmount(() => {
    editor && editor.dispose();
})
</script>

<style lang="scss" scoped>
.monaco_editor_container {
    width: 100%;
    height: 100%;
}
</style>