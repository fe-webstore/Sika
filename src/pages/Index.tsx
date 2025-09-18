
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import ContactFooter from "@/components/sections/ContactFooter";
import { CartItem } from "@/components/ShoppingCart";
import { Product, products } from "@/data/products";
import { Sparkles, CheckCircle } from "lucide-react";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('sikaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

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

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f5f9f5'}}>
      <Navigation cartItemCount={itemCount} />

      <div className="container mx-auto px-4 py-8">
        <Header />
        <ProductsSection featuredProducts={featuredProducts} onAddToCart={addToCart} />
        
        {/* Offre de Fidélité */}
        <div className="my-16">
          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-yellow-800 mb-4">
                ✨ Offre Fidélité Exclusive
              </h2>
              <p className="text-yellow-700 text-lg mb-6 max-w-4xl mx-auto">
                Après votre <strong>3ᵉ commande</strong>, débloquez un avantage exclusif : <strong>2 produits 100% gratuits chaque semaine</strong> ! 
                La sélection change chaque semaine, il y a toujours une nouvelle surprise à découvrir.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-yellow-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">2 produits gratuits/semaine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Sélection qui change</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Clients fidèles uniquement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TestimonialsSection />
        <CallToActionSection />
      </div>

      <ContactFooter />
    </div>
  );
};

export default Index;
