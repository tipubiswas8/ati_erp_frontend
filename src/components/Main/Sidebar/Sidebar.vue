<template>
  <div
    :class="['sidebar', positionClass, { 'sidebar-open': isOpen }]"
    :style="sidebarStyle"
    :data-theme="theme"
  >
    <!-- Sidebar Header -->
    <div class="h-16 mt-[7px] p-2 w-auto border-b-2" :class="logoClass">
      <router-link to="/dashboard">
        <img
          v-if="isOpen"
          src="@/assets/img/ati-logo.png"
          alt="Admin Panel"
          class="h-full"
        />
        <img
          v-else
          src="@/assets/img/ati-small-logo.png"
          alt="Admin Panel"
          class="h-full"
        />
      </router-link>
    </div>

    <!-- Sidebar Drag Handle -->
    <div class="sidebar-drag-handle" @mousedown="startDrag" v-if="isOpen"></div>

    <!-- Sidebar Menu -->
    <nav
      class="flex flex-col space-y-4 px-2 pb-2 pt-2 flex-grow overflow-y-auto max-h-screen"
    >
      <ul
        class="list-none space-y-1"
        @dragover.prevent
        @drop="onDrop"
        @dragenter.prevent
      >
        <li
          v-for="(item, index) in menuItems"
          :key="item.id"
          :data-index="index"
          class="relative"
          :draggable="item.id !== 'dashboard'"
          @dragstart="onDragStart(index, item)"
          @dragend="onDragEnd"
        >
          <button @click="handleItemClick(item)" :class="buttonClass(item)">
            <span
              v-if="isOpen && position === 'right'"
              class="ml-4 text-base font-medium hidden md:block"
              :title="isOpen && position === 'right' ? $t(item.label) : ''"
            >
              {{ $t(item.label) }}
            </span>
            <div :class="iconClass(item)">
              <i :class="item.icon" class="w-6 h-6 mt-2"></i>
            </div>
            <span
              v-if="isOpen && position !== 'right'"
              class="ml-4 text-base font-medium hidden md:block"
              :title="isOpen && position === 'right' ? $t(item.label) : ''"
            >
              {{ $t(item.label) }}
            </span>
          </button>

          <ul
            v-show="item.subItems && item.subItems.length && !item.collapsed"
            class="pl-4 space-y-2 mt-2"
          >
            <li
              v-for="sub in item.subItems"
              :key="sub.id"
              class="bg-gray-800 rounded-lg shadow-md"
            >
              <button
                @click="handleSubItemClick(sub)"
                :class="buttonClass(sub, true)"
              >
                <span
                  v-if="isOpen && position === 'right'"
                  class="ml-4 text-base font-medium hidden md:block"
                >
                  {{ $t(sub.label) }}
                </span>
                <div :class="iconClass(sub)">
                  <i :class="sub.icon" class="w-6 h-6 mt-2"></i>
                </div>
                <span
                  v-if="isOpen && position !== 'right'"
                  class="ml-4 text-base font-medium hidden md:block"
                  :title="isOpen && position === 'right' ? $t(sub.label) : ''"
                >
                  {{ $t(sub.label) }}
                </span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

// Props
const props = defineProps({
  theme: { type: String, required: true },
  position: { type: String, required: true },
  isOpen: { type: Boolean, default: false },
});

// Store and router
const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

// Reactive state
const isOpen = ref(props.isOpen);
watch(
  () => props.isOpen,
  (newVal) => (isOpen.value = newVal)
);

// Menu Items
const menuItems = ref([
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fas fa-tachometer-alt",
    route: "/dashboard",
  },
  {
    id: "security_access",
    label: "Security Access",
    icon: "fa-solid fa-shield-halved",
    route: "/seciurity-access",
  },
  {
    id: "setup",
    label: "Setup",
    icon: "fa-solid fa-gear",
    route: "/setup",
  },
  {
    id: "task_manager",
    label: "Task Manager",
    icon: "fa-solid fa-list-check",
    route: "/task-manager",
  },
  {
    id: "support",
    label: "Support",
    icon: "fa-solid fa-headset",
    collapsed: true,
    subItems: [
      {
        id: "add_ticket",
        label: "Add Ticket",
        route: "/task-manager/task-assign",
        icon: "fa-solid fa-plus-circle",
      },
      {
        id: "open_tickets_list",
        label: "Open Tickets List",
        route: "/task-manager/work-status",
        icon: "fa-solid fa-ticket-alt",
      },
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: "fa-solid fa-user-tie",
    collapsed: true,
    subItems: [
      {
        id: "hr_employee",
        label: "Employee",
        route: "/hr/employee",
        icon: "fa-solid fa-address-book",
      },
      {
        id: "hr_leave_management",
        label: "Leave Management",
        route: "/leave-management",
        icon: "fa-solid fa-book",
      },
      {
        id: "hr_movement",
        label: "Movement",
        route: "/movement",
        icon: "fa fa-suitcase",
      },
    ],
  },
]);

// Computed
const currentRoute = computed(() => route.path);
const positionClass = computed(() =>
  props.position === "right" ? "right-0" : "left-0"
);
const logoClass = computed(() =>
  props.theme === "dark" ? "border-gray-800" : "border-gray-200"
);
const sidebarStyle = computed(() => ({
  width: isOpen.value ? "14%" : "5%",
  transition: "width 0.3s ease-in-out",
}));

// Utility: icon class
const iconClass = (item) => ({
  "w-12 h-10 flex items-center justify-center transition-all": true,
  "rounded-l-full ml-auto": props.position === "right",
  "rounded-r-full": props.position !== "right",
  "bg-white-600 text-black": currentRoute.value === item.route,
  "bg-gray-400 text-gray-600": currentRoute.value !== item.route,
});

// Utility: button class
const buttonClass = (item, isSub = false) => {
  const active = currentRoute.value === item.route;
  const baseClasses = [
    "flex items-center w-full hover:text-white hover:bg-gray-500 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50",
  ];
  const themeClasses =
    props.theme === "dark"
      ? isSub
        ? "bg-gray-800 text-white"
        : "text-gray-300 bg-gray-700"
      : isSub
      ? "bg-gray-300 text-gray-900"
      : "text-gray-900 bg-gray-100";

  const activeClasses = active
    ? "bg-blue-600 text-white border-l-4 border-blue-500"
    : "";

  return [themeClasses, ...baseClasses, activeClasses];
};

// Item click
const handleItemClick = (item) => {
  if (item.subItems && item.subItems.length) {
    menuItems.value.forEach((menuItem) => {
      if (menuItem !== item) menuItem.collapsed = true;
    });
    item.collapsed = !item.collapsed;
  } else {
    router.push(item.route);
  }
};

const handleSubItemClick = (subItem) => router.push(subItem.route);

// Drag and Drop
let draggedItemIndex = null;

const onDragStart = (index, item) => {
  if (item.id !== "dashboard") draggedItemIndex = index;
};

const onDragEnd = () => {
  draggedItemIndex = null;
};

const onDrop = (event) => {
  const targetIndex = parseInt(event.target.closest("li")?.dataset.index, 10);
  if (
    draggedItemIndex !== null &&
    draggedItemIndex !== targetIndex &&
    targetIndex !== 0
  ) {
    const draggedItem = menuItems.value[draggedItemIndex];
    menuItems.value.splice(draggedItemIndex, 1);
    menuItems.value.splice(targetIndex, 0, draggedItem);
  }
};

// Optional dummy drag handle logic
const startDrag = () => {
  // Placeholder: implement resize drag if needed
};
</script>

<style>
/* Base Sidebar Styles */
.sidebar button,
.sidebar button i {
  transition: color 0.3s ease;
  /* Smooth transition for color changes */
}

/* Dark theme - Ensure all text and icons are white */
.sidebar[data-theme="dark"] button {
  color: white;
  /* All text white in dark theme */
}

.sidebar[data-theme="dark"] button i {
  color: white;
  /* Icons are white in dark theme */
}

.sidebar[data-theme="dark"] .sidebar-drag-handle {
  background-color: #333;
  /* Darker drag handle */
}

/* Light theme - Ensure all text and icons are dark */
.sidebar[data-theme="light"] button {
  color: #1f2937;
  /* Dark gray text (gray-900) for light theme */
}

.sidebar[data-theme="light"] button i {
  color: #1f2937;
  /* Dark gray icons (gray-900) for light theme */
}

.sidebar[data-theme="light"] .sidebar-drag-handle {
  background-color: #ccc;
  /* Lighter drag handle */
}

/* Additional styles to ensure the overall design looks great */
.sidebar {
  background-color: #fff;
  /* Default white background */
}

.sidebar[data-theme="dark"] {
  background-color: oklch(0.446 0.03 256.802);
  /* Darker background for dark theme */
}

.sidebar[data-theme="light"] {
  background-color: #f9f9f9;
  /* Light background for light theme */
}

.sidebar button:hover {
  background-color: #4a5568;
  /* Hover effect for dark theme */
}

.sidebar[data-theme="dark"] button:hover {
  background-color: #4a5568;
  /* Hover effect for dark theme */
}

.sidebar[data-theme="light"] button:hover {
  background-color: #e2e8f0;
  /* Hover effect for light theme */
}

.sidebar button:focus {
  outline: none;
  /* Remove the default outline on focus */
}
</style>
