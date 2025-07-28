// src/api/empApi.js
import api from "@/config/api";
import { globals } from '@/config/globals';

const employeeApi = {
    empBasicInfoApi: {
        async addEmployeeBasicInfo(data: any) {
            try {
                const result = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/employees", data);
                // const result = await api.post(globals.apiEndpoints.basePath + "/hr/employees", data);
                if (result.data && result.data.status === true) {
                    return { status: true, data: result.data.data, message: result.data.message };
                } else {
                    return { status: false, data: null, message: "Failed to perform this action, please try again later!" };
                }
            } catch (error) {
                return { status: false, data: null, message: "Failed to perform this action, please try again later!" };
            }
        },
        async updateEmployeeBasicInfo(empId: number | string, data: any) {
            try {
                const dataForUpdate = {
                    ...data,
                    '_method': 'PATCH'
                }
                const result = await globals.axios.post(globals.apiEndpoints.basePath + "/hr/employees/" + empId, dataForUpdate);
                // const result = await api.post(globals.apiEndpoints.basePath + "/hr/employees", data);
                if (result.data && result.data.status === true) {
                    return { status: true, data: result.data.data, message: result.data.message };
                } else {
                    return { status: false, data: null, message: "Failed to perform this action, please try again later!" };
                }
            } catch (error) {
                return { status: false, data: null, message: "Failed to perform this action, please try again later!" };
            }
        },
    },

    async getEmpInfoByEmpId(empId: number | string) {
        try {
            const result = await globals.axios.get(globals.apiEndpoints.basePath + '/hr/employees/' + empId);
            if (result.data.data && result.data.status === true) {
                return { status: true, data: result.data.data, message: result.data.message };
            } else {
                return { status: false, data: null, message: "Failed to get employee information, please try again later!" };
            }
        } catch (error) {
            return { status: false, data: null, message: "Failed to get employee information, please try again later!" };

        }
    },

    async getEmpBasicInfoByEmpId(empId: number | string) {
        try {
            const result = await globals.axios.get(globals.apiEndpoints.basePath + '/hr/employee-basic-info/' + empId);
            if (result.data.data && result.data.status === true) {
                return { status: true, data: result.data.data, message: result.data.message };
            } else {
                return { status: false, data: null, message: "Failed to get employee basic information, please try again later!" };
            }
        } catch (error) {
            return { status: false, data: null, message: "Failed to get employee basic information, please try again later!" };

        }
    },
};

export default employeeApi;
