<template>

    <!-- Loop through each training entry -->
    <div v-if="isLoadingTraining" class="flex flex-col items-center justify-center py-12 space-y-2">
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
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Block 1 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Training Title</label>
                        <input type="text" v-model="training.title" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Tropics Coverd</label>
                        <input type="text" v-model="training.topic" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Training Type</label>
                        <input type="text" v-model="training.type" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Training
                            Institute</label>
                        <input type="text" v-model="training.institute" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Location</label>
                        <input type="text" v-model="training.location" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Country</label>
                        <input type="text" :value="training.country_name || training.country_id || ''" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                </div>
                <!-- Block 2 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Training Year</label>
                        <input type="text" v-model="training.year" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Training Date</label>
                        <input type="text" v-model="training.date_time" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Duration(Hour's)</label>
                        <input type="text" v-model="training.duration" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4" v-if="training.scan_copy_previews.length">
                        <label class="w-40 text-sm font-medium text-gray-700">Training Scan Copy(s)</label>
                    </div>
                    <div class="flex flex-wrap gap-4 mt-4" v-if="training.scan_copy_previews.length">
                        <div v-for="(preview, previewIndex) in training.scan_copy_previews" :key="previewIndex"
                            class="w-32 h-32 overflow-hidden border rounded shadow relative">
                            <img :src="preview" alt="Scan Copy Preview" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { onMounted, ref } from 'vue';

interface Training {
    id: number;
    title: string;
    topic: string | null;
    type: string | null;
    institute: string | null;
    location: string | null;
    country_id: number | null;
    country_name: string | null;
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
    country_name: null,
    year: null,
    date_time: null,
    duration: null,
    scan_copy: [],
    scan_copy_files: [],
    scan_copy_previews: []
}]);

const isLoadingTraining = ref<boolean>(true);

const empProps = defineProps({
    empInfo: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

onMounted(async () => {
    try {
        const previousTrainings = await commonAxiosRequest.fetchDataById('hr/employee-training-get-by-emp-id', empProps.empInfo?.emp_id || '');
        if (previousTrainings.status && previousTrainings.status_code == 200) {
            const preTrainings: Training[] = previousTrainings.data.map((item: Training) => ({
                id: Number(item.id) ?? null,
                title: item.title ?? '',
                topic: item.topic ?? null,
                type: item.type ?? null,
                institute: item.institute ?? null,
                location: item.location ?? null,
                country_id: item.country_id ?? null,
                country_name: item.country_name ?? null,
                year: item.year ?? null,
                date_time: item.date_time,
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
        isLoadingTraining.value = false;
    }
});
</script>