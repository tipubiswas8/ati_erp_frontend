<template>
  <div :class="themeClass" class="flex flex-col overflow-hidden">
    <!-- Sidebar -->
    <div class="flex flex-grow flex-col">
      <Sidebar
        v-if="!isAuthPage"
        :isOpen="isSidebarOpen"
        :theme="theme"
        :position="sidebarPosition"
        :class="sidebarPosition === 'left' ? 'sidebar-left' : 'sidebar-right'"
      />
    </div>

    <div class="flex-1 flex flex-col relative">
      <!-- Navbar -->
      <Navbar
        v-if="!isAuthPage"
        @toggleSidebar="toggleSidebar"
        @toggle-sidebar-position="toggleSidebarPosition"
        :class="navbarClasses"
        class="fixed top-0 left-0 right-0 z-10"
      />

      <!-- Main Content -->
      <main
        :class="mainContentClasses"
        class="flex-1 overflow-y-auto mt-[69px] pb-[69px] no-scrollbar min-h-[92vh]"
      >
        <router-view />
      </main>

      <!-- Footer -->
      <Footer v-if="!isAuthPage" class="fixed bottom-0 left-0 right-0 z-10" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Navbar from "./components/Main/Nav/Navbar.vue";
import Sidebar from "./components/Main/Sidebar/Sidebar.vue";
import Footer from "./components/Main/Footer.vue";

const store = useStore();
const route = useRoute();

const getLocalStorage = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const isSidebarOpen = ref(true);
const sidebarPosition = ref(getLocalStorage("sidebarPosition", "left"));

const theme = computed(() => store.state.theme);

const isAuthPage = computed(() => {
  return route.name === "Login" || route.name === "Registration";
});

const navbarClasses = computed(() => {
  if (isAuthPage.value) return {};
  return {
    "ml-[14%]": isSidebarOpen.value && sidebarPosition.value === "left",
    "ml-[5%]": !isSidebarOpen.value && sidebarPosition.value === "left",
    "mr-[14%]": isSidebarOpen.value && sidebarPosition.value === "right",
    "mr-[5%]": !isSidebarOpen.value && sidebarPosition.value === "right",
  };
});

const mainContentClasses = computed(() => {
  if (isAuthPage.value) return {};
  return {
    "ml-[14%]": isSidebarOpen.value && sidebarPosition.value === "left",
    "ml-[5%]": !isSidebarOpen.value && sidebarPosition.value === "left",
    "mr-[14%]": isSidebarOpen.value && sidebarPosition.value === "right",
    "mr-[5%]": !isSidebarOpen.value && sidebarPosition.value === "right",
    "transition-all": true,
    ...(theme.value === "dark"
      ? { "bg-gray-800": true }
      : { "bg-gray-200": true }),
  };
});

const themeClass = computed(() =>
  theme.value === "dark" ? "dark-theme" : "light-theme"
);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function toggleSidebarPosition(position) {
  sidebarPosition.value = position;
  setLocalStorage("sidebarPosition", sidebarPosition.value);
}
</script>

<style scoped>
/* ...styles unchanged... */
* {
  font-family: var(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji"
  );
  
}

.dark-theme {
  background-color: #383e4e;
  color: white;
}

.light-theme {
  background-color: white;
  color: black;
}

/* Sidebar positioning styles */
.sidebar-left {
  position: fixed;
  top: 0;
  left: 0;
  height: calc(
    100% - 60px
  ); /* Subtract footer height (assuming 60px footer height) */
  width: 250px; /* Fixed width */
  z-index: 10;
  transition: left 0.3s ease;
}

.sidebar-right {
  position: fixed;
  top: 0;
  right: 0;
  height: calc(100% - 60px); /* Subtract footer height */
  width: 250px; /* Fixed width */
  z-index: 10;
  transition: right 0.3s ease;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
/* Navbar Styles */
.navbar-left {
  margin-left: 250px;
  transition: margin-left 0.3s ease-in-out;
}

.navbar-right {
  margin-right: 250px;
  transition: margin-right 0.3s ease-in-out;
}

.navbar-no-sidebar {
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  transition: margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out;
}

/* Main content styles */
.content {
  padding: 20px;
  transition: margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out;
}

/* Sidebar will be adjusted with content */
body:not(.auth-page) .sidebar-left,
body:not(.auth-page) .sidebar-right {
  /* Sidebar styles */
}

/* Footer */
footer {
  height: 60px; /* Assuming footer height */
  background-color: #f1f1f1;
}

/* Auth page specific styles */
.auth-page .content {
  margin-left: 0;
  margin-right: 0;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .sidebar-left,
  .sidebar-right {
    width: 70%; /* Adjust sidebar width on small screens */
  }

  .navbar-left,
  .navbar-right {
    margin-left: 0;
    margin-right: 0;
  }

  .content {
    margin-left: 0;
    margin-right: 0;
  }
}

@media screen and (max-width: 480px) {
  .sidebar-left,
  .sidebar-right {
    width: 100%; /* Make sidebar take full width on very small screens */
  }

  .content {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
