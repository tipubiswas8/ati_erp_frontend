<template>
  <div class="edit-designation-form">
    <h3>Edit Designation</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="parentDesignation">Parent Designation <span style="color: red;">★</span></label>
        <select id="parentDesignation" v-model="formData.parent_designation_id" required>
          <option value="0">No Parent (Parent will Organization)</option>
          <option v-for="desig in allDesignations" :key="desig.desig_id" :value="desig.desig_id"
            :disabled="desig.desig_id === formData.designation_id">
            {{ desig.designation_name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="designationName">Designation Name <span style="color: red;">★</span></label>
        <input type="text" id="designationName" v-model="formData.designation_name" required
          placeholder="Enter designation name">
      </div>

      <div class="form-group">
        <label for="designationAbbr">Abbreviation (Optional)</label>
        <input type="text" id="designationAbbr" v-model="formData.designation_abbr"
          placeholder="Enter designation abbreviation">
      </div>

      <div class="form-group">
        <label for="designationAbbr">User Define Designation Number (Optional)</label>
        <input type="number" id="designationAbbr" v-model="formData.user_define_designation_id"
          placeholder="Enter user define designation number">
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
        <button type="submit" class="submit-btn">Update Designation</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { fetchAllDesignations, updateDesignation } from '@/api/designationApi';
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps<{
  designation: any;
}>();

const emit = defineEmits(['close', 'designation-updated']);

const formData = ref({
  organization_id: '',
  designation_id: '',
  designation_name: '',
  designation_abbr: '',
  parent_designation_id: '',
  user_define_designation_id: '',
  active_status: '',
  _method: ''
});

const allDesignations = ref<any[]>([]);

onMounted(() => {
  // Initialize form with designation data
  formData.value = {
    organization_id: props.designation.org_id,
    designation_id: props.designation.desig_id,
    designation_name: props.designation.designation_name,
    designation_abbr: props.designation.designation_abbr || '',
    parent_designation_id: props.designation.parent_designation_id || '',
    user_define_designation_id: props.designation.user_define_sl_no || '',
    active_status: props.designation.active_status || '',
    _method: 'PATCH'
  };
  // Load all designations for parent selection
  loadAllDesignations();
});

async function loadAllDesignations() {
  try {
    const response = await fetchAllDesignations();
    allDesignations.value = response.data;
  } catch (error) {
    console.error('Error loading designations:', error);
  }
}

async function submitForm() {
  try {
    const result = await updateDesignation(props.designation.desig_id, formData.value);
    emit('designation-updated');
    if (result.success == true) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    closeForm();
  } catch (error) {
    // console.error('Error updating designation:', error);
    toast.error("Failed to update designation. Please try again.");
  }
}

function closeForm() {
  emit('close');
}
</script>

<style scoped>
.edit-designation-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-designation-form h3 {
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