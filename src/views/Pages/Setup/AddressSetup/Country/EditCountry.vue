<template>
    <!-- Form Sections -->
    <form @submit.prevent="submitForm" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Basic Information -->
        <div class="space-y-6">
            <div class="flex items-center justify-between mb-4">
                <button @click="goBack" type="button"
                    class="flex items-center group text-sm text-blue-600 hover:text-white transition-all duration-200 bg-white hover:bg-blue-300 border border-blue-200 hover:border-blue-600 rounded-lg px-3 py-2 shadow-sm">
                    <!-- Custom animated back icon -->
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 12H6M6 12L11 7M6 12L11 17"
                            class="transition-all duration-200 group-hover:stroke-[2.5]" />
                    </svg>
                    <span class="font-medium">Back</span>
                </button>

                <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center flex-1">
                    Country Information
                </h2>
            </div>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Country Name</label>
                            <input type="text" v-model="formData.country_name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Country Code</label>
                            <input type="text" v-model="formData.country_code"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">User Define Serial Number</label>
                            <input type="number" v-model="formData.user_defined_serial_number"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">ISO</label>
                            <input type="text" v-model="formData.iso"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Number Code</label>
                            <input type="number" v-model="formData.number_code"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Phone Code</label>
                            <input type="number" v-model="formData.phone_code"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Status</label>
                            <select id="status" v-model="formData.active_status"
                                :style="{ color: formData.active_status ? 'green' : 'magenta' }"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option :value="true" style="color: green;">Active</option>
                                <option :value="false" style="color: magenta;">Inactive</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <button type="submit"
                        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Update Country Info
                    </button>
                </div>

            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCountryById, updateCountry } from '@/api/setupApi';
import { useToast } from "vue-toastification";

const emit = defineEmits(['country-updated']);

const toast = useToast();
const router = useRouter();

const goBack = () => {
    router.back(); // This will navigate to the previous page
};

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const formData = ref({
    country_name: '',
    country_code: '',
    user_defined_serial_number: '',
    iso: '',
    number_code: '',
    phone_code: '',
    nationality: '',
    abbreviation: '',
    active_status: '',
});

onMounted(async () => {
    const country = fetchCountryById(props.id);
    formData.value = (await country).data;
});

;
const submitForm = async () => {
    formData.value.nationality = formData.value.country_name;
    formData.value.abbreviation = formData.value.iso;
    try {
        const updated = await updateCountry(props.id, formData.value);
        if (updated.success == true) {
            toast.success(updated.message);
            router.push('/setup/country-setup');
            emit('country-updated', updated.data);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong during submission.");
    }
};

</script>

<style scoped>
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
