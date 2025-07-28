<template>
  <div class="employeeSection">
    <employeeCards :cards="cards" />
  </div>
</template>

<script setup>
import employeeCards from "@/components/Cards/MenuCard.vue";

const cards = [
  {
    name: "Current Employee",
    route: "/employee/current_employee_list",
    icon: "fa-solid fa-users",
  },
  {
    name: "Employee Contact List",
    route: "/employee/employee_contact_list",
    icon: "fa-solid fa-address-book",
  },
  {
    name: "Former Employee",
    route: "/employee/former_employee_list",
    icon: "fa-solid fa-user-slash",
  },
  {
    name: "Employee Self Status",
    route: "/employee/employee_self_status",
    icon: "fa-solid fa-user-check",
  },
  {
    name: "Print Employee",
    route: "/employee/print_employee_list",
    icon: "fa-solid fa-print",
  },
];
</script>

<style scoped>
.employeeSection {
  margin: 20px;
}
</style>
