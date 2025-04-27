// Job data with predictions and images
export const jobData: Record<number, { jobs: string, image: string }> = {
  1: {
    jobs: "CEO, Team Leader, Businessman, Government Jobs, Managers, Sports, Medical, Management Roles, Entrepreneur",
    image: "https://images.pexels.com/photos/3760813/pexels-photo-3760813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  2: {
    jobs: "Artist, Chef, Singer, Relationship Coach, Public Relationship, Acting sales, HealthCare, Trainers, Spiritual Fields, Teaching, Designing, Liquid Business",
    image: "https://images.pexels.com/photos/3760766/pexels-photo-3760766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  3: {
    jobs: "Training, Teaching, Occult, Public Speaking, Writers, RealState, Entertainment, Consulting, Counseling, Glamour Fields, Artistic Fields, Doctor",
    image: "https://images.pexels.com/photos/3760958/pexels-photo-3760958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  4: {
    jobs: "Engineering, IT Fields, Accounts, Finance, FMCG, Astrology, Programming, StockMarket, Army, Legal Fields, CA",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  5: {
    jobs: "Flight Attendants, Pilot, Travel related any job, Public Speaking, Journalist, Lawyer, Marketing, Business Owners, Advisors, Production Lines, Management Roles",
    image: "https://images.pexels.com/photos/7235677/pexels-photo-7235677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  6: {
    jobs: "Fashion Designer, Entertainment, Hospitality, Doctor, Interior Designer, Restaurant Owner, Chef, Online Business, Influencers",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  7: {
    jobs: "Spiritual Fields, Researchers, Detective, Teaching, Ayurveda, Doctor, Art, Sports, Agriculture",
    image: "https://images.pexels.com/photos/3184285/pexels-photo-3184285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  8: {
    jobs: "Banking, Govt Job, Finance, Science, Law, Business, Trading Investor, Ecom, Manager, Admin, CA",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  9: {
    jobs: "Healers, Police, Business, Construction, Engineers, Real Estate, Stock Market, Doctors, Sports, Mining, NGO",
    image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
};

export const jobDetails: Record<string, JobDetails> = {
  "Engineering": {
    title: "Professional Engineer",
    description: "Design, develop, and implement technical solutions across various industries. Engineers apply scientific principles to solve complex problems and create innovative products.",
    skills: ["Technical Expertise", "Problem Solving", "Mathematics", "Project Management", "Innovation"],
    salary: "$85,000 - $150,000+",
    growth: "7% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Doctor": {
    title: "Medical Doctor",
    description: "Diagnose and treat illnesses, prescribe medications, and provide healthcare advice to patients. Doctors work in various specialties and settings, from private practice to hospitals.",
    skills: ["Medical Knowledge", "Patient Care", "Clinical Skills", "Problem Solving", "Communication"],
    salary: "$208,000 - $400,000+",
    growth: "13% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "CEO": {
    title: "Chief Executive Officer",
    description: "Lead and direct organizations, setting strategic goals and ensuring operational excellence. CEOs are the highest-ranking executives responsible for making major corporate decisions.",
    skills: ["Leadership", "Strategic Planning", "Decision Making", "Business Acumen", "Communication"],
    salary: "$150,000 - $1,000,000+",
    growth: "6% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Businessman": {
    title: "Business Owner / Entrepreneur",
    description: "Start and manage businesses, identify market opportunities, and develop successful business strategies. Business owners oversee operations, finances, and growth.",
    skills: ["Business Strategy", "Financial Management", "Leadership", "Marketing", "Networking"],
    salary: "$70,000 - $500,000+",
    growth: "8% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Artist": {
    title: "Professional Artist",
    description: "Create original artwork using various mediums and techniques. Artists work in multiple fields including fine arts, digital art, illustration, and commercial design.",
    skills: ["Creativity", "Technical Skills", "Color Theory", "Design Principles", "Project Management"],
    salary: "$45,000 - $100,000+",
    growth: "5% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Chef": {
    title: "Professional Chef",
    description: "Create and prepare innovative dishes, manage kitchen operations, and develop menus. Chefs work in restaurants, hotels, and private settings.",
    skills: ["Culinary Expertise", "Menu Planning", "Kitchen Management", "Creativity", "Time Management"],
    salary: "$45,000 - $90,000+",
    growth: "15% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Pilot": {
    title: "Commercial Pilot",
    description: "Operate aircraft for airlines, private companies, or other aviation services. Pilots ensure safe flights and follow strict aviation regulations.",
    skills: ["Aviation Knowledge", "Decision Making", "Communication", "Technical Skills", "Safety Management"],
    salary: "$80,000 - $200,000+",
    growth: "4% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/8471827/pexels-photo-8471827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Fashion Designer": {
    title: "Fashion Designer",
    description: "Create clothing, accessories, and footwear designs. Fashion designers work with various materials and stay current with fashion trends.",
    skills: ["Design", "Creativity", "Trend Analysis", "Sketching", "Material Knowledge"],
    salary: "$50,000 - $130,000+",
    growth: "3% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Teacher": {
    title: "Education Professional",
    description: "Educate and inspire students, developing curriculum and implementing effective teaching methods. Teachers work across various educational levels and subjects.",
    skills: ["Communication", "Patience", "Organization", "Leadership", "Adaptability"],
    salary: "$45,000 - $85,000+",
    growth: "8% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Lawyer": {
    title: "Legal Professional",
    description: "Provide legal advice and representation to clients. Lawyers specialize in various areas of law and work in private practice or organizations.",
    skills: ["Legal Knowledge", "Analysis", "Communication", "Research", "Negotiation"],
    salary: "$75,000 - $200,000+",
    growth: "9% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "Police": {
    title: "Law Enforcement Officer",
    description: "Protect communities, enforce laws, and maintain public safety. Police officers work in various specializations and departments.",
    skills: ["Physical Fitness", "Decision Making", "Communication", "Problem Solving", "Public Service"],
    salary: "$50,000 - $100,000+",
    growth: "7% growth rate expected over the next decade",
    image: "https://images.pexels.com/photos/1464823/pexels-photo-1464823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
};