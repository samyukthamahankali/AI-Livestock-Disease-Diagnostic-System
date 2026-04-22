import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
          About <span className="text-gradient">This Project</span>
        </h2>
        <div className="gradient-card rounded-2xl border border-border p-8 shadow-card text-left space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This AI-Powered Livestock Disease Diagnostic System is a final year project developed at
            <span className="text-foreground font-medium"> Malla Reddy University</span>. It demonstrates how artificial intelligence
            can assist farmers in identifying potential livestock diseases through symptom-based analysis.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The system compares user-provided symptoms against a curated database of 20+ livestock diseases spanning
            viral, bacterial, parasitic, metabolic, and skin conditions — providing instant diagnostic predictions with
            confidence scores and treatment guidance.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-4">
            ⚠️ This tool is for educational purposes only. Always consult a qualified veterinarian for actual diagnosis and treatment.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
