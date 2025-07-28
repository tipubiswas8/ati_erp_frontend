<template>
    <!-- Form Sections -->
    <form class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Basic Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Shift Information</h2>

            <div class="p-6 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Block 1 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Organization Name</label>
                            <input type="text" v-model="formData.shiftInfo.organization_name" readonly :disabled="isLoadingOrganization"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Shift Name</label>
                            <input type="text" v-model="formData.shiftInfo.shift_name" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Start Time </label>
                            <input type="text" v-model="formData.shiftInfo.start_time" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />

                            <label class="w-40 text-sm font-medium text-gray-700 text-right">End Time </label>
                            <input type="text" v-model="formData.shiftInfo.end_time" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>

                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Shift Hours</label>
                            <input type="text" v-model="formData.shiftInfo.shift_hours" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">User Define Serial Number </label>
                            <input type="text" v-model="formData.shiftInfo.user_define_shift_number" readonly
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Default Flag</label>
                            <input type="text"  :value="formData.shiftInfo.default_shift_flag == true ? 'Active' : 'Inactive'" readonly
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
import { useRoute } from 'vue-router';
import { Dayjs } from 'dayjs';
import { fetchShiftById } from '@/api/setupApi';
import { commonAxiosRequest } from '@/api/commonApi';

const emit = defineEmits(['shift-created']);

const formData = ref({
    shiftInfo: {
        id: '' as string | null,
        hr_organization_id: '',
        organization_name: '',
        shift_name: '',
        start_time: null as Dayjs | null,
        end_time: null as Dayjs | null,
        shift_hours: '',
        user_define_shift_number: '',
        default_shift_flag: false
    }
});

const route = useRoute();
const shiftId = route?.params['shift_id'];
const isLoadingOrganization = ref<boolean>(true);

onMounted(async () => {
    const shift = await fetchShiftById(shiftId);
    formData.value.shiftInfo = shift.data;

    const orgId = formData.value.shiftInfo.hr_organization_id;
    if (orgId) {
        const orgInfo = await commonAxiosRequest.fetchDataById('hr/organizations', orgId);
        formData.value.shiftInfo.organization_name = orgInfo.data?.organization_name;
        isLoadingOrganization.value = false;
    }
});

</script>
