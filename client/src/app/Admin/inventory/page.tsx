'use client';

import itemGroups from '@/context/Stock';
import ItemGroup from '@/components/Admin/Inventory/ItemGroup';

export default function InventoryAdmin() {
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-6 text-white'>Inventory Management</h1>
            <div className='space-y-8'>
                {itemGroups.map((group) => (
                    <ItemGroup key={group.name} group={group} />
                ))}
            </div>
        </div>
    );
}
