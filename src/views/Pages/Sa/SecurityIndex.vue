<template>
  <div class="securitySection">
    <securityCards :cards="cards" />
  </div>
</template>

<script setup>
import securityCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "User Setup",
    icon: "fa-solid fa-calendar-plus",
    route: "/",
  }
];
</script>

<style scoped>
.securitySection {
  margin: 20px;
}
</style>
