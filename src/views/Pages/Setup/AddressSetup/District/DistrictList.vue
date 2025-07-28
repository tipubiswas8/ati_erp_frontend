<template>
    <AddressItemMenu />
    <div :class="themeBlock" class="flex-1 w-full pt-14 shadow-lg p-4 space-y-8 relative h-[100vh]">
        <!-- Table Header Section -->
        <div :class="themeClass" class="overflow-y-auto rounded-lg shadow-xl p-6"
            :style="{ maxHeight: `calc(100vh - 100px - 4rem)` }">

            <!-- Add New Button -->
            <router-link :to="routePath"
                class="absolute top-3 right-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out flex items-center z-10"
                aria-label="Add New District">
                <span class="text-xl">&nbsp;✚&nbsp;</span>
                <span class="text-sm">Add New</span>
            </router-link>

            <!-- Loading Spinner - Table Area Only -->
            <div v-if="isLoading"
                class="absolute inset-0 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div class="flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-500 mb-3">
                    </div>
                    <p class="text-lg font-medium"
                        :class="store.state.theme === 'dark' ? 'text-white' : 'text-gray-800'">
                        Loading districts...
                    </p>
                    <p class="text-sm" :class="store.state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'">
                        Please wait a moment
                    </p>
                </div>
            </div>


            <!-- Table -->
            <table v-else :class="tableClass"
                class="w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-y-1">
                <thead :class="headerClass">
                    <tr class="uppercase">
                        <th v-if="tableHeaders.columnNo1.visibility" class="p-4 text-left">SL</th>
                        <th v-if="tableHeaders.columnNo2.visibility" class="p-4 text-left">{{
                            tableHeaders.columnNo2.label }}</th>
                        <th v-if="tableHeaders.columnNo3.visibility" class="p-4 text-left">{{
                            tableHeaders.columnNo3.label }}</th>
                        <th v-if="tableHeaders.columnNo4.visibility" class="p-4 text-left">{{
                            tableHeaders.columnNo4.label }}</th>
                        <th v-if="tableHeaders.columnNo5.visibility" class="p-4 text-left">{{
                            tableHeaders.columnNo5.label }}</th>
                        <th v-if="tableHeaders.columnNo6.visibility" class="p-4 text-center w-12">Action</th>
                    </tr>
                </thead>

                <tbody :class="themeClass">
                    <template v-for="(district, index) in districts" :key="district.district_id">
                        <tr :class="getRowClass(index)">
                            <td v-if="tableHeaders.columnNo1.visibility" class="p-4">{{ index + 1 }}</td>
                            <td v-if="tableHeaders.columnNo2.visibility" class="p-4">{{
                                district.division.country.country_name }}</td>
                            <td v-if="tableHeaders.columnNo3.visibility" class="p-4">{{ district.division.division_name
                                }}</td>
                            <td v-if="tableHeaders.columnNo4.visibility" class="p-4">{{ district.district_name }}</td>
                            <td v-if="tableHeaders.columnNo5.visibility" class="p-4">{{
                                district.user_defined_serial_number }}</td>
                            <td v-if="tableHeaders.columnNo6.visibility" class="p-4 text-center w-12">
                                <router-link :to="`/setup/edit-district/${district.id}`"
                                    class="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50 dark:hover:bg-gray-700 inline-block"
                                    title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 16H9v-2.828z" />
                                    </svg>
                                </router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Router View for Child Pages -->
        <router-view @district-created="handleDistrictCreated" @district-updated="handleDistrictUpdated"></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import { fetchAllDistricts } from '@/api/setupApi';
import AddressItemMenu from './../AddressSeutp.vue';

const store = useStore();
const toast = useToast();
const routePath = '/setup/create-new-district';

const districts = ref([]);
const isLoading = ref(true);

const tableHeaders = ref({
    columnNo1: { id: 1, key: 'id', label: 'Sl', visibility: true, searchable: false },
    columnNo2: { id: 2, key: 'country_name', label: 'Country Name', visibility: true, searchable: true },
    columnNo3: { id: 3, key: 'division_name', label: 'Division Name', visibility: true, searchable: true },
    columnNo4: { id: 4, key: 'district_name', label: 'District Name', visibility: true, searchable: true },
    columnNo5: { id: 5, key: 'user_defined_serial_number', label: 'User Defined Code', visibility: true, searchable: true },
    columnNo6: { id: 6, key: '', label: 'Edit', visibility: true, searchable: true }
});

onMounted(async () => {
    await loadDistrictInfo();
});

async function loadDistrictInfo() {
    try {
        isLoading.value = true;
        const response = await fetchAllDistricts();
        districts.value = response.data;
    } catch (error) {
        toast.error("Failed to load districts.");
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

function handleDistrictCreated(newDistrict) {
    districts.value.unshift(newDistrict);
    toast.success("District created successfully!");
}

function handleDistrictUpdated(updatedDistrict) {
    const index = districts.value.findIndex(c => c.id === updatedDistrict.id);
    if (index !== -1) {
        districts.value[index] = updatedDistrict;
    }
    toast.success("District updated successfully!");
}

// Theme related computed properties
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

const getRowClass = (index) => {
    return themeClass.value.includes("dark")
        ? "border-b border-gray-200 hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
        : "border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-md";
};
</script>