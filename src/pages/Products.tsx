import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/data/products";
import { CartItem } from "@/components/ShoppingCart";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import PromoCode from "@/components/PromoCode";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('sikaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedPromo = localStorage.getItem('sikaPromo');
    if (savedPromo) {
      setAppliedPromo(JSON.parse(savedPromo));
    }
  }, []);


  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('sikaCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleApplyPromo = (discount: number, code: string) => {
    const promoData = { code, discount };
    setAppliedPromo(promoData);
    localStorage.setItem('sikaPromo', JSON.stringify(promoData));
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    localStorage.removeItem('sikaPromo');
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f5f9f5'}}>
      <Navigation cartItemCount={itemCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <button className="pink-btn px-4 py-2 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              Tous nos Produits
            </h1>
            <p className="text-gray-600">Découvrez toute notre collection de beauté naturelle</p>
          </div>
        </div>

        {/* Search and Promo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SearchBar 
              onSearch={(q) => {
                setSearchQuery(q);
                if (q.trim().toLowerCase() === 'admin2006') {
                  navigate('/admin');
                }
              }}
              placeholder="Rechercher des produits..."
            />
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2">
                {filteredProducts.length} produit(s) trouvé(s) pour "{searchQuery}"
              </p>
            )}
          </div>
          <div>
            <PromoCode
              onApplyPromo={handleApplyPromo}
              appliedPromo={appliedPromo}
              onRemovePromo={handleRemovePromo}
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Aucun produit trouvé</p>
            <p className="text-gray-500">Essayez avec d'autres mots-clés</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Products;
