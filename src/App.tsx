import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  MessageSquare,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  Coffee,
  Dumbbell,
  Scissors,
  Eye,
  ExternalLink,
  Send,
  Building,
  User,
  Phone,
  Briefcase,
  Clock
} from 'lucide-react';

import CafeDemo from './demos/CafeDemo';
import SalonDemo from './demos/SalonDemo';
import GymDemo from './demos/GymDemo';
import { DEMO_URLS } from './config/demoUrls';

// ==========================================
// CONFIGURATION
// ==========================================
const WHATSAPP_PHONE_NUMBER = '918650805090';
const CONTACT_EMAIL = 'vibhu132810@gmail.com';
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzLOrj2ZkueGbv3Fr0APReLcwa-MLjDfIp8Lse19AA9XBUgtwZYYoWhGqhx3PiDtww/exec';

interface FaqItem {
  q: string;
  a: string;
}

interface ProjectItem {
  id: string;
  route: string;
  liveUrl: string;
  category: string;
  title: string;
  tagline: string;
  color: string;
  borderColor: string;
  glowColor: string;
  accentBg: string;
  icon: React.ElementType;
  conversionFocus: string;
  tags: string[];
  features: string[];
}

interface PackageOption {
  id: string;
  name: string;
  price: string;
  deliveryTime: string;
  summary: string;
}

const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: 'starter',
    name: 'Starter Single-Page',
    price: '₹7,999',
    deliveryTime: '3 to 5 business days',
    summary: 'Single-page scroll layout, mobile responsive, click-to-call/WhatsApp integration.'
  },
  {
    id: 'business',
    name: 'Complete Business Suite',
    price: '₹14,999',
    deliveryTime: '7 to 9 business days',
    summary: 'Up to 5 custom sections/pages, dynamic menus/timetables, reservation/booking modal.'
  },
  {
    id: 'custom',
    name: 'Custom Web Application',
    price: '₹24,999+',
    deliveryTime: '1 to 2 weeks',
    summary: 'Full-stack React/Next.js backend, database setup, authentication, and custom logic.'
  }
];

const FAQS: FaqItem[] = [
  {
    q: "Do I completely own my website once it's done?",
    a: "Yes, 100%. All design files, website source code, and domain accounts belong completely to you. There are zero hidden monthly lock-ins, licenses, or surprise fees."
  },
  {
    q: "How does your AI-assisted development benefit my business?",
    a: "I hand-code your website using modern web tech (React/Next.js) and use AI tools behind the scenes to write boilerplate code, test, and debug. This means you get a high-performance custom website in days instead of weeks, at a fraction of agency rates."
  },
  {
    q: "Can I manage or edit menu items, prices, and text myself?",
    a: "Absolutely. I can integrate an intuitive visual editor or headless dashboard where you or your staff can change prices, update announcements, and edit images without coding."
  },
  {
    q: "What ongoing support do you offer after launch?",
    a: "Every project comes with 30 days of complimentary post-launch support and bug fixes. After that, I provide an optional ₹1,499/month care retainer for routine updates, backups, and security monitoring."
  },
  {
    q: "How quickly can we launch?",
    a: "The Starter Single-Page package ships in just 3 to 5 business days once content and brand assets are finalized. Multi-page builds typically take 7 to 10 days."
  }
];

const CONCEPT_PROJECTS: ProjectItem[] = [
  {
    id: 'cafe',
    route: '/demos/cafe',
    liveUrl: DEMO_URLS.cafe,
    category: 'Cafe / Restaurant',
    title: 'Ember & Bean Specialty Roastery',
    tagline: 'Warm, artisanal cafe experience engineered for quick table reservations and mobile menu viewing.',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    accentBg: 'bg-amber-400 text-zinc-950',
    icon: Coffee,
    conversionFocus: 'Table Booking & PDF/Live Menu Access',
    tags: ['Artisanal Roastery', 'Live Menu Filters', 'Table Reservation Sheet'],
    features: [
      'Interactive roast-level filter for specialty single-origins',
      'Table reservation workflow with instant WhatsApp alert',
      'High-speed mobile layout built for 3G/4G connectivity'
    ]
  },
  {
    id: 'salon',
    route: '/demos/salon',
    liveUrl: DEMO_URLS.salon,
    category: 'Salon & Spa',
    title: 'Atelier V Boutique Hair Lounge',
    tagline: 'Minimalist editorial aesthetics with frictionless service appointment booking and price transparency.',
    color: 'from-rose-500/20 to-purple-500/10',
    borderColor: 'border-rose-500/30 hover:border-rose-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    accentBg: 'bg-rose-400 text-zinc-950',
    icon: Scissors,
    conversionFocus: 'Chair Appointment & Treatment Selection',
    tags: ['Editorial Aesthetic', 'Stylist Selector', 'Service Duration Cards'],
    features: [
      'Service duration & pricing breakdown with zero hidden fees',
      'Frictionless chair booking form linked to salon WhatsApp',
      'High-contrast visual gallery for haircut & balayage showcases'
    ]
  },
  {
    id: 'gym',
    route: '/demos/gym',
    liveUrl: DEMO_URLS.gym,
    category: 'Gym & Fitness',
    title: 'Pulse Athletics & Conditioning Club',
    tagline: 'High-energy, bold athletic brand designed to turn local visitors into trial pass signups.',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    accentBg: 'bg-cyan-400 text-zinc-950',
    icon: Dumbbell,
    conversionFocus: 'Free Trial Pass & Membership Sales',
    tags: ['High-Tempo UI', 'Class Timetable', 'Trial Pass Modal'],
    features: [
      'One-tap Day Pass reservation with SMS/WhatsApp confirmation',
      'Dynamic class schedule filterable by coach & intensity',
      'Membership tier cards with upfront monthly/annual toggle'
    ]
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || window.location.hash.replace('#', '') || '/');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Selected package tracking
  const [selectedPackageId, setSelectedPackageId] = useState<string>('business');

  // User Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: 'Cafe / Restaurant',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const currentPackage = PACKAGE_OPTIONS.find((pkg) => pkg.id === selectedPackageId) || PACKAGE_OPTIONS[1];

  // Direct WhatsApp Message Generators
  const getGeneralWhatsAppUrl = () => {
    const text = encodeURIComponent("Hi Vibhor, I saw your portfolio and would like to discuss building a website for my business.");
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${text}`;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      businessName: formData.businessName,
      businessType: formData.businessType,
      phone: formData.phone,
      package: `${currentPackage.name} (${currentPackage.price}) - ${currentPackage.deliveryTime}`,
      message: formData.message
    };

    // 1. Post data to Google Sheets via Webhook
    try {
      if (GOOGLE_SHEET_WEBHOOK_URL) {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.error('Failed to log to Google Sheets', err);
    }

    // 2. Prepare WhatsApp text
    const inquiryText = encodeURIComponent(
      `*New Project Inquiry via Portfolio*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Business:* ${formData.businessName || 'N/A'}\n` +
      `*Category:* ${formData.businessType}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Selected Package:* ${currentPackage.name} (${currentPackage.price})\n` +
      `*Est. Delivery Timeline:* ${currentPackage.deliveryTime}\n` +
      `*Project Scope/Details:* ${formData.message || 'Looking for initial consultation.'}`
    );

    // 3. Open WhatsApp and update UI state
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${inquiryText}`, '_blank');
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  if (currentPath === '/demos/cafe' || currentPath.endsWith('#/demos/cafe')) {
    return <CafeDemo />;
  }
  if (currentPath === '/demos/salon' || currentPath.endsWith('#/demos/salon')) {
    return <SalonDemo />;
  }
  if (currentPath === '/demos/gym' || currentPath.endsWith('#/demos/gym')) {
    return <GymDemo />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 antialiased">
      
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-inner group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">Vibhor Verma</span>
              <span className="font-mono text-[10px] text-zinc-400 block -mt-1">Modern Web Developer</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a href="#demos" className="hover:text-cyan-400 transition-colors">Client Demos</a>
            <a href="#quote" className="hover:text-cyan-400 transition-colors">Get Instant Quote</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Packages</a>
            <a href="#faqs" className="hover:text-cyan-400 transition-colors">FAQs</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
            <a
              href="#quote"
              className="px-4 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
            >
              Start Project
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0e0e12] px-4 py-5 space-y-3">
            <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono uppercase text-zinc-300 hover:text-cyan-400">Client Demos</a>
            <a href="#quote" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono uppercase text-zinc-300 hover:text-cyan-400">Get Instant Quote</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono uppercase text-zinc-300 hover:text-cyan-400">Packages</a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-mono uppercase text-zinc-300 hover:text-cyan-400">FAQs</a>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-xs font-mono font-bold text-emerald-400"
            >
              Open Direct WhatsApp Chat &rarr;
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Freelance Contracts &middot; Greater Noida &amp; Remote</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Custom, high-conversion websites for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">ambitious local businesses.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              I design and code bespoke digital storefronts for salons, fitness studios, cafes, and service brands. High-speed, mobile-first, and engineered to turn traffic into bookings.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#demos"
                className="px-6 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                <span>Explore Live Demos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-lg sm:text-xl font-bold text-white block">3 to 5 Days</span>
                <span className="text-zinc-400">Average Turnaround</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white block">100% Owned</span>
                <span className="text-zinc-400">No Monthly Lock-in</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white block">₹7,999</span>
                <span className="text-zinc-400">Starter Packages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT PROJECTS (THE 3 DEMOS) */}
      <section id="demos" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Proof of Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Interactive Client Concept Demos
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Fully functional, standalone business websites deployed separately on Vercel. Test them live or inspect their architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CONCEPT_PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`group rounded-3xl bg-zinc-900/60 border ${project.borderColor} transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${project.glowColor}`}
              >
                <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{project.category}</span>
                    <div className="w-9 h-9 rounded-xl bg-zinc-800/90 border border-white/10 flex items-center justify-center text-zinc-200">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">Key Capabilities:</div>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                      {project.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 py-4 bg-zinc-950/80 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live Demo
                  </a>

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
      </section>

      {/* QUICK PEEK MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{activeModalProject.category}</span>
              <h3 className="text-xl font-bold text-white mt-1">{activeModalProject.title}</h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {activeModalProject.tagline}
            </p>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-2 text-xs">
              <span className="font-mono text-zinc-400 block font-semibold">Primary Conversion Goal:</span>
              <span className="text-emerald-400 font-bold">{activeModalProject.conversionFocus}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={activeModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Live Vercel Deployment &rarr;
              </a>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-mono hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER INQUIRY & GOOGLE SHEETS FORM */}
      <section id="quote" className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">Start Your Project</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Request an Instant Proposal</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Choose your preferred package to see real-time delivery turnaround. Submitting logs your details directly into our management sheet and opens WhatsApp.
          </p>
        </div>

        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          {formSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Recorded! Opening WhatsApp Chat...</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your request has been logged. If WhatsApp didn't launch automatically in a new window, tap below:
              </p>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Open WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              
              {/* Package Selection with Dynamic Turnaround Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono text-zinc-400 font-semibold">Select Your Package</label>
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Est. Turnaround: <strong className="text-white font-bold">{currentPackage.deliveryTime}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PACKAGE_OPTIONS.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-lg shadow-cyan-500/10'
                            : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-xs text-zinc-200">{pkg.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-cyan-300 font-mono">{pkg.price}</div>
                          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                            <Clock className="w-3 h-3" />
                            {pkg.deliveryTime}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Package Banner */}
                <div className="mt-3 p-3 rounded-xl bg-zinc-950/90 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200 font-semibold">{currentPackage.name}:</span>
                    <span className="text-zinc-400 font-light">{currentPackage.summary}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold whitespace-nowrap ml-3">
                    🚀 Ships in {currentPackage.deliveryTime}
                  </span>
                </div>
              </div>

              {/* Name & Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Business Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Royal Cafe / Studio V"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Niche & Contact Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Business Type / Niche</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Cafe / Restaurant">Cafe / Restaurant / Bakery</option>
                      <option value="Salon & Spa">Salon / Spa / Barbershop</option>
                      <option value="Gym & Fitness">Gym / CrossFit / Yoga Studio</option>
                      <option value="Healthcare / Clinic">Healthcare / Clinic / Doctor</option>
                      <option value="Real Estate / Architecture">Real Estate / Interior Design</option>
                      <option value="Other Service Business">Other Service Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">WhatsApp or Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="+91 8650805090"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">Tell Me About Your Goals (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Need online ordering, table reservations, appointment bookings, or a modern rebrand..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Logging to Sheet & Connecting...' : `Submit & Chat on WhatsApp`}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* PRICING PACKAGES */}
      <section id="pricing" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">Transparent Investment</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Fixed Pricing &middot; Zero Surprises</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            No recurring website rental fees. You own your code, domain, and assets entirely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter */}
          <div className="p-7 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Starter Single-Page</span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 3–5 Days
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">₹7,999</h3>
              <p className="text-xs text-zinc-400 mt-2 font-light">Ideal for new cafes, barbershops, and independent consultants needing a sleek digital presence.</p>
              
              <ul className="space-y-2.5 pt-6 border-t border-white/5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Single-page scroll layout</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Mobile &amp; tablet responsive</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> WhatsApp &amp; phone click-to-call</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Basic Google Maps &amp; SEO setup</li>
                <li className="flex items-center gap-2 font-mono text-emerald-400"><Clock className="w-3.5 h-3.5 shrink-0" /> Turnaround: 3 to 5 business days</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedPackageId('starter');
                const el = document.getElementById('quote');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-wider text-center block transition-colors cursor-pointer"
            >
              Choose Starter
            </button>
          </div>

          {/* Business Suite */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-zinc-900 to-zinc-900 border-2 border-cyan-500 flex flex-col justify-between space-y-6 relative shadow-xl shadow-cyan-500/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Complete Business Suite</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 7–10 Days
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">₹14,999</h3>
              <p className="text-xs text-zinc-400 mt-2 font-light">For established salons, gyms, and restaurants looking to drive direct inquiries and bookings.</p>
              
              <ul className="space-y-2.5 pt-6 border-t border-white/5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Up to 5 custom pages / sections</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Interactive booking/reservation modal</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Dynamic service menu / timetable</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Full Google Search Console verification</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 30 days free post-launch support</li>
                <li className="flex items-center gap-2 font-mono text-cyan-300"><Clock className="w-3.5 h-3.5 shrink-0" /> Turnaround: 7 to 10 business days</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedPackageId('business');
                const el = document.getElementById('quote');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider text-center block transition-colors cursor-pointer"
            >
              Choose Business Suite
            </button>
          </div>

          {/* Custom Web App */}
          <div className="p-7 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Custom Web Application</span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-[11px] font-mono text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 2–3 Weeks
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">₹24,999+</h3>
              <p className="text-xs text-zinc-400 mt-2 font-light">Bespoke portals with database integration, member dashboards, and custom business logic.</p>
              
              <ul className="space-y-2.5 pt-6 border-t border-white/5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Next.js / React full-stack backend</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Database &amp; authentication setup</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Payment gateway integration (Razorpay)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Custom administrative controls</li>
                <li className="flex items-center gap-2 font-mono text-amber-400"><Clock className="w-3.5 h-3.5 shrink-0" /> Turnaround: 2 to 3 weeks</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedPackageId('custom');
                const el = document.getElementById('quote');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-wider text-center block transition-colors cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>

        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">Clarity &amp; Questions</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-semibold text-sm text-zinc-200">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed font-light border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / HIRE SECTION */}
      <section id="contact" className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 text-center space-y-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">Ready to Elevate Your Business?</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Let's Build Your Website.</h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto font-light leading-relaxed">
            Message me with your business type or vision, and I'll send you a free mock concept and exact quote within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/10"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span>{copiedEmail ? 'Email Copied!' : CONTACT_EMAIL}</span>
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#070709] py-8 text-xs font-mono text-zinc-400 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Vibhor Verma &middot; Freelance Web Developer. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}