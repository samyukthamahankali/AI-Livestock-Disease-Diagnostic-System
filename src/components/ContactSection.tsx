import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <div className="gradient-card rounded-2xl border border-border p-8 shadow-card space-y-4">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Malla Reddy University, Hyderabad, India</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <span>contact@livestockai.edu</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
