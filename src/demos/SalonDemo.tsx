import React, { useState, useId, useMemo } from 'react';
import {
  Scissors,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Compass,
  MessageCircle,
  Award,
  Check,
  Menu,
  X,
  Sparkles,
  Heart
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'beauty' | 'grooming';
  duration: string;
  price: string;
  tag?: string;
  desc: string;
}

interface StylistItem {
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  initials: string;
}

const SERVICES_DATA: ServiceItem[] = [
  // Hair Category
  {
    id: 's1',
    name: 'Precision Scissor Haircut & Blowout',
    category: 'hair',
    duration: '45 mins',
    price: '₹799',
    tag: 'Signature',
    desc: 'Bespoke structural cut tailored to your facial silhouette, finished with a botanical rinse and heat-shielded round-brush blow-dry.'
  },
  {
    id: 's2',
    name: 'French Balayage & Glaze Melt',
    category: 'hair',
    duration: '120 mins',
    price: '₹4,499',
    tag: 'Popular',
    desc: 'Freehand dimensional micro-painting with seamless roots, paired with an acidic bond-restoring gloss for high-mirror radiance.'
  },
  {
    id: 's3',
    name: 'Organic Amino Acid Smoothing Ritual',
    category: 'hair',
    duration: '90 mins',
    price: '₹3,499',
    desc: '100% formaldehyde-free restorative keratin formulation that seals porous hair cuticles, eliminating humidity frizz for up to 10 weeks.'
  },
  {
    id: 's4',
    name: 'Botanical Scalp Detox & Hydration Spa',
    category: 'hair',
    duration: '50 mins',
    price: '₹1,499',
    desc: 'Exfoliating rosemary scalp massage, volcanic clay mask, and infrared steam infusion to stimulate dormant folicles.'
  },

  // Beauty Category
  {
    id: 'b1',
    name: 'Luminescence Cryo-Glow Facial',
    category: 'beauty',
    duration: '60 mins',
    price: '₹2,199',
    tag: 'Radiance',
    desc: 'Deep ultrasonic pore cleansing, lymphatic ice-globe massage, and concentrated hyaluronic acid infusion for glass skin hydration.'
  },
  {
    id: 'b2',
    name: 'Express Herbal Cleanup',
    category: 'beauty',
    duration: '35 mins',
    price: '₹999',
    desc: 'Steam extraction, gentle AHA fruit-enzyme peel, and cold calming chamomile compresses for an instant midday reset.'
  },
  {
    id: 'b3',
    name: 'Rose Quartz Spa Pedicure & Polish',
    category: 'beauty',
    duration: '50 mins',
    price: '₹1,199',
    desc: 'Warm Himalayan pink salt soak, sweet almond callus softening scrub, warm paraffin wax boot, and long-wear tonal lacquer.'
  },
  {
    id: 'b4',
    name: 'Elysian Manicure & Cuticle Treatment',
    category: 'beauty',
    duration: '40 mins',
    price: '₹899',
    desc: 'Nail shaping, gentle Russian cuticle therapy, organic jojoba hand massage, and breathable high-shine conditioning coat.'
  },

  // Grooming Category
  {
    id: 'g1',
    name: 'Master Beard Sculpt & Hot Towel Shave',
    category: 'grooming',
    duration: '35 mins',
    price: '₹649',
    tag: 'Grooming',
    desc: 'Straight razor line definition, sandalwood essential oil steam compress, and cold aloe recovery lotion.'
  },
  {
    id: 'g2',
    name: 'Gentleman’s Complete Executive Cut & Beard',
    category: 'grooming',
    duration: '65 mins',
    price: '₹1,299',
    tag: 'Best Value',
    desc: 'Tailored hair fade, beard contouring, invigorating botanical scalp scrub, and chilled pore-refining mist.'
  }
];

const PACKAGES = [
  {
    name: 'Signature Refresh',
    tier: 'Essential Care',
    price: '₹1,499',
    desc: 'Designed for effortless regular upkeep, revitalizing texture and shine.',
    includes: [
      'Precision Scissor Haircut & Organic Wash',
      'Hydrating Scalp Steam & Quick Massage',
      'Blowout with Thermal Heat Styling',
      'Complimentary Beverage & Consultation'
    ],
    highlight: false
  },
  {
    name: 'The Atelier Luxe',
    tier: 'Most Requested',
    price: '₹2,699',
    desc: 'A complete head-to-toe beauty retreat for total rejuvenation.',
    includes: [
      'Restyle Haircut & Customized Blow-dry',
      'Express Vitamin C Glow Facial (40 min)',
      'Elysian Warm Polish Manicure',
      'Botanical Scalp Elixir & Deep Rinse',
      'Priority Weekend Chair Reservation'
    ],
    highlight: true
  },
  {
    name: 'Grand Couturier',
    tier: 'Occasion & Bridal',
    price: '₹4,999',
    desc: 'The pinnacle studio experience for weddings, galas, and milestone celebrations.',
    includes: [
      'Full Dimensional Color / Balayage Touch-up',
      'Luminescence Cryo-Glow Facial (60 min)',
      'Rose Quartz Spa Pedicure & Manicure',
      'Intensive Keratin Bond Repair Treatment',
      'Private Suite Access with Stylist'
    ],
    highlight: false
  }
];

const STYLISTS: StylistItem[] = [
  {
    name: 'Aarav Mehta',
    role: 'Creative Director & Colorist',
    experience: 'Sample Profile · 9+ Yrs Studio Practice',
    specialty: 'Editorial Balayage, Micro-Highlights & Bobs',
    bio: 'Dedicated to low-maintenance, grow-out friendly color that complements natural undertones without damaging follicle integrity.',
    initials: 'AM'
  },
  {
    name: 'Mira Kapoor',
    role: 'Senior Esthetician & Skin Specialist',
    experience: 'Sample Profile · 7+ Yrs Clinical Experience',
    specialty: 'Cryo-Glow Therapy & Barrier Repair',
    bio: 'Focused on holistic dermis recovery, anti-pollution facials, and personalized at-home skincare regimens.',
    initials: 'MK'
  },
  {
    name: 'Rohan Malhotra',
    role: 'Master Barber & Mens Stylist',
    experience: 'Sample Profile · 8+ Yrs Classical Grooming',
    specialty: 'Precision Scissor Fades & Beard Sculpting',
    bio: 'Blends classic straight-razor craftsmanship with modern, textured silhouettes and ergonomic hair shaping.',
    initials: 'RM'
  }
];

export default function SalonDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'beauty' | 'grooming'>('all');

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedService, setSelectedService] = useState('Precision Scissor Haircut & Blowout');
  const [selectedStylist, setSelectedStylist] = useState('First Available Master Stylist');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:30 AM');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceId = useId();
  const stylistId = useId();
  const dateId = useId();
  const timeId = useId();
  const noteId = useId();

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return SERVICES_DATA;
    return SERVICES_DATA.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (clientPhone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for appointment confirmation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setClientName('');
        setClientPhone('');
        setClientEmail('');
        setSpecialNote('');
      }, 7000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#0B0A0E] text-[#F3EFE9] font-sans antialiased selection:bg-[#E0B09A]/30 selection:text-[#F8E7E0] pb-20 sm:pb-0">
      
      {/* 1. CONCEPT DEMO TOP BANNER */}
      <aside aria-label="Demo notice" className="bg-[#141219] border-b border-[#E0B09A]/20 px-4 py-2.5 text-xs text-[#E0B09A] z-50 sticky top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#E0B09A]/20 text-[#F5C9B5] font-mono text-[10px] uppercase font-bold border border-[#E0B09A]/30 shrink-0">
              Concept Demo
            </span>
            <span className="text-[11px] sm:text-xs text-[#E8D9CE]">
              Sample luxury salon &amp; beauty atelier website built by Vibhor Verma for salon, hair studio &amp; spa owners.
            </span>
          </div>
          <a
            href="/"
            className="text-white hover:text-[#E0B09A] flex items-center gap-1.5 font-semibold text-xs transition-colors shrink-0 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Vibhor's Portfolio
          </a>
        </div>
      </aside>

      {/* 2. STICKY EDITORIAL NAVIGATION */}
      <header className="border-b border-white/[0.07] bg-[#0E0D12]/90 backdrop-blur-xl sticky top-[41px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Mark */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0B09A]/30 to-[#191522] border border-[#E0B09A]/40 flex items-center justify-center text-[#E0B09A] shadow-inner">
              <Scissors className="w-4 h-4 stroke-[1.8]" />
            </div>
            <div>
              <span className="text-xl font-serif tracking-[0.15em] text-white block uppercase leading-none">
                ÉLAN
              </span>
              <span className="text-[9px] font-mono text-[#E0B09A] tracking-[0.25em] uppercase block mt-1">
                Hair &middot; Beauty &middot; Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-300">
            <a href="#services" className="hover:text-[#E0B09A] transition-colors">Services</a>
            <a href="#packages" className="hover:text-[#E0B09A] transition-colors">Packages</a>
            <a href="#about" className="hover:text-[#E0B09A] transition-colors">Our Atelier</a>
            <a href="#team" className="hover:text-[#E0B09A] transition-colors">Stylists</a>
            <a href="#gallery" className="hover:text-[#E0B09A] transition-colors">Lookbook</a>
            <a href="#location" className="hover:text-[#E0B09A] transition-colors">Location</a>
          </nav>

          {/* Nav Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181620] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E0B09A]" />
              <span>+91 98765 43210</span>
            </a>
            <a
              href="#book"
              className="px-5 py-2.5 rounded-full bg-[#E0B09A] hover:bg-[#D49E87] text-zinc-950 font-serif tracking-wider font-bold text-xs uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg bg-[#181620] border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#100F15] px-4 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">Services</a>
              <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">Packages</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">About Studio</a>
              <a href="#team" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">Stylists</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">Lookbook</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#181620] hover:bg-zinc-800">Hours &amp; Map</a>
              <a href="#book" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-[#E0B09A] text-zinc-950 font-bold col-span-2 text-center font-serif">Reserve Chair</a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="hero" className="relative pt-14 pb-20 sm:pt-24 sm:pb-32 overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#13111A] via-[#0D0B12] to-[#0B0A0E]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[360px] bg-[#E0B09A]/[0.07] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            
            {/* Live Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181620]/90 border border-[#E0B09A]/30 text-xs font-mono text-[#E0B09A]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Welcoming Guests Today &middot; 10:00 AM &ndash; 08:00 PM &middot; Sector 62</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-[1.1]">
              Your natural silhouette, <span className="italic font-normal text-[#F2C4B1]">refined with deliberate art.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300/90 max-w-2xl leading-relaxed font-light">
              Bespoke haircuts, French hand-painted balayage, and restorative botanical scalp rituals inside a serene, private sanctuary designed for quiet comfort.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <a
                href="#book"
                className="px-7 py-4 rounded-full bg-[#E0B09A] hover:bg-[#D49E87] text-zinc-950 font-serif font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E0B09A]/10 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Book Your Appointment
              </a>
              <a
                href="#services"
                className="px-6 py-4 rounded-full bg-[#171520] hover:bg-[#201D2C] border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>View Treatment Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E0B09A]" />
              </a>
            </div>

          </div>

          {/* Quick Pillars */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-sm font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#E0B09A]" />
                1-on-1 Consultation
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">15 minutes dedicated analysis before scissors touch hair.</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E0B09A]" />
                Cruelty-Free Actives
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">Formaldehyde-free, sulfate-free &amp; ethically sourced botanicals.</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E0B09A]" />
                Never Rushed
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">Generous chair cushions with zero overlapping bookings.</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#E0B09A]" />
                Transparent Pricing
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">No surprise billing at the desk. All rates clearly listed in INR.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E0B09A] uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Treatment Rituals
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              Hair, Skin &amp; Grooming Menu
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Fictional rate card created for client presentation. All services are performed with personalized botanical formulas.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              { id: 'all', label: 'All Treatments' },
              { id: 'hair', label: 'Hair & Color' },
              { id: 'beauty', label: 'Facials & Skin' },
              { id: 'grooming', label: 'Men & Beard' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#E0B09A] text-zinc-950 font-bold border-[#E0B09A] shadow-sm'
                    : 'bg-[#15131C] text-zinc-400 border-white/10 hover:border-[#E0B09A]/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#121018]/60 border border-white/[0.07] hover:border-[#E0B09A]/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-serif text-white group-hover:text-[#E0B09A] transition-colors">
                      {service.name}
                    </h3>
                    {service.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E0B09A]/10 text-[#E0B09A] border border-[#E0B09A]/20">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-base font-mono font-semibold text-[#E0B09A] shrink-0">
                    {service.price}
                  </span>
                </div>

                <p className="text-xs text-zinc-300/80 leading-relaxed mb-4">
                  {service.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E0B09A]" />
                  <span>{service.duration}</span>
                </span>
                <a
                  href="#book"
                  onClick={() => setSelectedService(service.name)}
                  className="text-[#E0B09A] hover:text-white flex items-center gap-1 transition-colors font-semibold"
                >
                  <span>Select &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. PRICING PACKAGES */}
      <section id="packages" className="py-20 sm:py-28 bg-[#0E0C13] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2">Curated Bundles</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Atelier Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Combined wellness &amp; styling rituals tailored for weddings, seasonal resets, and complete personal care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`p-7 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  pkg.highlight
                    ? 'bg-gradient-to-b from-[#1C1724] to-[#120F18] border-[#E0B09A] shadow-2xl shadow-[#E0B09A]/10 relative lg:-translate-y-2'
                    : 'bg-[#121017] border-white/10'
                }`}
              >
                <div>
                  {pkg.highlight && (
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#E0B09A] text-zinc-950 font-bold uppercase tracking-wider inline-block mb-3">
                      Guest Favorite
                    </span>
                  )}
                  <div className="text-[11px] font-mono text-[#E0B09A] uppercase tracking-wider">{pkg.tier}</div>
                  <h3 className="text-2xl font-serif text-white mt-1 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white">{pkg.price}</span>
                    <span className="text-xs font-mono text-zinc-400">/ session</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">{pkg.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {pkg.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#E0B09A] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <a
                    href="#book"
                    onClick={() => setSelectedService(pkg.name)}
                    className={`w-full py-3.5 rounded-full text-xs font-serif tracking-wider uppercase font-bold text-center block transition-all cursor-pointer ${
                      pkg.highlight
                        ? 'bg-[#E0B09A] hover:bg-[#D49E87] text-zinc-950 shadow-md'
                        : 'bg-[#181622] hover:bg-[#221F30] text-white border border-white/10'
                    }`}
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500 font-mono">
            *Sample rates for portfolio illustration. Final customized salon pricing is adjustable per business model.
          </div>

        </div>
      </section>

      {/* 6. ABOUT THE STUDIO */}
      <section id="about" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block font-bold">
              Quiet Luxury &middot; Slow Beauty
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
              An unhurried sanctuary created for deliberate style.
            </h2>
            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-light">
              <p>
                ÉLAN Studio was conceived as an antidote to crowded, noisy commercial salons. We believe personal grooming is not a rushed chore—it is an intimate ritual that deserves quiet space, natural light, and undivided attention.
              </p>
              <p>
                Every treatment begins with a relaxed 15-minute consultation over herbal tea. We examine scalp health, natural hair movement, and daily styling routines before touching a single scissor or color bowl.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#14121A] border border-white/5 space-y-1">
                <span className="text-xl font-serif text-[#E0B09A] block">100%</span>
                <span className="text-zinc-400">Organic certified rinse bar actives</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#14121A] border border-white/5 space-y-1">
                <span className="text-xl font-serif text-[#E0B09A] block">Private</span>
                <span className="text-zinc-400">Quiet booths for high-focus styling</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#16131F] to-[#0E0C13] border border-white/10 space-y-5">
            <h3 className="text-xl font-serif text-white">The ÉLAN Difference</h3>
            <ul className="space-y-4 text-xs text-zinc-300">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E0B09A]/20 text-[#E0B09A] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>No Overlapping Bookings:</strong> Your stylist remains dedicated entirely to you throughout your session.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E0B09A]/20 text-[#E0B09A] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>Clean Air Filtration:</strong> Medical-grade ventilation eliminates unpleasant ammonia or chemical fumes completely.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E0B09A]/20 text-[#E0B09A] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>Transparent Pricing in INR:</strong> Consultation, wash, conditioning, and finishing are always included in the stated price.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. STYLISTS & TEAM */}
      <section id="team" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2">Artisans &middot; Resident Talent</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Meet Your Styling Team
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Sample stylist profiles for demonstration. Each artisan specializes in dedicated craft domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS.map((st, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-[#121018] border border-white/10 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E0B09A]/30 to-[#191522] border border-[#E0B09A]/40 text-[#E0B09A] font-serif text-xl flex items-center justify-center mx-auto">
                  {st.initials}
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-serif text-white">{st.name}</h3>
                  <span className="text-xs font-mono text-[#E0B09A] block mt-0.5">{st.role}</span>
                </div>

                <div className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/40 border border-white/5 text-zinc-400 text-center">
                  {st.experience}
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Specialty Domain:</span>
                  <p className="text-zinc-300 font-medium">{st.specialty}</p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light italic">
                  "{st.bio}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-center">
                <a
                  href="#book"
                  onClick={() => setSelectedStylist(st.name)}
                  className="text-xs font-mono text-[#E0B09A] hover:text-white flex items-center justify-center gap-1 font-semibold transition-colors"
                >
                  Book with {st.name.split(' ')[0]} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. EDITORIAL LOOKBOOK / GALLERY */}
      <section id="gallery" className="py-20 sm:py-28 bg-[#0D0B12] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2">Visual Lookbook</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Studio Ambiance &amp; Work
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              An editorial glimpse into our treatment suites, private balayage stations, and calming botanical decor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#14121A] border border-white/10 space-y-3">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-[#241C2B] via-[#16131D] to-[#0E0C13] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Scissors className="w-8 h-8 text-[#E0B09A] mb-2 stroke-[1.5]" />
                <span className="text-xs font-serif text-white tracking-wider uppercase">Balayage Color Suite</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">High-CRI natural balance mirrors</span>
              </div>
              <h3 className="text-base font-serif text-white">Private Hair Chairs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Ergonomic memory foam seating designed for comfort during multi-hour color treatments.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#14121A] border border-white/10 space-y-3">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-[#241C2B] via-[#16131D] to-[#0E0C13] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Sparkles className="w-8 h-8 text-[#E0B09A] mb-2 stroke-[1.5]" />
                <span className="text-xs font-serif text-white tracking-wider uppercase">Facial &amp; Cryo Lounge</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">Acoustic isolation &amp; soft illumination</span>
              </div>
              <h3 className="text-base font-serif text-white">Skincare Sanctuaries</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Dimmed warm ambient lighting and quiet classical acoustics to induce complete sensory relaxation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#14121A] border border-white/10 space-y-3">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-[#241C2B] via-[#16131D] to-[#0E0C13] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Heart className="w-8 h-8 text-[#E0B09A] mb-2 stroke-[1.5]" />
                <span className="text-xs font-serif text-white tracking-wider uppercase">Botanical Dispensary</span>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">Organic cold-pressed Moroccan argan</span>
              </div>
              <h3 className="text-base font-serif text-white">Product Apothecary</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Clean, unadulterated hair serums and scalp tonics mixed freshly for each guest consultation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 9. SAMPLE TESTIMONIALS (CLEARLY MARKED) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2">Guest Impressions</span>
          <h2 className="text-3xl font-serif text-white tracking-tight">
            Client Reflections
          </h2>
          <p className="text-xs text-zinc-500 mt-2 font-mono">
            Sample testimonials &mdash; demo content for portfolio illustration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-3xl bg-[#131118] border border-white/10 space-y-3">
            <div className="text-[#E0B09A] text-xs">★★★★★</div>
            <p className="text-xs text-zinc-300 leading-relaxed italic font-light">
              "Finding a colorist who actually listens without rushing you is rare. Aarav spent 20 minutes analyzing my hair texture before suggesting a honey balayage. The result was seamless."
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
              <span className="font-bold text-white block">Simran Khurana</span>
              <span className="text-zinc-500">Sample Client &middot; Balayage &amp; Cut</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#131118] border border-white/10 space-y-3">
            <div className="text-[#E0B09A] text-xs">★★★★★</div>
            <p className="text-xs text-zinc-300 leading-relaxed italic font-light">
              "The Cryo-Glow facial before my sister’s engagement gave me glass skin for days. The studio feels like a private lounge rather than a crowded salon."
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
              <span className="font-bold text-white block">Tara Varma</span>
              <span className="text-zinc-500">Sample Client &middot; Cryo Facial</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#131118] border border-white/10 space-y-3">
            <div className="text-[#E0B09A] text-xs">★★★★★</div>
            <p className="text-xs text-zinc-300 leading-relaxed italic font-light">
              "Rohan’s beard sculpting and straight razor finish is classical grooming at its finest. Clean lines, hot towels, and genuine professionalism."
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
              <span className="font-bold text-white block">Aditya Roy</span>
              <span className="text-zinc-500">Sample Client &middot; Executive Cut</span>
            </div>
          </div>

        </div>

      </section>

      {/* 10. LOCATION & OPENING HOURS */}
      <section id="location" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2">Visit Our Studio</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">Hours &amp; Location</h2>
          <p className="text-sm text-zinc-400 mt-2">
            Located in Sector 62, Greater Noida with private covered parking and valet support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours */}
            <div className="p-6 rounded-3xl bg-[#131119] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-sm font-serif text-white">
                <Clock className="w-4 h-4 text-[#E0B09A]" />
                <span>Operating Timetable</span>
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                  <span>Monday &ndash; Saturday</span>
                  <span className="text-[#E0B09A] font-semibold">10:00 AM &ndash; 08:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5 text-zinc-300">
                  <span>Sunday</span>
                  <span className="text-[#E0B09A] font-semibold">11:00 AM &ndash; 06:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 text-zinc-500">
                  <span>Prior Appointments</span>
                  <span>Recommended for weekend slots</span>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-[#131119] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-sm font-serif text-white">
                <MapPin className="w-4 h-4 text-[#E0B09A]" />
                <span>Atelier Address</span>
              </div>
              
              <div className="text-xs text-zinc-300 leading-relaxed font-mono">
                <p className="font-bold text-white">ÉLAN STUDIO ATELIER</p>
                <p>Suite 4B, The Pavilion Arcade, Sector 62</p>
                <p>Greater Noida, Uttar Pradesh &ndash; 201309</p>
                <p className="text-zinc-500 mt-1">(Next to Magnolia Courtyard &middot; Dedicated Valet Parking)</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-[#E0B09A]/20 hover:bg-[#E0B09A]/30 border border-[#E0B09A]/30 text-[#E0B09A] flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Open in Google Maps
                </a>
                <a
                  href="tel:+919876543210"
                  className="px-3.5 py-2 rounded-full bg-[#1A1822] hover:bg-[#252230] text-zinc-200 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E0B09A]" />
                  Direct Studio Line
                </a>
              </div>
            </div>

          </div>

          {/* Simulated Google Map Canvas */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#121017] border border-white/10 overflow-hidden shadow-xl">
              <div className="bg-[#171420] px-5 py-3.5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E0B09A]" />
                  <span className="text-white font-serif">Google Maps Verified Embed</span>
                </div>
                <span className="text-[10px] text-[#E0B09A] font-mono">Ready for Client API Key</span>
              </div>

              <div className="relative h-[340px] sm:h-[380px] bg-[#14121A] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#E0B09A]/10 border border-[#E0B09A]/30 text-[#E0B09A] flex items-center justify-center mb-3">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-base font-serif text-white mb-1">
                  Interactive Studio Location Map
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mb-4 leading-relaxed font-light">
                  For a live salon client, this container embeds their verified Google Business Profile location iframe with directions.
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A090D] border border-white/10 text-[11px] font-mono text-[#E0B09A]">
                  <span>Coordinates: 28.6280° N, 77.3649° E</span>
                </div>
              </div>

              <div className="p-4 bg-[#0A090D] border-t border-white/5 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-zinc-400">
                <div>Covered Valet</div>
                <div>Complimentary WiFi</div>
                <div>Espresso Bar</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. APPOINTMENT RESERVATION FORM */}
      <section id="book" className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#181522] via-[#120F19] to-[#0D0B12] border border-[#E0B09A]/30 p-6 sm:p-12 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono text-[#E0B09A] uppercase tracking-widest block mb-2 font-bold">
              Reserve Your Chair
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Request An Appointment
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-light">
              Choose your service, preferred artist, and timing. We confirm reservations via WhatsApp within 30 minutes.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white">Appointment Request Logged</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed font-light">
                Thank you, {clientName || 'Guest'}. Your preferred slot has been noted. (Demo Prototype Mode &mdash; no actual booking sent).
              </p>
              <button
                type="button"
                onClick={() => setBookingSuccess(false)}
                className="px-5 py-2.5 rounded-full bg-[#1A1822] text-[#E0B09A] text-xs font-mono hover:bg-[#252230] transition-colors cursor-pointer"
              >
                Schedule Another Service
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4" noValidate>
              
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={nameId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Full Name *
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    placeholder="e.g. Radhika Sen"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E0B09A] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor={phoneId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E0B09A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={emailId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Email Address *
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="radhika@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E0B09A] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor={serviceId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Selected Service / Package
                  </label>
                  <select
                    id={serviceId}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E0B09A] transition-colors cursor-pointer"
                  >
                    <option value="Precision Scissor Haircut & Blowout">Precision Scissor Haircut &amp; Blowout (₹799)</option>
                    <option value="French Balayage & Glaze Melt">French Balayage &amp; Glaze Melt (₹4,499)</option>
                    <option value="Organic Amino Acid Smoothing Ritual">Organic Amino Smoothing Ritual (₹3,499)</option>
                    <option value="Luminescence Cryo-Glow Facial">Luminescence Cryo-Glow Facial (₹2,199)</option>
                    <option value="Master Beard Sculpt & Hot Towel Shave">Master Beard Sculpt &amp; Shave (₹649)</option>
                    <option value="Signature Refresh">Signature Refresh Package (₹1,499)</option>
                    <option value="The Atelier Luxe">The Atelier Luxe Package (₹2,699)</option>
                    <option value="Grand Couturier">Grand Couturier Package (₹4,999)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={stylistId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Preferred Stylist
                  </label>
                  <select
                    id={stylistId}
                    value={selectedStylist}
                    onChange={(e) => setSelectedStylist(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E0B09A] transition-colors cursor-pointer"
                  >
                    <option value="First Available Master Stylist">Any Master Stylist</option>
                    <option value="Aarav Mehta">Aarav Mehta (Creative Director)</option>
                    <option value="Mira Kapoor">Mira Kapoor (Esthetician)</option>
                    <option value="Rohan Malhotra">Rohan Malhotra (Master Barber)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={dateId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Preferred Date
                  </label>
                  <input
                    id={dateId}
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E0B09A] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor={timeId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                    Timing Window
                  </label>
                  <select
                    id={timeId}
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E0B09A] transition-colors cursor-pointer"
                  >
                    <option value="Morning (10:30 AM – 01:00 PM)">Morning Quiet (10:30 AM – 01:00 PM)</option>
                    <option value="Afternoon (01:30 PM – 04:30 PM)">Afternoon Tea (01:30 PM – 04:30 PM)</option>
                    <option value="Evening (05:00 PM – 07:30 PM)">Evening Glow (05:00 PM – 07:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={noteId} className="block text-xs font-mono text-zinc-300 mb-1.5 uppercase font-medium">
                  Hair History or Specific Styling Requests (Optional)
                </label>
                <textarea
                  id={noteId}
                  rows={2}
                  placeholder="e.g. Previous chemical color 3 months ago, sensitive scalp, bride-to-be consultation."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09080C] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#E0B09A] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 rounded-full bg-[#E0B09A] hover:bg-[#D49E87] disabled:opacity-50 text-zinc-950 font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#E0B09A]/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Requesting Appointment...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Reservation Request</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://wa.me/?text=Hi%20Élan%20Studio,%20I%20would%20like%20to%20book%20an%20appointment%20for%20${encodeURIComponent(selectedService)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

            </form>
          )}

        </div>

      </section>

      {/* 12. EDITORIAL SALON FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#07060A] text-zinc-400 py-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-serif text-base tracking-wider uppercase">
                <Scissors className="w-4 h-4 text-[#E0B09A]" />
                <span>ÉLAN Studio &middot; Hair &amp; Beauty Atelier</span>
              </div>
              <p className="text-zinc-400 text-xs max-w-sm leading-relaxed font-light">
                An intimate sanctuary dedicated to personalized hair architecture, French balayage, and slow botanical beauty rituals in Greater Noida.
              </p>
              <div className="text-[11px] text-[#E0B09A] pt-1">
                Fictional Concept Prototype built by Vibhor Verma
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Quick Navigation</div>
              <ul className="space-y-1.5 text-zinc-400">
                <li><a href="#services" className="hover:text-[#E0B09A] transition-colors">Hair &amp; Beauty Menu</a></li>
                <li><a href="#packages" className="hover:text-[#E0B09A] transition-colors">Treatment Packages</a></li>
                <li><a href="#team" className="hover:text-[#E0B09A] transition-colors">Resident Stylists</a></li>
                <li><a href="#location" className="hover:text-[#E0B09A] transition-colors">Studio Hours &amp; Map</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Studio Concierge</div>
              <ul className="space-y-1.5 text-zinc-400">
                <li><span>Phone: +91 98765 43210</span></li>
                <li><span>Email: concierge@elanatelier.fake</span></li>
                <li><span>WhatsApp: Daily 10 AM – 8 PM</span></li>
                <li><span>Valet: Suite 4B Pavilion Arcade</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} ÉLAN Studio Atelier. Designed by Vibhor Verma.
            </div>
            <a
              href="/"
              className="text-[#E0B09A] hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Vibhor's Main Portfolio
            </a>
          </div>

        </div>
      </footer>

      {/* 13. STICKY MOBILE ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-[#E0B09A]/20 bg-[#0E0D12]/95 backdrop-blur-lg px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#services"
          className="flex-1 py-2 rounded-full bg-[#181620] border border-white/10 text-white text-[11px] font-mono font-semibold text-center flex items-center justify-center gap-1"
        >
          <Scissors className="w-3.5 h-3.5 text-[#E0B09A]" />
          Menu
        </a>
        <a
          href="#location"
          className="flex-1 py-2 rounded-full bg-[#181620] border border-white/10 text-white text-[11px] font-mono font-semibold text-center flex items-center justify-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5 text-[#E0B09A]" />
          Map
        </a>
        <a
          href="#book"
          className="flex-1 py-2 rounded-full bg-[#E0B09A] text-zinc-950 text-[11px] font-serif font-bold text-center flex items-center justify-center gap-1 shadow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Book
        </a>
      </div>

    </div>
  );
}