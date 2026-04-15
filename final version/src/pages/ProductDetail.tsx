import { useParams, Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBasket } from "@/context/BasketContext";
import { toast } from "sonner";
import { ArrowLeft, Leaf, MapPin, ShoppingBasket, Shield } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useBasket();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Product not found.</p>
        <Link to="/products"><Button variant="outline" className="mt-4">Back to Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/products" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Products
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {product.organic && (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              <Leaf className="mr-1 h-3 w-3" /> Organic
            </Badge>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="font-display text-3xl font-bold">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">by {product.producer.name}</p>

          <div className="mt-4">
            <span className="text-3xl font-bold text-primary">£{product.price.toFixed(2)}</span>
            <span className="ml-2 text-muted-foreground">{product.unit}</span>
          </div>

          <p className="mt-4 text-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border">
              <Button variant="ghost" size="sm" onClick={() => setQty(Math.max(1, qty - 1))}>−</Button>
              <span className="w-10 text-center font-medium" aria-label="Quantity">{qty}</span>
              <Button variant="ghost" size="sm" onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</Button>
            </div>
            <Button
              onClick={() => { addItem(product, qty); toast.success(`${qty}x ${product.name} added to basket`); }}
              disabled={product.stock === 0}
              className="gap-2"
            >
              <ShoppingBasket className="h-4 w-4" /> Add to Basket
            </Button>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Currently out of stock"}
          </p>

          {/* Traceability */}
          <div className="mt-8 rounded-lg border bg-card p-4">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Shield className="h-5 w-5 text-primary" /> Product Traceability
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Origin</span>
                <span className="font-medium">{product.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Producer</span>
                <span className="font-medium">{product.producer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="flex items-center gap-1 font-medium"><MapPin className="h-3 w-3" />{product.producer.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Methods</span>
                <span className="max-w-[60%] text-right font-medium">{product.producer.methods}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
