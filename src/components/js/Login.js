
import { globals } from "@/config/globals";
import { useToast } from "vue-toastification";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async loginUser() {
      this.loading = true;
      try {
        const response = await globals.axios.post(
          globals.apiEndpoints.login,
          this.form
        );
        if (response.data && response.data.data.token) {
          // Set token/session expiration time to 9 hours from now (3600 seconds × 1000 ms × 9 hours)
          const expirationTime = new Date().getTime() + 3600 * 1000 * 9; 
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("token_expiry", expirationTime);
          localStorage.setItem("organization_id", response.data.data.hr_organization_id);
          localStorage.setItem("department_id", response.data.data.hr_department_id);
          localStorage.setItem("designation_id", response.data.data.hr_designation_id);
          localStorage.setItem("employee_id", response.data.data.hr_employee_id);
          this.$router.push("/dashboard");
          this.toast.success("Login successful!");
        } else {
          this.toast.error("Invalid username or password");
        }
      } catch (error) {
        this.toast.error("Login failed: " + (error.response ? error.response.data.message : error.message));
      } finally {
        this.loading = false;
      }
    },
  },
};