<template>
  <nav
    :class="themeClass"
    class="shadow-lg shadow-grey-500/50 p-4 flex justify-between items-center z-20"
  >
    <!-- Toggle Sidebar Button -->
    <SidebarToggle
      @toggleSidebar="toggleSidebar"
      :theme="theme"
      class="hidden md:block"
    />

    <!-- Spacer between the elements -->
    <div class="flex-grow"></div>

    <!-- Language Selector -->
    <LanguageSelector v-model="selectedLanguage" />

    <!-- Toggle Sidebar Position -->
    <SidebarPositionToggle
      @togglePosition="togglePosition"
      :sidebarPosition="sidebarPosition"
    />

    <!-- Theme Toggle -->
    <ThemeToggle @toggleTheme="toggleTheme" :theme="theme" />

    <!-- Logout Button -->
    <LogoutButton @click="showModal.value = true" />

    <!-- Modal for logout confirmation -->
    <LogoutModal
      v-if="showModal.value"
      :isVisible="showModal.value"
      @close="showModal.value = false"
      @logout="logout"
    />
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SidebarToggle from "@/components/Main/Nav/SidebarToggle.vue";
import LanguageSelector from "@/components/Main/Nav/LanguageSelector.vue";
import SidebarPositionToggle from "@/components/Main/Nav/SidebarPositionToggle.vue";
import ThemeToggle from "@/components/Main/Nav/ThemeToggle.vue";
import LogoutButton from "@/components/Main/Nav/LogoutButton.vue";
import LogoutModal from "@/components/Modals/LogoutModal.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const router = useRouter();
const { locale } = useI18n ? useI18n() : { locale: ref("en") };

const showModal = ref(false);
const selectedLanguage = ref(locale.value);

const theme = computed(() => store.state.theme);
const sidebarPosition = computed(() => store.state.sidebarPosition);

const themeClass = computed(() =>
  theme.value === "dark"
    ? "bg-gray-700 text-white"
    : "bg-gray-100 text-black"
);

watch(selectedLanguage, (newLang) => {
  if (locale) locale.value = newLang;
});

watch(sidebarPosition, (newPosition) => {
  localStorage.setItem("sidebarPosition", newPosition);
});

watch(theme, (newTheme) => {
  localStorage.setItem("theme", newTheme);
});

onMounted(() => {
  const savedPosition = localStorage.getItem("sidebarPosition");
  const savedTheme = localStorage.getItem("theme");
  if (savedPosition) {
    store.commit("setSidebarPosition", savedPosition);
  }
  if (savedTheme) {
    store.commit("setTheme", savedTheme);
  }
});

function toggleSidebar() {
  // emits are not available in <script setup> by default, so use defineEmits
  emit("toggleSidebar");
}

function toggleTheme() {
  const newTheme = theme.value === "dark" ? "light" : "dark";
  store.dispatch("changeTheme", newTheme);
  store.commit("setTheme", newTheme);
}

function togglePosition() {
  const newPosition = sidebarPosition.value === "left" ? "right" : "left";
  store.commit("setSidebarPosition", newPosition);
  emit("toggle-sidebar-position", newPosition);
}

function logout() {
  localStorage.removeItem("token");
  router.push("/");
}

// For emits in <script setup>
const emit = defineEmits(["toggleSidebar", "toggle-sidebar-position"]);
</script>
