
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart as CartIcon, Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="glass-card sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glass-700">
          <CartIcon className="w-5 h-5" />
          Mon Panier
          {itemCount > 0 && (
            <Badge className="bg-glass-500 text-white">{itemCount}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-white/30 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                  <p className="text-glass-600 font-semibold">{item.price.toFixed(0)} FCFA</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRemoveItem(item.id)}
                    className="h-8 w-8 p-0 ml-1 text-slate-700 hover:text-slate-900"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span className="text-glass-600">{total.toFixed(0)} FCFA</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;
