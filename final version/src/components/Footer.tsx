import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="font-display text-lg font-bold">Greenfield Local Hub</span>
          </div>
          <p className="text-sm opacity-80">
            Supporting local farmers and food producers. Fresh, traceable, community-driven.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/products" className="hover:opacity-100">All Products</Link></li>
            <li><Link to="/producers" className="hover:opacity-100">Our Producers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/login" className="hover:opacity-100">Log In</Link></li>
            <li><Link to="/register" className="hover:opacity-100">Sign Up</Link></li>
            <li><Link to="/account" className="hover:opacity-100">My Orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Information</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Accessibility</li>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © 2026 Greenfield Local Hub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
