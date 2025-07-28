<template>
  <div class="section">
    <TaskCards :cards="cards" />
  </div>
</template>

<script setup>
import TaskCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "Create Task",
    icon: "fa-brands fa-atlassian",
    route: "/task-manager/task-assign",
  },
  {
    name: "Task Assign",
    icon: "fa-solid fa-briefcase",
    route: "/task-manager/work-status",
  },
];
</script>

<style scoped>
.section {
  margin: 20px;
}
</style>
