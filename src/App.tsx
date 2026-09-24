import { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Smartphone,
  ShieldCheck,
  Zap,
  ChevronDown,
  Mail,
  MessageSquare,
  Send,
  Copy,
  Check,
  Menu,
  X,
  Monitor,
  ArrowRight,
  Sliders,
  Coffee,
  Dumbbell,
  Scissors,
  Eye,
  HelpCircle,
  Phone,
  ExternalLink
} from 'lucide-react';

import CafeDemo from './demos/CafeDemo';
import SalonDemo from './demos/SalonDemo';
import GymDemo from './demos/GymDemo';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Do I completely own my website once it's done?",
    a: "Yes, 100%. All design files, website source code, and domain accounts belong completely to you. There are zero hidden monthly lock-ins, licenses, or surprise fees."
  },
  {
    q: "How does your AI-assisted development benefit my business?",
    a: "I hand-code your website using modern web tech (React/Next.js) and use AI tools (Claude) behind the scenes to write boilerplate code, test, and debug. This means you get a high-quality, custom website in 7–10 days instead of waiting 6–8 weeks for an agency."
  },
  {
    q: "What if I need text, photos, or price updates after launching?",
    a: "Every project comes with a 14-day free warranty period where any minor fixes, copy tweaks, or adjustments are completed promptly. Afterward, you can opt for an optional monthly care plan (₹1,499/mo) or edit key content yourself."
  },
  {
    q: "How do payments work?",
    a: "We work on a straightforward milestone split: 50% advance to initiate planning and design wireframes, and the remaining 50% only when the website is finalized, tested, and ready to go live on your domain."
  },
  {
    q: "I don't have good photos or written content yet. Can you help?",
    a: "Yes. I help write clear, customer-friendly copy and can curate high-resolution, commercially licensed photography to make your business look professional from day one."
  }
];

const CONCEPT_PROJECTS = [
  {
    id: 'cafe',
    route: '/demos/cafe',
    category: 'Cafe / Restaurant',
    title: 'Ember & Bean Specialty Roastery',
    badge: 'Concept Demo',
    subtitle: 'Warm, editorial digital presence focused on artisan menu discovery and frictionless table bookings.',
    objective: 'Demonstrates digital menu filtering, table reservations, and Google Maps local SEO integration.',
    metric: 'Designed for sub-1 second mobile load time so hungry diners never leave.',
    accent: 'from-amber-700/20 to-orange-950/30',
    tagColor: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    icon: Coffee,
    deliverables: ['Digital Food & Brew Menu', 'WhatsApp Table Booking', 'Google Maps Embed', 'Local Search Schema'],
    stack: ['React', 'Tailwind CSS', 'Mobile First'],
    features: [
      'Interactive manual brews, bakery, and all-day brunch menu categories',
      'Table reservation form with automated date and party size selections',
      'Location and opening hours banner optimized for near-me foot traffic'
    ],
    previewContent: {
      heroHeadline: "Deliberate roasts, baked fresh every sunrise.",
      heroSub: "Experience artisan brews sourced from award-winning estates in Chikmagalur and Coorg.",
      menuItems: [
        { name: "Monsooned Malabar Pour-Over", price: "₹240", notes: "Floral aroma, notes of peach & bergamot" },
        { name: "18-Hour Slow Steep Cold Brew", price: "₹220", notes: "Natural chocolate undertones, served over clear rock ice" },
        { name: "Dark Chocolate Sea Salt Babka", price: "₹220", notes: "Twice baked brioche with 70% Coorg single-origin cacao" }
      ],
      stats: [
        { label: "Mobile Speed", val: "0.8s" },
        { label: "Booking Mode", val: "Online/Chat" },
        { label: "Menu Style", val: "Interactive" }
      ]
    }
  },
  {
    id: 'salon',
    route: '/demos/salon',
    category: 'Salon & Spa',
    title: 'Atelier V Boutique Hair Lounge',
    badge: 'Concept Demo',
    subtitle: 'Modern, stylish appointment management lookbook for premium beauty studios.',
    objective: 'Replaces manual phone booking confusion with transparent service rates, stylist bios, and quick booking requests.',
    metric: 'Cuts front-desk phone inquiry time with transparent service pricing.',
    accent: 'from-rose-900/20 to-zinc-900/30',
    tagColor: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
    icon: Scissors,
    deliverables: ['Categorized Price Menu', 'Stylist Profiles', 'Appointment Booking Flow', 'Visual Showcase'],
    stack: ['React', 'Tailwind CSS', 'Editorial Design'],
    features: [
      'Complete categorized rate card (Hair, Balayage, Keratin, Spa) with service duration',
      'Resident stylist profiles with background, expertise, and direct booking triggers',
      'Mobile appointment request sheet with instant WhatsApp response promise'
    ],
    previewContent: {
      heroHeadline: "Elevating your natural silhouette with deliberate precision.",
      heroSub: "Private hair treatments, French balayage, and botanical rituals in a serene sanctuary.",
      menuItems: [
        { name: "Signature Haircut & Restyle", price: "₹1,250", notes: "Consultation, botanical wash, custom scissor cut & blow-dry" },
        { name: "French Balayage & Tonal Gloss", price: "₹4,499+", notes: "Hand-painted dimensional highlights with acidic gloss" },
        { name: "Organic Keratin Infusion", price: "₹3,400", notes: "Formaldehyde-free smoothing ritual for frizz-free locks" }
      ],
      stats: [
        { label: "Menu Clarity", val: "100%" },
        { label: "Mobile Look", val: "Editorial" },
        { label: "Booking Mode", val: "WhatsApp Form" }
      ]
    }
  },
  {
    id: 'gym',
    route: '/demos/gym',
    category: 'Gym & Fitness',
    title: 'Pulse Athletics & Conditioning Club',
    badge: 'Concept Demo',
    subtitle: 'High-energy fitness club website designed to convert social visitors into 1-day trial members.',
    objective: 'Showcases transparent membership tiers, program pillars, and a 2-step trial pass claim sheet.',
    metric: 'Built with high-contrast CTA buttons to turn visitors into active gym inquiries.',
    accent: 'from-blue-900/20 to-slate-900/30',
    tagColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
    icon: Dumbbell,
    deliverables: ['Transparent Membership Rates', 'Training Pillars Showcase', '1-Day Trial Form', 'Coach Overview'],
    stack: ['React', 'Tailwind CSS', 'High Contrast'],
    features: [
      '3-tier transparent membership pricing with zero hidden sign-up charges',
      'Interactive 1-day pass claim form for new neighborhood members',
      'Performance programs: Hyrox engine, Olympic lifting, and active recovery pods'
    ],
    previewContent: {
      heroHeadline: "Science-backed strength for athletes who demand results.",
      heroSub: "Eleiko bars, Rogue rigs, and dedicated recovery cold plunge pods in a private environment.",
      menuItems: [
        { name: "Hyrox & Engine Conditioning", price: "07:00 AM", notes: "Sled push, skierg intervals, and tactical pacing" },
        { name: "Barbell & Olympic Strength", price: "09:00 AM", notes: "Clean, snatch, deadlift, and squat cycles" },
        { name: "Mobility & Joint Longevity", price: "06:00 PM", notes: "Active fascia release and recovery protocols" }
      ],
      stats: [
        { label: "Trial Conversion", val: "High Focus" },
        { label: "Pass Mode", val: "1-Day Free" },
        { label: "Class Max", val: "14 Athletes" }
      ]
    }
  }
];

const SERVICES = [
  {
    title: "Complete Business Website",
    badge: "Most Popular",
    priceText: "Starting at ₹14,999",
    whatYouDo: "I design and build a complete, multi-page website (up to 5 pages) tailored specifically for your brand.",
    whoItsFor: "Cafes, salons, gyms, dental clinics, interior studios, and local services that want a credible online storefront.",
    whatYouGet: [
      "Up to 5 custom pages (Home, Services/Menu, About, Gallery, Contact)",
      "100% mobile-friendly layout tested on all smartphones",
      "One-click WhatsApp chat and Google Maps location button",
      "Local Google Search optimization so customers find you",
      "Fast cloud hosting setup with zero downtime"
    ],
    timeline: "7–14 Days"
  },
  {
    title: "High-Impact Landing Page",
    badge: "Quick Turnaround",
    priceText: "Starting at ₹7,999",
    whatYouDo: "A fast, single-page website focused entirely on converting visitors into calls, WhatsApp messages, or form inquiries.",
    whoItsFor: "Businesses launching an ad campaign, promoting a specific service, or needing a quick professional presence.",
    whatYouGet: [
      "1 comprehensive, high-conversion single page",
      "Clear call-to-action buttons (Call Now, WhatsApp, Booking Form)",
      "High-speed architecture (loads in under 1.2 seconds)",
      "Clean photo gallery and client review section",
      "Google Analytics & lead tracking setup"
    ],
    timeline: "3–5 Days"
  },
  {
    title: "Website Redesign & Modernization",
    badge: "Performance Boost",
    priceText: "Starting at ₹11,999",
    whatYouDo: "I take your outdated, clunky WordPress or DIY website and rebuild it with fresh design and modern, super-fast code.",
    whoItsFor: "Businesses that already have an old website that feels sluggish, looks bad on mobile phones, or fails to bring inquiries.",
    whatYouGet: [
      "Modern, polished visual design that matches your brand quality",
      "Smooth mobile layout that doesn't break or stretch awkwardly",
      "Drastic speed improvement (eliminates slow page loading)",
      "All your existing text, images, and domain name preserved safely"
    ],
    timeline: "5–10 Days"
  },
  {
    title: "Website Care & Hosting Retainer",
    badge: "Zero Hassle",
    priceText: "₹1,499 / month (Optional)",
    whatYouDo: "I handle all technical maintenance, fast cloud hosting, backups, and regular content adjustments so you never worry about tech.",
    whoItsFor: "Busy business owners who want someone reliable on call for menu updates, price edits, and peace of mind.",
    whatYouGet: [
      "Fast, high-performance secure cloud server hosting",
      "Monthly text, photo, and menu/price changes",
      "Continuous uptime monitoring and security checks",
      "Direct priority WhatsApp line with me for any queries"
    ],
    timeline: "Ongoing Support"
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "15-Minute Intro Chat",
    desc: "We discuss your business, what services you want to highlight, and what kind of customers you want to attract. No confusing jargon—just clear talk on what your site needs."
  },
  {
    step: "02",
    title: "Visual Plan & Content",
    desc: "I create a clear blueprint showing the page layouts, photos, and headlines. You get to review and approve the look and feel before full coding begins."
  },
  {
    step: "03",
    title: "Rapid, Hand-Crafted Coding",
    desc: "I build your website using modern, clean code and Claude-powered AI workflows. This allows me to craft agency-grade quality in 7–10 days rather than months."
  },
  {
    step: "04",
    title: "Testing, Launch & Handoff",
    desc: "We test the site on iPhones, Androids, tablets, and laptops. Once you're 100% happy, we link your domain and launch. You receive 100% full ownership of everything."
  }
];

const WHY_WORK_WITH_ME = [
  {
    icon: Smartphone,
    title: "Obsessed with Mobile Experience",
    text: "More than 80% of your Indian customers will check your business on an Android phone or iPhone. Every button, menu, and image is tested so it feels as smooth as an app."
  },
  {
    icon: ShieldCheck,
    title: "Direct Access — No Middlemen",
    text: "When you hire me, you communicate directly with the person writing your code. No clueless project managers, no delays, and no inflated agency fees."
  },
  {
    icon: Zap,
    title: "AI Speed With Hand-Crafted Code",
    text: "I use Claude Code and modern AI tools as an engineer's assistant to eliminate boilerplate, check bugs, and test quickly. You get an elite custom website in days, not months."
  },
  {
    icon: Clock,
    title: "Honest, Transparent Pricing",
    text: "Clear pricing in Indian Rupees with no hidden renewal charges or recurring proprietary software fees. You own 100% of your website from day one."
  }
];

type ProjectItemType = (typeof CONCEPT_PROJECTS)[number];

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('/demos/')) return hash;
    return window.location.pathname;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('/demos/')) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(window.location.pathname);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  if (currentPath === '/demos/cafe') {
    return <CafeDemo />;
  }
  if (currentPath === '/demos/salon') {
    return <SalonDemo />;
  }
  if (currentPath === '/demos/gym') {
    return <GymDemo />;
  }

  return <MainPortfolio onNavigateDemo={navigateTo} />;
}

function MainPortfolio({ onNavigateDemo }: { onNavigateDemo: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItemType | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  const [selectedServiceType, setSelectedServiceType] = useState('full-site');
  const [pageCount, setPageCount] = useState(4);
  const [includeSeo, setIncludeSeo] = useState(true);
  const [includeSpeed, setIncludeSpeed] = useState(true);
  const [timelineUrgency, setTimelineUrgency] = useState('standard');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    budgetRange: '₹15,000 – ₹25,000',
    message: ''
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit'
        });
        setCurrentTime(timeString);
      } catch {
        setCurrentTime('IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProject) {
        setActiveModalProject(null);
      }
    };

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const estimatedEstimate = useMemo(() => {
    let base = 14999;
    if (selectedServiceType === 'landing') base = 7999;
    if (selectedServiceType === 'redesign') base = 11999;
    if (selectedServiceType === 'full-site') base = 14999;

    const extraPages = Math.max(0, pageCount - 3);
    const pageCost = extraPages * 1200;
    const seoCost = includeSeo ? 2500 : 0;
    const speedCost = includeSpeed ? 1800 : 0;
    const urgencyMultiplier = timelineUrgency === 'express' ? 1.25 : 1.0;

    const total = Math.round((base + pageCost + seoCost + speedCost) * urgencyMultiplier);
    const roundedMin = Math.floor((total * 0.92) / 500) * 500;
    const roundedMax = Math.ceil((total * 1.1) / 500) * 500;

    return {
      min: roundedMin.toLocaleString('en-IN'),
      max: roundedMax.toLocaleString('en-IN')
    };
  }, [selectedServiceType, pageCount, includeSeo, includeSpeed, timelineUrgency]);

  const handleLockEstimate = () => {
    const scopeMap: Record<string, string> = {
      'landing': 'Single Landing Page',
      'full-site': 'Complete Business Website',
      'redesign': 'Website Redesign'
    };

    const serviceName = scopeMap[selectedServiceType] || 'Business Website';

    setContactData(prev => ({
      ...prev,
      budgetRange: `₹${estimatedEstimate.min} – ₹${estimatedEstimate.max}`,
      message: `Hi Vibhor, I used your estimator for a ${serviceName} (~${pageCount} pages) with ${includeSeo ? 'Local SEO setup' : 'standard setup'}. I would like to discuss this for my business.`
    }));

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vibhorverma.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return CONCEPT_PROJECTS;
    return CONCEPT_PROJECTS.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase()));
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#E4E4E7] font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#090A0F]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center font-mono font-bold text-white text-base group-hover:border-cyan-400/50 transition-colors shadow-sm">
              VV
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                Vibhor Verma
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              </span>
              <span className="text-xs text-zinc-400 font-mono">Freelance Web Developer</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">1. Services &amp; Pricing</a>
            <a href="#work" className="hover:text-white transition-colors">2. Live Samples</a>
            <a href="#process" className="hover:text-white transition-colors">3. How It Works</a>
            <a href="#calculator" className="hover:text-white transition-colors">4. Cost Estimator</a>
            <a href="#about" className="hover:text-white transition-colors">5. About Me</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Available for New Projects
            </div>
            <a 
              href="#contact" 
              className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              Start a Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#090A0F] px-4 py-6 space-y-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Available for 2 Projects This Month
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-zinc-300">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">Services &amp; Pricing</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">Live Samples</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">How It Works</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">Cost Estimator</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">About Me</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-zinc-900/50 hover:bg-zinc-800">FAQ</a>
            </div>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-lg bg-white text-zinc-950 font-semibold text-center block text-sm shadow-md"
            >
              Start a Project
            </a>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-white/[0.06]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-cyan-600/[0.08] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono text-zinc-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Websites for Cafes, Salons, Gyms, Clinics &amp; Local Brands</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] mb-6">
              I build fast, beautiful websites that turn your visitors into <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 underline decoration-cyan-500/40 decoration-wavy decoration-2">paying customers &amp; inquiries</span>.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-8">
              Hi, I’m <strong>Vibhor Verma</strong>. I build modern, mobile-friendly websites for real businesses. 
              No confusing technical jargon, no slow templates—just clean websites that load fast, show off your services, and make it effortless for customers to call or WhatsApp you.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md sm:max-w-none">
              <a 
                href="#contact" 
                className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-98 cursor-pointer"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#work" 
                className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                See Live Sample Work
              </a>
              <a 
                href="#calculator" 
                className="px-4 py-3.5 rounded-xl bg-transparent border border-white/10 text-zinc-400 hover:text-white text-sm font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Calculate Instant Cost (INR ₹)
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">&lt; 1.0s</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Mobile Loading Speed</div>
                <p className="text-[11px] text-zinc-400 leading-tight">Pages load instantly on smartphone data.</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">₹7,999+</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Accessible Pricing</div>
                <p className="text-[11px] text-zinc-400 leading-tight">Real starter packages for small businesses.</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">7–10 Days</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Fast Delivery</div>
                <p className="text-[11px] text-zinc-400 leading-tight">AI-accelerated development saves weeks of waiting.</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">100% Mine</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Total Ownership</div>
                <p className="text-[11px] text-zinc-400 leading-tight">You own 100% of the code, domain, and files.</p>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 sm:py-28 bg-zinc-950/60 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Step 1 · Clear Options</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Website Services &amp; Transparent Packages
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2">
                No vague technical packages. Here is what I do, who each service is designed for, and exactly what you receive for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES.map((srv, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-6 sm:p-8 hover:border-white/20 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5 inline-block mb-2">
                          {srv.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{srv.title}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-mono font-bold text-cyan-400">{srv.priceText}</div>
                        <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {srv.timeline}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-medium">What I Do:</span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{srv.whatYouDo}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">Best Suited For:</span>
                      <p className="text-xs text-zinc-300 leading-relaxed">{srv.whoItsFor}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">What You Get:</span>
                      <ul className="space-y-2">
                        {srv.whatYouGet.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-snug">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <a 
                      href="#contact"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      Book this package
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* WORK SECTION — ENHANCED DEMO PROJECTS */}
        <section id="work" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                <Layers className="w-3.5 h-3.5" />
                Step 2 · Real Working Demos
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Interactive Demo Projects
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl leading-relaxed">
                These are fully responsive, production-standard concept websites I hand-crafted to show what I can build for your business. Open the live demo or view the quick preview below.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-medium">
              {['All', 'Cafe', 'Salon', 'Gym'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-zinc-950 border-white font-semibold'
                      : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <div 
                  key={project.id}
                  className="group rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-lg"
                >
                  <div className="p-6 sm:p-7">
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-medium border ${project.tagColor}`}>
                          {project.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-amber-300/90 border border-amber-500/20">
                          {project.badge}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-800/60 text-zinc-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>

                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 mb-5 space-y-1">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Key Business Focus:</span>
                      <p className="text-xs text-emerald-400 font-medium">{project.objective}</p>
                    </div>

                    <ul className="space-y-1.5 mb-6">
                      {project.features.map((feat, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {project.deliverables.map((item) => (
                        <span key={item} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Dual CTA */}
                  <div className="px-6 py-4 bg-zinc-950/80 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateDemo(project.route)}
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Demo
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick Peek
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-zinc-900/30 border border-white/5 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Honest note:</strong> These sample websites are functional concept prototypes built to showcase mobile speed, aesthetics, and layout standards.</span>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Step 3 · Simple Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How We Go From Idea to Live Website
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              No complicated tech steps. Here is how easy the process is when you work directly with me:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item, idx) => (
              <div 
                key={idx}
                className="relative rounded-xl bg-zinc-900/30 border border-white/[0.08] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mb-4">{item.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <span>Phase {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ESTIMATOR SECTION */}
        <section id="calculator" className="py-20 sm:py-28 bg-zinc-950/70 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Step 4 · Instant Transparency</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Project Cost &amp; Scope Estimator
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Calculate an estimated investment for your website before we even get on a call. All prices in Indian Rupees (INR).
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xl">
              
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2.5">
                    1. Choose Website Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'landing', label: 'Single Landing Page', tag: 'From ₹7,999' },
                      { id: 'full-site', label: 'Full Business Website', tag: 'From ₹14,999' },
                      { id: 'redesign', label: 'Website Redesign', tag: 'From ₹11,999' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedServiceType(type.id)}
                        className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                          selectedServiceType === type.id
                            ? 'bg-white text-zinc-950 border-white shadow'
                            : 'bg-zinc-800/60 text-zinc-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div>{type.label}</div>
                        <div className={`text-[10px] mt-0.5 ${selectedServiceType === type.id ? 'text-zinc-700' : 'text-zinc-400'}`}>
                          {type.tag}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="page-count-slider" className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                      2. Estimated Total Pages
                    </label>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{pageCount} {pageCount === 1 ? 'Page' : 'Pages'}</span>
                  </div>
                  <input 
                    id="page-count-slider"
                    type="range" 
                    min="1" 
                    max="8" 
                    aria-label="Estimated Page Count"
                    value={pageCount} 
                    onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                    <span>1 (Single Page)</span>
                    <span>4 Pages (Standard)</span>
                    <span>8 Pages (Large)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2.5">
                    3. Recommended Business Features
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-800/40 border border-white/5 cursor-pointer hover:bg-zinc-800/60 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={includeSeo} 
                        onChange={(e) => setIncludeSeo(e.target.checked)} 
                        className="rounded border-zinc-700 text-cyan-500 focus:ring-cyan-500 accent-cyan-400 w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-medium text-white">Local Google SEO Setup (+₹2,500)</div>
                        <div className="text-[10px] text-zinc-400">Helps locals find you on Google Search</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-800/40 border border-white/5 cursor-pointer hover:bg-zinc-800/60 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={includeSpeed} 
                        onChange={(e) => setIncludeSpeed(e.target.checked)} 
                        className="rounded border-zinc-700 text-cyan-500 focus:ring-cyan-500 accent-cyan-400 w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-medium text-white">Sub-1s Speed Guarantee (+₹1,800)</div>
                        <div className="text-[10px] text-zinc-400">Lightning quick on all mobile phones</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2.5">
                    4. Delivery Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTimelineUrgency('standard')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                        timelineUrgency === 'standard'
                          ? 'bg-zinc-800 text-white border-cyan-400/60'
                          : 'bg-zinc-900/50 text-zinc-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="font-semibold text-zinc-200">Standard Delivery</div>
                      <div className="text-[10px] text-zinc-400">7–14 Business Days</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTimelineUrgency('express')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                        timelineUrgency === 'express'
                          ? 'bg-zinc-800 text-white border-cyan-400/60'
                          : 'bg-zinc-900/50 text-zinc-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="font-semibold text-zinc-200">Express Priority (+25%)</div>
                      <div className="text-[10px] text-zinc-400">3–6 Days Accelerated</div>
                    </button>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-5 rounded-xl bg-zinc-950/80 border border-white/10 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">Estimated Investment</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white">
                      ₹{estimatedEstimate.min} – ₹{estimatedEstimate.max}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">INR</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    *Estimated starting range. Every package includes full code handoff, mobile responsiveness, and 14 days of free post-launch adjustments.
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Package:</span>
                      <span className="text-zinc-200 font-medium capitalize">{selectedServiceType.replace('-', ' ')} ({pageCount} pgs)</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Google Local SEO:</span>
                      <span className="text-zinc-200">{includeSeo ? 'Included' : 'Not added'}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Sub-1s Speed Audit:</span>
                      <span className="text-zinc-200">{includeSpeed ? 'Included' : 'Standard'}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Timeline:</span>
                      <span className="text-zinc-200">{timelineUrgency === 'express' ? 'Express (3–6 Days)' : 'Standard (7–14 Days)'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleLockEstimate}
                    className="w-full py-3 rounded-lg bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow cursor-pointer active:scale-98"
                  >
                    Lock in This Estimate
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* WHY WORK WITH ME */}
        <section id="why-me" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">The Difference</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Why Business Owners Work With Me
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Big agencies charge huge markups for slow communication. Generic freelance marketplaces often deliver broken templates. Here is my approach:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_WORK_WITH_ME.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-zinc-900/40 border border-white/[0.08] p-7 flex gap-5 hover:border-white/20 transition-all"
                >
                  <div className="p-3 rounded-lg bg-zinc-800 text-cyan-400 shrink-0 h-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ABOUT VIBHOR VERMA */}
        <section id="about" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800/80 via-zinc-900/60 to-zinc-950 p-1 border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-7 space-y-6 bg-[#0B0C12]/90 rounded-[14px]">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                      <span className="text-xs font-mono text-zinc-300 font-semibold tracking-wide">STUDIO IDENTITY</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                      B.Tech CSE (AI/ML)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Vibhor Verma</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Freelance Web Developer &amp; Computer Science student specializing in AI &amp; Machine Learning.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Modern Engineering Workflow</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        I write hand-crafted React and Next.js code using Claude as a coding assistant, delivering high-end websites in days instead of months.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Honest Collaboration</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        No fake claims or false awards. Just high-quality code, honest timelines, and prompt communication.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                    {['React', 'Next.js', 'Tailwind CSS', 'Mobile First', 'Fast Load', 'Google Local SEO'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">About Me</div>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Combining technical computer science rigor with real-world business utility.
              </h2>

              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                <p>
                  I am a B.Tech Computer Science Engineering student specializing in AI &amp; Machine Learning. While many students focus exclusively on theoretical coursework, I enjoy putting my skills to work helping real businesses grow through high-performance digital design.
                </p>
                
                <p>
                  I do not build slow, bloated drag-and-drop WordPress sites. I hand-code websites using modern technologies like React and Tailwind CSS, leveraging Claude to accelerate code generation, automate testing, and ensure rapid delivery.
                </p>

                <p>
                  Whether you run a popular cafe, a bustling salon, a fitness club, or a professional firm, my mission is to deliver a website that you are genuinely proud of—one that makes booking, reserving, or contacting your business seamless.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs">
                <div>
                  <div className="font-mono text-cyan-400 font-bold text-sm mb-1">01 / Direct Chat</div>
                  <p className="text-zinc-400 text-[11px] leading-snug">Speak directly with me on phone or WhatsApp throughout the project.</p>
                </div>
                <div>
                  <div className="font-mono text-cyan-400 font-bold text-sm mb-1">02 / Fast Delivery</div>
                  <p className="text-zinc-400 text-[11px] leading-snug">Websites delivered and launched in 7 to 14 days on average.</p>
                </div>
                <div>
                  <div className="font-mono text-cyan-400 font-bold text-sm mb-1">03 / 100% Yours</div>
                  <p className="text-zinc-400 text-[11px] leading-snug">Full code and domain ownership handed to you on completion.</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Common Questions</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Straightforward answers to the most common questions business owners ask before starting.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 bg-zinc-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Step 5 · Let's Connect</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Let’s Build a Website That Helps Your Business Grow.
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Whether you need a fresh website for your cafe, salon, or clinic, or want to revamp an old slow site, reach out directly. I respond personally within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-zinc-800 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-mono">Email Address</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">vibhorverma.dev@gmail.com</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                    aria-label="Copy Email Address"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href="https://wa.me/?text=Hi%20Vibhor,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-400/50 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-400 font-mono font-medium">Quickest Way to Chat</div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Chat Directly on WhatsApp</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </a>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200/90 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Prefer a quick phone call? Submit the form with your phone number and preferred time, and I will call you directly.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-zinc-900/40 border border-white/10 p-6 sm:p-8 shadow-xl">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                      Thank you for sharing your project details. I will review your business needs and reply personally within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-client-name" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="form-client-name"
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({...contactData, name: e.target.value})}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-client-phone" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="form-client-phone"
                          type="tel"
                          required
                          value={contactData.phone}
                          onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-client-email" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="form-client-email"
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({...contactData, email: e.target.value})}
                          placeholder="rahul@mybusiness.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-business-type" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                          Type of Business
                        </label>
                        <input
                          id="form-business-type"
                          type="text"
                          value={contactData.businessType}
                          onChange={(e) => setContactData({...contactData, businessType: e.target.value})}
                          placeholder="e.g. Cafe, Salon, Gym, Clinic"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-budget-range" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                        Approximate Budget (INR)
                      </label>
                      <select
                        id="form-budget-range"
                        value={contactData.budgetRange}
                        onChange={(e) => setContactData({...contactData, budgetRange: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="₹7,999 – ₹12,000">₹7,999 – ₹12,000 (Landing Page / Starter)</option>
                        <option value="₹12,000 – ₹20,000">₹12,000 – ₹20,000 (Multi-Page Business Site)</option>
                        <option value="₹20,000 – ₹35,000">₹20,000 – ₹35,000 (Custom Architecture / Redesign)</option>
                        <option value="₹35,000+">₹35,000+ (Extensive Business Requirement)</option>
                        <option value="Not sure yet, let's discuss">Not sure yet — let's discuss on call</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="form-message-body" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                        Tell Me About What You Need *
                      </label>
                      <textarea
                        id="form-message-body"
                        required
                        rows={3}
                        value={contactData.message}
                        onChange={(e) => setContactData({...contactData, message: e.target.value})}
                        placeholder="Tell me briefly about your business, if you already have a website, and any specific goals you have."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Project Inquiry
                    </button>
                    
                    <p className="text-[11px] text-zinc-400 text-center">
                      Zero spam. Your inquiry goes straight to Vibhor Verma's personal inbox.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Quick Contact Sticky Bar on Mobile */}
        <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-white/10 bg-[#090A0F]/90 backdrop-blur-lg px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono text-zinc-300">Open for new projects</span>
          </div>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-bold shadow flex items-center gap-1.5"
          >
            Start Project
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* QUICK PREVIEW MODAL */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#0D0E14] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-5 py-4 border-b border-white/10 bg-zinc-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-white/5">
                  {activeModalProject.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                  {activeModalProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-zinc-950 rounded-lg p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    aria-label="Switch to desktop view"
                    className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer ${
                      previewDevice === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    aria-label="Switch to mobile view"
                    className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer ${
                      previewDevice === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Mobile Viewport (390px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  aria-label="Close Project Modal"
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto bg-zinc-950 flex flex-col items-center">
              <div 
                className={`transition-all duration-300 border border-white/10 rounded-xl overflow-hidden bg-[#0A0B10] shadow-inner ${
                  previewDevice === 'mobile' ? 'w-[340px] max-w-full' : 'w-full'
                }`}
              >
                <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="truncate max-w-[180px] text-zinc-400">preview.{activeModalProject.id}.local</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">99.8% Speed</span>
                </div>

                <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="space-y-3">
                    <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5 uppercase">
                      Sample Business Interface
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {activeModalProject.previewContent?.heroHeadline}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                      {activeModalProject.previewContent?.heroSub}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">Featured Offerings &amp; Pricing</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeModalProject.previewContent?.menuItems?.map((item, i) => (
                        <div key={i} className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5">
                          <div className="flex justify-between items-start text-xs font-semibold text-white mb-1">
                            <span>{item.name}</span>
                            <span className="font-mono text-cyan-400">{item.price}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400">{item.notes}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                    {activeModalProject.previewContent?.stats?.map((stat, i) => (
                      <div key={i}>
                        <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">{stat.val}</div>
                        <div className="text-[10px] text-zinc-400 leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-[11px] text-zinc-400">
                      Target Outcome: <strong className="text-zinc-200">{activeModalProject.metric}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateDemo(activeModalProject.route)}
                      className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Full Screen Website &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-zinc-400">
                Want a custom website like this built for your business?
              </span>
              <a
                href="#contact"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors"
              >
                Inquire About a Custom Build &rarr;
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#07080C] text-zinc-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <div className="w-6 h-6 rounded bg-zinc-800 border border-white/10 flex items-center justify-center font-mono text-xs">
                  VV
                </div>
                <span>Vibhor Verma &middot; Freelance Web Developer</span>
              </div>
              <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
                Clean, modern websites built for businesses that want more walk-ins, phone inquiries, and bookings. Powered by modern web frameworks and AI-assisted speed.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-mono uppercase tracking-wider text-[11px]">Direct Channels</div>
              <ul className="space-y-1.5 text-zinc-400">
                <li>
                  <button 
                    type="button" 
                    onClick={handleCopyEmail}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>vibhorverma.dev@gmail.com</span>
                    <Copy className="w-3 h-3 text-zinc-400" />
                  </button>
                </li>
                <li>
                  <a href="https://wa.me/?text=Hello%20Vibhor" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp Chat
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    GitHub Profile
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    LinkedIn Network
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-mono uppercase tracking-wider text-[11px]">Transparency Note</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                No fake metrics. No made-up awards. Just honest communication, hand-crafted code, and clear pricing in INR.
              </p>
              <div className="text-[10px] font-mono text-zinc-400 pt-1">
                Local Time: {currentTime || 'Loading IST...'}
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <div>
              &copy; {new Date().getFullYear()} Vibhor Verma. All rights reserved.
            </div>
            <a 
              href="#hero" 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Back to top &uarr;
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}