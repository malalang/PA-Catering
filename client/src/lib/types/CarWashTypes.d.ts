declare global {
  interface BookingFormData {
    service: string;
    addOns: string[];
    date: string;
    time: string;
    worker: string;
  }

  interface TimeSlotPickerProps {
    selectedDate: string;
    selectedService: string;
    onSelectTime: (time: string) => void;
  }

  interface CarWashBooking {
    id: string;
    userId: string;
    service: string;
    date: Date;
    time: string;
    worker: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted';
    createdAt: Date;
    addOns?: string[];
    vehicleDetails?: string;
    isFree?: boolean;
  }

  type BookingStatus = 'pending' | 'loading' | 'success' | 'error';
}
export { };