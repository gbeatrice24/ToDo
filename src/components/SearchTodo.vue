<template>
    <div class="flex justify-center items-center">
        <div
            class="flex flex-roe p-4 rounded-lg md:rounded-2xl border-2 md:w-107 max-w-xs md:max-w-xl bg-white space-x-4 font-semibold">
            <img class="w-6" src="../assets/Search.svg" />
            <input v-model="search" placeholder="Search todos..." class="w-2/3 outline-0 placeholder-gray-600"
                @keyup.enter="$emit('onSearch', search)" />
            <button class="bg-black text-white rounded-md text-xs p-2 w-15"
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