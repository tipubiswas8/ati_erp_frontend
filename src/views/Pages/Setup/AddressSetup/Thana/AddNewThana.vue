<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
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
                    Thana Information
                </h2>
            </div>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Country</label>
                            <select v-model="formData.country_id" v-on:change="getDivisions(formData.country_id)"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select</option>
                                <option v-for="country in countries" :key="country.id" :value="country.id">{{
                                    country.country_name }}</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Division</label>
                            <select v-model="formData.division_id" v-on:change="getDistricts(formData.division_id)"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select</option>
                                <option v-for="division in divisions" :key="division.id" :value="division.id">{{
                                    division.division_name }}</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">District</label>
                            <select v-model="formData.district_id"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select</option>
                                <option v-for="district in districts" :key="district.id" :value="district.id">{{
                                    district.district_name }}</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Thana Name</label>
                            <input type="text" v-model="formData.thana_name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Thana Code</label>
                            <input type="text" v-model="formData.user_defined_thana_code"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">User Define Serial Number</label>
                            <input type="number" v-model="formData.user_defined_serial_number"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
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
                        Submit Thana Info
                    </button>
                </div>

            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { addThana, fetchAllCountries, getDivisionsByCountryId, getDistrictsByDivisionId } from '@/api/setupApi';
import { useToast } from "vue-toastification";
const emit = defineEmits(['thana-created']);

const toast = useToast();
const router = useRouter();

interface Country {
    id: number;
    country_name: string;
}

interface Division {
    id: number;
    division_name: string;
}

interface District {
    id: number,
    district_name: string
}

const countries = ref<Country[]>([]);
const divisions = ref<Division[]>([]);
const districts = ref<District[]>([]);

const goBack = () => {
    router.back(); // This will navigate to the previous page
};


const formData = ref({
    country_id: '',
    division_id: '',
    district_id: '',
    thana_name: '',
    user_defined_thana_code: '',
    user_defined_serial_number: '',
});

async function getCountries() {
    const result = fetchAllCountries();
    countries.value = (await result).data;
}

async function getDivisions(countryId: string) {
    const div = getDivisionsByCountryId(countryId);
    divisions.value = (await div).data;
}

async function getDistricts(divisionId: string) {
    const dist = getDistrictsByDivisionId(divisionId);
    districts.value = (await dist).data;
}

onMounted(() => {
    getCountries();
})
const handleSubmit = async () => {
    const { country_id, division_id, ...freshData } = formData.value;
    try {
        const add = await addThana(freshData);
        if (add.success == true) {
            toast.success(add.message);
            router.push('/setup/thana-setup');
            emit('thana-created', add.data);
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
