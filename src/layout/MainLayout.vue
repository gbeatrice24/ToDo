<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask" />

        <div class="flex justify-center items-center ">
            <img v-if="isEmpty" src="../assets/notodos.png" alt="NoTodos" class="max-w-xs mx-auto">

            <div v-else class="grid gap-8">
                <TaskCard v-for="task in tasks" :key="task.id" :task="task" @done-clicked="handleDoneClicked"
                    @edit-requested="handleEditRequested" @save-clicked="handleSaveClicked"
                    @delete-clicked="handleDeleteClicked" @priority-chosen="handlePriorityChoosen" />
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
    tasks.value.map(task => task.editing = false)

    const task = ({
        id: ++nextId,
        name: `Task`,
        desc: ``,
        priority: 'High',
        done: false,
        date: formatDate(new Date()),
        editing: true
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
    tasks.value.map(task => task.editing = false)
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, editing: true })
    }
}

function handleSaveClicked(payload: {
    id: number,
    newName: string,
    newDesc: string,
    newPriority: string,
}) {
    const { id, newName, newDesc, newPriority } = payload;
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, name: newName, desc: newDesc, priority: newPriority, editing: false })
        console.log("Task", id, "changed", newName, newDesc, newPriority)
    }
}

function handleDeleteClicked(id: number) {
    console.log(tasks.value)
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1)
    }

    tasks.value.map(task => (task.id > id) ? task.id-- : '')
    nextId--;

    console.log(tasks.value)
}

function handlePriorityChoosen(payload: { id: number, prio: string }) {
    const { id, prio } = payload;
    const task = tasks.value.find(task => task.id === id)
    const realId = tasks.value.length - id
    if (task) {
        tasks.value.splice(realId, 1, { ...task, priority: prio })
        console.log("Task", id, "priority changed", prio)
    }
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
    name: `Task`,
    desc: ``,
    priority: 'Low',
    done: false,
    date: formatDate(new Date()),
    editing: false
})
tasks.value.unshift(task3)

const task2 = ({
    id: ++nextId,
    name: `Task`,
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