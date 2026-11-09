/**
 * Central Configuration for Achievers Grammar School & Academy
 * 
 * All institutional details, phone numbers, WhatsApp credentials,
 * academic offerings, facilities, and staff profiles can be updated here.
 */

export interface AcademicProgram {
  id: string;
  title: string;
  category: string;
  gradeSpan: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  image: string;
  timing: string;
}

export interface SchoolFacility {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  iconName: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  relation: string;
  studentGrade: string;
  comment: string;
  rating: number;
  year: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classrooms' | 'Learning Activities' | 'School Events' | 'Student Projects' | 'Campus' | 'Sports and Activities';
  image: string;
  caption: string;
}

export const schoolConfig = {
  institution: {
    fullName: "Achievers Grammar School & Academy",
    shortName: "Achievers Academy",
    tagline: "Inspiring Young Minds, Building Brighter Futures",
    establishedNote: "Serving with Academic Distinction in Lahore, Pakistan",
    city: "Lahore",
    province: "Punjab",
    country: "Pakistan",
    // Clearly marked editable placeholder for exact physical campus address
    addressPlaceholder: "Main Campus, Lahore, Punjab, Pakistan (Official street address can be configured here)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.99380853755!2d74.19430588671876!3d31.48263520000001!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Lahore,Pakistan",
  },

  contact: {
    phone: "0321 7540210",
    phoneDisplay: "0321-7540210",
    email: "info@achieversgrammar.edu.pk",
    whatsappNumber: "0321 7540210",
    whatsappClean: "923217540210",
    defaultWhatsAppMessage: "Assalam-o-Alaikum! I would like to get information about Achievers Grammar School & Academy, admissions, classes and fee details. Please guide me.",
    hours: {
      morningSchool: "7:30 AM – 2:00 PM (Monday – Saturday)",
      eveningAcademy: "3:00 PM – 7:30 PM (Monday – Saturday)",
      adminOffice: "8:00 AM – 4:00 PM (Monday – Saturday)",
      sunday: "Closed",
    },
  },

  // Helper to generate real WhatsApp links
  getWhatsAppUrl: (customMessage?: string) => {
    const message = customMessage || schoolConfig.contact.defaultWhatsAppMessage;
    return `https://wa.me/${schoolConfig.contact.whatsappClean}?text=${encodeURIComponent(message)}`;
  },

  // Academic Programs
  programs: [
    {
      id: "montessori",
      title: "Montessori & Early Years",
      category: "Foundation Level",
      gradeSpan: "Playgroup · Nursery · Prep",
      tagline: "Nurturing curiosity, creativity, and foundational social skills.",
      description: "Our Early Childhood Program creates an engaging, activity-based environment where young learners develop language confidence, sensory coordination, numeracy, and cooperative interaction through structured play.",
      keyFeatures: [
        "Phonics and language immersion",
        "Sensory motor activity tools",
        "Safe, cheerful & hygienic classrooms",
        "Caring female instructional staff"
      ],
      image: "/src/assets/images/school_early_years_montessori_1794229428355.jpg",
      timing: "8:00 AM – 12:30 PM",
    },
    {
      id: "primary",
      title: "Primary Education",
      category: "Elementary School",
      gradeSpan: "Grade 1 to Grade 5",
      tagline: "Solidifying core literacies, mathematical intuition & scientific curiosity.",
      description: "Primary education at Achievers Grammar School focuses on solid conceptual foundations in English, Urdu, Mathematics, General Science, and Social Studies alongside character ethics and values.",
      keyFeatures: [
        "Activity-led conceptual understanding",
        "Bilingual communicative fluency (English & Urdu)",
        "Weekly mental math & reading circles",
        "Individual attention & supportive homework guidance"
      ],
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
      timing: "7:45 AM – 1:30 PM",
    },
    {
      id: "middle",
      title: "Middle School",
      category: "Intermediate Level",
      gradeSpan: "Grade 6 to Grade 8",
      tagline: "Developing analytical reasoning, independent study, and discipline.",
      description: "Middle school bridges childhood curiosity with rigorous academic disciplines. Students transition smoothly toward specialized sciences, computer skills, and creative writing.",
      keyFeatures: [
        "Specialized subject teachers",
        "Hands-on science & computer practicals",
        "Debates, speech contests & presentation skills",
        "Regular diagnostic testing & parent updates"
      ],
      image: "/src/assets/images/school_library_reading_hall_1794229427440.jpg",
      timing: "7:30 AM – 1:45 PM",
    },
    {
      id: "secondary",
      title: "Secondary Education (Matric / O-Levels)",
      category: "Senior School",
      gradeSpan: "Grade 9 & Grade 10 (Matriculation)",
      tagline: "Focused board exam preparation with high conceptual mastery.",
      description: "A results-oriented academic curriculum designed to empower students to excel in Lahore Board (BISE Lahore) examinations with distinction, comprehensive past paper drills, and concept clarification.",
      keyFeatures: [
        "Complete syllabus coverage with revision rounds",
        "Daily & weekly chapter test series",
        "Science laboratory practicals under supervision",
        "Special career counseling & motivation sessions"
      ],
      image: "/src/assets/images/school_science_laboratory_1794229426217.jpg",
      timing: "7:30 AM – 2:00 PM",
    },
    {
      id: "academy",
      title: "Achievers Evening Academy",
      category: "Coaching & Test Session",
      gradeSpan: "Classes 8th, 9th, 10th & Intermediate",
      tagline: "Targeted evening coaching, test systems, and board toppers' mentorship.",
      description: "Dedicated evening coaching program designed for students seeking exceptional academic enhancement, conceptual clarity, rigorous test evaluation series, and board exam mastery.",
      keyFeatures: [
        "Structured chapter-wise test sessions",
        "Individual doubt-clearing sessions",
        "Expert subject specialists for Physics, Chem, Bio & Math",
        "Performance tracking reports for parents"
      ],
      image: "/src/assets/images/school_computer_technology_lab_1794229428263.jpg",
      timing: "3:30 PM – 7:30 PM",
    },
  ] as AcademicProgram[],

  // Institutional Highlights / Why Choose Us
  whyChooseUs: [
    {
      title: "Supportive Learning Environment",
      description: "A disciplined yet warm, student-centered campus that promotes positive self-esteem, curiosity, and respect.",
      icon: "HeartHandshake",
    },
    {
      title: "Focus on Conceptual Clarity",
      description: "Moving beyond rote learning to foster deep comprehension, analytical inquiry, and independent thinking.",
      icon: "Brain",
    },
    {
      title: "Character & Moral Development",
      description: "Integrating ethical values, civic responsibility, and Islamic values alongside academic curriculum.",
      icon: "ShieldCheck",
    },
    {
      title: "Active Parent-Teacher Partnership",
      description: "Transparent feedback via scheduled meetings, periodic progress reports, and direct administrative access.",
      icon: "Users",
    },
    {
      title: "Co-curricular & Personality Growth",
      description: "Annual sports day, Qirat and Naat competitions, declamation contests, and science exhibitions.",
      icon: "Trophy",
    },
    {
      title: "Individual Learning Support",
      description: "Targeted remedial support for students needing extra attention to ensure no child is left behind.",
      icon: "Sparkles",
    },
  ],

  // Facilities
  facilities: [
    {
      id: "classrooms",
      title: "Modern, Well-Lit Classrooms",
      description: "Spacious, airy classrooms designed for comfortable study with modern whiteboards and ergonomic seating.",
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
      features: ["Proper ventilation & cooling", "Ergonomic furniture", "Digital learning aids"],
      iconName: "Presentation",
    },
    {
      id: "science-lab",
      title: "Equipped Science Laboratories",
      description: "Dedicated lab spaces equipped with apparatus and safety gear for Physics, Chemistry, and Biology practicals.",
      image: "/src/assets/images/school_science_laboratory_1794229426217.jpg",
      features: ["Microscopes & glassware", "Supervised experiments", "Safety certified equipment"],
      iconName: "FlaskConical",
    },
    {
      id: "library",
      title: "Library & Resource Center",
      description: "A quiet reading atmosphere filled with curriculum references, classic literature, and Islamic texts.",
      image: "/src/assets/images/school_library_reading_hall_1794229427440.jpg",
      features: ["Curriculum references", "Reading clubs", "Comfortable study carrels"],
      iconName: "BookOpen",
    },
    {
      id: "computer-lab",
      title: "Computer & Technology Lab",
      description: "Modern desktop workstations connected to high-speed internet for digital literacy and coding education.",
      image: "/src/assets/images/school_computer_technology_lab_1794229428263.jpg",
      features: ["Modern desktop systems", "Software development basics", "Supervised educational web access"],
      iconName: "Monitor",
    },
    {
      id: "early-years-zone",
      title: "Montessori Activity Hub",
      description: "A colorful, secure space equipped with Montessori apparatus, toys, and tactile developmental resources.",
      image: "/src/assets/images/montessori_activity_hub_1794231804713.jpg",
      features: ["Soft play mats", "Sensory developmental tools", "Child-safe environment"],
      iconName: "Smile",
    },
    {
      id: "sports-common",
      title: "Sports & Recreation Facilities",
      description: "Dedicated physical activity zones promoting fitness, cricket, badminton, and team sports.",
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
      features: ["Physical training coaches", "Indoor & outdoor games", "Annual sports gala"],
      iconName: "Activity",
    },
  ] as SchoolFacility[],

  // Verified & editable statistics counters
  statistics: [
    {
      label: "Dedicated Faculty",
      value: "25+",
      description: "Experienced & qualified educators",
      note: "Editable placeholder based on campus records",
    },
    {
      label: "Student-Teacher Ratio",
      value: "15:1",
      description: "Personalized attention for every child",
      note: "Commitment to individualized guidance",
    },
    {
      label: "Academic Programs",
      value: "5",
      description: "Montessori to Matric & Academy",
      note: "Complete educational pathway",
    },
    {
      label: "Parent Satisfaction",
      value: "98%",
      description: "Trust in our values & discipline",
      note: "Based on regular parent feedback surveys",
    },
  ],

  // Teachers / Faculty Section (Editable Demo Placeholders)
  faculty: [
    {
      id: "teacher-1",
      name: "Mrs. N. Tariq",
      subject: "Academic Head & English Language",
      qualification: "M.A. English, B.Ed (Punjab University)",
      experience: "12+ Years Educational Leadership",
      bio: "Fosters communicative confidence and creative expression through structured literature circles and phonics.",
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
    },
    {
      id: "teacher-2",
      name: "Mr. S. Rehman",
      subject: "Senior Science & Physics Faculty",
      qualification: "M.Sc Physics (UET / PU)",
      experience: "10+ Years Board Examination Prep",
      bio: "Focuses on practical experimental demonstration and board question paper patterns for senior students.",
      image: "/src/assets/images/school_science_laboratory_1794229426217.jpg",
    },
    {
      id: "teacher-3",
      name: "Ms. A. Fatima",
      subject: "Mathematics & Analytical Logic",
      qualification: "M.Sc Mathematics, Gold Medalist",
      experience: "8+ Years Teaching Experience",
      bio: "Simplifies algebraic reasoning and geometry into intuitive step-by-step problem-solving models.",
      image: "/src/assets/images/school_library_reading_hall_1794229427440.jpg",
    },
    {
      id: "teacher-4",
      name: "Mrs. Z. Farooq",
      subject: "Montessori & Early Years Coordinator",
      qualification: "Certified Montessori Diploma & B.Ed",
      experience: "9+ Years Early Childhood Specialist",
      bio: "Creates an affectionate, stimulating learning atmosphere for our youngest toddlers and kindergarteners.",
      image: "/src/assets/images/school_early_years_montessori_1794229428355.jpg",
    },
  ] as TeacherProfile[],

  // Gallery Items with multiple categories
  gallery: [
    {
      id: "gal-1",
      title: "Interactive Classroom Discussion",
      category: "Classrooms",
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
      caption: "Students actively participating in a conceptual learning session in Lahore.",
    },
    {
      id: "gal-2",
      title: "Science Lab Experiments",
      category: "Learning Activities",
      image: "/src/assets/images/school_science_laboratory_1794229426217.jpg",
      caption: "Senior science students conducting chemistry practicals under teacher supervision.",
    },
    {
      id: "gal-3",
      title: "Quiet Reading & Study Hall",
      category: "Campus",
      image: "/src/assets/images/school_library_reading_hall_1794229427440.jpg",
      caption: "Our academic library provides students with a peaceful environment for focused reading.",
    },
    {
      id: "gal-4",
      title: "Modern IT & Coding Class",
      category: "Student Projects",
      image: "/src/assets/images/school_computer_technology_lab_1794229428263.jpg",
      caption: "Students gaining hands-on computing skills and software understanding.",
    },
    {
      id: "gal-5",
      title: "Montessori Play & Learn Zone",
      category: "Learning Activities",
      image: "/src/assets/images/school_early_years_montessori_1794229428355.jpg",
      caption: "Early childhood learners building motor skills and letters recognition.",
    },
    {
      id: "gal-6",
      title: "Collaborative Study Group",
      category: "Campus",
      image: "/src/assets/images/school_library_reading_hall_1794229427440.jpg",
      caption: "Peer learning and academic discussion during revision periods.",
    },
    {
      id: "gal-7",
      title: "Science Practical Demonstration",
      category: "Learning Activities",
      image: "/src/assets/images/school_science_laboratory_1794229426217.jpg",
      caption: "Teacher demonstrating titration and microscopic specimen examination.",
    },
    {
      id: "gal-8",
      title: "Campus Educational Ambience",
      category: "Classrooms",
      image: "/src/assets/images/hero_school_campus_learning_1794229427042.jpg",
      caption: "Clean, disciplined, and modern learning spaces built for student success.",
    },
  ] as GalleryItem[],

  // Testimonials (Editable Demo Placeholders)
  testimonials: [
    {
      id: "test-1",
      parentName: "Muhammad Imran",
      relation: "Parent of Grade 9 Student",
      studentGrade: "Class 9 (Matric Stream)",
      comment: "The conceptual teaching methodology at Achievers Grammar School has made a remarkable difference in my son's science and mathematics grades. The faculty pays close individual attention.",
      rating: 5,
      year: "2025",
    },
    {
      id: "test-2",
      parentName: "Dr. Samina Bilal",
      relation: "Parent of Montessori & Grade 3 Students",
      studentGrade: "Montessori & Class 3",
      comment: "A truly caring environment. The teachers in early years are affectionate and attentive. Both of my daughters look forward to going to school every single morning.",
      rating: 5,
      year: "2026",
    },
    {
      id: "test-3",
      parentName: "Tariq Mahmood",
      relation: "Parent of Evening Academy Student",
      studentGrade: "Achievers Academy (Class 10)",
      comment: "The evening academy test session system gave my child the exam temperament and thorough revision needed to score top marks in board examinations.",
      rating: 5,
      year: "2025",
    },
  ] as TestimonialItem[],

  // Admission Process Steps
  admissionSteps: [
    {
      stepNumber: "01",
      title: "Admission Enquiry & Campus Visit",
      description: "Fill the online enquiry form or visit our campus office in Lahore to receive the school prospectus and registration form.",
    },
    {
      stepNumber: "02",
      title: "Assessment & Interactive Session",
      description: "An age-appropriate, friendly assessment to gauge the child's foundational readiness followed by an informal discussion with parents.",
    },
    {
      stepNumber: "03",
      title: "Documentation & Verification",
      description: "Submit student B-Form / Birth Certificate, previous school leaving certificate (if applicable), and guardian CNIC copies.",
    },
    {
      stepNumber: "04",
      title: "Enrollment & Orientation",
      description: "Fee submission, syllabus collection, and warm welcome into the Achievers Grammar School & Academy family.",
    },
  ],

  classesList: [
    "Playgroup (Early Years)",
    "Nursery",
    "Prep / Kindergarten",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9 (Matric - Science / Arts)",
    "Class 10 (Matric - Science / Arts)",
    "Achievers Evening Academy (Class 9 & 10 Coaching)",
    "Achievers Evening Academy (Intermediate / Pre-Board)",
  ],
};
