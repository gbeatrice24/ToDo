<template>
    <div class="p-4 rounded-2xl shadow border space-y-5">
        <div class="flow-root">
            <h3 class="font-semibold text-black text-2xl float-left">{{ task.name }}</h3>
            <button
                class="flex items-center justify-center rounded-2xl text-white text-xs w-auto pr-3 pl-3 h-5 float-right"
                :class="bgColor">
                {{ task.priority }}
            </button>
        </div>
        <div class="flow-root">
            <p class="text-gray-500 w-xs float-left">{{ task.desc }}</p>

            <button @click="$emit('done-clicked', task.id)" class="relative w-6 float-right">
                <img v-if="!task.done" src="../assets/notDoneButton.png" />
                <div v-else>
                    <img class="absolute inset-0" src="../assets/doneButton.png" />
                    <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                </div>
            </button>
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