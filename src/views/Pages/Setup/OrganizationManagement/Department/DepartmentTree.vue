<template>
    <ul class="tree-root">
        <li v-for="dept in departments" :key="dept.dept_id">
            <div class="node-container" :style="{ marginLeft: `${dept.level * 20}px` }">
                <div class="node-content">
                    <span class="node-indicator">
                        <span class="arrow-head"></span>
                    </span>
                    <span class="node-icon">
                        <i class="fas" :class="dept.children && dept.children.length ? 'fa-folder' : 'fa-file-alt'"></i>
                    </span>
                    <span class="node-name">
                        {{ dept.department_name }}
                    </span>
                    <span v-if="dept.department_abbr" class="node-tag">{{ dept.department_abbr }}</span>
                    <i class="node-action fas fa-plus" @click.stop="toggleAddForm(dept)"
                        :class="{ 'rotate-45': activeAddForm === dept.dept_id }"></i>
                    <i class="node-action-edit fas fa-pencil" @click.stop="toggleEditForm(dept)"
                        :class="{ 'rotate-45': activeEditForm === dept.dept_id }"></i>
                </div>
            </div>

            <!-- Add Department Form -->
            <div v-if="activeAddForm === dept.dept_id" class="add-form-container"
                :style="{ marginLeft: `${(dept.level + 1) * 20}px` }">
                <AddDepartment :isAddNew="true" :departmentInfo="dept" @close="closeAddForm"
                    @department-added="handleDepartmentAdded" />
            </div>

            <!-- Edit Department Form -->
            <div v-if="activeEditForm === dept.dept_id" class="edit-form-container"
                :style="{ marginLeft: `${(dept.level + 1) * 20}px` }">
                <EditDepartment :department="dept" @close="closeEditForm"
                    @department-updated="handleDepartmentUpdated" />
            </div>

            <DepartmentTree v-if="dept.children && dept.children.length"
                :departments="dept.children.map(child => ({ ...child, level: (dept.level || 0) + 1 }))"
                :active-add-form="activeAddForm" :active-edit-form="activeEditForm" @selectEmit="emitSelect"
                @department-added="handleChildDepartmentAdded" @department-updated="handleChildDepartmentUpdated"
                @set-active-add-form="setActiveAddForm" @set-active-edit-form="setActiveEditForm" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import AddDepartment from './AddDepartment.vue';
import EditDepartment from './EditDepartment.vue';

const props = defineProps<{
    departments: any[];
    activeAddForm?: string | null;
    activeEditForm?: string | null;
}>();

const emit = defineEmits(['selectEmit', 'department-added', 'department-updated', 'set-active-add-form', 'set-active-edit-form']);

const localActiveAddForm = ref<string | null>(null);
const localActiveEditForm = ref<string | null>(null);

// Sync with parent's active forms
watch(() => props.activeAddForm, (newVal) => {
    localActiveAddForm.value = newVal || null;
}, { immediate: true });

watch(() => props.activeEditForm, (newVal) => {
    localActiveEditForm.value = newVal || null;
}, { immediate: true });

function setActiveAddForm(deptId: string | null) {
    localActiveAddForm.value = deptId;
    emit('set-active-add-form', deptId);
}

function setActiveEditForm(deptId: string | null) {
    localActiveEditForm.value = deptId;
    emit('set-active-edit-form', deptId);
}

function toggleAddForm(dept: any) {
    if (props.activeAddForm === dept.dept_id) {
        setActiveAddForm(null);
    } else {
        setActiveAddForm(dept.dept_id);
        setActiveEditForm(null); // Close edit form if open
    }
}

function toggleEditForm(dept: any) {
    if (props.activeEditForm === dept.dept_id) {
        setActiveEditForm(null);
    } else {
        setActiveEditForm(dept.dept_id);
        setActiveAddForm(null); // Close add form if open
    }
}

function closeAddForm() {
    setActiveAddForm(null);
}

function closeEditForm() {
    setActiveEditForm(null);
}

function emitSelect(dept: any) {
    emit('selectEmit', dept);
}

function handleDepartmentAdded() {
    emit('department-added');
    closeAddForm();
}

function handleDepartmentUpdated() {
    emit('department-updated');
    closeEditForm();
}

function handleChildDepartmentAdded() {
    emit('department-added');
}

function handleChildDepartmentUpdated() {
    emit('department-updated');
}
</script>

<style scoped>
.tree-root {
    list-style: none;
    padding-left: 0;
    margin-left: 25px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.node-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    /* Needed for absolute positioning of indicators */
}

.node-content {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 6px;
    transition: all 0.2s ease;
    position: relative;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
}

.node-content:hover {
    background-color: #e9ecef;
}

.node-icon {
    color: #4a6baf;
    width: 20px;
    margin-right: 8px;
    font-size: 14px;
}

.node-name {
    font-weight: 500;
    color: #323130;
    margin-right: 8px;
    transition: all 0.2s ease;
    padding: 4px 0;
}

.node-name:hover {
    color: #2a5db0;
    text-decoration: none;
}

.node-tag {
    background-color: #e1f0ff;
    color: #2a5db0;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    margin-left: 8px;
}

.node-action-edit {
    background-color: rgb(255, 145, 0);
    margin-left: 10px;
    border: none;
    color: white;
    cursor: pointer;
    padding: 6px;
    border-radius: 10%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
}

.node-action-edit:hover {
    background-color: rgb(252, 201, 34);
    color: white;
}

.node-action-edit.rotate-45 {
    transform: rotate(45deg);
    background-color: rgb(252, 201, 34);
    border-radius: 50%;
}

.node-indicator {
    position: absolute;
    left: -20px;
    /* Position outside the node-container */
    top: -14px;
    /* Start from the middle of the parent's node */
    bottom: 50%;
    /* End at the middle of this node */
    width: 20px;
    pointer-events: none;
}

/* Vertical connecting line */
.node-indicator::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #a0a0a0;
    /* Light gray line */
}

/* Horizontal arrow line pointing to the node */
.node-indicator::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 12px;
    height: 2px;
    background: #a0a0a0;
}

/* Arrow head */
.node-indicator .arrow-head {
    position: absolute;
    left: 12px;
    bottom: -3px;
    width: 0;
    height: 0;
    border-left: 4px solid #a0a0a0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
}

/* For root nodes (level 0), hide the indicator */
.tree-root>li>.node-container>.node-indicator {
    display: none;
}

/* Adjust spacing for nested nodes */
.tree-root ul {
    position: relative;
}


.node-action {
    background-color: rgb(0, 183, 255);
    margin-left: 10px;
    border: none;
    color: white;
    cursor: pointer;
    padding: 6px;
    border-radius: 10%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
}

.node-action:hover {
    background-color: rgb(70, 231, 70);
    color: white;
}

.rotate-45 {
    transform: rotate(45deg);
    background-color: rgb(70, 231, 70);
    border-radius: 50%;
}

.add-form-container,
.edit-form-container {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    max-width: 50%;
}
</style>