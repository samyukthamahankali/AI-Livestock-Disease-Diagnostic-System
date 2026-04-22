import { motion } from "framer-motion";
import { Stethoscope, Database, Zap, ShieldCheck, BarChart3, Bell } from "lucide-react";

const features = [
  { icon: Stethoscope, title: "Symptom Analysis", desc: "Input symptoms via text or selection for instant matching against 20+ livestock diseases." },
  { icon: Database, title: "Disease Database", desc: "Comprehensive database covering viral, bacterial, parasitic, metabolic, and skin conditions." },
  { icon: Zap, title: "Instant Results", desc: "Get top 3 probable diseases sorted by match count with confidence scores." },
  { icon: ShieldCheck, title: "Severity Assessment", desc: "Each diagnosis includes severity level — Healthy, Mild, Moderate, or Severe." },
  { icon: BarChart3, title: "Confidence Scoring", desc: "AI-simulated confidence percentages based on symptom-to-disease match ratios." },
  { icon: Bell, title: "Treatment Guidance", desc: "Actionable suggestions for treatment, prevention, and when to consult a veterinarian." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Powerful <span className="text-gradient">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Everything you need to diagnose and manage livestock health effectively.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="gradient-card rounded-2xl border border-border p-6 shadow-card hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
