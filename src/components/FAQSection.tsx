import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate is DERMAI?", a: "Our AI models achieve over 95% accuracy on benchmark datasets. However, DERMAI is designed as a screening tool and should not replace professional medical diagnosis. Always consult a dermatologist for definitive results." },
  { q: "Is my data private and secure?", a: "Absolutely. We do not store your images after analysis. All processing happens securely, and your data is never shared with third parties." },
  { q: "What skin conditions can DERMAI detect?", a: "DERMAI can analyze a wide range of skin lesions including melanoma, melanocytic nevi, basal cell carcinoma, dermatofibroma, vascular lesions, and more." },
  { q: "Can DERMAI replace a dermatologist?", a: "No. DERMAI is a screening and awareness tool designed to help you take the first step. We always recommend consulting a qualified healthcare professional for diagnosis and treatment." },
  { q: "How fast are the results?", a: "Results are typically delivered within 5-10 seconds after uploading your image." },
  { q: "Is there a free plan available?", a: "Yes! Our free plan includes 3 scans per month with basic risk assessment. You can upgrade anytime for unlimited scans and detailed reports." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Got questions? We've got answers</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
