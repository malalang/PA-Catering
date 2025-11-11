'use client';

import { ItemGroup as ItemGroupType } from '@/context/Stock';
import InventoryTable from './InventoryTable';

interface ItemGroupProps {
    group: ItemGroupType;
}

const ItemGroup: React.FC<ItemGroupProps> = ({ group }) => {
    return (
        <div>
            <h2 className='text-xl font-semibold text-white mb-4'>{group.name}</h2>
            <InventoryTable items={group.items} />
        </div>
    );
};

export default ItemGroup;
