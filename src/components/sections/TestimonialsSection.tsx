
import { Heart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "Les produits Sike Beauty ont transformé ma routine de soin! Les ingrédients naturels rendent ma peau incroyable!",
      author: "Amanda C.",
      role: "Amoureuse des Soins, 3 mois avec Sike",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      bgColor: "#fff8f8"
    },
    {
      id: 2,
      text: "En tant que blogueuse beauté, j'adore la facilité avec laquelle je peux trouver des produits qui conviennent à mon type de peau. La fonction d'échange d'ingrédients est révolutionnaire!",
      author: "Carlos M.",
      role: "Blogger Beauté, 1 an avec Sike",
      avatar: "https://i.pinimg.com/736x/89/40/af/8940af9a6040b37343be0d78b1ecd0a8.jpg",
      bgColor: "#f8f5ff"
    },
    {
      id: 3,
      text: "Je n'étais pas douée pour les soins de la peau avant Sike Beauty! Maintenant, j'ai une routine qui me convient parfaitement!",
      author: "Sophie D.",
      role: "Nouvelle en Soins, 6 mois avec Sike",
      avatar: "https://i.pinimg.com/736x/3d/13/49/3d134929ee2de1568d6735351f3a1241.jpg",
      bgColor: "#fff5f8"
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Ce que disent nos <span className="cute-underline">Clients Adorables</span> 💖
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="cute-card p-6 relative" style={{backgroundColor: testimonial.bgColor}}>
            <div className="absolute top-4 right-4 text-4xl opacity-20">❝</div>
            <p className="text-lg italic mb-6">
              "{testimonial.text}"
            </p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-green-300 mr-4"
              />
              <div>
                <h4 className="font-bold">{testimonial.author}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <div className="ml-auto text-green-400 text-2xl">
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
