'use client';
import { createClient } from '@/lib/supabase/client';

import Main from '@/components/ui/layout/Main';
import { HiCamera } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    package: string;
    people: number;
    message: string;
};

export default function PhotoBoothBookingPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { error } = await supabase.from('photo_boot_bookings').insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                date: data.date,
                time: data.time,
                package: data.package,
                people: data.people,
                message: data.message
            } as any);

            if (error) throw error;

            setSubmitStatus({
                success: true,
                message: 'Your booking request has been submitted successfully! We\'ll confirm your booking via email within 24 hours.'
            });
            reset();
        } catch (error) {
            console.error('Error submitting booking:', error);
            setSubmitStatus({
                success: false,
                message: 'Failed to submit booking request. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Main
            tittle='Book Your 360 Booth'
            Icon={HiCamera}
            heading='Reserve Your Spot for an Unforgettable Experience'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden'>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <h2 className='text-3xl font-bold text-white mb-2 font-small-caps tracking-widest'>Secure Your Session</h2>
                    <p className="text-white/50 mb-10">Fill out the details below to start your booking.</p>

                    {submitStatus && (
                        <div className={`mb-8 p-4 rounded-xl border ${submitStatus.success ? 'bg-green-500/10 border-green-500/20 text-green-200' : 'bg-red-500/10 border-red-500/20 text-red-200'}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='name'>
                                    Full Name
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    {...register('name', { required: 'Name is required' })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                                    placeholder='John Doe'
                                />
                                {errors.name && <p className='text-xs text-red-400'>{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='email'>
                                    Email Address
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                                    })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                                    placeholder='john@example.com'
                                />
                                {errors.email && <p className='text-xs text-red-400'>{errors.email.message}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='phone'>
                                    Phone
                                </label>
                                <input
                                    type='tel'
                                    id='phone'
                                    {...register('phone', { required: 'Phone required' })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                                    placeholder='+27...'
                                />
                                {errors.phone && <p className='text-xs text-red-400'>{errors.phone.message}</p>}
                            </div>

                            {/* Package */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='package'>
                                    Package
                                </label>
                                <select
                                    id='package'
                                    {...register('package', { required: 'Select a package' })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors [&>option]:bg-black'>
                                    <option value=''>Select Package</option>
                                    <option value='individual'>Individual (R50/p)</option>
                                    <option value='event'>Event (Custom)</option>
                                </select>
                                {errors.package && <p className='text-xs text-red-400'>{errors.package.message}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='date'>
                                    Date
                                </label>
                                <input
                                    type='date'
                                    id='date'
                                    {...register('date', { required: 'Date required' })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                                />
                            </div>

                            {/* Time */}
                            <div className="space-y-2">
                                <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='time'>
                                    Time
                                </label>
                                <input
                                    type='time'
                                    id='time'
                                    {...register('time', { required: 'Time required' })}
                                    className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                                />
                            </div>
                        </div>

                        {/* People */}
                        <div className="space-y-2">
                            <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='people'>
                                Number of People
                            </label>
                            <input
                                type='number'
                                id='people'
                                {...register('people', { min: 1, valueAsNumber: true })}
                                min='1'
                                defaultValue='1'
                                className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors'
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className='text-xs font-bold text-amber-500 uppercase tracking-widest' htmlFor='message'>
                                Special Requests
                            </label>
                            <textarea
                                id='message'
                                {...register('message')}
                                rows={3}
                                className='w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors resize-none'
                                placeholder='Tell us about your event theme or specific needs...'
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full py-5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold uppercase tracking-[0.2em] shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed mt-8'>
                            {isSubmitting ? 'Processing...' : 'Confirm Booking Request'}
                        </button>
                    </form>
                </div>
            </div>
        </Main>
    );
}
