import React from 'react';
import { HiClock, HiCurrencyDollar, HiShoppingBag, HiCheckCircle } from 'react-icons/hi2';

const OrderItem: React.FC<{ order: any }> = ({ order }) => {
	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'completed':
				return 'bg-green-500/20 text-green-300 border-green-500/30';
			case 'processing':
				return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
			case 'cancelled':
				return 'bg-red-500/20 text-red-300 border-red-500/30';
			default:
				return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'completed':
				return <HiCheckCircle className="text-green-400" size={20} />;
			case 'processing':
				return <div className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>;
			default:
				return <HiClock className="text-blue-400" size={20} />;
		}
	};

	// Parse items from JSON
	const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);

	return (
		<div className='rounded-xl border border-white/10 bg-gradient-to-br from-yellow-900/80 to-yellow-800/80 backdrop-blur-sm hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 overflow-hidden'>
			{/* Order Header */}
			<div className='bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-b border-white/10 px-6 py-4'>
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<div className='flex items-center gap-3'>
						<div className='bg-amber-500/20 p-2 rounded-lg border border-amber-400/30'>
							<HiShoppingBag className='text-amber-400 text-xl' />
						</div>
						<div>
							<p className='text-xs text-yellow-400 uppercase tracking-wider'>Order Date</p>
							<p className='text-white font-semibold'>
								{new Date(order.created_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								})}
							</p>
						</div>
					</div>

					<div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
						{getStatusIcon(order.status)}
						<span className='font-semibold text-sm uppercase tracking-wider'>
							{order.status || 'pending'}
						</span>
					</div>
				</div>
			</div>

			{/* Order Details */}
			<div className='px-6 py-5 space-y-4'>
				{/* Order ID */}
				<div className='bg-white/5 px-4 py-3 rounded-lg border border-white/10'>
					<p className='text-xs text-yellow-400 uppercase tracking-wider mb-1'>Order ID</p>
					<p className='text-white font-mono text-sm break-all'>{order.id}</p>
				</div>

				{/* Products List */}
				{items && items.length > 0 && (
					<div className='bg-white/5 px-4 py-3 rounded-lg border border-white/10'>
						<p className='text-xs text-yellow-400 uppercase tracking-wider mb-3'>Items Ordered</p>
						<div className='space-y-2'>
							{items.map((item: any, index: number) => (
								<div key={index} className='flex justify-between items-center py-2 border-b border-white/5 last:border-0'>
									<div className='flex-1'>
										<p className='text-white font-medium'>{item.name || item.Name}</p>
										<p className='text-xs text-yellow-400'>Qty: {item.quantity}</p>
									</div>
									<p className='text-amber-400 font-semibold'>
										R{((item.price || item.Price) * item.quantity).toFixed(2)}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Order Summary */}
				<div className='grid grid-cols-2 gap-3'>
					<div className='bg-white/5 px-4 py-3 rounded-lg border border-white/10'>
						<div className='flex items-center gap-2 mb-1'>
							<HiCurrencyDollar className='text-amber-400' size={16} />
							<p className='text-xs text-yellow-400 uppercase tracking-wider'>Total</p>
						</div>
						<p className='text-white font-bold text-lg'>
							R{order.total_price?.toFixed(2) || '0.00'}
						</p>
					</div>

					<div className='bg-white/5 px-4 py-3 rounded-lg border border-white/10'>
						<div className='flex items-center gap-2 mb-1'>
							<HiShoppingBag className='text-amber-400' size={16} />
							<p className='text-xs text-yellow-400 uppercase tracking-wider'>Items</p>
						</div>
						<p className='text-white font-bold text-lg'>
							{order.total_quantity || 0}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;