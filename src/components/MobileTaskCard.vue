<template>
    <div class="p-4 rounded-2xl shadow border-2 space-y-5 w-full max-w-xs">
        <div class="flex items-center justify-between gap-x-4">
            <button @click="$emit('done-clicked', task.id)" class="relative w-6 shrink-0">
                <img v-if="!task.done" src="../assets/notDoneButton.png" />
                <div v-else>
                    <img class="absolute inset-0" src="../assets/doneButton.png" />
                    <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                </div>
            </button>

            <div class="w-2/4">
                <h3 class="text-black text-2xl">{{ task.name }}</h3>
                <p class="text-gray-300 w-xs">{{ task.date }}</p>
            </div>

            <button class="flex items-center justify-center rounded-2xl text-white text-xs w-3 h-3"
                :class="bgColor"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/Task';
import { getTaskBgColor } from '@/utils/getTaskBgColor';

defineEmits<{
    (e: 'done-clicked', id: number): void
}>()

const props = defineProps<{ task: Task }>()
const bgColor = getTaskBgColor(props.task)

</script>