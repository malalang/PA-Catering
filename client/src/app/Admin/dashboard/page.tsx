'use client';

import { useUser } from '@/context/UserContext';
import React from 'react';
import OverallBusinessPerformance from './components/OverallBusinessPerformance';
import EateryOperations from './components/EateryOperations';
import CarWashOperations from './components/CarWashOperations';
import MarketingEngagement from './components/MarketingEngagement';
import FinancialOverview from './components/FinancialOverview';
import Loading from '@/components/ui/Loading';
import Icon from '@/components/ui/Icon';
import { FaTachometerAlt } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
	const { loading } = useUser();

	if (loading) {
		return <Loading message='Loading Admin Dashboard...' />;
	}

	return (
		<main className='min-h-screen bg-black text-white p-4 sm:p-8'>
			<div className='max-w-7xl mx-auto'>
				<Icon
					icon={FaTachometerAlt}
					heading='Admin Dashboard'
					variant='inline'
				/>
				<div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<OverallBusinessPerformance />
					<EateryOperations />
					<CarWashOperations />
					<MarketingEngagement />
					<FinancialOverview />
				</div>
			</div>
		</main>
	);
};

export default DashboardPage;
