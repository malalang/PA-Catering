import React from 'react';

type BookingStatus = CarWashBooking['status'];

interface StatusBadgeProps {
	status: BookingStatus;
}

const statusStyles = {
	pending: 'bg-red-500/20 text-red-300',
	confirmed: 'bg-white/20 text-white',
	completed: 'bg-green-500/20 text-green-300',
	cancelled: 'bg-red-500/20 text-red-300',
	deleted: 'bg-gray-500/20 text-gray-300',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
	<span
		className={`px-3 py-1 text-sm font-medium rounded-full ${
			statusStyles[status] || 'bg-gray-500/20 text-gray-300'
		}`}>
		{status}
	</span>
);

export default StatusBadge;
