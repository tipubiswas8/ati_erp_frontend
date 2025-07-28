<template>
  <div class="leaveSection">
    <leaveCards :cards="cards" />
  </div>
</template>

<script setup>
import leaveCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "Apply Leave",
    icon: "fa-solid fa-calendar-plus",
    route: "/leave-management/apply-leave",
  },
  {
    name: "Leave History",
    icon: "fa-solid fa-clock-rotate-left",
    route: "/leave/history",
  },

  {
    name: "Apply Leave",
    icon: "fa-solid fa-calendar-plus",
    route: "/leave/apply/das",
  },
  {
    name: "Apply Leave",
    icon: "fa-solid fa-calendar-plus",
    route: "/leave/apply/asd",
  },
  {
    name: "Apply Leave",
    icon: "fa-solid fa-calendar-plus",
    route: "/leave/apply/we",
  },
];
</script>

<style scoped>
.leaveSection {
  margin: 20px;
}
</style>
