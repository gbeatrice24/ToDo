<template>
    <div class="p-4 rounded-2xl shadow border space-y-5">
        <div class="flow-root">
            <h3 class="font-semibold text-black text-2xl float-left">{{ task.name }}</h3>
            <button
                class="flex items-center justify-center rounded-2xl text-white text-xs w-auto pr-3 pl-3 h-5 float-right"
                :class="bgColor"
            >
                {{ task.priority }}
            </button>
        </div>
        <div class="flow root">
            <p class="text-gray-500 w-xs float-left">{{ task.desc }}</p>
            <button @click="doneClicked()" class="relative w-6 float-right">
                <img v-if="!task.done" src="../assets/notDoneButton.png"/>
                <div v-else>
                    <img 
                        class="absolute inset-0"
                        src="../assets/doneButton.png"
                    />
                    <img
                        class="absolute inset-0" 
                        src="../assets/doneCheckmark.png"
                    />
                </div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Task } from '@/types/Task';
    import { computed } from 'vue';

    const props = defineProps<{ task: Task}>()

    const bgColor = computed(() => {
        const priority = props.task.priority

        switch(priority){
            case 'High':
                return 'bg-red-500'
            case 'Medium':
                return 'bg-amber-500'
            case 'Low':
                return 'bg-teal-400'
            default:
                return 'bg-gray-500'
        }
    })

    function doneClicked(){
        props.task.done = !props.task.done
        console.log("done clicked for task", props.task.id)
    }
</script>