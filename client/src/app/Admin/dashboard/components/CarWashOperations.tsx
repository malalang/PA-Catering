'use client';

import { useCarWashBookings } from '@/hooks/useCarWashBookings';
import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';
import { FaCar, FaSprayCan, FaCalendarAlt, FaCogs } from 'react-icons/fa';
import Section from '@/components/ui/layout/Section';

const DataRow = ({ label, value }: { label: string; value: string | number }) => (
	<div className='flex justify-between items-center py-2 border-b border-white/10'>
		<p className='text-white'>{label}</p>
		<p className='font-semibold text-white'>{value}</p>
	</div>
);

const CarWashOperations: React.FC = () => {
	const { bookings, loading, error } = useCarWashBookings();

	if (loading) return <Loading message='Loading Car Wash Data...' />;
	if (error) return <div className='text-red-500 bg-red-500/10 p-4 rounded-md'>Error: {error}</div>;

	return (
<Section tittle='Car Wash Operations' Icon={FaCar}>	

			<div className='mt-6 space-y-6'>
				{/* Service Data */}
				<article >
					<Icon
						icon={FaSprayCan}
						heading='Service Data'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Washes by Type'
							value='N/A'
						/>
						<DataRow
							label='Average Service Time'
							value='N/A'
						/>
						<DataRow
							label='Add-On Uptake'
							value='N/A'
						/>
					</div>
				</article>

				{/* Booking Management */}
				<article >
					<Icon
						icon={FaCalendarAlt}
						heading='Booking Management'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Total Bookings'
							value={bookings.length}
						/>
						<DataRow
							label='Peak Hours'
							value='N/A'
						/>
						<DataRow
							label='No-Show Rate'
							value='N/A'
						/>
					</div>
				</article>

				{/* Resource Utilization */}
				<article >
					<Icon
						icon={FaCogs}
						heading='Resource Utilization'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Bay Occupancy Rate'
							value='N/A'
						/>
						<DataRow
							label='Staff Productivity'
							value='N/A'
						/>
					</div>
				</article>
			</div>
		</Section>
	);
};

export default CarWashOperations;
