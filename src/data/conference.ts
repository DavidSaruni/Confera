export const CONFERENCE = {
  host: "Kabarak University",
  faculty: "School of Medicine & Health Sciences · School of Pharmacy",
  edition: "16th Annual Health Conference",
  shortName: "AHC 2026",
  dates: "25th – 26th June 2026",
  mode: "Hybrid",
  theme:
    "Building Resilient Health Systems Through Innovation, Equity, and Multisectoral Action to Advance Universal Health Coverage",
  tagline: "Stronger Systems, Healthier Communities, Shared Future",
  driveScheduleUrl:
    "https://drive.google.com/file/d/13LnZKxFZtD3vqF2HapNn8Pv-2pj1WLrk/view?usp=sharing",
  schedulePdfUrl:
    "https://drive.google.com/file/d/13LnZKxFZtD3vqF2HapNn8Pv-2pj1WLrk/view?usp=sharing",
  driveGalleryUrl: "https://photos.google.com/u/1/share/AF1QipPGMt6QZJhPk0qwRnT6mmoKJrTn8i6yg5MH5nQUkqzyBj0dcgy47EeVWcntNPHEnw?key=eVhpZzl5YzM2bjY5R1VDamVUWFZ1aktybmRROUV3",
  driveAbstractsUrl:
    "https://docs.google.com/spreadsheets/d/1-g8AOEs7IEg55mo2iw_CcC-TwBv4lha3/edit?usp=sharing",
  abstractsPdfUrl:
    "https://drive.google.com/file/d/1gI1kkFb_hKgKMm9Fowk-YSiYT0BXMGh4/view?usp=sharing",
  feedbackFormUrl: "",
  feedbackFormTitle: "16th Annual Health Conference — Evaluation Form",
  // Link the form to Google Sheets (Responses → Link to Sheets), share the sheet, then paste its URL here.
  feedbackResponsesSheetUrl: "",
};

import wubahPhoto from "@/public/images/speakers/wubah.jpg";
import kariukiPhoto from "@/public/images/speakers/kariuki.jpg";
import olugaPhoto from "@/public/images/speakers/oluga.jpg";

export type Speaker = {
  name: string;
  role: string;
  title: string;
  affiliation: string;
  session: string;
  bio: string;
  accent: "primary" | "gold" | "forest";
  photo?: string;
  email?: string;
  abstractCode?: string;
  presentationType?: string;
  photoPosition?: "top" | "center";
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Professor Daniel A. Wubah",
    role: "Keynote Speaker",
    title: "President, Millersville University",
    affiliation: "Millersville University",
    session: "Opening Keynote — Day 1 · 09:30",
    bio: "President of Millersville University of Pennsylvania, distinguished biologist and global advocate for innovation in higher education and health systems. He brings decades of academic leadership across the US and Africa.",
    accent: "primary",
    photo: wubahPhoto,
  },
  {
    name: "Dr David Gicheru Kariuki",
    role: "Guest Speaker",
    title: "CEO, Kenya Medical Practitioners and Dentists Council (KMPDC)",
    affiliation: "KMPDC",
    session: "Plenary — Day 1 · 11:00",
    bio: "Chief Executive Officer of KMPDC, leading regulation and quality standards across Kenya's medical and dental practice. Champion of patient safety and workforce development.",
    accent: "gold",
    photo: kariukiPhoto,
    photoPosition: "center",
  },
  {
    name: "Dr. Fredrick Ouma Oluga, OGW",
    role: "Guest Speaker",
    title: "PS, State Department of Medical Health Services",
    affiliation: "Ministry of Health, Kenya",
    session: "Policy Address — Day 2 · 09:00",
    bio: "Principal Secretary at the State Department of Medical Health Services. A physician-leader advancing universal health coverage and multisectoral health reform in Kenya.",
    accent: "forest",
    photo: olugaPhoto,
    photoPosition: "center",
  },
  {
    name: "Billy Tomno",
    role: "Speaker / Presenter",
    title: "Student Presenter — Oral / Poster",
    affiliation: "Kabarak University",
    session: "Abstract 799 · Lunch & Poster Session — Day 1",
    bio: "Postgraduate researcher at Kabarak University presenting on strengthening community-based health surveillance in rural Kenya.",
    accent: "primary",
    email: "healthconference@kabarak.ac.ke",
    abstractCode: "799",
  },
  {
    name: "Kasoki Devughe Desanges",
    role: "Speaker / Presenter",
    title: "Kenyan Delegate — Oral / Poster",
    affiliation: "Kabarak University",
    session: "Abstract 878 · Poster Session — Day 1",
    bio: "Delegate presenter exploring maternal health outcomes in refugee settings through a cross-sectional review.",
    accent: "gold",
    email: "dkasoki@kabarak.ac.ke",
    abstractCode: "878",
    presentationType: "Poster",
  },
  {
    name: "Benard Mutua",
    role: "Speaker / Presenter",
    title: "Student Presenter — Oral",
    affiliation: "Kabarak University",
    session: "Abstract 879 · Breakout — Digital Health & AI",
    bio: "Student researcher presenting a five-year audit of antimicrobial stewardship practice in tertiary care.",
    accent: "forest",
    email: "benardmutua@kabarak.ac.ke",
    abstractCode: "879",
    presentationType: "Oral",
  },
  {
    name: "Lynn Mumo",
    role: "Speaker / Presenter",
    title: "Student Presenter — Oral / Poster",
    affiliation: "Kabarak University",
    session: "Abstract 812 · Breakout — Maternal & Child Health",
    bio: "Student presenter examining health financing pathways to UHC with lessons from East Africa.",
    accent: "primary",
    email: "lmumo@kabarak.ac.ke",
    abstractCode: "812",
    presentationType: "Poster",
  },
  {
    name: "Arthur Kipkemoi Saitabau Ng'etich",
    role: "Speaker / Presenter",
    title: "Kenyan Delegate — Oral Presentation",
    affiliation: "Kabarak University",
    session: "Abstract 749 · Breakout — Digital Health & AI",
    bio: "Delegate presenter on digital triage tools and their impact on patient wait-times in outpatient clinics.",
    accent: "gold",
    email: "akngetich@kabarak.ac.ke",
    abstractCode: "749",
    presentationType: "Oral",
  },
  {
    name: "Mohamed Siraji Hassan",
    role: "Speaker / Presenter",
    title: "Student Presenter — Oral Presentation",
    affiliation: "Kabarak University",
    session: "Abstract 865 · Breakout — Day 2",
    bio: "Student researcher presenting on mental health screening among undergraduate medical students.",
    accent: "forest",
    email: "siraji@kabarak.ac.ke",
    abstractCode: "865",
    presentationType: "Oral",
  },
  {
    name: "Mohamedkhalid Hared Derow",
    role: "Speaker / Presenter",
    title: "Student Presenter — Oral Presentation",
    affiliation: "Kabarak University",
    session: "Abstract 864 · Breakout — Day 2",
    bio: "Student researcher reporting on the nutrition status of school-aged children in arid counties of Kenya.",
    accent: "primary",
    email: "mderow@kabarak.ac.ke",
    abstractCode: "864",
    presentationType: "Oral",
  },
];

export const PARTNERS = [
  {
    name: "Millersville University",
    url: "https://www.millersville.edu",
    logo: "https://logo.clearbit.com/millersville.edu",
    blurb: "Pennsylvania, USA — Academic partner advancing global health education and exchange.",
  },
  {
    name: "UTMB Health — Center for Tropical Diseases",
    url: "https://www.utmb.edu",
    logo: "https://logo.clearbit.com/utmb.edu",
    blurb: "University of Texas Medical Branch — research collaboration on tropical and emerging diseases.",
  },
  {
    name: "Kabarak University",
    url: "https://www.kabarak.ac.ke",
    logo: "https://logo.clearbit.com/kabarak.ac.ke",
    blurb: "Host institution — School of Medicine & Health Sciences and School of Pharmacy.",
  },
  {
    name: "Kenya Medical Practitioners & Dentists Council (KMPDC)",
    url: "https://kmpdc.go.ke",
    logo: "https://logo.clearbit.com/kmpdc.go.ke",
    blurb: "National regulator of medical and dental practice in Kenya.",
  },
  {
    name: "Ministry of Health, Kenya",
    url: "https://www.health.go.ke",
    logo: "https://logo.clearbit.com/health.go.ke",
    blurb: "Policy partner — advancing universal health coverage nationally.",
  },
];

export type BreakoutModerator = {
  name: string;
  school: string;
};

export type BreakoutSession = {
  id: string;
  dayLabel: string;
  sessionLabel: string;
  time: string;
  topic: string;
  moderators: BreakoutModerator[];
  rapporteur: string;
  link?: string | null;
};

export const BREAKOUTS: BreakoutSession[] = [
  {
    id: "day1-breakout-1",
    dayLabel: "Day 1 — Thursday, 25 June 2026",
    sessionLabel: "Breakout 1",
    time: "14:20 – 16:30",
    topic: "Health Technology, Innovation, and Pharmaceutical Sciences",
    moderators: [
      { name: "Dr. Thrizza Kiplagat", school: "School of Pharmacy" },
      { name: "Dr. Benard Kioko", school: "School of Pharmacy" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/85043184504",
  },
  {
    id: "day1-breakout-2",
    dayLabel: "Day 1 — Thursday, 25 June 2026",
    sessionLabel: "Breakout 2",
    time: "14:20 – 16:30",
    topic: "Advancing Nursing Education, Practice Policy and Leadership",
    moderators: [
      { name: "Dr. Sam Mulongo", school: "School of Medicine and Health Sciences" },
      { name: "Dr. Phillip Towett", school: "School of Medicine and Health Sciences" },
      { name: "Ms. Valerie Suge", school: "School of Medicine and Health Sciences" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/81962756897",
  },
  {
    id: "day1-breakout-3",
    dayLabel: "Day 1 — Thursday, 25 June 2026",
    sessionLabel: "Breakout 3",
    time: "14:20 – 16:30",
    topic: "Health Systems Resilience, Biosafety, AMR and TB Control",
    moderators: [
      { name: "Dr. Miriam Muga", school: "School of Medicine and Health Sciences" },
      { name: "Dr. Jim Khamisi", school: "School of Pharmacy" },
      { name: "Dr. Jonathan Nthusi", school: "School of Medicine and Health Sciences" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/89745671901",
  },
  {
    id: "day2-breakout-1",
    dayLabel: "Day 2 — Friday, 26 June 2026",
    sessionLabel: "Breakout 1",
    time: "08:40 – 09:40",
    topic: "Nutrition, Health Technology, Pediatric Care and Lifestyle Interventions",
    moderators: [
      { name: "Dr. Phyllis Waruguru", school: "School of Medicine and Health Sciences" },
      { name: "Dr. Wesley Bor", school: "School of Medicine and Health Sciences" },
      { name: "Dr. Shadrack Bett", school: "School of Medicine and Health Sciences" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/85124506254",
  },
  {
    id: "day2-breakout-2",
    dayLabel: "Day 2 — Friday, 26 June 2026",
    sessionLabel: "Breakout 2",
    time: "08:40 – 09:40",
    topic: "Emergency Response, Maternal-Newborn Health and Workforce Resilience",
    moderators: [
      { name: "Dr. Jonathan Nthusi", school: "School of Medicine and Health Sciences" },
      { name: "Dr. Norah Talam", school: "School of Medicine and Health Sciences" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/84528541990",
  },
  {
    id: "day2-breakout-3",
    dayLabel: "Day 2 — Friday, 26 June 2026",
    sessionLabel: "Breakout 3",
    time: "08:40 – 09:40",
    topic: "Preventive Health, Prediction Tools and Occupational Determinants",
    moderators: [
      { name: "Dr. Doris Kibiwott", school: "School of Medicine and Health Sciences" },
      { name: "Mr. Samuel Kingi", school: "School of Medicine and Health Sciences" },
    ],
    rapporteur: "SMHS & SOP (TBC)",
    link: "https://kabarak-ac-ke.zoom.us/j/88611721780",
  },
];

export const SCHEDULE = [
  {
    day: "Day 1 — Thursday, 25 June 2026",
    items: [
      { time: "08:00", title: "Registration & Welcome Coffee", room: "Main Foyer" },
      { time: "09:00", title: "Opening Prayer & National Anthem", room: "Main Auditorium" },
      { time: "09:30", title: "Keynote: Prof. Daniel A. Wubah", room: "Main Auditorium" },
      { time: "11:00", title: "Plenary: Dr David G. Kariuki — Regulation & Patient Safety", room: "Main Auditorium" },
      { time: "12:30", title: "Lunch & Poster Session", room: "Exhibition Hall" },
      { time: "14:00", title: "Breakout Sessions (Round 1)", room: "Rooms A–D" },
      { time: "16:00", title: "Breakout Sessions (Round 2)", room: "Rooms A–D" },
      { time: "18:00", title: "Networking Reception", room: "Garden Terrace" },
    ],
  },
  {
    day: "Day 2 — Friday, 26 June 2026",
    items: [
      { time: "08:30", title: "Morning Devotion", room: "Main Auditorium" },
      { time: "09:00", title: "Policy Address: Dr. Fredrick Ouma Oluga, PS MoH", room: "Main Auditorium" },
      { time: "11:00", title: "Breakout Sessions (Round 3)", room: "Rooms A–D" },
      { time: "12:30", title: "Lunch", room: "Exhibition Hall" },
      { time: "14:00", title: "Breakout Sessions (Round 4)", room: "Rooms A–D" },
      { time: "16:00", title: "Breakout Sessions (Round 5)", room: "Rooms A–D" },
      { time: "17:30", title: "Awards, Closing & Communique", room: "Main Auditorium" },
    ],
  },
];

export const ANNOUNCEMENTS = [
  { id: 1, when: "Today · 08:15", level: "urgent", title: "Reminder to Register for Desired Breakout Rooms", body: "Please register for your preferred Day 1 and Day 2 breakout sessions. Visit the Breakout Rooms section to view topics, moderators, and join your chosen Zoom room." },
  { id: 3, when: "Yesterday · 18:00", level: "info", title: "Book of Abstracts now live", body: "The Book of Abstracts has been published. Use the Abstracts tab to browse or download the PDF." },
  { id: 4, when: "Yesterday · 12:10", level: "success", title: "Updated Conference Program", body: "The latest AHC 2026 program is now available. Visit the Schedule section to view or download the full program PDF." },
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  "https://images.unsplash.com/photo-1559223607-a43f990c692c?w=800&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
  "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
];

export const ABSTRACTS = [
  { code: "799", title: "Strengthening community-based health surveillance in rural Kenya", author: "Billy Tomno", institution: "Kabarak University", type: "Oral" },
  { code: "878", title: "Maternal health outcomes in refugee settings: a cross-sectional review", author: "Kasoki Devughe Desanges", institution: "Kabarak University", type: "Poster" },
  { code: "879", title: "Antimicrobial stewardship in tertiary care: a five-year audit", author: "Benard Mutua", institution: "Kabarak University", type: "Oral" },
  { code: "749", title: "Digital triage tools and patient wait-times in outpatient clinics", author: "Arthur K. S. Ng'etich", institution: "Kabarak University", type: "Oral" },
  { code: "865", title: "Mental health screening among undergraduate medical students", author: "Mohamed Siraji Hassan", institution: "Kabarak University", type: "Oral" },
  { code: "864", title: "Nutrition status of school-aged children in arid counties", author: "Mohamedkhalid Hared Derow", institution: "Kabarak University", type: "Oral" },
  { code: "812", title: "Health financing pathways to UHC: lessons from East Africa", author: "L. Mumo", institution: "Kabarak University", type: "Poster" },
];
