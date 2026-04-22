import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, XCircle, Info, Loader2, Upload, X, ImageIcon } from "lucide-react";
import { diagnoseSymptoms, allSymptomOptions, type DiagnosisResult } from "@/lib/diseaseDatabase";

type Severity = "healthy" | "mild" | "moderate" | "severe";

const severityConfig: Record<Severity, { color: string; bg: string; icon: typeof CheckCircle; label: string }> = {
  healthy: { color: "text-primary", bg: "bg-primary/10 border-primary/30", icon: CheckCircle, label: "Healthy" },
  mild: { color: "text-accent", bg: "bg-accent/10 border-accent/30", icon: Info, label: "Mild" },
  moderate: { color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", icon: AlertTriangle, label: "Moderate" },
  severe: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", icon: XCircle, label: "Severe" },
};

const DemoSection = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSymptom = (s: string) =>
    setSelectedSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).slice(0, 3 - uploadedImages.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 3));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleAnalyze = () => {
    const allInputs = [
      ...selectedSymptoms,
      ...customInput.split(",").map((s) => s.trim()).filter(Boolean),
    ];
    if (allInputs.length === 0 && uploadedImages.length === 0) return;

    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      const res = diagnoseSymptoms(allInputs);
      setResults(res);
      setAnalyzing(false);
    }, 1800);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setCustomInput("");
    setResults(null);
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
  };

  return (
    <section id="demo" className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Try the <span className="text-gradient">Diagnostic Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Upload images and select symptoms to get AI-powered disease predictions.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="gradient-card rounded-2xl border border-border p-6 shadow-card space-y-5">

            {/* Image upload */}
            <div>
              <label className="font-heading font-semibold text-sm mb-2 block">Upload Animal Images (max 3)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-wrap gap-3">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border group">
                    <img src={img.preview} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {uploadedImages.length < 3 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Upload</span>
                  </button>
                )}
              </div>
            </div>

            {/* Custom input */}
            <div>
              <label className="font-heading font-semibold text-sm mb-2 block">Type Symptoms (comma-separated)</label>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g., fever, drooling, blisters on mouth"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Symptom chips */}
            <div>
              <label className="font-heading font-semibold text-sm mb-3 block">Or Select Common Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {allSymptomOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedSymptoms.includes(s)
                        ? "gradient-primary text-primary-foreground border-transparent"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || (selectedSymptoms.length === 0 && customInput.trim() === "" && uploadedImages.length === 0)}
                className="flex-1 inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {analyzing ? "Analyzing..." : "Diagnose"}
              </button>
              <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors">
                Reset
              </button>
            </div>
          </motion.div>

          {/* Results panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="gradient-card rounded-2xl border border-border p-6 shadow-card flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {analyzing ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-muted-foreground font-heading">
                    {uploadedImages.length > 0 ? "Analyzing images & symptoms..." : "AI is analyzing symptoms..."}
                  </p>
                </motion.div>
              ) : results !== null ? (
                results.length === 0 ? (
                  <motion.div key="no-match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <p className="font-heading text-lg font-semibold">Condition unknown or animal appears healthy.</p>
                    <p className="text-sm text-muted-foreground mt-1">No diseases matched the provided symptoms.</p>
                  </motion.div>
                ) : (
                  <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="space-y-4 w-full">
                    <h3 className="font-heading font-bold text-lg mb-2">Top {results.length} Probable Diseases</h3>
                    {uploadedImages.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {uploadedImages.map((img, i) => (
                          <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                            <img src={img.preview} alt={`Analyzed ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="flex items-center text-xs text-muted-foreground ml-1">
                          <ImageIcon className="w-3.5 h-3.5 mr-1" />
                          {uploadedImages.length} image{uploadedImages.length > 1 ? "s" : ""} analyzed
                        </div>
                      </div>
                    )}
                    {results.map((r, i) => {
                      const cfg = severityConfig[r.severity];
                      const Icon = cfg.icon;
                      return (
                        <div key={r.disease} className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground font-heading">#{i + 1}</span>
                              <h4 className="font-heading font-bold">{r.disease}</h4>
                              <span className="text-xs text-muted-foreground capitalize">{r.type}</span>
                            </div>
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                              <Icon className="w-3.5 h-3.5" />
                              {cfg.label}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${r.confidence}%` }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className={`h-full rounded-full ${r.severity === "severe" ? "bg-destructive" : r.severity === "moderate" ? "bg-yellow-500" : "gradient-primary"}`}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground font-medium w-10 text-right">{r.confidence}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Matched: {r.matchedCount}/{r.totalSymptoms} symptoms ({r.matchedSymptoms.join(", ")})
                          </p>
                          <p className="text-xs text-foreground/80">
                            <span className="font-semibold">Suggestion:</span> {r.suggestion}
                          </p>
                        </div>
                      );
                    })}
                  </motion.div>
                )
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-heading">Results will appear here</p>
                  <p className="text-sm mt-1">Upload images or enter symptoms to begin diagnosis</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
