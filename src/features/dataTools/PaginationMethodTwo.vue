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
        <div class="flex items-center gap-1">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-nav-button" :class="{
                'pagination-nav-button-disabled': currentPage === 1,
                'pagination-nav-button-active': currentPage > 1
            }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <div class="px-3 py-1 bg-gray-50 rounded-md text-sm text-gray-700 border border-gray-200">
                Page {{ currentPage }} of {{ totalPages }}
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-nav-button" :class="{
                'pagination-nav-button-disabled': currentPage === totalPages,
                'pagination-nav-button-active': currentPage < totalPages
            }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Items per page input -->
        <div class="flex items-center space-x-2">
            <label for="itemsPerPage" class="text-sm text-gray-600">Items per page:</label>
            <input type="number" id="itemsPerPage" v-model.number="localItemsPerPage" @input="updateItemsPerPage"
                class="items-per-page-input w-20 px-2 py-1 border rounded" placeholder="Enter number">
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.pagination-nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.pagination-nav-button:hover {
    background-color: #f3f4f6;
}

.pagination-nav-button-active {
    color: #3b82f6;
}

.pagination-nav-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.items-per-page-input {
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: white;
    outline: none;
}

.items-per-page-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

@media (max-width: 640px) {
    .pagination-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>