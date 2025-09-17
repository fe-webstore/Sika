
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  cartItemCount: number;
}

const MobileMenu = ({ cartItemCount }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          />
          
          {/* Menu Content */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-green-600" style={{fontFamily: "'Short Stack', cursive"}}>
                Menu
              </h2>
              <Button variant="ghost" onClick={closeMenu}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-green-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <Home className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-lg">Accueil</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-green-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <ShoppingBag className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-lg">Produits</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-green-50 transition-colors relative"
                    onClick={closeMenu}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-lg">Panier</span>
                    {cartItemCount > 0 && (
                      <span className="absolute right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-green-50 transition-colors"
                    onClick={closeMenu}
                  >
                    <Phone className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-lg">Contact</span>
                  </a>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Link to="/cart" onClick={closeMenu}>
                  <button className="w-full pink-btn py-3 text-lg font-bold">
                    Voir le Panier ({cartItemCount})
                  </button>
                </Link>
                <a
                  href="https://chat.whatsapp.com/22991022734"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors">
                    WhatsApp
                  </button>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
