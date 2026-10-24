export const clinicInfo = {
  name: "Dr. Jerri",
  fullName: "Dr. Jerri Poly Clinic, Diagnostics & Pharmacy",
  tagline: "Your Health Our Priority",
  subtagline: "Multi-Speciality Care, Advanced Diagnostics, In-House Pharmacy & Fast Delivery",
  address: "@ ECIL South Kamala Nagar, Secunderabad / Hyderabad - 500062",
  phone: "9533551700",
  secondaryPhone: "9533551700",
  paymentPhone: "9949339391",
  upiId: "9949339391-3@ybl",
  whatsapp: "919533551700",
  emergencyNote: "Walk-ins Welcome Daily for Saline, Injections, Blood Tests, Scanning, First Aid & Medicine Delivery",
  teluguNotice: "మా వద్ద డాక్టర్ సంప్రదింపులు, సలైన్, ఇంజెక్షన్లు, అధునాతన డయాగ్నస్టిక్స్ (బ్లడ్ టెస్టులు, స్కానింగ్) మరియు 24/7 మెడిసిన్ డెలివరీ అందుబాటులో కలవు."
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
    accentColor: "royal",
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
    specialty: "Obstetrician & Gynecologist (Maternity Specialist)",
    category: "gynaec",
    categoryLabel: "Gynecology & Maternity",
    recommendedTag: "Recommended: Maternity & Prenatal Checkup",
    regNo: "Reg No: 52206",
    subtitle: "Recommended Maternity & Prenatal Care | Compassionate Care for Every Stage of Womanhood",
    timings: "1:00 PM to 3:00 PM",
    availability: "Daily",
    photo: "/images/dr_supriya.jpg",
    flyer: "/images/dr_supriya_flyer.png",
    accentColor: "royal",
    treatments: [
      "Maternity & Prenatal Checkup (Recommended)",
      "High-Risk Pregnancy & Antenatal Care",
      "PCOD / PCOS & Hormonal Balance",
      "Infertility Evaluation (HSG, IUI & Scans)",
      "Irregular Periods & Bleeding Problems",
      "Family Planning & Contraceptive Guidance",
      "Puberty & Premenopausal Health",
      "Abdominal & Vaginal Gynaecological Surgeries"
    ],
    keywords: "supriya gynecologist gynaecologist maternity prenatal checkup pregnancy delivery period pcod pcos infertility bleeding female woman baby"
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
    accentColor: "royal",
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
    accentColor: "royal",
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
    accentColor: "royal",
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
    id: "diagnostics-lab",
    title: "Diagnostics & Pathology Lab",
    shortDesc: "Comprehensive automated blood, urine & biochemical diagnostic testing.",
    badge: "Fast Digital Reports",
    icon: "vial",
    iconBg: "bg-purple-100 text-purple-800",
    detailedDesc: "Fully equipped automated clinical laboratory delivering precise results for CBC, Diabetes, Thyroid, Lipid profile, Liver/Kidney functions, and infectious markers. Reports sent via WhatsApp.",
    highlights: [
      "Certified automated analyzers with dual verification",
      "Home blood sample collection in ECIL & South Kamala Nagar",
      "Same-day emergency fever & infection reports",
      "Reports delivered directly to your WhatsApp"
    ],
    keywords: "diagnostics pathology lab blood test tests cbc sugar thyroid lipid liver kidney dengue urine test"
  },
  {
    id: "pharmacy",
    title: "In-House Pharmacy & E-Commerce",
    shortDesc: "100% genuine prescription medicines, surgicals, and healthcare essentials delivered fast.",
    badge: "Online & 24/7 Store",
    icon: "pills",
    iconBg: "bg-purple-100 text-purple-800",
    detailedDesc: "Complete licensed pharmacy stocking all doctor-prescribed medications, IV fluids, disposable syringes, insulin, chronic illness drugs, pediatric syrups, and maternity supplies with online order and doorstep delivery.",
    highlights: [
      "100% authentic medicines from top pharmaceutical brands",
      "Online store with instant UPI & card payment",
      "Real-time order logistics tracking to your doorstep",
      "Special discounts on monthly maintenance medicines"
    ],
    keywords: "pharmacy medicines pills medical store prescription tablets syrup injection saline drugs chemist order online"
  },
  {
    id: "saline",
    title: "Saline / IV Fluid Therapy",
    shortDesc: "Electrolyte hydration, weakness & recovery drips under doctor supervision.",
    badge: "Walk-in Facility",
    icon: "droplet",
    iconBg: "bg-purple-100 text-purple-800",
    detailedDesc: "Intravenous (IV) Saline therapy provides immediate rehydration, electrolyte replenishment, and quick recovery for patients suffering from acute weakness, gastroenteritis, fever, or exhaustion.",
    highlights: [
      "Administered under direct medical supervision",
      "Clean, sterile, air-conditioned patient recovery beds",
      "Normal Saline (NS), Dextrose (DNS), Ringer Lactate (RL)",
      "Continuous vitals monitoring (BP, Pulse, SpO2)"
    ],
    keywords: "saline iv drip hydration weakness dehydration fluid electrolyte food poisoning drip bottle"
  },
  {
    id: "injections",
    title: "Injections & Vaccinations",
    shortDesc: "Prescribed pain relief, anti-emetic, vitamin shots & routine immunizations.",
    badge: "Safe & Sterile",
    icon: "syringe",
    iconBg: "bg-purple-100 text-purple-800",
    detailedDesc: "We administer all physician-prescribed intra-muscular (IM) and intravenous (IV) injections, including pain relief, antibiotics, anti-emetic medications, B12/Vitamin injections, and routine vaccinations.",
    highlights: [
      "Single-use, 100% disposable sterile needles & syringes",
      "Adult & Child immunizations as per national schedule",
      "Tetanus Toxoid (TT), Hepatitis, Flu & Typhoid shots",
      "Safe administration with allergy safety protocols"
    ],
    keywords: "injection injections vaccine vaccines tetanus tt pain relief antibiotic vitamin b12 shot"
  },
  {
    id: "scanning",
    title: "Scanning & Ultrasound",
    shortDesc: "Ultrasound, Abdominal, Pelvic & Pregnancy anomaly scans coordination.",
    badge: "Advanced Imaging",
    icon: "radiation",
    iconBg: "bg-purple-100 text-purple-800",
    detailedDesc: "Prompt coordination for complete ultrasound and diagnostic imaging scans prescribed by our General Physicians, Gynecologists, and Pediatricians.",
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
    title: "First Aid & Minor Trauma Care",
    shortDesc: "Emergency wound dressing, minor injury sutures & burn antiseptic care.",
    badge: "Emergency Ready",
    icon: "first-aid",
    iconBg: "bg-purple-100 text-purple-800",
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
    title: "Nebulization Breathing Care",
    shortDesc: "Fast breathing relief for asthma, wheezing & severe chest congestion.",
    badge: "Instant Relief",
    icon: "lungs",
    iconBg: "bg-purple-100 text-purple-800",
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

export const diagnosticsPackages = [
  {
    id: "fever-profile",
    title: "Complete Fever Profile",
    tests: "CBC, ESR, Widal (Typhoid), Dengue NS1 & Malarial Parasite",
    badge: "Same Day Report",
    highlight: "Essential for high fever, body aches & chills"
  },
  {
    id: "diabetes-care",
    title: "Diabetes & Sugar Care",
    tests: "Fasting Blood Sugar, Post-Prandial Sugar, HbA1c (3-Month Avg) & Urine Routine",
    badge: "Highly Accurate",
    highlight: "Complete quarterly diabetic management package"
  },
  {
    id: "pregnancy-scan",
    title: "Maternity & Prenatal Checkup & Scan",
    tests: "Routine Antenatal Blood Panel (CBC, Blood Group, Rh, Sugar, HIV, HBsAg), Urine Routine & Ultrasound",
    badge: "Gynecology Recommended",
    highlight: "⭐ Recommended by Gynecologist: Safe & comprehensive baby & mother growth tracking"
  },
  {
    id: "master-health",
    title: "Executive Master Health Checkup",
    tests: "CBC, Lipid Profile, Liver Function, Kidney Function, Thyroid (TSH), Blood Sugar & ECG",
    badge: "Full Body Checkup",
    highlight: "Complete annual health audit for men & women"
  }
];

export const pharmacyFeatures = [
  {
    title: "Genuine Prescription Medicines",
    desc: "100% original medicines sourced directly from leading manufacturers with strict temperature-controlled storage."
  },
  {
    title: "Online Store & Instant UPI Pay",
    desc: "Browse medicines online, order instantly, and pay securely via UPI (GPay, PhonePe, Paytm, BHIM)."
  },
  {
    title: "Realtime Delivery Logistics",
    desc: "Track your medicine order live from clinic packaging to rider dispatch and doorstep arrival in 45-60 mins."
  },
  {
    title: "Injections, Saline & Surgicals",
    desc: "Stocked with IV fluids (NS, DNS, RL), surgical bandages, disposable syringes, and sterile wound care kits."
  }
];

export const reviews = [
  {
    name: "Ramesh Varma",
    location: "South Kamala Nagar, ECIL",
    rating: 5,
    date: "2 days ago",
    comment: "Came in for emergency fever and saline IV drip. Excellent care by Dr. Harika and nursing staff. Plus ordered medicines online with instant online payment and had them delivered to my doorstep in 40 minutes!"
  },
  {
    name: "Pravallika K.",
    location: "ECIL Cross Roads",
    rating: 5,
    date: "1 week ago",
    comment: "Dr. Supriya's Maternity & Prenatal Checkup is truly exceptional. Very compassionate doctor, thorough explanation of scans, and genuine pregnancy supplements delivered right to my home."
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
    comment: "Consulted Dr. Subash Reddy for severe skin allergy. Within a few days of medication the itching completely stopped. Highly recommended dermatologist and diagnostics!"
  }
];

export const faqs = [
  {
    question: "Do you have an in-house Pharmacy and Diagnostics lab?",
    answer: "Yes! Dr. Jerri Poly Clinic has a complete in-house Pharmacy and Diagnostics facility. You can consult our specialist doctors, get blood tests/scans done, and collect or order all prescribed medicines online with instant UPI payment and doorstep delivery."
  },
  {
    question: "How does the Online Medicine Store & UPI Payment work?",
    answer: "You can browse our medicine catalog, add prescribed or OTC medicines to your cart, and pay instantly via UPI QR code or your installed UPI apps (PhonePe, Google Pay, Paytm, BHIM). You will receive an immediate order confirmation and live logistics tracking link."
  },
  {
    question: "How can I track my medicine order in real-time?",
    answer: "Once your order is confirmed, our Realtime Logistics Tracker displays the live progress step-by-step: Pharmacist Verification -> Order Packing -> Delivery Rider Dispatch -> Live Transit -> Doorstep Arrival with rider contact details."
  },
  {
    question: "Do I need an appointment for Maternity & Prenatal Checkup with Dr. Supriya?",
    answer: "Dr. Supriya's Gynecology & Maternity OPD runs daily from 1:00 PM to 3:00 PM. We recommend booking an OPD token online or walking in early for prenatal consultations, high-risk pregnancy guidance, and ultrasound scans."
  },
  {
    question: "Do I need an appointment for Saline, Injections, or Blood Tests?",
    answer: "No prior appointment is needed! You can walk in directly to Dr. Jerri Poly Clinic during working hours for Saline IV infusion, doctor-prescribed injections, dressing, and lab sample collection."
  },
  {
    question: "Where exactly is the clinic located?",
    answer: "Dr. Jerri Poly Clinic, Diagnostics & Pharmacy is located at ECIL South Kamala Nagar, Secunderabad / Hyderabad. You can click 'Get Directions' on the site to navigate directly via Google Maps."
  }
];
