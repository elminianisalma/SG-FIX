import IncidentForm from '@/app/core/create-incident/IncidentForm';
import SignUpForm from "@/app/core/sign-up/SignUpForm";
import Dashboard from "@/app/core/incident-list/IncidentList";
import CreateAccountForm from "@/app/core/sign-up/CreateAccountForm";
import IncidentTimeline from "@/app/TimelineIncident/TimelineIncident";
import IncidentListPage from "@/app/core/incident-list/page";
export default function Home() {
    return (
        <div>
            <IncidentListPage/>
        </div>
    );
}