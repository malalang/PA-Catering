
import { Reward, yellowemption, paymentMethod } from './index';
declare global {
  type UserRole =
    | 'coFounder'
    | 'Ceo'
    | 'Manager'
    | 'kitchenStaff'
    | 'Cashier'
    | 'Customer'
    | 'admin';

  interface UserPreferences {
    dietaryRestrictions: string[];
    favoriteItems: string[];
    preferyellowPaymentMethod: paymentMethod
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      promotions: boolean;
    };
  }

  interface UserProfile {
    uid: string;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    photoURL: string | null;
    phoneNumber: string | null;
    role: UserRole;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    theme: 'system' | 'light' | 'dark';
    referralCode: string;
    preferences: UserPreferences;
    savedPaymentMethods?: PaymentMethod[];
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
  }
}
export { };