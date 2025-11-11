import React from 'react';
import CategoryCard from './CategoryCard';
import { useCategories, useProducts } from '@/hooks/useProducts';
import Loading from '@/components/ui/Loading';

const MenuSections: React.FC = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { products } = useProducts();

  if (categoriesLoading) {
    return <Loading message="Loading categories..." />;
  }

  if (categoriesError) {
    return <div className="text-center text-red-500">{categoriesError}</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const categoryProducts = products.filter(p => p.category === category.id);
        return (
          <CategoryCard
            key={category.id}
            title={category.name}
            description={category.description}
            image={category.image}
            href={`/menu/${category.id}`}
            count={categoryProducts.length}
          />
        );
      })}
    </section>
  );
};

export default MenuSections;