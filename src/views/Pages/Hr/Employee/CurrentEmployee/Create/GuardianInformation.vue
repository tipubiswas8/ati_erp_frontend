<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Guardian Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Employee Guardian Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" v-model="formData.basicInfo.name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Organization</label>
                            <select v-model="formData.basicInfo.organization"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                <option value="">Select Organization</option>
                                <option value="org1">Org 1</option>
                                <option value="org2">Org 2</option>
                            </select>
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Date of Birth</label>
                            <input type="date" v-model="formData.basicInfo.dob"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">National ID</label>
                            <input type="text" v-model="formData.basicInfo.nid"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
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
                        Submit Employee Guardian Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
    basicInfo: {
        name: '',
        organization: '',
        gender: '',
        department: '',
        dob: '',
        designation: '',
        nid: '',
        employment_type: '',
        biomatic_id: '',
        biometric_id: '',
        duration: '',
        blood_group: '',
        hire_date: '',
        religion: '',
        email: '',
        marital_status: '',
        phone: ''
    }
});


const handleSubmit = () => {
    console.log('Form submitted:', formData.value);
    // Here you would typically send the data to your backend
    alert('Employee registered successfully!');
};

</script>
