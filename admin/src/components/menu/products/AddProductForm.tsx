"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  createProductAction,
  type ProductActionState,
} from "@/lib/data/products-actions";

type Props = {
  categories: string[];
};

const initialState: ProductActionState = {};

export const AddProductForm = ({ categories }: Props) => {
  const [state, formAction] = useFormState(createProductAction, initialState);

  return (
    <form action={formAction} className="space-y-4 text-sm text-slate-200">
      <div className="space-y-2">
        <label htmlFor="name">Product name</label>
        <input
          id="name"
          name="name"
          required
          placeholder="Mogodu Mondays"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          list="menu-categories"
          required
          placeholder="Warm bowls"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
        <datalist id="menu-categories">
          {categories.map((category) => (
            <option key={category} value={category ?? ""} />
          ))}
        </datalist>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="price">Price (ZAR)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="85"
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            placeholder="25"
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="badge">Badge (optional)</label>
        <input
          id="badge"
          name="badge"
          placeholder="New / Bestseller"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image_url">Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          placeholder="https://cdn.pacatering.co.za/menu/mogodu.jpg"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description">Story / description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Slow-cooked tripe with creamy samp, toasted chakalaka crumbs, and herb oil."
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-rose-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">{state.success}</p>
      ) : null}

      <SubmitButton label="Add to menu" loadingLabel="Saving..." />
    </form>
  );
};

