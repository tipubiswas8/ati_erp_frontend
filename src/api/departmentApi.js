import { globals } from '@/config/globals';
// API Functions
export const departmentApi = {
    // Fetch all departments in tree structure
    async fetchAllDepartments() {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/hr/departments'
            );
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch departments' };
        }
    },

    // Update a department
    async updateDepartment(deptId, updateData) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/departments/" + deptId, updateData);
            console.log(response)
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during department update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something want wrong, please try again!' };
        }
    },
};

export const fetchAllDepartments = departmentApi.fetchAllDepartments;
export const updateDepartment = departmentApi.updateDepartment;


export default departmentApi;