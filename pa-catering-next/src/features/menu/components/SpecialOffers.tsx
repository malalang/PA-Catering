import Section from '@/components/ui/layout/Section';
import { useFeaturedProducts } from '@/hooks/useProducts';
import Loading from '@/components/ui/Loading';
import Image from 'next/image';
import AddToCart from './AddToCart';

const SpecialOffers: React.FC = () => {
  const { products: featuredProducts, loading, error } = useFeaturedProducts();

  if (loading) {
    return <Loading message="Loading special offers..." />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <Section tittle="Featured Items">
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-black/50 border border-red-500 rounded-md p-2 flex flex-col">
              <div className="bg-red-700 rounded-md p-6 flex flex-col h-full">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ filter: 'drop-shadow(0 0 2px #ff0000)' }}>
                  {product.name}
                </h3>
                <p className="text-white flex-grow mb-4">{product.description}</p>
                <div className="text-white text-xl font-bold mb-4">R{product.price.toFixed(2)}</div>
                <AddToCart product={product} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </Section>
  );
};

export default SpecialOffers;