import { motion } from "framer-motion";
import { Clock, DollarSign, TrendingUp, Heart } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Early Detection", desc: "Catch diseases before they spread across your herd." },
  { icon: DollarSign, title: "Reduce Losses", desc: "Minimize livestock mortality and economic losses." },
  { icon: TrendingUp, title: "Improve Productivity", desc: "Healthier animals mean better milk, meat, and breeding outcomes." },
  { icon: Heart, title: "Animal Welfare", desc: "Ensure humane treatment with timely medical interventions." },
];

const BenefitsSection = () => (
  <section id="benefits" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Why <span className="text-gradient">Choose Us</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="text-center gradient-card rounded-2xl border border-border p-6 shadow-card">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <b.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold mb-1">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
