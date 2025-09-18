
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Phone, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { CartItem } from "./ShoppingCart";

interface CustomerFormProps {
  cartItems: CartItem[];
}

const CustomerForm = ({ cartItems }: CustomerFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>("idle");

  const GOOGLE_SHEETS_WEBAPP_URL = (import.meta as any)?.env?.VITE_GOOGLE_SHEETS_WEBAPP_URL || "https://script.google.com/macros/s/AKfycbzPtbBeHVTIfNWgK1tiTEiq1cPY6_sPfc2JyLed1tpYAChBXjiymO29teHp1q0DLos/exec";

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
    try {
      setIsSubmitting(true);
      setStatus('idle');

      // Assure a minimal visible spinner duration
      const minDelay = new Promise((resolve) => setTimeout(resolve, 800));

      if (!GOOGLE_SHEETS_WEBAPP_URL) {
        console.warn("VITE_GOOGLE_SHEETS_WEBAPP_URL manquant. Les commandes ne seront pas envoyées à Google Sheets.");
        await minDelay;
        setStatus('error');
        return;
      }

      const normalizedPhone = phoneNumber.trim().replace(/^\+/, "");
      const resPromise = fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: "POST",
        // Use simple request to avoid CORS preflight (no custom headers beyond text/plain)
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        // Important: avoid preflight by sending plain text JSON
        body: JSON.stringify({
          name: customerName.trim(),
          phone: normalizedPhone,
          items: itemsPayload,
          total,
          currency: "FCFA",
          timestamp: new Date().toISOString(),
          source: "sika-glow-shop-benin"
        }),
        // As a last resort, allow browser to send request even if response is opaque
        // Note: in no-cors mode, we cannot read the response, but the request is delivered
        mode: "no-cors"
      });

      const res = await Promise.all([resPromise, minDelay]).then(([r]) => r);

      // In no-cors mode, response is opaque; treat as success if no network error occurred
      setStatus('success');

      // Persist order locally for the admin page
      try {
        const existing = JSON.parse(localStorage.getItem('sikaOrders') || '[]');
        const newOrder = {
          id: Date.now(),
          name: customerName.trim(),
          phone: normalizedPhone,
          items: itemsPayload,
          total,
          currency: 'FCFA',
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('sikaOrders', JSON.stringify([newOrder, ...existing]));
      } catch {}
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glass-700">
          <ShoppingCart className="w-5 h-5" />
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
            placeholder="Ex: 229 01 23 45 67"
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
          <p className="text-sm text-gray-600">📞 229 01 22 90</p>
          <p className="text-sm text-gray-600">📍 Calavi,Bénin</p>
        </div>

        <Button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || !customerName.trim() || !phoneNumber.trim() || cartItems.length === 0}
          className="w-full glass-button text-lg py-6"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isSubmitting ? "Envoi en cours..." : "Commander"}
        </Button>

        {isSubmitting && (
          <div className="flex items-center justify-center mt-2 text-sm text-glass-600">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </div>
        )}

        {!isSubmitting && status === 'success' && (
          <div className="flex items-center justify-center mt-2 text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Commande enregistrée avec succès.
          </div>
        )}

        {!isSubmitting && status === 'error' && (
          <div className="flex items-center justify-center mt-2 text-sm text-red-600">
            <XCircle className="w-4 h-4 mr-2" />
            Impossible d'enregistrer la commande. Réessayez.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
