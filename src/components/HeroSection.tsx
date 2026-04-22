import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/hero-livestock.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="AI-powered livestock health monitoring" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      <div className="absolute inset-0 gradient-glow opacity-50" />
    </div>

    <div className="container relative z-10 py-20">
      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
          <Shield className="w-4 h-4" />
          Malla Reddy University — Final Year Project
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI Livestock Disease{" "}<span className="text-gradient">Diagnostic System</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
          Smart Farming with AI-Powered Animal Health Monitoring. Input symptoms and get instant disease predictions to protect your livestock.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4">
          <a href="#demo" className="inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-xl shadow-glow hover:opacity-90 transition-opacity text-lg">
            Check Animal Health <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 border border-border bg-secondary/50 text-secondary-foreground font-heading font-medium px-8 py-4 rounded-xl hover:bg-secondary transition-colors text-lg">
            How It Works
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
