import { notFound, redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProductEditForm } from "@/components/menu/ProductEditForm";
import { fetchProductCatalog } from "@/lib/data/products";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;
    const products = await fetchProductCatalog();
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const categories = Array.from(
        new Set(products.map((p) => p.category_name).filter(Boolean)),
    ) as string[];

    return (
        <DashboardShell
            title={`Edit: ${product.name}`}
            description="Update product details, pricing, and availability."
        >
            <div className="mx-auto max-w-2xl">
                <ProductEditForm product={product} categories={categories} />
            </div>
        </DashboardShell>
    );
}
