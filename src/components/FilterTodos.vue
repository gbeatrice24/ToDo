<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col space-y-4 w-xs md:flex-row font-semibold md:w-lg justify-between">
            <div class="flex space-x-3 justify-between">
                <button v-for="by in sortBy" :key="by.label"
                    class="border pl-3 pr-3 h-8 rounded-md text-xs md:text-base transition duration-400 ease-in-out"
                    :class="by.active ? 'bg-emerald-400 text-white' : 'bg-white text-black'"
                    @click="$emit('onSort', by.label); resetButtons(by.label);">
                    {{ by.label }}
                </button>
            </div>

            <div class="space-x-2">
                <button class="w-8 h-8 rounded-md transition duration-400 ease-in-out"
                    :class="ascending ? 'bg-emerald-400 text-white' : 'bg-black text-white'"
                    @click="handleOrderByClick('ascending')"><font-awesome-icon :icon="['fas', 'arrow-up']" /></button>
                <button class="w-8 h-8 rounded-md "
                    :class="!ascending ? 'bg-emerald-400 text-white' : 'bg-black text-white '"
                    @click="handleOrderByClick('descending')"><font-awesome-icon
                        :icon="['fas', 'arrow-down']" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown)

const emit = defineEmits<{
    (e: "onSort", sortBy: string): void,

    (e: "onOrder", ascending: boolean): void,
}>();

const sortBy = ref([
    { label: 'Title', active: true },
    { label: 'Description', active: false },
    { label: 'Priority', active: false },
    { label: 'Date', active: false }])

const ascending = ref(true)

function resetButtons(label: string) {
    sortBy.value.forEach((by) => by.active = by.label === label)
}

function handleOrderByClick(order: string) {
    ascending.value = order === "ascending"
    emit('onOrder', ascending.value)
}

</script>