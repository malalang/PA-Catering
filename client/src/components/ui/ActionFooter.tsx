'use client';

import React from 'react';
import { BiSolidComment, BiSolidShare } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import LikesButton from '@/components/ui/LikesButton'; // Updated import path
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';

interface ActionFooterProps {
    itemId: string;
    table: string;
    commentsCount?: number;
    className?: string;
}

const ActionFooter: React.FC<ActionFooterProps> = ({ itemId, table, commentsCount = 0, className = '' }) => {
    const { user } = useAuth();
    const router = useRouter();

    const handleComment = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        // Placeholder for comment functionality
        console.log(`Comment on ${table} item ${itemId}`);
        alert('Comment functionality coming soon!');
    };

    const handleShare = () => {
        const shareData = {
            title: 'PA Luxe Creation',
            text: 'Check this out!',
            url: window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData).catch((err) => console.error('Error sharing:', err));
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className={`mt-auto flex items-center justify-between border-t border-white/10 pt-6 ${className}`}>
            <div className="scale-90 origin-left">
                <LikesButton itemId={itemId} table={table} />
            </div>
            <div className="flex gap-2">
                <Button
                    variant='icon'
                    onClick={handleComment}
                    className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn flex items-center gap-1'
                    aria-label={`Comment`}>
                    <BiSolidComment
                        size={18}
                        className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
                    />
                    {commentsCount > 0 && (
                        <span className='text-xs text-amber-400 font-medium'>{commentsCount}</span>
                    )}
                </Button>
                <Button
                    variant='icon'
                    onClick={handleShare}
                    className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn'
                    aria-label={`Share`}>
                    <BiSolidShare
                        size={18}
                        className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
                    />
                </Button>
            </div>
        </div>
    );
};

export default ActionFooter;
