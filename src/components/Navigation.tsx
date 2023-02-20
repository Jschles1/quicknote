import * as React from 'react';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import { Button } from './ui/Button';
import { api } from '@/utils/api';

const Navigation: React.FC = () => {
    const { data } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

    // if (!data) return null;

    return (
        <div className="min-h-screen w-[300px] min-w-[300px] bg-[#f9f9f9]">
            <UserDropdown />

            {/* <RecentNotes /> */}

            <NavigationNotes notes={data} />
        </div>
    );
};

export default Navigation;
