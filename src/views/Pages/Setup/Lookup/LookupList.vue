<template>
    <div class="flex gap-8 p-8 min-h-screen bg-gray-50">
        <!-- Tree View Panel -->
        <div class="w-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-indigo-700">Lookup Groups</h2>
                <button @click="openAddGroup()"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    Add Group
                </button>
            </div>

            <div class="space-y-2">
                <div class="space-y-2">
                    <div v-for="group in lookupGroupsAndData" :key="group.id" class="relative">
                        <!-- Group Header -->
                        <div @click="toggleGroup(group.id)"
                            class="flex justify-between items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg cursor-pointer font-medium text-gray-800 shadow transition-colors duration-200">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-indigo-600 transition-transform duration-200"
                                    :class="{ 'rotate-90': expandedGroups.includes(group.id) }" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span>{{ group.lookup_group_name }}</span>
                            </div>
                            <div class="flex gap-2">
                                <!-- View Button -->
                                <button @click.stop="viewLookupGroupDetails(group)"
                                    class="text-indigo-600 hover:text-indigo-800 text-sm p-1 rounded hover:bg-indigo-100 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M10 3C5 3 1.73 7.11 1.05 9c.68 1.89 3.95 6 8.95 6s8.27-4.11 8.95-6c-.68-1.89-3.95-6-8.95-6zm0 10a4 4 0 110-8 4 4 0 010 8z" />
                                        <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                                    </svg>
                                </button>
                                <!-- Edit Button -->
                                <button @click.stop="editLookupGroup(group)"
                                    class="text-indigo-600 hover:text-indigo-800 text-sm p-1 rounded hover:bg-indigo-100 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M17.414 2.586a2 2 0 00-2.828 0L13 4.172l2.828 2.828 1.586-1.586a2 2 0 000-2.828z" />
                                        <path d="M12.293 5.707L3 15V17h2l9.293-9.293-2-2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Group Content with Transition -->
                        <transition name="slide-fade">
                            <div v-if="expandedGroups.includes(group.id)"
                                class="ml-6 mt-1 space-y-1 border-l-2 border-indigo-200 pl-4">
                                <table class="w-full border">
                                    <thead>
                                        <tr class="bg-gray-100">
                                            <th class="p-2 text-left">Lookup Data Name</th>
                                            <th class="p-2 text-left">Short Name</th>
                                            <th class="p-2 text-right">
                                                <button @click.stop="openAddData(group.id)"
                                                    class="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                                        fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                    Add Data
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item in group.lookup_data" :key="item.id"
                                            class="border-b hover:bg-indigo-50">
                                            <td class="p-2">{{ item.lookup_data_name }}</td>
                                            <td class="p-2">{{ item.short_name || '-' }}</td>
                                            <td class="p-2 text-right">
                                                <div class="flex gap-1 justify-end">
                                                    <!-- View Button -->
                                                    <button @click="viewLookupDataDetails(item)"
                                                        class="p-1 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors">
                                                        <!-- Eye Icon (View) -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                                            viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                d="M10 3C5 3 1.73 7.11 1.05 9c.68 1.89 3.95 6 8.95 6s8.27-4.11 8.95-6c-.68-1.89-3.95-6-8.95-6zm0 10a4 4 0 110-8 4 4 0 010 8z" />
                                                            <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                                                        </svg>
                                                    </button>

                                                    <!-- Edit Button -->
                                                    <button @click="editLookupData(item)"
                                                        class="p-1 text-gray-500 hover:text-yellow-600 rounded-full hover:bg-yellow-100 transition-colors">
                                                        <!-- Pencil Square Icon -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                                            fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                d="M17.414 2.586a2 2 0 00-2.828 0L13 4.172l2.828 2.828 1.586-1.586a2 2 0 000-2.828z" />
                                                            <path d="M12.293 5.707L3 15V17h2l9.293-9.293-2-2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Panel -->
        <div class="flex-1">
            <!-- Add Group Form -->
            <div v-if="addGroup" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Add Lookup Group</h2>
                    <button @click="addGroup = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSubmitGroup" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-4">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Lookup Group Name</label>
                                <input type="text" v-model="formData.groupInfo.lookup_group_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">User Define Group Number</label>
                                <input type="number" v-model="formData.groupInfo.user_define_lookup_group_number"
                                    required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Character Type</label>
                                <select v-model="formData.groupInfo.is_char_or_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none">
                                    <option value="">Select Type</option>
                                    <option value="C">Character</option>
                                    <option value="N">Number</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                                <input type="number" v-model="formData.groupInfo.user_define_serial_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="addGroup = false"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Submit Group
                        </button>
                    </div>
                </form>
            </div>


            <!-- Edit Group Form -->
            <div v-if="updateGroup" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Update Lookup Group</h2>
                    <button @click="updateGroup = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="updateLookupGroupInfo(formData.groupInfo.id)" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-4">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Lookup Group Name</label>
                                <input type="text" v-model="formData.groupInfo.lookup_group_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">User Define Group Number</label>
                                <input type="number" v-model="formData.groupInfo.user_define_lookup_group_number"
                                    required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Character Type</label>
                                <select v-model="formData.groupInfo.is_char_or_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none">
                                    <option value="">Select Type</option>
                                    <option value="C">Character</option>
                                    <option value="N">Number</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                                <input type="number" v-model="formData.groupInfo.user_define_serial_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Status</label>
                                <select id="status" v-model="formData.groupInfo.active_status"
                                    :style="{ color: formData.groupInfo.active_status ? 'green' : 'magenta' }"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <option :value="true" style="color: green;">Active</option>
                                    <option :value="false" style="color: magenta;">Inactive</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="addGroup = false"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Update Group
                        </button>
                    </div>
                </form>
            </div>



            <!-- View Group Form -->
            <div v-if="viewGroup" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">View Lookup Group</h2>
                    <button @click="viewGroup = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="grid grid-cols-1 gap-6">
                    <div class="space-y-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Lookup Group Name</label>
                            <input type="text" v-model="formData.groupInfo.lookup_group_name" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">User Define Group Number</label>
                            <input type="text" v-model="formData.groupInfo.user_define_lookup_group_number" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Character Type</label>
                            <input type="text" v-if="formData.groupInfo.is_char_or_number === 'C'" value="Character"
                                readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            <input type="text" v-else value="Number" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                            <input type="text" v-model="formData.groupInfo.user_define_serial_number" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Status</label>
                            <input type="text" v-if="formData.groupInfo.active_status === true" value="Active" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            <input type="text" v-else value="Inactive" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                    </div>
                </div>
            </div>


            <!-- Add Data Form -->
            <div v-if="addData" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Add Lookup Data to {{ selectedGroupName }}</h2>
                    <button @click="addData = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSubmitData" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-4">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Lookup Data Name</label>
                                <input type="text" v-model="formData.dataInfo.lookup_data_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Short Name</label>
                                <input type="text" v-model="formData.dataInfo.short_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">User Define Data Number</label>
                                <input type="number" v-model="formData.dataInfo.user_define_serial_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Default Status</label>
                                <select v-model="formData.dataInfo.default_flag" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none">
                                    <option :value="false">No</option>
                                    <option :value="true">Yes</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-2" v-show="isNumOrChar == 'C'">
                                <label class="text-sm font-medium text-gray-700">Character Value</label>
                                <input type="text" v-model="formData.dataInfo.char_value" v-on:input="lengthCheck"
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>


                            <div class="flex flex-col gap-2" v-show="isNumOrChar === 'N'">
                                <label class="text-sm font-medium text-gray-700">Number Value</label>
                                <input type="number" v-model="formData.dataInfo.num_value" v-on:input="lengthCheck"
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                                <input type="number" v-model="formData.dataInfo.user_define_lookup_data_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="addData = false"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Submit Data
                        </button>
                    </div>
                </form>
            </div>

            <!-- Update Data Form -->
            <div v-if="updateData" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Update Lookup Data to {{ selectedGroupName }}
                    </h2>
                    <button @click="updateData = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSubmitData" class="space-y-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="space-y-4">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Lookup Data Name</label>
                                <input type="text" v-model="formData.dataInfo.lookup_data_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Short Name</label>
                                <input type="text" v-model="formData.dataInfo.short_name" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">User Define Data Number</label>
                                <input type="number" v-model="formData.dataInfo.user_define_serial_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Default Status</label>
                                <select v-model="formData.dataInfo.default_flag" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                                <input type="number" v-model="formData.dataInfo.user_define_lookup_data_number" required
                                    class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-gray-700">Status</label>
                                <select id="status" v-model="formData.dataInfo.active_status"
                                    :style="{ color: formData.dataInfo.active_status ? 'green' : 'magenta' }"
                                    class="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <option :value="true" style="color: green;">Active</option>
                                    <option :value="false" style="color: magenta;">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="addData = false"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            Update Data
                        </button>
                    </div>
                </form>
            </div>

            <!-- View Data Form -->
            <div v-if="viewData" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">View Lookup Data Details {{ selectedGroupName
                        }}
                    </h2>
                    <button @click="viewData = false"
                        class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 gap-6">
                    <div class="space-y-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Lookup Data Name</label>
                            <input type="text" v-model="formData.dataInfo.lookup_data_name" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Short Name</label>
                            <input type="text" v-model="formData.dataInfo.short_name" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">User Define Data Number</label>
                            <input type="number" v-model="formData.dataInfo.user_define_serial_number" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2" v-show="formData.groupInfo.is_char_or_number == 'C'">
                            <label class="text-sm font-medium text-gray-700">Character Value</label>
                            <input type="text" v-model="formData.dataInfo.char_value" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2" v-show="formData.groupInfo.is_char_or_number == 'N'">
                            <label class="text-sm font-medium text-gray-700">Number Value</label>
                            <input type="number" v-model="formData.dataInfo.num_value" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Default Status</label>
                            <input type="text" v-if="formData.dataInfo.default_flag" value="Yes" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            <input type="text" v-else value="No" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Record Order Number</label>
                            <input type="number" v-model="formData.dataInfo.user_define_lookup_data_number" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700">Status</label>

                            <input type="text" v-if="formData.dataInfo.active_status === true" value="Active" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                            <input type="text" v-else value="Inactive" readonly
                                class="px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!addGroup && !updateGroup && !viewGroup && !addData && !updateData && !viewData"
                class="flex items-center justify-center h-[80vh] bg-white rounded-2xl shadow-xl border border-gray-200">
                <div class="text-center p-8 max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 class="mt-4 text-lg font-medium text-gray-900">No form selected</h3>
                    <p class="mt-2 text-sm text-gray-500">Select a group to add data or click "Add Group" to create a
                        new lookup group.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { addLookupData, addLookupGroup, fetchLookupGroupWithLookupData, updateLookupGroup } from '@/api/lookupApi';
import { useToast } from "vue-toastification";
const toast = useToast();

const addGroup = ref(false);
const updateGroup = ref(false);
const viewGroup = ref(false);

const addData = ref(false);
const updateData = ref(false);
const viewData = ref(false);

// Selected items
const selectedGroupId = ref<number | null>(null);
const selectedGroupName = ref('');
const selectedGroup = ref<LookupGroup | null>(null);
const selectedDataItem = ref<LookupDataItem | null>(null);
const expandedGroups = ref<number[]>([]);

interface LookupGroup {
    id: number;
    lookup_group_id: string;
    lookup_group_name: string;
    is_char_or_number: string;
    default_flag: boolean;
    active_status: boolean;
    user_define_serial_number: number;
    user_define_lookup_group_number: number;
    lookup_data: LookupDataItem[];
}

interface LookupDataItem {
    id: number;
    lookup_group_id: number;
    lookup_data_name: string;
    short_name: string | null;
    char_value: string | null;
    num_value: number | null;
    default_flag: boolean;
    active_status: boolean;
    user_define_serial_number: number | null;
    user_define_lookup_data_number: number | null;
}
const lookupGroupsAndData = ref<LookupGroup[]>([]);

const formData = ref({
    groupInfo: {
        id: 0,
        lookup_group_name: '',
        is_char_or_number: '',
        default_flag: false,
        active_status: false,
        user_define_lookup_group_number: 0,
        user_define_serial_number: 0
    },
    dataInfo: {
        id: 0,
        lookup_data_name: '',
        short_name: '',
        char_value: '',
        num_value: null as number | null,
        default_flag: false,
        active_status: false,
        user_define_serial_number: 0,
        user_define_lookup_data_number: 0,
    }
});

const lengthCheck = () => {
    // Trim char_value to 2 characters max
    if (formData.value.dataInfo.char_value) {
        formData.value.dataInfo.char_value = formData.value.dataInfo.char_value.slice(0, 2).trim();
    }

    // Limit num_value to 2 digits (as a number)
    if (formData.value.dataInfo.num_value !== null) {
        const numStr = formData.value.dataInfo.num_value.toString();
        if (numStr.length > 2) {
            // Convert back to number after slicing first 2 digits
            formData.value.dataInfo.num_value = Number(numStr.slice(0, 2));
        }
    }
}


// Toggle group expansion
const toggleGroup = (groupId: number) => {
    const index = expandedGroups.value.indexOf(groupId);
    if (index > -1) {
        expandedGroups.value.splice(index, 1);
    } else {
        // Optional: If you want only one group expanded at a time
        // expandedGroups.value = [groupId];
        // Otherwise, allow multiple groups to be expanded
        // expandedGroups.value.push(groupId);
        expandedGroups.value = [groupId];
    }
};


// View/Edit group functions
const viewLookupGroupDetails = (group: LookupGroup) => {
    selectedGroup.value = group;
    formData.value.groupInfo = {
        id: group.id,
        lookup_group_name: group.lookup_group_name,
        is_char_or_number: group.is_char_or_number,
        default_flag: group.default_flag,
        active_status: group.active_status,
        user_define_lookup_group_number: group.user_define_lookup_group_number,
        user_define_serial_number: group.user_define_serial_number
    };
    addGroup.value = false;
    updateGroup.value = false;
    viewGroup.value = true;
    addData.value = false;
    updateData.value = false;
    viewData.value = false;
};

const editLookupGroup = async (group: LookupGroup) => {
    selectedGroup.value = group;
    formData.value.groupInfo = {
        id: group.id,
        lookup_group_name: group.lookup_group_name,
        is_char_or_number: group.is_char_or_number,
        default_flag: group.default_flag,
        active_status: group.active_status,
        user_define_lookup_group_number: group.user_define_lookup_group_number,
        user_define_serial_number: group.user_define_serial_number
    };
    addGroup.value = false;
    updateGroup.value = true;
    viewGroup.value = false;
    addData.value = false;
    updateData.value = false;
    viewData.value = false;
};

const updateLookupGroupInfo = async (groupId: number) => {
    try {
        const update = await updateLookupGroup(groupId, formData.value.groupInfo);
        if (update.success == true) {
            toast.success(update.message);
            formData.value = null;
        }
    }
    catch (error) {
        console.log(error);
        toast.error("Something went wrong during submission.");
        formData.value = null;
    }
    updateGroup.value = false;
}

// View/Edit data functions
const viewLookupDataDetails = (dataItem: LookupDataItem) => {
    selectedDataItem.value = dataItem;
    formData.value.dataInfo = {
        id: dataItem.id,
        lookup_data_name: dataItem.lookup_data_name,
        short_name: dataItem.short_name || '',
        char_value: dataItem.char_value || '',
        num_value: dataItem.num_value || null,
        active_status: dataItem.active_status || false,
        default_flag: dataItem.default_flag || false,
        user_define_serial_number: dataItem.user_define_serial_number || 0,
        user_define_lookup_data_number: dataItem.user_define_lookup_data_number || 0
    };
    addGroup.value = false;
    updateGroup.value = false;
    viewGroup.value = false;
    addData.value = false;
    updateData.value = false;
    viewData.value = true;
};

const editLookupData = (dataItem: LookupDataItem) => {
    selectedDataItem.value = dataItem;
    formData.value.dataInfo = {
        id: dataItem.id,
        lookup_data_name: dataItem.lookup_data_name,
        short_name: dataItem.short_name || '',
        char_value: dataItem.char_value || '',
        num_value: dataItem.num_value || null,
        default_flag: dataItem.default_flag || false,
        active_status: dataItem.active_status || false,
        user_define_serial_number: dataItem.user_define_serial_number || 0,
        user_define_lookup_data_number: dataItem.user_define_lookup_data_number || 0
    };
    addGroup.value = false;
    updateGroup.value = false;
    viewGroup.value = false;
    addData.value = false;
    updateData.value = true;
    viewData.value = false;
};


onMounted(async () => {
    try {
        const response = await fetchLookupGroupWithLookupData();
        lookupGroupsAndData.value = response.data;
        console.log(lookupGroupsAndData.value);
    } catch (error) {
        console.error('Error fetching lookup groups:', error);
    }
});


const openAddGroup = () => {
    addGroup.value = true;
    updateGroup.value = false;
    viewGroup.value = false;
    addData.value = false;
    updateData.value = false;
    viewData.value = false;
}

let isNumOrChar;

const openAddData = (groupId: number) => {
    addData.value = true;
    addGroup.value = false;
    updateGroup.value = false;
    viewGroup.value = false;
    updateData.value = false;
    viewData.value = false;

    const group = lookupGroupsAndData.value.find(g => g.id === groupId);
    if (group) {
        selectedGroupId.value = groupId;
        selectedGroupName.value = group.lookup_group_name;

        // Reset form
        formData.value.dataInfo = {
            id: 0,
            lookup_data_name: '',
            short_name: '',
            char_value: '',
            num_value: null,
            default_flag: false,
            active_status: false,
            user_define_serial_number: 0,
            user_define_lookup_data_number: 0,
        };

        const groupValue = lookupGroupsAndData.value.find(function (item) {
            return item.id == groupId;
        });

        isNumOrChar = groupValue.is_char_or_number;
    }
};

const handleSubmitGroup = async () => {
    if (!formData.value.groupInfo.lookup_group_name) {
        alert('Group name is required');
        return;
    }

    // Here you would typically call an API to save the group
    const newGroup: LookupGroup = {
        id: Math.max(0, ...lookupGroupsAndData.value.map(g => g.id)) + 1,
        lookup_group_id: `GRP_${Math.floor(Math.random() * 10000)}`,
        lookup_group_name: formData.value.groupInfo.lookup_group_name,
        is_char_or_number: formData.value.groupInfo.is_char_or_number,
        default_flag: false,
        active_status: true,
        user_define_serial_number: formData.value.groupInfo.user_define_serial_number,
        user_define_lookup_group_number: formData.value.groupInfo.user_define_lookup_group_number,
        lookup_data: []
    };

    lookupGroupsAndData.value.push(newGroup);

    try {
        const add = await addLookupGroup(formData.value.groupInfo);
        if (add.success == true) {
            toast.success(add.message);
            formData.value = null;
        }
    }
    catch (error) {
        console.log(error);
        toast.error("Something went wrong during submission.");
        formData.value = null;
    }
    addGroup.value = false;
};

const handleSubmitData = async () => {
    if (!formData.value.dataInfo.lookup_data_name) {
        alert('Data name is required');
        return;
    }

    if (!selectedGroupId.value) return;

    const group = lookupGroupsAndData.value.find(g => g.id === selectedGroupId.value);
    if (group) {
        const newItem: LookupDataItem = {
            id: Math.max(0, ...group.lookup_data.map(i => i.id)) + 1,
            lookup_group_id: selectedGroupId.value,
            lookup_data_name: formData.value.dataInfo.lookup_data_name,
            short_name: formData.value.dataInfo.short_name || null,
            char_value: formData.value.dataInfo.char_value || null,
            num_value: formData.value.dataInfo.num_value || null,
            default_flag: formData.value.dataInfo.default_flag || false,
            active_status: formData.value.dataInfo.active_status || false,
            user_define_serial_number: formData.value.dataInfo.user_define_serial_number,
            user_define_lookup_data_number: formData.value.dataInfo.user_define_lookup_data_number
        };

        group.lookup_data.push(newItem);

        const lookupGroupData = {
            ...formData.value.dataInfo,
            lookup_group_id: newItem.lookup_group_id
        }

        try {
            const { id, ...cleanedData } = lookupGroupData;
            const added = await addLookupData(cleanedData);
            if (added.success == true) {
                toast.success(added.message);
                formData.value = null;
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong during submission.");
            formData.value = null;
        }
        addData.value = false;
    }
};
</script>

<style scoped>
/* Slide-fade transition */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

/* Rotate chevron icon */
.rotate-90 {
    transform: rotate(90deg);
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