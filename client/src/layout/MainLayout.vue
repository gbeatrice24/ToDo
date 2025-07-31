<template>
    <div class="min-h-screen space-y-5">
        <TodoHeader @onAddTask="handleAddTask" />
        <router-view />

        <div v-if="!isEmpty">
            <SearchTodo @onSearch="handleSearch" />
            <FilterTodos class="pt-5 " @onSort="handleSort" @onOrder="handleOrder" />
        </div>

        <div class="flex justify-center  items-center ">
            <img v-if="isEmpty" class="" src="../assets/NoTodos.svg" alt="NoTodos" />
            <TransitionGroup tag="div" class="flex flex-col gap-8" name="list">
                <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task"
                    :class="task.done === true ? 'order-last' : 'order-first'" @onComplete="handleDoneClicked"
                    @onEdit="handleEditRequested" @onSave="handleSaveClicked" @onDelete="handleDeleteClicked"
                    @onPriorityModified="handlePriorityChoosen" />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchTodo from "@/components/SearchTodo.vue";
import TodoHeader from "./TodoHeader.vue";
import TaskCard from "@/components/TaskCard.vue";
import { Task } from "@/types/task";
import { SortingOptionLabel } from "@/types/sorting-option"

import { ref, computed, onMounted } from "vue";
import FilterTodos from "@/components/FilterTodos.vue";

const tasks = ref<Task[]>([]);
const querySearch = ref("")
const localSortingOption = ref<SortingOptionLabel>("Title");

const localIsAscending = ref(true)

const isEmpty = computed(() => tasks.value.length == 0)


const filteredTasks = computed(() => {
    const result = tasks.value.filter((task) => {
        if (!task || typeof task.name !== "string" || typeof task.desc !== "string") {
            console.warn("Invalid task:", task);
            return false;
        }

        return (
            task.name.toLowerCase().includes(querySearch.value.toLowerCase()) ||
            task.desc.toLowerCase().includes(querySearch.value.toLowerCase())
        );
    })


    sortArray(result);

    const editing = result.filter(task => task.editing);
    const others = result.filter(task => !task.editing);

    console.log(filteredTasks)

    return [...editing, ...others];
})

onMounted(async () => {
    try {
        const response = await fetch("http://localhost:8080/api/todos");
        const data = await response.json();
        tasks.value = data.map((task: Task) => ({
            ...task,
            date: new Date(task.date) // convert it, because server sends it as a string
        }));
        console.log("loaded todos:", tasks.value);
    } catch (error) {
        console.error("Error loading todos:", error);
    }
});

function sortArray(array: Task[]) {
    switch (localSortingOption.value) {
        case "Title":
            array.sort((task1, task2) => task1.name.localeCompare(task2.name))
            break;
        case "Description":
            array.sort((task1, task2) => task1.desc.localeCompare(task2.desc))
            break;
        case "Priority":
            array.sort((task1, task2) => {
                const priorityA = task1.priority
                const priorityB = task2.priority

                if (priorityA === "High" && priorityB !== "High") {
                    return 1
                }
                if (priorityA === "Medium" && priorityB === "Low") {
                    return 1
                }
                if (priorityA === priorityB) {
                    return 0
                }

                return -1
            })
            break;
        case "Date":
            array.sort((task1, task2) => task1.date.getTime() - task2.date.getTime())
            break;
    }

    if (!localIsAscending.value) {
        array.reverse()
    }
}

function handleAddTask() {
    tasks.value.map((task) => (task.editing = false));

    const task = {
        id: "",
        name: "",
        desc: "",
        priority: "Priority",
        done: false,
        date: new Date(),
        editing: true,
    };


    tasks.value.unshift(task);
    console.log("new task added:", task);
}

async function handleDoneClicked(id: string) {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
        const task = tasks.value[index]
        const currentDoneState = task.done

        try {
            const response = await fetch("http://localhost:8080/api/todos/updateDone", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: task.id,
                    doneState: !currentDoneState
                }),
            });

            const updatedTask = await response.json();

            tasks.value.splice(index, 1, {
                ...updatedTask,
                done: !currentDoneState
            });

            console.log("Task", id, "done modified");
        } catch (err) {
            console.error("error:", err);
        }
    }
}

function handleEditRequested(id: string) {
    tasks.value.map((task) => {
        task.editing = task.id === id;
    });
}

async function handleSaveClicked(payload: {
    id: string;
    newName: string;
    newDesc: string;
    newPriority: string;
}) {
    const { id, newName, newDesc, newPriority } = payload;
    const index = tasks.value.findIndex(task => task.id === id);
    const isNewTask = id === "";

    if (!isNewTask) {
        const task = tasks.value[index]

        const response = await fetch("http://localhost:8080/api/todos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: task.id,
                name: newName,
                desc: newDesc,
                priority: newPriority,
            }),
        });

        const updatedTask = await response.json();

        tasks.value.splice(index, 1, {
            ...updatedTask,
            date: new Date(updatedTask.date),
            editing: false,
        });

        console.log("Task", id, "changed", newName, newDesc, newPriority);
    }
    else {
        const response = await fetch("http://localhost:8080/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                desc: newDesc,
                priority: newPriority,
                date: new Date().toISOString(),
                userId: "688a0de176a2656ea3527afb", // here will come the user id, for now i hardcode the test users
            }),
        });

        const savedTask = await response.json();
        console.log("new task saved")

        tasks.value.splice(index, 1, {
            ...savedTask,
            editing: false,
        });
    }

    console.log(id)
}

function handleDeleteClicked(id: string) {
    const index = tasks.value.findIndex(task => task.id === id);

    if (index !== -1) {
        console.log("Before delete", [...tasks.value]);
        tasks.value.splice(index, 1);
        console.log("After delete", [...tasks.value]);
    }
}

function handlePriorityChoosen(payload: { id: string; priority: string }) {
    const { id, priority } = payload;
    const index = tasks.value.findIndex(task => task.id === id);

    if (index !== -1) {
        const task = tasks.value[index]
        tasks.value.splice(index, 1, { ...task, priority: priority });
        console.log("Task", id, "priority changed", priority);
    }
}

function handleSearch(search: string) {
    querySearch.value = search
}

function handleSort(sortingOption: SortingOptionLabel) {
    localSortingOption.value = sortingOption;
}

function handleOrder(isAscending: boolean) {
    localIsAscending.value = isAscending
}

</script>

<style scoped>
.list-move {
    transition: transform 0.7s ease;
    transition-delay: 300ms;
}
</style>