'use client';

interface StatusBadgeProps {
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusClasses = {
        pending: 'bg-yellow-500/95',
        processing: 'bg-blue-500/95',
        completed: 'bg-green-500/95',
        cancelled: 'bg-red-500/95',
    };

    return (
        <span className={`px-2 py-1 text-sm font-semibold text-white rounded-full ${statusClasses[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusBadge;
