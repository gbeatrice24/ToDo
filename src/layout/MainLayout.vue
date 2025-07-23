<template>
    <div class="min-h-screen space-y-15">
        <TodoHeader @add-task="handleAddTask" />

        <div class="flex justify-center items-center">
            <img v-if="isEmpty" class="max-w-xs mx-auto" src="../assets/NoTodos.png" alt="NoTodos" />
            <TransitionGroup tag="div" class="flex flex-col gap-8" name="list">
                <TaskCard v-for="task in tasks" :key="task.id" :task="task"
                    :class="task.done === true ? 'order-last' : 'order-first'" @onComplete="handleDoneClicked"
                    @onEdit="handleEditRequested" @onSave="handleSaveClicked" @onDelete="handleDeleteClicked"
                    @onPriorityModified="handlePriorityChoosen" />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import TodoHeader from "./TodoHeader.vue";
import TaskCard from "@/components/TaskCard.vue";
import { Task } from "@/types/Task";
import { formatDate } from "@/utils/format-date";
import { ref, computed } from "vue";

const tasks = ref<Task[]>([]);
let nextId = 0;

const isEmpty = computed(() => tasks.value.length == 0);

function handleAddTask() {
    tasks.value.map((task) => (task.editing = false));

    const task = {
        id: ++nextId,
        name: `Task`,
        desc: ``,
        priority: "High",
        done: false,
        date: formatDate(new Date()),
        editing: true,
    };

    tasks.value.unshift(task);
    console.log("new task added:", task);
}

function handleDoneClicked(id: number) {
    const task = tasks.value.find((task) => task.id === id);
    const realId = tasks.value.length - id;
    if (task) {
        tasks.value.splice(realId, 1, {
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
    const task = tasks.value.find((task) => task.id === id);
    const realId = tasks.value.length - id;

    if (task) {
        tasks.value.splice(realId, 1, {
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
    const task = tasks.value.find((task) => task.id === id);
    const realId = tasks.value.length - id;

    console.log("before delete", [...tasks.value]);

    if (task) {
        tasks.value.splice(realId, 1);
    }

    tasks.value.forEach((task) => (task.id > id ? task.id-- : ""));
    nextId--;

    console.log("after delete", tasks.value);
}

function handlePriorityChoosen(payload: { id: number; priority: string }) {
    const { id, priority } = payload;
    const task = tasks.value.find((task) => task.id === id);
    const realId = tasks.value.length - id;

    if (task) {
        tasks.value.splice(realId, 1, { ...task, priority: priority });
        console.log("Task", id, "priority changed", priority);
    }
}

//////// TEST /////////
const task3 = {
    id: ++nextId,
    name: `Task`,
    desc: ``,
    priority: "Low",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task3);

const task2 = {
    id: ++nextId,
    name: `Task`,
    desc: ``,
    priority: "Medium",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task2);

const task1 = {
    id: ++nextId,
    name: `Task`,
    desc: ``,
    priority: "High",
    done: false,
    date: formatDate(new Date()),
    editing: false,
};
tasks.value.unshift(task1);
</script>

<style>
.list-move {
    transition: transform 0.5s ease;
    transition-delay: 250ms;
}
</style>
