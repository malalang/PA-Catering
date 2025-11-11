export const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateTimeSlots = (start = 9, end = 17, interval = 60): string[] => {
  const slots: string[] = [];
  for (let hour = start; hour < end; hour++) {
    slots.push(
      `${hour.toString().padStart(2, '0')}:00`
    );
  }
  return slots;
};

export const isDateInPast = (date: Date | string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};
