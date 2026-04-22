import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-heading font-bold text-foreground">
        <Leaf className="w-5 h-5 text-primary" />
        LivestockAI
      </div>
      <p>© {new Date().getFullYear()} Malla Reddy University. Final Year Project.</p>
    </div>
  </footer>
);

export default Footer;
