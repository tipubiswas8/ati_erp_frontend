<template>
    <OrganizationMenuItems />
    <div class="main-div">
        <div>
            <div style="display: flex; gap: 10px;">
                <p><strong>Departments</strong></p>
                <div v-if="departments.length < 1">
                    <i class="node-action rotate fas fa-plus add-org" @click.stop="toggleAddOrgForm('')"></i>
                </div>
            </div>

            <div v-for="(depts, orgId) in groupedDepartments" :key="orgId" class="organization">
                <div class="org-header">
                    <p class="org-name">
                        {{ depts[0]?.organization_name }}
                    </p>
                    <span v-if="depts[0]?.organization_abbr" class="node-tag">{{ depts[0]?.organization_abbr }}</span>
                    <i class="node-action fas fa-plus add-org" @click.stop="toggleAddOrgForm(orgId)"
                        :class="{ 'rotate-45': activeAddOrgForm === orgId }"></i>
                </div>

                <!-- Add Department Form for Organization Root -->
                <div v-if="activeAddOrgForm === orgId" class="add-form-container">
                    <AddDepartment :isAddNew="true" :organizationInfo="depts[0]" @close="closeAddOrgForm"
                        @department-added="handleOrgDepartmentAdded" />
                </div>

                <DepartmentTree :departments="depts" :active-add-form="activeAddForm" :active-edit-form="activeEditForm"
                    @selectEmit="getDepartmentInfoByDept" @department-added="fetchDepartment"
                    @set-active-add-form="setActiveAddForm" @set-active-edit-form="setActiveEditForm" />
            </div>

            <!-- Top-Level AddDepartment Form -->
            <div v-if="departments.length < 1 && activeAddOrgForm === '0'" class="add-form-container">
                <AddDepartmentFirstTime :isAddNew="true" :organizationInfo="null" @close="closeAddOrgForm"
                    @department-added="handleOrgDepartmentAdded" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { globals } from '@/config/globals';
import DepartmentTree from '@/views/Pages/Setup/OrganizationManagement/Department/DepartmentTree.vue';
import AddDepartment from './AddDepartment.vue';
import AddDepartmentFirstTime from './AddDepartmentFirstTime.vue';
import OrganizationMenuItems from '../OrganizationSetup.vue'

const departments = ref<any[]>([]);
const deptInfo = ref<any>(null);
const activeAddForm = ref<string | null>(null);
const activeEditForm = ref<string | null>(null);
const activeAddOrgForm = ref<string | null>(null);

function setActiveAddForm(deptId: string | null) {
    activeAddForm.value = deptId;
}

function setActiveEditForm(deptId: string | null) {
    activeEditForm.value = deptId;
}

function toggleAddOrgForm(orgId: string) {
    if (orgId) {
        if (activeAddOrgForm.value === orgId) {
            activeAddOrgForm.value = null;
        } else {
            activeAddOrgForm.value = orgId;
        }
    } else {
        activeAddOrgForm.value = '0';
    }
}

function closeAddOrgForm() {
    activeAddOrgForm.value = null;
}

function handleOrgDepartmentAdded() {
    fetchDepartment();
    closeAddOrgForm();
}

onMounted(fetchDepartment);

async function fetchDepartment() {
    try {
        const response = await globals.axios.get(
            globals.apiEndpoints.basePath + '/hr/departments'
        );
        departments.value = response.data.data;

        console.log(departments.value);
    } catch (error) {
        console.error(error);
    }
}

function buildDepartmentTree(departments: any[]) {
    const map = new Map();
    const roots: any[] = [];

    departments.forEach((dept) => {
        dept.children = [];
        map.set(dept.dept_id, dept);
    });

    departments.forEach((dept) => {
        if (dept.parent_department_id && map.has(dept.parent_department_id)) {
            map.get(dept.parent_department_id).children.push(dept);
        } else {
            roots.push(dept);
        }
    });

    return roots;
}

const groupedDepartments = computed(() => {
    const grouped: Record<string, any[]> = {};
    departments.value.forEach((dept) => {
        const org = dept.org_id;
        if (!grouped[org]) grouped[org] = [];
        grouped[org].push(dept);
    });

    Object.keys(grouped).forEach((orgId) => {
        grouped[orgId] = buildDepartmentTree(grouped[orgId]);
    });

    return grouped;
});

function getDepartmentInfoByDept(dept: any) {
    deptInfo.value = dept;
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

.rotate:hover {
    transform: rotate(45deg);
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