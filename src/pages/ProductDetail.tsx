import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Leaf, Heart, Clock, ShoppingCart, MessageCircle, Users, Sparkles, CheckCircle } from "lucide-react";
import { CartItem } from "@/components/ShoppingCart";
import { products, Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const addToCartButtonRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const product = products.find(p => p.id === parseInt(id || '1')) || products[0];

  useEffect(() => {
    const handleScroll = () => {
      if (addToCartButtonRef.current) {
        const buttonRect = addToCartButtonRef.current.getBoundingClientRect();
        const isButtonVisible = buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight;
        
        // Afficher le bouton flottant seulement quand le bouton normal n'est pas visible
        setShowFloatingButton(!isButtonVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (productToAdd: Product, qty: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productToAdd.id);
      let newCart;
      if (existingItem) {
        newCart = prev.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        newCart = [...prev, { ...productToAdd, quantity: qty }];
      }
      localStorage.setItem('sikaCart', JSON.stringify(newCart));
      return newCart;
    });

    // Afficher le toast de confirmation
    toast({
      title: "Produit ajouté au panier ! 🛒",
      description: `${qty} x ${productToAdd.name} ajouté(s) à votre panier avec succès.`,
      duration: 3000,
    });
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f5f9f5'}}>
      <Navigation cartItemCount={itemCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-green-600 hover:underline">Produits</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="cute-card overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">
                {product.name} 💄
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-green-500 mr-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 - 124 avis)</span>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">
                {product.price.toFixed(0)} FCFA
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Bouton Ajouter au Panier - Directement sous la description */}
            <div ref={addToCartButtonRef} className="flex items-center gap-4">
              <div className="flex items-center border-2 border-green-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-green-50 rounded-l-full"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-green-50 rounded-r-full"
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={() => addToCart(product, quantity)}
                className="pink-btn px-8 py-3 flex-1 text-lg"
                style={{ backgroundColor: '#17150f' }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au Panier
              </Button>
            </div>

            {/* Section d'Accompagnement Personnalisé */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Accompagnement Personnalisé
                  </h3>
                  <p className="text-purple-700 mb-3">
                    {product.category === "Accessoires" 
                      ? "Après votre première commande, une assistante personnelle restera en contact avec vous pour vous donner des idées d'ensemble selon votre style et vous aider à créer des looks parfaits."
                      : "Après votre première commande, une assistante personnelle restera en contact avec vous pour vous accompagner et vous expliquer en détail comment obtenir les meilleurs résultats en peu de temps possible."
                    }
                  </p>
                  <div className="space-y-1">
                    {product.category === "Accessoires" ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Idées d'ensemble selon votre style</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Conseils pour assortir vos accessoires</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Inspirations look selon les occasions</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Conseils personnalisés selon votre type de peau</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Suivi de vos progrès et ajustements</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Réponses à toutes vos questions beauté</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Offre de Fidélité */}
            <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-6 rounded-2xl border border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Offre Fidélité Exclusive
                  </h3>
                  <p className="text-yellow-700 mb-3">
                    Après votre 3ᵉ commande, vous débloquez un avantage exclusif : chaque semaine, nous mettons en avant 2 produits 100% gratuits rien que pour nos clients fidèles ! À partir de votre 4ᵉ commande, vous pouvez ajouter à votre panier l'un des produits gratuits de la semaine, sans rien payer de plus. Et comme la sélection change chaque semaine, il y a toujours une nouvelle surprise à découvrir totalement gratuit.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-yellow-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>2 produits gratuits chaque semaine</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Sélection qui change chaque semaine</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Réservé aux clients fidèles uniquement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="cute-tag">
                <Leaf className="w-3 h-3 mr-1" /> 100% Naturel
              </span>
              <span className="cute-tag">
                <Heart className="w-3 h-3 mr-1" /> Longue tenue
              </span>
              <span className="cute-tag">
                <Clock className="w-3 h-3 mr-1" /> Livraison 24h
              </span>
            </div>


          </div>
        </div>
      </div>

      {/* Bouton Flottant */}
      {showFloatingButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => addToCart(product, quantity)}
            className="pink-btn px-6 py-3 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: '#17150f' }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ajouter au Panier
          </Button>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;
