<template>
  <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
    <div
      v-for="(stat, index) in stats"
      :key="index"
       :class="sectionCardClass"
      class="stat-card p-6 rounded-xl shadow-lg border-l-8 transition-all duration-300 hover:scale-105"
    >
      <div class="flex items-center">
        <!-- Stat Icon -->
        <div
          class="stat-icon p-4 rounded-full mr-4 border-2"
          :class="['stat-icon-bg', getStatBgColor(index)]"
        >
          <!-- Icon can be added here -->
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-800">{{ $t(stat.title) }}</h2>
          <p class="text-2xl font-bold text-gray-900">{{ $t(stat.value) }}</p>
          <span class="text-sm text-blue-500">{{ $t(stat.change) }}</span>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
export default {
  name: "Card2",
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
  computed:{
    sectionCardClass() {
      return this.$store.state.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 shadow-md';
    },
  },
  methods: {
    getStatBgColor(index) {
      // Define custom background colors for the icons
      const colors = ["bg-blue-500", "bg-sky-400", "bg-sky-500", "bg-sky-600"];
      return colors[index] || "bg-gray-500"; // Default to gray if index is out of bounds
    },
  },
};
</script>

<style scoped>
/* Responsive styles */
@media (max-width: 640px) {
  .stat-card {
    padding: 4px; /* Smaller padding for mobile */
  }

  .stat-icon {
    padding: 3px; /* Smaller icon for mobile */
  }

  .stat-card h2 {
    font-size: 1rem; /* Smaller title font size */
  }

  .stat-card p {
    font-size: 1.25rem; /* Adjust value font size for mobile */
  }
}

@media (min-width: 640px) {
  .stat-card {
    padding: 8px; /* Standard padding for small and up */
  }

  .stat-icon {
    padding: 6px; /* Standard icon size for small and up */
  }
}

@media (min-width: 1024px) {
  .stat-card {
    padding: 12px; /* Larger padding for larger screens */
  }

  .stat-icon {
    padding: 8px; /* Larger icon for large screens */
  }

  .stat-card h2 {
    font-size: 1.25rem; /* Larger title font size for larger screens */
  }

  .stat-card p {
    font-size: 1.5rem; /* Larger value font size */
  }
}
</style>
