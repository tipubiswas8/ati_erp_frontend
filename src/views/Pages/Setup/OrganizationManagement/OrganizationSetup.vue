<template>
    <div class="grid grid-cols-10 p-2 bg-white shadow-md rounded-md">
        <router-link to="/setup/organization/organization"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Organization
        </router-link>

        <router-link to="/setup/organization/department"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Department
        </router-link>

        <router-link to="/setup/organization/designation"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Designation
        </router-link>
    </div>
</template>

<script setup lang="ts"></script>