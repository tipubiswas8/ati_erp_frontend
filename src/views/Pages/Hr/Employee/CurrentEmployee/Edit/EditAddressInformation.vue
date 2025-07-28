<template>
    <!-- Form Sections -->
    <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Step Container - Consistent height for all steps -->
        <!-- Step 1: Address Information -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-100 pb-3 text-center">
                Update Employee Address Information</h2>

            <div class="border p-4 rounded shadow bg-white">
                <h3 class="font-semibold text-lg mb-4 text-center">Address Input Type</h3>
                <div class="flex justify-center gap-8">
                    <label class="inline-flex items-center gap-2">
                        <input type="radio" value="select" v-model="addressType" v-on:change="clearTextAddress" />
                        <span>Select Address</span>
                    </label>
                    <label class="inline-flex items-center gap-2">
                        <input type="radio" value="text" v-model="addressType" v-on:change="clearTextAddress" />
                        <span>Text Address</span>
                    </label>
                </div>
            </div>

            <div v-show="addressType === 'select'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Present Address Header -->
                <div class="border p-4 rounded shadow bg-white">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="font-semibold text-lg">Present Address</h3>
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="sameAsPermanent" class="mr-2" />
                            <span class="text-sm">Same as Permanent Address</span>
                        </label>
                    </div>
                </div>

                <!-- Permanent Address Header -->
                <div class="border p-4 rounded shadow bg-white">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="font-semibold text-lg">Permanent Address</h3>
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="sameAsPresent" class="mr-2" />
                            <span class="text-sm">Same as Present Address</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- For Select Address Fields -->
            <div class="p-2 bg-gray-50 rounded-xl shadow-lg mx-auto">
                <div v-if="addressType === 'select'">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Block 1 Present Address -->
                        <div
                            :class="['border p-4 rounded shadow space-y-4', sameAsPermanent ? 'bg-gray-100 opacity-70 pointer-events-none' : 'bg-white']">
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Division</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.present.division_id"
                                        :key="formData.present.division_id" show-search placeholder="Select Division"
                                        :options="divisions" :loading="isLoadingDivisions"
                                        v-on:change="(val) => getDistrictsByDivision(val, 'present_address')"
                                        option-filter-prop="label" class="w-full" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">District</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.present.district_id"
                                        :key="formData.present.district_id" show-search
                                        v-on:change="(val) => getThanaByDistrict(val, 'present_address')"
                                        placeholder="Select District" :options="districts" :loading="isLoadingDistricts"
                                        option-filter-prop="label" class="w-full" :disabled="isDistrictDisabled" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Upazila/Thana/Police
                                    Station</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.present.thana_id" :key="formData.present.thana_id"
                                        show-search v-on:change="(val) => getUnionByThana(val, 'present_address')"
                                        placeholder="Select Upazila/Thana" :options="thanas" :loading="isLoadingThanas"
                                        option-filter-prop="label" class="w-full" :disabled="isThanaDisabled" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700">Union/Ward No.</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.present.union_id" :key="formData.present.union_id"
                                        show-search v-on:change="(val) => getPostOfficeByUnion(val, 'present_address')"
                                        placeholder="Select Union/Ward" :options="unions" :loading="isLoadingUnions"
                                        option-filter-prop="label" class="w-full" :disabled="isUnionDisabled" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700">Post Office</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.present.post_office_id"
                                        :key="formData.present.post_office_id" show-search
                                        placeholder="Select Post Office" :options="postOffices"
                                        :loading="isLoadingPostOffices" option-filter-prop="label" class="w-full"
                                        :disabled="isPostOfficeDisabled" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Village/Road
                                    No./House/Holding
                                    No./Flat/Building Name:</label>
                                <textarea v-model="formData.present.present_address_text" v-on:input="syncTextAddress"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"></textarea>
                            </div>
                        </div>
                        <!-- Block 2 Permanent Address -->
                        <div
                            :class="['border p-4 rounded shadow space-y-4', sameAsPresent ? 'bg-gray-100 opacity-70 pointer-events-none' : 'bg-white']">
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Division</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.permanent.division_id"
                                        :key="formData.permanent.division_id" show-search
                                        v-on:change="(val) => getDistrictsByDivision(val, 'permanent_address')"
                                        placeholder="Select Division" :options="divisions2"
                                        :loading="isLoadingDivisions2" option-filter-prop="label" class="w-full" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">District</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.permanent.district_id"
                                        :key="formData.permanent.district_id" show-search
                                        v-on:change="(val) => getThanaByDistrict(val, 'permanent_address')"
                                        placeholder="Select District" :options="districts2"
                                        :loading="isLoadingDistricts2" option-filter-prop="label" class="w-full"
                                        :disabled="isDistrictDisabled2" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Upazila/Thana/Police
                                    Station</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.permanent.thana_id"
                                        :key="formData.permanent.thana_id" show-search
                                        v-on:change="(val) => getUnionByThana(val, 'permanent_address')"
                                        placeholder="Select Upazila/Thana" :options="thanas2"
                                        :loading="isLoadingThanas2" option-filter-prop="label" class="w-full"
                                        :disabled="isThanaDisabled2" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700">Union/Ward No.</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.permanent.union_id"
                                        :key="formData.permanent.union_id" show-search
                                        v-on:change="(val) => getPostOfficeByUnion(val, 'permanent_address')"
                                        placeholder="Select Union/Word" :options="unions2" :loading="isLoadingUnions2"
                                        option-filter-prop="label" class="w-full" :disabled="isUnionDisabled2" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700">Post Office</label>
                                <div class="flex-1 w-full">
                                    <a-select v-model:value="formData.permanent.post_office_id"
                                        :key="formData.permanent.post_office_id" show-search
                                        placeholder="Select Post Office" :options="postOffices2"
                                        :loading="isLoadingPostOffices2" option-filter-prop="label" class="w-full"
                                        :disabled="isPostOfficeDisabled2" />
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <label class="w-44 text-sm font-medium text-gray-700 required">Village/Road
                                    No./House/Holding
                                    No./Flat/Building Name:</label>
                                <textarea v-model="formData.permanent.permanent_address_text"
                                    v-on:input="syncTextAddress"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- For Text Address Field -->

                </div>
                <div v-else>


                    <div v-show="addressType === 'text'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Present Address Header -->
                        <div class="border p-4 rounded shadow bg-white">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-lg">Present Address</h3>
                                <label class="inline-flex items-center">
                                    <input type="checkbox" v-model="sameAsPermanent2" class="mr-2" />
                                    <span class="text-sm">Same as Permanent Address</span>
                                </label>
                            </div>
                        </div>

                        <!-- Permanent Address Header -->
                        <div class="border p-4 rounded shadow bg-white">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-lg">Permanent Address</h3>
                                <label class="inline-flex items-center">
                                    <input type="checkbox" v-model="sameAsPresent2" class="mr-2" />
                                    <span class="text-sm">Same as Present Address</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div
                        :class="['border p-4 rounded shadow space-y-4', sameAsPermanent2 ? 'bg-gray-100 opacity-70 pointer-events-none' : 'bg-white']">
                        <div class="flex items-center gap-4">
                            <label class="w-44 text-sm font-medium text-gray-700 required">Full Present Address
                                (Text)</label>
                            <textarea v-model="formData.present.present_address_text" @input="syncTextAddress2"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"></textarea>
                        </div>
                    </div>

                    <div
                        :class="['border p-4 rounded shadow space-y-4', sameAsPresent2 ? 'bg-gray-100 opacity-70 pointer-events-none' : 'bg-white']">
                        <div class="flex items-center gap-4">
                            <label class="w-44 text-sm font-medium text-gray-700 required">Full Permanent Address
                                (Text)</label>
                            <textarea v-model="formData.permanent.permanent_address_text" @input="syncTextAddress2"
                                class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"></textarea>
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
                        Update Address Info
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { commonAxiosRequest } from '@/api/commonApi';
import { getDistrictsByDivisionId, getPostOfficesByUnionId, getThanasByDistrictId, getUnionsByThanaId } from '@/api/setupApi';
import { useEmployeeStore } from '@/stores/hr/employee';
import { notification } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';

const empId = useEmployeeStore().currentEmployee?.emp_id;


onMounted(async () => {
    await getDivisions();
    await getEmpAddressByEmpId();
});


async function getEmpAddressByEmpId() {
    const address = await commonAxiosRequest.fetchDataById('hr/employee-addresses-get-by-emp-id', empId);
    try {
        if (address.status && address.status_code == 200) {
            formData.value.present.division_id = address.data?.present.division_id;
            formData.value.present.district_id = address.data?.present.district_id;
            formData.value.present.thana_id = address.data?.present.thana_id;
            formData.value.present.union_id = address.data?.present.union_id;
            formData.value.present.post_office_id = address.data?.present.post_office_id;
            formData.value.present.present_address_text = address.data?.present.present_address_text;

            formData.value.permanent.division_id = address.data?.permanent.division_id;
            formData.value.permanent.district_id = address.data?.permanent.district_id;
            formData.value.permanent.thana_id = address.data?.permanent.thana_id;
            formData.value.permanent.union_id = address.data?.permanent.union_id;
            formData.value.permanent.post_office_id = address.data?.permanent.post_office_id;
            formData.value.permanent.permanent_address_text = address.data?.permanent.permanent_address_text;


            if (address.status && address.status_code === 200 && address.data?.address_type === 'PS') {
                
            }


            const empPresentDistrict = await commonAxiosRequest.fetchDataById(
                'su/district-by-division-id',
                address.data?.present.division_id 
            );

            if (empPresentDistrict.status && empPresentDistrict.status_code === 200) {
                districts.value = empPresentDistrict.data.map((dist: District) => ({
                    value: dist.id,
                    label: dist.district_name
                }));
            }
            const empPresentThana = await commonAxiosRequest.fetchDataById(
                'su/thana-by-district-id',
                address.data?.present.district_id 
            );

            if (empPresentThana.status && empPresentThana.status_code === 200) {
                thanas.value = empPresentThana.data.map((tha: Thana) => ({
                    value: tha.id,
                    label: tha.thana_name
                }));
            }
            const empPresentUnion = await commonAxiosRequest.fetchDataById(
                'su/uinon-by-thana-id',
                address.data?.present.thana_id 
            );

            if (empPresentUnion.status && empPresentUnion.status_code === 200) {
                unions.value = empPresentUnion.data.map((uni: Union) => ({
                    value: uni.id,
                    label: uni.union_name
                }));
            }
            const empPresentPostOffice = await commonAxiosRequest.fetchDataById(
                'su/post-office-by-union-id',
                address.data?.present.union_id 
            );

            if (empPresentPostOffice.status && empPresentPostOffice.status_code === 200) {
                postOffices.value = empPresentPostOffice.data.map((po: PostOffice) => ({
                    value: po.id,
                    label: po.post_office_name
                }));
            }

            // permanent
            const empPermanentDistrict = await commonAxiosRequest.fetchDataById(
                'su/district-by-division-id',
                address.data?.permanent.division_id 
            );

            if (empPermanentDistrict.status && empPermanentDistrict.status_code === 200) {
                districts2.value = empPermanentDistrict.data.map((dist: District) => ({
                    value: dist.id,
                    label: dist.district_name
                }));
            }
            const empPermanentThana = await commonAxiosRequest.fetchDataById(
                'su/thana-by-district-id',
                address.data?.permanent.district_id 
            );

            if (empPermanentThana.status && empPermanentThana.status_code === 200) {
                thanas2.value = empPermanentThana.data.map((tha: Thana) => ({
                    value: tha.id,
                    label: tha.thana_name
                }));
            }
            const empPermanentUnion = await commonAxiosRequest.fetchDataById(
                'su/uinon-by-thana-id',
                address.data?.permanent.thana_id 
            );

            if (empPermanentUnion.status && empPermanentUnion.status_code === 200) {
                unions2.value = empPermanentUnion.data.map((uni: Union) => ({
                    value: uni.id,
                    label: uni.union_name
                }));
            }
            const empPermanentPostOffice = await commonAxiosRequest.fetchDataById(
                'su/post-office-by-union-id',
                address.data?.permanent.union_id 
            );

            if (empPermanentPostOffice.status && empPermanentPostOffice.status_code === 200) {
                postOffices2.value = empPermanentPostOffice.data.map((po: PostOffice) => ({
                    value: po.id,
                    label: po.post_office_name
                }));
            }


        }
    } catch (error) {
        console.log(error);
    }
}

const handleSubmit = async () => {
    const present = formData.value.present;
    const permanent = formData.value.permanent

    if (addressType.value === 'select' && (present.division_id === '' || permanent.division_id === '')) {
        notification.warn({
            message: 'Division is required',
            description: 'Please select division'
        });
        return false;
    }

    if (addressType.value === 'select' && (present.district_id === '' || permanent.district_id === '')) {
        notification.warn({
            message: 'District is required',
            description: 'Please select district'
        });
        return false;
    }

    if (addressType.value === 'select' && (present.thana_id === '' || permanent.thana_id === '')) {
        notification.warn({
            message: 'Thana is required',
            description: 'Please select thana'
        });
        return false;
    }

    if (present.present_address_text === '' || permanent.permanent_address_text === '') {
        notification.warn({
            message: 'The text field is required',
            description: 'Please input text field'
        });
        return false;
    }

    interface UpdateResponse {
        status: boolean;
        status_code: number | string;
        message: string;
        data: object
    }

    let selectedAddress: object = {};
    let textAddress: object = {};

    const isSameAs = sameAsPresent.value || sameAsPermanent.value;
    const isSameAs2 = sameAsPresent2.value || sameAsPermanent2.value;

    try {
        let response: UpdateResponse;

        if (addressType.value === 'select') {
            selectedAddress = { ...formData.value, 'employee_id': empId, 'same_as': isSameAs };
            response = await commonAxiosRequest.updateMethod('hr/employee-addresses-update-by-emp-id', empId, selectedAddress);
        } else {
            textAddress = {
                present_address: formData.value.present.present_address_text,
                permanent_address: formData.value.permanent.permanent_address_text,
                'same_as': isSameAs2
            };
            response = await commonAxiosRequest.updateMethod('hr/employee-address-info', empId, textAddress);
        }

        if (response.status && (response.status_code === 200 || response.status_code === 204)) {
            notification.success({
                message: response.message,
            });

        } else {
            notification.error({
                message: response.message,
            });
        }
    } catch (error: any) {
        console.error(error);
        notification.error({
            message: error?.message || 'Error',
            description: 'Something went wrong, please try again.',
        });
    }

};

const formData = ref({
    present: {
        division_id: '',
        district_id: '',
        thana_id: '',
        union_id: '',
        post_office_id: '',
        present_address_text: ''
    },
    permanent: {
        division_id: '',
        district_id: '',
        thana_id: '',
        union_id: '',
        post_office_id: '',
        permanent_address_text: ''
    }
});

const addressType = ref<'select' | 'text'>('select');

const sameAsPermanent = ref(false);
const sameAsPresent = ref(false);

const sameAsPermanent2 = ref(false);
const sameAsPresent2 = ref(false);

// Sync present from permanent when sameAsPermanent is checked (text)
watch(sameAsPermanent2, async (newVal) => {
    if (newVal) {
        sameAsPresent2.value = false; // disable reverse
        formData.value.present.present_address_text = formData.value.permanent.permanent_address_text;
    } else {
        formData.value.present.present_address_text = '';
        if (sameAsPresent2.value === true) {
            formData.value.permanent.permanent_address_text = '';
        }
    }
});

// Sync permanent from present when sameAsPresent is checked (text)
watch(sameAsPresent2, async (newVal) => {
    if (newVal) {
        sameAsPermanent2.value = false; // disable reverse
        formData.value.permanent.permanent_address_text = formData.value.present.present_address_text;
    } else {
        formData.value.permanent.permanent_address_text = '';
        if (sameAsPermanent2.value === true) {
            formData.value.present.present_address_text = '';
        }
    }
});

// Sync present from permanent when sameAsPermanent is checked
watch(sameAsPermanent, async (newVal) => {
    if (newVal) {
        sameAsPresent.value = false; // disable reverse
        divisions.value = divisions2.value;
        districts.value = districts2.value;
        thanas.value = thanas2.value;
        unions.value = unions2.value;
        postOffices.value = postOffices2.value;
        formData.value.present.division_id = formData.value.permanent.division_id;
        formData.value.present.district_id = formData.value.permanent.district_id;
        formData.value.present.thana_id = formData.value.permanent.thana_id;
        formData.value.present.union_id = formData.value.permanent.union_id;
        formData.value.present.post_office_id = formData.value.permanent.post_office_id;
        formData.value.present.present_address_text = formData.value.permanent.permanent_address_text;
    } else {
        divisions.value = divisions.value;
        districts.value = [];
        thanas.value = [];
        unions.value = [];
        postOffices.value = [];
        formData.value.present.division_id = '';
        formData.value.present.district_id = '';
        formData.value.present.thana_id = '';
        formData.value.present.union_id = '';
        formData.value.present.post_office_id = '';
        formData.value.present.present_address_text = '';

        if (sameAsPresent.value === true) {
            formData.value.permanent.division_id = '';
            formData.value.permanent.district_id = '';
            formData.value.permanent.thana_id = '';
            formData.value.permanent.union_id = '';
            formData.value.permanent.post_office_id = '';
            formData.value.permanent.permanent_address_text = '';
        }
    }
});

// Sync permanent from present when sameAsPresent is checked
watch(sameAsPresent, async (newVal) => {
    if (newVal) {
        sameAsPermanent.value = false; // disable reverse
        divisions2.value = divisions.value;
        districts2.value = districts.value;
        thanas2.value = thanas.value;
        unions2.value = unions.value;
        postOffices2.value = postOffices.value;
        formData.value.permanent.division_id = formData.value.present.division_id;
        formData.value.permanent.district_id = formData.value.present.district_id;
        formData.value.permanent.thana_id = formData.value.present.thana_id;
        formData.value.permanent.union_id = formData.value.present.union_id;
        formData.value.permanent.post_office_id = formData.value.present.post_office_id;
        formData.value.permanent.permanent_address_text = formData.value.present.present_address_text;
    } else {
        divisions2.value = divisions2.value;
        districts2.value = [];
        thanas2.value = [];
        unions2.value = [];
        postOffices2.value = [];
        formData.value.permanent.division_id = '';
        formData.value.permanent.district_id = '';
        formData.value.permanent.thana_id = '';
        formData.value.permanent.union_id = '';
        formData.value.permanent.post_office_id = '';
        formData.value.permanent.permanent_address_text = '';

        if (sameAsPermanent.value === true) {
            formData.value.present.division_id = '';
            formData.value.present.district_id = '';
            formData.value.present.thana_id = '';
            formData.value.present.union_id = '';
            formData.value.present.post_office_id = '';
            formData.value.present.present_address_text = '';
        }
    }
});

function syncTextAddress() {
    if (sameAsPermanent.value === true) {
        formData.value.present.present_address_text = formData.value.permanent.permanent_address_text;
    }

    if (sameAsPresent.value === true) {
        formData.value.permanent.permanent_address_text = formData.value.present.present_address_text;
    }
}

function syncTextAddress2() {
    if (sameAsPermanent2.value === true) {
        formData.value.present.present_address_text = formData.value.permanent.permanent_address_text;
    }

    if (sameAsPresent2.value === true) {
        formData.value.permanent.permanent_address_text = formData.value.present.present_address_text;
    }
}

function clearTextAddress() {
    formData.value.present.present_address_text = '';
    formData.value.permanent.permanent_address_text = '';
}

interface Division {
    id: number | string;
    division_name: string;
}

interface District {
    id: number | string;
    district_name: string;
}

interface Thana {
    id: number | string;
    thana_name: string;
}

interface Union {
    id: number | string;
    union_name: string;
}

interface PostOffice {
    id: number | string;
    post_office_name: string;
}

// for present address
const divisions = ref<Division[]>([]);
const isLoadingDivisions = ref<boolean>(true);

const districts = ref<District[]>([]);
const isLoadingDistricts = ref<boolean>(false);
const isDistrictDisabled = ref<boolean>(true);

const thanas = ref<Thana[]>([]);
const isLoadingThanas = ref<boolean>(false);
const isThanaDisabled = ref<boolean>(true);

const unions = ref<Union[]>([]);
const isLoadingUnions = ref<boolean>(false);
const isUnionDisabled = ref<boolean>(true);

const postOffices = ref<PostOffice[]>([]);
const isLoadingPostOffices = ref<boolean>(false);
const isPostOfficeDisabled = ref<boolean>(true);

// for permanent address
const divisions2 = ref<Division[]>([]);
const isLoadingDivisions2 = ref<boolean>(true);

const districts2 = ref<District[]>([]);
const isLoadingDistricts2 = ref<boolean>(false);
const isDistrictDisabled2 = ref<boolean>(true);

const thanas2 = ref<Thana[]>([]);
const isLoadingThanas2 = ref<boolean>(false);
const isThanaDisabled2 = ref<boolean>(true);

const unions2 = ref<Union[]>([]);
const isLoadingUnions2 = ref<boolean>(false);
const isUnionDisabled2 = ref<boolean>(true);

const postOffices2 = ref<PostOffice[]>([]);
const isLoadingPostOffices2 = ref<boolean>(false);
const isPostOfficeDisabled2 = ref<boolean>(true);

async function getPostOfficeByUnion(union_id: string, target: 'present_address' | 'permanent_address') {
    // 🔁 Reset selected values
    const loading = target === 'present_address' ? isLoadingPostOffices : isLoadingPostOffices2;
    // 🔁 Clear options
    const selectedField = target === 'present_address' ? formData.value.present : formData.value.permanent;
    // 🔁 Disable lower dropdowns
    const disabled = target === 'present_address' ? isPostOfficeDisabled : isPostOfficeDisabled2;
    const options = target === 'present_address' ? postOffices : postOffices2;

    loading.value = true;
    selectedField.post_office_id = '';
    options.value = [];
    disabled.value = true;

    const po = await getPostOfficesByUnionId(union_id);
    if (po && po.data) {
        const postOfficeOption = {
            value: '',
            label: "Please Select Post Office",
            disabled: true,
        }

        const postOfficeData = po.data.map(function (dist: PostOffice) {
            return {
                value: dist.id,
                label: dist.post_office_name
            }
        });

        options.value = [postOfficeOption, ...postOfficeData];
        disabled.value = false;
    }
    loading.value = false;

    // update permanent if same as present
    if (sameAsPresent.value === true) {
        formData.value.permanent.union_id = formData.value.present.union_id;
        formData.value.permanent.post_office_id = '';
        postOffices2.value = postOffices.value;
    }
    // update present if same as permanent
    if (sameAsPermanent.value === true) {
        formData.value.present.union_id = formData.value.permanent.union_id;
        formData.value.present.post_office_id = '';
        postOffices.value = postOffices2.value;
    }

}

async function getUnionByThana(thana_id: string, target: 'present_address' | 'permanent_address') {
    if (target == 'present_address') {
        isLoadingUnions.value = true;
        // 🔁 Reset selected values
        formData.value.present.union_id = '';
        formData.value.present.post_office_id = '';

        // 🔁 Clear options
        unions.value = [];
        postOffices.value = [];

        // 🔁 Disable lower dropdowns
        isUnionDisabled.value = true;
        isPostOfficeDisabled.value = true;

        const unoin = await getUnionsByThanaId(thana_id);
        if (unoin && unoin.data) {
            const unionOption = {
                value: '',
                label: "Please Select Union",
                disabled: true,
            }

            const unionData = unoin.data.map(function (unoin: Union) {
                return {
                    value: unoin.id,
                    label: unoin.union_name
                }
            });

            unions.value = [unionOption, ...unionData];
            isUnionDisabled.value = false;
        }
        isLoadingUnions.value = false;
        // update permanent if same as present
        if (sameAsPresent.value === true) {
            formData.value.permanent.thana_id = formData.value.present.thana_id;
            formData.value.permanent.union_id = '';
            unions2.value = unions.value;
        }
    } else {
        isLoadingUnions2.value = true;
        // 🔁 Reset selected values
        formData.value.permanent.union_id = '';
        formData.value.permanent.post_office_id = '';

        // 🔁 Clear options
        unions2.value = [];
        postOffices2.value = [];

        // 🔁 Disable lower dropdowns
        isUnionDisabled2.value = true;
        isPostOfficeDisabled2.value = true;

        const unoin = await getUnionsByThanaId(thana_id);
        if (unoin && unoin.data) {
            const unionOption = {
                value: '',
                label: "Please Select Union",
                disabled: true,
            }

            const unionData = unoin.data.map(function (unoin: Union) {
                return {
                    value: unoin.id,
                    label: unoin.union_name
                }
            });

            unions2.value = [unionOption, ...unionData];
            isUnionDisabled2.value = false;
        }
        isLoadingUnions2.value = false;
        // update present if same as permanent
        if (sameAsPermanent.value === true) {
            formData.value.present.thana_id = formData.value.permanent.thana_id;
            formData.value.present.union_id = '';
            unions.value = unions2.value;
        }
    }
}

async function getThanaByDistrict(district_id: string, target: 'present_address' | 'permanent_address') {
    if (target == 'present_address') {
        isLoadingThanas.value = true;
        // 🔁 Reset selected values
        formData.value.present.thana_id = '';
        formData.value.present.union_id = '';
        formData.value.present.post_office_id = '';

        // 🔁 Clear options
        thanas.value = [];
        unions.value = [];
        postOffices.value = [];

        // 🔁 Disable lower dropdowns
        isThanaDisabled.value = true;
        isUnionDisabled.value = true;
        isPostOfficeDisabled.value = true;

        const thana = await getThanasByDistrictId(district_id);
        if (thana && thana.data) {

            const thanaOption = {
                value: '',
                label: "Please Select Thana",
                disabled: true,
            }

            const thanaData = thana.data.map(function (thana: Thana) {
                return {
                    value: thana.id,
                    label: thana.thana_name
                }
            });

            thanas.value = [thanaOption, ...thanaData];
            isThanaDisabled.value = false;
        }
        isLoadingThanas.value = false;
        // update permanent if same as present
        if (sameAsPresent.value === true) {
            formData.value.permanent.district_id = formData.value.present.district_id;
            formData.value.permanent.thana_id = '';
            thanas2.value = thanas.value;
        }
    } else {
        isLoadingThanas2.value = true;
        // 🔁 Reset selected values
        formData.value.permanent.thana_id = '';
        formData.value.permanent.union_id = '';
        formData.value.permanent.post_office_id = '';

        // 🔁 Clear options
        thanas2.value = [];
        unions2.value = [];
        postOffices2.value = [];

        // 🔁 Disable lower dropdowns
        isThanaDisabled2.value = true;
        isUnionDisabled2.value = true;
        isPostOfficeDisabled2.value = true;

        const thana = await getThanasByDistrictId(district_id);
        if (thana && thana.data) {

            const thanaOption = {
                value: '',
                label: "Please Select Thana",
                disabled: true,
            }

            const thanaData = thana.data.map(function (thana: Thana) {
                return {
                    value: thana.id,
                    label: thana.thana_name
                }
            });

            thanas2.value = [thanaOption, ...thanaData];
            isThanaDisabled2.value = false;
        }
        isLoadingThanas2.value = false;
        // update present if same as permanent
        if (sameAsPermanent.value === true) {
            formData.value.present.district_id = formData.value.permanent.district_id;
            formData.value.present.thana_id = '';
            thanas.value = thanas2.value;
        }
    }
}

async function getDistrictsByDivision(division_id: string, target: 'present_address' | 'permanent_address') {
    if (target === 'present_address') {
        isLoadingDistricts.value = true;
        // 🔁 Reset selected values
        formData.value.present.district_id = '';
        formData.value.present.thana_id = '';
        formData.value.present.union_id = '';
        formData.value.present.post_office_id = '';

        // 🔁 Clear options
        districts.value = [];
        thanas.value = [];
        unions.value = [];
        postOffices.value = [];

        // 🔁 Disable lower dropdowns
        isDistrictDisabled.value = true;
        isThanaDisabled.value = true;
        isUnionDisabled.value = true;
        isPostOfficeDisabled.value = true;

        const dis = await getDistrictsByDivisionId(division_id);
        if (dis && dis.data) {
            const districtOption = {
                value: '',
                label: "Please Select District",
                disabled: true,
            };

            const districtData = dis.data.map(function (dist: District) {
                return {
                    value: dist.id,
                    label: dist.district_name
                }
            });

            districts.value = [districtOption, ...districtData];

            isDistrictDisabled.value = false;
        }
        isLoadingDistricts.value = false;
        // update permanent if same as present
        if (sameAsPresent.value === true) {
            formData.value.permanent.division_id = formData.value.present.division_id;
            formData.value.permanent.district_id = '';
            districts2.value = districts.value;
        }
    } else {
        isLoadingDistricts2.value = true;
        // 🔁 Reset selected values
        formData.value.permanent.district_id = '';
        formData.value.permanent.thana_id = '';
        formData.value.permanent.union_id = '';
        formData.value.permanent.post_office_id = '';

        // 🔁 Clear options
        districts2.value = [];
        thanas2.value = [];
        unions2.value = [];
        postOffices2.value = [];

        // 🔁 Disable lower dropdowns
        isDistrictDisabled2.value = true;
        isThanaDisabled2.value = true;
        isUnionDisabled2.value = true;
        isPostOfficeDisabled2.value = true;

        const dis = await getDistrictsByDivisionId(division_id);
        if (dis && dis.data) {
            const districtOption = {
                value: '',
                label: "Please Select District",
                disabled: true,
            };

            const districtData = dis.data.map(function (dist: District) {
                return {
                    value: dist.id,
                    label: dist.district_name
                }
            });

            districts2.value = [districtOption, ...districtData];

            isDistrictDisabled2.value = false;
        }
        isLoadingDistricts2.value = false;
    }
    // update present if same as permanent
    if (sameAsPermanent.value === true) {
        formData.value.present.division_id = formData.value.permanent.division_id;
        formData.value.present.district_id = '';
        districts.value = districts2.value;
    }
}

async function getDivisions() {
    try {
        const divs = await commonAxiosRequest.fetchAllData('su/divisions');
        if (divs.status && divs.status_code == 200 && divs.data) {

            const divisionOption = {
                value: '',
                label: "Please Select Division",
                disabled: true,
            }

            const divisionData = divs.data.map(function (item: Division) {
                return {
                    value: item.id,
                    label: item.division_name
                }
            });

            divisions.value = [divisionOption, ...divisionData];
            divisions2.value = [divisionOption, ...divisionData];
            isLoadingDivisions.value = false;
            isLoadingDivisions2.value = false;
        }
    } catch (error) {
        console.log(error);
        isLoadingDivisions.value = false;
        isLoadingDivisions2.value = false;
    }
}
</script>

<style scoped>
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
