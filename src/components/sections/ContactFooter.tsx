
import { Separator } from "@/components/ui/separator";

const ContactFooter = () => {
  return (
    <footer id="contact" className="contact-section py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-2 text-slate-900" style={{fontFamily: "'Short Stack', cursive"}}>
            nulla-eta 🌸
          </h3>
          <p className="text-slate-600">Votre beauté naturelle, notre passion</p>
        </div>

        <Separator className="my-6 bg-slate-300" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-800">
          <div>
            <h4 className="text-lg mb-3 text-slate-900">Contact</h4>
            <p className="mb-2">📞 +229 91 02 27 34 </p>
            <p>📍 Calavi, Bénin</p>
          </div>
          <div>
            <h4 className="text-lg mb-3 text-slate-900">Nos Produits</h4>
            <p className="mb-2">Rouge à lèvres • Masques</p>
            <p>Routines beauté • Soins corps</p>
          </div>
          <div>
            <h4 className="text-lg mb-3 text-slate-900">Qualité</h4>
            <p className="mb-2">Ingrédients naturels</p>
            <p></p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-300">
          <p className="text-slate-600">© 2024 nulla-eta & soft beauty - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
