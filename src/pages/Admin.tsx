import { useEffect, useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface StoredOrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  image?: string;
  category?: string;
}

interface StoredOrder {
  id: number;
  name: string;
  phone: string;
  items: StoredOrderItem[];
  total: number;
  currency: string;
  timestamp: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [repoOrders, setRepoOrders] = useState<StoredOrder[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sikaOrders');
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch {}
    }
    // Try load repo orders from public/orders.json
    fetch('/orders.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setRepoOrders(data);
      })
      .catch(() => {});
  }, []);

  const stats = useMemo(() => {
    const count = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0), 0);
    return { count, totalRevenue, totalItems };
  }, [orders]);

  const deleteOrder = (id: number) => {
    const next = orders.filter(o => o.id !== id);
    setOrders(next);
    localStorage.setItem('sikaOrders', JSON.stringify(next));
  };

  const exportOrders = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importOrders = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'));
        if (Array.isArray(parsed)) {
          const merged = [...parsed, ...orders].sort((a, b) => (b.timestamp?.localeCompare?.(a.timestamp) || 0));
          setOrders(merged);
          localStorage.setItem('sikaOrders', JSON.stringify(merged));
        }
      } catch {}
    };
    reader.readAsText(file);
  };

  const clearLocal = () => {
    setOrders([]);
    localStorage.removeItem('sikaOrders');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-50 via-white to-nature-50 p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold text-glass-700 mb-6">Admin - Commandes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.count}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Articles vendus</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.totalItems}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenus</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{stats.totalRevenue.toFixed(0)} FCFA</CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={exportOrders} className="bg-glass-500 hover:bg-glass-600 text-white">Télécharger orders.json</Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Importer orders.json</Button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importOrders(f);
          }} />
          <Button variant="outline" onClick={clearLocal} className="border-red-300 text-red-600 hover:bg-red-50">Vider commandes locales</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des commandes (Local)</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-gray-500">Aucune commande enregistrée pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-4 rounded-lg border border-glass-200 bg-white/70">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="font-semibold text-glass-700">{order.name} • {order.phone}</p>
                        <p className="text-sm text-gray-600">{new Date(order.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="font-bold text-glass-700">{order.total.toFixed(0)} {order.currency}</div>
                    </div>
                    <Separator className="my-3" />
                    <div className="space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-glass-700">{it.name} x{it.quantity}</span>
                          <span className="text-gray-600">{it.subtotal.toFixed(0)} {order.currency}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" onClick={() => deleteOrder(order.id)} className="border-red-300 text-red-600 hover:bg-red-50">Supprimer</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6" />
        <Card>
          <CardHeader>
            <CardTitle>Commandes depuis le dépôt (orders.json)</CardTitle>
          </CardHeader>
          <CardContent>
            {repoOrders.length === 0 ? (
              <p className="text-gray-500">Aucune commande trouvée dans orders.json (public).</p>
            ) : (
              <div className="space-y-4">
                {repoOrders.map((order, idx) => (
                  <div key={order.id ?? idx} className="p-4 rounded-lg border border-nature-200 bg-nature-50/70">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="font-semibold text-glass-700">{order.name} • {order.phone}</p>
                        <p className="text-sm text-gray-600">{new Date(order.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="font-bold text-glass-700">{(order.total||0).toFixed(0)} {order.currency}</div>
                    </div>
                    <Separator className="my-3" />
                    <div className="space-y-1">
                      {order.items?.map((it, i2) => (
                        <div key={i2} className="flex justify-between text-sm">
                          <span className="text-glass-700">{it.name} x{it.quantity}</span>
                          <span className="text-gray-600">{(it.subtotal||0).toFixed(0)} {order.currency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;


