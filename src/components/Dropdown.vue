<template>
    <div class="absolute top-full left-0 mt-1 w-full bg-white rounded-2xl border-2 z-10">
        <ul class="flex flex-col text-sm text-black">
            <li v-for="choice in props.choices" :key="choice" @click="$emit('choiceSelected', choice)"
                class="px-2 hover:bg-gray-100 first:rounded-t-2xl first:pt-2 last:rounded-b-2xl last:pb-2">
                {{
                    choice }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

defineEmits<{
    (e: 'choiceSelected', choice: string): void,
}>()

const props = defineProps<{
    choices: string[]
}>()
</script>