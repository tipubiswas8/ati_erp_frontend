<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import "./../../assets/css/dashboardCard.css";

const store = useStore();

const data = ref([
  {
    id: 1,
    title: "Employee",
    value: "109",
    professionals: "100",
    staff: "34",
  },
  {
    id: 2,
    title: "Schedule",
    value: "102",
    professionals: "94",
    staff: "11",
  },
  {
    id: 3,
    title: "Attendance",
    value: "74",
    professionals: "69",
    staff: "09",
  },
  {
    id: 4,
    title: "Leave",
    value: "01",
    professionals: "01",
    staff: "00",
  },
  {
    id: 5,
    title: "Movement",
    value: "16",
    professionals: "09",
    staff: "00",
  },
  {
    id: 6,
    title: "Absent",
    value: "10",
    professionals: "08",
    staff: "02",
  },
]);

const dynamicCard = ref([
  {
    icon: "fa-solid fa-user-group",
    icon_color: "emp_icon_color",
    card_bg: "emp_card_bg",
    circle: "emp_circle",
  },
  {
    icon: "fa-regular fa-clock",
    icon_color: "sche_icon_color",
    card_bg: "schedule_card_bg",
    circle: "schedule_circle",
  },
  {
    icon: "fa-solid fa-clipboard-user",
    icon_color: "atten_icon_color",
    card_bg: "atte_card_bg",
    circle: "atte_circle",
  },
  {
    icon: "fa-solid fa-person-walking-arrow-right",
    icon_color: "lea_icon_color",
    card_bg: "lea_card_bg",
    circle: "lea_circle",
  },
  {
    icon: "fa-solid fa-route",
    icon_color: "move_icon_color",
    card_bg: "move_card_bg",
    circle: "move_circle",
  },
  {
    icon: "fa-solid fa-user-minus",
    icon_color: "abs_icon_color",
    card_bg: "absen_card_bg",
    circle: "absen_circle",
  },
]);

const sectionCardClass = computed(() =>
  store.state.theme === "dark"
    ? "bg-gray-700 text-white"
    : "text-black shadow-md"
);
</script>
<template>
  <div
    theme
    class="metrics grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
  >
    <div v-for="(item, key) in data" :key="item.id">
      <div
        :class="[
          sectionCardClass,
          dynamicCard[key].card_bg,
          'relative w-full h-[200px] sm:h-[175px] rounded-xl shadow-2xl p-5 overflow-hidden',
        ]"
      >
        <div class="grid grid-cols-12 p-1">
          <div class="col-span-10 text-left">
            <h2 class="font-bold">{{ item.title }}</h2>
            <span class="font-bold text-4xl">{{ item.value }}</span>
          </div>
          <div class="col-span-2 text-3xl" :class="dynamicCard[key].icon_color">
            <i :class="dynamicCard[key].icon"></i>
          </div>
        </div>

        <div class="mt-4 text-sm card_text_color">
          <div class="flex justify-between">
            <div>Professionals</div>
            <div>{{ item.professionals }}</div>
          </div>

          <div class="flex justify-between mt-2">
            <div>Staff</div>
            <div>{{ item.staff }}</div>
          </div>
        </div>
        <div :class="dynamicCard[key].circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* attachment */
</style>
