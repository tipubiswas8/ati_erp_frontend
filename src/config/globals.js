import axios from "axios";

const ati_url = "http://127.0.0.1:8000/api";

/******** API Route Start ********/

const apiEndpoints = {
  basePath: ati_url,
  login: `${ati_url}/login`,
  task: `${ati_url}/task-manager/tasks`,
  task_assigned_projects: `${ati_url}/task-manager/task-assigned-projects`,
  project_wise_tasks: `${ati_url}/task-manager/project-wise-tasks`,
  task_status: `${ati_url}/task-manager/task-status`,
  employees: `${ati_url}/hr/employees`,
  task_label: `${ati_url}/task-manager/task-label`,
};

/******** API Route end ********/

const globals = {
  apiEndpoints,
  axios,
};

export { globals };
