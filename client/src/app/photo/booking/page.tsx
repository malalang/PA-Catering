import Main from '@/components/ui/layout/Main';
import { HiCamera } from 'react-icons/hi2';

export default function PhotoBoothBookingPage() {
    return (
        <Main
            tittle='Book Your 360 Booth'
            Icon={HiCamera}
            heading='Reserve Your Spot for an Unforgettable Experience'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-8 shadow-xl'>
                    <h2 className='text-2xl font-bold text-white mb-6'>Booking Form</h2>

                    <form className='space-y-6'>
                        {/* Name */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='name'>
                                Full Name *
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='John Doe'
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='email'>
                                Email Address *
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='john@example.com'
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='phone'>
                                Phone Number *
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                name='phone'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='+27 12 345 6789'
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='date'>
                                Preferred Date *
                            </label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='time'>
                                Preferred Time *
                            </label>
                            <input
                                type='time'
                                id='time'
                                name='time'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                        </div>

                        {/* Package Type */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='package'>
                                Package Type *
                            </label>
                            <select
                                id='package'
                                name='package'
                                required
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'>
                                <option value=''>Select a package</option>
                                <option value='individual'>Individual Session (R50/person)</option>
                                <option value='event'>Event Package (Contact for pricing)</option>
                            </select>
                        </div>

                        {/* Number of People */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='people'>
                                Number of People
                            </label>
                            <input
                                type='number'
                                id='people'
                                name='people'
                                min='1'
                                defaultValue='1'
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                            />
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='message'>
                                Special Requests or Notes
                            </label>
                            <textarea
                                id='message'
                                name='message'
                                rows={4}
                                className='w-full rounded-lg border border-white/30 bg-slate-900/60 text-white px-4 py-2.5 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                                placeholder='Any special requirements or questions?'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all duration-200 font-semibold text-white'>
                            Submit Booking Request
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
