import { globals } from "@/config/globals";

interface ApiResponse {
    status: boolean;
    data: any;
    message: string;
    meta?: any;
    status_code: number;
}

export const commonAxiosRequest = {

    async fetchAllData(url: string) {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/' + url
            );


            if (response.status === 200 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to fetch data",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async fetchDataById(url: string, id: string | number) {
        try {
            const response = await globals.axios.get(
                globals.apiEndpoints.basePath + '/' + url + '/' + id
            );
            if (response.status === 200 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to fetch data",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async addMethod(url: string, data: any) {
        try {
            const response = await globals.axios.post(
                globals.apiEndpoints.basePath + '/' + url,
                data
            );

            if (response.status === 200 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to create record",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async updateMethod(url: string, id: string, data: any) {
        try {
            const dataWithMethod = {
                ...data,
                '_method': 'PATCH'
            };

            const endpoint = `${globals.apiEndpoints.basePath}/${url}/${id}`;

            const response = await globals.axios.post(
                endpoint,
                dataWithMethod
            );

            if (response.status === 200 || response.status === 204 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to update record",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async addMethodWithIdAndFileOne(url: string, id: string, data: any) {
        try {
            const endpoint = `${globals.apiEndpoints.basePath}/${url}/${id}`;

            // If has file upload
            if (data instanceof FormData) {
                const response = await globals.axios.post(endpoint, data, {
                    headers: {
                        Accept: 'application/json',
                        // Do NOT manually set Content-Type
                    },
                });

                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            }

            // If plain object
            const response = await globals.axios.post(endpoint, {
                ...data
            }, {
                headers: {
                    Accept: 'application/json'  // Important!
                }
            });

            return {
                status: response.data.status ?? true,
                data: response.data.data ?? null,
                message: response.data.message ?? "Success",
                meta: response.data.meta ?? null,
                status_code: response.data.statusCode ?? 200
            };

        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async updateMethodWithFileOne(url: string, id: string, data: any) {
        try {
            const endpoint = `${globals.apiEndpoints.basePath}/${url}/${id}`;

            if (data instanceof FormData) {
                data.append('_method', 'PATCH');

                const response = await globals.axios.post(endpoint, data, {
                    headers: {
                        Accept: 'application/json',
                        // Do NOT manually set Content-Type
                    },
                });

                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            }

            // If plain object
            const response = await globals.axios.post(endpoint, {
                ...data,
                _method: 'PATCH'
            }, {
                headers: {
                    Accept: 'application/json'  // Important!
                }
            });

            return {
                status: response.data.status ?? true,
                data: response.data.data ?? null,
                message: response.data.message ?? "Success",
                meta: response.data.meta ?? null,
                status_code: response.data.statusCode ?? 200
            };

        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },


    async updateMethodWithFileTwo(url: string, data: any) {
        try {
            const endpoint = `${globals.apiEndpoints.basePath}/${url}`;

            if (data instanceof FormData) {
                data.append('_method', 'PATCH');

                const response = await globals.axios.post(endpoint, data, {
                    headers: {
                        Accept: 'application/json',
                        // Do NOT manually set Content-Type
                    },
                });

                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            }

            // If plain object
            const response = await globals.axios.post(endpoint, {
                ...data,
                _method: 'PATCH'
            }, {
                headers: {
                    Accept: 'application/json'  // Important!
                }
            });

            return {
                status: response.data.status ?? true,
                data: response.data.data ?? null,
                message: response.data.message ?? "Success",
                meta: response.data.meta ?? null,
                status_code: response.data.statusCode ?? 200
            };

        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async updateMethodWithFileFour(url: string, conditions: Record<string, unknown>, data: Record<any, unknown> | FormData): Promise<ApiResponse> {
        try {
            // 1. Stringify the conditions
            const conditionsString = JSON.stringify(conditions);
            // 2. Encode ONLY ONCE
            const encodedConditions = encodeURIComponent(conditionsString);
            // 3. Ensure proper URL formatting
            const basePath = globals.apiEndpoints.basePath.replace(/\/+$/, '');
            const endpoint = `${basePath}/${url}/${encodedConditions}`;

            if (data instanceof FormData) {
                data.append('_method', 'PATCH');

                const response = await globals.axios.post(endpoint, data, {
                    headers: {
                        Accept: 'application/json',
                        // Do NOT manually set Content-Type
                    },
                });

                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message + 'with file',
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            }

            // If plain object
            const response = await globals.axios.post(endpoint, {
                ...data,
                _method: 'PATCH'
            }, {
                headers: {
                    Accept: 'application/json'  // Important!
                }
            });

            return {
                status: response.data.status ?? true,
                data: response.data.data ?? null,
                message: response.data.message + 'with out file',
                meta: response.data.meta ?? null,
                status_code: response.data.statusCode ?? 200
            };
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },

    async deleteMethodOne(url: string, id: string) {
        try {
            const endpoint = `${globals.apiEndpoints.basePath}/${url}/${id}`;
            const response = await globals.axios.delete(endpoint);
            if (response.status == 200 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to update record",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },


    async deleteMethodTwo(url: string, conditions: Record<string, any>): Promise<any> {
        try {
            const queryString = new URLSearchParams(conditions).toString();
            const endpoint = `${globals.apiEndpoints.basePath}/${url}?${queryString}`;
            const response = await globals.axios.delete(endpoint);
            if (response.status == 200 && response.data) {
                return {
                    status: response.data.status ?? true,
                    data: response.data.data ?? null,
                    message: response.data.message ?? "Success",
                    meta: response.data.meta ?? null,
                    status_code: response.data.statusCode ?? 200
                };
            } else {
                return {
                    status: false,
                    data: null,
                    message: "Failed to update record",
                    status_code: response.status
                };
            }
        } catch (error: any) {
            return {
                status: false,
                data: null,
                message: error?.response?.data?.message || "Something went wrong, please try again!",
                status_code: error?.response?.status || 500
            };
        }
    },
};

