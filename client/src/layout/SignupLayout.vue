<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <div class="p-4 w-xs h-80 md:w-auto md:relative bg-white">
            <h1 class="font-semibold text-black text-2xl md:text-5xl pl-5">Sign up</h1>

            <form @submit.prevent="handleSignup" class="flex flex-col items-center space-y-10 w-90 pt-7">
                <div class="flex flex-col w-80 items-center space-y-5">
                    <input v-model="name" placeholder="Name" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <input v-model="email" type="email" placeholder="Email" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <input v-model="password" type="password" placeholder="Password" required
                        class="outline-0 w-full border-b-2 border-gray-300 "></input>
                    <p class="text-xs font-semibold" @click="handleLogin">Already have an account? Log in
                        here.</p>
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

async function handleSignup() {
    try {
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
        });



        console.log("signup successful");
        router.push('/login')
    } catch (err) {
        console.error(err);
    }
}
</script>