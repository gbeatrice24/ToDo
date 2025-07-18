<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask" />

        <div class="flex justify-center items-center ">
            <img v-if="isEmpty" src="../assets/notodos.png" alt="NoTodos" class="max-w-xs mx-auto">

            <div v-else class="grid gap-8">
                <TaskCard v-for="task in tasks" :key="task.id" :task="task" @done-clicked="handleDoneClicked"
                    @edit-requested="handleEditRequested" @save-clicked="handleSaveClicked"
                    @delete-clicked="handleDeleteClicked" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import TodoHeader from './TodoHeader.vue';
import TaskCard from '@/components/TaskCard.vue';

import { Task } from '@/types/Task';
import { getTaskBgColor } from '@/utils/getTaskBgColor';

import { ref, computed } from 'vue'


const tasks = ref<Task[]>([])
let nextId = 0
const isEmpty = computed(() => tasks.value.length == 0)

function handleAddTask() {
    const task = ({
        id: ++nextId,
        name: `Task`,
        desc: ``,
        priority: 'High',
        done: false,
        date: formatDate(new Date()),
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
        console.log("Task", id, "done modified")
    }
}

function handleEditRequested(id: number) {
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, editing: true })
    }
}

function handleSaveClicked(payload: { id: number, newDesc: string, newPrio: string }) {
    const { id, newDesc, newPrio } = payload;
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, priority: newPrio, desc: newDesc, editing: false })
        console.log("Task", id, "changed", newDesc, newPrio)
    }
}

function handleDeleteClicked(id: number) {
    console.log(tasks.value)
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1)
    }

    console.log(tasks.value)
}

function formatDate(date: Date) {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`
}



//////// TEST /////////
const task3 = ({
    id: ++nextId,
    name: `Task  `,
    desc: ``,
    priority: 'Low',
    done: false,
    date: formatDate(new Date()),
    editing: false
})
tasks.value.unshift(task3)

const task2 = ({
    id: ++nextId,
    name: `Task  `,
    desc: ``,
    priority: 'Medium',
    done: false,
    date: formatDate(new Date()),
    editing: false
})
tasks.value.unshift(task2)

const task1 = ({
    id: ++nextId,
    name: `Task`,
    desc: ``,
    priority: 'High',
    done: false,
    date: formatDate(new Date()),
    editing: true
})
tasks.value.unshift(task1)


</script>