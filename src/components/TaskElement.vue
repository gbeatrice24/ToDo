<template>
    <div class="p-4 rounded-4xl shadow border">
        <h3 class="font-semibold text-black text-2xl">{{ task.name }}</h3>
        <p>{{ task.desc }}</p>
        <p>Priority: {{ task.priority }}</p>
        <p>Date added: {{ task.date }}</p>
    </div>
</template>

<script setup lang="ts">
    import { Task } from '@/types/Task';

    defineProps<{ task: Task}>()
</script>