<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex justify-center pt-10 bg-gray-500 bg-opacity-50 z-40"
    @click.self="close"
    role="dialog"
    @keydown.esc="close"
    tabindex="0"
    :class="modal_class"
  >
    <div
      :class="modal_class"
      class="rounded-md overflow-auto h-[90vh] shadow-xl w-[90vw] max-w-5xl p-12 relative transform transition-transform duration-300 ease-in-out z-50 animate-fadeIn"
      @click.stop
    >
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl hover:scale-110 transition-transform"
        aria-label="Close modal"
      >
        ✖
      </button>

      <!-- Modal Title -->
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800 ">
        {{ $t("Task Info") }}
      </h2>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <input type="hidden" v-model="form.task_id" />

        <!-- Title -->
        <div class="mb-6">
          <label class="text-lg font-medium text-gray-900 mb-2 block">
            {{ $t("Title") }}
          </label>
          <input
            type="text"
            v-model="form.title"
            readonly
            required
            class="border border-gray-300 rounded-lg p-3 text-gray-800 w-full"
            placeholder="Project title"
          />
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label class="text-lg font-medium text-gray-900 mb-2 block">
            {{ $t("Description") }}
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            class="block p-2.5 w-full text-sm border border-gray-300 rounded-lg"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <!-- Labels -->
        <div class="mb-6">
          <label class="text-lg font-medium text-gray-900 mb-2 block">
            {{ $t("Label") }}
          </label>
          <div
            v-for="(label, index) in labels"
            :key="index"
            class="flex items-center gap-2 mt-2"
          >
            <input
              type="text"
              v-model="labels[index]"
              required
              maxlength="240"
              class="border border-gray-300 rounded-lg p-3 text-gray-800 w-full"
              :placeholder="`Label ${index + 1}`"
            />
            <span
              v-if="index === labels.length - 1"
              @click="addElement"
              class="text-white bg-violet-700 hover:bg-green-800 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-3.5 cursor-pointer"
            >
              +
            </span>
            <span
              v-if="labels.length > 1"
              @click="removeElement(index)"
              class="text-white bg-red-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-3.5 cursor-pointer"
            >
              -
            </span>
          </div>
        </div>

        <!-- Assign Person -->
        <div class="mb-6">
          <label class="text-lg font-medium text-gray-900 mb-2 block">
            {{ $t("Add Person") }}
          </label>
          <multiselect
            id="tagging"
            v-model="selected_value"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
            style="height: 45px"
          />
        </div>

        <!-- Forecast Date -->
        <div class="mb-6">
          <label class="text-lg font-medium text-gray-900 mb-2 block">
            {{ $t("Forecast") }}
          </label>
          <a-date-picker
            v-model:value="forecasted_date"
            :format="dateFormat"
            style="height: 45px; width: 100%"
            inputReadOnly
          />
        </div>

        <!-- Submit -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300"
          >
            {{ $t("Submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import Multiselect from "vue-multiselect";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { globals } from "@/config/globals";
import dayjs from "dayjs";

const toast = useToast();

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  taskData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["close"]);

// i18n and store
const store = useStore();
const { t } = useI18n();

// Reactive state
const form = ref({
  task_id: "",
  title: "",
  labels: [],
  employee_id: [],
  description: "",
  forecasted_date: "",
});
const selected_value = ref([]);
const labels = ref([""]);
const options = ref([]);

const dateFormat = "YYYY/MM/DD";

// IMPORTANT: Initialize forecasted_date as a dayjs ref, defaulting to today
const forecasted_date = ref(dayjs());

// Computed for modal class
const modal_class = computed(() => {
  return store.state.theme === "dark"
    ? "bg-gray-200 text-black custom-scrollbar"
    : "bg-white text-gray-800 custom-scrollbar";
});

// Watch taskData to fill form and forecasted_date
watch(
  () => props.taskData,
  (newVal) => {
    if (newVal) {
      form.value.task_id = newVal.task_id || "";
      form.value.title = newVal.title || "";
      form.value.employee_id = newVal.employee_id || [];
      form.value.description = newVal.description || "";

      // Set the date picker value safely:
      try {
        if (newVal.forecasted_date) {
          forecasted_date.value = dayjs(newVal.forecasted_date, dateFormat);
          if (!forecasted_date.value.isValid()) {
            // fallback to today if invalid
            forecasted_date.value = dayjs();
          }
        } else {
          forecasted_date.value = dayjs();
        }
      } catch (e) {
        forecasted_date.value = dayjs();
      }

      labels.value = newVal.task_labels?.length
        ? [...newVal.task_labels]
        : [""];
      selected_value.value = newVal.assign_persons || [];
    }
  },
  { immediate: true }
);

// Fetch employee options on mount
onMounted(async () => {
  try {
    const res = await globals.axios.get(globals.apiEndpoints.employees);
    options.value = res.data.data.map((emp) => ({
      name: emp.emp_full_eng_name,
      code: emp.emp_slug,
    }));
  } catch (e) {
    toast.error(t("Failed to load employees."));
  }
});

// Methods
function close() {
  emit("close");
}

function addElement() {
  if (labels.value.at(-1) === "") {
    toast.error(t("Please fill the last label before adding a new one."));
    return;
  }
  labels.value.push("");
}

function removeElement(index) {
  if (labels.value.length > 1) {
    labels.value.splice(index, 1);
  }
}

function addTag(newTag) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 100000),
  };
  options.value.push(tag);
  selected_value.value.push(tag);
}

async function submitForm() {
  form.value.labels = [...labels.value];
  form.value.employee_id = selected_value.value.map((item) => item.code);
  form.value.forecasted_date = forecasted_date.value.format(dateFormat);

  try {
    await globals.axios.post(globals.apiEndpoints.task_label, form.value);
    toast.success(t("Task updated successfully."));
    emit("update_task");
    close();
  } catch (error) {
    toast.error(t("Error submitting form."));
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
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

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

i:hover {
  transform: scale(1.3);
  transition: transform 0.3s ease;
}
</style>
