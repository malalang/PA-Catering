"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductRecord } from "@/lib/types";
import { ProductBoard } from "./ProductBoard";

type Props = {
    products: ProductRecord[];
    showImages?: boolean;
};

export const ProductBoardWrapper = ({ products, showImages }: Props) => {
    const router = useRouter();

    const handleAddProduct = () => {
        // Navigate to menu page which has the AddProductPanel
        router.push("/menu");
    };

    return (
        <ProductBoard
            products={products}
            showImages={showImages}
            onAddProduct={handleAddProduct}
        />
    );
};
