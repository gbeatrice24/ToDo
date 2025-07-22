<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="border p-4 rounded-xl shadow-lg bg-white space-y-4 text-center z-50 w-10/12">
            <h3 class="font-semibold">{{ props.message }}</h3>
            <div class="flex justify-center space-x-4">
                <button @click="$emit('confirmAction', true)"
                    class="font-semibold bg-red-500 text-white px-4 py-2 rounded-xl">Yes</button>
                <button @click="$emit('confirmAction', false)"
                    class="font-semibold bg-gray-300 text-black px-4 py-2 rounded-xl">Cancel</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

defineEmits<{
    (e: 'confirmAction', confirmed: boolean): void,
}>()

const props = defineProps<{ message: string }>()

</script>