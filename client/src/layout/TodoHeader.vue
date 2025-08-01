<template>
    <div class="flex justify-center items-center pt-5">
        <div class="w-xs md:w-lg border-b-2 border-gray-200 pb-5">
            <div v-if="user" class="flex flex-row justify-between w-full">
                <p>
                    Welcome,
                    <br>
                    {{ user }}
                </p>
                <button class="font-semibold bg-gray-200 rounded-xl text-xs p-2 w-20 h-10">
                    Log out
                </button>
            </div>
            <div v-else class="flex flex-row justify-between w-full">
                <p>
                    Welcome,
                    <br>
                    You're not logged in
                </p>
                <button class="font-semibold bg-gray-200 rounded-xl text-xs p-2 w-20 h-10" @click="handleLogin">
                    Log in
                </button>
            </div>
        </div>
    </div>

    <div class="flex justify-center items-center pt-10 max-w-screen">
        <div class="flex items-center w-xs md:w-lg justify-between">
            <h1 class="font-semibold text-black text-3xl md:text-6xl">To do list</h1>
            <button
                class="flex items-center justify-center bg-emerald-400 text-white rounded-full w-10 h-10 md:w-12 md:h-12"
                @click="$emit('onAddTask')">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router'

const user = ref("")
const router = useRouter()

defineEmits(['onAddTask'])

function handleLogin() {
    console.log("login pressed")
    router.push('/login')
}

</script>
