import { DashboardShell } from "@/components/layout/DashboardShell";
import { AddProductForm } from "./AddProductForm";

type Props = {
  categories: string[];
};

export const AddProductPanel = ({ categories }: Props) => (
  <DashboardShell
    title="Add menu item"
    description="Create a new product and sync it directly to Supabase."
  >
    <AddProductForm categories={categories} />
  </DashboardShell>
);

