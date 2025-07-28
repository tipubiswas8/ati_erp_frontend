<template>
    <div v-if="!isAddNew">
        <form @submit.prevent="handleUpdate" class="p-8">
            <!-- Loop through each professional entry -->
            <div v-if="isLoadingProfessionals" class="flex flex-col items-center justify-center py-12 space-y-2">
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
                        Update Employee Professional Information #{{ index + 1 }}
                    </h2>
                    <button v-on:click="addNewProfessional" type="button" v-if="index === 0"
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
                        <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No"
                            v-if="professionals.length > 0" v-on:confirm="editProfessional(index)">
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
                        <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No"
                            v-if="professionals.length > 0" v-on:confirm="deleteProfessional(index)">
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
                                <label class="w-40 text-sm font-medium text-gray-700 required">Certification
                                    Name</label>
                                <input type="text" v-model="professional.certificate_name"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Certification Authority</label>
                                <input type="text" v-model="professional.certificate_authority"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Certification License
                                    Number</label>
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
                                <label class="w-40 text-sm font-medium text-gray-700">Active Status</label>
                                <select v-model="professional.active_status"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <option :value="true">Active</option>
                                    <option :value="false">Inactive</option>
                                </select>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-40 text-sm font-medium text-gray-700">Professional Scan Copy</label>
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
                                            {{ professional.scan_copy_previews.length > 0
                                            ? `${professional.scan_copy_previews.length} file(s) selected`
                                            : 'Choose files' }}
                                        </span>
                                        <span v-if="professional.scan_copy_previews.length > 0">Chose more filse</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 text-gray-500"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0012.586 2H4zm8 1.414L16.586 8H13a1 1 0 01-1-1V3.414z" />
                                        </svg>
                                    </label>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-4 mt-4" v-if="professional.scan_copy_previews.length">
                                <div v-for="(preview, previewIndex) in professional.scan_copy_previews"
                                    :key="previewIndex"
                                    class="w-32 h-32 overflow-hidden border rounded shadow relative">
                                    <button type="button" @click="removeImage(index, previewIndex)"
                                        class="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-700 transition">
                                        ✕
                                    </button>
                                    <img :src="preview" alt="Scan Copy Preview" class="w-full h-full object-cover" />
                                    <div
                                        class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                        {{ previewIndex < professional.scan_copy.length ? 'Existing' : 'New' }} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative mt-6 flex items-center justify-center">
                    <!-- Centered Submit Side by Side -->
                    <div v-if="professionals.length > 0 && isLoadingProfessionals == false"
                        class="flex gap-4 justify-center mt-4">
                        <!-- Update Button -->
                        <button type="button"
                            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Update All Professional Info
                        </button>

                        <!-- Delete Button -->
                        <button type="button" v-on:click="deleteProfessional()"
                            class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Delete All Professional Info
                        </button>
                    </div>

                </div>
        </form>
    </div>
    <div v-if="isAddNew">
        <ProfessionalInformation v-bind:emp-id="empId" />
    </div>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { onMounted, ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import ProfessionalInformation from '@/views/Pages/Hr/Employee/CurrentEmployee/Create/ProfessionalInformation.vue';

const isAddNew = ref<boolean>(false);

const addNewProfessional = () => {
    isAddNew.value = true;
}

const deleteMessage = 'Are you sure to delete this professional?';
const editMessage = 'Do you want to update this professional info?';

const empId = useEmployeeStore().getCurrentEmployee()?.emp_id;

const deleteProfessional = async (index: number = -1) => {
    try {
        let conditions: Record<string, string | undefined> = {
            emp_id: empId?.toString(),
        };

        if (index === -1) {
            conditions.delete_all = 'Yes';
        } else {
            conditions.attachment_id = professionals.value[index]?.attachment_id?.toString();
            conditions.certificate_id = professionals.value[index]?.id?.toString();
        }

        const deleted = await commonAxiosRequest.deleteMethodTwo('hr/employee-professional-delete', conditions);

        if (deleted?.status && deleted?.status_code == 200) {
            message.info(deleted?.message || 'Deleted');

            // Remove only if not deleting all
            if (index !== -1) {
                professionals.value.splice(index, 1);
            } else {
                professionals.value = []; // clear all
            }
        } else {
            message.error('Something went wrong, please try again!');
        }
    } catch (error) {
        console.log(error);
        message.error('An error occurred!');
    }
};

interface Professional {
    id: number;
    attachment_id: number;
    certificate_name: string;
    certificate_authority: string | null;
    certificate_license_number: number | null;
    certificate_url: string | null;
    is_certificate_expire: boolean;
    active_status: boolean;
    scan_copy: Array<string>;
    scan_copy_files: File[];
    scan_copy_previews: Array<string>;
}

// Initialize formData as an array with one empty professional entry
const professionals = ref<Professional[]>([{
    id: null,
    attachment_id: null,
    certificate_name: '',
    certificate_authority: null,
    certificate_license_number: null,
    certificate_url: null,
    is_certificate_expire: false,
    active_status: true,
    scan_copy: [],
    scan_copy_files: [],
    scan_copy_previews: []
}]);

const isLoadingProfessionals = ref<boolean>(true);

onMounted(async () => {
    try {
        const previousProfessionals = await commonAxiosRequest.fetchDataById('hr/employee-professional-get-by-emp-id', empId?.toString() || '');
        if (previousProfessionals.status && previousProfessionals.status_code == 200) {
            const preProfessionals: Professional[] = previousProfessionals.data.map((item: Professional) => ({
                id: Number(item.id) ?? null,
                attachment_id: Number(item.attachment_id) ?? null,
                certificate_name: item.certificate_name ?? '',
                certificate_authority: item.certificate_authority ?? null,
                certificate_license_number: item.certificate_license_number ?? null,
                certificate_url: item.certificate_url ?? null,
                is_certificate_expire: item.is_certificate_expire ?? false,
                active_status: item.active_status ?? false,
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
        isLoadingProfessionals.value = false;
    }
});

// Edit 
const editProfessional = async (index: number) => {
    try {
        const fd = new FormData();
        const professional = professionals.value[index];

        // Add condition params (to be passed via URL or as hidden fields)
        const conditions = {
            emp_id: empId?.toString(),
            certificate_id: professionals.value[index]?.id?.toString(),
        };

        console.log(conditions);


        // Append existing scan_copy URLs (if you're sending them to keep existing files)
        professional.scan_copy.forEach((url: string) => {
            fd.append(`scan_copy[]`, url);
        });

        // Append new uploaded files
        professional.scan_copy_files.forEach((file: File) => {
            fd.append(`new_files[]`, file);
        });

        // Append other fields (flat keys)
        if (professional.id) fd.append(`id`, professional.id.toString());
        if (professional.attachment_id) fd.append(`attachment_id`, professional.attachment_id.toString());
        if (professional.certificate_name) fd.append(`certificate_name`, professional.certificate_name);
        if (professional.certificate_authority) fd.append(`certificate_authority`, professional.certificate_authority);
        if (professional.certificate_license_number) fd.append(`certificate_license_number`, professional.certificate_license_number.toString());
        if (professional.certificate_url) fd.append(`certificate_url`, professional.certificate_url);
        if (professional.is_certificate_expire) fd.append('is_certificate_expire', professional.is_certificate_expire ? '1' : '0');
        if (professional.active_status) fd.append('active_status', professional.active_status ? '1' : '0');

        const updated = await commonAxiosRequest.updateMethodWithFileFour('hr/employee-professional-update', conditions, fd);
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
        // professionals.value[index].scan_copy_files = Array.from(files);
        // Add new files to scan_copy_files
        professionals.value[index].scan_copy_files = [
            ...professionals.value[index].scan_copy_files,
            ...Array.from(files)
        ];
        // Create previews for new files
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

const removeImage = (professionalIndex: number, imageIndex: number) => {
    const professional = professionals.value[professionalIndex];
    if (professional) {
        // Check if the image is an existing one (URL) or a new one (blob/data URL)
        if (imageIndex < professional.scan_copy.length) {
            // It's an existing file - mark for deletion if needed
            // You might want to add logic here to track which existing files should be deleted
            professional.scan_copy.splice(imageIndex, 1);
        } else {
            // It's a new file - adjust index for scan_copy_files
            const fileIndex = imageIndex - professional.scan_copy.length;
            professional.scan_copy_files.splice(fileIndex, 1);
        }
        professional.scan_copy_previews.splice(imageIndex, 1);
    }
};

const handleUpdate = async () => {
    const fd = new FormData();
    if (empId) fd.append('emp_id', empId.toString());
    // Append files from all professional entries
    professionals.value.forEach((professional, index) => {
        // Append existing file URLs
        professional.scan_copy.forEach((url: string) => {
            fd.append(`professionals[${index}][existing_files][]`, url);
        });

        // Append new files
        professional.scan_copy_files.forEach((file: File) => {
            fd.append(`professionals[${index}][new_files][]`, file);
        });

        // Append other fields for this professional entry
        if (professional.id) fd.append(`professionals[${index}][id]`, professional.id.toString());
        if (professional.attachment_id) fd.append(`professionals[${index}][attachment_id]`, professional.attachment_id.toString());
        if (professional.certificate_name) fd.append(`professionals[${index}][certificate_name]`, professional.certificate_name);
        if (professional.certificate_authority) fd.append(`professionals[${index}][certificate_authority]`, professional.certificate_authority);
        if (professional.certificate_license_number) fd.append(`professionals[${index}][certificate_license_number]`, professional.certificate_license_number.toString());
        if (professional.certificate_url) fd.append(`professionals[${index}][certificate_url]`, professional.certificate_url);
        if (professional.is_certificate_expire) fd.append(`professionals[${index}][is_certificate_expire]`, professional.is_certificate_expire ? '1' : '0');
        if (professional.active_status) fd.append(`professionals[${index}][active_status]`, professional.active_status ? '1' : '0');
    });

    try {
        const updated = await commonAxiosRequest.updateMethodWithFileTwo(
            'hr/employee-professional-update',
            fd
        );

        if (updated.status && updated.status_code == 200) {
            notification.success({
                message: 'Success',
                description: updated?.message || 'Professional info updated successfully!'
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