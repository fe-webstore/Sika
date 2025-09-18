
import { Sparkles, Leaf } from "lucide-react";

const Header = () => {
  return (
    <section className="gradient-bg rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full cute-dots"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Découvrez la <span className="text-green-600">Beauté Naturelle</span> avec Soft beauty! 🌸
          </h2>
          <p className="text-xl mb-6 text-gray-700">
            Explorez notre gamme de produits de beauté naturels conçus pour sublimer votre routine beauté. Parfait pour tous les types de peau et tous les besoins!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="pink-btn px-6 py-3 text-lg wobble inline-flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" /> Explorer les Produits
            </a>
            <a href="#contact" className="bg-white text-green-600 border-2 border-green-300 px-6 py-3 rounded-full text-lg hover:bg-green-50 transition-all inline-flex items-center justify-center">
              <Leaf className="w-4 h-4 mr-2" /> Comment ça Marche
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://i.pinimg.com/736x/18/84/a5/1884a51e20a214c5ed25b2da10e7f7f8.jpg"
            alt="Produits de beauté naturels"
            className="rounded-3xl shadow-xl w-full max-w-md h-64 md:h-80 object-cover border-4 border-white bounce"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
