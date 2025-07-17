<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask" />

        <div v-if="isEmpty" class="flex justify-center items-center">
            <img src="../assets/notodos.png" alt="NoTodos" class="max-w-xs mx-auto">
        </div>
        <div v-else class="flex justify-center items-center">
            <div class="task-list grid gap-8">
                <component v-for="task in tasks" :is="isMobile ? MobileTaskCard : DesktopTaskCard" :key="task.id"
                    :task="task" @done-clicked="handleDoneClicked" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import TodoHeader from './TodoHeader.vue';
import DesktopTaskCard from '@/components/DesktopTaskCard.vue';
import MobileTaskCard from '@/components/MobileTaskCard.vue';

import { Task } from '@/types/Task';

import { ref, computed, reactive } from 'vue'

import { useWindowSize } from '@vueuse/core'

const tasks = ref<Task[]>([])
let nextId = 0
const isEmpty = computed(() => tasks.value.length == 0)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

function handleAddTask() {
    const task = reactive({
        id: ++nextId,
        name: `Task ${nextId}`,
        desc: `This is a description`,
        priority: 'High',
        done: false,
        date: new Date().toLocaleDateString(),
    })
    tasks.value.push(task)

    console.log('new task added:', task)
}

function handleDoneClicked(id: number) {
    tasks.value = tasks.value.map((task) => {
        if (task.id === id) {
            task.done = !task.done
        }
        return { ...task }
    })

    console.log("Task", id, "done button clicked")
}



//////// TEST /////////
const task1 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'High',
    done: false,
    date: new Date().toLocaleDateString(),
})
tasks.value.push(task1)

const task2 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'Medium',
    done: false,
    date: new Date().toLocaleDateString(),
})
tasks.value.push(task2)

const task3 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'Low',
    done: false,
    date: new Date().toLocaleDateString(),
})
tasks.value.push(task3)


</script>