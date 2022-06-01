<template>
    <Codemirror ref="CodemirrorRef" v-model="code" :style="{ height: '100%' }" :autofocus="true" :indent-with-tab="true"
        :tabSize="2" :extensions="extensions" @ready="ready" @change="log('change', $event)"
        @focus="log('focus', $event)" @blur="log('blur', $event)">
    </Codemirror>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { setLang } from 'utils/index'
const props = defineProps({
    code: String,
    type: String
})
const extensions = computed(() => [setLang(props.type), oneDark])
const log = console.log
const CodemirrorRef = ref(null)
function ready(e) {
    console.log(e)
    // view.setOption("extraKeys", {
    //     'Ctrl-S': function () {
    //         console.log(0)
    //     }
    // });
}
</script>
<style>
</style>