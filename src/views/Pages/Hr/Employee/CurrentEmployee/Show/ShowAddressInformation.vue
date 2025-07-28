<template>
    <!-- Step 1: Address Information -->
    <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
            View Employee Address Information</h2>

        <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Block 1 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" :value="empProps.empInfo.emp_full_eng_name" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Organization</label>
                        <input type="text" v-model="empProps.empInfo.organization_name" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Department</label>
                        <input type="text" v-model="empProps.empInfo.department_name" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Designation</label>
                        <input type="text" v-model="empProps.empInfo.designation_name" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Biometric ID</label>
                        <input type="number" :value="employee.biometric_id" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Hire Date</label>
                        <input type="text" :value="employee.emp_hire_date" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Duration
                            (Months)</label>
                        <input type="text" :value="employee.emp_type_duration + ' Month'" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Employment Type</label>
                        <input type="text" :value="employee.emp_type_name" readonly :disabled="!employee.emp_type_name"
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                </div>

                <!-- Block 2 -->
                <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">National ID</label>
                        <input type="number" :value="employee.national_id" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Date of Birth</label>
                        <input type="text" :value="employee.date_of_birth" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Blood Group</label>
                        <input type="text" :value="employee.blood_group_name" readonly
                            :disabled="!employee.blood_group_name"
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Religion</label>
                        <input type="text" :value="employee.religion_name" readonly :disabled="!employee.religion_name"
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Gender</label>
                        <input type="text" v-model="employee.gender_name" readonly :disabled="!employee.gender_name"
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Marital Status</label>
                        <input type="text" v-model="employee.marital_status_name" readonly
                            :disabled="!employee.marital_status_name"
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Official Email</label>
                        <input type="email" :value="employee.office_email" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                    <div class="flex items-center gap-4">
                        <label class="w-40 text-sm font-medium text-gray-700">Mobile Number</label>
                        <input type="number" :value="employee.personal_mobile" readonly
                            class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import lookupApi from '@/api/lookupApi';
import { ref, onMounted } from 'vue';
import employeeApi from '@/api/hr/employeeApi';

const empProps = defineProps({
    empInfo: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

interface EmployeeBasicInfo {
    emp_id: number,
    biometric_id: number | string,
    emp_hire_date: string,
    emp_type_duration: number | string,
    emp_type_id: number | string,
    emp_type_name: string,
    national_id: number | string,
    date_of_birth: string,
    blood_group_id: number,
    blood_group_name: string,
    religion_id: number,
    religion_name: string,
    gender_id: number,
    gender_name: string,
    marital_status_id: number,
    marital_status_name: string,
    office_email: string,
    personal_mobile: string
}

const employee = ref<EmployeeBasicInfo>({
    emp_id: 0,
    biometric_id: '',
    emp_hire_date: '',
    emp_type_duration: '',
    emp_type_id: '',
    emp_type_name: '',
    national_id: '',
    date_of_birth: '',
    blood_group_id: 0,
    blood_group_name: '',
    religion_id: 0,
    religion_name: '',
    gender_id: 0,
    gender_name: '',
    marital_status_id: 0,
    marital_status_name: '',
    office_email: '',
    personal_mobile: ''
});

// On mount: fetch employee info first, then blood group
onMounted(async () => {
    if (empProps.empInfo?.emp_id) {
        await getEmployeeBasicInfoByEmpId(empProps.empInfo.emp_id);
        // Once you have employee data, you can safely call these:
        if (employee.value.emp_type_id) await getEmploymentTypeById(employee.value.emp_type_id);
        if (employee.value.religion_id) await getReligionById(employee.value.religion_id);
        if (employee.value.gender_id) await getGenderById(employee.value.gender_id);
        if (employee.value.marital_status_id) await getMaritalStatusById(employee.value.marital_status_id);
        if (employee.value.blood_group_id) await getBloodGroupById(employee.value.blood_group_id);
    }
});

async function getEmployeeInfoByEmpId(emp_id: string | number) {
    const empInfo = await employeeApi.getEmpInfoByEmpId(emp_id);
    try {
        if (empInfo.status) {
            employee.value = empInfo.data;
        }
    } catch (error) {
        console.log(error)
    }
}

async function getEmployeeBasicInfoByEmpId(emp_id: string | number) {
    const empInfo = await employeeApi.getEmpBasicInfoByEmpId(emp_id);
    try {
        if (empInfo.status) {
            employee.value = empInfo.data;
        }
        console.log(employee.value);
    } catch (error) {
        console.log(error)
    }
}

async function getEmploymentTypeById(id: string | number) {
    try {
        const response = await lookupApi.lookupData.getEmploymentTypeById(id);
        if (response.status === true) {
            employee.value.emp_type_name = response.data?.lookup_data_name;
        }
    } catch (error) {
        console.error('Error fetching employment type name', error);
    }
}

async function getBloodGroupById(id: string | number) {
    try {
        const response = await lookupApi.lookupData.getBloodGroupById(id);
        if (response.status === true) {
            employee.value.blood_group_name = response.data?.lookup_data_name;
        }
    } catch (error) {
        console.error('Error fetching blood group name', error);
    }
}

async function getReligionById(id: string | number) {
    try {
        const response = await lookupApi.lookupData.getLookupDataById(id);
        if (response.status === true) {
            employee.value.religion_name = response.data?.lookup_data_name;
        }
    } catch (error) {
        console.error('Error fetching religion name', error);
    }
}

async function getGenderById(id: string | number) {
    try {
        const response = await lookupApi.lookupData.getGenderById(id);
        if (response.status === true) {
            employee.value.gender_name = response.data?.lookup_data_name;
        }
    } catch (error) {
        console.error('Error fetching gender name', error);
    }
}

async function getMaritalStatusById(id: string | number) {
    try {
        const response = await lookupApi.lookupData.getLookupDataById(id);
        if (response.status === true) {
            employee.value.marital_status_name = response.data?.lookup_data_name;
        }
    } catch (error) {
        console.error('Error fetching marital status name', error);
    }
}


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
