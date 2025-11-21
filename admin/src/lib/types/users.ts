import type { PaymentMethod, Reward, Yellowemption } from "./base";
import type { Order } from "./orders";

export type UserRole =
  | "coFounder"
  | "Ceo"
  | "Manager"
  | "kitchenStaff"
  | "carWashStaff"
  | "Cashier"
  | "Customer"
  | "admin";

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteItems: string[];
  preferyellowCarWashServices: string[];
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
  orderHistory: Order[];
  loyaltyPointsBalance?: number;
  tierStatus: string;
  rewardsAvailable: Reward[];
  yellowemptionHistory: Yellowemption[];
  personalizedPromotions: string[];
  referralCode: string;
  carWashCount?: number;
  preferences: UserPreferences;
  savedPaymentMethods?: PaymentMethod[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface AdminProfileSummary {
  id: string;
  email?: string;
  full_name?: string;
  role: UserRole;
}
