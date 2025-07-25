<template>
    <div class="min-h-screen space-y-5">
        <TodoHeader @onAddTask="handleAddTask" />

        <SearchTodo v-if="!isEmpty" @onSearch="handleSearch" />

        <FilterTodos @onSort="handleSort" @onOrder="handleOrder" />

        <div class="flex justify-center items-center ">
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
import { ref, computed } from "vue";
import FilterTodos from "@/components/FilterTodos.vue";

const tasks = ref<Task[]>([]);
const querySearch = ref("")
const sortBy = ref("Title")
const ascending = ref(true)

const nextId = computed(() => tasks.value.length)
const isEmpty = computed(() => tasks.value.length == 0)


const filteredTasks = computed(() => {
    let result = tasks.value.filter((task) =>
        task.name.toLowerCase().includes(querySearch.value.toLowerCase()) ||
        task.desc.toLowerCase().includes(querySearch.value.toLowerCase()))

    sortArray(result);

    const editing = result.filter(task => task.editing);
    const others = result.filter(task => !task.editing);

    return [...editing, ...others];
})

function sortArray(array: Task[]) {
    switch (sortBy.value) {
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



    if (!ascending.value) {
        array.reverse()
    }


}

function handleAddTask() {
    tasks.value.map((task) => (task.editing = false));

    const task = {
        id: nextId.value,
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

function handleSort(by: string) {
    sortBy.value = by
}

function handleOrder(order: boolean) {
    ascending.value = order
}

//////// TEST /////////
const task3 = {
    id: nextId.value,
    name: `a This is the first title`,
    desc: `b This is the second description, lastest date`,
    priority: "Low",
    done: false,
    date: new Date("2023-01-01"),
    editing: false,
};
tasks.value.unshift(task3);

const task2 = {
    id: nextId.value,
    name: `c This is the third title`,
    desc: `a This is the first description second date`,
    priority: "Medium",
    done: false,
    date: new Date("2024-01-01"),
    editing: false,
};
tasks.value.unshift(task2);

const task1 = {
    id: nextId.value,
    name: `b This is the second title`,
    desc: `c This is the last description, the newest date`,
    priority: "High",
    done: false,
    date: new Date("2025-01-01"),
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