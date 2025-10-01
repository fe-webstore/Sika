
import { Sparkles, Leaf } from "lucide-react";

const Header = () => {
  return (
    <section className="gradient-bg rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full cute-dots"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Découvrez la <span className="text-slate-900">Beauté Naturelle</span> avec Soft beauty! 🌸
          </h2>
          <p className="text-xl mb-6 text-gray-700">
            Explorez notre gamme de produits de beauté naturels conçus pour sublimer votre routine beauté. Parfait pour tous les types de peau et tous les besoins!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="pink-btn px-6 py-3 text-lg wobble inline-flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" /> Explorer les Produits
            </a>
            <a href="#contact" className="bg-white text-slate-900 border-2 border-slate-300 px-6 py-3 rounded-full text-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center">
              <Leaf className="w-4 h-4 mr-2" /> Comment ça Marche
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center hero-stage">
          {/* Decorative 3D shapes */}
          <div className="hero-blob" style={{ top: '10%', left: '5%' }} />
          <div className="hero-blob alt" style={{ bottom: '8%', right: '0%' }} />
          <div className="hero-ring" style={{ top: '40%', left: '-6%' }} />
          <img 
            src="https://i.postimg.cc/cLJVDDNx/14f033ca25e1e6e585b346c8851997a8-removebg-preview.png"
            alt="Produits de beauté naturels"
            className="w-full max-w-2xl h-96 md:h-[32rem] object-contain hero-3d relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
