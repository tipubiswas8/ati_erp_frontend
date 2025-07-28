<template>
  <!-- Right Section (Form) -->
  <div
    class="flex-1 flex items-center justify-center p-4 lg:p-8 rounded-none lg:rounded-r-3xl h-[84.8vh]"
  >
    <div
      class="relative w-full max-w-sm p-8 sm:p-10 bg-white rounded-xl lg:rounded-2xl shadow-2xl"
    >
      <!-- Logo -->
      <img
        src="@/assets/img/ati-small-logo.png"
        class="h-12 w-auto mx-auto mb-6 animate__animated animate__fadeIn"
        alt="Logo"
      />

      <!-- Form -->
      <form @submit.prevent="loginUser">
        <!-- Username Field -->
        <div class="mb-6">
          <input
            v-model="form.email"
            type="text"
            placeholder="Email"
            class="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out shadow-sm"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full p-3 sm:p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out shadow-sm"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full p-3 sm:p-4 bg-indigo-600 text-white rounded-md text-base sm:text-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Login from "@/components/js/Login";
export default {
  name: "Login",
  ...Login,
};
</script>
