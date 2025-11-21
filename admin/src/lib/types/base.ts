export interface Reward {
  name: string;
  pointsrequired: number;
}

export interface Yellowemption {
  name: string;
  date: string;
}

export type PaymentMethod = "instore" | "Cepitec transfer";

// Compatibility aliases that mirror the client naming convention
export type yellowemption = Yellowemption;
export type paymentMethod = PaymentMethod;

