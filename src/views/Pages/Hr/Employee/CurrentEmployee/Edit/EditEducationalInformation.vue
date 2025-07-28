<template>
    <!-- Step 2: Educational Information -->
    <div v-show="currentStep === 2" class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">Educational Information</h2>

        <div v-for="(edu, index) in formData.education" :key="index" class="border rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center mb-3">
                <h3 class="font-medium text-gray-700">Education {{ index + 1 }}</h3>
                <button v-if="index > 0" @click="removeEducation(index)" type="button"
                    class="text-red-500 hover:text-red-700 text-sm">
                    Remove
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input type="text" v-model="edu.degree"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input type="text" v-model="edu.institution"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Year of
                        Completion</label>
                    <input type="number" v-model="edu.year"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Grade/GPA</label>
                    <input type="text" v-model="edu.grade"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
            </div>
        </div>

        <button @click="addEducation" type="button"
            class="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <span class="text-lg mr-1">+</span> Add Another Education
        </button>
        
        <div class="flex justify-center mt-6">
            <button type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
                Submit Documents Info
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentStep = ref(1);
const formData = ref({
    education: [
        {
            degree: '',
            institution: '',
            year: '',
            grade: ''
        }
    ]
});


const addEducation = () => {
    formData.value.education.push({
        degree: '',
        institution: '',
        year: '',
        grade: ''
    });
};

const removeEducation = (index) => {
    formData.value.education.splice(index, 1);
};</script>