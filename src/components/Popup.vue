<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div
            class="font-semibold border p-4 rounded-xl shadow-lg bg-white space-y-4 text-center z-50 w-10/12 md:max-w-sm">
            <h3>{{ message }}</h3>
            <div class="flex justify-center space-x-4">
                <button class="bg-red-500 text-white px-4 py-2 rounded-xl" @click="$emit('onConfirm')">
                    Yes
                </button>
                <button class="bg-gray-300 text-black px-4 py-2 rounded-xl" @click="$emit('onCancel')">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();

defineEmits<{
    (e: "onConfirm"): void;
    (e: "onCancel"): void;
}>();
</script>
