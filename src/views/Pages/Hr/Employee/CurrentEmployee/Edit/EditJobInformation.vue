<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Job Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Update Employee Job Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Join Date</label>
                            <div class="flex-1 w-full">
                                <a-date-picker v-model:value="formData.jobInfo.joining_date" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Official Mobile</label>
                            <input type="number" v-model="formData.jobInfo.official_mobile_no"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Employee Shift</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.jobInfo.emp_shift_id" show-search
                                    placeholder="Select Blood Group" :options="shifts" :loading="isLoadingShifts"
                                    option-filter-prop="label" class="w-full" />
                            </div>
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Reporting Person</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.jobInfo.reporting_person" show-search
                                    placeholder="Select Blood Group" :options="employees" :loading="isLoadingEmployees"
                                    option-filter-prop="label" class="w-full" />
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Employee Show Status</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.jobInfo.emp_show_status"
                                    placeholder="Select Blood Group" :options="employeeStatuses"
                                    option-filter-prop="label" class="w-full" />
                            </div>
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
                        Update Employee Job Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchAllShifts } from '@/api/setupApi';
import { commonAxiosRequest } from '@/api/commonApi';
import { notification } from 'ant-design-vue';
import { useEmployeeStore } from '@/stores/hr/employee';
import dayjs, { Dayjs } from 'dayjs';

interface JobInfo {
    joining_date: Dayjs | null;
    official_mobile_no: string;
    emp_shift_id: string | number;
    reporting_person: string | number;
    emp_show_status: number;
}

interface FormData {
    jobInfo: JobInfo;
}

const formData = ref<FormData>({
    jobInfo: {
        joining_date: null,
        official_mobile_no: '',
        emp_shift_id: '',
        reporting_person: '',
        emp_show_status: 1
    }
});

const employee = useEmployeeStore().currentEmployee;
const isSubmitting = ref(false);

const isSubmitButtonDisable = computed(() => {
    const jobInfo = formData.value.jobInfo;
    return (
        isSubmitting.value ||                // disabled during submission
        !jobInfo.emp_shift_id ||             // required field
        !jobInfo.reporting_person            // required field
    );
});

const handleSubmit = async () => {
    isSubmitting.value = true;
    if (!formData.value.jobInfo.emp_shift_id) {
        notification['warn']({
            message: 'The shift field is required',
            description: 'Please select a shift'
        });
        return false;
    }

    if (!formData.value.jobInfo.reporting_person) {
        notification['warn']({
            message: 'The reporting person field is required',
            description: 'Please select a reporting person'
        });
        return false;
    }
    try {
        const updated = await commonAxiosRequest.updateMethod('hr/employee-job-info', employee?.emp_id, formData.value.jobInfo);
        if (updated.status && updated.status_code == 204) {
            notification.success({
                message: updated.message
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        isSubmitting.value = false;
    }
};

const isLoadingShifts = ref<boolean>(true);
const isLoadingEmployees = ref<boolean>(true);

interface Shift {
    id: string | number;
    shift_name: string;
}

const shifts = ref<Shift[]>([]);

interface Employee {
    emp_id: number | string,
    emp_full_eng_name: string,
    organization_name: string,
    department_name: string,
    designation_name: string
}

const employees = ref<Employee[]>([]);

const employeeStatuses = [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
];

onMounted(async () => {
    await empJobInfo(employee?.emp_id);
    await allShifts();
    await allEmployees('hr/employees');

});

const empJobInfo = async (id: string) => {
    try {
        const eJobInfo = await commonAxiosRequest.fetchDataById('hr/employee-job-info', id);
        if (eJobInfo.status && eJobInfo.status_code == 200) {
            const showingFlag = eJobInfo.data?.emp_show_flag ? 1 : 0;

            formData.value.jobInfo.joining_date = eJobInfo.data?.emp_start_date
                ? dayjs(eJobInfo.data.emp_start_date)
                : null;

            formData.value.jobInfo.official_mobile_no = eJobInfo.data?.office_mobile;
            formData.value.jobInfo.emp_shift_id = eJobInfo.data?.work_shift_id;
            formData.value.jobInfo.reporting_person = eJobInfo.data?.reporting_person_id;
            formData.value.jobInfo.emp_show_status = showingFlag;
        }
    } catch (error) {
        console.log(error);
    }
}

const allShifts = async () => {
    try {
        const getedShifts = await fetchAllShifts();
        if (getedShifts.data) {
            // Create the default option first
            const defaultOption = {
                value: '',
                label: "Please Select a Shift",
                disabled: true
            };
            // Map the shifts data to select options
            const shiftOptions = getedShifts.data.map((shift: Shift) => ({
                value: shift.id,
                label: shift.shift_name
            }));

            // Combine default option with shift options
            shifts.value = [defaultOption, ...shiftOptions];
        }
        isLoadingShifts.value = false;
    } catch (error) {
        console.log(error);
        isLoadingShifts.value = false;
    }
}

const allEmployees = async (url: string) => {
    try {
        const getedEmps = await commonAxiosRequest.fetchAllData(url);
        if (getedEmps.status && getedEmps.status_code == 200) {

            const defaultOption = {
                value: '',
                label: 'Please Select Employee',
                disabled: true
            }

            const employeeOptions = getedEmps.data.map((emp: Employee) => ({
                value: emp.emp_id,
                label: `${emp.organization_name} :: ${emp.department_name}  :: ${emp.designation_name} :: ${emp.emp_full_eng_name}`
            }));

            employees.value = [defaultOption, ...employeeOptions]
        }
        isLoadingEmployees.value = false;
    }
    catch (error) {
        console.log(error);
        isLoadingEmployees.value = false;
    }
}
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

:deep(.ant-picker) {
    width: 100%;
    height: 35px;
    /* or 40px for h-10 */
    border-color: rgb(209 213 219);
}

:deep(.ant-picker-input input) {
    padding-top: 7px;
    /* Adjust to perfectly center */
    padding-bottom: 7px;
    height: 100%;
}

/* Select component styling */
:deep(.ant-select) {
    width: 100%;
}

:deep(.ant-select-selector) {
    height: 35px !important;
    border-color: rgb(209 213 219) !important;
    align-items: center !important;
}

.required:after {
    content: ' ★';
    color: red;
    margin-left: 0.25rem
}
</style>
