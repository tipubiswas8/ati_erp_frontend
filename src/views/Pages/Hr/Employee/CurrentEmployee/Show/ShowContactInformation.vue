<template>
    <!-- Form Sections -->
    <form class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Contact Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                View Employee Contact Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Email</label>
                            <input type="text" v-model="formData.personal_email" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Skype Address</label>
                            <input type="text" :value="formData.personal_skype_address" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Web Address</label>
                            <input type="text" :value="formData.personal_webside_address_link" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Mobile 1</label>
                            <input type="text" :value="formData.personal_mobile" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Mobile 2</label>
                            <input type="text" :value="formData.second_mobile" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Mobile 3</label>
                            <input type="text" :value="formData.third_mobile" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { onMounted, reactive } from 'vue';


const formData = reactive({
    personal_email: '',
    personal_skype_address: '',
    personal_webside_address_link: '',
    personal_mobile: '',
    second_mobile: '',
    third_mobile: ''
});

const employee = useEmployeeStore().getCurrentEmployee();

onMounted(async () => {
    try {
        const response = await commonAxiosRequest.fetchDataById('hr/employee-contact-info', employee?.emp_id);
        if (response.status && response.status_code === 200 && response.data) {
            Object.assign(formData, response.data);
        }
    } catch (err) {
        console.error('Error loading data:', err);
    }
});
</script>
