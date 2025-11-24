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
                <div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-8 shadow-xl'>
                    <h2 className='text-2xl font-bold text-white mb-6'>Booking Form</h2>

                    {submitStatus && (
                        <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                            <p className={submitStatus.success ? 'text-green-200' : 'text-red-200'}>
                                {submitStatus.message}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        {/* Name */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='name'>
                                Full Name *
                            </label>
                            <input
                                type='text'
                                id='name'
                                {...register('name', { required: 'Name is required' })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='John Doe'
                            />
                            {errors.name && <p className='mt-1 text-sm text-red-300'>{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='email'>
                                Email Address *
                            </label>
                            <input
                                type='email'
                                id='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='john@example.com'
                            />
                            {errors.email && <p className='mt-1 text-sm text-red-300'>{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='phone'>
                                Phone Number *
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                {...register('phone', { required: 'Phone number is required' })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='+27 12 345 6789'
                            />
                            {errors.phone && <p className='mt-1 text-sm text-red-300'>{errors.phone.message}</p>}
                        </div>

                        {/* Date */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='date'>
                                Preferred Date *
                            </label>
                            <input
                                type='date'
                                id='date'
                                {...register('date', { required: 'Date is required' })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                            {errors.date && <p className='mt-1 text-sm text-red-300'>{errors.date.message}</p>}
                        </div>

                        {/* Time */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='time'>
                                Preferred Time *
                            </label>
                            <input
                                type='time'
                                id='time'
                                {...register('time', { required: 'Time is required' })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                            {errors.time && <p className='mt-1 text-sm text-red-300'>{errors.time.message}</p>}
                        </div>

                        {/* Package Type */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='package'>
                                Package Type *
                            </label>
                            <select
                                id='package'
                                {...register('package', { required: 'Please select a package' })}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'>
                                <option value=''>Select a package</option>
                                <option value='individual'>Individual Session (R50/person)</option>
                                <option value='event'>Event Package (Contact for pricing)</option>
                            </select>
                            {errors.package && <p className='mt-1 text-sm text-red-300'>{errors.package.message}</p>}
                        </div>

                        {/* Number of People */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='people'>
                                Number of People
                            </label>
                            <input
                                type='number'
                                id='people'
                                {...register('people', {
                                    min: { value: 1, message: 'Minimum 1 person required' },
                                    valueAsNumber: true
                                })}
                                min='1'
                                defaultValue='1'
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                            {errors.people && <p className='mt-1 text-sm text-red-300'>{errors.people.message}</p>}
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='message'>
                                Special Requests or Notes
                            </label>
                            <textarea
                                id='message'
                                {...register('message')}
                                rows={4}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='Any special requirements or questions?'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all duration-200 font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed'>
                            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                        </button>

                        <p className='text-sm text-slate-400 text-center'>
                            * Required fields. We'll confirm your booking via email within 24 hours.
                        </p>
                    </form>
                </div>
            </div>
        </Main>
    );
}
