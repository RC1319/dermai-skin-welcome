import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  { name: "Dr. Sarah Chen", role: "Chief Medical Officer", initials: "SC" },
  { name: "Alex Rivera", role: "Lead AI Engineer", initials: "AR" },
  { name: "Dr. James Park", role: "Dermatology Advisor", initials: "JP" },
  { name: "Maya Johnson", role: "Product Designer", initials: "MJ" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Making Dermatology Accessible to Everyone</h2>
            <p className="text-muted-foreground mb-4">
              We believe everyone deserves quick access to skin health insights. DERMAI combines cutting-edge AI with dermatological expertise to bring you reliable, instant analysis — no waiting rooms required.
            </p>
            <p className="text-muted-foreground">
              Our mission is to empower individuals to take the first step in understanding their skin health, while always encouraging professional medical consultation.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              {team.map((member) => (
                <div key={member.name} className="bg-card rounded-2xl border border-border p-5 text-center">
                  <Avatar className="w-14 h-14 mx-auto mb-3">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{member.initials}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-foreground text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
