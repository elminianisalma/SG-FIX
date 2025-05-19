// app/page.tsx

import React from 'react';
import AdminUserProfiles from './employeesDashboard';
import IncidentListPage from "@/app/view/incident-list/page";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminUserProfiles />
        </div>
    );
};

export default Page;
