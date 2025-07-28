<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out opacity-100"
    @click.self="close"
    role="dialog"
    aria-labelledby="modal-title"
    aria-hidden="false"
    aria-describedby="modal-description"
    @keydown.esc="close"
    tabindex="0"
  >
    <!-- Modal Container -->
    <div
      :class="modal_class"
      class="rounded-3xl shadow-xl w-[90vw] max-w-5xl p-12 relative transform transition-transform duration-300 ease-in-out hover:scale-100 z-50 animate-fadeIn"
      @click.stop
      tabindex="0"
    >
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl transition-transform duration-200 transform hover:scale-110"
        aria-label="Close modal"
      >
        ✖
      </button>

      <!-- Modal Title -->
      <h2
        class="text-2xl font-semibold mb-6 text-center text-gray-800"
        id="modal-title"
      >
        {{ $t("Daily Task") }}
      </h2>
      <hr class="mb-4" />

      <!-- Form Section -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Project Name -->
        <div class="mb-6 flex flex-col">
          <label
            for="project_id"
            class="text-lg font-medium text-gray-900 mb-2"
            >{{ $t("Project Name") }}</label
          >
          <select
            id="project_id"
            v-model="form.project_id"
            class="border border-gray-300 rounded-lg p-3 text-gray-800"
            name="project_id"
          >
            <option value="" disabled selected>
              {{ $t("Select a project") }}
            </option>
            <option value="US">ATI ERP</option>
          </select>
        </div>

        <!-- Title -->
        <div class="mb-6 flex flex-col">
          <label for="title" class="text-lg font-medium text-gray-900 mb-2">{{
            $t("Title")
          }}</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            required
            class="border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder="Enter project title"
          />
        </div>

        <!-- Description -->
        <div class="mb-6 flex flex-col">
          <label
            for="description"
            class="text-lg font-medium text-gray-900 mb-2"
            >{{ $t("Description") }}</label
          >
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="block p-2.5 w-full text-sm border border-gray-300 rounded-lg"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <!-- Attachment -->
        <div class="mb-6 flex flex-col">
          <label
            for="attachment"
            class="text-lg font-medium text-gray-900 mb-2"
            >{{ $t("Attachment") }}</label
          >
          <input
            type="file"
            id="attachment"
            class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500"
          />
        </div>

        <hr />
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {{ $t("Submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // Form data model
      form: {
        project_id: "",
        name: "",
        description: "",
      },
    };
  },
  computed: {
    modal_class() {
      const theme = this.$store.state.theme;
      return theme === "dark"
        ? "bg-gray-800 text-white custom-scrollbar"
        : "bg-white text-gray-800 custom-scrollbar";
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitForm() {
      // Handle form submission
      console.log("Form submitted:", this.form);
      // You can handle the form data submission logic here
      this.close(); // Optionally close the modal after form submission
    },
  },
};
</script>

<style scoped>
/* Custom Tailwind Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Tailwind Animation Class */
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

/* Hover effects for icons */
i:hover {
  transform: scale(1.3);
  transition: transform 0.3s ease;
}
</style>
