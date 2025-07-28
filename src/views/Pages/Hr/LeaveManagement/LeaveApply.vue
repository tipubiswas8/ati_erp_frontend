<template>
  <div :class="themeClass" class="overflow-hidden rounded-lg shadow-xl p-6 font-bold m-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-7">
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
          <form>
            <div class="space-y-5">
              <fieldset>
                <div class="flex flex-col space-y-4">
                  <!-- Leave Duration Options -->
                  <label class="text-sm/6 font-medium text-gray-900">
                    Select Leave Duration <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center gap-x-3">
                    <div class="flex items-center gap-x-6">
                      <div class="flex items-center gap-x-3">
                        <input id="leave-half" v-model="leaveType" value="half" name="leave-duration" type="radio"
                          class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600" />
                        <label for="leave-half" class="block text-sm/6 font-medium text-gray-900">Half</label>
                      </div>
                      <div class="flex items-center gap-x-3">
                        <input id="leave-single" v-model="leaveType" value="single" name="leave-duration" type="radio"
                          checked
                          class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600" />
                        <label for="leave-single" class="block text-sm/6 font-medium text-gray-900">Single</label>
                      </div>
                      <div class="flex items-center gap-x-3">
                        <input id="leave-multiple" v-model="leaveType" value="multiple" name="leave-duration"
                          type="radio"
                          class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600" />
                        <label for="leave-multiple" class="block text-sm/6 font-medium text-gray-900">Multiple</label>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div class="flex flex-col space-y-2">
                  <!-- Leave Duration Options -->
                  <label class="text-sm/6 font-medium text-gray-900">
                    Leave Reason<span class="text-red-500">*</span>
                  </label>
                  <input id="leaversn" name="leaversn" type="text" autocomplete="off"
                </div>
              </fieldset>

              <div class="border-gray-900/10 pb-12">
                <h2 class="text-base/7 font-semibold text-gray-900">
                  Leave Date and Time information
                  <span class="text-red-500">*</span>
                </h2>
                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="start-date" class="block text-sm/6 font-medium text-gray-900">From Date</label>
                    <div class="mt-2">
                      <input type="date" name="first-name" id="first-name" autocomplete="given-name"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium text-gray-900">To Date</label>
                    <div class="mt-2">
                      <input type="date" name="last-name" id="last-name" autocomplete="family-name"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="start-date" class="block text-sm/6 font-medium text-gray-900">Start Time</label>
                    <div class="mt-2">
                      <input type="time" name="first-name" id="first-name" autocomplete="given-name"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium text-gray-900">End Time</label>
                    <div class="mt-2">
                      <input type="time" name="last-name" id="last-name" autocomplete="family-name"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="country" class="block text-sm/6 font-medium text-gray-900">Leave Type <span
                        class="text-red-500">*</span></label>
                    <div class="mt-2 grid grid-cols-1">
                      <select id="country" name="country" autocomplete="country-name"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        <option>Select Leave Type</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <svg
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="country" class="block text-sm/6 font-medium text-gray-900">Reference Employee
                      <span class="text-red-500">*</span></label>
                    <div class="mt-2 grid grid-cols-1">
                      <select id="country" name="country" autocomplete="country-name"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        <option>Select Employee</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <svg
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                </div>

              </div>

            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" class="text-sm/6 font-semibold text-gray-900">
                Cancel
              </button>
              <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-span-5">
        <div class="grid grid-cols-12 gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
          <div class="col-span-6 border p-3 rounded-md text-center">
            <span class="text-lg"> Sick Leave</span>
            <hr class="mt-2" />
            <div class="flex text-sm mt-4 ml-3">
              <span>Allocation: 10</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Achieved: 09</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Enjoyed: 04</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Remaning: 05</span>
            </div>
            <div class="mt-4">
              <a-progress type="circle" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" :percent="32" />
            </div>
          </div>
          <div class="col-span-6 border p-3 rounded-md text-center">
            <span class="text-lg">Earn Leave</span>
            <hr class="mt-2" />
            <div class="flex text-sm mt-4 ml-3">
              <span>Allocation: 10</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Achieved: 09</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Enjoyed: 04</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Remaning: 05</span>
            </div>
            <div class="mt-4">
              <a-progress type="circle" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" :percent="32" />
            </div>
          </div>
          <div class="col-span-6 border p-3 rounded-md text-center">
            <span class="text-lg">Leave Without Pay</span>
            <hr class="mt-2" />
            <div class="flex text-sm mt-4 ml-3">
              <span>Allocation: 10</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Achieved: 09</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Enjoyed: 04</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Remaning: 05</span>
            </div>
            <div class="mt-4">
              <a-progress type="circle" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" :percent="32" />
            </div>
          </div>
          <div class="col-span-6 border p-3 rounded-md text-center">
            <span class="text-lg">Casual Leave</span>
            <hr class="mt-2" />
            <div class="flex text-sm mt-4 ml-3">
              <span>Allocation: 10</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Achieved: 09</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Enjoyed: 04</span>
            </div>
            <div class="flex text-sm mt-1 ml-3">
              <span>Remaning: 05</span>
            </div>
            <div class="mt-4">
              <a-progress type="circle" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" :percent="32" />
            </div>
          </div>
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
