import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products, sampleOrders } from "@/data/mockData";
import { Package, TrendingUp, Box, AlertTriangle } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const myProducts = products.filter(p => p.producer.id === "p1");

const ProducerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [stockLevels, setStockLevels] = useState<Record<string, number>>(
    Object.fromEntries(myProducts.map(p => [p.id, p.stock]))
  );

  if (!isAuthenticated || (user?.role !== "producer" && user?.role !== "admin")) {
    return <Navigate to="/login" />;
  }

  const updateStock = (productId: string, delta: number) => {
    setStockLevels(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
    toast.success("Stock updated");
  };

  return (
    <div className="container py-8">
      <h1 className="font-display text-3xl font-bold">Producer Dashboard</h1>
      <p className="text-muted-foreground">Manage your products, stock and orders</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Box, label: "Products Listed", value: myProducts.length, color: "text-primary" },
          { icon: Package, label: "Active Orders", value: 2, color: "text-secondary" },
          { icon: TrendingUp, label: "Revenue (This Month)", value: "£247.50", color: "text-primary" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold">Stock Management</h2>
          <div className="mt-4 space-y-3">
            {myProducts.map(p => (
              <Card key={p.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <img src={p.image} alt={p.name} className="h-14 w-14 rounded-md object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">£{p.price.toFixed(2)} {p.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {stockLevels[p.id] <= 5 && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    <Button variant="outline" size="sm" onClick={() => updateStock(p.id, -5)}>-5</Button>
                    <span className="w-10 text-center font-bold">{stockLevels[p.id]}</span>
                    <Button variant="outline" size="sm" onClick={() => updateStock(p.id, 5)}>+5</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold">Recent Orders</h2>
          <div className="mt-4 space-y-3">
            {sampleOrders.map(order => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">{order.id}</CardTitle>
                  <Badge variant="secondary">{order.status}</Badge>
                </CardHeader>
                <CardContent>
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm">{item.quantity}x {item.product.name}</p>
                  ))}
                  <Separator className="my-2" />
                  <p className="text-sm font-bold">Total: £{order.total.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;
