<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Training Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Employee Training Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Training Title</label>
                            <input type="text" v-model="formData.title"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Tropics Coverd</label>
                            <input type="text" v-model="formData.topic"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Training Type</label>
                            <input type="text" v-model="formData.type"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Training Institute</label>
                            <input type="text" v-model="formData.institute"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Location</label>
                            <input type="text" v-model="formData.location"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Country</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.country_id" :key="formData.country_id" show-search
                                    placeholder="Select Post Office" :options="countries" :loading="isLoadingCountry"
                                    option-filter-prop="label" class="w-full" :disabled="isCountryDisabled" />
                            </div>
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Training Year</label>
                            <select v-model="formData.year"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option disabled value="">Select Year</option>
                                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Training Date Time</label>
                            <input type="date" v-model="formData.date_time"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Duration(Hour's)</label>
                            <input type="number" v-model="formData.duration"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Training Scan Copy</label>
                            <input type="file" accept="image/*" @change="handleMultipleFileUpload" multiple
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex flex-wrap gap-4 mt-4" v-if="formData.scan_copy_previews.length">
                            <div v-for="(preview, index) in formData.scan_copy_previews" :key="index"
                                class="w-32 h-32 overflow-hidden border rounded shadow">
                                <img :src="preview" alt="Scan Copy Preview" class="w-full h-full object-cover" />
                            </div>
                        </div>

                    </div>
                </div>

                <div style="display: flex; justify-content: end; align-items: end;">
                    <button class="">Add More</button>
                    <button class="">Remove</button>

                </div>
                <div class="flex justify-center mt-6">
                    <button type="submit"
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Update Training Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { onMounted, ref } from 'vue';

const empId = useEmployeeStore().getCurrentEmployee()?.emp_id;

const handleMultipleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files); // typed as File[]

    // Clean up old object URLs
    formData.value.scan_copy_previews.forEach(URL.revokeObjectURL);

    formData.value.scan_copy_files = files;
    formData.value.scan_copy_previews = files.map(file => URL.createObjectURL(file));
};

const handleSubmit = async () => {
    const fd = new FormData();

    // Append files
    formData.value.scan_copy_files.forEach((file) => {
        fd.append('scan_copy[]', file); // ✅ Note the square brackets
    });

    // Append other fields
    Object.entries(formData.value).forEach(([key, val]) => {
        if (
            key !== 'scan_copy_files' &&
            key !== 'scan_copy_previews' &&
            typeof val !== 'object' // ✅ skip arrays/objects
        ) {
            fd.append(key, val);
        }
    });

    const added = await commonAxiosRequest.updateMethodWithFileOne(
        'hr/employee-training-info',
        '106',
        fd
    );

    if (added) {
        console.log(added);
    }
};

const formData = ref({
    title: '',
    topic: '',
    institute: '',
    location: '',
    country_id: '',
    year: '',
    date_time: '',
    duration: '',
    type: '',
    scan_copy: [],
    scan_copy_files: [],         // actual File objects
    scan_copy_previews: [],      // object URLs for previews
});


let years = [];
for (let y = 2000; y <= 2050; y++) {
    years.push(String(y));
}

interface Country {
    id: string | number,
    country_name: string,
}

const countries = ref<Country[]>([]);
const isLoadingCountry = ref<boolean>(true);
const isCountryDisabled = ref<boolean>(true);

onMounted(async () => {
    try {
        const response = await commonAxiosRequest.fetchAllData('su/countries');
        if (response.status && response.status_code == 200) {
            const countryOption = { value: '', label: 'Select Country', disabled: true };
            const countryData = response.data.map(function (c: Country) {
                return {
                    value: c.id,
                    label: c.country_name
                }
            });
            countries.value = [countryOption, ...countryData];
        }
    } catch (error) {
        console.log(error);
    } finally {
        isCountryDisabled.value = false;
        isLoadingCountry.value = false;
    }
});

</script>

<style scoped>
/* Select component styling */
:deep(.ant-select) {
    width: 100%;
}

:deep(.ant-select-selector) {
    height: 40px !important;
    border-color: rgb(209 213 219) !important;
    align-items: center !important;
}

.required:after {
    content: ' ★';
    color: red;
    margin-left: 0.25rem
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
