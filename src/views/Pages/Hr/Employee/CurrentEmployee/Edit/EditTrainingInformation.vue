<template>
    <div v-if="!isAddNew">
        <form @submit.prevent="handleUpdate" class="p-8">
            <!-- Loop through each training entry -->
            <div v-if="isLoadingTrainings" class="flex flex-col items-center justify-center py-12 space-y-2">
                <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                    </path>
                </svg>
                <p class="text-sm text-gray-500">Loading training data...</p>
            </div>


            <div v-else v-for="(training, index) in trainings" :key="index" class="space-y-6">
                <div class="relative mt-6 flex items-center justify-center">
                    <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                        Employee Training Information #{{ index + 1 }}
                    </h2>
                    <button v-on:click="addNewTraining" type="button" v-if="index === 0"
                        class="absolute top-3 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out flex items-center"
                        aria-label="Add New Employee">
                        <span class="text-white flex items-center">
                            <span class="text-xl">&nbsp;✚&nbsp;</span>
                        </span>
                    </button>
                </div>

                <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                    <!-- Edit Button -->
                    <div style="display: flex; align-items: end; justify-content: end; gap: 10px; margin-bottom: 16px;">
                        <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No" v-if="trainings.length > 0"
                            v-on:confirm="editTraining(index)">
                            <template #title>
                                <p>{{ editMessage }}</p>
                            </template>
                            <button
                                class="bg-yellow-400 text-white rounded-full hover:bg-yellow-500 shadow transition duration-200"
                                title="Edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 p-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5h2m-1 0v12m9 4H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        </a-popconfirm>
                        <!-- Delete Button -->
                        <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No" v-if="trainings.length > 0"
                            v-on:confirm="deleteTraining(index)">
                            <template #title>
                                <p>{{ deleteMessage }}</p>
                            </template>
                            <button type="button"
                                class="bg-red-500 text-white rounded-full hover:bg-red-600 shadow transition duration-200"
                                title="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 p-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </a-popconfirm>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Block 1 -->
                        <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700 required">Training Title</label>
                                <input type="text" v-model="training.title"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Tropics Coverd</label>
                                <input type="text" v-model="training.topic"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Training Type</label>
                                <input type="text" v-model="training.type"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700 required">Training
                                    Institute</label>
                                <input type="text" v-model="training.institute"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Location</label>
                                <input type="text" v-model="training.location"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Country</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="training.country_id" :key="training.country_id" show-search
                                        placeholder="Select Post Office" :options="countries"
                                        :loading="isLoadingCountry" option-filter-prop="label" class="w-full"
                                        :disabled="isCountryDisabled" />
                                </div>
                            </div>
                        </div>
                        <!-- Block 2 -->
                        <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Training Year</label>
                                <select v-model="training.year"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <option disabled value="">Select Year</option>
                                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                                </select>
                            </div>

                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700 required">Training Date
                                    Time</label>
                                <input type="date" v-model="training.date_time"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Duration(Hour's)</label>
                                <input type="number" v-model="training.duration"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Training Scan Copy</label>
                                <div class="relative flex-1">
                                    <!-- Hidden actual file input -->
                                    <input type="file" accept="image/*,.pdf"
                                        @change="(e) => handleMultipleFileUpload(e, index)" multiple
                                        :id="'fileInput-' + index"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

                                    <!-- Custom styled file input -->
                                    <label :for="'fileInput-' + index"
                                        class="flex items-center justify-between px-4 py-2 border rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 cursor-pointer bg-white">
                                        <span class="truncate text-gray-700">
                                            {{ training.scan_copy_previews.length > 0
                                                ? `${training.scan_copy_previews.length} file(s) selected`
                                                : 'Choose files' }}
                                        </span>
                                        <span v-if="training.scan_copy_previews.length > 0">Chose more filse</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0012.586 2H4zm8 1.414L16.586 8H13a1 1 0 01-1-1V3.414z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-4 mt-4" v-if="training.scan_copy_previews.length">
                                <div v-for="(preview, previewIndex) in training.scan_copy_previews" :key="previewIndex"
                                    class="w-32 h-32 overflow-hidden border rounded shadow relative">
                                    <button type="button" @click="removeImage(index, previewIndex)"
                                        class="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-700 transition">
                                        ✕
                                    </button>
                                    <img :src="preview" alt="Scan Copy Preview" class="w-full h-full object-cover" />
                                    <div
                                        class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                        {{ previewIndex < training.scan_copy.length ? 'Existing' : 'New' }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative mt-6 flex items-center justify-center">
                    <!-- Centered Submit Button -->
                    <button type="submit" v-if="trainings.length > 0 && isLoadingTrainings == false"
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Update All Training Info
                    </button>
                </div>
        </form>
    </div>
    <div v-if="isAddNew">
        <TrainingInformation />
    </div>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { onMounted, ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import TrainingInformation from '@/views/Pages/Hr/Employee/CurrentEmployee/Create/TrainingInformation.vue';

const isAddNew = ref<boolean>(false);

const addNewTraining = () => {
    isAddNew.value = true;
}

const deleteMessage = 'Are you sure to delete this training?';
const editMessage = 'Do you want to update this training info?';

const empId = useEmployeeStore().getCurrentEmployee()?.emp_id;

// Remove a training entry by index
const deleteTraining = async (index: number) => {
    try {
        const conditions = {
            emp_id: empId?.toString(),
            trai_id: trainings.value[index]?.id?.toString(),
            // Can add more conditions dynamically
        };
        const deleted = await commonAxiosRequest.deleteMethodTwo('hr/employee-training-delete', conditions);
        if (deleted?.status && deleted?.status_code == 200) {
            message.info(deleted?.message || 'Deleted');
            trainings.value.splice(index, 1);
        } else {
            message.error('Something went wrong, please try again!');
        }
    } catch (error) {
        console.log(error);
    }
};

interface Training {
    id: number;
    title: string;
    topic: string | null;
    type: string | null;
    institute: string | null;
    location: string | null;
    country_id: number | null;
    year: number | null;
    date_time: string | null;
    duration: number | null;
    scan_copy: string[];
    scan_copy_files: File[];
    scan_copy_previews: string[];
}


// Initialize formData as an array with one empty training entry
const trainings = ref<Training[]>([{
    id: null,
    title: '',
    topic: null,
    type: null,
    institute: null,
    location: null,
    country_id: null,
    year: null,
    date_time: null,
    duration: null,
    scan_copy: [],
    scan_copy_files: [],
    scan_copy_previews: []
}]);

const isLoadingTrainings = ref<boolean>(true);

function formatDateForInput(dateStr: string | null): string | null {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
}

onMounted(async () => {
    try {
        const countriesData = await commonAxiosRequest.fetchAllData('su/countries');
        if (countriesData.status && countriesData.status_code == 200) {
            const countryOption = { value: '', label: 'Select Country', disabled: true };
            const countryData = countriesData.data.map(function (c: Country) {
                return {
                    value: c.id,
                    label: c.country_name
                }
            });
            countries.value = [countryOption, ...countryData];
        }

        const previousTrainings = await commonAxiosRequest.fetchDataById('hr/employee-training-get-by-emp-id', empId?.toString() || '');
        if (previousTrainings.status && previousTrainings.status_code == 200) {
            const preTrainings: Training[] = previousTrainings.data.map((item: Training) => ({
                id: Number(item.id) ?? null,
                title: item.title ?? '',
                topic: item.topic ?? null,
                type: item.type ?? null,
                institute: item.institute ?? null,
                location: item.location ?? null,
                country_id: item.country_id ?? null,
                year: item.year ?? null,
                date_time: formatDateForInput(item.date_time),
                duration: item.duration ?? null,
                scan_copy: item.scan_copy ?? [],
                scan_copy_files: [],
                scan_copy_previews: [...item.scan_copy ?? []],
            }));
            // Replace default form if data exists
            if (preTrainings.length) {
                trainings.value = preTrainings;
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoadingTrainings.value = false;
        isCountryDisabled.value = false;
        isLoadingCountry.value = false;
    }
});

// Edit 
const editTraining = async (index: number) => {
    try {
        const fd = new FormData();
        const training = trainings.value[index];

        // Add condition params (to be passed via URL or as hidden fields)
        const conditions = {
            emp_id: empId?.toString(),
            trai_id: training?.id?.toString(),
        };

        // Append existing scan_copy URLs (if you're sending them to keep existing files)
        training.scan_copy.forEach((url: string) => {
            fd.append(`scan_copy[]`, url);
        });

        // Append new uploaded files
        training.scan_copy_files.forEach((file: File) => {
            fd.append(`new_files[]`, file);
        });

        // Append other fields (flat keys)
        if (training.id) fd.append(`id`, training.id.toString());
        if (training.title) fd.append(`title`, training.title);
        if (training.topic) fd.append(`topic`, training.topic);
        if (training.type) fd.append(`type`, training.type);
        if (training.institute) fd.append(`institute`, training.institute);
        if (training.location) fd.append(`location`, training.location);
        if (training.country_id) fd.append(`country_id`, training.country_id.toString());
        if (training.year) fd.append(`year`, training.year.toString());
        if (training.date_time) fd.append(`date_time`, training.date_time);
        if (training.duration) fd.append(`duration`, training.duration.toString());

        const updated = await commonAxiosRequest.updateMethodWithFileFour('hr/employee-training-update', conditions, fd);
        console.log(updated);

        if (updated?.status && updated?.status_code == 200) {
            message.info(updated?.message || 'Updated');
        } else {
            message.error('Something went wrong, please try again!');
        }
    } catch (error) {
        console.log(error);
    }
};

const handleMultipleFileUpload = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length) {
        // trainings.value[index].scan_copy_files = Array.from(files);
        // Add new files to scan_copy_files
        trainings.value[index].scan_copy_files = [
            ...trainings.value[index].scan_copy_files,
            ...Array.from(files)
        ];
        // Create previews for new files
        Array.from(files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    trainings.value[index].scan_copy_previews.push(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        });
    }
};

const removeImage = (trainingIndex: number, imageIndex: number) => {
    const training = trainings.value[trainingIndex];
    if (training) {
        // Check if the image is an existing one (URL) or a new one (blob/data URL)
        if (imageIndex < training.scan_copy.length) {
            // It's an existing file - mark for deletion if needed
            // You might want to add logic here to track which existing files should be deleted
            training.scan_copy.splice(imageIndex, 1);
        } else {
            // It's a new file - adjust index for scan_copy_files
            const fileIndex = imageIndex - training.scan_copy.length;
            training.scan_copy_files.splice(fileIndex, 1);
        }
        training.scan_copy_previews.splice(imageIndex, 1);
    }
};

const handleUpdate = async () => {
    const fd = new FormData();
    if (empId) fd.append('emp_id', empId.toString());
    // Append files from all training entries
    trainings.value.forEach((training, index) => {
        // Append existing file URLs
        training.scan_copy.forEach((url: string) => {
            fd.append(`trainings[${index}][existing_files][]`, url);
        });

        // Append new files
        training.scan_copy_files.forEach((file: File) => {
            fd.append(`trainings[${index}][new_files][]`, file);
        });

        // Append other fields for this training entry
        if (training.id) fd.append(`trainings[${index}][id]`, training.id.toString());
        if (training.title) fd.append(`trainings[${index}][title]`, training.title);
        if (training.topic) fd.append(`trainings[${index}][topic]`, training.topic);
        if (training.type) fd.append(`trainings[${index}][type]`, training.type);
        if (training.institute) fd.append(`trainings[${index}][institute]`, training.institute);
        if (training.location) fd.append(`trainings[${index}][location]`, training.location);
        if (training.country_id) fd.append(`trainings[${index}][country_id]`, training.country_id.toString());
        if (training.year) fd.append(`trainings[${index}][year]`, training.year.toString());
        if (training.date_time) fd.append(`trainings[${index}][date_time]`, training.date_time);
        if (training.duration) fd.append(`trainings[${index}][duration]`, training.duration.toString());
    });

    try {
        const updated = await commonAxiosRequest.updateMethodWithFileTwo(
            'hr/employee-training-update',
            fd
        );

        if (updated.status && updated.status_code == 200) {
            notification.success({
                message: 'Success',
                description: updated?.message || 'Training info updated successfully!'
            })
        } else {
            notification.error({
                message: 'Error',
                description: 'Something went wrong, please try again!',
            });
        }
    } catch (error) {
        console.error('Error updatting training data:', error);
        // Optionally show error message to user
    }
};

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