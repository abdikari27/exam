import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket, User, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/context/BasketContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/producers", label: "Our Producers" },
];

const Navbar = () => {
  const { totalItems } = useBasket();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "producer") return "/dashboard";
    if (user.role === "admin") return "/admin";
    return "/account";
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-primary">Greenfield Local Hub</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/basket">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBasket className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping basket</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to={getDashboardLink()}>
                <Button variant="ghost" size="sm">
                  <User className="mr-1 h-4 w-4" />
                  {user?.name.split(" ")[0]}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link to="/register"><Button size="sm">Sign up</Button></Link>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">
                    {link.label}
                  </Link>
                ))}
                <hr className="border-border" />
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary">My Account</Link>
                    <Button variant="outline" onClick={() => { logout(); setOpen(false); }}>Log out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}><Button className="w-full" variant="outline">Log in</Button></Link>
                    <Link to="/register" onClick={() => setOpen(false)}><Button className="w-full">Sign up</Button></Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
