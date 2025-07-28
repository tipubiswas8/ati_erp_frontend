<!-- AddDepartment.vue -->
<template>
  <div class="add-department-form" v-on:click.stop>
    <button @click="close"
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl transition-transform duration-200 transform hover:scale-110"
      aria-label="Close modal">
      ✖
    </button>
    <h2 class="text-xl font-semibold mb-4 text-center text-gray-800">
      {{ $t("Add New Department") }}
    </h2>
    <hr class="mb-4" />
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="w-full">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-full px-2">
            <div class="mb-4 flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Department Name") }}
              </label>
              <input type="text" v-model="form.department_name" required
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter department name" />
            </div>
            <div class="mb-4 flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Department Abbreviation") + " (" + $t("Optional") + ")" }}
              </label>
              <input type="text" v-model="form.department_abbr"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter department abbreviation" />
            </div>
            <div class="mb-4 flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("User Define Department Number") + " (" + $t("Optional") + ")" }}
              </label>
              <input type="number" v-model="form.user_define_department_id"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter user define department number" />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-sm">
            {{ $t("Add Department") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { globals } from "@/config/globals";

const props = defineProps({
  isAddNew: Boolean,
  departmentInfo: {
    type: Object,
    required: false,
    default: null,
  },
  organizationInfo: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["close", "department-added"]);

const store = useStore();
const toast = useToast();

const form = ref({
  organization_id: props.departmentInfo?.org_id || props.organizationInfo?.org_id,
  parent_department_id: props.departmentInfo?.dept_id,
  department_name: "",
  department_abbr: "",
  user_define_department_id: ""
});

function close() {
  emit("close");
}

async function submitForm() {
  try {
    const response = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/departments", form.value);

    console.log(response.data)
    if (response.data && response.data.status === true) {
      toast.success("Department added successfully!");
      emit("department-added");
      close();
    } else {
      toast.error("Department addition failed. Please try again!");
    }
  } catch (error) {
    toast.error("Something went wrong during submission.");
    console.error(error);
  }
}
</script>

<style scoped>
.add-department-form {
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
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