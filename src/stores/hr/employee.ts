
import { defineStore } from "pinia";

// In your store (Pinia example):
export const useEmployeeStore = defineStore('employeeInfo', {
    state: () => ({ currentEmployee: null }),
    actions: {
        setCurrentEmployee(emp: any | null) {
            this.currentEmployee = emp;
        },
        getCurrentEmployee() {
            return this.currentEmployee;
        }
    }
});