export type Section = {
  id: string
  index: string
  label: string
  /** normalized scroll anchor where this section is fully in focus */
  anchor: number
  /** z position of the station in the 3D corridor */
  z: number
}

export const PERSON = {
  name: "Mohini Sharma",
  role: "ML / AI Engineer",
  tagline: "Computer Vision, LLMs & Agentic AI",
  location: "Indore, India",
  email: "mohinisharma1225@gmail.com",
  phone: "+91 942 484 4410",
  linkedin: "https://www.linkedin.com/in/mohini-sharma01/",
  github: "https://github.com/mohinisharma4410",
  summary:
    "ML/AI engineer specializing in computer vision and LLMs. I build defect-detection systems, 3D reconstruction pipelines, and documentation platforms that run in production on 10K+ images — with a track record of 60%+ workflow reduction and 5x system scaling.",
}

export const HIGHLIGHTS = [
  { value: "10K+", label: "images in production CV systems" },
  { value: "94%", label: "defect detection precision" },
  { value: "5x", label: "throughput scaling (500 → 2,500/day)" },
  { value: "re:Invent", label: "AWS global showcase selection" },
]

export const EXPERIENCE = [
  {
    company: "Ascentt AI",
    role: "Software Developer — AI Research & Development",
    period: "Feb 2025 – Present",
    location: "Indore",
    points: [
      "Built a vehicle defect assessment system over 10K+ images at 94% precision, fusing LiDAR depth for quantitative severity scoring — cutting inspection from 4hrs to 45mins and scaling 500 → 2,500 units/day.",
      "Architected the Aura Nova pipeline for photorealistic 3D vehicle reconstruction (TRELLIS, InstantMesh), selected for the AWS re:Invent global showcase.",
      "Shipped multi-agent LangGraph workflows for repair guidance and doc processing; an LLM-CAD/FEA pipeline cut design cycles 40%.",
      "Built an AutoML pipeline on AWS SageMaker + MLflow, reducing the training feedback loop from 3 days to 4 hours.",
    ],
  },
  {
    company: "Uoons E-commerce Pvt Ltd.",
    role: "Data Science Intern",
    period: "May 2024 – Jul 2024",
    location: "Indore",
    points: [
      "Built Power BI dashboards that cut report generation from 2hrs to 20mins.",
      "Shipped a KNN recommendation model at 76% accuracy, driving a 20% engagement uplift.",
    ],
  },
]

export type Project = {
  id: string
  title: string
  kind: string
  z: number
  side: "left" | "right"
  image: string
  blurb: string
  bullets: string[]
  tech: string[]
  href?: string
  hrefLabel?: string
}

export const PROJECTS: Project[] = [
  {
    id: "anuvaad",
    title: "Anuvaad",
    kind: "AI Multilingual Media Translation",
    z: -30,
    side: "left",
    image: "/illustrations/project-anuvaad.png",
    blurb:
      "An app that converts press releases into multilingual videos across 13 Indian languages + English, cutting manual effort by 60%.",
    bullets: [
      "100+ downloads at a 4.2★ rating on the Play Store.",
      "Article-to-video generation with automatic language detection.",
      "End-to-end: Flask NLP/OCR/ASR-TTS backend → Flutter mobile → Azure & Firebase deployment.",
      "Awarded the Icreate research grant (April 2024).",
    ],
    tech: ["Flask", "Flutter", "NLP", "ASR / TTS", "Azure", "Firebase"],
    href: "https://play.google.com/store/apps/details?id=com.mohinisharma.t_to_v",
    hrefLabel: "View on Play Store",
  },
  {
    id: "diagramstudio",
    title: "DiagramStudio",
    kind: "AI Technical Documentation Platform",
    z: -45,
    side: "right",
    image: "/illustrations/project-diagramstudio.png",
    blurb:
      "A platform that generates 6 diagram types and 9 documentation types with bidirectional diagram-as-code sync.",
    bullets: [
      "Edit the canvas or the DSL text — changes sync instantly, diff-friendly and version-control ready.",
      "GitHub integration imports repos to auto-generate architecture diagrams and docs from real code.",
      "3D repo-graph visualization, live multiplayer collab, and role-based access.",
      "Multi-format export (PNG, SVG, Draw.io, PDF, DOCX) with Razorpay-backed pricing tiers.",
    ],
    tech: ["React / Vite", "FastAPI", "Gemini", "DynamoDB", "AWS ECR/EC2"],
    href: "https://diagramstudio.in/",
    hrefLabel: "Visit diagramstudio.in",
  },
  {
    id: "darkpattern",
    title: "Dark Pattern Buster",
    kind: "ML Chrome Extension",
    z: -60,
    side: "left",
    image: "/illustrations/project-darkpattern.png",
    blurb:
      "An ML-powered Chrome extension that detects deceptive dark patterns on e-commerce platforms — shortlisted Top 10 at DPBH 2023 (IIT-BHU).",
    bullets: [
      "Captures 11 dark-pattern types across e-commerce sites and insurance policies.",
      "Raises awareness of deceptive UX design in the wild.",
      "Real-time detection surfaced directly in the browser.",
    ],
    tech: ["Python", "ML", "Flask", "JavaScript", "BeautifulSoup"],
    href: "https://github.com/mohinisharma4410/DPBH_2023_imp",
    hrefLabel: "View on GitHub",
  },
]

export const SKILLS = {
  Languages: ["Python", "C++", "Dart", "JavaScript"],
  "Frameworks & Tools": [
    "PyTorch",
    "YOLOv8",
    "Detectron2",
    "LangChain",
    "LangGraph",
    "OpenCV",
    "FastAPI",
    "Docker",
    "AWS SageMaker",
    "MLflow",
  ],
  "AI Domains": [
    "Computer Vision",
    "NLP",
    "Generative AI",
    "Agentic AI",
    "3D Reconstruction",
    "RAG Pipelines",
    "MLOps",
  ],
}

export const ACHIEVEMENTS = [
  "AWS re:Invent global showcase (2024) — Aura Nova 3D reconstruction & Overbody Damage Detection POCs.",
  "Top 10 — Dark Pattern Buster Hackathon 2023 (IIT-BHU).",
  "Top 14 — IIT Drishti SHAKTI 2.0 (IIT Indore).",
  "Icreate research grant (April 2024) — Anuvaad.",
]

/** Full tech list from the resume's Skills section (SKILLS above is the
 *  trimmed preview shown in the About panel). Used by the Tech Stack panel. */
export const TECH_STACK = {
  Languages: ["Python", "C++", "Dart", "JavaScript"],
  "Frameworks & Tools": [
    "PyTorch",
    "YOLOv8",
    "Detectron2",
    "LangChain",
    "LangGraph",
    "OpenCV",
    "Flask",
    "FastAPI",
    "React",
    "Flutter",
    "Streamlit",
    "MLflow",
    "Docker",
    "AWS SageMaker",
    "Power BI",
    "Firebase",
    "Azure",
  ],
}

export const SECTIONS: Section[] = [
  { id: "hero", index: "00", label: "Intro", anchor: 0.0, z: 6 },
  { id: "about", index: "01", label: "About", anchor: 0.2, z: -12 },
  { id: "anuvaad", index: "02", label: "Work", anchor: 0.42, z: -30 },
  { id: "diagramstudio", index: "03", label: "Work", anchor: 0.6, z: -45 },
  { id: "darkpattern", index: "04", label: "Work", anchor: 0.78, z: -60 },
  { id: "contact", index: "05", label: "Contact", anchor: 0.98, z: -76 },
]

/** Camera travels from the hero station to just past the contact station. */
export const CAMERA_START_Z = 14
export const CAMERA_END_Z = -82
