<template>
    <OrganizationMenuItems />
    <div class="main-div">
        <div>
            <div style="display: flex; gap: 10px;">
                <p><strong>Designations</strong></p>
                <div v-if="designations.length < 1">
                    <i class="node-action rotate fas fa-plus add-org" @click.stop="toggleAddOrgForm('')"></i>
                </div>
            </div>

            <div v-for="(desigs, orgId) in groupedDesignations" :key="orgId" class="organization">
                <div class="org-header">
                    <p class="org-name">
                        {{ desigs[0]?.organization_name }}
                    </p>
                    <span v-if="desigs[0]?.organization_abbr" class="node-tag">{{ desigs[0]?.organization_abbr
                    }}</span>
                    <i class="node-action fas fa-plus add-org" @click.stop="toggleAddOrgForm(orgId)"
                        :class="{ 'rotate-45': activeAddOrgForm === orgId }"></i>
                </div>

                <!-- Add Designation Form for Organization Root -->
                <div v-if="activeAddOrgForm === orgId" class="add-form-container">
                    <AddDesignation :isAddNew="true" :organizationInfo="desigs[0]" @close="closeAddOrgForm"
                        @designation-added="handleOrgDesignationAdded" />
                </div>

                <DesignationTree :designations="desigs" :active-add-form="activeAddForm"
                    :active-edit-form="activeEditForm" @selectEmit="getDesignationInfoByDesig"
                    @designation-added="fetchDesignation" @set-active-add-form="setActiveAddForm"
                    @set-active-edit-form="setActiveEditForm" />
            </div>
            <!-- Top-Level AddDepartment Form -->
            <div v-if="designations.length < 1 && activeAddOrgForm === '0'" class="add-form-container">
                <AddDesignationFirstTime :isAddNew="true" :organizationInfo="null" @close="closeAddOrgForm"
                    @designation-added="handleOrgDesignationAdded" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { globals } from '@/config/globals';
import DesignationTree from '@/views/Pages/Setup/OrganizationManagement/Designation/DesignationTree.vue';
import AddDesignation from './AddDesignation.vue';
import OrganizationMenuItems from '../OrganizationSetup.vue'
import AddDesignationFirstTime from './AddDesignationFirstTime.vue'

const designations = ref<any[]>([]);
const desigInfo = ref<any>(null);
const orgInfo = ref<any>(null);
const activeAddForm = ref<string | null>(null);
const activeEditForm = ref<string | null>(null);
const activeAddOrgForm = ref<string | null>(null);

function setActiveAddForm(desigId: string | null) {
    activeAddForm.value = desigId;
}

function setActiveEditForm(desigId: string | null) {
    activeEditForm.value = desigId;
}

function toggleAddOrgForm(orgId: string) {
    if (orgId) {

        if (activeAddOrgForm.value === orgId) {
            activeAddOrgForm.value = null;
        } else {
            activeAddOrgForm.value = orgId;
        }
    }
    else {
        activeAddOrgForm.value = '0';
    }
}

function closeAddOrgForm() {
    activeAddOrgForm.value = null;
}

function handleOrgDesignationAdded() {
    fetchDesignation();
    closeAddOrgForm();
}

onMounted(fetchDesignation);

async function fetchDesignation() {
    try {
        const response = await globals.axios.get(
            globals.apiEndpoints.basePath + '/hr/designations'
        );
        designations.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
}

function buildDesignationTree(designations: any[]) {
    const map = new Map();
    const roots: any[] = [];

    designations.forEach((desig) => {
        desig.children = [];
        map.set(desig.desig_id, desig);
    });

    designations.forEach((desig) => {
        if (desig.parent_designation_id && map.has(desig.parent_designation_id)) {
            map.get(desig.parent_designation_id).children.push(desig);
        } else {
            roots.push(desig);
        }
    });

    return roots;
}

const groupedDesignations = computed(() => {
    const grouped: Record<string, any[]> = {};
    designations.value.forEach((desig) => {
        const org = desig.org_id;
        if (!grouped[org]) grouped[org] = [];
        grouped[org].push(desig);
    });

    Object.keys(grouped).forEach((orgId) => {
        grouped[orgId] = buildDesignationTree(grouped[orgId]);
    });

    return grouped;
});

function getDesignationInfoByDesig(desig: any) {
    desigInfo.value = desig;
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
.rotate {
    background-color: rgb(70, 231, 70);
    border-radius: 50%;
}

.add-form-container {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    max-width: 50%;
}
</style>