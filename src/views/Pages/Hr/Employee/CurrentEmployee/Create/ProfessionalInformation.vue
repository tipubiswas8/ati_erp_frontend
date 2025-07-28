<template>
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Loop through each professional entry -->
        <div v-for="(professional, index) in professionals" :key="index" class="space-y-6 mb-8">
            <div class="relative mt-6 flex items-center justify-center">
                <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3">
                    Employee Professional Information #{{ index + 1 }}
                </h2>
                <button v-if="professionals.length > 1" @click="removeProfessional(index)" type="button"
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
                            <label class="w-40 text-sm font-medium text-gray-700 required">Certification Name</label>
                            <input type="text" v-model="professional.certificate_name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Certification Authority</label>
                            <input type="text" v-model="professional.certificate_authority"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Certification License Number</label>
                            <input type="number" v-model="professional.certificate_license_number"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Certification URL</label>
                            <input type="text" v-model="professional.certificate_url"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">This certification doesn’t
                                expire</label>
                            <select v-model="professional.is_certificate_expire"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option :value="false">No</option>
                                <option :value="true">Yes</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Certification Scan Copy</label>
                            <input type="file" accept="image/*" @change="(e) => handleMultipleFileUpload(e, index)"
                                multiple
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex flex-wrap gap-4 mt-4" v-if="professional.scan_copy_previews.length">
                            <div v-for="(preview, previewIndex) in professional.scan_copy_previews" :key="previewIndex"
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
                Submit All Professional Info
            </button>

            <!-- Right-Aligned Add Button (absolutely positioned) -->
            <button @click="addMoreProfessional" type="button"
                class="absolute right-0 px-4 py-2 mr-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
                Add More Professional
            </button>
        </div>


    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { notification } from 'ant-design-vue';
import { ref } from 'vue';

const empProps = defineProps(['empId']);
const empId = empProps?.empId;

interface Professional {
    certificate_name: string;
    certificate_authority: string | null;
    certificate_license_number: number | null;
    certificate_url: string | null;
    is_certificate_expire: boolean;
    scan_copy: Array<string>;
    scan_copy_files: File[];
    scan_copy_previews: Array<string>;
}

// Initialize formData as an array with one empty professional entry
const professionals = ref<Professional[]>([{
    certificate_name: '',
    certificate_authority: null,
    certificate_license_number: null,
    certificate_url: null,
    is_certificate_expire: false,
    scan_copy: [],
    scan_copy_files: [],
    scan_copy_previews: []
}]);

// Add a new empty professional entry
const addMoreProfessional = () => {
    professionals.value.push({
        certificate_name: '',
        certificate_authority: null,
        certificate_license_number: null,
        certificate_url: null,
        is_certificate_expire: false,
        scan_copy: [],
        scan_copy_files: [],
        scan_copy_previews: []
    });
};

// Remove a professional entry by index
const removeProfessional = (index: number) => {
    if (professionals.value.length > 1) {
        professionals.value.splice(index, 1);
    }
};

const removeImage = (professionalIndex: number, imageIndex: number) => {
    const professional = professionals.value[professionalIndex];
    if (professional) {
        professional.scan_copy.splice(imageIndex, 1);
        professional.scan_copy_files.splice(imageIndex, 1);
        professional.scan_copy_previews.splice(imageIndex, 1);
    }
}

const handleMultipleFileUpload = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length) {
        // Convert FileList to array and store
        professionals.value[index].scan_copy_files = Array.from(files);

        // Clear previous previews
        professionals.value[index].scan_copy_previews = [];

        // Create previews for each file
        Array.from(files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    professionals.value[index].scan_copy_previews.push(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        });
    }
};

const handleSubmit = async () => {
    const fd = new FormData();
    // Append files from all professional entries
    professionals.value.forEach((professional, index) => {
        // Append files for this professional entry
        professional.scan_copy_files.forEach((file: File) => {
            fd.append(`professionals[${index}][scan_copy][]`, file);
        });

        // Append other fields for this professional entry
        Object.entries(professional).forEach(([key, val]) => {
            if (
                key !== 'scan_copy_files' &&
                key !== 'scan_copy_previews' &&
                key !== 'scan_copy' &&
                val !== null &&
                val !== undefined
            ) {
                // Append with array notation for multiple professionals
                fd.append(`professionals[${index}][${key}]`, val as string | Blob);
            }
        });
    });

    try {
        const added = await commonAxiosRequest.addMethodWithIdAndFileOne(
            'hr/employee-professional-create-by-emp-id',
            empId?.toString() || '', // Use the actual employee ID or fallback
            fd
        );

        if (added.status && added.status_code == 200) {
            notification.success({
                message: 'Success',
                description: added?.message || 'Professional info addedd successfully!'
            })
        } else {
            notification.error({
                message: 'Error',
                description: 'Something went wrong, please try again!',
            });
        }
    } catch (error) {
        console.error('Error updatting professional data:', error);
        // Optionally show error message to user
    }
};

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
