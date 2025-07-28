import { globals } from '@/config/globals';



// -------------------- INSTITUTE API --------------------
export const instituteApi = {

    async fetchAllInstitutes() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/institutes');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch institutes' };
        }
    },

    async fetchInstituteById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/institutes/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch institute' };
        }
    },

    async addInstitute(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/institutes/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during institute create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateInstitute(instituteId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/institutes/" + instituteId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during institute update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- SHIFT API --------------------
export const shiftApi = {

    async fetchAllShifts() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/shifts');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch shifts' };
        }
    },

    async fetchShiftById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/shifts/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch shift' };
        }
    },

    async addShift(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/shifts/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during shift create' };
            }
        } catch (error) {
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateShift(shiftId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/shifts/" + shiftId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during shift update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- COUNTRY API --------------------
export const countryApi = {
    async fetchAllCountries() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/countries');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch countries' };
        }
    },

    async fetchCountryById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/countries/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch country' };
        }
    },

    async addCountry(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/countries/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during country create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateCountry(countryId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/countries/" + countryId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during country update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};

// -------------------- DIVISION API --------------------
export const divisionApi = {

    async fetchAllDivisions() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/divisions');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch divisions' };
        }
    },

    async fetchDivisionById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/divisions/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch division' };
        }
    },

    async addDivision(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/divisions/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during division create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateDivision(divisionId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/divisions/" + divisionId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during division update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};

// -------------------- DISTRICT API --------------------
export const districtApi = {

    async fetchAllDistricts() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/districts');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch districts' };
        }
    },

    async fetchDistrictById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/districts/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch district' };
        }
    },

    async addDistrict(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/districts/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during district create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateDistrict(districtId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/districts/" + districtId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during district update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- THANA API --------------------
export const thanaApi = {

    async fetchAllThanas() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/thanas');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch thanas' };
        }
    },

    async fetchThanaById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/thanas/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch thana' };
        }
    },

    async addThana(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/thanas/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during thana create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateThana(thanaId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/thanas/" + thanaId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during thana update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- POLICE STATION API --------------------
export const policeStationApi = {

    async fetchAllPoliceStations() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/police-stations');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch police stations' };
        }
    },

    async fetchPoliceStationById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/police-stations/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch police station' };
        }
    },

    async addPoliceStation(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/police-stations/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during police station create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updatePoliceStation(psId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/police-stations/" + psId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during police station update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- UNION API --------------------
export const unionApi = {

    async fetchAllUnions() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/unions');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch unions' };
        }
    },

    async fetchUnionById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/unions/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch union' };
        }
    },

    async addUnion(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/unions/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during union create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updateUnion(unionId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/unions/" + unionId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during union update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};


// -------------------- POST OFFICE API --------------------
export const postOfficeApi = {

    async fetchAllPostOffices() {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/post-offices');
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch post offices' };
        }
    },

    async fetchPostOfficeById(id) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/post-offices/' + id);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch post office' };
        }
    },

    async addPostOffice(data) {
        try {
            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/post-offices/", data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during post office create' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },

    async updatePostOffice(psId, updateData) {
        try {
            const data = {
                ...updateData,
                '_method': 'PATCH'
            };

            const response = await globals.axios.post(globals.apiEndpoints.basePath + "/su/post-offices/" + psId, data);
            if (response.data && response.status === 200) {
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                return { success: false, data: null, message: 'Error during post office update' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, data: null, message: 'Something went wrong, please try again!' };
        }
    },
};

// -------------------- ADDRESS INFO API --------------------
export const addressInfoApi = {

    async getDivisionsByCountryId(countryId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/division-by-country-id/' + countryId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },

    async getDistrictsByDivisionId(divisionId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/district-by-division-id/' + divisionId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },

    async getThanasByDistrictId(districtId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/thana-by-district-id/' + districtId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },

    async getPoliceStationsByDistrictId(districtId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/police-station-by-district-id/' + districtId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },

    async getUnionsByThanaId(thanaId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/uinon-by-thana-id/' + thanaId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },

    async getPostOfficesByUnionId(unionId) {
        try {
            const response = await globals.axios.get(globals.apiEndpoints.basePath + '/su/post-office-by-union-id/' + unionId);
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Failed to fetch data' };
        }
    },
}





// -------------------- EXPORTS --------------------
export const fetchAllInstitutes = instituteApi.fetchAllInstitutes;
export const fetchInstituteById = instituteApi.fetchInstituteById;
export const addInstitute = instituteApi.addInstitute;
export const updateInstitute = instituteApi.updateInstitute;

export const fetchAllShifts = shiftApi.fetchAllShifts;
export const fetchShiftById = shiftApi.fetchShiftById;
export const addShift = shiftApi.addShift;
export const updateShift = shiftApi.updateShift;

export const fetchAllCountries = countryApi.fetchAllCountries;
export const fetchCountryById = countryApi.fetchCountryById;
export const addCountry = countryApi.addCountry;
export const updateCountry = countryApi.updateCountry;

export const fetchAllDivisions = divisionApi.fetchAllDivisions;
export const fetchDivisionById = divisionApi.fetchDivisionById;
export const addDivision = divisionApi.addDivision;
export const updateDivision = divisionApi.updateDivision;

export const fetchAllDistricts = districtApi.fetchAllDistricts;
export const fetchDistrictById = districtApi.fetchDistrictById;
export const addDistrict = districtApi.addDistrict;
export const updateDistrict = districtApi.updateDistrict;

export const fetchAllThanas = thanaApi.fetchAllThanas;
export const fetchThanaById = thanaApi.fetchThanaById;
export const addThana = thanaApi.addThana;
export const updateThana = thanaApi.updateThana;

export const fetchAllPoliceStations = policeStationApi.fetchAllPoliceStations;
export const fetchPoliceStationById = policeStationApi.fetchPoliceStationById;
export const addPoliceStation = policeStationApi.addPoliceStation;
export const updatePoliceStation = policeStationApi.updatePoliceStation;

export const fetchAllPostOffices = postOfficeApi.fetchAllPostOffices;
export const fetchPostOfficeById = postOfficeApi.fetchPostOfficeById;
export const addPostOffice = postOfficeApi.addPostOffice;
export const updatePostOffice = postOfficeApi.updatePostOffice;

export const fetchAllUnions = unionApi.fetchAllUnions;
export const fetchUnionById = unionApi.fetchUnionById;
export const addUnion = unionApi.addUnion;
export const updateUnion = unionApi.updateUnion;

export const getDivisionsByCountryId = addressInfoApi.getDivisionsByCountryId;
export const getDistrictsByDivisionId = addressInfoApi.getDistrictsByDivisionId;
export const getThanasByDistrictId = addressInfoApi.getThanasByDistrictId;
export const getPoliceStationsByDistrictId = addressInfoApi.getPoliceStationsByDistrictId;
export const getUnionsByThanaId = addressInfoApi.getUnionsByThanaId;
export const getPostOfficesByUnionId = addressInfoApi.getPostOfficesByUnionId;

export default {
    countryApi,
    divisionApi,
    districtApi,
    thanaApi,
    policeStationApi,
    postOfficeApi,
    unionApi,
    instituteApi,
    shiftApi,
    addressInfoApi
};
