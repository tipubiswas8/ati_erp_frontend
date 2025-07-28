<template>
    <OrganizationMenuItems />
    <div class="main-div">
        <div>
            <div class="header-container">
                <p><strong>Organizations</strong></p>
                <i class="node-action fas fa-plus add-org" @click.stop="toggleAddOrganization()"
                    :class="{ 'rotate-45': isClickedAddNew }"></i>
            </div>

            <!-- Add Organization Form -->
            <div v-if="isClickedAddNew" class="add-form-container">
                <AddOrganization :isAddNew="true" @close="closeAddOrgForm"
                    @organization-added="handleOrganizationAdded" />
            </div>

            <div v-for="org in organizations" :key="org.org_id" class="organization">
                <div class="org-header">
                    <p class="org-name">{{ org.organization_name }}</p>
                    <span v-if="org?.organization_abbr" class="node-tag">
                        {{ org.organization_abbr }}
                    </span>
                    <i class="node-action fas fa-pencil-alt ml-2" @click.stop="toggleEditOrganization(org)"
                        :class="{ 'rotate-45': editingOrgId === org.org_id }"></i>
                </div>

                <!-- Edit Organization Form -->
                <div v-if="editingOrgId === org.org_id" class="add-form-container mt-2">
                    <AddOrganization :isAddNew="false" :organizationInfo="org" @close="closeEditForm"
                        @organization-updated="handleOrganizationUpdated" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { globals } from '@/config/globals';
import AddOrganization from './AddOrganization.vue';
import OrganizationMenuItems from '../OrganizationSetup.vue'

const organizations = ref<any[]>([]);
const isClickedAddNew = ref(false);
const editingOrgId = ref<string | null>(null);

function toggleAddOrganization() {
    isClickedAddNew.value = !isClickedAddNew.value;
    if (isClickedAddNew.value) {
        editingOrgId.value = null;
    }
}

function toggleEditOrganization(org: any) {
    if (editingOrgId.value === org.org_id) {
        editingOrgId.value = null;
    } else {
        editingOrgId.value = org.org_id;
        isClickedAddNew.value = false;
    }
}

function closeAddOrgForm() {
    isClickedAddNew.value = false;
}

function closeEditForm() {
    editingOrgId.value = null;
}

function handleOrganizationAdded() {
    fetchOrganization();
    closeAddOrgForm();
}

function handleOrganizationUpdated() {
    fetchOrganization();
    closeEditForm();
}

onMounted(fetchOrganization);


async function fetchOrganization() {
    try {
        const response = await globals.axios.get(globals.apiEndpoints.basePath + '/hr/organizations');
        organizations.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
.main-div {
    padding: 20px;
}

.header-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.organization {
    margin-bottom: 2px;
    padding: 5px;
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

.node-tag {
    background-color: #e1f0ff;
    color: #2a5db0;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    margin-right: 10px;
}

.node-action {
    background-color: rgb(0, 183, 255);
    border: none;
    color: white;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.node-action:hover {
    background-color: rgb(70, 231, 70);
    transform: scale(1.1);
}

.node-action.rotate-45 {
    transform: rotate(45deg);
    background-color: rgb(70, 231, 70);
}

.add-form-container {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>