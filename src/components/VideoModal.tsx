
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-green-600 border-2 border-green-300 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-all inline-flex items-center justify-center">
          <Play className="w-5 h-5 mr-2" /> Voir la Vidéo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 bg-black">
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            controls
            autoPlay
            className="w-full h-auto max-h-[80vh]"
            poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=450&fit=crop"
          >
            <source src="https://fe-store.pro/mes_portfolio/sikasite/demo.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
