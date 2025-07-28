<template>
  <div class="add-organization-form w-full p-6 bg-white rounded-lg shadow-lg" v-on:click.stop>
    <button @click="close"
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl transition-transform duration-200 transform hover:scale-110"
      aria-label="Close modal">
      ✖
    </button>
    <h2 class="text-xl font-semibold mb-4 text-center text-gray-800">
      {{ isAddNew ? $t("Add New Organization") : $t("Edit Organization") }}
    </h2>
    <hr class="mb-4" />
    <form @submit.prevent="submitForm">
      <div class="w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <!-- Left Column -->
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Organization Name") }}
              </label>
              <input type="text" v-model="form.organization_name" required
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter organization name" />
            </div>

            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Organization Abbreviation") }}
              </label>
              <input type="text" v-model="form.organization_abbr"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter organization abbreviation" />
            </div>

            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Organization Information") + " (" + $t("Optional") + ")" }}
              </label>
              <input type="text" v-model="form.organization_info"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter organization information" />
            </div>

            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("User Define Organization Number") + " (" + $t("Optional") + ")" }}
              </label>
              <input type="number" v-model="form.user_define_sl_no"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter user defined number" />
            </div>

            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Email") }}
              </label>
              <input type="email" v-model="form.email"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm" placeholder="Enter email" />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Phone Number") }}
              </label>
              <input type="number" v-model="form.phone_numbers"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm" placeholder="Enter phone number" />
            </div>
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Website") }}
              </label>
              <input type="text" v-model="form.website"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm" placeholder="Enter website" />
            </div>
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Address") }}
              </label>
              <input type="text" v-model="form.address_info"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm" placeholder="Enter address" />
            </div>
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Slogan") }}
              </label>
              <input type="text" v-model="form.organization_slogan"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm" placeholder="Enter slogan" />
            </div>
            <div class="flex flex-col">
              <label class="text-md font-medium text-gray-900 mb-2">
                {{ $t("Details") }}
              </label>
              <textarea v-model="form.organization_detail"
                class="border border-gray-300 rounded-lg p-2 text-gray-800 text-sm"
                placeholder="Enter details"></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-6">
          <button type="submit"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-sm">
            {{ isAddNew ? $t("Add Organization") : $t("Update Organization") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { globals } from "@/config/globals";

const props = defineProps({
  isAddNew: {
    type: Boolean,
    default: true
  },
  organizationInfo: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["close", "organization-added", "organization-updated"]);

const toast = useToast();

const form = ref({
  organization_name: "",
  organization_abbr: "",
  organization_info: "",
  user_define_sl_no: "",
  email: "",
  website: "",
  phone_numbers: "",
  address_info: "",
  organization_slogan: "",
  organization_detail: "",
});

// Watch for changes in organizationInfo prop
watch(() => props.organizationInfo, (newVal) => {
  if (newVal) {
    form.value = {
      ...newVal,
      // Map any field names if they differ between API and form
    };
  }
}, { immediate: true });

function close() {
  emit("close");
}

async function submitForm() {
  try {
    let response;
    const endpoint = globals.apiEndpoints.basePath + "/hr/organizations";

    if (props.isAddNew) {
      response = await globals.axios.post(endpoint, form.value);
    } else {
      response = await globals.axios.put(`${endpoint}/${props.organizationInfo.org_id}`, form.value);
    }

    if (response.data && response.data.status === true) {
      toast.success(response.data.message);
      if (props.isAddNew) {
        emit("organization-added");
      } else {
        emit("organization-updated");
      }
      close();
    } else {
      toast.error(response.data?.message || "Operation failed. Please try again!");
    }
  } catch (error) {
    toast.error("Something went wrong during submission.");
    console.error(error);
  }
}
</script>

<style scoped>
.add-organization-form {
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Remove number input spinners */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>