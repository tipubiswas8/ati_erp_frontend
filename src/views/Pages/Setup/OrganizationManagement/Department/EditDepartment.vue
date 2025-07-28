<template>
  <div class="edit-department-form">
    <h3>Edit Department</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="parentDepartment" class="required">Parent Department</label>
        <select id="parentDepartment" v-model="formData.parent_department_id" required>
          <option value="0">No Parent (Parent will Organization)</option>
          <option v-for="dept in allDepartments" :key="dept.dept_id" :value="dept.dept_id"
            :disabled="dept.dept_id === formData.department_id">
            {{ dept.department_name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="departmentName" class="required">Department Name</label>
        <input type="text" id="departmentName" v-model="formData.department_name" required
          placeholder="Enter department name">
      </div>

      <div class="form-group">
        <label for="departmentAbbr">Abbreviation (Optional)</label>
        <input type="text" id="departmentAbbr" v-model="formData.department_abbr"
          placeholder="Enter department abbreviation">
      </div>

      <div class="form-group">
        <label for="departmentAbbr">User Define Department Number (Optional)</label>
        <input type="number" id="departmentAbbr" v-model="formData.ud_sl_no"
          placeholder="Enter user define department number">
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="formData.active_status"
          :style="{ color: formData.active_status ? 'green' : 'magenta' }">
          <option :value="true" style="color: green;">Active</option>
          <option :value="false" style="color: magenta;">Inactive</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="closeForm">Cancel</button>
        <button type="submit" class="submit-btn">Update Department</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { fetchAllDepartments, updateDepartment } from '@/api/departmentApi';
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps<{
  department: any;
}>();

const emit = defineEmits(['close', 'department-updated']);

const formData = ref({
  organization_id: '',
  department_id: '',
  department_name: '',
  department_abbr: '',
  parent_department_id: '',
  ud_sl_no: '',
  active_status: '',
  _method: ''
});

const allDepartments = ref<any[]>([]);

onMounted(() => {
  // Initialize form with department data
  formData.value = {
    organization_id: props.department.org_id,
    department_id: props.department.dept_id,
    department_name: props.department.department_name,
    department_abbr: props.department.department_abbr || '',
    parent_department_id: props.department.parent_department_id || '',
    ud_sl_no: props.department.user_define_sl_no || '',
    active_status: props.department.active_status || '',
    _method: 'PATCH'
  };
  // Load all departments for parent selection
  loadAllDepartments();
});

async function loadAllDepartments() {
  try {
    const response = await fetchAllDepartments();
    allDepartments.value = response.data;
  } catch (error) {
    console.error('Error loading departments:', error);
  }
}

async function submitForm() {
  try {
    const result = await updateDepartment(props.department.dept_id, formData.value);
    emit('department-updated');
    if (result.success == true) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    closeForm();
  } catch (error) {
    // console.error('Error updating department:', error);
    toast.error("Failed to update department. Please try again.");
  }
}

function closeForm() {
  emit('close');
}
</script>

<style scoped>
.required::after {
  content: ' ★';
  color: red;
  margin-left: 0.25rem;
}

.edit-department-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-department-form h3 {
  margin-top: 0;
  color: #2a5db0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2a5db0;
  box-shadow: 0 0 0 2px rgba(42, 93, 176, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  background-color: #2a5db0;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #1e4a8e;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>