"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  type OrderActionState,
  updateOrderStatusAction,
} from "@/lib/data/orders-actions";
import type { OrderStatus } from "@/lib/types";

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

const initialState: OrderActionState = {};
const STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

export const UpdateOrderStatusForm = ({ orderId, currentStatus }: Props) => {
  const [state, formAction] = useFormState(
    updateOrderStatusAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2 text-sm text-slate-200">
      <input type="hidden" name="orderId" value={orderId} />
      <label className="space-y-1 text-xs uppercase tracking-[0.3em] text-slate-500">
        Status
        <select
          name="status"
          defaultValue={currentStatus}
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      {state.error ? (
        <p className="text-xs text-rose-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-xs text-emerald-400">{state.success}</p>
      ) : null}

      <SubmitButton
        label="Update status"
        loadingLabel="Updating..."
        className="bg-slate-800 px-3 py-2 text-xs"
      />
    </form>
  );
};

