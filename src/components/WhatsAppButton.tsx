
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Remplacez ce numéro par le vrai numéro WhatsApp
    const phoneNumber = "+229 91 02 27 34"; // Numéro du footer
    const message = "Salut! Je suis intéressé(e) par vos produits  🌸";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-slate-900 hover:bg-black text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Contact WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
