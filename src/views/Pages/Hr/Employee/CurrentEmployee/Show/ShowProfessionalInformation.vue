<template>

    <!-- Loop through each professional entry -->
    <div v-if="isLoadingProfessional" class="flex flex-col items-center justify-center py-12 space-y-2">
        <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
            </path>
        </svg>
        <p class="text-sm text-gray-500">Loading professional data...</p>
    </div>

    <div v-else v-for="(professional, index) in professionals" :key="index" class="space-y-6">
        <div class="relative mt-6 flex items-center justify-center">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Employee Professional Information #{{ index + 1 }}
            </h2>
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Block 1 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional Title</label>
                        <input type="text" :value="professional.title" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Tropics Coverd</label>
                        <input type="text" :value="professional.topic" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional Type</label>
                        <input type="text" :value="professional.type" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional
                            Institute</label>
                        <input type="text" :value="professional.institute" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Location</label>
                        <input type="text" :value="professional.location" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Country</label>
                        <input type="text" :value="professional.country_name || professional.country_id || ''" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                </div>
                <!-- Block 2 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional Year</label>
                        <input type="text" :value="professional.year" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional Date</label>
                        <input type="text" :value="professional.date_time" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Duration(Hour's)</label>
                        <input type="text" :value="professional.duration" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4" v-if="professional.scan_copy_previews.length">
                        <label class="w-40 text-sm font-medium text-gray-700">Professional Scan Copy(s)</label>
                    </div>
                    <div class="flex flex-wrap gap-4 mt-4" v-if="professional.scan_copy_previews.length">
                        <div v-for="(preview, previewIndex) in professional.scan_copy_previews" :key="previewIndex"
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

interface Professional {
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

// Initialize formData as an array with one empty professional entry
const professionals = ref<Professional[]>([{
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

const isLoadingProfessional = ref<boolean>(true);

const empProps = defineProps({
    empInfo: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

onMounted(async () => {
    try {
        const previousProfessionals = await commonAxiosRequest.fetchDataById('hr/employee-professional-get-by-emp-id', empProps.empInfo?.emp_id || '');
        if (previousProfessionals.status && previousProfessionals.status_code == 200) {
            const preProfessionals: Professional[] = previousProfessionals.data.map((item: Professional) => ({
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
            if (preProfessionals.length) {
                professionals.value = preProfessionals;
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoadingProfessional.value = false;
    }
});
</script>