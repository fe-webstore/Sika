
import { UserPlus } from "lucide-react";
import VideoModal from "@/components/VideoModal";

const CallToActionSection = () => {
  const handleJoinWhatsApp = () => {
    const whatsappGroupLink = "https://chat.whatsapp.com/22991022734";
    window.open(whatsappGroupLink, '_blank');
  };

  return (
    <section className="gradient-bg rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-20">
      <div className="absolute top-0 right-0 w-full h-full cute-dots"></div>
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{fontFamily: "'Short Stack', cursive"}}>
          Prête à Commencer Votre <span className="cute-underline">Aventure Beauté?</span> 🚀
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Rejoignez notre communauté d'amoureux de la beauté et découvrez des milliers de produits incroyables!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleJoinWhatsApp}
            className="pink-btn px-8 py-4 text-lg font-bold wobble inline-flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" /> S'inscrire Gratuitement
          </button>
          <VideoModal />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
