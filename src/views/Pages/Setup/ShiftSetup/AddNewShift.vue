<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
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
                            <label class="w-40 text-sm font-medium text-gray-700 required">Organization Name</label>
                            <div class="flex-1 w-full">
                                <a-select v-model:value="formData.shiftInfo.hr_organization_id" show-search
                                    placeholder="Select Blood Group" :options="organizations.list"
                                    :loading="isLoadingOrganization" option-filter-prop="label" class="w-full" />
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700 required">Shift Name</label>
                            <input type="text" v-model="formData.shiftInfo.shift_name"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Start Time </label>
                            <a-time-picker v-model:value="formData.shiftInfo.start_time" format="hh:mm A" class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500
                            focus:outline-none transition duration-200" />

                            <label class="w-40 text-sm font-medium text-gray-700 text-right">End Time </label>
                            <a-time-picker v-model:value="formData.shiftInfo.end_time" format="hh:mm A" class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500
                            focus:outline-none transition duration-200" />
                        </div>
                    </div>

                    <!-- Block 2 -->
                    <div class="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200">
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Shift Hours</label>
                            <input type="number" step="0.01" v-model="formData.shiftInfo.shift_hours"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">User Define Serial Number </label>
                            <input type="number" v-model="formData.shiftInfo.user_define_shift_number"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <label class="w-40 text-sm font-medium text-gray-700">Default Flag</label>
                            <select v-model="formData.shiftInfo.default_shift_flag"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                                <option :value="false">No</option>
                                <option :value="true">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-6">
                    <button type="submit"
                        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                        Submit Shift Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { fetchAllOrganizations } from '@/api/organizationApi';
import { addShift } from '@/api/setupApi';
import { notification } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import dayjs from 'dayjs';

const router = useRouter();
const toast = useToast();
const emit = defineEmits(['shift-created']);

const formData = ref({
    shiftInfo: {
        hr_organization_id: '',
        shift_name: '',
        start_time: '',
        end_time: '',
        shift_hours: '',
        user_define_shift_number: '',
        default_shift_flag: false
    }
});


const isLoadingOrganization = ref<boolean>(true);

const organizations = reactive({
    list: [] as { label: string; value: any }[],
});

onMounted(() => {
    allActiveOrganizations();
});

const allActiveOrganizations = async () => {
    try {
        const orgs = await fetchAllOrganizations();
        if (orgs.data) {
            organizations.list = [
                { label: "Please select an organization", value: "", disabled: true },
                ...orgs.data.map((org: any) => ({
                    label: org.organization_name,
                    value: org.org_id
                }))
            ];
        } else {
            console.log(orgs.error);
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoadingOrganization.value = false;
    }
}

const handleSubmit = async () => {

    if (!formData.value.shiftInfo.hr_organization_id) {
        notification['warning']({
            message: 'Organization is required',
            description:
                'Please select an organization',
        });
        return false;
    }
    if (!formData.value.shiftInfo.shift_name) {
        notification['warning']({
            message: 'Shift name is required',
            description:
                'Please input the shift name',
        });
        return false;
    }

    try {
        const payload = {
            ...formData.value.shiftInfo,
            // start_time: dayjs(formData.value.shiftInfo.start_time).format('HH:mm'), // for 24h format
            start_time: dayjs(formData.value.shiftInfo.start_time).format('hh:mm A'), // for 12h AM/PM format
            // end_time: dayjs(formData.value.shiftInfo.end_time).format('HH:mm'),
        };

        const add = await addShift(payload)
        console.log(add);
        if (add.success == true) {
            toast.success(add.message);
            router.push('/setup/shift-setup');
            emit('shift-created', add.data);
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

/* Select component styling */
:deep(.ant-select) {
    width: 100%;
}

:deep(.ant-select-selector) {
    height: 40px !important;
    border-color: rgb(209 213 219) !important;
    align-items: center !important;
}

.required::after {
    content: ' ★';
    color: red;
    margin-left: 0.25rem;
}
</style>
