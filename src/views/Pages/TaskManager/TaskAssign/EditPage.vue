<template>
    <!-- Collapsible Row -->
    <tr :class="themeClass" v-if="expandedIndex === index">
        <td colspan="5" class="p-2">
            <div :class="tableClass" class="p-6 rounded-lg shadow-xl space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <!-- Project Name -->
                    <div class="mb-6 flex flex-col">
                        <label for="project_id" class="text-lg font-medium text-gray-900 mb-2">{{ $t("Project Name")
                            }}</label>
                        <select id="project_id" v-model="form.project_id"
                            class="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white">
                            <option v-for="project in projects" :key="project.pro_id" :value="project.pro_id"
                                class="text-dark">
                                {{ project.project_name }}
                            </option>
                        </select>
                    </div>

                    <!-- Department -->
                    <div class="mb-6 flex flex-col">
                        <label for="department_id" class="text-lg font-medium text-gray-900 mb-2">{{ $t("Department")
                            }}</label>
                        <select id="department_id" v-model="form.department_id"
                            class="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white">
                            <option v-for="department in departments" :key="department.dept_id"
                                :value="department.dept_id" class="text-dark">
                                {{ department.department_name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p><strong>Title :</strong></p>
                        <input v-model="form.title" :class="getInputClass('title')" placeholder="Title" />
                    </div>
                    <div>
                        <p><strong>Attachment:</strong></p>
                        <input type="file" v-bind:onchange="handleFileChange" :class="getInputClass('attachment')" />
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <p><strong>Description :</strong></p>
                        <input v-model="form.description" :class="getInputClass('description')"
                            placeholder="Description" />
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <div class="text-center">
                        <button type="submit" @click="editTask(index)"
                            class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { globals } from '@/config/globals';

const props = defineProps({
    index: Number,
    expandedIndex: Number,
    task: Object,
    departments: Array,
    projects: Array,
    themeClass: String,
    tableClass: String
});



const emit = defineEmits(['update-task']);

const form = ref({
    project_id: props.task.pro_id || '',
    department_id: props.task.dept_id || '',
    title: props.task.task_title || '',
    description: props.task.task_description || '',
    attachment: props.task.attachment || null
});

console.log(props.task);
const getInputClass = (field, index) => {
    return props.themeClass?.includes("dark")
        ? "w-full p-3 rounded-lg text-white bg-gray-700 border focus:outline-none focus:ring-2 focus:ring-blue-500"
        : "w-full p-3 rounded-lg text-gray-800 bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500";
};

function handleFileChange(event) {
    form.value.attachment = event.target.files[0] || null;
}

async function editTask() {
    try {
        const taskId = props.task?.task_id;

        const formData = new FormData();
        formData.append("title", form.value.title.toString());
        formData.append("project_id", String(form.value.project_id));
        formData.append("department_id", String(form.value.department_id));
        formData.append("description", form.value.description?.toString() || '');
        formData.append('_method', 'PATCH'); // Laravel uses this to spoof the method

        if (form.value.attachment instanceof File) {
            formData.append("attachment", form.value.attachment);
        }

        const response = await globals.axios.post(
            globals.apiEndpoints.task + '/' + taskId,
            formData
        );
        console.log("Success:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Server Error:", error.response.data);
        } else if (error.request) {
            console.error("Network Error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
    }
    emit('update-task', { index: props.index, data: form.value });
}
</script>


<style scoped>
/* Custom Tailwind Animations */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Tailwind Animation Class */
.animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
}

/* Hover effects for icons */
i:hover {
    transform: scale(1.3);
    transition: transform 0.3s ease;
}
</style>
