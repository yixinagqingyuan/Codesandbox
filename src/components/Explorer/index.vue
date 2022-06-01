
<template>
    <div>
        <draggable v-model="myArray" item-key="id">
            <template #item="{ element }">
                <div>
                    <div class="item" @click="handleClick(element)"> {{ element.title }} </div>
                </div>

            </template>
        </draggable>
    </div>

</template>
<script setup lang="ts">
import draggable from 'vuedraggable'
import { useStore } from 'vuex'
import { ref } from 'vue';
const store = useStore()
const myArray = ref([])
const props = defineProps({
    directories: Array,
    modules: Array
})
myArray.value = props.modules || []
const handleClick = (element) => {
    store.commit('setCurrentCode', element)
}
</script>
<style lang="scss" scoped>
.item {
    color: #000;
    font-size: 20px;

}
</style>
