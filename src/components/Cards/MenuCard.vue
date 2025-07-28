<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
  >
    <a
      v-for="(card, index) in cards"
      :key="card.name"
      href="#"
      @click.prevent="goTo(card.route)"
      :class="themeClass"
      class="p-7 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
    >
      <div>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight">
          {{ card.name }}
        </h5>
        <div
          class="inline-flex font-medium items-center mt-2"
          :class="linkClass"
        >
          View more
          <svg
            class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </div>
      </div>
      <i
        :class="
          card.icon + ' text-2xl p-2 rounded-md text-white ' + getBgColor(index)
        "
      ></i>
    </a>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const themeClass = computed(() => {
  const theme = store.state.theme;
  return theme === "dark"
    ? "bg-slate-600 text-white"
    : "bg-gray-50 text-gray-900";
});
const linkClass = computed(() => {
  const theme = store.state.theme;
  return theme === "dark" ? "text-green-500" : "text-blue-600";
});

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

function goTo(route) {
  router.push(route);
}

const bgColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-orange-400",
  "bg-cyan-400",
];

function getBgColor(index) {
  return bgColors[index % bgColors.length];
}
</script>
