import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Sparkles, ArrowDown } from "lucide-react";
import dermaiLogo from "@/assets/dermai-logo.png";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Skin Analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
              Your Skin Health,{" "}
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Upload a photo of any skin lesion and get instant AI-powered analysis. Fast, private, and easy to understand — your first step toward peace of mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 text-base" asChild>
                <a href="#demo">
                  Try the Demo
                  <ArrowDown className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 flex items-center justify-center">
                <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                  <img src={dermaiLogo} alt="DERMAI" className="w-16 h-16 mx-auto mb-3" />
                  <p className="text-center font-bold text-foreground text-lg">Skin Scan</p>
                  <p className="text-center text-sm text-muted-foreground">AI Analysis Ready</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-xs text-muted-foreground">98.5% accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Results in seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
