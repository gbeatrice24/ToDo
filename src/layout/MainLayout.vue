<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask" />

        <div class="flex justify-center items-center ">
            <img v-if="isEmpty" src="../assets/notodos.png" alt="NoTodos" class="max-w-xs mx-auto">

            <div v-else class="grid gap-8">
                <TaskCard v-for="task in tasks" :key="task.id" :task="task" @done-clicked="handleDoneClicked" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import TodoHeader from './TodoHeader.vue';
import TaskCard from '@/components/TaskCard.vue';

import { Task } from '@/types/Task';

import { ref, computed } from 'vue'


const tasks = ref<Task[]>([])
let nextId = 0
const isEmpty = computed(() => tasks.value.length == 0)

function handleAddTask() {
    const task = ({
        id: ++nextId,
        name: `Task`,
        desc: `Here goes the description`,
        priority: 'High',
        done: false,
        date: new Date().toLocaleDateString(),
        editing: false
    })
    tasks.value.unshift(task)

    console.log('new task added:', task)
}

function handleDoneClicked(id: number) {
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, done: !task.done })
        console.log("Task", realId, "done modified")
    }
}



//////// TEST /////////
const task1 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'High',
    done: false,
    date: new Date().toLocaleDateString(),
    editing: false
})
tasks.value.unshift(task1)

const task2 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'Medium',
    done: false,
    date: new Date().toLocaleDateString(),
    editing: false
})
tasks.value.unshift(task2)

const task3 = ({
    id: ++nextId,
    name: `Task ${nextId}`,
    desc: `This is a description`,
    priority: 'Low',
    done: false,
    date: new Date().toLocaleDateString(),
    editing: false
})
tasks.value.unshift(task3)


</script>