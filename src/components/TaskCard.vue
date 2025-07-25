<template>
    <div class="p-4 rounded-2xl border-2 max-w-xs md:max-w-xl md:relative bg-white" @click="$emit('onEdit', task.id)">
        <!-- dim bg for priority dropdown -->
        <div v-if="!isMobile" class="absolute inset-0 bg-white rounded-2xl"
            :class="isPriorityDropdownVisible ? 'opacity-50' : 'invisible'"></div>

        <div class="flex items-center">
            <!--done button on phone-->
            <button v-if="isMobile && !task.editing" class="relative w-6 h-6"
                @click.stop="$emit('onComplete', task.id)">
                <img v-if="!task.done" src="../assets/CircleBlack.svg" />
                <img v-else class="absolute inset-0" src="../assets/CircleGreen.svg" />

                <!-- animated checkmark -->
                <img class="absolute inset-0 transition-all duration-500 ease-out transform"
                    :class="task.done ? 'opacity-100 scale-100' : 'opacity-0 scale-50'" src="../assets/Checkmark.svg" />

            </button>

            <!-- task info -->
            <div class="order-2 pl-2 w-7/8 md:'order-1 md:w-1/1">
                <div class="flex flex-row space-x-10 static">
                    <!-- task name -->
                    <input v-model="newName" class="font-semibold text-black text-2xl outline-0 w-45 md:w-2/3" />

                    <!-- task priority on desktop -->
                    <div v-if="!isMobile" class="relative">
                        <button class="relative flex items-center justify-center rounded-full order-3 w-20" :class="isPriorityDropdownVisible
                            ? 'bg-white text-black border-2'
                            : [bgColor, 'text-white']
                            " @click="isPriorityDropdownVisible = !isPriorityDropdownVisible">
                            {{ newPriority }}

                            <div v-if="task.editing">
                                <img v-if="!isPriorityDropdownVisible" class="w-3 pl-1"
                                    src="@/assets/ArrowDownWhite.svg" />
                                <img v-else class="w-3 pl-1" src="@/assets/ArrowDownBlack.svg" />
                            </div>
                        </button>

                        <!-- priority dropdown -->
                        <Dropdown v-if="isPriorityDropdownVisible" :choices="priorities"
                            @choiceSelected="handleChoiceSelected" />
                    </div>

                    <!-- task priority on phone -> while being actively edited -->
                    <div v-if="isMobile && task.editing" class="flex flex-row order-3 space-x-2">
                        <button v-for="priority in priorities" :key="priority"
                            class="rounded-full order-3 h-3 w-3 focus:outline-2"
                            :class="getPriorityButtonBgColor(priority)" @click="newPriority = priority"></button>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div v-if="isMobile" class="flex flex-row space-x-2 content-center">
                            <font-awesome-icon v-if="task.editing" :icon="['fas', 'calendar-days']" />
                            <p class="w-xs" :class="task.editing ? '' : 'text-gray-500'">
                                {{ task.date }}
                            </p>
                        </div>

                        <textarea v-if="!isMobile || task.editing" v-model="newDesc"
                            placeholder="Here goes the description." class="outline-0 resize-none w-3/4 md:w-90"
                            :class="task.editing ? 'h-20' : 'h-7'"></textarea>
                    </div>

                    <!-- done button on desktop -->
                    <button v-if="!isMobile && !task.editing" class="relative w-6 h-6 ml-auto"
                        @click.stop="$emit('onComplete', task.id)">
                        <img v-if="!task.done" src="../assets/CircleBlack.svg" />
                        <img v-else class="absolute inset-0" src="../assets/CircleGreen.svg" />

                        <!-- animated checkmark -->
                        <img class="absolute inset-0 transition-all duration-500 ease-out transform"
                            :class="task.done ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
                            src="../assets/Checkmark.svg" />

                    </button>
                </div>

                <div v-if="task.editing" class="space-x-3 font-semibold text-xs" @click.stop>
                    <button class="bg-emerald-400 text-white rounded-lg p-2 w-15 md:rounded-xl md:p-3 md:w-20" @click="
                        $emit('onSave', {
                            id: task.id,
                            newName: newName,
                            newDesc: newDesc,
                            newPriority: newPriority,
                        })
                        ">
                        Save
                    </button>

                    <button class="bg-gray-300 text-black rounded-lg p-2 w-15 md:rounded-xl md:p-3 md:w-20"
                        @click="delPopupShowing = true">
                        Delete
                    </button>

                    <!-- delete popup confirmation -->
                    <Popup v-if="delPopupShowing" :message="message" @onConfirm="handleDeleteConfirmation"
                        @onCancel="handleDeleteCancel" />
                </div>
            </div>

            <!--task priority on phone -> when isn't actively being edited -->
            <button v-if="isMobile && !task.editing" class="rounded-full order-3 h-3 w-3" :class="bgColor"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Task } from "@/types/Task";
import { getPriorityButtonBgColor } from "@/utils/get-priority-button-bg-color";
import { useWindowSize } from "@vueuse/core";
import { ref, computed, watch } from "vue";

import { faCalendarDays, faL } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Popup from "./Popup.vue";
import Dropdown from "./Dropdown.vue";

library.add(faCalendarDays);

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
    (e: "onComplete", id: number): void;
    (e: "onEdit", id: number): void;

    (
        e: "onSave",
        payload: {
            id: number;
            newName: string;
            newDesc: string;
            newPriority: string;
        }
    ): void;
    (e: "onDelete", id: number): void;

    (e: "onPriorityModified", payload: { id: number; priority: string }): void;
}>();

const newName = ref(props.task.name);
const newDesc = ref(props.task.desc);
const newPriority = ref(props.task.priority);
const delPopupShowing = ref(false);
const isPriorityDropdownVisible = ref(false);

const priorities = ['High', 'Medium', 'Low'];

const message = ref(
    "Are you sure you want to delete this item? This operation is permanent and you will not be able to undo this action!"
);

const bgColor = computed(() => getPriorityButtonBgColor(newPriority.value));
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

watch(
    () => props.task.editing,
    (editing) => {
        delPopupShowing.value = false;
        if (!editing) resetTaskCard();
    }
);

function resetTaskCard() {
    newName.value = props.task.name;
    newDesc.value = props.task.desc;
    newPriority.value = props.task.priority;
    isPriorityDropdownVisible.value = false;

    console.log("task card reseted", props.task.id);
}

function handleDeleteConfirmation() {
    emit("onDelete", props.task.id);
    delPopupShowing.value = false;
}

function handleDeleteCancel() {
    delPopupShowing.value = false;
}

function handleChoiceSelected(choice: string) {
    newPriority.value = choice;
    isPriorityDropdownVisible.value = false;
}
</script>
