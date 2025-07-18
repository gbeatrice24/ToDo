<template>
    <div class="p-4 rounded-2xl shadow border space-y-5" :class="isMobile ? 'border-2 max-w-xl' : ''">
        <div class="flex items-center">
            <!--done button on phone-->
            <button v-if="isMobile" @click="$emit('done-clicked', task.id)" class="relative w-6 h-6">
                <img v-if="!task.done" src="../assets/notDoneButton.png" />
                <div v-else>
                    <img class="absolute inset-0" src="../assets/doneButton.png" />
                    <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                </div>
            </button>

            <!-- render the two buttons in the same column on desktop-->
            <div class="flex flex-col items-end" :class="isMobile ? 'w-2 order-3' : 'w-2 order-2 ml-auto space-y-5'">
                <!-- task priority-->
                <button class="relative flex items-center justify-center rounded-2xl"
                    :class="bgColor, isMobile ? 'h-3 w-3' : 'text-white text-xs w-auto pr-3 pl-3 h-5'">
                    {{ isMobile ? '' : task.priority }}
                </button>

                <!-- done button on desktop -->
                <button v-if="!isMobile" @click="$emit('done-clicked', task.id)" class="relative w-6 h-6">
                    <img v-if="!task.done" src="../assets/notDoneButton.png" />
                    <div v-else>
                        <img class="absolute inset-0" src="../assets/doneButton.png" />
                        <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                    </div>
                </button>
            </div>

            <!-- task info -->
            <div :class="isMobile ? 'order-2 pl-4' : 'order-1 w-3/4'">
                <h3 class="font-semibold text-black text-2xl">{{ task.name }}</h3>
                <p class="text-gray-500 w-xs">{{ isMobile ? task.date : task.desc }}</p>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/Task';
import { getTaskBgColor } from '@/utils/getTaskBgColor';
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'


defineEmits<{
    (e: 'done-clicked', id: number): void
}>()

const props = defineProps<{ task: Task }>()
const bgColor = getTaskBgColor(props.task)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>