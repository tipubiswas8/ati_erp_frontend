<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme);

const themeClass = computed(() =>
  theme.value === "dark" ? "dark_class" : "bg-white"
);

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const chartData = {
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
      label: "Yearly Overview",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      data: [
        25000, 3900, 10000, 40000, 3900, 8000, 40000, 13000, 45000, 16400, 7100,
        20000,
      ],
      fill: true,
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Yearly Corporate Overview",
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          if (value >= 1000) {
            return "$" + value / 1000 + "K";
          }
          return "$" + value;
        },
      },
    },
  },
};
</script>
<template>
  <div class="w-full h-full rounded-xl p-6 border" :class="themeClass">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.dark_class {
  background-color: transparent;
}
</style>
