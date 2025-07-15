<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

interface Task {
  name: string
  desc: string
  priority: string
}

function createTask(name: string, desc: string, priority: string): Task {
  return { name, desc, priority }
}

function createTodo() {
    count.value++
    const newTask = createTask('Task' + count.value, 'This is a description', 'High')
    console.log(newTask)
}

</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="flex items-center space-x-4">
            <h1 class="text-4xl font-semibold text-black">To do list</h1>
            <button 
                class="flex items-center justify-center bg-green-400 text-white rounded-full w-10 h-10" 
                @click="createTodo">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
    </div>
</template>

<style>
</style>