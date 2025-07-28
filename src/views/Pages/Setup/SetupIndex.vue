<template>
  <div class="setupSection">
    <setupCards :cards="cards" />
  </div>
  <div>

  </div>
</template>

<script setup>
import setupCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "Organization Management",
    icon: "fa-solid fa-calendar-plus",
    route: "/setup/orzanization-setup",
  },
  {
    name: "Lookup Setup",
    icon: "fa-solid fa-magnifying-glass",
    route: "/setup/lookup-setup",
  },
  {
    name: "Address Setup",
    icon: "fa-solid fa-clock-rotate-left",
    route: "/setup/address-setup",
  },
  {
    name: "Institute Setup",
    icon: "fa-solid fa-calendar-plus",
    route: "/setup/institute-setup",
  },
  {
    name: "Shift Setup",
    icon: "fa-solid fa-clock",
    route: "/setup/shift-setup",
  }
];
</script>

<style scoped>
.setupSection {
  margin: 20px;
}
</style>
