"use client";

import { useState, useEffect, useCallback } from 'react';

import { getAllBookings } from '@/firebase/carwash/carwashBookings';

export const useCarWashBookings = () => {
  const [bookings, setBookings] = useState<CarWashBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const allBookings = await getAllBookings();
      setBookings(allBookings);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refetch: fetchBookings, setBookings };
};
