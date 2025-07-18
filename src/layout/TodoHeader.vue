<template>
    <div class="flex justify-center items-center pt-10 max-w-screen">
        <div class="flex items-center space-x-35">
            <h1 class="text-5xl font-semibold text-black">To do list</h1>
            <button class="flex items-center justify-center bg-emerald-400 text-white rounded-full w-10 h-10"
                @click="$emit('add-task')">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['add-task'])
</script>
