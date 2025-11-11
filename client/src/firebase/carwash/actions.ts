"use server";

import { revalidatePath } from "next/cache";
import { addCarWashBooking, getAvailableWorkers, getCarWashBooking, deleteCarWashBooking } from "@/firebase/carwash/carwashBookings";
import { getUser, updateUser } from "@/firebase/users/utils";
import GetUser from "@/firebase/users/server/GetServerUser";
import { increment } from 'firebase/firestore';


export interface BookingResult {
  success: boolean;
  message: string;
}

export async function createCarWashBooking(
  prevState: BookingResult,
  formData: FormData
): Promise<BookingResult> {
  const authUser = await GetUser();
  if (!authUser) {
    return { success: false, message: "You must be logged in to book." };
  }

  const user = await getUser(authUser.uid);
  if (!user) {
    return { success: false, message: "Could not find user profile." };
  }

  const service = formData.get("service") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const worker = formData.get("worker") as string;
  const vehicleDetails = formData.get("vehicleDetails") as string;

  if (!service || !date || !time || !worker || !vehicleDetails) {
    return { success: false, message: "Please fill out all fields." };
  }

  const carWashCount = user.carWashCount || 0;
  const isFreeWash = carWashCount >= 5;

  const bookingData: Omit<CarWashBooking, 'id' | 'addOns'> = {
    userId: user.uid,
    service,
    date: new Date(date),
    time,
    worker,
    vehicleDetails,
    status: "pending",
    isFree: isFreeWash,
    createdAt: new Date(),
  };

  try {
    const { createdAt, ...bookingDataForDb } = bookingData;
    await addCarWashBooking(bookingDataForDb);
    if (isFreeWash) {
      await updateUser(user.uid, { carWashCount: 0 });
    } else {
      await updateUser(user.uid, { carWashCount: increment(1) });
    }

    revalidatePath("/carwash/booking");
    return { success: true, message: "Booking successful!" };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Failed to create booking. Please try again." };
  }
}

export async function cancelBookingAndHandleLoyalty(bookingId: string) {
  const authUser = await GetUser();
  if (!authUser) {
    throw new Error("You must be logged in to cancel a booking.");
  }

  const booking = await getCarWashBooking(bookingId);
  if (!booking || booking.userId !== authUser.uid) {
    throw new Error("Booking not found or you do not have permission to cancel it.");
  }

  // Only decrement carWashCount if the wash was not free
  if (!booking.isFree) {
    await updateUser(authUser.uid, { carWashCount: increment(-1) });
  }

  await deleteCarWashBooking(bookingId);

  revalidatePath("/profile");
  revalidatePath("/carwash/booking");
}

export async function fetchAvailableWorkers(date: string, time: string): Promise<string[]> {
  // In a real app, you'd check worker schedules and existing bookings.
  // For now, we'll return a static list and simulate a delay.

  await new Promise(resolve => setTimeout(resolve, 500));
  return await getAvailableWorkers();
}
