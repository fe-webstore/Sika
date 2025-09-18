import { useState, useEffect } from "react";
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
  const { toast } = useToast();

  const product = products.find(p => p.id === parseInt(id || '1')) || products[0];

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
              <h1 className="text-3xl font-bold mb-4" style={{fontFamily: "'Short Stack', cursive"}}>
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

            {/* Avis Clients */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Avis Clients 💬</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-500 mr-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Fatou K. - Il y a 2 jours</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "J'ai commencé à l'utiliser le matin et ça marchait un peu, mais quand j'ai commencé à l'utiliser le soir aussi, les résultats ont doublé ! Ma peau n'a jamais été aussi éclatante. Je recommande vraiment d'utiliser ce produit matin et soir pour des résultats optimaux."
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-500 mr-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Aïcha M. - Il y a 1 semaine</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Au début j'étais sceptique, mais après 3 jours d'utilisation matin et soir, je vois déjà une différence ! Ma peau est plus douce et les imperfections commencent à disparaître. Le secret c'est vraiment la régularité - matin ET soir pour des résultats visibles rapidement."
                  </p>
                </div>
              </div>
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
                    Après votre première commande, une assistante personnelle restera en contact avec vous pour vous accompagner et vous expliquer en détail comment obtenir les meilleurs résultats en peu de temps possible.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Conseils personnalisés selon votre type de peau</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Suivi de vos progrès et ajustements</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600 mt-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Réponses à toutes vos questions beauté</span>
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

            <div className="flex items-center gap-4">
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

          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
