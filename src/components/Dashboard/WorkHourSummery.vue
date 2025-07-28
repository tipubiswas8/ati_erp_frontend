<template>
  <div
    class="grid grid-cols-1 rounded-xl border overflow-hidden w-full h-[438px] relative"
    :class="themeClass"
  >
    <div class="absolute left-6 top-8 font-semibold text-sm">
      Monthly Work Hour Summary
    </div>
    <div class="absolute left-[34px] top-[80px] w-[92%] max-w-full h-[320px]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <select
      class="absolute top-5 right-5 block w-40 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
      :class="themeClass"
    >
      <option value="" style="color: black">Select Year</option>
      <option value="2024" style="color: black">2024</option>
      <option value="2025" selected style="color: black">2025</option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme);
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const themeClass = computed(() =>
  theme.value === "dark" ? "dark_class" : "bg-white"
);

const chartData = ref({
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Work Hours",
      backgroundColor: "rgba(0,95,161,0.7)",
      borderRadius: 8,
      data: [8, 7, 6, 9, 8, 7, 8, 7, 8, 9, 7, 8], // Example hour data
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 2,
        callback: function (value) {
          // Convert to AM/PM label if needed
          const hour = value + 9;
          const period = hour >= 12 ? "PM" : "AM";
          const displayHour = hour > 12 ? hour - 12 : hour;
          return displayHour + " " + period;
        },
      },
      min: 0,
      max: 9,
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
});
</script>
<style scoped>
.dark_class {
  background-color: transparent;
}
</style>
