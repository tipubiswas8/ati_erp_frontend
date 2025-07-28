<template>
  <div :class="themeClass" class="p-6 min-h-screen">
    <span
      class="font-sans text-gray-400 font-bold text-sm absolute top-20 p-1"
      :class="themeClass"
      >Dashboard</span
    >
    <hr />
    <FloatingChat />
    <FloatingButtons />
    <div class="mt-6"><StatusCard :card3Data="card3Data" /></div>

    <div
      class="flex flex-col md:flex-row md:w-full space-y-6 md:space-y-0 md:space-x-6"
    >
      <div class="md:w-2/3">
        <WorkHourSummery />
      </div>
      <div class="md:w-2/2">
        <EmployeeGraphics />
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6 mt-6"
    >
      <div class="md:w-1/4">
        <ProjectOverView />
      </div>
      <div class="md:w-1/4">
        <UpcommingInverview/>
      </div>
      <div class="md:w-2/4">
        <YearlyCorporateOverView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import FloatingChat from "@/components/Main/Floating/FloatingChat.vue";
import StatusCard from "@/components/Dashboard/card.vue";
import FloatingButtons from "@/components/Main/Floating/FloatingButton.vue";
import WorkHourSummery from "@/components/Dashboard/WorkHourSummery.vue";
import EmployeeGraphics from "@/components/Dashboard/EmployeeGraphics.vue";
import ProjectOverView from "@/components/Dashboard/ProjectOverView.vue";
import UpcommingInverview from "@/components/Dashboard/UpcommingInverview.vue";
import YearlyCorporateOverView from "@/components/Dashboard/YearlyCorporateOverView.vue";

const store = useStore();

const themeClass = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-900 text-white custom-scrollbar"
    : "bg-gray-100 text-gray-800 custom-scrollbar"
);

const headerClass = ref("");
const card3Data = ref("");
const cpaData = ref("");
const statsData = ref([
  { title: "Sales", value: "$4,500", change: "+5%" },
  { title: "Revenue", value: "$12,000", change: "-3%" },
  { title: "Users", value: "2,000", change: "+10%" },
  { title: "Traffic", value: "1.5M", change: "+15%" },
]);
const activeListings = ref([
  { country: "United States", percent: 38.6 },
  { country: "Canada", percent: 22.5 },
  { country: "Mexico", percent: 30.8 },
  { country: "Other", percent: 8.1 },
]);
const properties = ref([
  { name: "Cedarwood Estates", price: "$200,000" },
  { name: "Lakeview Lofts", price: "$250,000" },
  { name: "Tranquil Oaks", price: "$350,000" },
]);
</script>

<style scoped>
.custom-scrollbar {
  overflow: auto;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
}

.custom-scrollbar {
  -ms-overflow-style: none; /* Hide the scrollbar in IE */
  scrollbar-width: none; /* Hide the scrollbar in Firefox */
}
</style>
