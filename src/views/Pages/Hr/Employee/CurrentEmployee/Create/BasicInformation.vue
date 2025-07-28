<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Basic Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Employee Basic Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Full Name</label>
                            <input type="text" v-model="formData.basicInfo.name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Organization</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.organization_id" show-search required
                                    placeholder="Select Organization" :options="organizationOptions"
                                    :loading="isLoadingOrganization" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Department</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.department_id" show-search required
                                    placeholder="Select Department" :options="departmentOptions"
                                    :loading="isLoadingDepartment" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Designation</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.designation_id" show-search required
                                    placeholder="Select Designation" :options="designationOptions"
                                    :loading="isLoadingDesignation" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Biometric ID</label>
                            <input type="number" v-model="formData.basicInfo.biometric_id"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Hire Date</label>
                            <input type="date" v-model="formData.basicInfo.hire_date"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Duration
                                (Months)</label>
                            <input type="number" v-model="formData.basicInfo.duration"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Employment Type</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.employment_type" show-search
                                    placeholder="Select Employment Type" :options="employmentTypes"
                                    :loading="isLoadingEmploymentType" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                    </div>

                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">National ID</label>
                            <input type="number" v-model="formData.basicInfo.nid"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Date of Birth</label>
                            <input type="date" v-model="formData.basicInfo.dob"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Blood Group</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.blood_group_id" show-search
                                    placeholder="Select Blood Group" :options="bloodGroups"
                                    :loading="isLoadingBloodGroup" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Religion</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.religion_id" show-search
                                    placeholder="Select Religion" :options="religions" :loading="isLoadingReligion"
                                    option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Gender</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.gender_id" show-search
                                    placeholder="Select Gender" :options="genders" :loading="isLoadingGender"
                                    option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Marital Status</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.basicInfo.marital_status_id" show-search
                                    placeholder="Select Marital Status" :options="maritalStatus"
                                    :loading="isLoadingMaritailStatus" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Official Email</label>
                            <input type="email" v-model="formData.basicInfo.email"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Mobile Number</label>
                            <input type="number" v-model="formData.basicInfo.phone"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                    </div>
                </div>
                <div class="flex justify-center mt-6">
                    <button type="submit" :disabled="isSubmitDissable"
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Submit Basic Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { fetchAllDepartments } from '@/api/departmentApi';
import { fetchAllDesignations } from '@/api/designationApi';
import lookupApi from '@/api/lookupApi';
import OrganizationApi from '@/api/organizationApi';
import { ref, onMounted, computed } from 'vue';
import { notification } from 'ant-design-vue';
import employeeApi from '@/api/hr/employeeApi';

const formData = ref({
    basicInfo: {
        name: '',
        organization_id: '',
        department_id: '',
        designation_id: '',
        gender_id: '',
        dob: '',
        nid: '',
        employment_type: '',
        biometric_id: '',
        duration: '',
        blood_group_id: '',
        hire_date: '',
        religion_id: '',
        email: '',
        marital_status_id: '',
        phone: ''
    }
});

const organizationOptions = ref([]);
const departmentOptions = ref([]);
const designationOptions = ref([]);

const bloodGroups = ref([]);
const religions = ref([]);
const maritalStatus = ref([]);
const genders = ref([]);
const employmentTypes = ref([]);

const isLoadingOrganization = ref(true);
const isLoadingDepartment = ref(true);
const isLoadingDesignation = ref(true);

const isLoadingBloodGroup = ref(true);
const isLoadingReligion = ref(true);
const isLoadingMaritailStatus = ref(true);
const isLoadingGender = ref(true);
const isLoadingEmploymentType = ref(true);


const isSubmitDissable = computed(() => {
    const info = formData.value.basicInfo;
    return !(
        info.name &&
        info.organization_id &&
        info.department_id &&
        info.designation_id &&
        info.nid &&
        info.dob &&
        info.phone
    );
});

const handleSubmit = async () => {
    const basicInfo = {
        'emp_full_eng_name': formData.value.basicInfo.name,
        'hr_organization_id': formData.value.basicInfo.organization_id,
        'hr_department_id': formData.value.basicInfo.department_id,
        'hr_designation_id': formData.value.basicInfo.designation_id,
        'biometric_id': formData.value.basicInfo.biometric_id,
        'emp_hire_date': formData.value.basicInfo.hire_date,
        'emp_type_duration': formData.value.basicInfo.duration,
        'emp_type_id': formData.value.basicInfo.employment_type,
        'national_id': formData.value.basicInfo.nid,
        'date_of_birth': formData.value.basicInfo.dob,
        'blood_group_id': formData.value.basicInfo.blood_group_id,
        'religion_id': formData.value.basicInfo.religion_id,
        'gender_id': formData.value.basicInfo.gender_id,
        'marital_status_id': formData.value.basicInfo.marital_status_id,
        'office_email': formData.value.basicInfo.email,
        'personal_mobile': formData.value.basicInfo.phone
    };



    if (!basicInfo.emp_full_eng_name) {
        return notification.error({
            message: 'Name is required',
            description: 'Please fill employee name.',
        });
    }
    if (!basicInfo.hr_organization_id) {
        return notification.error({
            message: 'Organization is required',
            description: 'Please select organization.',
        });
    }
    if (!basicInfo.hr_department_id) {
        return notification.error({
            message: 'Department is required',
            description: 'Please select department.',
        });
    }
    if (!basicInfo.hr_designation_id) {
        return notification.error({
            message: 'Designation is required',
            description: 'Please select designation.',
        });
    }
    if (!basicInfo.national_id) {
        return notification.error({
            message: 'National ID is required',
            description: 'Please input national id no.',
        });
    }
    if (!basicInfo.date_of_birth) {
        return notification.error({
            message: 'Date of birth is required',
            description: 'Please set date of birth.',
        });
    }
    if (!basicInfo.personal_mobile) {
        return notification.error({
            message: 'Phone number is required',
            description: 'Please input phone number.',
        });
    }
    try {
        const addEmp = await employeeApi.empBasicInfoApi.addEmployeeBasicInfo(basicInfo);
        if (addEmp.status) {
            return notification.success({ message: addEmp.message, description: 'Employee basic info submitted successfully!' });
        } else {
            return notification.error({ message: 'Submission Failed', description: addEmp.message || 'Something went wrong, please try again!' });
        }
    } catch (error) {
        return notification.error({ message: 'Unexpected Error', description: 'Something went wrong, please try again!' });
    }

};


onMounted(async () => {
    await getOrganizations();
    await getDepartments();
    await getDesignations();
    await getBloodGroups();
    await getReligions();
    await getMaritalStatus();
    await getGenders();
    await getEmploymentTypes();
});

async function getOrganizations() {
    try {
        const response = await OrganizationApi.fetchAllOrganizations();
        if (response.data) {
            organizationOptions.value = [
                { value: '', label: 'Select Organization', disabled: true },
                ...response.data.map((org: any) => ({
                    value: org.org_id,
                    label: org.organization_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching organizations', error);
    } finally {
        isLoadingOrganization.value = false;
    }
}

async function getDepartments() {
    try {
        const response = await fetchAllDepartments();
        if (response.data) {
            departmentOptions.value = [
                { value: '', label: 'Select Department', disabled: true },
                ...response.data.map((dept: any) => ({
                    value: dept.dept_id,
                    label: dept.department_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching departments', error);
    } finally {
        isLoadingDepartment.value = false;
    }
}

async function getDesignations() {
    try {
        const response = await fetchAllDesignations();
        if (response.data) {
            designationOptions.value = [
                { value: '', label: 'Select Designation', disabled: true },
                ...response.data.map((desig: any) => ({
                    value: desig.desig_id,
                    label: desig.designation_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching designations', error);
    } finally {
        isLoadingDesignation.value = false;
    }
}

async function getBloodGroups() {
    try {
        const response = await lookupApi.lookupData.getBloodGroups();
        if (response.status == true) {
            bloodGroups.value = [
                { value: '', label: 'Select Bolld Group', disabled: true },
                ...response.data.map((bg: any) => ({
                    value: bg.id,
                    label: bg.lookup_data_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching blood groups', error);
    } finally {
        isLoadingBloodGroup.value = false;
    }
}

async function getReligions() {
    try {
        const response = await lookupApi.lookupData.getReligions();
        if (response.status == true) {
            religions.value = [
                { value: '', label: 'Select Religion', disabled: true },
                ...response.data.map((rg: any) => ({
                    value: rg.id,
                    label: rg.lookup_data_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching religions', error);
    } finally {
        isLoadingReligion.value = false;
    }
}

async function getMaritalStatus() {
    try {
        const response = await lookupApi.lookupData.getMaritalStatus();
        if (response.status == true) {
            maritalStatus.value = [
                { value: '', label: 'Select Marital Status', disabled: true },
                ...response.data.map((item: any) => ({
                    value: item.id,
                    label: item.lookup_data_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching marital status', error);
    } finally {
        isLoadingMaritailStatus.value = false;
    }
}

async function getGenders() {
    try {
        const response = await lookupApi.lookupData.getGenders();
        if (response.status == true) {
            genders.value = [
                { value: '', label: 'Select Gender', disabled: true },
                ...response.data.map((item: any) => ({
                    value: item.id,
                    label: item.lookup_data_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching genders', error);
    } finally {
        isLoadingGender.value = false;
    }
}

async function getEmploymentTypes() {
    try {
        const response = await lookupApi.lookupData.getEmploymentTypes();
        if (response.status == true) {
            employmentTypes.value = [
                { value: '', label: 'Select Employment Type', disabled: true },
                ...response.data.map((item: any) => ({
                    value: item.id,
                    label: item.lookup_data_name
                }))
            ];
        }
    } catch (error) {
        console.error('Error fetching employement type', error);
    } finally {
        isLoadingEmploymentType.value = false;
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
