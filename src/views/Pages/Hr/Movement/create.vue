<template>
  <div
    :class="themeClass"
    class="overflow-hidden rounded-lg shadow-xl p-6 font-bold m-6"
  >
    <div class="grid grid-cols-12 gap-4">
      <div class="col-start-4 col-span-6">
        <div :class="themeClass"
          class="w-full p-4 border border-gray-200 rounded-lg shadow-sm sm:p-8"
        >
        <div class="text-center">
          <h4 class="text-2xl pb-4">Add New Movement</h4>
        </div>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="mb-4">
                  <label
                    for="employee"
                    class="block text-sm font-medium mb-1"
                    >Employee</label
                  >
                  <input
                    id="employee"
                    v-model="referenceEmployee"
                    type="text"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Enter employee name or ID"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="movementTitle"
                    class="block text-sm font-medium mb-1"
                    >Movement Title</label
                  >
                  <select
                    id="movementTitle"
                    v-model="movementTitle"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    <option value="" disabled>Select movement title</option>
                    <option value="promotion">Promotion</option>
                    <option value="demotion">Demotion</option>
                    <option value="transfer">Transfer</option>
                    <option value="secondment">Secondment</option>
                    <option value="acting">Acting</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    for="movementPurpose"
                    class="block text-sm font-medium mb-1"
                    >Movement Purpose</label
                  >
                  <input
                    id="movementPurpose"
                    v-model="movementPurpose"
                    type="text"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Enter movement purpose"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="movementArea"
                    class="block text-sm font-medium mb-1"
                    >Movement Area</label
                  >
                  <input
                    id="movementArea"
                    v-model="movementArea"
                    type="text"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Enter movement area"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="employeeSelect"
                    class="block text-sm font-medium mb-1"
                    >Select Employee</label
                  >
                  <select
                    id="employeeSelect"
                    v-model="referenceEmployee"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    <option value="" disabled>Select employee</option>
                    <option
                      v-for="employee in employees"
                      :key="employee.id"
                      :value="employee.id"
                    >
                      {{ employee.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label
                    for="movementStartPoint"
                    class="block text-sm font-medium mb-1"
                    >Movement Start Point</label
                  >
                  <select
                    id="movementStartPoint"
                    v-model="movementStartPoint"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    <option value="" disabled>Select start point</option>
                    <option value="current_department">
                      Current Department
                    </option>
                    <option value="current_location">Current Location</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <div class="mb-4">
                  <label
                    for="fromDate"
                    class="block text-sm font-medium mb-1"
                    >From Date</label
                  >
                  <input
                    id="fromDate"
                    v-model="fromDate"
                    type="date"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="fromTime"
                    class="block text-sm font-medium mb-1"
                    >From Time</label
                  >
                  <input
                    id="fromTime"
                    v-model="fromTime"
                    type="time"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="toDate"
                    class="block text-sm font-medium mb-1"
                    >To Date</label
                  >
                  <input
                    id="toDate"
                    v-model="toDate"
                    type="date"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="toTime"
                    class="block text-sm font-medium mb-1"
                    >To Time</label
                  >
                  <input
                    id="toTime"
                    v-model="toTime"
                    type="time"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="reason"
                    class="block text-sm font-medium mb-1"
                    >Reason</label
                  >
                  <textarea
                    id="reason"
                    v-model="leaveReason"
                    rows="2"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Enter reason for movement"
                    required
                  ></textarea>
                </div>
                <div class="mb-4">
                  <label
                    for="contact"
                    class="block text-sm font-medium mb-1"
                    >Contact During Movement</label
                  >
                  <input
                    id="contact"
                    v-model="contact"
                    type="text"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Enter contact details"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <RouterLink
                to="/movement"
                class="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </RouterLink>
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const themeClass = computed(() => {
  const theme = store.state.theme;
  return theme === "dark"
    ? "bg-slate-600 text-white custom-scrollbar"
    : "bg-gray-50 text-gray-800 custom-scrollbar";
});

// Form data
const leaveReason = ref("");
const leaveType = ref("single");
const fromDate = ref("");
const fromTime = ref("");
const toDate = ref("");
const toTime = ref("");
const contact = ref("");
const referenceEmployee = ref("");
const selectedLeaveType = ref("");

// Form methods
const submitForm = () => {
  // Handle form submission
  console.log("Form submitted");
};

const resetForm = () => {
  // Reset all form fields
  leaveReason.value = "";
  leaveType.value = "single";
  fromDate.value = "";
  fromTime.value = "";
  toDate.value = "";
  toTime.value = "";
  contact.value = "";
  referenceEmployee.value = "";
  selectedLeaveType.value = "";
};

const closeForm = () => {
  // Handle form close
  console.log("Form closed");
};
</script>
