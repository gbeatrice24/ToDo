<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col space-y-4 md:flex-row font-semibold md:w-lg justify-between">
            <div class="space-x-3">
                <button v-for="by in orderBy" :key="by.name" class="border pl-3 pr-3 h-8 rounded-md"
                    :class="by.active ? 'bg-emerald-400 text-white' : 'bg-white text-black'"
                    @click="$emit('onSort', by.name); resetButtons(by.name); console.log(by.active)">
                    {{ by.name }}
                </button>
            </div>

            <div class="space-x-2">
                <button class="bg-emerald-400 text-xs text-white w-8 h-8 rounded-md"
                    @click="$emit('onOrder', 'ascending')"><font-awesome-icon :icon="['fas', 'arrow-up']" /></button>
                <button class="bg-black text-xs text-white w-8 h-8 rounded-md"
                    @click="$emit('onOrder', 'descending')"><font-awesome-icon :icon="['fas', 'arrow-down']" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown)

// v modellel?

defineEmits<{
    (e: "onSort", sortBy: string): void,

    (e: "onOrder", orderBy: string): void,
}>();

const orderBy = ref([
    { name: 'Title', active: true },
    { name: 'Description', active: false },
    { name: 'Priority', active: false },
    { name: 'Date', active: false }])

function resetButtons(name: string) {
    orderBy.value.forEach((by) => by.active = by.name === name)
}

</script>