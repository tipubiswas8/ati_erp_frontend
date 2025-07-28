import { globals } from '@/config/globals';
// API Functions
export const designationApi = {
    // Fetch all designations in tree structure
    async fetchAllDesignations() {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/hr/designations'
            );
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch designations' };
        }
    },

    async fetchDesignationById(id) {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/hr/designations/' + id
            );
            return { status: true, data: response.data.data, message: response.data.message, error: null };
        } catch (error) {
            return { staus: false, data: null, message: 'Failed to fetch designation', error: error.message || 'Failed to fetch designation' };
        }
    },

    // Update a designation
    async updateDesignation(deptId, updateData) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/designations/" + deptId, updateData);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during designation update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something want wrong, please try again!' };
        }
    },
};

export const fetchAllDesignations = designationApi.fetchAllDesignations;
export const updateDesignation = designationApi.updateDesignation;


export default designationApi;