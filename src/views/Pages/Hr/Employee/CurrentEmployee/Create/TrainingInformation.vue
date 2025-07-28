<template>
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Loop through each training entry -->
        <div v-for="(training, index) in trainings" :key="index" class="space-y-6 mb-8">
            <div class="relative mt-6 flex items-center justify-center">
                <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3">
                    Employee Training Information #{{ index + 1 }}
                </h2>
                <button v-if="trainings.length > 1" @click="removeTraining(index)" type="button"
                    class="absolute right-0 px-4 py-2 mr-5 bg-red-400 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                    Remove
                </button>
            </div>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
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
                            <label class="w-40 text-sm font-medium text-gray-700 required">Training Institute</label>
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
                                    placeholder="Select Post Office" :options="countries" :loading="isLoadingCountry"
                                    option-filter-prop="label" class="w-full" :disabled="isCountryDisabled" />
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
                            <label class="w-40 text-sm font-medium text-gray-700 required">Training Date Time</label>
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
                            <input type="file" accept="image/*" @change="(e) => handleMultipleFileUpload(e, index)"
                                multiple
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex flex-wrap gap-4 mt-4" v-if="training.scan_copy_previews.length">
                            <div v-for="(preview, previewIndex) in training.scan_copy_previews" :key="previewIndex"
                                class="w-32 h-32 overflow-hidden border rounded shadow relative">
                                <button type="button" @click="removeImage(index, previewIndex)"
                                    class="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-700 transition">
                                    ✕
                                </button>
                                <img :src="preview" alt="Scan Copy Preview" class="w-full h-full object-cover" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="relative mt-6 flex items-center justify-center">
            <!-- Centered Submit Button -->
            <button type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
                Submit All Training Info
            </button>

            <!-- Right-Aligned Add Button (absolutely positioned) -->
            <button @click="addMoreTraining" type="button"
                class="absolute right-0 px-4 py-2 mr-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
                Add More Training
            </button>
        </div>


    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { notification } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const empId = useEmployeeStore().getCurrentEmployee()?.emp_id;

interface Training {
    title: string;
    topic: string | null;
    type: string | null;
    institute: string | null;
    location: string | null;
    country_id: number | null;
    year: number | null;
    date_time: string | null;
    duration: number | null;
    scan_copy: object[];
    scan_copy_files: File[];
    scan_copy_previews: string[];
}


// Initialize formData as an array with one empty training entry
const trainings = ref<Training[]>([{
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

// Add a new empty training entry
const addMoreTraining = () => {
    trainings.value.push({
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
    });
};

// Remove a training entry by index
const removeTraining = (index: number) => {
    if (trainings.value.length > 1) {
        trainings.value.splice(index, 1);
    }
};


const removeImage = (trainingIndex: number, imageIndex: number) => {
    const training = trainings.value[trainingIndex];
    if (training) {
        training.scan_copy.splice(imageIndex, 1);
        training.scan_copy_files.splice(imageIndex, 1);
        training.scan_copy_previews.splice(imageIndex, 1);
    }
}

const handleMultipleFileUpload = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length) {
        // Convert FileList to array and store
        trainings.value[index].scan_copy_files = Array.from(files);

        // Clear previous previews
        trainings.value[index].scan_copy_previews = [];

        // Create previews for each file
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

const handleSubmit = async () => {
    const fd = new FormData();
    // Append files from all training entries
    trainings.value.forEach((training, index) => {
        // Append files for this training entry
        training.scan_copy_files.forEach((file: File) => {
            fd.append(`trainings[${index}][scan_copy][]`, file);
        });

        // Append other fields for this training entry
        Object.entries(training).forEach(([key, val]) => {
            if (
                key !== 'scan_copy_files' &&
                key !== 'scan_copy_previews' &&
                key !== 'scan_copy' &&
                val !== null &&
                val !== undefined
            ) {
                // Append with array notation for multiple trainings
                fd.append(`trainings[${index}][${key}]`, val as string | Blob);
            }
        });
    });

    try {
        const added = await commonAxiosRequest.addMethodWithIdAndFileOne(
            'hr/employee-training-create-by-emp-id',
            empId?.toString() || '', // Use the actual employee ID or fallback
            fd
        );

        if (added.status && added.status_code == 200) {
            notification.success({
                message: 'Success',
                description: added?.message || 'Training info addedd successfully!'
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
