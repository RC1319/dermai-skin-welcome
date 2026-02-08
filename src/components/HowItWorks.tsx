import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Take or upload a photo of any skin lesion directly from your device.",
  },
  {
    icon: Cpu,
    title: "Analyze",
    description: "Our AI processes your image using advanced detection algorithms in seconds.",
  },
  {
    icon: FileCheck,
    title: "Results",
    description: "Get clear insights, risk assessment, and recommended next steps.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to understand your skin better</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <step.icon className="w-9 h-9 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Connector lines (desktop) */}
        <div className="hidden md:flex justify-center mt-[-160px] mb-20 pointer-events-none">
          <div className="flex items-center gap-0 w-full max-w-2xl">
            <div className="flex-1 h-0.5 bg-border" />
            <div className="flex-1 h-0.5 bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
