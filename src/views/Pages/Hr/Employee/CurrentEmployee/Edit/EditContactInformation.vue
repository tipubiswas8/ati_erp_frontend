<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Contact Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Update Employee Contact Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Personal Email</label>
                            <input type="email" v-model="formData.personal_email"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Skype Address</label>
                            <input type="text" v-model="formData.personal_skype_address"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Web Address</label>
                            <input type="url" v-model="formData.personal_webside_address_link"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Personal Mobile 1</label>
                            <input type="number" v-model="formData.personal_mobile"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Mobile 2</label>
                            <input type="number" v-model="formData.second_mobile"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Personal Mobile 3</label>
                            <input type="number" v-model="formData.third_mobile"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <button type="submit" :disabled="isSubmitButtonDisable"
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Update Contact Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { notification } from 'ant-design-vue';
import { computed, ref, onMounted } from 'vue';

const formData = ref({
    personal_email: '',
    personal_skype_address: '',
    personal_webside_address_link: '',
    personal_mobile: '',
    second_mobile: '',
    third_mobile: ''
});

const employee = useEmployeeStore().getCurrentEmployee();
const isSubmit = ref<boolean>(false);

const isSubmitButtonDisable = computed(() => {
    return isSubmit.value || !formData.value.personal_email || !formData.value.personal_mobile;
});

onMounted(async () => {
    try {
        const response = await commonAxiosRequest.fetchDataById('hr/employee-contact-info', employee?.emp_id);
        if (response.status && response.status_code === 200 && response.data) {
            formData.value = response.data;
        }
    } catch (err) {
        console.error('Error loading data:', err);
    }
});

const handleSubmit = async () => {
    isSubmit.value = true;
    if (!formData.value.personal_email) {
        notification.warn({
            message: 'The email field is required',
            description: 'Please input valid email address'
        });
        return false;
    }

    if (!formData.value.personal_mobile) {
        notification.warn({
            message: 'The mobile 1 field is required',
            description: 'Please input valid mobile number'
        });
        return false;
    }
    try {
        const updated = await commonAxiosRequest.updateMethod('hr/employee-contact-info', employee?.emp_id, formData.value);
        if (updated.status && updated.status_code == 204) {
            notification['success']({
                description: '',
                message: updated.message
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        isSubmit.value = false;
    }
};

</script>

<style scoped>
.required::after {
    content: ' ★';
    color: red;
    margin-left: 0.25rem;
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
