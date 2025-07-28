<template>
    <div class="grid grid-cols-10 p-2 bg-white shadow-md rounded-md">
        <router-link to="/setup/country-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Country
        </router-link>

        <router-link to="/setup/division-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Division
        </router-link>

        <router-link to="/setup/district-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            District
        </router-link>

        <router-link to="/setup/thana-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Thana
        </router-link>

        <router-link to="/setup/police-station-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Police Station
        </router-link>

        <router-link to="/setup/union-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Union
        </router-link>

        <router-link to="/setup/post-office-setup"
            class="block py-2 px-4 text-center border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-200">
            Post Office
        </router-link>
    </div>
</template>

<script setup lang="ts"></script>
