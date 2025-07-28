<template>
  <div
    :class="themeBlock"
    class="flex-1 w-full pt-14 shadow-lg p-4 space-y-8 relative h-[100vh]"
  >
    <!-- Table Header Section -->
    <div :class="themeClass" class="overflow-hidden rounded-lg shadow-xl p-6">
      <RouterLink
        to="/task-manager"
        class="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-200 transition-colors duration-150 absolute left-4 top-3"
      >
        ← {{ $t("Back") }}
      </RouterLink>
      <!-- Add New Member Button -->
      <button
        @click="openAddModal"
        class="absolute top-3 right-4 bg-blue-600 text-white px-2 py-2 mb-4 text-sm font-medium rounded hover:scale-105 transition-all duration-300 ease-in-out"
        aria-label="Add New Member"
      >
        <span>&nbsp;&nbsp; Add✚ &nbsp;&nbsp;</span>
      </button>

      <div style="display: none">
        <TableTools
          :originalData="tasks"
          :filteredData="filteredTasks"
          :reportTitle="fileInfo"
          :tableHeaders="tableHeaders"
        />
      </div>

      <Pagination
        :originalData="tasks"
        :filteredData="filteredTasks"
        :totalItems="filteredTasks.length"
        v-model:currentPage="currentPage"
        v-model:itemsPerPage="itemsPerPage"
        @update:currentPage="(val) => (currentPage = val)"
        @update:itemsPerPage="(val) => (itemsPerPage = val)"
      />

      <!-- Global Search -->
      <div class="mt-4 flex justify-end">
        <input
          v-model="globalSearch"
          type="text"
          placeholder="Global Search"
          class="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      <!-- Table -->

    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <CreateModal
          :isOpen="isModalOpen"
          :themeClass="themeClass"
          @close="closeAddModal"
          @task-created="handleTaskCreated"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import CreateModal from "@/views/Pages/TaskManager/TaskAssign/CreateModal.vue";
import EditPage from "@/views/Pages/TaskManager/TaskAssign/EditPage.vue";
import TableTools from "@/features/dataTools/TableTools.vue";
import Pagination from "@/features/dataTools/Pagination.vue";
import { globals } from "@/config/globals";
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
const sortDirection = ref("asc"); // 'asc' or 'desc'

const globalSearch = ref("");
const searchProject = ref("");
const searchDepartment = ref("");
const searchTitle = ref("");
const searchDescription = ref("");

const fileInfo = {
  title: "Attendance Report",
  fileName: "attendance_report",
};

const tableHeaders = ref();

const filteredTasks = computed(() => {
  return tasks.value.filter((task) => {
    const matchesFields =
      (task.project_name || "")
        .toLowerCase()
        .includes(searchProject.value.toLowerCase()) &&
      (task.department_name || "")
        .toLowerCase()
        .includes(searchDepartment.value.toLowerCase()) &&
      (task.task_title || "")
        .toLowerCase()
        .includes(searchTitle.value.toLowerCase()) &&
      (task.task_description || "")
        .toLowerCase()
        .includes(searchDescription.value.toLowerCase());

    const global = globalSearch.value.toLowerCase();
    const matchesGlobal =
      !global ||
      Object.values(task).some((value) =>
        String(value).toLowerCase().includes(global)
      );

    return matchesFields && matchesGlobal;
  });
});

function sortBy(column) {
  if (sortColumn.value === column) {
    // Toggle direction if same column is clicked
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    // New column, default to ascending
    sortColumn.value = column;
    sortDirection.value = "asc";
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
    if (valueA == null) valueA = "";
    if (valueB == null) valueB = "";

    // Special handling for numeric columns (task_id)
    if (sortColumn.value === "task_id") {
      valueA = Number(valueA);
      valueB = Number(valueB);
      return sortDirection.value === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Default string comparison for other columns
    valueA = String(valueA).toLowerCase();
    valueB = String(valueB).toLowerCase();

    if (valueA < valueB) return sortDirection.value === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection.value === "asc" ? 1 : -1;
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
watch(
  [
    searchProject,
    searchDepartment,
    searchTitle,
    searchDescription,
    globalSearch,
    itemsPerPage,
  ],
  () => {
    currentPage.value = 1;
  }
);

onMounted(async () => {
  await Promise.all([loadTasks(), loadDepartments(), loadProjects()]);
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
    const response = await globals.axios.get(
      `${globals.apiEndpoints.basePath}/hr/departments`
    );
    departments.value = response.data.data;
  } catch (error) {
    toast.error("Failed to load departments.");
  }
}

async function loadProjects() {
  try {
    const response = await globals.axios.get(
      `${globals.apiEndpoints.basePath}/project-management/projects`
    );
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
    "cursor-pointer inline-flex items-center justify-center transition-all duration-300 ease-in-out":
      true,
    "scale-110 rotate-45 ring-offset-2": expandedIndex.value === index,
  };
};

const themeBlock = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-600 text-white custom-scrollbar"
    : "bg-gray-300 text-gray-800 custom-scrollbar"
);

const headerClass = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-400 text-white custom-scrollbar"
    : "bg-gray-400 text-gray-800 custom-scrollbar"
);

const tableClass = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-200 text-gray-800 custom-scrollbar"
);

const themeClass = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-50 text-gray-800 custom-scrollbar"
);
</script>
