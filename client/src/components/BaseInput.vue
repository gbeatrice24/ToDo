<template>
    <input :type="type" :placeholder="placeholder" required
        class="outline-0 w-full border-b-2 border-gray-300 "></input>
</template>

<script setup lang="ts">
defineProps<{
    placeholder: string
    type: string
}>();
</script>