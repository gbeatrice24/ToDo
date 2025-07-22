<template>
    <div @click="$emit('onEdit', task.id)" class="p-4 rounded-2xl border-2" :class="isMobile ? 'max-w-xs' : 'relative'">

        <div v-if="!isMobile" class=" absolute inset-0 bg-white rounded-2xl"
            :class="isPriorityDropdownVisible ? 'opacity-50' : 'opacity-0 invisible'"></div>

        <div class="flex items-center">
            <!--done button on phone-->
            <button v-if="isMobile && !task.editing" @click="$emit('onComplete', task.id)" class="relative w-6 h-6">
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
                        <button @click="isPriorityDropdownVisible = !isPriorityDropdownVisible"
                            class="relative flex items-center justify-center rounded-full order-3 w-20"
                            :class="isPriorityDropdownVisible ? 'bg-white text-black border-2' : [bgColor, 'text-white']">
                            {{ newPriority }}

                            <div v-if="task.editing">
                                <img v-if="!isPriorityDropdownVisible" src="@/assets/arrowDown.png" class="w-3 pl-1">
                                <img v-else src="@/assets/arrowDownB.png" class="w-3 pl-1">
                            </div>
                        </button>

                        <!-- priority dropdown -->
                        <Dropdown v-if="isPriorityDropdownVisible" :choices="['High', 'Medium', 'Low']"
                            @choiceSelected="handleChoiceSelected" />

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
                    <button v-if="!isMobile && !task.editing" @click.stop="$emit('onComplete', task.id)"
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
                        @click="$emit('onSave', { id: task.id, newName: newName, newDesc: newDesc, newPriority: newPriority })"
                        class="bg-emerald-400 text-white text-xs"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Save</button>

                    <button @click="delPopupShowing = true" class="bg-gray-300 text-black text-xs w-20"
                        :class="isMobile ? 'font-semibold rounded-lg p-2 w-15' : 'rounded-xl p-3 w-20'">Delete</button>

                    <!-- delete popup confirmation -->
                    <Popup v-if="delPopupShowing" :message="message" @confirmAction="handleDeleteConfirmation" />

                </div>
            </div>

            <!--task priority on phone -> when isn't actively being edited -->
            <button v-if="isMobile && !task.editing" class="rounded-full order-3 h-3 w-3" :class="bgColor">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from '@/types/Task';
import { getBgColor } from '@/utils/getTaskBgColor';
import { useWindowSize } from '@vueuse/core'
import { ref, computed, watch } from 'vue'

import { faCalendarDays, faL } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Popup from './Popup.vue';
import Dropdown from './Dropdown.vue';

library.add(faCalendarDays)

const emit = defineEmits<{
    (e: 'onComplete', id: number): void,
    (e: 'onEdit', id: number): void,

    (e: 'onSave', payload: { id: number; newName: string; newDesc: string, newPriority: string }): void,
    (e: 'onDelete', id: number): void,

    (e: 'onPriorityModified', payload: { id: number, prio: string }): void
}>()

const props = defineProps<{ task: Task }>()

const newName = ref(props.task.name)
const newDesc = ref(props.task.desc)
const newPriority = ref(props.task.priority)

const bgColor = computed(() => getBgColor(newPriority.value))
const delPopupShowing = ref(false)

const isPriorityDropdownVisible = ref(false)
const priorities = ref([
    { level: 'Low', styleClass: 'rounded-t-2xl pt-2' },
    { level: 'Medium', styleClass: '' },
    { level: 'High', styleClass: 'rounded-b-2xl pb-2' }])

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

const message = ref("Are you sure you want to delete this item? This operation is permanent and you will not be able to undo this action!")


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

function handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed) {
        emit('onDelete', props.task.id)
    }
    delPopupShowing.value = false
}

function handleChoiceSelected(choice: string) {
    newPriority.value = choice;
    isPriorityDropdownVisible.value = false
}

</script>