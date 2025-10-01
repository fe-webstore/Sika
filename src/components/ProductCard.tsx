
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
      <div className="cute-card h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="recipe-image"
        />
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold hover:text-slate-900 transition-colors">
              {product.name} 💄
            </h3>
            <div className="flex items-center text-slate-900">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-gray-700">4.8</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="cute-tag">
              <Leaf className="w-3 h-3 mr-1" /> Naturel
            </span>
            <span className="cute-tag">
              <Heart className="w-3 h-3 mr-1" /> Longue tenue
            </span>
            <span className="cute-tag">
              <Clock className="w-3 h-3 mr-1" /> {product.price.toFixed(0)} FCFA
            </span>
          </div>

        </div>
        <div className="px-6 pb-4">
          <button
            onClick={handleAddToCart}
            className="w-full pink-btn py-2 flex items-center justify-center hover:bg-pink-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Ajouter au Panier
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
