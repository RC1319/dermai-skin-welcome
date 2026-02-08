import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Emily R.", role: "Patient", initials: "ER", quote: "DERMAI gave me peace of mind when I noticed a new mole. The results were instant and easy to understand. I still saw my dermatologist, but it helped me feel prepared." },
  { name: "Dr. Michael T.", role: "Dermatologist", initials: "MT", quote: "I recommend DERMAI to my patients as a first-check tool. It's remarkably accurate and helps people seek care sooner when something looks concerning." },
  { name: "Lisa K.", role: "Nurse Practitioner", initials: "LK", quote: "The privacy-first approach is what won me over. Knowing that images aren't stored makes it easy to recommend to patients who are privacy-conscious." },
  { name: "David S.", role: "Patient", initials: "DS", quote: "I was worried about a spot on my arm for weeks. DERMAI analyzed it in seconds and suggested I see a doctor. Turned out to be nothing, but I'm glad I checked!" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">What People Are Saying</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Trusted by patients and healthcare professionals alike</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
