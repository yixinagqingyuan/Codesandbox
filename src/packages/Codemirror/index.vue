<template>
    <Codemirror style="font-size: 16px;" ref="CodemirrorRef" v-model="code" :style="{ height: '100%' }"
        :autofocus="true" :indent-with-tab="true" :tabSize="2" :extensions="extensions" @change="change">
    </Codemirror>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { setLang } from 'utils/index'
const emit = defineEmits(['change'])
const props = defineProps({
    code: String,
    type: String
})
const extensions = computed(() => [setLang(props.type), oneDark])
const CodemirrorRef = ref(null)
const change = (e) => {
    emit('change', e)
}
</script>
<style>
</style>