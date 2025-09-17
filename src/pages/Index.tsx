
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import ContactFooter from "@/components/sections/ContactFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartItem } from "@/components/ShoppingCart";
import { Product, products } from "@/data/products";

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
        <TestimonialsSection />
        <CallToActionSection />
      </div>

      <ContactFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
