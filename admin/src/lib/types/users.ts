import type { PaymentMethod, Reward, Yellowemption } from "./base";
import type { Order } from "./orders";

export type UserRole =
  | "coFounder"
  | "Ceo"
  | "Manager"
  | "kitchenStaff"
  | "Cashier"
  | "Customer"
  | "admin";

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteItems: string[];
  preferyellowPaymentMethod: PaymentMethod;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
  };
}

export interface UserProfile {
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
  theme: "system" | "light" | "dark";
  referralCode: string;
  preferences: UserPreferences;
  savedPaymentMethods?: PaymentMethod[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface AdminProfileSummary {
  id: string;
  email?: string;
  display_name?: string;
  role: UserRole;
}
