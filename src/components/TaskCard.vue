<template>
    <div @click="$emit('edit-requested', task.id)" class="p-4 rounded-2xl shadow border space-y-5"
        :class="isMobile ? 'border-2 max-w-xs' : ''">
        <div class="flex items-center">
            <!--done button on phone-->
            <button v-if="isMobile && !task.editing" @click="$emit('done-clicked', task.id)" class="relative w-6 h-6">
                <img v-if="!task.done" src="../assets/notDoneButton.png" />
                <div v-else>
                    <img class="absolute inset-0" src="../assets/doneButton.png" />
                    <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                </div>
            </button>

            <!-- task info -->
            <div :class="isMobile ? 'order-2 pl-2 w-7/8' : 'order-1 w-1/1'">
                <div class="flex flex-row space-x-10 static">
                    <input v-model="task.name" class="font-semibold text-black text-2xl outline-0 w-2/3">

                    <!-- task priority on desktop -->
                    <button @click="priorChooser = true" v-if="!isMobile"
                        class="relative flex items-center justify-center rounded-2xl order-3 ml-auto"
                        :class="bgColor, isMobile ? 'h-3 w-3' : 'text-white text-xs w-auto pr-3 pl-3 h-5'">
                        {{ isMobile ? '' : task.priority }}
                        <img v-if="task.editing" src="@/assets/arrowDown.png" class="w-3 pl-1">
                    </button>

                    <!-- <div v-if="priorChooser" class="absolute bottom-top left-3/5 bg-red-500">
                        ez elol van
                    </div> -->

                    <!-- task priority on phone -> while being actively edited -->
                    <div v-if="isMobile && task.editing" class="flex flex-row order-3 space-x-2">
                        <button @click="priority = 'Low'"
                            class="rounded-2xl order-3 h-3 w-3 bg-teal-400 focus:outline-2"></button>
                        <button @click="priority = 'Medium'"
                            class="rounded-2xl order-3 h-3 w-3 bg-amber-500 focus:outline-2"></button>
                        <button @click="priority = 'High'"
                            class="rounded-2xl order-3 h-3 w-3 bg-red-500 focus:outline-2"></button>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div v-if="isMobile" class="flex flex-row space-x-2 content-center">
                            <font-awesome-icon v-if="task.editing" :icon="['fas', 'calendar-days']" />
                            <p class="w-xs" :class="task.editing ? '' : 'text-gray-500'">{{ task.date }}</p>
                        </div>
                        <!-- resize on bigger text? -->
                        <textarea v-if="!isMobile || task.editing" v-model="text"
                            placeholder="Here goes the description." class=" w-1/1 outline-0 resize-none"
                            :class="task.editing ? 'h-20' : 'h-7'"></textarea>
                    </div>

                    <!-- done button on desktop -->
                    <button v-if="!isMobile && !task.editing" @click.stop @click="$emit('done-clicked', task.id)"
                        class="relative w-6 h-6 ml-auto">
                        <img v-if="!task.done" src="../assets/notDoneButton.png" />
                        <div v-else>
                            <img class="absolute inset-0" src="../assets/doneButton.png" />
                            <img class="absolute inset-0" src="../assets/doneCheckmark.png" />
                        </div>
                    </button>
                </div>

                <div v-if="task.editing" @click.stop class="space-x-3">
                    <button @click="$emit('save-clicked', { id: task.id, newDesc: newDesc, newPrio: priority })"
                        class="bg-emerald-400 text-white text-xs"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Save</button>
                    <button @click="$emit('delete-clicked', task.id)" class="bg-gray-300 text-black text-xs w-20"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Delete</button>
                </div>
            </div>

            <!-- task priority on phone -> when isn't actively being edited -->
            <button v-if="isMobile && !task.editing" class="rounded-2xl order-3 h-3 w-3" :class="bgColor"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/Task';
import { getTaskBgColor } from '@/utils/getTaskBgColor';
import { useWindowSize } from '@vueuse/core'
import { ref, computed } from 'vue'

import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCalendarDays)

defineEmits<{
    (e: 'done-clicked', id: number): void,
    (e: 'edit-requested', id: number): void,

    (e: 'save-clicked', payload: { id: number; newDesc: string, newPrio: string }): void,
    (e: 'delete-clicked', id: number): void,
}>()

const props = defineProps<{ task: Task }>()
const bgColor = computed(() => getTaskBgColor(props.task))
const name = ref(props.task.name)
const newDesc = ref('')
const text = ref(props.task.desc)
const priority = ref(props.task.priority)

const priorChooser = ref(false)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>