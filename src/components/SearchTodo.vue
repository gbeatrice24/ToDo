<template>
    <div class="flex justify-center items-center">
        <div
            class="flex flex-row p-4 rounded-lg md:rounded-2xl border-2 w-xs space-x-2 md:w-lg bg-white font-semibold justify-between">
            <img class="w-6" src="../assets/Search.svg" />
            <input v-model="search" placeholder="Search todos..." class=" w-1/1 outline-0 placeholder-gray-600"
                @keyup.enter="$emit('onSearch', search)" />
            <button class="bg-black text-white rounded-md text-xs p-2 w-20"
                @click="$emit('onSearch', search)">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineEmits<{
    (e: "onSearch", search: string): void,
}>();

const search = ref('')
</script>