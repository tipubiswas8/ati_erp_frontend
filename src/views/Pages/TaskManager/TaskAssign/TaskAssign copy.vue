<template>
    <div class="flex-1 w-full pt-16 px-6 pb-10 h-screen overflow-y-auto bg-gray-100">
        <!-- Card Container -->
        <div class="bg-white shadow-xl rounded-2xl p-6 space-y-6">
            <!-- Header & Search -->
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-gray-800">Task List</h2>
                <GlobalSearch v-model="globalSearch" class="w-72" />
            </div>

            <!-- Table -->
            <div class="overflow-x-auto border border-gray-200 rounded-xl">
                <table class="min-w-full text-sm text-left text-gray-700">
                    <!-- Table Head -->
                    <thead class="bg-gray-100 text-gray-800 text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th v-if="tableHeaders.columnNo1.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo1.label }}
                            </th>
                            <th v-if="tableHeaders.columnNo2.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo2.label }}
                            </th>
                            <th v-if="tableHeaders.columnNo3.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo3.label }}
                            </th>
                            <th v-if="tableHeaders.columnNo4.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo4.label }}
                            </th>
                            <th v-if="tableHeaders.columnNo5.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo5.label }}
                            </th>
                            <th v-if="tableHeaders.columnNo6.visibility" class="px-6 py-4 font-bold tracking-wide">
                                {{ tableHeaders.columnNo6.label }}
                            </th>
                        </tr>
                        <!-- Search Row -->
                        <tr class="bg-white">
                            <td v-if="tableHeaders.columnNo1.visibility" class="px-6 py-3 text-center">
                                <input type="text" placeholder="Sl" :disabled="!tableHeaders.columnNo1.searchable"
                                    class="w-14 px-2 py-1 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" />
                            </td>
                            <td v-for="col in [2, 3, 4, 5, 6]" :key="col"
                                v-if="tableHeaders[`columnNo${col}`]?.visibility" class="px-6 py-3">
                                <input type="text" :placeholder="`Search by ${tableHeaders[`columnNo${col}`].label}`"
                                    :disabled="!tableHeaders[`columnNo${col}`].searchable"
                                    class="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" />
                            </td>
                        </tr>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
                        <tr v-for="(task, index) in globalSearchResults" :key="task.task_id"
                            class="odd:bg-white even:bg-gray-50 hover:bg-indigo-100 transition-colors duration-300 ease-in-out cursor-pointer">
                            <td v-if="tableHeaders.columnNo1.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                {{ index + 1 }}
                            </td>
                            <td v-if="tableHeaders.columnNo2.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                {{ task.project_name }}
                            </td>
                            <td v-if="tableHeaders.columnNo3.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                {{ task.department_name }}
                            </td>
                            <td v-if="tableHeaders.columnNo4.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                {{ task.task_title }}
                            </td>
                            <td v-if="tableHeaders.columnNo5.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                {{ task.task_description }}
                            </td>
                            <td v-if="tableHeaders.columnNo6.visibility"
                                class="px-6 py-4 text-gray-700 border border-gray-300/20">
                                <div v-if="task.file_path">
                                    <img :src="task.file_path" alt="Attachment"
                                        class="w-20 h-12 object-cover rounded border border-gray-300 shadow-sm" />
                                </div>
                                <span v-else class="px-6 py-4 text-gray-700">No attachment</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import GlobalSearch from '@/features/dataTools/GlobalSearch.vue';
import { globals } from '@/config/globals';
import { useToast } from 'vue-toastification';

const toast = useToast();
const tasks = ref([]);
const departments = ref([]);
const projects = ref([]);
const globalSearch = ref("");

const globalSearchResults = computed(() => {
    if (!globalSearch.value) return tasks.value;
    const term = globalSearch.value.toLowerCase();
    return tasks.value.filter(task =>
        Object.values(task).some(value =>
            String(value).toLowerCase().includes(term)
        )
    );
});

const tableHeaders = ref({
    columnNo1: { id: 1, key: 'task_id', label: 'Sl', visibility: true, searchable: false },
    columnNo2: { id: 2, key: 'project_name', label: 'Project Name', visibility: true, searchable: true },
    columnNo3: { id: 3, key: 'department_name', label: 'Department Name', visibility: true, searchable: true },
    columnNo4: { id: 4, key: 'task_title', label: 'Task Title', visibility: true, searchable: true },
    columnNo5: { id: 5, key: 'task_description', label: 'Task Description', visibility: true, searchable: true },
    columnNo6: { id: 6, key: 'attachment', label: 'Attachment', visibility: true, searchable: false },
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
</script>

<style scoped>
/* Optional additional styling */
</style>
