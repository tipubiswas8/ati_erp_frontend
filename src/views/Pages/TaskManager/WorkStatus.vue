<template>
  <div :class="themeClass" class="overflow-hidden rounded-lg shadow-xl p-6 m-6">
    <h1 class="text-2xl font-bold text-center mb-4">
      {{ $t("Work Status") }}
    </h1>
    <RouterLink
      to="/task-manager"
      class="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors duration-150 absolute"
    >
      ← {{ $t("Back") }}
    </RouterLink>
    <p class="text-center text-gray-600 mb-6">
      {{ $t("Manage your tasks efficiently") }}
    </p>
    <hr class="mb-4" />
    <div class="grid grid-cols-6">
      <!-- Projects Column -->
      <div
        class="border-r-2 h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Projects") }}</p>
          <hr />
        </div>
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          @click="loadTasksToToday(project.project_id, project.project_slug)"
          :class="{
            'bg-blue-950 text-white': selectedProjectId === project.project_id,
            'bg-blue-200': selectedProjectId !== project.project_id,
          }"
          class="mx-auto mt-4 rounded-lg border border-cyan-200 px-2 py-2 my-2 w-60 shadow-lg relative flex flex-col items-center text-black hover:text-primary cursor-pointer transition-all duration-200 ease-linear hover:bg-blue-950 transform hover:scale-105 hover:text-white"
        >
          <div class="text-lg font-semibold mb-2">
            {{ project.project_name }}
          </div>
          <span
            class="absolute inline-flex items-center justify-center w-7 h-7 text-sm font-bold text-white bg-rose-600 border-2 border-white rounded-full -top-3 -end-3"
          >
            {{ project.total_tasks }}
          </span>
        </div>
      </div>

      <!-- Task Columns -->
      <div
        class="border-r-2 h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide transition-colors"
        :class="hoverBgColor"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Tasks") }}</p>
          <hr />
        </div>
        <div
          v-for="task in todayTasks"
          :key="task.id"
          draggable="true"
          @dragstart="dragstartHandler($event, task)"
          class="mx-auto hover:cursor-pointer bg-teal-200/30 rounded border border-cyan-200 px-3 py-3 my-2 w-60 mt-2 shadow-sm relative text-black hover:text-primary"
        >
          <div class="text-center font-bold mb-3">{{ task.title }}</div>
          <div
            v-if="task.task_labels.length > 0"
            class="border-t-2 border-black pt-1 mt-2"
          >
            <span class="text-xs"
              ><u><b>Labels -</b></u></span
            >
            <ul class="items-center gap-2 mt-2 list-disc list-inside text-sm">
              <li v-for="label in task.task_labels" :key="label">
                {{ label.length > 25 ? label.slice(0, 25) + "..." : label }}
              </li>
            </ul>
          </div>
          <span class="text-sm border-t-2 border-black pt-2">
            <marquee
              v-if="task.forecasted_date"
              behavior=""
              direction=""
              scrollamount="4"
              >⏰ Delivery at {{ formatDate(task.forecasted_date) }}</marquee
            >
            <marquee v-else behavior="" direction="" scrollamount="4"
              >📢 Created at {{ formatDate(task.created_at) }}</marquee
            >
          </span>
          <span class="absolute top-0 right-4 text-lg"
            ><a
              href="#"
              @click="openMemberModal(task)"
              aria-label="Add New Member"
              >...</a
            >
          </span>
        </div>
      </div>

      <!-- Urgent Columns -->
      <div
        class="border-r-2 h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide transition-colors"
        :class="hoverBgColor"
        @drop="dropHandler($event, '1')"
        @dragover="dragoverHandler($event)"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Urgent") }}</p>
          <hr />
        </div>
        <div
          v-for="task in urgentTasks"
          :key="task.id"
          draggable="true"
          @dragstart="dragstartHandler($event, task)"
          class="mx-auto hover:cursor-pointer bg-violet-200/30 rounded border border-cyan-200 px-3 py-3 my-2 w-60 mt-2 shadow-sm relative text-black hover:text-primary"
        >
          <div class="text-center font-bold mb-3">{{ task.title }}</div>
          <div
            v-if="task.task_labels.length > 0"
            class="border-t-2 border-black pt-1 mt-2"
          >
            <span class="text-xs"
              ><u><b>Labels -</b></u></span
            >
            <ul class="items-center gap-2 mt-2 list-disc list-inside text-sm">
              <li v-for="label in task.task_labels" :key="label">
                {{ label.length > 25 ? label.slice(0, 25) + "..." : label }}
              </li>
            </ul>
          </div>
          <span class="text-sm border-t-2 border-black pt-2">
            <marquee
              v-if="task.forecasted_date"
              behavior=""
              direction=""
              scrollamount="4"
              >⏰ Delivery date {{ formatDate(task.forecasted_date) }}</marquee
            >
            <span v-else
              >📢 Delivery date {{ formatDate(task.forecasted_date) }}</span
            >
          </span>
          <span class="absolute top-1 right-4"
            ><a
              href="#"
              @click="openMemberModal(task)"
              aria-label="Add New Member"
              >...</a
            >
          </span>
        </div>
      </div>

      <!-- Ongoing Columns -->
      <div
        :class="hoverBgColor"
        class="border-r-2 h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide transition-colors"
        @drop="dropHandler($event, '2')"
        @dragover="dragoverHandler($event)"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Ongoing") }}</p>
          <hr />
        </div>
        <div
          v-for="task in ongoingTasks"
          :key="task.id"
          draggable="true"
          @dragstart="dragstartHandler($event, task)"
          class="mx-auto hover:cursor-pointer bg-lime-200 rounded border border-cyan-200 px-3 py-3 my-2 w-60 mt-2 shadow-sm relative text-black hover:text-primary"
        >
          <div class="text-center font-bold">{{ task.title }}</div>
          <div class="border-t-2 border-b-2 border-black pt-1 mt-2">
            <div v-if="task.task_labels.length > 0">
              <span class="text-xs"
                ><u><b>Labels -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-sm">
                <li v-for="label in task.task_labels" :key="label">
                  {{ label.length > 25 ? label.slice(0, 25) + "..." : label }}
                </li>
              </ul>
            </div>
            <div v-if="task.task_history.length > 0">
              <span class="text-xs"
                ><u><b>History -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-xs">
                <li v-for="history in task.task_history">
                  <span v-if="history.end_time"
                    >{{ history.start_time }} - {{ history.end_time }} =
                    {{ history.duration_minutes }} min.</span
                  >
                  <span v-else
                    >{{ history.start_time }} -
                    <picture>
                      <source
                        srcset="
                          https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.webp
                        "
                        type="image/webp"
                      />
                      <img
                        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.gif"
                        alt="🍿"
                        width="32"
                        height="32"
                      />
                    </picture>
                    Running...</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <span class="text-sm text-normal">
            <marquee
              v-if="task.forecasted_date"
              behavior=""
              direction=""
              scrollamount="4"
              class="flex items-start"
              >⏰ Delivery date {{ formatDate(task.forecasted_date) }}</marquee
            >
            <span v-else>
              📢 Delivery date
              {{ formatDate(task.forecasted_date) }}
            </span>
          </span>
          <span class="absolute top-1 right-4"
            ><a
              href="#"
              @click="openMemberModal(task)"
              aria-label="Add New Member"
              >...</a
            >
          </span>
        </div>
      </div>

      <!-- Stop Columns -->
      <div
        :class="hoverBgColor"
        class="border-r-2 h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide transition-colors"
        @drop="dropHandler($event, '3')"
        @dragover="dragoverHandler($event)"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Stop") }}</p>
          <hr />
        </div>
        <div
          v-for="task in stopTasks"
          :key="task.id"
          draggable="true"
          @dragstart="dragstartHandler($event, task)"
          class="mx-auto hover:cursor-pointer bg-red-300/30 rounded border border-cyan-200 px-3 py-3 my-2 w-60 mt-2 shadow-sm relative text-black hover:text-primary"
        >
          <div class="text-center font-bold">{{ task.title }}</div>
          <div class="border-t-2 border-b-2 border-black pt-1 mt-2">
            <div v-if="task.task_labels.length > 0">
              <span class="text-xs"
                ><u><b>Labels -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-sm">
                <li v-for="label in task.task_labels" :key="label">
                  {{ label.length > 25 ? label.slice(0, 25) + "..." : label }}
                </li>
              </ul>
            </div>
            <div v-if="task.task_history.length > 0">
              <span class="text-xs"
                ><u><b>History -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-xs">
                <li v-for="history in task.task_history">
                  {{ history.start_time }} - {{ history.end_time }} =
                  {{ history.duration_minutes }} min.
                </li>
              </ul>
            </div>
          </div>
          <span class="text-sm">
            <marquee
              v-if="task.forecasted_date"
              behavior=""
              direction=""
              scrollamount="4"
              >⏰ Delivery date {{ formatDate(task.forecasted_date) }}</marquee
            >
            <span v-else
              >📢 Delivery date {{ formatDate(task.forecasted_date) }}</span
            >
          </span>
          <span class="absolute top-1 right-4"
            ><a
              href="#"
              @click="openMemberModal(task)"
              aria-label="Add New Member"
              >...</a
            >
          </span>
        </div>
      </div>

      <!-- finished Columns -->
      <div
        :class="hoverBgColor"
        class="h-[50vh] w-full min-h-[74vh] overflow-y-scroll scrollbar-hide transition-colors"
        @drop="dropHandler($event, '4')"
        @dragover="dragoverHandler($event)"
      >
        <div
          class="sticky top-0 z-10 bg-gray-50 text-center font-bold"
          :class="themeClass"
        >
          <p class="pb-1">{{ $t("Finished") }}</p>
          <hr />
        </div>
        <div
          v-for="task in finishedTasks"
          :key="task.id"
          class="mx-auto bg-green-200/30 rounded border border-cyan-200 px-3 py-3 my-2 w-60 mt-2 shadow-sm relative text-black hover:text-primary"
        >
          <div class="text-center font-bold">{{ task.title }}</div>
          <div class="border-t-2 border-black pt-1 mt-2">
            <div v-if="task.task_labels.length > 0">
              <span class="text-xs"
                ><u><b>Labels -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-sm">
                <li v-for="label in task.task_labels" :key="label">
                  {{ label.length > 25 ? label.slice(0, 25) + "..." : label }}
                </li>
              </ul>
            </div>
            <div v-if="task.task_history.length > 0">
              <span class="text-xs"
                ><u><b>History -</b></u></span
              >
              <ul class="items-center gap-2 mt-2 list-disc list-inside text-xs">
                <li v-for="history in task.task_history">
                  {{ history.start_time }} - {{ history.end_time }} =
                  {{ history.duration_minutes }} min.
                </li>
              </ul>
            </div>
            <span class="border-t-2 border-black text-sm text-normal flex pt-1">
              <span
                v-if="task.finished_at > task.forecasted_date"
                class="text-[#ff1a1a] font-bold flex"
                ><picture>
                  <source
                    srcset="
                      https://fonts.gstatic.com/s/e/notoemoji/latest/26a0_fe0f/512.webp
                    "
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/26a0_fe0f/512.gif"
                    alt="⚠"
                    width="25"
                    height="25"
                  />
                </picture>
                Finished at {{ formatDate(task.finished_at) }}</span
              >
              <span v-else
                >⏰ Finished at {{ formatDate(task.finished_at) }}</span
              >
              <picture>
                <source
                  srcset="
                    https://fonts.gstatic.com/s/e/notoemoji/latest/1f38a/512.webp
                  "
                  type="image/webp"
                />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f38a/512.gif"
                  alt="🎊"
                  width="40"
                  height="40"
                />
              </picture>
            </span>
          </div>
          <span class="absolute top-1 right-4"
            ><a
              href="#"
              @click="openMemberModal(task)"
              aria-label="Add New Member"
              >...</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Adding a New Member -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <AddNewMember
        :isOpen="isModalOpen"
        :task-data="taskData"
        :themeClass="themeClass"
        @close="closeSupportModal"
        @update_task="loadTasksToToday"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import AddNewMember from "@/components/Modals/AddMemberModal.vue";
import { useToast } from "vue-toastification";
import { globals } from "@/config/globals";
import dayjs from "dayjs";
const toast = useToast();
const store = useStore();
const isModalOpen = ref(false);
const projects = ref([]);
const todayTasks = ref([]);
const urgentTasks = ref([]);
const ongoingTasks = ref([]);
const stopTasks = ref([]);
const finishedTasks = ref([]);
const draggedTask = ref(null);
const taskData = ref({});
const selectedProjectId = ref(0);
const selectedTaskId = ref(0);
const project_Slug = ref("");

const themeClass = computed(() => {
  const theme = store.state.theme;
  return theme === "dark"
    ? "bg-slate-600 text-white custom-scrollbar"
    : "bg-gray-50 text-gray-800 custom-scrollbar";
});

const hoverBgColor = computed(() => {
  const theme = store.state.theme;
  return theme === "dark" ? "hover:bg-blue-50/10" : "hover:bg-blue-50";
});

function formatDate(dateString) {
  if (!dateString) return "unknown!";
  return dayjs(dateString).format("DD-MM-YYYY hh:mm:ss A");
}

function openMemberModal(task) {
  taskData.value = task;
  isModalOpen.value = true;
}
function closeSupportModal() {
  isModalOpen.value = false;
}
async function loadTasksToToday(project_id, projectSlug = project_Slug.value) {
  project_Slug.value = projectSlug;
  if (project_id) {
    localStorage.setItem("selectedProjectId", project_id);
  } else {
    project_id = localStorage.getItem("selectedProjectId");
  }
  localStorage.setItem("projectSlug", projectSlug);

  const response = await globals.axios.get(
    globals.apiEndpoints.project_wise_tasks + "/" + projectSlug
  );

  todayTasks.value = response.data.data.today || [];
  urgentTasks.value = response.data.data.urgent || [];
  ongoingTasks.value = response.data.data.ongoing || [];
  stopTasks.value = response.data.data.stop || [];
  finishedTasks.value = response.data.data.finished || [];
  selectedProjectId.value = Number(project_id);
}

function dragstartHandler(event, task) {
  draggedTask.value = task;
  selectedTaskId.value = task.task_id;
  event.dataTransfer.setData("text", JSON.stringify(task));
}

function dragoverHandler(event) {
  event.preventDefault();
}

async function dropHandler(event, targetColumn) {
  event.preventDefault();

  if (draggedTask.value) {
    const sourceColumn = findTaskColumn(draggedTask.value);

    // No change if the source and target columns are the same
    if (sourceColumn === targetColumn) {
      return false;
    }

    let errorMsg = "";
    if (
      (sourceColumn === "0" && targetColumn === "3") ||
      (sourceColumn === "0" && targetColumn === "4") ||
      (sourceColumn === "1" && targetColumn === "3") ||
      (sourceColumn === "1" && targetColumn === "4") ||
      (sourceColumn === "2" && targetColumn === "0") ||
      (sourceColumn === "2" && targetColumn === "1") ||
      (sourceColumn === "3" && targetColumn === "1")
    ) {
      if (sourceColumn === "0" && targetColumn === "3")
        errorMsg = "Cannot move from Today to Stop.";
      else if (sourceColumn === "0" && targetColumn === "4")
        errorMsg = "Cannot move from Urgent to Finished.";
      else if (sourceColumn === "1" && targetColumn === "3")
        errorMsg = "Cannot move from Urgent to Stop.";
      else if (sourceColumn === "1" && targetColumn === "4")
        errorMsg = "Cannot move from Urgent to Finished.";
      else if (sourceColumn === "2" && targetColumn === "0")
        errorMsg = "Cannot move from Ongoing to Today.";
      else if (sourceColumn === "2" && targetColumn === "1")
        errorMsg = "Cannot move from Ongoing to Urgent.";
      else if (sourceColumn === "3" && targetColumn === "1")
        errorMsg = "Cannot move from Stop to Urgent.";
      toast.error(errorMsg);
      return false;
    }

    // Remove from original column
    if (
      (sourceColumn === "0" && targetColumn !== "3" && targetColumn !== "4") ||
      (sourceColumn === "1" && targetColumn !== "3" && targetColumn !== "4") ||
      (sourceColumn === "3" && targetColumn === "4") ||
      (sourceColumn === "2" && targetColumn === "3") ||
      (sourceColumn === "3" && targetColumn === "2") ||
      (sourceColumn === "2" && targetColumn === "4")
    ) {
      if (sourceColumn) {
        getColumnRef(sourceColumn).value = getColumnRef(
          sourceColumn
        ).value.filter((t) => t.task_id !== draggedTask.value.task_id);
      }
    }

    // Special logic for 'ongoingTasks'
    if (targetColumn === "2") {
      if (ongoingTasks.value.length > 0) {
        const previousTask = ongoingTasks.value[0];
        ongoingTasks.value = [];
        stopTasks.value.push(previousTask);
      }
    }

    // Push the dragged task into the target column
    getColumnRef(targetColumn).value.push(draggedTask.value);

    // Now send the request after UI update
    try {
      // If we moved a previous ongoing task to stop, update its status
      if (
        targetColumn === "2" &&
        ongoingTasks.value.length === 1 &&
        stopTasks.value.length > 0
      ) {
        const previousTask = stopTasks.value[stopTasks.value.length - 1];
        await globals.axios.post(globals.apiEndpoints.task_status, {
          task_id: previousTask.task_id,
          task_status: "3",
        });
      }

      await globals.axios.post(globals.apiEndpoints.task_status, {
        task_id: selectedTaskId.value,
        task_status: targetColumn,
      });
      loadTasksToToday();
    } catch (error) {
      toast.error("Failed to update task status.");
    }

    draggedTask.value = null;
  }
}

function findTaskColumn(task) {
  if (
    Array.isArray(todayTasks.value) &&
    todayTasks.value.find((t) => t.task_id === task.task_id)
  )
    return "0";
  if (
    Array.isArray(urgentTasks.value) &&
    urgentTasks.value.find((t) => t.task_id === task.task_id)
  )
    return "1";
  if (
    Array.isArray(ongoingTasks.value) &&
    ongoingTasks.value.find((t) => t.task_id === task.task_id)
  )
    return "2";
  if (
    Array.isArray(stopTasks.value) &&
    stopTasks.value.find((t) => t.task_id === task.task_id)
  )
    return "3";
  if (
    Array.isArray(finishedTasks.value) &&
    finishedTasks.value.find((t) => t.task_id === task.task_id)
  )
    return "4";
  return null;
}

function getColumnRef(columnName) {
  switch (columnName) {
    case "0":
      return todayTasks;
    case "1":
      return urgentTasks;
    case "2":
      return ongoingTasks;
    case "3":
      return stopTasks;
    case "4":
      return finishedTasks;
    default:
      return null;
  }
}

// Clear localStorage before mounting the component
onBeforeMount(() => {
  const localProjects = localStorage.getItem("taskProjects");
  projects.value = localProjects ? JSON.parse(localProjects) : [];
});

// Load projects and tasks when the component is mounted
onMounted(async () => {
  await Promise.all([taskAssignedProjects()]);
});

async function taskAssignedProjects() {
  try {
    const response = await globals.axios.get(
      globals.apiEndpoints.task_assigned_projects
    );
    localStorage.setItem("taskProjects", JSON.stringify(response.data.data));
    projects.value = response.data.data;
  } catch (error) {
    console.error("Error loading Project:", error);
    toast.error("Failed to load Project.");
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.drop-hover {
  background-color: rgba(147, 197, 253, 0.3); /* Light blue */
  transition: background-color 0.3s ease;
}
</style>
