import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import dermaiLogo from "@/assets/dermai-logo.png";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You've been signed out." });
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={dermaiLogo} alt="DERMAI Logo" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display' }}>DERMAI</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          {user ? (
            <Button variant="ghost" className="rounded-full px-6 gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          ) : (
            <Button variant="ghost" className="rounded-full px-6" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
          <Button className="rounded-full px-6" asChild>
            <a href="#demo">Try It Free</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Button variant="ghost" className="rounded-full w-full" asChild>
            <Link to="/auth" onClick={() => setMobileOpen(false)}>Login</Link>
          </Button>
          <Button className="rounded-full w-full" asChild>
            <a href="#demo" onClick={() => setMobileOpen(false)}>Try It Free</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
