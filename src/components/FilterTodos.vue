<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col space-y-4 w-xs md:flex-row font-semibold md:w-lg justify-between">
            <div class="flex space-x-3 justify-between">
                <button v-for="sortingOption in sortingOptions" :key="sortingOption.label"
                    class="border pl-3 pr-3 h-8 rounded-md text-xs md:text-base"
                    :class="sortingOption.active ? 'bg-emerald-400 text-white' : 'bg-white text-black'"
                    @click="handleSortByclicked(sortingOption)">
                    {{ sortingOption.label }}
                </button>
            </div>

            <div class="space-x-2">
                <button class="w-8 h-8 rounded-md"
                    :class="isAscending ? 'bg-emerald-400 text-white' : 'bg-black text-white'"
                    @click="handleOrderByClick('ascending')"><font-awesome-icon :icon="['fas', 'arrow-up']" /></button>
                <button class="w-8 h-8 rounded-md "
                    :class="!isAscending ? 'bg-emerald-400 text-white' : 'bg-black text-white '"
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
import { SortingOptionLabel, SortingOption } from "@/types/sorting-option"

library.add(faArrowUp, faArrowDown)

const emit = defineEmits<{
    (e: "onSort", sortingOption: SortingOptionLabel): void,

    (e: "onOrder", isAscending: boolean): void,
}>();

const sortingOptions = ref<SortingOption[]>([
    { label: 'Title', active: true },
    { label: 'Description', active: false },
    { label: 'Priority', active: false },
    { label: 'Date', active: false }])

const isAscending = ref(true)

function resetButtons(label: SortingOptionLabel) {
    sortingOptions.value.forEach((sortingOption) => sortingOption.active = sortingOption.label === label)
}

function handleOrderByClick(orderingOption: string) {
    isAscending.value = orderingOption === "ascending"
    emit('onOrder', isAscending.value)
}

function handleSortByclicked(sortingOption: SortingOption) {
    emit('onSort', sortingOption.label);
    resetButtons(sortingOption.label);
}

</script>