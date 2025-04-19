// app/page.tsx

import React from 'react';
import AdminUserProfiles from '../../core/employees-dashboard/employeesDashboard';
import IncidentListPage from "@/app/core/incident-list/page";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminUserProfiles />
        </div>
    );
};

export default Page;
