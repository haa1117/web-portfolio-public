/**
 * Facts taken from the CV (CV Nov 2025). Nothing here is added beyond what the CV states;
 * job titles are deliberately omitted because the CV does not give them.
 */

export type Experience = {
  company: string;
  dates: string;
  /** Short domain label shown on the card. */
  domain: string;
  /** Visual weight: the current role gets the featured treatment. */
  featured?: boolean;
  current?: boolean;
  /** Only set where the company site is also one of the portfolio's own projects. */
  href?: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Future Watch",
    dates: "Jun 2025 – Present",
    domain: "Android & full-stack mobile",
    featured: true,
    current: true,
    href: "https://futurewatch.co",
    points: [
      "Develops and ships Android applications with Google Play Billing, AdMob, Firebase Authentication and Firestore real-time sync, keeping data consistent across devices and reducing data loss.",
      "Builds optimised UI/UX with lean-back and custom layouts, improving performance and load times by about 25%.",
      "Delivers full-stack mobile solutions: API integrations, secure cloud data flows and automated releases that shorten development turnaround.",
    ],
    tags: ["Android", "Google Play Billing", "AdMob", "Firebase Auth", "Firestore", "API integrations", "Automated releases"],
  },
  {
    company: "Confiz Limited",
    dates: "Jun – Aug 2024",
    domain: "AI / ML",
    points: [
      "Worked on AI and machine-learning projects, improving model accuracy by about 15% for more precise predictions and better decision-making.",
      "Used TensorFlow and PyTorch and collaborated with cross-functional teams to integrate AI solutions into existing systems.",
    ],
    tags: ["AI/ML", "TensorFlow", "PyTorch"],
  },
  {
    company: "ADDO AI",
    dates: "May – Jun 2024",
    domain: "AI & data",
    points: [
      "Deployed AI models, predictive analytics and automation to improve decision-making and efficiency.",
      "Processed and optimised large-scale datasets (100K+ records) for AI training, improving model efficiency and performance.",
    ],
    tags: ["AI models", "Predictive analytics", "Automation", "Large datasets"],
  },
  {
    company: "Lucrum",
    dates: "Jul – Aug 2022",
    domain: "Business intelligence",
    points: [
      "Built interactive Power BI dashboards and used ERP systems to support smoother operations and operational analysis.",
      "Applied the analysis to business decision-making and organisational productivity.",
    ],
    tags: ["Power BI", "Dashboards", "ERP systems", "Operational analysis"],
  },
  {
    company: "NETSOL Technologies",
    dates: "Jun – Aug 2021",
    domain: "Business analysis",
    points: [
      "Conducted market analysis for a client to identify business opportunities and new revenue streams.",
      "Created and presented business proposals supporting client acquisition and retention.",
    ],
    tags: ["Market analysis", "Business proposals", "Client research"],
  },
  {
    company: "Shaukat Khanum Cancer Memorial Hospital",
    dates: "Jun – Jul 2020",
    domain: "Non-profit funding support",
    points: ["Contributed to funding initiatives that increased funding and strengthened sponsor retention and long-term partnerships."],
    tags: ["Funding initiatives", "Sponsor relations"],
  },
];

export const giki = {
  school: "Ghulam Ishaq Khan University of Engineering Sciences and Technology (GIKI)",
  short: "GIKI",
  degree: "Bachelor of Science in Data Science",
  dates: "2021 – 2025",
  /** Most relevant first; the first `COURSES_SHOWN` are visible by default. */
  courses: [
    "Data Structures",
    "Algorithms",
    "Database Management Systems",
    "Data Warehousing",
    "Data Engineering",
    "Data Visualization",
    "Software Engineering",
    "Operating Systems",
    "Object-Oriented Programming",
    "DevOps",
    "Computer Networking",
    "Data Network & Security",
    "Parallel Processing",
  ],
};
export const COURSES_SHOWN = 8;

export const aitchison = {
  school: "Aitchison College Lahore",
  degree: "O Levels & A Levels",
  dates: "2021",
  subjects: ["Mathematics", "Physics", "Computer Science"],
};

export type AcademicProject = {
  name: string;
  tag: string;
  body: string;
  tags: string[];
  /** Only set where a real public repository exists. */
  github?: string;
  note?: string;
};

/** Final-year project: the only academic project with a public repository. */
export const agroScan: AcademicProject = {
  name: "AGRO SCAN",
  tag: "Final Year Project · Sponsored by the Higher Education Commission of Pakistan",
  body: "An AI-powered IoT system for agricultural monitoring and water management. Soil-moisture, air, humidity and temperature sensors feed real-time data into machine-learning models that analyse and optimise farming practices, supporting land productivity, resource efficiency (25% water savings) and sustainability.",
  tags: ["AI", "IoT", "Machine learning", "Agriculture", "Sustainability"],
  github: "https://github.com/haa1117/agro-scan-public",
  note: "The public repository is a web reference implementation of the crop-scanning idea (colour-based image analysis on demo data). It does not contain the IoT or machine-learning system.",
};

export const earlierProjects: AcademicProject[] = [
  {
    name: "Social Media Engagement Analysis",
    tag: "Machine learning",
    body: "Supervised-learning sentiment analysis of social-media tweets using KNN, Naïve Bayes, Random Forest and Decision Tree classifiers, reaching 85% sentiment-classification accuracy.",
    tags: ["KNN", "Naïve Bayes", "Random Forest", "Decision Trees"],
  },
  {
    name: "ATM Transaction Analysis",
    tag: "Data visualisation",
    body: "Power BI dashboard covering transaction trends, peak usage times and geographic distribution to support ATM network planning.",
    tags: ["Power BI"],
  },
  {
    name: "Hey Doctor",
    tag: "Application",
    body: "A user-friendly disease-diagnosis application with a database of symptoms and treatments, with a simplified GUI for accessibility.",
    tags: ["GUI", "Healthcare"],
  },
  {
    name: "Blood Bank Management",
    tag: "Database system",
    body: "Python and SQL blood-bank inventory management system, with optimised SQL queries for faster responses.",
    tags: ["Python", "SQL"],
  },
];

export type Activity = { title: string; org: string; when: string; note?: string };

export const leadership: Activity[] = [
  { title: "General Secretary", org: "Aitchison College Chess Society", when: "2020 – 2021", note: "Registered about 450 participants for the college chess tournament and led a team of 30." },
  { title: "Event Co-ordinator", org: "GIKI Science Society", when: "Feb 2025", note: "Managed an event hosted by several societies, with 1,500+ participants from across Pakistan." },
  { title: "Event Co-ordinator", org: "All Pakistan Science Fair", when: "2024 – 2025" },
  { title: "Captain", org: "Aitchison College Squash Team", when: "2021" },
  { title: "Best Director", org: "Aitchison College Art Fest", when: "2020" },
];
