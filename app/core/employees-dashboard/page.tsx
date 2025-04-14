// app/page.tsx

import React from 'react';
import AdminUserProfiles from '../../core/employees-dashboard/employeesDashboard';

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Page principale avec AdminUserProfiles */}
            <AdminUserProfiles />
        </div>
    );
};

export default Page;
