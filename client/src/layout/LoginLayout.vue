<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <div class="p-4 w-xs h-80 md:w-auto md:relative bg-white">
            <h1 class="font-semibold text-black text-2xl md:text-5xl pl-5">Log in</h1>

            <form @submit.prevent="handleLogin" class="flex flex-col items-center space-y-10 w-90 pt-7">
                <div class="flex flex-col w-80 items-center space-y-5">
                    <BaseInput v-model="email" type="email" placeholder="Email" required />
                    <BaseInput v-model="password" type="password" placeholder="Password" required />
                    <button class="text-xs font-semibold" @click="handleSignup">No account? Sign up here.</button>
                </div>

                <button class="bg-emerald-400 text-white rounded-lg w-15 md:rounded-xl md:p-3 md:w-20">
                    Log in
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import BaseInput from "@/components/BaseInput.vue"

const email = ref("")
const password = ref("")
const router = useRouter()

async function handleLogin() {
    console.log("user login infos:", email.value, password.value)

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.value, password: password.value })
        });

        const result = await response.json();

        console.log("login successful:", result);
        router.push('/')
    } catch (err) {
        console.error(err);
    }
}

function handleSignup() {
    router.push('/signup')
}
</script>