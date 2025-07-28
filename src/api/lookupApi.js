import { globals } from '@/config/globals';



// -------------------- LOOKUP API --------------------
export const lookupData = {
    // lookup group //
    async fetchLookupGroupWithLookupData() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/sa/lookup-group-with-lookup-data');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch lookup group and data' };
        }
    },

    async fetchILookupGroupById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/sa/lookup-groups/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch lookup group' };
        }
    },

    async addLookupGroup(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/sa/lookup-groups/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during lookup group create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateLookupGroup(dataId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/sa/lookup-groups/" + dataId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during lookup group update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },


    // lookup data //
    async fetchILookupDataById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/sa/lookup-data/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch lookup data' };
        }
    },

    async addLookupData(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/sa/lookup-data/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during lookup data create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateLookupData(dataId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/sa/lookup-data/" + dataId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during lookup data update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    // --------------------------- get boood group  ---------------------  //
    async getBloodGroups() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/blood-group/');
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch blood group' };
        }
    },

    async getReligions() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/religion');
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch religion' };
        }
    },

    async getMaritalStatus() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/marital-status');
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch marital status' };
        }
    },

    async getGenders() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/gender');
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch gender' };
        }
    },

    async getEmploymentTypes() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/employment-type');
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch employment type' };
        }
    },

    async getLookupDataById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/lookup-data/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch lookup data' };
        }
    },

    async getBloodGroupById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/blood-group/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch blood group' };
        }
    },

    async getReligionById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/religion/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch religion' };
        }
    },

    async getMaritalStatuById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/marital-status/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch marital status' };
        }
    },

    async getGenderById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/gender/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch gender' };
        }
    },

    async getEmploymentTypeById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/employment-type/' + id);
            return { data: response.data.data, status: true, error: null };
        } catch (error) {
            return { data: null, status: false, error: error.message || 'Failed to fetch employment type' };
        }
    },

};



// -------------------- EXPORTS --------------------


export const fetchLookupGroupWithLookupData = lookupData.fetchLookupGroupWithLookupData;
export const fetchILookupGroupById = lookupData.fetchILookupGroupById;
export const addLookupGroup = lookupData.addLookupGroup;
export const updateLookupGroup = lookupData.updateLookupGroup;
export const fetchILookupDataById = lookupData.fetchILookupDataById;
export const addLookupData = lookupData.addLookupData;
export const updateLookupData = lookupData.updateLookupData;

export const getBloodGroups = lookupData.getBloodGroups;
export const getReligions = lookupData.getReligions;
export const getMaritalStatus = lookupData.getMaritalStatus;
export const getGenders = lookupData.getGenders;
export const getEmploymentTypes = lookupData.getEmploymentTypes;

export default { lookupData };
