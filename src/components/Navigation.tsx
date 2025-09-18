
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";

interface NavigationProps {
  cartItemCount: number;
}

const Navigation = ({ cartItemCount }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600">
            nulla-eta 🌸
            </h1>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">
              Produits
            </Link>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Cart Button */}
          <div className="hidden md:flex items-center">
            <Link to="/cart">
              <Button className="pink-btn relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Panier</span>
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu and Cart */}
          <div className="flex items-center md:hidden space-x-2">
            <Link to="/cart">
              <Button className="pink-btn relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <MobileMenu cartItemCount={cartItemCount} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
