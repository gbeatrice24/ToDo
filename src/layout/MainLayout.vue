<template>
    <div class="min-h-screen space-y-10">
        <TodoHeader @onAddTask="handleAddTask" />

        <SearchTodo v-if="!isEmpty" @onSearch="handleSearch" />

        <FilterTodos />

        <div class="flex justify-center items-center bg-red-400">
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
import { Task } from "@/types/Task";
import { formatDate } from "@/utils/format-date";
import { ref, computed } from "vue";
import FilterTodos from "@/components/FilterTodos.vue";

const tasks = ref<Task[]>([]);
const querySearch = ref("")

const nextId = computed(() => tasks.value.length)
const isEmpty = computed(() => tasks.value.length == 0)
const filteredTasks = computed(() =>
    tasks.value.filter((task) =>
        task.name.toLowerCase().includes(querySearch.value.toLowerCase()) ||
        task.desc.toLowerCase().includes(querySearch.value.toLowerCase())))

function handleAddTask() {
    tasks.value.map((task) => (task.editing = false));

    const task = {
        id: nextId.value,
        name: "Task",
        desc: "",
        priority: "High",
        done: false,
        date: formatDate(new Date()),
        editing: true,
    };

    tasks.value.unshift(task);
    console.log("new task added:", task);
}

function handleDoneClicked(id: number) {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
        const task = tasks.value[index]

        tasks.value.splice(index, 1, {
            ...task,
            done: !task.done,
        });

        console.log("Task", id, "done modified");
    }
}

function handleEditRequested(id: number) {
    tasks.value.map((task) => {
        task.editing = task.id === id;
    });
}

function handleSaveClicked(payload: {
    id: number;
    newName: string;
    newDesc: string;
    newPriority: string;
}) {
    const { id, newName, newDesc, newPriority } = payload;
    const index = tasks.value.findIndex(task => task.id === id);

    if (index !== -1) {
        const task = tasks.value[index]
        tasks.value.splice(index, 1, {
            ...task,
            name: newName,
            desc: newDesc,
            priority: newPriority,
            editing: false,
        });

        console.log("Task", id, "changed", newName, newDesc, newPriority);
    }
}

function handleDeleteClicked(id: number) {
    const index = tasks.value.findIndex(task => task.id === id);

    if (index !== -1) {
        console.log("Before delete", [...tasks.value]);
        tasks.value.splice(index, 1);
        console.log("After delete", [...tasks.value]);
    }
}

function handlePriorityChoosen(payload: { id: number; priority: string }) {
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

//////// TEST /////////
const task3 = {
    id: nextId.value,
    name: `Task`,
    desc: ``,
    priority: "Low",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task3);

const task2 = {
    id: nextId.value,
    name: `Task`,
    desc: ``,
    priority: "Medium",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task2);

const task1 = {
    id: nextId.value,
    name: `Task`,
    desc: ``,
    priority: "High",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task1);
</script>

<style scoped>
.list-move {
    transition: transform 0.7s ease;
    transition-delay: 300ms;
}
</style>