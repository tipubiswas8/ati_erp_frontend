
<template>
  <!-- Table Container -->
  <div :class="themeBlock" class="flex-1 w-full pt-14 shadow-lg p-4 space-y-8 relative h-[100vh]">
    <!-- Table Header Section -->
    <div :class="themeClass" class="overflow-hidden rounded-lg shadow-xl p-6">
      <!-- Add New Member Button -->
      <button @click="openMemberModal"
        class="absolute top-4 right-4 bg-blue-600 text-white py-0.5 px-1.5 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
        aria-label="Add New Member">
        <span class="text-xl text-white">&nbsp; ✚ &nbsp;</span>
      </button>

      <!-- Table -->
      <table :class="tableClass"
        class="w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-y-1">
        <!-- Table Head -->
        <thead :class="headerClass">
          <tr class="text-left text-sm font-semibold uppercase">
            <th class="p-4 text-center w-12">Sl</th>
            <th class="p-4 text-center">
              <input v-model="projectName" type="text" placeholder="Search by Emp ID"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchTitle" type="text" placeholder="Photo"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Emp Name"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Department"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Designation"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Mobile"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <input v-model="searchDescription" type="text" placeholder="Search by Email"
                class="p-3 rounded-lg bg-gray-100 border-gray-300 w-full focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
            </th>
            <th class="p-4 text-center">
              <p>Action</p>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody :class="themeClass">
          <template v-for="(employee, index) in employees" :key="employee.id">
            <tr :class="getRowClass(index)">

              <!-- Editable Fields -->
              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ index + 1 }}
                </span>
              </td>

              <!-- Editable Fields -->
              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.USER_DEFINE_EMP_CODE }}
                </span>
              </td>

              <td class="p-4 text-center">
                <img :src="employee.EMP_PHOTO" alt="Attachment" class="w-16 h-8 object-cover rounded" />
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.EMP_FULL_ENG_NAME }}
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.DEPARTMENT_NAME }}
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.DESIGNATION_NAME }}
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.OFFICE_MOBILE }}
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.OFFICE_EMAIL }}
                </span>
              </td>

              <td class="p-4 text-center">
                <span class="text-blue-600">
                  {{ employee.description }}
                </span>
              </td>

              <!-- Toggle Button for Details -->
              <td class="p-4 text-center">
                <span @click="toggleDetails(index)" :class="getToggleButtonClass(index)">
                  <span class="absolute text-lg font-semibold">
                    {{ expandedIndex === index ? "✏️" : "✏️" }}
                  </span>
                </span>
              </td>
            </tr>

            <!-- Collapsible Row -->
            <tr :class="themeClass" v-if="expandedIndex === index">
              <td colspan="5" class="p-2">
                <div :class="tableClass" class="p-6 rounded-lg shadow-xl space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Project Name :</strong></p>
                      <input v-model="employee.project_name" :class="getInputClass('projectName')"
                        placeholder="Project Name" />
                    </div>
                    <div>
                      <p><strong>Title :</strong></p>
                      <input v-model="employee.title" :class="getInputClass('title')" placeholder="Title" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Description :</strong></p>
                      <input v-model="employee.description" :class="getInputClass('description')"
                        placeholder="Description" />
                    </div>
                    <div>
                      <p><strong>Attachment:</strong></p>
                      <input type="file" :class="getInputClass('attachment')" />
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div class="text-center">
                      <button type="submit" @click="toggleDetails(index)"
                        class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center space-x-4 mt-6">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
        aria-label="Previous Page">
        &#8592; Prev
      </button>
      <span class="text-sm font-semibold">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
        aria-label="Next Page">
        Next &#8594;
      </button>
    </div>

    <!-- Modal for Adding a New Member -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import { globals } from "@/config/globals";

// Store
const store = useStore();

// Refs
const expandedIndex = ref(null);
const isModalOpen = ref(false);
const editingField = ref(null);
const projectName = ref("");
const searchTitle = ref("");
const searchDescription = ref("");
const searchSalary = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(3);
const employees = ref([]);

// Computed
const theme = computed(() => store.state.theme);

const themeBlock = computed(() =>
  theme.value === "dark"
    ? "bg-gray-600 text-white custom-scrollbar"
    : "bg-gray-300 text-gray-800 custom-scrollbar"
);

const headerClass = computed(() =>
  theme.value === "dark"
    ? "bg-gray-400 text-white custom-scrollbar"
    : "bg-gray-400 text-gray-800 custom-scrollbar"
);

const tableClass = computed(() =>
  theme.value === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-200 text-gray-800 custom-scrollbar"
);

const themeClass = computed(() =>
  theme.value === "dark"
    ? "bg-gray-800 text-white custom-scrollbar"
    : "bg-gray-50 text-gray-800 custom-scrollbar"
);

const filteredEmployees = computed(() =>
  employees.value.filter((employee) => {
    return (
      employee.project.project_name
        .toLowerCase()
        .includes(projectName.value.toLowerCase()) &&
      employee.title
        .toLowerCase()
        .includes(searchTitle.value.toLowerCase()) &&
      employee.description
        .toLowerCase()
        .includes(searchDescription.value.toLowerCase()) &&
      employee.attachment
        .toLowerCase()
        .includes(searchSalary.value.toLowerCase())
    );
  })
);

// Methods
const openMemberModal = () => {
  isModalOpen.value = true;
};

const closeSupportModal = () => {
  isModalOpen.value = false;
};

const toggleDetails = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};

const changePage = (page) => {
  const totalPages = Math.ceil(filteredEmployees.value.length / itemsPerPage.value);
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page;
  }
};

const getRowClass = (index) => {
  return themeClass.value.includes("dark")
    ? "border-b border-gray-200 hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
    : "border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-md";
};

const getInputClass = (field, index) => {
  return themeClass.value.includes("dark")
    ? "w-full p-3 rounded-lg text-white bg-gray-700 border focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full p-3 rounded-lg text-gray-800 bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500";
};

const getToggleButtonClass = (index) => {
  return {
    "cursor-pointer inline-flex items-center justify-center transition-all duration-300 ease-in-out": true,
    "scale-110 rotate-45 ring-offset-2": expandedIndex.value === index,
  };
};

// Fetch employees on mount
onMounted(async () => {
  const response = await globals.axios.get(globals.apiEndpoints.basePath + "/hr/employees");
  employees.value = response.data.data;
});
</script>

