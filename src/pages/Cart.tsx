
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart as CartIcon, Minus, Plus, Trash2, Phone, MessageCircle, Users, Sparkles, CheckCircle, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { CartItem } from "@/components/ShoppingCart";
import PromoCode from "@/components/PromoCode";
import CustomerForm from "@/components/CustomerForm";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | undefined>();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('sikaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Load applied promo from localStorage
    const savedPromo = localStorage.getItem('appliedPromo');
    if (savedPromo) {
      setAppliedPromo(JSON.parse(savedPromo));
    }
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => {
        const newCart = prev.filter(item => item.id !== id);
        localStorage.setItem('sikaCart', JSON.stringify(newCart));
        return newCart;
      });
    } else {
      setCartItems(prev => {
        const newCart = prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        localStorage.setItem('sikaCart', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== id);
      localStorage.setItem('sikaCart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleApplyPromo = (discount: number, code: string) => {
    const promo = { code, discount };
    setAppliedPromo(promo);
    localStorage.setItem('appliedPromo', JSON.stringify(promo));
  };

  const handleRemovePromo = () => {
    setAppliedPromo(undefined);
    localStorage.removeItem('appliedPromo');
  };


  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const total = subtotal - discountAmount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-50 via-white to-slate-50">
      {/* Animation 3D Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-heart absolute top-4 left-4 md:top-10 md:left-10 text-xl md:text-2xl text-glass-300 opacity-60">💖</div>
        <div className="floating-star absolute top-8 right-4 md:top-20 md:right-20 text-lg md:text-xl text-glass-300 opacity-60">⭐</div>
        <div className="floating-sparkle absolute bottom-16 left-4 md:bottom-20 md:left-20 text-base md:text-lg text-glass-300 opacity-60">✨</div>
        <div className="floating-flower absolute bottom-4 right-4 md:bottom-10 md:right-10 text-xl md:text-2xl text-glass-300 opacity-60">🌸</div>
      </div>

      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-4 md:mb-8">
          <Link to="/" className="mr-2 md:mr-4">
            <Button variant="outline" className="bg-glass-500 hover:bg-glass-600 text-white border-glass-400 text-sm md:text-base px-2 md:px-4 py-1 md:py-2">
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Retour aux Produits</span>
              <span className="sm:hidden">Retour</span>
            </Button>
          </Link>
          <h1 className="text-xl md:text-3xl font-bold text-glass-700">
            Mon Panier 🛒
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-glass-200 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-glass-700 text-lg md:text-xl">
                  <CartIcon className="w-4 h-4 md:w-5 md:h-5 text-glass-600" />
                  Mes Produits
                  {itemCount > 0 && (
                    <Badge className="bg-glass-500 text-white text-xs">{itemCount}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <CartIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto text-glass-300 mb-4" />
                    <p className="text-gray-500 text-base md:text-lg">Votre panier est vide</p>
                    <Link to="/">
                      <Button className="bg-glass-500 hover:bg-glass-600 text-white mt-4 text-sm md:text-base">
                        Découvrir nos Produits
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-glass-50 to-slate-50 rounded-xl border border-glass-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm md:text-lg text-glass-700 truncate">
                            {item.name}
                          </h4>
                          <p className="text-glass-600 font-semibold text-sm md:text-lg">
                            {item.price.toFixed(0)} FCFA
                          </p>
                          <span className="inline-block mt-1 md:mt-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs border border-slate-200">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                          <div className="flex items-center gap-1 md:gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="h-6 w-6 md:h-8 md:w-8 p-0 rounded-full border-glass-300 hover:bg-glass-50"
                            >
                              <Minus className="w-2 h-2 md:w-3 md:h-3 text-glass-600" />
                            </Button>
                            <span className="w-8 md:w-12 text-center font-bold text-sm md:text-lg text-glass-700">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 md:h-8 md:w-8 p-0 rounded-full border-glass-300 hover:bg-glass-50"
                            >
                              <Plus className="w-2 h-2 md:w-3 md:h-3 text-glass-600" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="h-6 w-6 md:h-8 md:w-8 p-0 mt-1 md:mt-0 md:ml-2 text-slate-600 hover:text-slate-800 rounded-full border-slate-300 hover:bg-slate-50"
                          >
                            <Trash2 className="w-2 h-2 md:w-3 md:h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Section */}
          <div className="space-y-4 md:space-y-6">
            {/* Promo Code */}
            <PromoCode 
              onApplyPromo={handleApplyPromo}
              appliedPromo={appliedPromo}
              onRemovePromo={handleRemovePromo}
            />

            {/* Order Summary */}
            <Card className="border-glass-200 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-glass-700 text-lg md:text-xl">Résumé de la Commande</CardTitle>
              </CardHeader>
              <CardContent className="px-3 md:px-6">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-glass-600 text-sm md:text-base">
                    <span>Sous-total:</span>
                    <span className="font-semibold">{subtotal.toFixed(0)} FCFA</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-glass-600 text-sm md:text-base">
                      <span>Réduction ({appliedPromo.code}):</span>
                      <span className="font-semibold">-{discountAmount.toFixed(0)} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-glass-600 text-sm md:text-base">
                    <span>Livraison:</span>
                    <span className="text-glass-600 font-semibold">Gratuite</span>
                  </div>
                  <Separator className="bg-glass-200" />
                  <div className="flex justify-between font-bold text-lg md:text-xl text-glass-700">
                    <span>Total:</span>
                    <span className="text-glass-600">{total.toFixed(0)} FCFA</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Form */}
            <CustomerForm cartItems={cartItems} />

            {/* Section d'Accompagnement Personnalisé */}
            <Card className="border-purple-200 shadow-lg bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Accompagnement Personnalisé
                    </h3>
                    <p className="text-purple-700 mb-3 text-sm md:text-base">
                      Après votre commande, une assistante personnelle restera en contact avec vous pour vous accompagner et vous expliquer en détail comment obtenir les meilleurs résultats en peu de temps possible.
                    </p>
                    <div className="space-y-2">
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
                      <div className="flex items-center gap-2 text-sm text-purple-600">
                        <Palette className="w-4 h-4" />
                        <span>Idées d'ensemble selon votre style</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Offre de Fidélité */}
            <Card className="border-yellow-200 shadow-lg bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-2xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Offre Fidélité Exclusive
                    </h3>
                    <p className="text-yellow-700 mb-3 text-sm md:text-base">
                      Après votre 3ᵉ commande, vous débloquez un avantage exclusif : chaque semaine, nous mettons en avant 2 produits 100% gratuits rien que pour nos clients fidèles ! À partir de votre 4ᵉ commande, vous pouvez ajouter à votre panier l'un des produits gratuits de la semaine, sans rien payer de plus. Et comme la sélection change chaque semaine, il y a toujours une nouvelle surprise à découvrir totalement gratuit.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-yellow-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>2 produits gratuits chaque semaine</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-yellow-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Sélection qui change chaque semaine</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-yellow-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Réservé aux clients fidèles uniquement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
