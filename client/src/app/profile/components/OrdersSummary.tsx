import React from 'react';
import Link from 'next/link';
import { HiShoppingBag, HiChevronRight } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/server';

interface OrdersSummaryProps {
    userId: string;
}

const OrdersSummary: React.FC<OrdersSummaryProps> = async ({ userId }) => {
    const supabase = await createClient();
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

    if (!orders || orders.length === 0) {
        return null;
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <HiShoppingBag className="text-amber-400" />
                    Recent Orders
                </h2>
                <Link href="/orders" className="text-sm text-yellow-400 hover:text-white transition-colors flex items-center gap-1">
                    View All <HiChevronRight />
                </Link>
            </div>

            <div className="space-y-3">
                {orders.map((order: any) => (
                    <div key={order.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-white font-medium">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-yellow-400/60">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold">R{order.total_price.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded-full capitalize ${order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                                    order.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400' :
                                        'bg-amber-500/20 text-amber-400'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersSummary;
