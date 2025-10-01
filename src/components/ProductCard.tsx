
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Leaf, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation vers la page de détail
    e.stopPropagation(); // Empêche la propagation de l'événement
    onAddToCart(product);
    
    // Afficher le toast de confirmation
    toast({
      title: "Produit ajouté au panier ! 🛒",
      description: `${product.name} a été ajouté à votre panier avec succès.`,
      duration: 3000,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="cute-card glass-ios h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer smooth">
        <div className="product-hero">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold hover:text-slate-900 transition-colors">
              {product.name} 💄
            </h3>
            <div />
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">
            {product.description}
          </p>

        </div>
        <div className="px-6 pb-4">
          <button
            onClick={handleAddToCart}
            className="w-full pink-btn py-3 flex items-center justify-center hover:bg-pink-600 transition-colors smooth"
            data-haptic
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Ajouter au Panier
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
