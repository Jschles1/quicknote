import * as React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <div>
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        </div>
    );
};

export default LoadingOverlay;
