<template>
    <div :class="themeBlock" class="flex-1 w-full pt-14 shadow-lg p-4 space-y-8 relative h-[100vh]">
        <!-- Table Header Section -->
        <div :class="themeClass" class="overflow-hidden rounded-lg shadow-xl p-6">
            <!-- Add New Member Button -->
            <button @click="openAddModal"
                class="absolute top-4 right-4 bg-blue-600 text-white py-0.5 px-1.5 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                aria-label="Add New Member">
                <span class="text-xl text-white">&nbsp; ✚ &nbsp;</span>
            </button>

            <div style="display: none;">
                <TableTools :originalData="tasks" :filteredData="filteredTasks" :reportTitle="fileInfo"
                    :tableHeaders="tableHeaders" />
            </div>

            <Pagination :originalData="tasks" :filteredData="filteredTasks" :totalItems="filteredTasks.length"
                v-model:currentPage="currentPage" v-model:itemsPerPage="itemsPerPage"
                @update:currentPage="val => currentPage = val" @update:itemsPerPage="val => itemsPerPage = val" />

            <!-- Global Search -->
            <div class="mt-4 flex justify-end">
                <input v-model="globalSearch" type="text" placeholder="Global Search"
                    class="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </div>

            <!-- Table -->
            <table :class="tableClass"
                class="w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-y-1">
                <thead :class="headerClass">
                    <tr class="text-left text-sm font-semibold uppercase">
                        <th v-if="tableHeaders.columnNo1.visibility" class="p-4 text-center w-12"></th>
                        <th v-if="tableHeaders.columnNo1.visibility" class="p-4 text-center">
                            <div class="flex items-center justify-center">
                                <input type="text" placeholder="Sl" :disabled="!tableHeaders.columnNo1.searchable"
                                    class="p-3 rounded-lg bg-gray-210 border-gray-300 w-12 focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                                <button @click="sortBy('task_id')" class="ml-2 focus:outline-none">
                                    <span v-if="sortColumn === 'task_id'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                    <span v-else>↕</span>
                                </button>
                            </div>
                        </th>
                        <th v-if="tableHeaders.columnNo2.visibility" class="p-4 text-center">
                            <div class="flex items-center">
                                <input v-model="searchProject" type="text"
                                    :placeholder="`Search by ${tableHeaders.columnNo2.label}`"
                                    class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                                <button @click="sortBy('project_name')" class="ml-2 focus:outline-none">
                                    <span v-if="sortColumn === 'project_name'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                    <span v-else>↕</span>
                                </button>
                            </div>
                        </th>
                        <th v-if="tableHeaders.columnNo3.visibility" class="p-4 text-center">
                            <div class="flex items-center">
                                <input v-model="searchDepartment" type="text"
                                    :placeholder="`Search by ${tableHeaders.columnNo3.label}`"
                                    class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                                <button @click="sortBy('department_name')" class="ml-2 focus:outline-none">
                                    <span v-if="sortColumn === 'department_name'">
                                        <i :class="sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                                    </span>
                                    <span v-else>
                                        <i class="fas fa-sort"></i>
                                    </span>
                                </button>
                            </div>
                        </th>
                        <th v-if="tableHeaders.columnNo4.visibility" class="p-4 text-center">
                            <div class="flex items-center">
                                <input v-model="searchTitle" type="text"
                                    :placeholder="`Search by ${tableHeaders.columnNo4.label}`"
                                    class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                                <button @click="sortBy('task_title')" class="ml-2 focus:outline-none">
                                    <span v-if="sortColumn === 'task_title'">
                                        {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                                    </span>
                                    <span v-else>↕</span>
                                </button>
                            </div>
                        </th>
                        <th v-if="tableHeaders.columnNo5.visibility" class="p-4 text-center">
                            <div class="flex items-center">
                                <input v-model="searchDescription" type="text"
                                    :placeholder="`Search by ${tableHeaders.columnNo5.label}`"
                                    class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                                <button @click="sortBy('task_description')" class="ml-2 focus:outline-none">
                                    <span v-if="sortColumn === 'task_description'">
                                        {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                                    </span>
                                    <span v-else>↕</span>
                                </button>
                            </div>
                        </th>
                        <th v-if="tableHeaders.columnNo6.visibility" class="p-4 text-center">
                            <div class="flex items-center">
                                <input type="text" placeholder="Attachment"
                                    :disabled="!tableHeaders.columnNo6.searchable"
                                    class="p-3 rounded-lg bg-gray-210 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody :class="themeClass">
                    <template v-for="(task, index) in sortedAndPaginatedTasks" :key="task.task_id">
                        <tr :class="getRowClass(index)">
                            <td v-if="tableHeaders.columnNo1.visibility" class="p-4 text-center">
                                <span @click="toggleDetails(index + (currentPage - 1) * itemsPerPage)"
                                    :class="getToggleButtonClass(index)">
                                    <span class="absolute text-lg font-semibold">
                                        {{ expandedIndex === (index + (currentPage - 1) * itemsPerPage) ? "➖" : "➕"
                                        }}
                                    </span>
                                </span>
                            </td>
                            <td v-if="tableHeaders.columnNo1.visibility" class="p-4"><span class="text-blue-600">{{
                                task.task_id
                                    }}</span></td>
                            <td v-if="tableHeaders.columnNo2.visibility" class="p-4"><span class="text-blue-600">{{
                                task.project_name
                                    }}</span></td>
                            <td v-if="tableHeaders.columnNo3.visibility" class="p-4"><span class="text-blue-600">{{
                                task.department_name
                                    }}</span></td>
                            <td v-if="tableHeaders.columnNo4.visibility" class="p-4"><span class="text-blue-600">{{
                                task.task_title }}</span>
                            </td>
                            <td v-if="tableHeaders.columnNo5.visibility" class="p-4"><span class="text-blue-600">{{
                                task.task_description }}</span></td>
                            <td v-if="tableHeaders.columnNo6.visibility" class="p-4">
                                <img v-if="task.file_path" :src="task.file_path" alt="Attachment"
                                    class="w-16 h-8 object-cover rounded" />
                                <span v-else class="text-gray-400">No attachment</span>
                            </td>
                        </tr>
                        <EditPage v-if="expandedIndex === (index + (currentPage - 1) * itemsPerPage)"
                            :index="index + (currentPage - 1) * itemsPerPage" :expanded-index="expandedIndex"
                            :task="task" :departments="departments" :projects="projects" :theme-class="themeClass"
                            :table-class="tableClass" @update-task="handleTaskUpdate" />
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-8 rounded-lg shadow-lg w-96">
                <CreateModal :isOpen="isModalOpen" :themeClass="themeClass" @close="closeAddModal"
                    @task-created="handleTaskCreated" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import CreateModal from '@/views/Pages/TaskManager/TaskAssign/CreateModal.vue';
import EditPage from '@/views/Pages/TaskManager/TaskAssign/EditPage.vue';
import TableTools from '@/features/dataTools/TableTools.vue';
import Pagination from '@/features/dataTools/Pagination.vue';
import { globals } from '@/config/globals';
import { useToast } from "vue-toastification";

const store = useStore();
const toast = useToast();

const tasks = ref([]);
const departments = ref([]);
const projects = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const expandedIndex = ref(null);
const isModalOpen = ref(false);

// Sorting state
const sortColumn = ref(null);
const sortDirection = ref('asc'); // 'asc' or 'desc'

const globalSearch = ref("");
const searchProject = ref("");
const searchDepartment = ref("");
const searchTitle = ref("");
const searchDescription = ref("");

const fileInfo = {
    title: 'Attendance Report',
    fileName: 'attendance_report'
};

const tableHeaders = ref({
    columnNo1: { id: 1, key: 'task_id', label: 'Sl', visibility: true, searchable: false },
    columnNo2: { id: 2, key: 'project_name', label: 'Project Name', visibility: true, searchable: true },
    columnNo3: { id: 3, key: 'department_name', label: 'Department Name', visibility: true, searchable: true },
    columnNo4: { id: 4, key: 'task_title', label: 'Task Title', visibility: true, searchable: true },
    columnNo5: { id: 5, key: 'task_description', label: 'Task Description', visibility: true, searchable: true },
    columnNo6: { id: 6, key: 'attachment', label: 'Attachment', visibility: true, searchable: false },
});


const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
        const matchesFields =
            (task.project_name || '').toLowerCase().includes(searchProject.value.toLowerCase()) &&
            (task.department_name || '').toLowerCase().includes(searchDepartment.value.toLowerCase()) &&
            (task.task_title || '').toLowerCase().includes(searchTitle.value.toLowerCase()) &&
            (task.task_description || '').toLowerCase().includes(searchDescription.value.toLowerCase());

        const global = globalSearch.value.toLowerCase();
        const matchesGlobal =
            !global || Object.values(task).some(value =>
                String(value).toLowerCase().includes(global)
            );

        return matchesFields && matchesGlobal;
    });
});

function sortBy(column) {
    if (sortColumn.value === column) {
        // Toggle direction if same column is clicked
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        // New column, default to ascending
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }
    currentPage.value = 1; // Reset to first page when sorting
}


// Sort the filtered tasks
const sortedTasks = computed(() => {
    if (!sortColumn.value) return filteredTasks.value;

    return [...filteredTasks.value].sort((a, b) => {
        let valueA = a[sortColumn.value];
        let valueB = b[sortColumn.value];

        // Handle null/undefined values
        if (valueA == null) valueA = '';
        if (valueB == null) valueB = '';

        // Special handling for numeric columns (task_id)
        if (sortColumn.value === 'task_id') {
            valueA = Number(valueA);
            valueB = Number(valueB);
            return sortDirection.value === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // Default string comparison for other columns
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();

        if (valueA < valueB) return sortDirection.value === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const sortedAndPaginatedTasks = computed(() => {
    if (itemsPerPage.value === -1) return sortedTasks.value;
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedTasks.value.slice(start, end);
});


// Watch for changes that should reset to page 1
watch([searchProject, searchDepartment, searchTitle, searchDescription, globalSearch, itemsPerPage], () => {
    currentPage.value = 1;
});


onMounted(async () => {
    await Promise.all([
        loadTasks(),
        loadDepartments(),
        loadProjects()
    ]);
});

async function loadTasks() {
    try {
        const response = await globals.axios.get(globals.apiEndpoints.task);
        tasks.value = response.data.data;
    } catch (error) {
        console.error(error);
        toast.error("Failed to load tasks.");
    }
}

async function loadDepartments() {
    try {
        const response = await globals.axios.get(`${globals.apiEndpoints.basePath}/hr/departments`);
        departments.value = response.data.data;
    } catch (error) {
        toast.error("Failed to load departments.");
    }
}

async function loadProjects() {
    try {
        const response = await globals.axios.get(`${globals.apiEndpoints.basePath}/project-management/projects`);
        projects.value = response.data.data;
    } catch (error) {
        toast.error("Failed to load projects.");
    }
}


function openAddModal() {
    isModalOpen.value = true;
}

function closeAddModal() {
    isModalOpen.value = false;
}

function toggleDetails(index) {
    expandedIndex.value = expandedIndex.value === index ? null : index;
}

function handleTaskUpdate({ index, data }) {
    tasks.value[index] = {
        ...tasks.value[index],
        ...data,
        task_title: data.title,
        task_description: data.description,
        project_id: data.project_id,
        department_id: data.department_id,
    };
    toast.success("Task updated successfully!");
}

function handleTaskCreated(newTask) {
    tasks.value.unshift(newTask);
    toast.success("Task created successfully!");
    closeAddModal();
}

const getRowClass = (index) => {
    return themeClass.value.includes("dark")
        ? "border-b border-gray-200 hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
        : "border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-md";
};

const getToggleButtonClass = (index) => {
    return {
        "cursor-pointer inline-flex items-center justify-center transition-all duration-300 ease-in-out": true,
        "scale-110 rotate-45 ring-offset-2": expandedIndex.value === index,
    };
};

const themeBlock = computed(() => store.state.theme === "dark"
    ? "bg-gray-600 text-white custom-scrollbar"
    : "bg-gray-300 text-gray-800 custom-scrollbar");

const headerClass = computed(() => store.state.theme === "dark"
    ? "bg-gray-400 text-white custom-scrollbar"
    : "bg-gray-400 text-gray-800 custom-scrollbar");

const tableClass = computed(() => store.state.theme === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-200 text-gray-800 custom-scrollbar");

const themeClass = computed(() => store.state.theme === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-50 text-gray-800 custom-scrollbar");
</script>
