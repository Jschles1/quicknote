import * as React from 'react';

import { cn } from '@/lib/util';

export interface SkeletonProps extends React.HTMLProps<HTMLDivElement> {
    isLoading: boolean;
    height: number;
    width?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, isLoading, height, width, children, ...props }, ref) => {
        const classNameStr = cn(
            isLoading ? `h-[${height}px] animate-pulse rounded-full bg-gray-400` : '',
            isLoading && width && `w-[${width}px]`,
            className
        );
        return (
            <div className={classNameStr} ref={ref} {...props}>
                {children}
            </div>
        );
    }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
