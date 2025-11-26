"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  type ProductActionState,
  updateProductAction,
} from "@/lib/data/products-actions";
import type { ProductRecord } from "@/lib/types";

type Props = {
  product: ProductRecord;
  categories?: string[];
};

const initialState: ProductActionState = {};

export const QuickEditForm = ({ product, categories = [] }: Props) => {
  const [state, formAction] = useFormState(updateProductAction, initialState);

  return (
    <form action={formAction} className="space-y-3 text-sm text-slate-200">
      <input type="hidden" name="id" value={product.id} />

      <label className="space-y-2 block">
        <span>Product Name</span>
        <input
          name="name"
          type="text"
          defaultValue={product.name}
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </label>

      <label className="space-y-2 block">
        <span>Category</span>
        {categories.length > 0 ? (
          <select
            name="category"
            defaultValue={product.category_name ?? ""}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          >
            {categories.filter(cat => cat !== "all").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <input
            name="category"
            type="text"
            defaultValue={product.category_name ?? ""}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        )}
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-2">
          <span>Price (ZAR)</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product.price ?? 0}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>
        <label className="space-y-2">
          <span>Stock</span>
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product.stock ?? 0}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span>Image URL</span>
        <input
          name="image_url"
          type="url"
          defaultValue={product.image_url ?? ""}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </label>

      <label className="space-y-2 block">
        <span>Badge</span>
        <input
          name="badge"
          defaultValue={product.badge ?? ""}
          placeholder="Chef's pick"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </label>

      <label className="space-y-2 block">
        <span>Description</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={product.description ?? ""}
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </label>

      {state.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">{state.success}</p>
      ) : null}

      <SubmitButton
        label="Save changes"
        loadingLabel="Updating..."
        className="bg-slate-800"
      />
    </form>
  );
};

