
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Check, X } from "lucide-react";

interface PromoCodeProps {
  onApplyPromo: (discount: number, code: string) => void;
  appliedPromo?: { code: string; discount: number };
  onRemovePromo: () => void;
}

const PromoCode = ({ onApplyPromo, appliedPromo, onRemovePromo }: PromoCodeProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");

  const validPromoCodes = [
    { code: "SIKA-7XQ2-F9L3", discount: 15 },
    { code: "21SK-ZOPA-K88S", discount: 20 },
    { code: "SKA9-VTY4-33EZ", discount: 10 },
    { code: "X4SI-KA72-LPMQ", discount: 25 },
    { code: "SIKA-DEAL-2025", discount: 30 },
    { code: "SK10-AQZ8-B1KA", discount: 12 },
    { code: "S!KA-90TR-XEZ4", discount: 18 },
    { code: "FSKA-82LX-WINR", discount: 22 },
    { code: "ZKSA-45PL-#202", discount: 8 },
    { code: "S2KA-VIPX-YY33", discount: 35 }
  ];

  const handleApplyPromo = () => {
    setIsValidating(true);
    setError("");

    // Simulate validation delay
    setTimeout(() => {
      const foundCode = validPromoCodes.find(
        (promo) => promo.code.toUpperCase() === promoCode.toUpperCase()
      );

      if (foundCode) {
        onApplyPromo(foundCode.discount, foundCode.code);
        setPromoCode("");
        setError("");
      } else {
        setError("Code promo invalide");
      }
      setIsValidating(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyPromo();
    }
  };

  return (
    <Card className="cute-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{fontFamily: "'Short Stack', cursive"}}>
          <Tag className="w-5 h-5" />
          Code Promo
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appliedPromo ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">{appliedPromo.code}</span>
                <Badge className="bg-green-100 text-green-800">
                  -{appliedPromo.discount}%
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemovePromo}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Entrez votre code promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || isValidating}
                className="pink-btn"
              >
                {isValidating ? "..." : "Appliquer"}
              </Button>
            </div>
            {error && (
              <p className="text-slate-800 text-sm flex items-center gap-1">
                <X className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromoCode;
