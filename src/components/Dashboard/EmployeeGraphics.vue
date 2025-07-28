<template>
  <div
    class="grid grid-cols-1 rounded-xl h-[438px] overflow-hidden relative w-[624px] border"
    :class="themeClass"
  >
    <div
      class="font-semibold text-[14px] absolute left-8 top-[31px] whitespace-nowrap"
      :class="themeClass"
    >
      Employee Demographics
    </div>
    <div class="h-[45%] left-8 absolute top-[35%] w-full">
      <Doughnut :data="data" :options="options" />
      <div
        class="text-[#2b6cb0] font-semibold text-[36px] absolute left-[71px] top-[75px] whitespace-nowrap"
      >
        150
      </div>
      <div
        class="text-[#a0aec0] font-medium text-[14px] absolute left-[62px] top-[112px] whitespace-nowrap"
      >
        Employees
      </div>
    </div>

    <div
      class="bg-[#f7fafc] rounded-lg h-[140px] left-[260px] overflow-hidden absolute top-[107px] w-[160px]"
    >
      <div
        class="bg-[#41B883] rounded h-[12px] left-[20px] absolute top-[20px] w-[12px]"
      ></div>
      <div
        class="text-[#2d3748] font-medium text-[12px] absolute left-[40px] top-[21px] whitespace-nowrap"
      >
        Development
      </div>
      <div
        class="text-[#2d3748] font-semibold text-[20px] absolute left-[20px] top-[85px] whitespace-nowrap"
      >
        40%
      </div>
    </div>

    <div
      class="bg-[#f7fafc] rounded-lg h-[140px] left-[432px] overflow-hidden absolute top-[107px] w-[160px]"
    >
      <div
        class="bg-[#E46651] rounded h-[12px] left-[20px] absolute top-[20px] w-[12px]"
      ></div>
      <div
        class="text-[#2d3748] font-medium text-[12px] absolute left-[40px] top-[21px] whitespace-nowrap"
      >
        Design
      </div>
      <div
        class="text-[#2b6cb0] font-semibold text-[20px] absolute left-[20px] top-[85px] whitespace-nowrap"
      >
        20%
      </div>
    </div>

    <div
      class="bg-[#f7fafc] rounded-lg h-[140px] left-[432px] overflow-hidden absolute top-[259px] w-[160px]"
    >
      <div
        class="bg-[#00D8FF] rounded h-[12px] left-[20px] absolute top-[20px] w-[12px]"
      ></div>
      <div
        class="text-[#2d3748] font-medium text-[12px] absolute left-[40px] top-[21px] w-[94px]"
      >
        HR &amp; Administration
      </div>
      <div
        class="text-[#2b6cb0] font-semibold text-[20px] absolute left-[20px] top-[85px] whitespace-nowrap"
      >
        40%
      </div>
    </div>

    <div
      class="bg-[#f7fafc] rounded-lg h-[140px] left-[260px] overflow-hidden absolute top-[259px] w-[160px]"
    >
      <div
        class="bg-[#DD1B16] rounded h-[12px] left-[20px] absolute top-[20px] w-[12px]"
      ></div>
      <div
        class="text-[#2d3748] font-medium text-[12px] absolute left-[40px] top-[21px] whitespace-nowrap"
      >
        Marketing
      </div>
      <div
        class="text-[#2b6cb0] font-semibold text-[20px] absolute left-[20px] top-[85px] whitespace-nowrap"
      >
        20%
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

const store = useStore();
const theme = computed(() => store.state.theme);

const themeClass = computed(() =>
  theme.value === "dark" ? "dark_class text-white" : "bg-white"
);

ChartJS.register(ArcElement, Tooltip, Legend);

const data = ref({
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 40, 20],
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
<style scoped>
.dark_class {
  background-color: transparent;
}
</style>
scriptstyle