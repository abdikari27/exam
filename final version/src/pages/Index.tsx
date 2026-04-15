import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, Leaf, MapPin, Star, ShoppingBasket } from "lucide-react";
import { producers, products } from "@/data/mockData";
import { useBasket } from "@/context/BasketContext";
import { toast } from "sonner";

const Index = () => {
  const { addItem } = useBasket();

  const handleAddToBasket = (product: typeof products[0]) => {
    addItem(product);
    toast.success(`${product.name} added to basket`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=700&fit=crop"
            alt="Fresh farm produce"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative py-24 md:py-36">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">🌱 Fresh from local farms</Badge>
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Farm-Fresh Food,{" "}
              <span className="text-secondary">Straight to You</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Greenfield Local Hub connects you directly with local farmers and food producers.
              Browse, order, and enjoy traceable, sustainably produced food.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="gap-2 text-base">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/producers">
                <Button size="lg" variant="secondary" className="gap-2 text-base">
                  Meet Our Producers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: MapPin, title: "Locally Sourced", desc: "Every product comes from farms and producers within 30 miles of Greenfield." },
            { icon: Shield, title: "Full Traceability", desc: "Know exactly where your food comes from — farm to fork transparency." },
            { icon: Truck, title: "Collection or Delivery", desc: "Choose convenient collection from our hub or delivery straight to your door." },
          ].map(b => (
            <Card key={b.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">Fresh This Week</h2>
              <p className="mt-1 text-muted-foreground">Hand-picked seasonal favourites from our producers</p>
            </div>
            <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline md:block">
              View all products →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map(p => (
              <Card key={p.id} className="group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  {p.organic && (
                    <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                      <Leaf className="mr-1 h-3 w-3" /> Organic
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{p.producer.name}</p>
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">£{p.price.toFixed(2)}</span>
                      <span className="ml-1 text-xs text-muted-foreground">{p.unit}</span>
                    </div>
                    <Button size="sm" onClick={() => handleAddToBasket(p)}>
                      <ShoppingBasket className="mr-1 h-4 w-4" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Producers */}
      <section className="bg-primary/5 py-16">
        <div className="container">
        <h2 className="font-display text-3xl font-bold text-foreground">🧑‍🌾 Meet Our Producers</h2>
        <p className="mt-1 text-muted-foreground">The passionate people behind your food</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {producers.slice(0, 3).map(p => (
            <Link to="/producers" key={p.id}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {p.location}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* Loyalty CTA */}
      <section className="bg-secondary/10 py-16">
        <div className="container text-center">
          <Star className="mx-auto mb-4 h-10 w-10 text-secondary" />
          <h2 className="font-display text-3xl font-bold">Join Our Loyalty Programme</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Earn points with every purchase, unlock exclusive discounts and get early access to seasonal specials.
          </p>
          <Link to="/register">
            <Button size="lg" className="mt-6">Create Your Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
