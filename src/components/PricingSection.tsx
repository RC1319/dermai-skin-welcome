import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Perfect for trying out DERMAI",
    features: ["3 scans per month", "Basic risk assessment", "Email support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For individuals who want more",
    features: ["Unlimited scans", "Detailed reports", "History & tracking", "Priority support", "Export reports"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For clinics and organizations",
    features: ["Unlimited users", "API access", "Custom integrations", "Dedicated support", "HIPAA compliant"],
    cta: "Contact Sales",
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Choose the plan that fits your needs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.featured
                  ? "border-primary bg-card shadow-xl scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">Most Popular</span>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`rounded-full w-full ${plan.featured ? "" : ""}`} variant={plan.featured ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
