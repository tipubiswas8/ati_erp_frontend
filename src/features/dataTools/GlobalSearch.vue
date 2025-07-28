<template>
    <div class="global-search-container">
        <input 
            v-model="searchValue"
            type="text" 
            placeholder="Global Search..."
            class="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            @input="handleSearch"
        />
        <button 
            v-if="searchValue"
            @click="clearSearch"
            class="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
        >
            ×
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    debounce: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['update:modelValue']);

const searchValue = ref(props.modelValue);
let timeoutId: number | null = null;

const handleSearch = () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
        emit('update:modelValue', searchValue.value);
    }, props.debounce);
};

const clearSearch = () => {
    searchValue.value = '';
    emit('update:modelValue', '');
};

watch(() => props.modelValue, (newVal) => {
    searchValue.value = newVal;
});
</script>

<style scoped>
.global-search-container {
    display: flex;
    align-items: center;
}
</style>