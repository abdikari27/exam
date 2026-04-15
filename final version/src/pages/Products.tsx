import { useState } from "react";
import { products, categories } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBasket } from "@/context/BasketContext";
import { toast } from "sonner";
import { Search, Leaf, ShoppingBasket, Grid3X3, LayoutList, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useBasket();

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.producer.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="font-display text-4xl font-bold">Our Products</h1>
        <p className="mt-1 text-lg text-muted-foreground">Fresh, local produce from Greenfield's finest producers</p>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-40 -mx-2 mb-6 rounded-xl border bg-background/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products or producers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
              aria-label="Search products"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {categories.map(c => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="ml-2 hidden gap-1 border-l pl-2 md:flex">
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("grid")} aria-label="Grid view">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setViewMode("list")} aria-label="List view">
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(p => (
            <Card key={p.id} className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
              <Link to={`/products/${p.id}`} className="relative aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  {p.organic && (
                    <Badge className="bg-primary text-primary-foreground shadow-sm">
                      <Leaf className="mr-1 h-3 w-3" /> Organic
                    </Badge>
                  )}
                  {p.stock <= 5 && (
                    <Badge variant="destructive" className="shadow-sm">Low Stock</Badge>
                  )}
                </div>
              </Link>
              <CardContent className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {p.producer.name}
                </div>
                <Link to={`/products/${p.id}`}>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-tight hover:text-primary">{p.name}</h3>
                </Link>
                <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary">£{p.price.toFixed(2)}</span>
                    <span className="ml-1 block text-[11px] text-muted-foreground">{p.unit}</span>
                  </div>
                  <Button
                    size="sm"
                    className="gap-1.5 rounded-full"
                    onClick={() => { addItem(p); toast.success(`${p.name} added to basket`); }}
                    disabled={p.stock === 0}
                  >
                    <ShoppingBasket className="h-4 w-4" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filtered.map(p => (
            <Card key={p.id} className="group overflow-hidden transition-shadow hover:shadow-md">
              <div className="flex items-stretch">
                <Link to={`/products/${p.id}`} className="relative w-32 shrink-0 overflow-hidden sm:w-44">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.organic && (
                    <Badge className="absolute left-1.5 top-1.5 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                      <Leaf className="mr-0.5 h-2.5 w-2.5" /> Organic
                    </Badge>
                  )}
                </Link>
                <CardContent className="flex flex-1 items-center gap-4 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {p.producer.name} · {p.producer.location}
                    </div>
                    <Link to={`/products/${p.id}`}>
                      <h3 className="font-display text-lg font-semibold hover:text-primary">{p.name}</h3>
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">{p.description}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                      {p.stock <= 5 && <Badge variant="destructive" className="text-[10px]">Low Stock</Badge>}
                      <span className="text-xs text-muted-foreground">{p.stock} in stock</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="text-right">
                      <span className="text-xl font-bold text-primary">£{p.price.toFixed(2)}</span>
                      <span className="block text-[11px] text-muted-foreground">{p.unit}</span>
                    </div>
                    <Button
                      size="sm"
                      className="gap-1.5 rounded-full"
                      onClick={() => { addItem(p); toast.success(`${p.name} added to basket`); }}
                      disabled={p.stock === 0}
                    >
                      <ShoppingBasket className="h-4 w-4" /> Add
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found matching your search.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</Button>
        </div>
      )}
    </div>
  );
};

export default Products;
