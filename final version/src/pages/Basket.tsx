import { useBasket } from "@/context/BasketContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBasket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Basket = () => {
  const { items, removeItem, updateQuantity, clearBasket, totalPrice } = useBasket();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBasket className="mx-auto h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your basket is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our products and add items to your basket.</p>
        <Link to="/products"><Button className="mt-6">Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="font-display text-3xl font-bold">Shopping Basket</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map(item => (
            <Card key={item.product.id} className="flex items-center gap-4 p-4">
              <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-md object-cover" />
              <div className="flex-1">
                <h3 className="font-display font-semibold">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">{item.product.producer.name} · {item.product.unit}</p>
                <p className="mt-1 font-bold text-primary">£{(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { removeItem(item.product.id); toast.info("Item removed"); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </Card>
          ))}
          <Button variant="outline" size="sm" onClick={() => { clearBasket(); toast.info("Basket cleared"); }}>Clear Basket</Button>
        </div>

        <Card>
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span className="text-primary font-medium">{totalPrice >= 25 ? "FREE" : "£3.50"}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">£{(totalPrice + (totalPrice >= 25 ? 0 : 3.50)).toFixed(2)}</span>
            </div>
            {totalPrice < 25 && <p className="text-xs text-muted-foreground">Spend £{(25 - totalPrice).toFixed(2)} more for free delivery</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2" onClick={() => toast.success("Order placed successfully! (Demo)")}>
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Basket;
