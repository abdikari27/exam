import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sampleOrders } from "@/data/mockData";
import { Star, Package, User, LogOut } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  confirmed: "bg-primary/20 text-primary",
  ready: "bg-success/20 text-success",
  collected: "bg-muted text-muted-foreground",
  delivered: "bg-muted text-muted-foreground",
};

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="container py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="text-sm text-muted-foreground">Name:</span> {user?.name}</p>
              <p><span className="text-sm text-muted-foreground">Email:</span> {user?.email}</p>
              <p><span className="text-sm text-muted-foreground">Role:</span> <Badge variant="secondary">{user?.role}</Badge></p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-secondary" /> Loyalty Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">{user?.loyaltyPoints}</p>
              <p className="text-sm text-muted-foreground">points earned</p>
              <Separator className="my-3" />
              <p className="text-xs text-muted-foreground">Earn 1 point for every £1 spent. Redeem 100 points for £5 off.</p>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full gap-2" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold">Order History</h2>
          <div className="mt-4 space-y-4">
            {sampleOrders.map(order => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <p className="text-xs text-muted-foreground">{order.date} · {order.method}</p>
                  </div>
                  <Badge className={statusColors[order.status]}>{order.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span className="font-medium">£{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">£{order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
