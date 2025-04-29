import IncidentForm from '@/app/core/create-incident/IncidentForm';
import SignUpForm from "@/app/core/sign-up/SignUpForm";
import Dashboard from "@/app/core/incident-list/IncidentList";
import IncidentListPage from "@/app/core/incident-list/page";
import DetailedDashboards from "@/app/core/Dashboards/DetailedDashboards";
import AdminUserProfiles from "@/app/core/employees-dashboard/employeesDashboard";
import UserHomePage from "@/app/core/homePage/UserHomePage";
export default function Home() {
    return (
        <div>
            <SignUpForm/>
        </div>
    );
}