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
            className="absolute top-4 right-4 z-20 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/06-pZYIbhgA?autoplay=1&modestbranding=1&rel=0&controls=0&fs=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
            {/* Overlay to block all interactions with the iframe */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-transparent"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
            ></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
