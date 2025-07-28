<template>
    <div class="main-div">
        <div>
            <p><strong>Designations</strong></p>
            <div v-for="(orgDesignations, orgId) in groupedDesignations" :key="orgId" class="organization">
                <div class="org-header">
                    <p class="org-name">{{ orgDesignations[0].organization_name }}</p>
                    <span v-if="orgDesignations[0]?.organization_abbr" class="node-tag">{{
                        orgDesignations[0].organization_abbr }}</span>
                    <i class="node-action fas fa-plus add-org" @click.stop="toggleAddOrgForm(orgId)"
                        :class="{ 'rotate-45': activeAddOrgForm === orgId }"></i>
                </div>

                <!-- Loop over designations under this organization -->
                <div v-for="desig in orgDesignations" :key="desig.desig_id" class="designation-item-container">
                    <div class="designation-item" @mouseover="hoveredDesignation = desig.desig_id"
                        @mouseleave="hoveredDesignation = null">
                        <div class="desig-content">
                            <span class="desig-name">{{ desig.designation_name }}</span>
                            <span v-if="desig.designation_abbr" class="node-tag">{{ desig.designation_abbr }}</span>
                        </div>
                        <i class="node-action-edit fas fa-pencil" @click.stop="toggleEditForm(desig.desig_id)"
                            :class="{ 'rotate-edit-icon': activeEditForm === desig.desig_id }"
                            :style="{ opacity: hoveredDesignation === desig.desig_id || activeEditForm === desig.desig_id ? 1 : 0.5 }"></i>
                    </div>

                    <!-- Edit Designation Form -->
                    <div v-if="activeEditForm === desig.desig_id" class="edit-form-container">
                        <EditDesignation :designation="getDesignationById(activeEditForm)" @close="closeEditForm"
                            @designation-updated="handleDesignationUpdated" />
                    </div>
                </div>

                <!-- Add Designation Form -->
                <div v-if="activeAddOrgForm === orgId" class="add-form-container">
                    <AddDesignation :isAddNew="true" :organizationInfo="orgDesignations[0]" @close="closeAddOrgForm"
                        @designation-added="handleOrgDesignationAdded" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { globals } from '@/config/globals';
import AddDesignation from './AddDesignation.vue';
import EditDesignation from './EditDesignation.vue';

const designations = ref<any[]>([]);
const activeAddOrgForm = ref<string | null>(null);
const activeEditForm = ref<string | null>(null);
const hoveredDesignation = ref<string | null>(null);

// Group designations by organization ID
const groupedDesignations = computed(() => {
    const grouped: Record<string, any[]> = {};
    designations.value.forEach((desig) => {
        const orgId = desig.org_id;
        if (!grouped[orgId]) grouped[orgId] = [];
        grouped[orgId].push(desig);
    });
    return grouped;
});

function toggleAddOrgForm(orgId: string) {
    activeAddOrgForm.value = (activeAddOrgForm.value === orgId) ? null : orgId;
}

function toggleEditForm(desigId: string) {
    activeEditForm.value = (activeEditForm.value === desigId) ? null : desigId;
}

function closeAddOrgForm() {
    activeAddOrgForm.value = null;
}

function closeEditForm() {
    activeEditForm.value = null;
}

function handleOrgDesignationAdded() {
    fetchDesignation();
    closeAddOrgForm();
}

function handleDesignationUpdated() {
    fetchDesignation();
    closeEditForm();
}

function getDesignationById(desigId: string) {
    return designations.value.find(d => d.desig_id === desigId);
}

onMounted(fetchDesignation);

async function fetchDesignation() {
    try {
        const response = await globals.axios.get(globals.apiEndpoints.basePath + '/hr/designations');
        designations.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
.main-div {
    padding: 20px;
}

.organization {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    position: relative;
}

.org-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.org-name {
    font-weight: bold;
    margin-right: 10px;
    margin-bottom: 0;
}

.designation-item-container {
    margin-bottom: 2px;
}

.designation-item {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 12px;
    margin-left: 20px;
    border-bottom: 1px solid #eee;
    border-radius: 6px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.designation-item:hover {
    background-color: #e9ecef;
    transform: translateX(5px);
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}

.designation-item:last-child {
    border-bottom: none;
}

.desig-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.desig-name {
    margin-right: 10px;
}

.node-tag {
    background-color: #e1f0ff;
    color: #2a5db0;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.node-action {
    background-color: rgb(0, 183, 255);
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
    margin-left: 10px;
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

.node-action-edit {
    margin-left: 10px;
    background-color: rgb(255, 145, 0);
    border: none;
    color: white;
    cursor: pointer;
    padding: 6px;
    border-radius: 10%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    opacity: 0.5;
}

.node-action-edit:hover {
    background-color: rgb(252, 201, 34);
    opacity: 1;
}

.rotate-edit-icon {
    transform: rotate(90deg);
    background-color: rgb(252, 201, 34);
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
    margin-left: 40px;
}
</style>