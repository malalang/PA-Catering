'use client';

import { ItemType } from '@/context/Stock';

interface InventoryTableProps {
    items: ItemType[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-gray-800 text-white'>
                <thead>
                    <tr className='bg-gray-900'>
                        <th className='p-4 text-left'>ID</th>
                        <th className='p-4 text-left'>Name</th>
                        <th className='p-4 text-left'>Category</th>
                        <th className='p-4 text-left'>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className='border-b border-gray-700'>
                            <td className='p-4'>{item.id}</td>
                            <td className='p-4'>{item.name}</td>
                            <td className='p-4'>{item.category}</td>
                            <td className='p-4'>{item.Size || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
