<template>
    <div class="pagination-container px-[4%] py-4 bg-white border-t border-gray-200 shadow-sm">
        <!-- Showing entries info -->
        <div class="text-sm text-gray-600">
            {{ entriesText }}
        </div>

        <div class="text-sm text-gray-600" style="display: none;">
            {{ itemsPerPage === -1
            ? `Showing all ${props.filteredData ? props.filteredData.length : props.originalData.length} entries`
            : `Showing ${startEntry} to ${endEntry} of ${props.filteredData ? props.filteredData.length :
            props.originalData.length} entries` }}
            <!-- Showing {{ startEntry }} to {{ endEntry }} of {{ totalItems }} entries -->
            <!-- <span v-if="isFiltered">(filtered from {{ originalTotal }} total entries)</span> -->
        </div>

        <!-- Pagination controls -->
        <div class="flex items-center space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button" :class="{
                'pagination-button-disabled': currentPage === 1,
                'pagination-button-active': currentPage > 1
            }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="ml-1">Previous</span>
            </button>

            <span class="text-sm text-gray-600 mx-2">
                Page {{ currentPage }} of {{ totalPages }}
            </span>

            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button" :class="{
                'pagination-button-disabled': currentPage === totalPages,
                'pagination-button-active': currentPage < totalPages
            }">
                <span class="mr-1">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        <!-- Items per page selector -->
        <div class="flex items-center space-x-2">
            <label for="itemsPerPage" class="text-sm text-gray-600">Items per page:</label>
            <select id="itemsPerPage" v-model="localItemsPerPage" @change="updateItemsPerPage"
                class="items-per-page-selector">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="-1">All</option>
            </select>
        </div>
        </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
    originalData: {
        type: Array as () => any[],
        required: true,
    },
    filteredData: {
        type: Array,
        required: false
    },
    totalItems: {
        type: Number,
        required: true
    },
    originalTotal: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    }
});

const emit = defineEmits([
    'update:currentPage',
    'update:itemsPerPage'
]);

// Local copy for the select element
const localItemsPerPage = ref(props.itemsPerPage);

// Computed properties
const totalPages = computed(() => {
    if (localItemsPerPage.value === -1) return 1;
    return Math.ceil(props.totalItems / localItemsPerPage.value);
});

const startEntry = computed(() => {
    if (localItemsPerPage.value === -1) return 1;
    return (props.currentPage - 1) * localItemsPerPage.value + 1;
});

const endEntry = computed(() => {
    if (localItemsPerPage.value === -1) return props.totalItems;
    const end = props.currentPage * localItemsPerPage.value;
    return end > props.totalItems ? props.totalItems : end;
});

const isFiltered = computed(() => {
    return props.originalTotal > 0 && props.totalItems !== props.originalTotal;
});

// Navigation methods
const prevPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
};

const nextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
};

const updateItemsPerPage = () => {
    emit('update:itemsPerPage', Number(localItemsPerPage.value));
    emit('update:currentPage', 1); // Reset to first page when changing items per page
};


const entriesText = computed(() => {
    const baseText = localItemsPerPage.value === -1
        ? `Showing all ${props.filteredData ? props.filteredData.length : props.originalData.length} entries`
        : `Showing ${startEntry.value} to ${endEntry.value} of ${props.filteredData ? props.filteredData.length : props.originalData.length} entries`;

    const filteredLength = props.filteredData ? props.filteredData.length : props.originalData.length;
    const filteredText = filteredLength !== props.originalData.length
        ? ` (filtered from ${props.originalData.length} total entries)`
        : '';

    return baseText + filteredText;
});

// Watch for external changes to itemsPerPage
watch(() => props.itemsPerPage, (newVal) => {
    localItemsPerPage.value = newVal;
});
</script>

<style scoped>
.pagination-container {
    @apply flex flex-wrap justify-between items-center gap-4 w-full;
}

.pagination-button {
    @apply flex items-center px-3 py-1 rounded-md transition-all border border-gray-300;
}

.pagination-button-active {
    @apply bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600;
}

.pagination-button-disabled {
    @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.items-per-page-selector {
    @apply border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none;
}

@media (max-width: 640px) {
    .pagination-container {
        @apply flex-col items-stretch gap-3;
    }

    .pagination-container>div {
        @apply justify-center;
    }
}
</style>