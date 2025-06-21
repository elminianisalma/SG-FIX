import IncidentForm from '@/app/view/create-incident/IncidentForm';
import SignUpForm from "@/app/view/sign-up/SignUpForm";
import Dashboard from "@/app/view/incident-list/IncidentList";
import IncidentListPage from "@/app/view/incident-list/page";
import AdminUserProfiles from "@/app/view/employees-dashboard/employeesDashboard";
import UserHomePage from "@/app/view/homePage/UserHomePage";
import CreateIncidentPage from './view/create-incident/page';
import AssignIncident from './view/create-incident/AssignIncident';
import IncidentAssignment from './view/assign-incident/AssignIncident';
import BAHomePage from './view/BA-homepage/BaHomePage';
import DeveloperAvailability from './view/dev-disponibility/DeveloperAvailability';
import IncidentStatutBoard from './view/incident-status-view-user/IncidentStatutBoard';
import CommentSection from './view/incidents-details/commentSection';
import TaskList from './view/incident-declare/IncidentDeclare';
export default function Home() {
    return (
        <div>
            <SignUpForm/>
        </div>
    );
}