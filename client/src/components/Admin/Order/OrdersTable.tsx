'use client';

import StatusBadge from './StatusBadge';

interface OrdersTableProps {
	orders: Order[];
	onStatusChange: (orderId: string, newStatus: Order['status']) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onStatusChange }) => {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-gray-800 text-white'>
				<thead>
					<tr className='bg-gray-900'>
						<th className='p-4 text-left'>Order ID</th>
						<th className='p-4 text-left'>Date</th>
						<th className='p-4 text-left'>Customer</th>
						<th className='p-4 text-left'>Total</th>
						<th className='p-4 text-left'>Status</th>
						<th className='p-4 text-left'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr
							key={order.orderId}
							className='border-b border-gray-700'>
							<td className='p-4'>{order.orderId}</td>
							<td className='p-4'>{new Date(order.orderDate).toLocaleDateString()}</td>
							<td className='p-4'>{order.userId || 'N/A'}</td>
							<td className='p-4'>R{order.totalAmount.toFixed(2)}</td>
							<td className='p-4'>
								<StatusBadge status={order.status} />
							</td>
							<td className='p-4'>
								<select
									value={order.status}
									onChange={(e) => onStatusChange(order.orderId, e.target.value as Order['status'])}
									className='bg-gray-700 text-white p-2 rounded'>
									<option value='pending'>Pending</option>
									<option value='processing'>Processing</option>
									<option value='completed'>Completed</option>
									<option value='cancelled'>Cancelled</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
