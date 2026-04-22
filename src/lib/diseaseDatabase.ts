export interface Disease {
  name: string;
  type: "viral" | "bacterial" | "parasitic" | "metabolic" | "skin";
  symptoms: string[];
  severity: "mild" | "moderate" | "severe";
  suggestion: string;
}

export interface DiagnosisResult {
  disease: string;
  matchedCount: number;
  totalSymptoms: number;
  severity: "healthy" | "mild" | "moderate" | "severe";
  suggestion: string;
  confidence: number;
  matchedSymptoms: string[];
  type: string;
}

const diseases: Disease[] = [
  {
    name: "Foot-and-Mouth Disease",
    type: "viral",
    symptoms: ["fever", "blisters on mouth", "lameness", "drooling"],
    severity: "severe",
    suggestion: "Isolate animal, consult veterinarian immediately",
  },
  {
    name: "Bovine Viral Diarrhea",
    type: "viral",
    symptoms: ["fever", "diarrhea", "lethargy", "nasal discharge"],
    severity: "moderate",
    suggestion: "Monitor hydration, consult veterinarian",
  },
  {
    name: "Rabies",
    type: "viral",
    symptoms: ["aggression", "drooling", "paralysis", "biting behavior"],
    severity: "severe",
    suggestion: "Seek immediate vet attention",
  },
  {
    name: "Lumpy Skin Disease",
    type: "viral",
    symptoms: ["nodules on skin", "fever", "reduced milk"],
    severity: "moderate",
    suggestion: "Vaccinate, isolate infected animals",
  },
  {
    name: "Mastitis",
    type: "bacterial",
    symptoms: ["swelling in udder", "heat in udder", "reduced milk"],
    severity: "mild",
    suggestion: "Maintain hygiene, consult vet if needed",
  },
  {
    name: "Anthrax",
    type: "bacterial",
    symptoms: ["sudden death", "fever", "bleeding from body openings"],
    severity: "severe",
    suggestion: "Vaccinate herd, isolate affected animals",
  },
  {
    name: "Brucellosis",
    type: "bacterial",
    symptoms: ["abortion", "reduced fertility", "fever", "joint pain"],
    severity: "moderate",
    suggestion: "Isolate infected animals, vaccinate, consult vet",
  },
  {
    name: "Black Quarter",
    type: "bacterial",
    symptoms: ["sudden lameness", "swelling", "fever"],
    severity: "severe",
    suggestion: "Vaccinate, treat with antibiotics immediately",
  },
  {
    name: "Pasteurellosis",
    type: "bacterial",
    symptoms: ["fever", "coughing", "nasal discharge", "lethargy"],
    severity: "moderate",
    suggestion: "Antibiotic treatment under vet guidance",
  },
  {
    name: "Foot Rot",
    type: "bacterial",
    symptoms: ["lameness", "swelling between hooves", "foul smell"],
    severity: "moderate",
    suggestion: "Clean environment, antibiotic treatment",
  },
  {
    name: "Salmonellosis",
    type: "bacterial",
    symptoms: ["diarrhea", "fever", "dehydration"],
    severity: "severe",
    suggestion: "Isolate animal, maintain hydration, consult vet",
  },
  {
    name: "Johne's Disease",
    type: "bacterial",
    symptoms: ["chronic diarrhea", "weight loss", "poor milk production"],
    severity: "moderate",
    suggestion: "Isolate infected animals, improve hygiene",
  },
  {
    name: "Trypanosomiasis",
    type: "parasitic",
    symptoms: ["anemia", "weight loss", "fever", "lethargy"],
    severity: "moderate",
    suggestion: "Consult vet, treat with trypanocidal drugs",
  },
  {
    name: "Coccidiosis",
    type: "parasitic",
    symptoms: ["diarrhea", "weight loss", "lethargy"],
    severity: "mild",
    suggestion: "Maintain hygiene, use anti-coccidial drugs",
  },
  {
    name: "Parasite Infestation",
    type: "parasitic",
    symptoms: ["weight loss", "poor coat", "diarrhea", "anemia"],
    severity: "mild",
    suggestion: "Deworming, maintain hygiene",
  },
  {
    name: "Milk Fever (Hypocalcemia)",
    type: "metabolic",
    symptoms: ["muscle tremors", "weakness", "downer cow"],
    severity: "moderate",
    suggestion: "Administer calcium supplements, consult vet",
  },
  {
    name: "Ketosis",
    type: "metabolic",
    symptoms: ["reduced appetite", "lethargy", "acetone smell"],
    severity: "mild",
    suggestion: "Provide energy-rich diet, consult vet",
  },
  {
    name: "Ringworm",
    type: "skin",
    symptoms: ["circular skin lesions", "hair loss", "itchy skin"],
    severity: "mild",
    suggestion: "Topical antifungal treatment",
  },
];

const normalizeSymptom = (s: string): string =>
  s.toLowerCase().trim().replace(/[^a-z\s]/g, "");

export function diagnoseSymptoms(inputSymptoms: string[]): DiagnosisResult[] {
  const normalized = inputSymptoms.map(normalizeSymptom).filter(Boolean);

  if (normalized.length === 0) return [];

  const results: DiagnosisResult[] = diseases.map((disease) => {
    const matchedSymptoms = disease.symptoms.filter((ds) =>
      normalized.some(
        (input) => ds.includes(input) || input.includes(ds)
      )
    );

    const matchRatio = matchedSymptoms.length / disease.symptoms.length;
    const inputCoverage = matchedSymptoms.length / normalized.length;

    let confidence = Math.round((matchRatio * 0.6 + inputCoverage * 0.4) * 100);
    if (disease.severity === "severe" && matchedSymptoms.length >= 2) confidence = Math.min(confidence + 10, 99);
    if (matchedSymptoms.length === 0) confidence = 0;

    return {
      disease: disease.name,
      matchedCount: matchedSymptoms.length,
      totalSymptoms: disease.symptoms.length,
      severity: matchedSymptoms.length === 0 ? "healthy" as const : disease.severity,
      suggestion: disease.suggestion,
      confidence,
      matchedSymptoms,
      type: disease.type,
    };
  });

  const matched = results
    .filter((r) => r.matchedCount > 0)
    .sort((a, b) => b.matchedCount - a.matchedCount || b.confidence - a.confidence);

  return matched.slice(0, 3);
}

export const allSymptomOptions = [
  "Fever", "Lameness", "Drooling", "Diarrhea",
  "Lethargy", "Nasal discharge", "Aggression", "Paralysis",
  "Biting behavior", "Blisters on mouth", "Swelling", "Coughing",
  "Weight loss", "Anemia", "Hair loss", "Itchy skin",
  "Reduced milk", "Abortion", "Joint pain", "Muscle tremors",
  "Weakness", "Dehydration", "Reduced appetite", "Foul smell",
  "Nodules on skin", "Swelling in udder", "Poor coat",
  "Bleeding from body openings", "Sudden death",
];
