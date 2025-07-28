import { globals } from '@/config/globals';
// API Functions
export const OrganizationApi = {
    // Fetch all Organizations in tree structure
    async fetchAllOrganizations() {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/hr/organizations'
            );
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch Organizations' };
        }
    },

    // Update a Organization
    async updateOrganization(deptId, updateData) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/organizations/" + deptId, updateData);
            console.log(response)
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during Organization update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something want wrong, please try again!' };
        }
    },
};

export const fetchAllOrganizations = OrganizationApi.fetchAllOrganizations;
export const updateOrganization = OrganizationApi.updateOrganization;


export default OrganizationApi;