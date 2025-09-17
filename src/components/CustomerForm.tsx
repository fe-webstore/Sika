
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone } from "lucide-react";
import { CartItem } from "./ShoppingCart";

interface CustomerFormProps {
  cartItems: CartItem[];
}

const CustomerForm = ({ cartItems }: CustomerFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SHEETS_WEBAPP_URL = (import.meta as any)?.env?.VITE_GOOGLE_SHEETS_WEBAPP_URL || "";

  const handleSubmitOrder = async () => {
    if (!customerName.trim()) {
      alert("Veuillez entrer votre nom");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Veuillez entrer votre numéro");
      return;
    }

    if (cartItems.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsPayload = cartItems.map(item => ({
      id: (item as any).id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    }));

    // Send to Google Sheets (if URL configured)
    if (!GOOGLE_SHEETS_WEBAPP_URL) {
      console.warn("VITE_GOOGLE_SHEETS_WEBAPP_URL manquant. Les commandes ne seront pas envoyées à Google Sheets.");
    } else {
      try {
        setIsSubmitting(true);
        const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerName.trim(),
            phone: phoneNumber.trim(),
            items: itemsPayload,
            total,
            currency: "FCFA",
            timestamp: new Date().toISOString(),
            source: "sika-glow-shop-benin"
          })
        });
        if (!res.ok) {
          console.error("Echec d'envoi vers Google Sheets", await res.text());
          alert("Impossible d'enregistrer la commande pour le moment. Veuillez réessayer.");
        } else {
          alert("Commande enregistrée avec succès. Merci !");
        }
      } catch (error) {
        console.error(error);
        alert("Une erreur est survenue lors de l'enregistrement de la commande.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glass-700">
          <MessageCircle className="w-5 h-5" />
          Finaliser ma commande
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="customerName" className="text-gray-700">Votre nom complet</Label>
          <Input
            id="customerName"
            type="text"
            placeholder="Entrez votre nom..."
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 bg-white/50 border-glass-200"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="text-gray-700">Votre numéro de téléphone</Label>
          <Input
            id="phoneNumber"
            type="tel"
            inputMode="tel"
            placeholder="Ex: +229 01 23 45 67"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 bg-white/50 border-glass-200"
          />
        </div>
        
        <div className="bg-glass-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-glass-600 mb-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium">Contact Sika</span>
          </div>
          <p className="text-sm text-gray-600">📞 +229 01-229</p>
          <p className="text-sm text-gray-600">📍 Calavi, Bénin</p>
        </div>

        <Button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || !customerName.trim() || !phoneNumber.trim() || cartItems.length === 0}
          className="w-full glass-button text-lg py-6"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {isSubmitting ? "Envoi en cours..." : "Commander"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
