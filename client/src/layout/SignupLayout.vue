<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <div class="p-4 w-xs h-80 md:w-auto md:relative bg-white">
            <h1 class="font-semibold text-black text-2xl md:text-5xl pl-5">Sign up</h1>

            <form @submit="handleSignup" class="flex flex-col items-center space-y-10 w-90 pt-7">
                <div class="flex flex-col w-80 items-center space-y-5">
                    <input v-model="name" placeholder="Name" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <input v-model="email" type="email" placeholder="Email" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <input v-model="password" type="password" placeholder="Password" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <button class="text-xs font-semibold" @click="handleLogin">Already have an account? Log in
                        here.</button>
                </div>
                <button class="bg-emerald-400 text-white rounded-lg w-15 md:rounded-xl md:p-3 md:w-20">
                    Sign up
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const name = ref("")

const router = useRouter()

function handleLogin() {
    router.push('/login')
}

function handleSignup() {
    console.log("user signup infos:", name.value, email.value, password.value)
    router.push('/login')
}
</script>