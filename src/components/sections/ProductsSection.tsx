
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";

interface ProductsSectionProps {
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductsSection = ({ featuredProducts, onAddToCart }: ProductsSectionProps) => {
  return (
    <section id="products" className="mb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Notre Collection ✨
        </h2>
        <p className="text-gray-600">Découvrez nos produits de beauté naturels pour sublimer votre féminité</p>
      </div>

      {/* Responsive Products Grid */}
      <div className="products-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Voir Plus Button */}
      <div className="text-center mt-12">
        <Link to="/products">
          <button className="pink-btn px-8 py-4 text-lg font-bold wobble">
            Voir Plus de Produits ✨
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProductsSection;
