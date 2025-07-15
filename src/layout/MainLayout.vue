<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask"/>

        <div v-if="isEmpty" class="flex justify-center items-center">
            <img src="../assets/notodos.png" alt="NoTodos" class="max-w-xs mx-auto">
        </div>
        <div v-else class="flex justify-center items-center">
            <li v-for="task in tasks">{{ task.name }}</li>
        </div>

    </div>
</template>

<script setup lang="ts">
import TodoHeader from './TodoHeader.vue';
import { ref, computed } from 'vue'

interface Task {
    id: number
    name: string
    desc: string
    priority: string
}

const tasks = ref<Task[]>([])
let nextId = 0

const isEmpty = computed(() => tasks.value.length == 0)

function handleAddTask(){
    const task = ({
        id: ++nextId,
        name: `Task ${nextId}`,
        desc: `This is a description`,
        priority: 'High',
    })
    tasks.value.push(task)

    console.log('new task added:', task)
}

</script>