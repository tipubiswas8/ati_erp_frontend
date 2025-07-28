<template>
  <div :class="themeBlock" class="flex-1 w-full pt-14 shadow-lg p-4 space-y-8 relative h-[100vh]">
    <!-- Table Header Section -->
    <div :class="themeClass" class="overflow-y-auto rounded-lg shadow-xl p-6"
      :style="{ maxHeight: `calc(100vh - 100px - 4rem)` }">
      <!-- Add New Employee Button -->
      <button @click="createNewEmployee"
        class="absolute top-3 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out flex items-center"
        aria-label="Add New Employee">
        <router-link :to="routePath" class="text-white flex items-center">
          <span class="text-xl">&nbsp;✚&nbsp;</span>
          <span class="text-sm">Add New</span>
        </router-link>
      </button>

      <div>
        <TableTools :originalData="employees" :filteredData="filteredemployees" :reportTitle="fileInfo"
          :tableHeaders="tableHeaders" />
      </div>

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
            <th v-if="tableHeaders.columnNo1.visibility" class="p-4 text-center">
              <div class="flex items-center justify-center">
                <input type="text" placeholder="Sl" :disabled="!tableHeaders.columnNo1.searchable"
                  class="p-3 rounded-lg bg-gray-210 border-gray-300 w-12 focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_id')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_id'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>
            <th v-if="tableHeaders.columnNo2.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input v-model="globalSearch" type="text" :placeholder="`Search by ${tableHeaders.columnNo2.label}`"
                  class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_name')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_name'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>
            <th v-if="tableHeaders.columnNo3.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input v-model="searchaEmployeeName" type="text"
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
                <input v-model="searchaDesignation" type="text"
                  :placeholder="`Search by ${tableHeaders.columnNo4.label}`"
                  class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_title')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_title'">
                    {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>
            <th v-if="tableHeaders.columnNo5.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input v-model="searchaDepartment" type="text"
                  :placeholder="`Search by ${tableHeaders.columnNo5.label}`"
                  class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_description')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_description'">
                    {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>

            <th v-if="tableHeaders.columnNo6.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input v-model="searchaMobile" type="text" :placeholder="`Search by ${tableHeaders.columnNo6.label}`"
                  class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_description')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_description'">
                    {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>
            <th v-if="tableHeaders.columnNo7.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input v-model="searchaEmail" type="text" :placeholder="`Search by ${tableHeaders.columnNo7.label}`"
                  class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <button @click="sortBy('employee_description')" class="ml-2 focus:outline-none">
                  <span v-if="sortColumn === 'employee_description'">
                    {{ sortDirection === 'asc' ? '⬆️' : '⬇️' }}
                  </span>
                  <span v-else>↕</span>
                </button>
              </div>
            </th>
            <th v-if="tableHeaders.columnNo8.visibility" class="p-4 text-center">
              <div class="flex items-center">
                <input type="text" :placeholder="tableHeaders.columnNo8.label"
                  :disabled="!tableHeaders.columnNo8.searchable"
                  class="p-3 rounded-lg bg-gray-210 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
              </div>
            </th>
            <th v-if="tableHeaders.columnNo1.visibility" class="p-4 text-center w-12">Action</th>

          </tr>
        </thead>

        <tbody :class="themeClass">
          <template v-for="(employee, index) in sortedAndPaginatedemployees" :key="employee.employee_id">
            <tr :class="getRowClass(index)">
              <td v-if="tableHeaders.columnNo1.visibility" class="p-4"><span class="text-blue-600">{{
                index + 1
              }}</span></td>
              <td v-if="tableHeaders.columnNo2.visibility" class="p-4"><span class="text-blue-600">{{
                employee.employee_id
              }}</span></td>
              <td v-if="tableHeaders.columnNo3.visibility" class="p-4"><span class="text-blue-600">{{
                employee.emp_full_eng_name
              }}</span></td>
              <td v-if="tableHeaders.columnNo4.visibility" class="p-4"><span class="text-blue-600">{{
                employee.designation_name }}</span>
              </td>
              <td v-if="tableHeaders.columnNo5.visibility" class="p-4"><span class="text-blue-600">{{
                employee.department_name }}</span></td>
              <td v-if="tableHeaders.columnNo6.visibility" class="p-4"><span class="text-blue-600">{{
                employee.office_mobile }}</span>
              </td>
              <td v-if="tableHeaders.columnNo7.visibility" class="p-4"><span class="text-blue-600">{{
                employee.office_email }}</span>
              </td>
              <td v-if="tableHeaders.columnNo8.visibility" class="p-4">
                <img v-if="employee.emp_photo" :src="employee.emp_photo" alt="Photo"
                  class="w-16 h-8 object-cover rounded" />
                <span v-else class="text-gray-400">No photo</span>
              </td>
              <td v-if="tableHeaders.columnNo9.visibility" class="p-4 text-center">
                <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
                  <button class="fa fa-eye" v-on:click="navigateToEmployeeView(employee)"
                    style="color: white; background-color: #3498db; border-radius: 50%; padding: 5px; border: none; cursor: pointer;"
                    title="View"></button>

                  <button class="fa fa-pencil" v-on:click="navigateToEmployeeEdit(employee)"
                    style="color: white; background-color: #2ecc71; border-radius: 50%; padding: 5px; border: none; cursor: pointer;"
                    title="Edit">
                  </button>
                </div>
              </td>
            </tr>
            <EditPage v-if="expandedIndex === (index + (currentPage - 1) * itemsPerPage)"
              :index="index + (currentPage - 1) * itemsPerPage" :expanded-index="expandedIndex" :employee="employee"
              :departments="departments" :projects="projects" :theme-class="themeClass" :table-class="tableClass"
              @update-employee="handleemployeeUpdate" />
          </template>
        </tbody>
      </table>

      <Pagination :originalData="employees" :filteredData="filteredemployees" :totalItems="filteredemployees.length"
        v-model:currentPage="currentPage" v-model:itemsPerPage="itemsPerPage"
        @update:currentPage="val => currentPage = val" @update:itemsPerPage="val => itemsPerPage = val" />

    </div>

    <!-- Page -->
    <div v-if="isAddNewEmployee" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <AddNewEmployee :isOpen="isAddNewEmployee" :themeClass="themeClass" @close="closeAddPage"
          @employee-created="handleemployeeCreated" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import AddNewEmployee from '@/views/Pages/Hr/Employee/CurrentEmployee/Create/AddNewEmployee.vue';
import EditPage from '@/views/Pages/TaskManager/TaskAssign/EditPage.vue';
import TableTools from '@/features/dataTools/TableTools.vue';
import Pagination from '@/features/dataTools/Pagination.vue';
import { globals } from '@/config/globals';
import { useToast } from "vue-toastification";
import { useEmployeeStore } from '@/stores/hr/employee';
import router from '@/router';

const employeeStore = useEmployeeStore();

function navigateToEmployeeView(employee: object) {
  employeeStore.setCurrentEmployee(employee);
  router.push({
    name: 'ShowEmployeeInfo',
    params: { emp_id: employee.emp_id }
  });
}

function navigateToEmployeeEdit(employee: object) {
  employeeStore.setCurrentEmployee(employee);
  router.push({ name: 'EditEmployeeInfo' });
}

const store = useStore();
const toast = useToast();
const routePath = '/employee/create_new_employee';

const employees = ref([]);
const departments = ref([]);
const projects = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const expandedIndex = ref(null);
const isAddNewEmployee = ref(false);

// Sorting state
const sortColumn = ref(null);
const sortDirection = ref('asc'); // 'asc' or 'desc'

const globalSearch = ref("");
const searchEmployeeId = ref("");
const searchaEmployeeName = ref("");
const searchaDesignation = ref("");
const searchaDepartment = ref("");
const searchaMobile = ref("");
const searchaEmail = ref("");


const fileInfo = {
  title: 'Attendance Report',
  fileName: 'attendance_report'
};

const tableHeaders = ref({
  columnNo1: { id: 1, key: 'emp_id', label: 'Sl', visibility: true, searchable: false },
  columnNo2: { id: 2, key: 'employee_id', label: 'Employee Id', visibility: true, searchable: true },
  columnNo3: { id: 3, key: 'emp_full_eng_name', label: 'Name', visibility: true, searchable: true },
  columnNo4: { id: 4, key: 'designation_name', label: 'Designation', visibility: true, searchable: true },
  columnNo5: { id: 5, key: 'department_name', label: 'Department', visibility: true, searchable: true },
  columnNo6: { id: 6, key: 'office_mobile', label: 'Mobile', visibility: true, searchable: true },
  columnNo7: { id: 7, key: 'office_email', label: 'Email', visibility: true, searchable: true },
  columnNo8: { id: 8, key: 'emp_photo', label: 'Photo', visibility: true, searchable: false },
  columnNo9: { id: 9, key: 'action', label: 'Action', visibility: true, searchable: false },
});

const filteredemployees = computed(() => {
  return employees.value.filter((employee) => {
    const matchesFields =
      String(employee.employee_id || '').toLowerCase().includes(searchEmployeeId.value.toLowerCase()) &&
      (employee.emp_full_eng_name || '').toLowerCase().includes(searchaEmployeeName.value.toLowerCase()) &&
      (employee.designation_name || '').toLowerCase().includes(searchaDesignation.value.toLowerCase()) &&
      (employee.department_name || '').toLowerCase().includes(searchaDepartment.value.toLowerCase()) &&
      (employee.office_mobile || '').toLowerCase().includes(searchaMobile.value.toLowerCase()) &&
      (employee.office_email || '').toLowerCase().includes(searchaEmail.value.toLowerCase());

    const global = globalSearch.value.toLowerCase();
    const matchesGlobal =
      !global || Object.values(employee).some(value =>
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


// Sort the filtered employees
const sortedemployees = computed(() => {
  if (!sortColumn.value) return filteredemployees.value;

  return [...filteredemployees.value].sort((a, b) => {
    let valueA = a[sortColumn.value];
    let valueB = b[sortColumn.value];

    // Handle null/undefined values
    if (valueA == null) valueA = '';
    if (valueB == null) valueB = '';

    // Special handling for numeric columns (employee_id)
    if (sortColumn.value === 'employee_id') {
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

const sortedAndPaginatedemployees = computed(() => {
  if (itemsPerPage.value === -1) return sortedemployees.value;
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedemployees.value.slice(start, end);
});


// Watch for changes that should reset to page 1
watch([
  searchEmployeeId,
  searchaEmployeeName,
  searchaDesignation,
  searchaDepartment,
  searchaMobile,
  searchaEmail,
  globalSearch,
  itemsPerPage], () => {
    currentPage.value = 1;
  });


onMounted(async () => {
  await Promise.all([
    loadEmployeeInfo(),
    loadDepartments(),
    loadProjects()
  ]);
});

async function loadEmployeeInfo() {
  try {
    const response = await globals.axios.get(`${globals.apiEndpoints.basePath}/hr/employees`);
    employees.value = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to load employees.");
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


function createNewEmployee() {
  isAddNewEmployee.value = true;
}

function closeAddPage() {
  isAddNewEmployee.value = false;
}

function toggleDetails(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}

function handleemployeeUpdate({ index, data }) {
  employees.value[index] = {
    ...employees.value[index],
    ...data,
    employee_title: data.title,
    employee_description: data.description,
    project_id: data.project_id,
    department_id: data.department_id,
  };
  toast.success("employee updated successfully!");
}

function handleemployeeCreated(newemployee) {
  employees.value.unshift(newemployee);
  toast.success("employee created successfully!");
  closeAddPage();
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
