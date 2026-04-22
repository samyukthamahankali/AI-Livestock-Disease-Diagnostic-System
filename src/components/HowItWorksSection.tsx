import { motion } from "framer-motion";
import { ClipboardList, Cpu, FileCheck } from "lucide-react";

const steps = [
  { icon: ClipboardList, step: "01", title: "Input Symptoms", desc: "Type or select observed symptoms from your livestock." },
  { icon: Cpu, step: "02", title: "AI Analysis", desc: "Our engine compares symptoms against 20+ known livestock diseases." },
  { icon: FileCheck, step: "03", title: "Get Results", desc: "Receive top 3 probable diseases with severity, confidence, and treatment suggestions." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">Three simple steps to diagnose your livestock.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <s.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-xs text-primary font-heading font-bold tracking-widest">STEP {s.step}</span>
            <h3 className="font-heading text-xl font-semibold mt-2 mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
