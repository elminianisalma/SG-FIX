import IncidentForm from '@/app/core/create-incident/IncidentForm';
import SignUpForm from "@/app/core/sign-up/SignUpForm";
import Dashboard from "@/app/core/incident-list/IncidentList";
import IncidentListPage from "@/app/core/incident-list/page";
import DetailedIncidentInfo from "@/app/core/Incident-details/DetailedIncidentInfo";
export default function Home() {
    return (
        <div>
            <DetailedIncidentInfo/>
        </div>
    );
}