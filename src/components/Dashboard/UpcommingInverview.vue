<template>
  <div
    class="w-96 h-[450px] relative  rounded-xl overflow-hidden border"
    :class="themeClass"
  >
    <div :class="themeClass"
      class="left-[24px] top-[32px] absolute justify-start text-neutral-700 text-sm font-semibold tracking-tight"
    >
      Upcoming Interview
    </div>
    <div :class="themeClass"
      class="w-[335px] h-28 left-[24px] top-[66px] absolute rounded-lg shadow-[1px_1px_6.300000190734863px_0px_rgba(213,231,241,1.00)] overflow-hidden"
    >
      <div
        class="left-[16px] top-[20px] absolute inline-flex justify-start items-center gap-2"
      >
        <img class="w-7 h-7 rounded-full" src="https://placehold.co/30x30" />
        <div class="w-44 h-7 relative">
          <div :class="themeClass"
            class="left-0 top-0 absolute justify-start text-neutral-700 text-sm font-medium leading-tight"
          >
            Fairoza Sumaiya
          </div>
          <div
            class="left-0 top-[22px] absolute justify-start text-neutral-400 text-xs font-normal leading-none"
          >
            fairozasumaiya@gmail.com
          </div>
        </div>
      </div>
      <div class="w-4 h-4 left-[310px] top-[16px] absolute overflow-hidden">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.25C8.41421 3.25 8.75 2.91421 8.75 2.5C8.75 2.08579 8.41421 1.75 8 1.75C7.58579 1.75 7.25 2.08579 7.25 2.5C7.25 2.91421 7.58579 3.25 8 3.25Z"
            stroke="#363739"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
            stroke="#363739"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 14.25C8.41421 14.25 8.75 13.9142 8.75 13.5C8.75 13.0858 8.41421 12.75 8 12.75C7.58579 12.75 7.25 13.0858 7.25 13.5C7.25 13.9142 7.58579 14.25 8 14.25Z"
            stroke="#363739"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        class="w-[300px] h-0 left-[16px] top-[70px] absolute outline outline-1 outline-offset-[-0.50px] outline-zinc-100"
      ></div>
      <div
        class="left-[16px] top-[86px] absolute inline-flex justify-start items-center gap-1.5"
      >
        <div class="w-4 h-4 relative overflow-hidden">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 2.66634H11.3334V1.99967C11.3334 1.82286 11.2631 1.65329 11.1381 1.52827C11.0131 1.40325 10.8435 1.33301 10.6667 1.33301C10.4899 1.33301 10.3203 1.40325 10.1953 1.52827C10.0703 1.65329 10 1.82286 10 1.99967V2.66634H6.00004V1.99967C6.00004 1.82286 5.9298 1.65329 5.80478 1.52827C5.67975 1.40325 5.51018 1.33301 5.33337 1.33301C5.15656 1.33301 4.98699 1.40325 4.86197 1.52827C4.73695 1.65329 4.66671 1.82286 4.66671 1.99967V2.66634H3.33337C2.80294 2.66634 2.29423 2.87705 1.91916 3.25213C1.54409 3.6272 1.33337 4.13591 1.33337 4.66634V12.6663C1.33337 13.1968 1.54409 13.7055 1.91916 14.0806C2.29423 14.4556 2.80294 14.6663 3.33337 14.6663H12.6667C13.1971 14.6663 13.7058 14.4556 14.0809 14.0806C14.456 13.7055 14.6667 13.1968 14.6667 12.6663V4.66634C14.6667 4.13591 14.456 3.6272 14.0809 3.25213C13.7058 2.87705 13.1971 2.66634 12.6667 2.66634ZM13.3334 12.6663C13.3334 12.8432 13.2631 13.0127 13.1381 13.1377C13.0131 13.2628 12.8435 13.333 12.6667 13.333H3.33337C3.15656 13.333 2.98699 13.2628 2.86197 13.1377C2.73695 13.0127 2.66671 12.8432 2.66671 12.6663V7.99967H13.3334V12.6663ZM13.3334 6.66634H2.66671V4.66634C2.66671 4.48953 2.73695 4.31996 2.86197 4.19494C2.98699 4.06991 3.15656 3.99967 3.33337 3.99967H4.66671V4.66634C4.66671 4.84315 4.73695 5.01272 4.86197 5.13775C4.98699 5.26277 5.15656 5.33301 5.33337 5.33301C5.51018 5.33301 5.67975 5.26277 5.80478 5.13775C5.9298 5.01272 6.00004 4.84315 6.00004 4.66634V3.99967H10V4.66634C10 4.84315 10.0703 5.01272 10.1953 5.13775C10.3203 5.26277 10.4899 5.33301 10.6667 5.33301C10.8435 5.33301 11.0131 5.26277 11.1381 5.13775C11.2631 5.01272 11.3334 4.84315 11.3334 4.66634V3.99967H12.6667C12.8435 3.99967 13.0131 4.06991 13.1381 4.19494C13.2631 4.31996 13.3334 4.48953 13.3334 4.66634V6.66634Z"
              fill="#9C9C9C"
            />
          </svg>
        </div>
        <div
          class="justify-start text-neutral-400 text-xs font-normal leading-none"
        >
          10 Mar, 25
        </div>
      </div>
      <div
        class="left-[198px] top-[86px] absolute inline-flex justify-start items-center gap-1"
      >
        <div class="w-4 h-4 relative overflow-hidden">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 2.66634H11.3334V1.99967C11.3334 1.82286 11.2631 1.65329 11.1381 1.52827C11.0131 1.40325 10.8435 1.33301 10.6667 1.33301C10.4899 1.33301 10.3203 1.40325 10.1953 1.52827C10.0703 1.65329 10 1.82286 10 1.99967V2.66634H6.00004V1.99967C6.00004 1.82286 5.9298 1.65329 5.80478 1.52827C5.67975 1.40325 5.51018 1.33301 5.33337 1.33301C5.15656 1.33301 4.98699 1.40325 4.86197 1.52827C4.73695 1.65329 4.66671 1.82286 4.66671 1.99967V2.66634H3.33337C2.80294 2.66634 2.29423 2.87705 1.91916 3.25213C1.54409 3.6272 1.33337 4.13591 1.33337 4.66634V12.6663C1.33337 13.1968 1.54409 13.7055 1.91916 14.0806C2.29423 14.4556 2.80294 14.6663 3.33337 14.6663H12.6667C13.1971 14.6663 13.7058 14.4556 14.0809 14.0806C14.456 13.7055 14.6667 13.1968 14.6667 12.6663V4.66634C14.6667 4.13591 14.456 3.6272 14.0809 3.25213C13.7058 2.87705 13.1971 2.66634 12.6667 2.66634ZM13.3334 12.6663C13.3334 12.8432 13.2631 13.0127 13.1381 13.1377C13.0131 13.2628 12.8435 13.333 12.6667 13.333H3.33337C3.15656 13.333 2.98699 13.2628 2.86197 13.1377C2.73695 13.0127 2.66671 12.8432 2.66671 12.6663V7.99967H13.3334V12.6663ZM13.3334 6.66634H2.66671V4.66634C2.66671 4.48953 2.73695 4.31996 2.86197 4.19494C2.98699 4.06991 3.15656 3.99967 3.33337 3.99967H4.66671V4.66634C4.66671 4.84315 4.73695 5.01272 4.86197 5.13775C4.98699 5.26277 5.15656 5.33301 5.33337 5.33301C5.51018 5.33301 5.67975 5.26277 5.80478 5.13775C5.9298 5.01272 6.00004 4.84315 6.00004 4.66634V3.99967H10V4.66634C10 4.84315 10.0703 5.01272 10.1953 5.13775C10.3203 5.26277 10.4899 5.33301 10.6667 5.33301C10.8435 5.33301 11.0131 5.26277 11.1381 5.13775C11.2631 5.01272 11.3334 4.84315 11.3334 4.66634V3.99967H12.6667C12.8435 3.99967 13.0131 4.06991 13.1381 4.19494C13.2631 4.31996 13.3334 4.48953 13.3334 4.66634V6.66634Z"
              fill="#9C9C9C"
            />
          </svg>
        </div>
        <div
          class="justify-start text-neutral-400 text-xs font-normal leading-none"
        >
          10:00 AM
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme);

const themeClass = computed(() =>
  theme.value === "dark" ? "dark_class text-white" : "bg-white text-black"
);
</script>
<style scoped>
.dark_class {
  background-color: transparent;
}
</style>
