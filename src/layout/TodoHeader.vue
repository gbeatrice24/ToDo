<template>
    <div class="flex justify-center items-center pt-10 max-w-screen">
        <div class="flex items-center space-x-35">
            <h1 class="font-semibold text-black text-5xl md:text-6xl">To do list</h1>
            <button
                class="flex items-center justify-center bg-emerald-400 text-white rounded-full w-10 h-10 md:w-12 md:h-12"
                @click="$emit('onAddTask')">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

defineEmits(['onAddTask'])

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>
