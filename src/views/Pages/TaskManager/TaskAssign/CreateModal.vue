<template>
    <div v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out opacity-100"
        @click.self="close" role="dialog" aria-labelledby="modal-title" aria-hidden="false"
        aria-describedby="modal-description" @keydown.esc="close" tabindex="0">
        <!-- Modal Container -->
        <div :class="modal_class"
            class="rounded-3xl shadow-xl w-[90vw] max-w-5xl p-12 relative transform transition-transform duration-300 ease-in-out hover:scale-100 z-50 animate-fadeIn"
            @click.stop tabindex="0">
            <!-- Close Button -->
            <button @click="close"
                class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl transition-transform duration-200 transform hover:scale-110"
                aria-label="Close modal">
                ✖
            </button>

            <!-- Modal Title -->
            <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800" id="modal-title">
                {{ $t("Daily Task") }}
            </h2>
            <hr class="mb-4" />

            <!-- Form Section -->
            <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Project Name -->
                <div class="mb-6 flex flex-col">
                    <label for="project_id" class="text-lg font-medium text-gray-900 mb-2">{{ $t("Project Name")
                        }}</label>
                    <select id="project_id" v-model="form.project_id"
                        class="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white">
                        <option value="" disabled selected>
                            {{ $t("Select a project") }}
                        </option>
                        <option v-for="project in projects" :value="project.pro_id" class="text-dark">
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
                        <option value="" disabled selected>
                            {{ $t("Select a department") }}
                        </option>
                        <option v-for="department in departments" :value="department.dept_id" class="text-dark">
                            {{ department.department_name }}
                        </option>
                    </select>
                </div>

                <!-- Title -->
                <div class="mb-6 flex flex-col">
                    <label for="title" class="text-lg font-medium text-gray-900 mb-2">{{
                        $t("Title")
                        }}</label>
                    <input type="text" id="title" v-model="form.title" required
                        class="border border-gray-300 rounded-lg p-3 text-gray-800" placeholder="Enter project title" />
                </div>

                <!-- Description -->
                <div class="mb-6 flex flex-col">
                    <label for="description" class="text-lg font-medium text-gray-900 mb-2">{{ $t("Description")
                        }}</label>
                    <textarea id="description" v-model="form.description" rows="4"
                        class="block p-2.5 w-full text-sm border border-gray-300 rounded-lg"
                        placeholder="Write your thoughts here..."></textarea>
                </div>

                <!-- Attachment -->
                <div class="mb-6 flex flex-col">
                    <label for="attachment" class="text-lg font-medium text-gray-900 mb-2">{{ $t("Attachment")
                        }}</label>
                    <input type="file" id="attachment" @change="handleFileChange"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500" />
                </div>

                <hr />
                <div class="flex justify-center">
                    <button type="submit"
                        class="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                        {{ $t("Submit") }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { globals } from "@/config/globals";
import { useStore } from "vuex";

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["close"]);

const toast = useToast();
const store = useStore();

// Form data
const form = ref({
    project_id: "",
    department_id: "",
    title: "",
    description: "",
    attachment: null,
});

// Departments (loaded via API)
const departments = ref([]);
const projects = ref([]);

// Theme-based modal class
const modal_class = computed(() => {
    const theme = store.state.theme;
    return theme === "dark"
        ? "bg-gray-800 text-white custom-scrollbar"
        : "bg-white text-gray-800 custom-scrollbar";
});

function handleFileChange(event) {
    form.value.attachment = event.target.files[0] || null;
}

// Close modal
function close() {
    emit("close");
}

// Load departments from API
async function loadDepartments() {
    try {
        const response = await globals.axios.get(
            globals.apiEndpoints.basePath + "/hr/departments"
        );
        departments.value = response.data.data;
    } catch (error) {
        toast.error("Failed to load departments.");
    }
}

const loadProjects = async () => {
    try {
        const response = await globals.axios.get(
            globals.apiEndpoints.basePath + "/project-management/projects"
        );
        projects.value = response.data.data;
    } catch (error) {
        toast.error("Failed to load projects.");
    }
}

// Submit form
async function submitForm() {
    try {
        const formData = new FormData();
        formData.append("title", form.value.title);
        formData.append("project_id", form.value.project_id);
        formData.append("department_id", form.value.department_id);
        formData.append("description", form.value.description);

        if (form.value.attachment instanceof File) {
            formData.append("attachment", form.value.attachment);
        }

        const response = await globals.axios.post(
            globals.apiEndpoints.task,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(response.data)
        if (response.status === 200 && response.data.status === true) {
            toast.success("Task added successful!");
        } else {
            toast.error("Task added failed. Please try again!");
        }

        close();
    } catch (error) {
        toast.error("Task added failed. Please try again!");
        console.log(error.response)
        close();
    }
}

// Fetch departments on mount
onMounted(() => {
    loadDepartments();
    loadProjects();
});
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
  
