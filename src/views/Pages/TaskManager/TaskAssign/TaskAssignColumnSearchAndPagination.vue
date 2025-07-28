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


      <div class="flex justify-between items-center mt-6 flex-wrap gap-4">
        <div></div>
        <div></div>
        <!-- Pagination -->
        <div class="flex justify-center items-center space-x-4" v-if="itemsPerPage !== -1">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="bg-blue-600 text-white p-2 rounded-lg transition-all duration-300"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1, 'hover:bg-blue-500': currentPage !== 1 }">
            ← Prev
          </button>

          <span class="text-sm font-semibold">{{ currentPage }} / {{ totalPages }}</span>

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="bg-blue-600 text-white p-2 rounded-lg transition-all duration-300"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages, 'hover:bg-blue-500': currentPage !== totalPages }">
            Next →
          </button>
        </div>

        <!-- Per Page Controls -->
        <div class="flex items-center space-x-6 mt-4">
          <!-- Per Page Dropdown 1 (Text Input) -->
          <div class="flex items-center space-x-2">
            <label for="perPage-1" class="text-sm font-medium">Per Page:</label>
            <input id="perPage-1" type="number" v-model.number="itemsPerPage" min="1"
              class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="currentPage = 1" placeholder="Enter number">
          </div>

          <!-- Per Page Dropdown 2 (Select Input) -->
          <div class="flex items-center space-x-2">
            <label for="perPage-2" class="text-sm font-medium">Per Page:</label>
            <select id="perPage-2" v-model.number="itemsPerPage"
              class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="currentPage = 1">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
              <option :value="-1">All</option>
            </select>
          </div>
        </div>

      </div>


      <!-- Table -->
      <table :class="tableClass"
        class="w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-y-1">
        <thead :class="headerClass">
          <tr class="text-left text-sm font-semibold uppercase">
            <th class="p-4 text-center w-12"></th>
            <th class="p-4 text-center">
              <input v-model="searchProject" type="text" placeholder="Search by Project Name"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDepartment" type="text" placeholder="Search by Department"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchTitle" type="text" placeholder="Search by Title"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Description"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center"></th>
          </tr>
        </thead>

        <tbody :class="themeClass">
          <template v-for="(task, index) in paginatedTasks" :key="task.task_id">
            <tr :class="getRowClass(index)">
              <td class="p-4 text-center">
                <span @click="toggleDetails(index + (currentPage - 1) * itemsPerPage)"
                  :class="getToggleButtonClass(index)">
                  <span class="absolute text-lg font-semibold">
                    {{ expandedIndex === (index + (currentPage - 1) * itemsPerPage) ? "➕" : "➕" }}
                  </span>
                </span>
              </td>
              <td class="p-4"><span class="text-blue-600">{{ task.project_name }}</span></td>
              <td class="p-4"><span class="text-blue-600">{{ task.department_name }}</span></td>
              <td class="p-4"><span class="text-blue-600">{{ task.task_title }}</span></td>
              <td class="p-4"><span class="text-blue-600">{{ task.task_description }}</span></td>
              <td class="p-4"><img :src="task.file_path" alt="Attachment" class="w-16 h-8 object-cover rounded" /></td>
            </tr>
            <EditPage v-if="expandedIndex === (index + (currentPage - 1) * itemsPerPage)"
              :index="index + (currentPage - 1) * itemsPerPage" :expanded-index="expandedIndex" :task="task"
              :departments="departments" :projects="projects" :theme-class="themeClass" :table-class="tableClass"
              @update-task="handleTaskUpdate" />
          </template>
        </tbody>
      </table>

    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <CreateModal :isOpen="isModalOpen" :themeClass="themeClass" @close="closeAddModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import CreateModal from '@/views/Pages/TaskManager/TaskAssign/CreateModal.vue';
import EditPage from '@/views/Pages/TaskManager/TaskAssign/EditPage.vue';
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

const searchProject = ref("");
const searchDepartment = ref("");
const searchTitle = ref("");
const searchDescription = ref("");

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    return (
      (task.project_name || '').toLowerCase().includes(searchProject.value.toLowerCase()) &&
      (task.department_name || '').toLowerCase().includes(searchDepartment.value.toLowerCase()) &&
      (task.task_title || '').toLowerCase().includes(searchTitle.value.toLowerCase()) &&
      (task.task_description || '').toLowerCase().includes(searchDescription.value.toLowerCase())
    );
  });
});

const paginatedTasks = computed(() => {
  if (itemsPerPage.value === -1) return filteredTasks.value;
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTasks.value.slice(start, end);
});

const totalPages = computed(() => {
  if (itemsPerPage.value === -1) return 1;
  return Math.ceil(filteredTasks.value.length / itemsPerPage.value);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch([searchProject, searchDepartment, searchTitle, searchDescription], () => {
  currentPage.value = 1;
});

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

onMounted(async () => {
  await loadTasks();
  await loadDepartments();
  await loadProjects();
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
</script>
