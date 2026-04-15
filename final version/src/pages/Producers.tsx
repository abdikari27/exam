import { producers, products } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Leaf } from "lucide-react";

const Producers = () => (
  <div className="container py-8">
    <h1 className="font-display text-3xl font-bold">Our Producers</h1>
    <p className="mt-1 text-muted-foreground">Meet the passionate local farmers and producers behind your food</p>

    <div className="mt-8 space-y-8">
      {producers.map(p => {
        const producerProducts = products.filter(pr => pr.producer.id === p.id);
        return (
          <Card key={p.id} className="overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="aspect-video overflow-hidden md:aspect-auto">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <CardContent className="p-6 md:col-span-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-bold">{p.name}</h2>
                  <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{p.location}</Badge>
                  <Badge variant="outline" className="gap-1"><Calendar className="h-3 w-3" />Est. {p.established}</Badge>
                </div>
                <p className="mt-3 text-foreground">{p.description}</p>
                <div className="mt-3 rounded-md bg-muted p-3">
                  <p className="text-sm"><span className="font-semibold">Growing Methods:</span> {p.methods}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-muted-foreground">Products ({producerProducts.length})</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {producerProducts.map(pr => (
                      <Badge key={pr.id} variant="secondary" className="gap-1">
                        {pr.organic && <Leaf className="h-3 w-3" />}
                        {pr.name} — £{pr.price.toFixed(2)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

export default Producers;
