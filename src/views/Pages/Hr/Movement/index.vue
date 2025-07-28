<template>
  <div class="section">
    <TaskCards :cards="cards" />
  </div>
</template>

<script setup>
import TaskCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "Add Movement",
    icon: "fa fa-plus-square",
    route: "/add-movement",
  },
  {
    name: "All Movement",
    icon: "fa fa-list",
    route: "/all-movement",
  },
];
</script>

<style scoped>
.section {
  margin: 20px;
}
</style>
