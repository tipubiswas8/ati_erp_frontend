<template>
    <!-- Form Sections -->
    <form class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Job Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                View Employee Job Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Join Date</label>
                            <input type="text" v-model="formData.jobInfo.joining_date" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Official Mobile</label>
                            <input type="text" v-model="formData.jobInfo.official_mobile_no" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Employee Shift</label>
                            <input type="text" v-model="formData.jobInfo.emp_shift_name" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Reporting Person</label>
                            <input type="text" v-model="formData.jobInfo.reporting_person" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Employee Show Status</label>
                            <input type="text" :value="formData.jobInfo.emp_show_status === 1 ? 'Yes' : 'No'" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { commonAxiosRequest } from '@/api/commonApi';
import { useEmployeeStore } from '@/stores/hr/employee';

const employee = useEmployeeStore().currentEmployee;

const formData = ref({
    jobInfo: {
        joining_date: '',
        official_mobile_no: '',
        emp_shift_name: '',
        reporting_person: '',
        emp_show_status: 1
    }
});

onMounted(async () => {
    await empJobInfo(employee?.emp_id);
});

const empJobInfo = async (id: string) => {
    try {
        const eJobInfo = await commonAxiosRequest.fetchDataById('hr/employee-job-info', id);
        if (eJobInfo.status && eJobInfo.status_code == 200) {
            formData.value.jobInfo.joining_date = eJobInfo.data?.emp_start_date;
            formData.value.jobInfo.official_mobile_no = eJobInfo.data?.office_mobile;
            formData.value.jobInfo.emp_shift_name = eJobInfo.data?.shift_name;
            formData.value.jobInfo.reporting_person = eJobInfo.data?.reporting_person_name + ' (' + eJobInfo.data?.reporting_person_department + '-' + eJobInfo.data?.reporting_person_designation + ')';
            formData.value.jobInfo.emp_show_status = eJobInfo.data?.emp_show_flag;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
