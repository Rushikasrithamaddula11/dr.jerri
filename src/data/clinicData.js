export const clinicInfo = {
  name: "Drjerrri Poly Clinic",
  tagline: "Your Health Our Priority",
  subtagline: "Multi-Speciality Healthcare & Diagnostics",
  address: "@ ECIL South Kamala Nagar, Secunderabad / Hyderabad - 500062",
  phone: "9533551700",
  whatsapp: "919533551700",
  emergencyNote: "Walk-ins Welcome Daily for Saline, Injections, Blood Tests, Scanning & First Aid",
  teluguNotice: "మా క్లినిక్ వద్ద సలైన్, ఇంజెక్షన్లు, బ్లడ్ టెస్టులు, స్కానింగ్ మరియు ప్రథమ చికిత్స (First Aid) ప్రతిరోజూ అందుబాటులో ఉన్నాయి."
};

export const doctors = [
  {
    id: "dr-harika",
    name: "Dr. Harika",
    qualifications: "MBBS",
    specialty: "General Physician",
    category: "general",
    categoryLabel: "General Medicine",
    subtitle: "Compassionate care for a healthier tomorrow",
    timings: "9:00 AM to 4:00 PM",
    availability: "Daily (Mon - Sun)",
    photo: "/images/dr_harika.jpg",
    flyer: "/images/dr_harika_flyer.png",
    accentColor: "teal",
    treatments: [
      "Fever & Viral Infections",
      "Gastrointestinal & Digestive Problems",
      "Cold, Cough & Respiratory Issues",
      "Diabetes & Hypertension Care",
      "General Health Check-ups & Prevention"
    ],
    keywords: "harika general physician fever infection cold cough diabetes bp gastric stomach vomiting weakness checkup"
  },
  {
    id: "dr-supriya",
    name: "Dr. Supriya",
    qualifications: "MBBS, DGO",
    specialty: "Obstetrician & Gynaecologist",
    category: "gynaec",
    categoryLabel: "Gynaecology & Maternity",
    regNo: "Reg No: 52206",
    subtitle: "Compassionate Care for Every Stage of Womanhood",
    timings: "1:00 PM to 3:00 PM",
    availability: "Daily",
    photo: "/images/dr_supriya.jpg",
    flyer: "/images/dr_supriya_flyer.png",
    accentColor: "pink",
    treatments: [
      "High Risk Pregnancy & Prenatal Care",
      "PCOD / PCOS & Hormonal Balance",
      "Infertility Evaluation (HSG, IUI)",
      "Irregular Periods & Bleeding Problems",
      "Family Planning & Contraceptive Guidance",
      "Puberty & Premenopausal Issues",
      "Abdominal & Vaginal Gynaec Surgeries"
    ],
    keywords: "supriya gynaecologist pregnancy prenatal delivery period pcod pcos infertility bleeding female woman baby"
  },
  {
    id: "dr-subash",
    name: "Dr. Subash Reddy",
    qualifications: "MD",
    specialty: "Dermatologist (Skin, Hair & Nails)",
    category: "derma",
    categoryLabel: "Dermatology",
    subtitle: "Healthy Skin | Healthy Hair | Healthy Life",
    timings: "6:00 PM to 6:30 PM",
    availability: "Daily (Except Sun & Wed)",
    photo: "/images/dr_subash.jpg",
    flyer: "/images/dr_subash_flyer.png",
    accentColor: "cyan",
    treatments: [
      "Acne & Acne Scar Treatment",
      "Skin Allergy & Eczema",
      "Fungal & Bacterial Infections",
      "Psoriasis & Vitiligo Management",
      "Hair Fall & Scalp Disorders",
      "Nail Diseases & Disorders",
      "Cosmetic Dermatology & Anti-Aging"
    ],
    keywords: "subash reddy dermatologist skin hair nail acne scars allergy eczema fungal vitiligo psoriasis antiaging dandruff"
  },
  {
    id: "dr-ramakrishna",
    name: "Dr C Rama Krishna",
    qualifications: "MBBS, DCH, MSc(CRRA)",
    specialty: "General Physician & Pediatrician",
    category: "pediatric",
    categoryLabel: "Pediatrics & Child Care",
    subtitle: "Healthy Children, Brighter Tomorrows | Caring for Every Stage of Life",
    timings: "7:00 PM to 9:00 PM",
    availability: "Daily",
    photo: "/images/dr_ramakrishna.jpg",
    flyer: "/images/dr_ramakrishna_flyer.jpg",
    accentColor: "blue",
    treatments: [
      "Newborn & Infant Growth Care",
      "Childhood Illnesses (Fever, Cough, Infections)",
      "Immunization & Complete Vaccination Schedule",
      "Nutrition & Growth Milestones Monitoring",
      "General Health Check-ups (Children & Adults)",
      "Preventive Healthcare for Families"
    ],
    keywords: "rama krishna pediatrician child children baby infant vaccine vaccination newborn growth fever cough cold"
  },
  {
    id: "dr-srilekha",
    name: "Dr. Srilekha",
    qualifications: "MBBS",
    specialty: "General Physician & Mother-Child Health",
    category: "general",
    categoryLabel: "Mother & Child Care",
    subtitle: "Compassionate Care for a Healthier Tomorrow",
    timings: "9:00 PM to 10:00 PM",
    availability: "Daily (Night OPD)",
    photo: "/images/dr_srilekha.jpg",
    flyer: "/images/dr_srilekha_flyer.jpg",
    accentColor: "emerald",
    treatments: [
      "Mother & Child Health Services",
      "Antenatal & Postnatal Mother Guidance",
      "Fever & Flu Management",
      "Childhood Vaccinations & Nutrition Support",
      "Diabetes & Blood Pressure Care",
      "Minor Injuries & Wound Care"
    ],
    keywords: "srilekha general physician mother child baby fever flu vaccination bp wound nutrition night clinic"
  }
];

export const clinicalServices = [
  {
    id: "saline",
    title: "Saline / IV Fluid Therapy",
    shortDesc: "Electrolyte hydration, weakness & recovery drips under doctor care.",
    badge: "Immediate Walk-in",
    icon: "droplet",
    iconColor: "text-teal-600 bg-teal-50",
    detailedDesc: "Intravenous (IV) Saline therapy provides immediate rehydration, electrolyte replenishment, and quick recovery for patients suffering from acute weakness, food poisoning, gastroenteritis, fever, or exhaustion.",
    highlights: [
      "Administered under direct medical supervision",
      "Clean, sterile, air-conditioned patient recovery beds",
      "Normal Saline (NS), Dextrose (DNS), Ringer Lactate (RL) available",
      "Continuous vitals monitoring (BP, Pulse, SpO2)"
    ],
    keywords: "saline iv drip hydration weakness dehydration fluid electrolyte food poisoning drip bottle"
  },
  {
    id: "injections",
    title: "Injections & Vaccinations",
    shortDesc: "Prescribed pain relief, anti-emetic, vitamin shots & immunizations.",
    badge: "Safe & Sterile",
    icon: "syringe",
    iconColor: "text-cyan-600 bg-cyan-50",
    detailedDesc: "We administer all physician-prescribed intra-muscular (IM) and intravenous (IV) injections, including pain relief, antibiotics, anti-emetic medications, B12/Vitamin injections, and routine vaccinations.",
    highlights: [
      "Single-use, 100% disposable sterile needles & syringes",
      "Adult & Child immunizations as per national schedule",
      "Tetanus Toxoid (TT), Hepatitis, Flu & Typhoid shots",
      "Safe administration with allergic reaction protocols"
    ],
    keywords: "injection injections vaccine vaccines tetanus tt pain relief antibiotic vitamin b12 shot"
  },
  {
    id: "blood-tests",
    title: "Blood Tests & Lab",
    shortDesc: "Complete CBC, Sugar, Thyroid, Lipid, Liver/Kidney & Dengue fast reports.",
    badge: "Fast Digital Reports",
    icon: "vial",
    iconColor: "text-rose-600 bg-rose-50",
    detailedDesc: "Comprehensive blood testing facility with high accuracy analyzers. Get routine and specialized tests conducted quickly with digital reports sent straight to your WhatsApp.",
    highlights: [
      "Complete Blood Picture (CBC), ESR, Platelets",
      "Diabetes Care: Fasting & Post-Prandial Sugar, HbA1c",
      "Thyroid Profile (T3, T4, TSH), Lipid & Cholesterol Profile",
      "Liver Function Test (LFT) & Kidney Function Test (KFT)",
      "Dengue NS1/IgM, Malaria, Typhoid (Widal) screening"
    ],
    keywords: "blood test tests lab diagnostics cbc sugar thyroid lipid liver dengue typhoid platelet"
  },
  {
    id: "scanning",
    title: "Scanning & Diagnostic Scans",
    shortDesc: "Ultrasound, Abdominal, Pelvic & Pregnancy anomaly scan coordination.",
    badge: "Ultrasound & Scans",
    icon: "radiation",
    iconColor: "text-indigo-600 bg-indigo-50",
    detailedDesc: "Quick coordination for complete ultrasound and diagnostic imaging scans prescribed by our General Physicians, Gynaecologists, and Pediatricians.",
    highlights: [
      "Abdominal & Pelvic Ultrasound scans",
      "Antenatal / Pregnancy growth & anomaly scans",
      "Follicular monitoring for fertility management",
      "Expert sonologist reporting with fast turnaround"
    ],
    keywords: "scan scanning ultrasound radiology pregnancy pelvic abdomen anomaly fetal scan sonography"
  },
  {
    id: "first-aid",
    title: "First Aid & Dressing",
    shortDesc: "Emergency wound dressing, minor injury sutures & burn antiseptic care.",
    badge: "Emergency Ready",
    icon: "first-aid",
    iconColor: "text-amber-600 bg-amber-50",
    detailedDesc: "Immediate emergency first aid treatment for domestic cuts, road abrasions, minor accidental lacerations, burns, and wounds requiring aseptic cleaning and dressing.",
    highlights: [
      "Antiseptic wound washing & sterile surgical dressing",
      "Minor suturing (stitches) and suture removal",
      "Burn care and blister management",
      "Immediate pain control and tetanus protection"
    ],
    keywords: "first aid trauma cut wound dressing bandage stitches burn accident injury suture emergency"
  },
  {
    id: "nebulization",
    title: "Nebulization Care",
    shortDesc: "Fast breathing relief for asthma, wheezing & severe chest congestion.",
    badge: "Instant Breathing Relief",
    icon: "lungs",
    iconColor: "text-blue-600 bg-blue-50",
    detailedDesc: "Medical nebulizer inhalation therapy for immediate bronchial dilation and breathing relief in children and adults suffering from asthma, bronchitis, severe cough, or wheezing.",
    highlights: [
      "Hospital-grade ultrasonic & compressor nebulizers",
      "Pediatric-friendly soft masks for toddlers and kids",
      "Rapid airway opening & chest congestion clearance",
      "Continuous SpO2 oxygen saturation monitoring"
    ],
    keywords: "nebulization asthma breathing wheezing respiratory lungs cough cold chest congestion inhaler"
  }
];

export const reviews = [
  {
    name: "Ramesh Varma",
    location: "South Kamala Nagar, ECIL",
    rating: 5,
    date: "2 days ago",
    comment: "Came in for emergency fever and saline IV drip. Excellent care by Dr. Harika and nursing staff. Quick recovery and no unnecessary waiting time! Very hygienic clinic."
  },
  {
    name: "Pravallika K.",
    location: "ECIL Cross Roads",
    rating: 5,
    date: "1 week ago",
    comment: "Consulted Dr. Supriya for pregnancy guidance and scans. Very compassionate and clear explanation. Clean clinic environment and reasonable consultation fees."
  },
  {
    name: "Srinivas Rao",
    location: "Kamala Nagar",
    rating: 5,
    date: "2 weeks ago",
    comment: "Took my 4-year-old child to Dr C Rama Krishna for fever and cough. Extremely patient and child-friendly doctor. Child was happy and recovered in 2 days."
  },
  {
    name: "Madhavi L.",
    location: "A.S. Rao Nagar",
    rating: 5,
    date: "3 weeks ago",
    comment: "Consulted Dr. Subash Reddy for severe skin allergy. Within a few days of medication the itching completely stopped. Highly recommended dermatologist!"
  }
];

export const faqs = [
  {
    question: "Do I need an appointment for Saline, Injections, or Blood Tests?",
    answer: "No prior appointment is needed! You can walk in directly to Drjerrri Poly Clinic during clinic hours for Saline IV infusion, doctor-prescribed injections, dressing, and lab sample collection."
  },
  {
    question: "How can I book a token for a specialist doctor?",
    answer: "You can book directly by tapping 'Book Token' on this website, sending a message on WhatsApp to 9533551700, or calling 9533551700. Walk-in tokens are also issued at the reception."
  },
  {
    question: "How fast will I receive my Blood Test reports?",
    answer: "Routine tests such as CBC, Blood Sugar, Dengue NS1, Malaria, and Typhoid are reported on the same day, with digital reports sent directly to your WhatsApp for convenience."
  },
  {
    question: "What are Dr. Subash Reddy's (Dermatologist) consultation timings?",
    answer: "Dr. Subash Reddy consults daily from 6:00 PM to 6:30 PM (except Sundays and Wednesdays). Prior token booking is recommended."
  },
  {
    question: "Where exactly is the clinic located?",
    answer: "Drjerrri Poly Clinic is located at ECIL South Kamala Nagar, Secunderabad / Hyderabad. You can click 'Get Directions' on the site to navigate directly via Google Maps."
  }
];
