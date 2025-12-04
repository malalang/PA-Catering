import React from 'react';
import { HiShoppingBag, HiHeart } from 'react-icons/hi2';
import Avatar from '@/components/ui/Avatar';

interface ProfileHeaderProps {
    user: any;
    ordersCount: number;
    favoritesCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, ordersCount, favoritesCount }) => {
    const initials = user.display_name
        ? user.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : user.email?.[0].toUpperCase() || 'U';

    return (
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
                <Avatar
                    src={user.photo_url}
                    alt={user.display_name || 'User'}
                    initials={initials}
                    size="xl"
                    className="w-24 h-24 text-2xl border-4 border-amber-500/20"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-yellow-900 rounded-full"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">
                    {user.display_name || 'Welcome Back'}
                </h1>
                <p className="text-yellow-400/80 mb-4">{user.email}</p>

                <div className="flex items-center justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <HiShoppingBag className="text-amber-400" />
                        <span className="text-white font-medium">{ordersCount}</span>
                        <span className="text-yellow-400/60 text-sm">Orders</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <HiHeart className="text-rose-400" />
                        <span className="text-white font-medium">{favoritesCount}</span>
                        <span className="text-yellow-400/60 text-sm">Favorites</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
