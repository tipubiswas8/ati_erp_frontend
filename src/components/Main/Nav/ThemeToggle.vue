<template>
    <label class="relative inline-block w-14 h-8 ml-4">
      <input
        type="checkbox"
        @click="toggleTheme"
        :checked="theme === 'dark'"
        class="sr-only"
      />
      <span
        class="block absolute inset-0 rounded-full bg-gray-600 transition-all duration-300"
      ></span>
      <span
        :class="{ 'translate-x-6': theme === 'dark' }"
        class="block absolute inset-0 left-1 top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 transform"
      ></span>
      <span v-if="theme === 'dark'" class="absolute left-0 top-0 text-white text-xs px-2 py-2">🔆</span>
      <span v-if="theme === 'light'" class="absolute right-0 top-0 text-white text-xs px-2 py-2">🌙</span>
    </label>
  </template>
  
  <script>
  export default {
    name: "ThemeToggle",
    props: {
      theme: {
        type: String,
        required: true,
      },
    },
    methods: {
      toggleTheme() {
        this.$emit("toggleTheme");
      },
    },
  };
  </script>
  