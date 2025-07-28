import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import Dashboard from "@/views/Dashboard.vue";
import dashboard2 from "@/views/Dashboard2.vue";
import SetupIndex from "@/views/Pages/Setup/SetupIndex.vue";
import SecurityIndex from "@/views/Pages/Sa/SecurityIndex.vue";
import EmployeeIndex from "@/views/Pages/Hr/Employee/EmployeeIndex.vue";
import guideline from "@/components/Main/Floating/Pages/Guideline.vue";
import Maintenance from "@/components/Main/Floating/Pages/UnderMantainance.vue";
import ProcessFlow from "@/components/Main/Floating/Pages/ProcessFlow.vue";
import Login from "@/components/Authentication/Login.vue";
import TaskManager from "@/views/Pages/TaskManager/Index.vue";
import TaskAssign from "@/views/Pages/TaskManager/TaskAssign/TaskAssign.vue";
import WorkStatus from "@/views/Pages/TaskManager/WorkStatus.vue";
import EmpContactList from "@/views/Pages/Hr/Employee/EmpContactList.vue";
import FormerEmpList from "@/views/Pages/Hr/Employee/FormerEmpList.vue";
import Organization from "@/views/Pages/Setup/OrganizationManagement/Organization/Organization.vue";
import Department from "@/views/Pages//Setup/OrganizationManagement/Department/Department.vue";
import Designation from "@/views/Pages//Setup/OrganizationManagement/Designation/Designation.vue";
import EmpSelfStatus from "@/views/Pages/Hr/Employee/EmpSelfStatus.vue";
import PrintEmpList from "@/views/Pages/Hr/Employee/PrintEmpList.vue";
import CurrentEmpList from "@/views/Pages/Hr/Employee/CurrentEmployee/CurrentEmpList.vue";
import AddNewEmployee from "@/views/Pages/Hr/Employee/CurrentEmployee/Create/AddNewEmployee.vue";
import LeaveIndex from "@/views/Pages/Hr/LeaveManagement/LeaveIndex.vue";
import LeaveApply from "@/views/Pages/Hr/LeaveManagement/LeaveApply.vue";
import LookupSetup from "@/views/Pages/Setup/Lookup/LookupList.vue"
import OrganizationSetup from "@/views/Pages/Setup/OrganizationManagement/OrganizationSetup.vue"
import Movement from "@/views/Pages/Hr/Movement/index.vue";
import AddMovement from "@/views/Pages/Hr/Movement/create.vue";
import allMovement from "@/views/Pages/Hr/Movement/allMovement.vue";

function isAuthenticated() {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("token_expiry");
  const currentTime = new Date().getTime();
  if (!token || !tokenExpiry || currentTime > parseInt(tokenExpiry, 10)) {
    return false;
  }
  return true;
}

function handleUnauthorizedAccess(to, next, toast) {
  console.log(
    "User is not authenticated or token has expired. Redirecting to Login."
  );
  toast.error("Your session has expired. Please log in again.");
  next({ path: "/", query: { redirect: to.fullPath } });
}
const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard2",
    name: "Dashboard2",
    component: dashboard2,
    meta: { requiresAuth: true },
  },
  {
    path: "/guideline",
    name: "guideline",
    component: guideline,
    meta: { requiresAuth: true },
  },
  {
    path: "/under/maintenance",
    name: "Maintenance",
    component: Maintenance,
    meta: { requiresAuth: true },
  },
  {
    path: "/ProcessFlow",
    name: "ProcessFlow",
    component: ProcessFlow,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-manager",
    name: "TaskManager",
    component: TaskManager,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-manager/task-assign",
    name: "TaskAssign",
    component: TaskAssign,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-manager/work-status",
    name: "WorkStatus",
    component: WorkStatus,
    meta: { requiresAuth: true },
  },

  // Security Access
  {
    path: "/seciurity-access",
    name: "Security Access",
    component: SecurityIndex,
    meta: { requiresAuth: true },
  },

  // Setup //
  {
    path: "/setup",
    name: "Setup",
    component: SetupIndex,
    meta: { requiresAuth: true },
  },
  // Lookup Setup //
  {
    path: "/setup/lookup-setup",
    name: "LookupSetup",
    component: LookupSetup,
    meta: { requiresAuth: true },
  },

  // Organization Management Setup //
  {
    path: "/setup/orzanization-setup",
    name: "OrganizationSetup",
    component: OrganizationSetup,
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/organization/organization",
    name: "Organization",
    component: Organization,
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/organization/department",
    name: "Department",
    component: Department,
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/organization/designation",
    name: "Designation",
    component: Designation,
    meta: { requiresAuth: true },
  },

  // Address Setup //
  {
    path: "/setup/address-setup",
    name: "AddressSetup",
    component: import("@/views/Pages/Setup/AddressSetup/AddressSeutp.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/country-setup",
    name: "CountrySetup",
    component: import("@/views/Pages/Setup/AddressSetup/Country/CountryList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-country",
    name: "AddNewCountry",
    component: import("@/views/Pages/Setup/AddressSetup/Country/AddNewCountry.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/setup/edit-country/:id',
    name: 'EditCountry',
    component: () => import("@/views/Pages/Setup/AddressSetup/Country/EditCountry.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/division-setup",
    name: "DivisionSetup",
    component: import("@/views/Pages/Setup/AddressSetup/Division/DivisionList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-division",
    name: "AddNewDivision",
    component: () => import("@/views/Pages/Setup/AddressSetup/Division/AddNewDivision.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/setup/edit-division/:id',
    name: 'EditDivision',
    component: () => import("@/views/Pages/Setup/AddressSetup/Division/EditDivision.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/district-setup",
    name: "DistrictSetup",
    component: import("@/views/Pages/Setup/AddressSetup/District/DistrictList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-district",
    name: "AddNewDistrict",
    component: () => import("@/views/Pages/Setup/AddressSetup/District/AddNewDistrict.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/setup/edit-district/:id',
    name: 'EditDistrict',
    component: () => import("@/views/Pages/Setup/AddressSetup/District/EditDistrict.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/thana-setup",
    name: "ThanaSetup",
    component: import("@/views/Pages/Setup/AddressSetup/Thana/ThanaList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-thana",
    name: "AddNewThana",
    component: () => import("@/views/Pages/Setup/AddressSetup/Thana/AddNewThana.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/setup/edit-thana/:id',
    name: 'EditThana',
    component: () => import("@/views/Pages/Setup/AddressSetup/Thana/EditThana.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/police-station-setup",
    name: "PoliceStationSetup",
    component: () => import("@/views/Pages/Setup/AddressSetup/PoliceStation/PoliceStationList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-police-station",
    name: "AddNewPoliceStation",
    component: () => import("@/views/Pages/Setup/AddressSetup/PoliceStation/AddNewPoliceStation.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/edit-police-station/:id",
    name: "EditPoliceStation",
    component: () => import("@/views/Pages/Setup/AddressSetup/PoliceStation/EditPoliceStation.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/union-setup",
    name: "UnionSetup",
    component: () => import("@/views/Pages/Setup/AddressSetup/Union/UnionList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-union",
    name: "AddNewUnion",
    component: () => import("@/views/Pages/Setup/AddressSetup/Union/AddNewUnion.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/edit-union/:id",
    name: "EditUnion",
    component: () => import("@/views/Pages/Setup/AddressSetup/Union/EditUnion.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/post-office-setup",
    name: "PostOfficeSetup",
    component: () => import("@/views/Pages/Setup/AddressSetup/PostOffice/PostOfficeList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-post-office",
    name: "AddNewPostOffice",
    component: () => import("@/views/Pages/Setup/AddressSetup/PostOffice/AddNewPostOffice.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/edit-post-office/:id",
    name: "EditPostOffice",
    component: () => import("@/views/Pages/Setup/AddressSetup/PostOffice/EditPostOffice.vue"),
    meta: { requiresAuth: true },
    props: true
  },

  // Institute Setup
  {
    path: "/setup/institute-setup",
    name: "InstituteSetup",
    component: () => import("@/views/Pages/Setup/InstituteSetup/InstituteList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-institute",
    name: "AddNewInstitute",
    component: () => import("@/views/Pages/Setup/InstituteSetup/AddNewInstitute.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/edit-institute/:id",
    name: "EditInstitute",
    component: () => import("@/views/Pages/Setup/InstituteSetup/EditInstitute.vue"),
    meta: { requiresAuth: true },
    props: true
  },

  // Shift Setup
  {
    path: "/setup/shift-setup",
    name: "ShiftSetup",
    component: () => import("@/views/Pages/Setup/ShiftSetup/ShiftList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/create-new-shift",
    name: "AddNewShift",
    component: () => import("@/views/Pages/Setup/ShiftSetup/AddNewShift.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/setup/edit-shift/:id",
    name: "EditShift",
    component: () => import("@/views/Pages/Setup/ShiftSetup/EditShift.vue"),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/setup/show-shift/:shift_id",
    name: "ShowShift",
    component: () => import("@/views/Pages/Setup/ShiftSetup/ShowShift.vue"),
    meta: { requiresAuth: true },
    props: true
  },

  // Hr Employee //
  {
    path: "/hr/employee",
    name: "Employee",
    component: EmployeeIndex,
    meta: { requiresAuth: true },
  },
  // Employee Information //
  {
    path: "/employee/employee_contact_list",
    name: "EmpContactList",
    component: EmpContactList,
    meta: { requiresAuth: true },
  },
  {
    path: "/employee/former_employee_list",
    name: "FormerEmpList",
    component: FormerEmpList,
    meta: { requiresAuth: true },
  },
  {
    path: "/employee/employee_self_status",
    name: "EmpSelfStatus",
    component: EmpSelfStatus,
    meta: { requiresAuth: true },
  },
  {
    path: "/employee/print_employee_list",
    name: "PrintEmpList",
    component: PrintEmpList,
    meta: { requiresAuth: true },
  },
  {
    path: "/employee/current_employee_list",
    name: "CurrentEmpList",
    component: CurrentEmpList,
    meta: { requiresAuth: true },
  },
  // Create New Employee //
  {
    path: "/employee/create_new_employee",
    name: "CreateNewEmployee",
    component: AddNewEmployee,
    meta: { requiresAuth: true },
  },
  // Show Employee Info
  {
    path: "/employee/show_employee_info/:emp_id",
    name: "ShowEmployeeInfo",
    component: () => import('@/views/Pages/Hr/Employee/CurrentEmployee/Show/ShowEmployeeInfo.vue'),
    meta: { requiresAuth: true },
    state: true
  },
  // Edit Employee Info
  {
    path: "/employee/edit_employee_info",
    name: "EditEmployeeInfo",
    component: () => import('@/views/Pages/Hr/Employee/CurrentEmployee/Edit/EditEmployeeInfo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: "/leave-management",
    name: "leaveManagementIndex",
    component: LeaveIndex,
    meta: { requiresAuth: true },
  },
  {
    path: "/leave-management/apply-leave",
    name: "leaveApply",
    component: LeaveApply,
    meta: { requiresAuth: true },
  },
  // movement
  {
    path: "/movement",
    name: "movement",
    component: Movement,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-movement",
    name: "addMovement",
    component: AddMovement,
    meta: { requiresAuth: true },
  },
  {
    path: "/all-movement",
    name: "allMovement",
    component: allMovement,
    meta: { requiresAuth: true },
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Get a toast instance here so we don't create it inside navigation guards
const toast = useToast();

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      handleUnauthorizedAccess(to, next, toast);
    } else {
      console.log("User is authenticated. Allowing access to:", to.name);
      next();
    }
  } else {
    next();
  }
});

export default router;
