import IncidentForm from '@/app/core/create-incident/IncidentForm';
import SignUpForm from "@/app/core/sign-up/SignUpForm";
import Dashboard from "@/app/core/incident-list/IncidentList";
import IncidentListPage from "@/app/core/incident-list/page";
import AdminUserProfiles from "@/app/core/employees-dashboard/employeesDashboard";
import UserHomePage from "@/app/core/homePage/UserHomePage";
import CreateIncidentPage from './core/create-incident/page';
import AssignIncident from './core/create-incident/AssignIncident';
import IncidentAssignment from './core/assign-incident/AssignIncident';
import BAHomePage from './core/BA-homepage/BaHomePage';
import DeveloperAvailability from './core/dev-disponibility/DeveloperAvailability';
import IncidentStatutBoard from './core/incident-status-view-user/IncidentStatutBoard';
export default function Home() {
    return (
        <div>
            <SignUpForm/>
        </div>
    );
}