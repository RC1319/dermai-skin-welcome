import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import dermaiLogo from "@/assets/dermai-logo.png";

const FooterSection = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Ready to Check Your Skin?</h2>
            <p className="text-muted-foreground mb-8">Join thousands who trust DERMAI for quick, private skin analysis. Get started for free today.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Enter your email" className="pl-10 rounded-full h-12" />
              </div>
              <Button size="lg" className="rounded-full px-8">Get Early Access</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={dermaiLogo} alt="DERMAI" className="w-8 h-8 object-contain" />
                <span className="font-bold text-lg">DERMAI</span>
              </div>
              <p className="text-sm opacity-70">AI-powered skin lesion detection for everyone. Your first step to skin health awareness.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
                <li><a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a></li>
                <li><a href="#demo" className="hover:opacity-100 transition-opacity">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Company</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#about" className="hover:opacity-100 transition-opacity">About Us</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Careers</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-50">
            © 2026 DERMAI. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
