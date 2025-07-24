<template>
    <div class="flex justify-center items-center">
        <div class="flex flex-col space-y-4 md:flex-row font-semibold md:w-lg justify-between">
            <div class="space-x-3">
                <button class="bg-emerald-400 text-xs text-white pl-3 pr-3 h-8 rounded-md">Title</button>
                <button class="bg-black text-xs text-white pl-3 pr-3 h-8 rounded-md">Description</button>
                <button class="bg-white text-xs text-black border pl-3 pr-3 h-8 rounded-md">Priority</button>
                <button class="bg-white text-xs text-black border pl-3 pr-3 h-8 rounded-md">Date</button>
            </div>

            <div class="space-x-2">
                <button class="bg-emerald-400 text-xs text-white w-8 h-8 rounded-md"><font-awesome-icon
                        :icon="['fas', 'arrow-up']" /></button>
                <button class="bg-black text-xs text-white w-8 h-8 rounded-md"><font-awesome-icon
                        :icon="['fas', 'arrow-down']" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

// Add all needed icons
library.add(faArrowUp, faArrowDown)


</script>