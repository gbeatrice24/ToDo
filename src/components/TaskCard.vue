<template>
    <div @click="$emit('edit-requested', task.id)" class="p-4 rounded-2xl border-2"
        :class="isMobile ? 'max-w-xs' : 'relative'">

        <div v-if="!isMobile" class=" absolute inset-0 bg-white rounded-2xl"
            :class="priorChooser ? 'opacity-50' : 'opacity-0 invisible'"></div>

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
                    <!-- task name -->
                    <input v-model="newName" class="font-semibold text-black text-2xl outline-0 w-2/3"
                        :class="isMobile ? 'w-45' : ''">

                    <!-- task priority on desktop -->
                    <div v-if="!isMobile" class="relative">
                        <button @click="priorChooser = !priorChooser"
                            class="relative flex items-center justify-center rounded-full order-3 w-20"
                            :class="priorChooser ? 'bg-white text-black border-2' : [bgColor, 'text-white']">
                            {{ newPriority }}

                            <div v-if="task.editing">
                                <img v-if="!priorChooser" src="@/assets/arrowDown.png" class="w-3 pl-1">
                                <img v-else src="@/assets/arrowDownB.png" class="w-3 pl-1">
                            </div>
                        </button>

                        <!-- priority dropdown -->
                        <div v-if="priorChooser"
                            class="absolute top-full left-0 mt-1 w-full bg-white rounded-2xl border-2 z-10">
                            <ul class="flex flex-col text-sm text-black">
                                <li v-for="(priority, index) in priorities"
                                    @click="newPriority = priority.level; priorChooser = false"
                                    class="px-2 hover:bg-gray-100" :class="[index === 0 ? 'rounded-t-2xl pt-2' : '',
                                    index === 2 ? 'rounded-b-2xl pb-2' : '']">{{ priority.level }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- task priority on phone -> while being actively edited -->
                    <div v-if="isMobile && task.editing" class="flex flex-row order-3 space-x-2 ">
                        <button v-for="priority in priorities" @click="newPriority = priority.level"
                            class="rounded-full order-3 h-3 w-3 focus:outline-2"
                            :class="getBgColor(priority.level)"></button>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div v-if="isMobile" class="flex flex-row space-x-2 content-center">
                            <font-awesome-icon v-if="task.editing" :icon="['fas', 'calendar-days']" />
                            <p class="w-xs" :class="task.editing ? '' : 'text-gray-500'">{{ task.date }}</p>
                        </div>
                        <!-- resize on bigger text? -->
                        <textarea v-if="!isMobile || task.editing" v-model="newDesc"
                            placeholder="Here goes the description." class=" w-90 outline-0 resize-none "
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
                    <button
                        @click="$emit('save-clicked', { id: task.id, newName: newName, newDesc: newDesc, newPriority: newPriority })"
                        class="bg-emerald-400 text-white text-xs"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Save</button>
                    <!--  <button @click="$emit('delete-clicked', task.id)" class="bg-gray-300 text-black text-xs w-20" -->
                    <button @click="delPopupShowing = true" class="bg-gray-300 text-black text-xs w-20"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Delete</button>

                    <!-- delete popup confirmation -->
                    <div v-if="delPopupShowing" class="absolute z-50 flex items-center justify-center"
                        :class="isMobile ? 'inset-0' : ''">
                        <div class=" border p-4 rounded-xl shadow-lg bg-white space-y-4  space-x-3 text-center z-50"
                            :class="isMobile ? 'w-10/11' : ''">
                            <h3 class="font-semibold">Are you sure you want to delete this item? This operation is
                                permanent and you will not be able to undo this action!</h3>
                            <button @click="$emit('delete-clicked', task.id)"
                                class="font-semibold bg-red-500 text-white w-15 "
                                :class="isMobile ? 'font-semibold rounded-lg p-2' : 'rounded-xl h-10'">Yes</button>
                            <button @click="delPopupShowing = false" class="font-semibold bg-gray-300 text-black w-17"
                                :class="isMobile ? 'rounded-lg p-2' : 'rounded-xl h-10'">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>

            <!-- task priority on phone -> when isn't actively being edited -->
            <button v-if="isMobile && !task.editing" class="rounded-full order-3 h-3 w-3" :class="bgColor"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/Task';
import { getBgColor } from '@/utils/getTaskBgColor';
import { useWindowSize } from '@vueuse/core'
import { ref, computed, watch } from 'vue'

import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCalendarDays)

defineEmits<{
    (e: 'done-clicked', id: number): void,
    (e: 'edit-requested', id: number): void,

    (e: 'save-clicked', payload: { id: number; newName: string; newDesc: string, newPriority: string }): void,
    (e: 'delete-clicked', id: number): void,

    (e: 'priority-chosen', payload: { id: number, prio: string }): void
}>()

const props = defineProps<{ task: Task }>()

let newName = ref(props.task.name)
let newDesc = ref(props.task.desc)
let newPriority = ref(props.task.priority)

const bgColor = computed(() => getBgColor(newPriority.value))
const delPopupShowing = ref(false)

const priorChooser = ref(false)
const priorities = ref([{ level: 'Low' }, { level: 'Medium' }, { level: 'High' }])

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

watch(() => props.task.editing, (editing) => {
    delPopupShowing.value = false
    if (!editing) resetTaskCard()
})

function resetTaskCard() {
    newName.value = props.task.name
    newDesc.value = props.task.desc
    newPriority.value = props.task.priority

    console.log("task card reseted", props.task.id)
}

</script>