import { motion } from "framer-motion";
import { Brain, Zap, ShieldCheck, Layers, FileText } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Detection", desc: "State-of-the-art deep learning models trained on thousands of dermatological images." },
  { icon: Zap, title: "Fast Results", desc: "Get your analysis in seconds, not days. Instant feedback when you need it most." },
  { icon: ShieldCheck, title: "Privacy-First", desc: "Your images are never stored or shared. Analysis happens securely and privately." },
  { icon: Layers, title: "Multiple Lesion Types", desc: "Supports detection of melanoma, nevus, dermatofibroma, and many more conditions." },
  { icon: FileText, title: "Easy-to-Read Reports", desc: "Clear, jargon-free results with actionable next steps you can understand." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Why Choose DERMAI?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Built with care for accuracy, speed, and your peace of mind</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
