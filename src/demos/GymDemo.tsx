import React, { useState, useId } from 'react';
import {
  Dumbbell,
  Clock,
  MapPin,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Compass,
  MessageCircle,
  ShieldCheck,
  Target,
  Zap,
  Activity,
  Award,
  Check,
  Menu,
  X,
  HeartPulse
} from 'lucide-react';

interface ProgramItem {
  id: string;
  name: string;
  badge: string;
  forWhom: string;
  desc: string;
  features: string[];
}

interface TrainerItem {
  name: string;
  role: string;
  exp: string;
  focus: string;
  philosophy: string;
  initials: string;
}

const PROGRAMS: ProgramItem[] = [
  {
    id: 'p1',
    name: 'Strength & Hypertrophy Lab',
    badge: 'Foundational',
    forWhom: 'Lifters looking to build pure strength, barbell power, and lean muscle mass.',
    desc: 'Periodized lifting blocks revolving around the squat, bench, deadlift, and clean. Emphasizes mechanical tension and progressive overload.',
    features: ['Custom lifting percentage chart', 'Access to Eleiko calibrated steel plates', 'Technique bar-path camera reviews']
  },
  {
    id: 'p2',
    name: 'Metabolic Engine (HIIT)',
    badge: 'High Calorie Burn',
    forWhom: 'Busy individuals wanting athletic conditioning and high-tempo cardio endurance.',
    desc: '45-minute circuit sessions mixing curved runners, SkiErgs, assault bikes, and dumbbell complexes designed to push aerobic thresholds.',
    features: ['Heart rate telemetry display', 'Sub-45 minute workout efficiency', 'Zero joint impact recovery alternatives']
  },
  {
    id: 'p3',
    name: 'Functional & Athletic Longevity',
    badge: 'Injury Resilience',
    forWhom: 'Athletes and professionals seeking pain-free movement, spinal health, and mobility.',
    desc: 'Multi-planar training incorporating kettlebell flows, sled mechanics, sandbags, and active joint decompression protocols.',
    features: ['Fascial stretch & foam rollout stations', 'Rotational core power drills', 'Pre-hab joint stabilization routines']
  },
  {
    id: 'p4',
    name: '1-on-1 Transformation Coaching',
    badge: 'High Accountability',
    forWhom: 'Clients wanting dedicated guidance, custom weekly nutrition, and strict oversight.',
    desc: 'Direct, focused partnership with a resident coach covering training biomechanics, daily macros, sleep hygiene, and milestone reviews.',
    features: ['Dedicated coach WhatsApp line', 'Bi-weekly biometric DEXA analysis', 'Custom gym & travel workout itineraries']
  }
];

const TRAINERS: TrainerItem[] = [
  {
    name: 'Kabir Varma',
    role: 'Head of Strength & Conditioning',
    exp: 'Sample Profile · 8+ Yrs Coaching',
    focus: 'Barbell Biomechanics & Olympic Lifts',
    philosophy: 'Master mechanical efficiency first. Progressive weight on the bar is earned through immaculate form.',
    initials: 'KV'
  },
  {
    name: 'Anya Sen',
    role: 'Lead Metabolic & Hyrox Coach',
    exp: 'Sample Profile · 6+ Yrs Coaching',
    focus: 'Aerobic Pacing & Lactate Thresholds',
    philosophy: 'Training is not about absolute exhaustion—it is about repeatable, high-output athletic capacity.',
    initials: 'AS'
  },
  {
    name: 'Dev Malhotra',
    role: 'Mobility & Physical Reconditioning',
    exp: 'Sample Profile · 7+ Yrs Coaching',
    focus: 'Joint Health, Spine & Kinetic Chains',
    philosophy: 'If you cannot control your own bodyweight through full ranges of motion, heavy barbells only mask dysfunctions.',
    initials: 'DM'
  }
];

const SCHEDULE_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
type ScheduleDay = typeof SCHEDULE_DAYS[number];

const SCHEDULE_DATA: Record<ScheduleDay, { time: string; session: string; coach: string; intensity: string }[]> = {
  Monday: [
    { time: '06:30 AM – 07:30 AM', session: 'Hyrox Engine & Row Intervals', coach: 'Coach Anya', intensity: 'High Tempo' },
    { time: '08:30 AM – 09:30 AM', session: 'Barbell Strength (Squat & Press)', coach: 'Coach Kabir', intensity: 'Heavy Load' },
    { time: '05:30 PM – 06:30 PM', session: 'Functional Kettlebell Flow', coach: 'Coach Dev', intensity: 'Moderate' },
    { time: '07:00 PM – 08:00 PM', session: 'Metabolic Core Blitz', coach: 'Coach Anya', intensity: 'High Tempo' }
  ],
  Tuesday: [
    { time: '07:00 AM – 08:00 AM', session: 'Olympic Lifting: Snatch Mechanics', coach: 'Coach Kabir', intensity: 'Technical' },
    { time: '09:00 AM – 10:00 AM', session: 'Spinal Decompression & Mobility', coach: 'Coach Dev', intensity: 'Recovery' },
    { time: '06:00 PM – 07:00 PM', session: 'Upper Body Hypertrophy Lab', coach: 'Coach Kabir', intensity: 'Moderate' },
    { time: '07:30 PM – 08:30 PM', session: 'Zone 2 Sled & Bike Endurance', coach: 'Coach Anya', intensity: 'Aerobic' }
  ],
  Wednesday: [
    { time: '06:30 AM – 07:30 AM', session: 'Deadlift & Posterior Chain Block', coach: 'Coach Kabir', intensity: 'Heavy Load' },
    { time: '08:30 AM – 09:30 AM', session: 'Aerobic Threshold Sprint Circuits', coach: 'Coach Anya', intensity: 'High Tempo' },
    { time: '06:00 PM – 07:00 PM', session: 'Functional Athlete Strongman Drills', coach: 'Coach Dev', intensity: 'High Output' }
  ],
  Thursday: [
    { time: '07:00 AM – 08:00 AM', session: 'Kettlebell & Sandbag Conditioning', coach: 'Coach Dev', intensity: 'Moderate' },
    { time: '09:00 AM – 10:00 AM', session: 'Full Body Mobility & Cold Plunge Flow', coach: 'Coach Dev', intensity: 'Recovery' },
    { time: '06:30 PM – 07:30 PM', session: 'Hyrox Simulation 500m Intervals', coach: 'Coach Anya', intensity: 'High Tempo' }
  ],
  Friday: [
    { time: '06:30 AM – 07:30 AM', session: 'Bench Press & Accessory Arm Lab', coach: 'Coach Kabir', intensity: 'Moderate' },
    { time: '08:30 AM – 09:30 AM', session: 'Metabolic Sled & Air-Runner Circuits', coach: 'Coach Anya', intensity: 'High Tempo' },
    { time: '06:00 PM – 07:00 PM', session: 'Friday Strength Friday Night Lights', coach: 'Coach Kabir', intensity: 'Heavy Load' }
  ],
  Saturday: [
    { time: '08:00 AM – 09:30 AM', session: 'Community Team Hyrox Battle (90m)', coach: 'All Coaches', intensity: 'Signature Event' },
    { time: '10:30 AM – 11:30 AM', session: 'Contrast Hydrotherapy & Stretch Clinic', coach: 'Coach Dev', intensity: 'Recovery' }
  ]
};

export default function GymDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<ScheduleDay>('Monday');
  
  // Trial form state
  const [trialName, setTrialName] = useState('');
  const [trialPhone, setTrialPhone] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialGoal, setTrialGoal] = useState('Strength & Muscle');
  const [trialTime, setTrialTime] = useState('Morning (06:30 AM – 09:30 AM)');
  const [trialMsg, setTrialMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Accessible Form IDs
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const goalId = useId();
  const timeId = useId();
  const msgId = useId();

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (trialPhone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for trial pass confirmation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrialSuccess(true);
      setTimeout(() => {
        setTrialSuccess(false);
        setTrialName('');
        setTrialPhone('');
        setTrialEmail('');
        setTrialMsg('');
      }, 7000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#E5ECF6] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 pb-20 sm:pb-0">
      
      {/* 1. CONCEPT DEMO TOP BANNER */}
      <aside aria-label="Demo notice" className="bg-[#121622] border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-200/90 z-50 sticky top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold border border-amber-500/30 shrink-0">
              Concept Demo
            </span>
            <span className="text-[11px] sm:text-xs">
              Live sample fitness facility website built by Vibhor Verma for gym, CrossFit &amp; health studio owners.
            </span>
          </div>
          <a
            href="/"
            className="text-white hover:text-amber-300 flex items-center gap-1.5 font-semibold text-xs transition-colors shrink-0 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Vibhor's Portfolio
          </a>
        </div>
      </aside>

      {/* 2. STICKY NAVIGATION */}
      <header className="border-b border-white/[0.08] bg-[#0A0D15]/90 backdrop-blur-xl sticky top-[41px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Mark */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-amber-500/20">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block uppercase leading-none font-mono">
                Iron District
              </span>
              <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase block mt-1">
                Strength &middot; Engine &middot; Lab
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
            <a href="#why" className="hover:text-amber-400 transition-colors">Why Iron</a>
            <a href="#programs" className="hover:text-amber-400 transition-colors">Programs</a>
            <a href="#memberships" className="hover:text-amber-400 transition-colors">Pricing</a>
            <a href="#trainers" className="hover:text-amber-400 transition-colors">Trainers</a>
            <a href="#facilities" className="hover:text-amber-400 transition-colors">Facilities</a>
            <a href="#schedule" className="hover:text-amber-400 transition-colors">Timetable</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">Location</a>
          </nav>

          {/* Nav Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>
            <a
              href="#trial"
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer font-mono"
            >
              Book Free Trial
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#0B0E17] px-4 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
              <a href="#why" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Why Us</a>
              <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Programs</a>
              <a href="#memberships" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Memberships</a>
              <a href="#trainers" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Coaches</a>
              <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Facility Tour</a>
              <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Timetable</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800">Hours &amp; Map</a>
              <a href="#trial" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-md bg-amber-400 text-zinc-950 font-bold">1-Day Pass</a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0F1422] via-[#090C14] to-[#07090E]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-amber-500/[0.08] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="max-w-3xl space-y-6">
            
            {/* Live Facility Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-mono text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Facility Open Today &middot; 05:30 AM &ndash; 10:30 PM &middot; Sector 62, Noida</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase">
              Build resilient power. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Zero gimmicks.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              No broken machines, crowded mirror rows, or generic workout sheets. Iron District is an athletic training facility equipped with Eleiko bars, Rogue rigs, curved runners, and cold plunges designed for people who take their fitness seriously.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#trial"
                className="px-7 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer font-mono"
              >
                <Zap className="w-4 h-4 fill-current" />
                Book Free Trial Session
              </a>
              <a
                href="#memberships"
                className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-mono"
              >
                <Award className="w-4 h-4 text-amber-400" />
                View Memberships
              </a>
              <a
                href="#schedule"
                className="px-4 py-4 rounded-xl bg-transparent border border-white/10 text-slate-400 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                View Weekly Timetable
              </a>
            </div>

          </div>

          {/* Quick Highlight Strips */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight flex items-baseline gap-1">
                <span>05:30</span>
                <span className="text-xs text-amber-400 font-mono">AM</span>
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Morning Lift Access</div>
              <p className="text-[11px] text-slate-400 leading-tight">Beat neighborhood commute traffic.</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">16 Max</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Class Cap</div>
              <p className="text-[11px] text-slate-400 leading-tight">No waiting for squat racks or dumbbells.</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">3°C Plunge</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Recovery Suite</div>
              <p className="text-[11px] text-slate-400 leading-tight">Cold water immersion + Finnish sauna.</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">100% Direct</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Coaching Attention</div>
              <p className="text-[11px] text-slate-400 leading-tight">Every movement supervised for safety.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Standards That Matter
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Why Lifters &amp; Athletes Train Here
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Most commercial gyms are built to sign up 3,000 members and pray 2,500 do not show up. We engineered our facility for the dedicated minority who train week in, week out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Vetted Coaches</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every trainer holds proven competitive lifting or athletic backgrounds. No junior floor staff reading generic templates off a clipboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Competition Equipment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calibrated steel plates, competition-spec power bars, Texas deadlift bars, and Rogue rigs. Equipment that never limits your numbers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Contrast Hydrotherapy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chilled 3°C cold water immersion tanks and dry cedar sauna to reduce central nervous system fatigue between heavy training blocks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Fair &amp; Transparent Terms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No predatory auto-renewals, 12-month lock-in traps, or arbitrary registration taxes. Clear monthly and quarterly membership terms in INR.
            </p>
          </div>

        </div>

      </section>

      {/* 5. TRAINING PROGRAMS */}
      <section id="programs" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <Target className="w-3.5 h-3.5" />
              Specialized Tracks
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Purpose-Driven Training Programs
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Select the track that matches your physical objectives. Every program includes coach oversight and progression tracking.
            </p>
          </div>
          <a
            href="#trial"
            className="text-xs font-mono text-amber-400 hover:text-white flex items-center gap-1 font-bold shrink-0"
          >
            <span>Ask which track suits you</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map(prog => (
            <div
              key={prog.id}
              className="p-7 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                    {prog.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">Track 0{prog.id.replace('p', '')}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors uppercase">
                  {prog.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {prog.desc}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">Target Demographic:</span>
                  <p className="text-xs text-slate-300">{prog.forWhom}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  {prog.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href="#trial"
                  className="text-xs font-mono text-amber-400 hover:text-white flex items-center gap-1 font-bold transition-colors"
                >
                  Trial this program &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. MEMBERSHIP PLANS (INR PRICING WITH PRO EMPHASIS) */}
      <section id="memberships" className="py-20 sm:py-28 bg-[#090C14] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Transparent Rates</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Membership Options
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Sample pricing for demonstration purposes. All packages include gym floor access, locker suite, and zero maintenance sign-up charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* STARTER */}
            <div className="p-7 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5 uppercase font-bold">
                  Starter Tier
                </span>
                <h3 className="text-xl font-bold text-white uppercase">Open Floor</h3>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">₹999</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ideal for experienced lifters who have their own programming and simply need elite barbells, dumbbells, and cardio equipment.
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unrestricted gym floor access (05:30 AM – 10:30 PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Locker rooms, rain showers &amp; water stations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1 complimentary movement assessment with a coach</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Daily group classes not included</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Recovery cold plunge suite access not included</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href="#trial"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider text-center block transition-colors font-mono cursor-pointer"
                >
                  Choose Starter
                </a>
              </div>
            </div>

            {/* PRO (FEATURED & PROMINENT) */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1A1F30] via-[#101524] to-[#0A0D18] border-2 border-amber-400 shadow-2xl shadow-amber-500/10 flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-[10px] font-mono font-black uppercase tracking-wider shadow">
                Most Popular for Lifters
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase font-bold">
                  Pro Athletic
                </span>
                <h3 className="text-2xl font-black text-white uppercase">Athlete Pass</h3>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-4xl font-black font-mono text-amber-400">₹1,499</span>
                  <span className="text-xs font-mono text-slate-300">/ month</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our comprehensive hybrid training pass. Combines full open gym access with unlimited daily coached group training and recovery suites.
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Unlimited daily group classes</strong> (Hyrox, Strength, HIIT)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Unrestricted open gym floor &amp; platform access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Weekly 3°C cold plunge &amp; Finnish sauna sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Monthly biometric body composition DEXA tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Priority slot booking on the member timetable</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <a
                  href="#trial"
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider text-center block transition-all shadow-lg font-mono cursor-pointer active:scale-95"
                >
                  Get Started with Pro
                </a>
              </div>
            </div>

            {/* ELITE */}
            <div className="p-7 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5 uppercase font-bold">
                  Elite Tier
                </span>
                <h3 className="text-xl font-bold text-white uppercase">Coach Guided</h3>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">₹2,499</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For athletes preparing for competitions or clients requiring dedicated 1-on-1 accountability and personalized nutritional protocols.
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Everything in the Pro Athlete package</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>4 one-on-one personal coaching hours</strong> each month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bespoke daily macro &amp; nutritional breakdown plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct coach WhatsApp access for daily form checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited contrast recovery suite usage</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href="#trial"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider text-center block transition-colors font-mono cursor-pointer"
                >
                  Choose Elite
                </a>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center text-xs text-slate-400 font-mono">
            *Transparent demo rates. Actual commercial gym pricing is fully configurable per client requirement.
          </div>

        </div>
      </section>

      {/* 7. TRAINERS SECTION */}
      <section id="trainers" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Qualified Coaching</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Meet Our Resident Coaches
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Sample coaching profiles. Our trainers prioritize injury-free progression, strict biomechanics, and sustainable performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.map((coach, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-slate-900/40 border border-white/[0.08] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-slate-900 border border-amber-500/30 text-amber-300 font-black font-mono text-xl flex items-center justify-center">
                  {coach.initials}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white uppercase">{coach.name}</h3>
                  <span className="text-xs font-mono text-amber-400">{coach.role}</span>
                </div>

                <div className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 border border-white/5 text-slate-300 w-fit">
                  {coach.exp}
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Specialization:</span>
                  <p className="text-slate-300 font-medium">{coach.focus}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-slate-400 italic leading-relaxed">
                  "{coach.philosophy}"
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <a
                  href="#trial"
                  className="text-xs font-mono text-amber-400 hover:text-white flex items-center gap-1 font-bold transition-colors"
                >
                  Book assessment with {coach.name.split(' ')[0]} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. FACILITIES & TOUR */}
      <section id="facilities" className="py-20 sm:py-28 bg-[#090C14] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Space &amp; Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Tour The Training Floor
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every square meter has been planned to prevent crowding, support heavy dropping, and facilitate rapid transitions between stations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
              <div className="h-44 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Dumbbell className="w-10 h-10 text-amber-400 mb-2" />
                <span className="text-xs font-mono text-amber-300 font-bold uppercase">The Lifting Deck</span>
                <span className="text-[10px] text-slate-400">8 dedicated oak platforms &amp; Eleiko power bars</span>
              </div>
              <h3 className="text-base font-bold text-white uppercase">Olympic &amp; Power Platforms</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chalk stations, competition collars, and shock-absorbing rubber inserts capable of handling heavy deadlift drops safely.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
              <div className="h-44 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <Activity className="w-10 h-10 text-amber-400 mb-2" />
                <span className="text-xs font-mono text-amber-300 font-bold uppercase">Turf Sprint Track</span>
                <span className="text-[10px] text-slate-400">30-meter high-density sled &amp; carry strip</span>
              </div>
              <h3 className="text-base font-bold text-white uppercase">Conditioning Turf</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated surface for prowler sled pushes, farmer walks, sandbag carries, and deceleration sprints without interference.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
              <div className="h-44 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                <HeartPulse className="w-10 h-10 text-amber-400 mb-2" />
                <span className="text-xs font-mono text-amber-300 font-bold uppercase">Recovery Suite</span>
                <span className="text-[10px] text-slate-400">3°C immersion tanks &amp; dry cedar sauna</span>
              </div>
              <h3 className="text-base font-bold text-white uppercase">Contrast Hydrotherapy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sanitized cold plunges and high-heat sauna cabins engineered to lower acute inflammation and accelerate muscle repair.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. PROGRESS & TRANSFORMATION PHILOSOPHY */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#13192B] via-[#0E1320] to-[#0A0D15] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold">
              Progressive Overload
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
              Your Progress Starts With Consistent Habits
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We do not market miraculous 14-day transformations or unsustainable crash diets. Real, long-term athletic health is built by showing up 3 to 4 times a week, controlling your movement patterns, and allowing our coaching staff to guide your load progression.
            </p>
            
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-black text-sm block">01 / Form First</span>
                <p className="text-[11px] text-slate-400">No ego lifting. Mechanics are locked in before adding load.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-black text-sm block">02 / Measured Load</span>
                <p className="text-[11px] text-slate-400">Every working set and repetition is recorded and tracked.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                <span className="text-amber-400 font-black text-sm block">03 / Active Rest</span>
                <p className="text-[11px] text-slate-400">Recovery and nutrition given identical importance to lifting.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4 text-center">
            <Award className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase">Experience The Facility First</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Before committing to any package, come in for a completely free 60-minute trial session. Test the bars, observe a class, and talk with our coaches.
            </p>
            <a
              href="#trial"
              className="inline-block px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider font-mono transition-colors"
            >
              Claim Free Trial Session &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* 9. CLASS SCHEDULE */}
      <section id="schedule" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Weekly Classes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Class Timetable
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Sample timetable for demonstration. Members can reserve their spot via our client portal or WhatsApp.
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {SCHEDULE_DAYS.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeDay === day
                    ? 'bg-amber-400 text-zinc-950 font-bold border-amber-400 shadow'
                    : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable List for Selected Day */}
        <div className="space-y-3">
          {SCHEDULE_DATA[activeDay]?.map((slot, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-slate-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-32 font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot.time}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">{slot.session}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{slot.coach}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                  {slot.intensity}
                </span>
                <a
                  href="#trial"
                  className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400 hover:text-zinc-950 text-amber-300 text-xs font-mono font-bold transition-colors"
                >
                  Book Slot
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 10. SAMPLE TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-[#090C14] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Member Voices</span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              Sample Member Experiences
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Sample testimonials &mdash; demo content for portfolio illustration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The atmosphere here is completely different from commercial chains. Nobody is hoarding dumbbells for selfies. The coaches know your numbers and keep you honest on your form."
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
                <span className="font-bold text-white block">Rohan Kapoor</span>
                <span className="text-slate-500">Sample Member &middot; Strength Track</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Having the cold plunge tanks right next to the locker room is a game changer for recovery. I train 4 mornings a week before heading to my office in Sector 62."
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
                <span className="font-bold text-white block">Pooja Nair</span>
                <span className="text-slate-500">Sample Member &middot; Hyrox Track</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/10 space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Clean platforms, no broken equipment, and fair pricing without annual contract traps. Exactly what a serious lifting facility in Noida should feel like."
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono">
                <span className="font-bold text-white block">Sameer Gill</span>
                <span className="text-slate-500">Sample Member &middot; Powerlifting</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. LOCATION & OPENING HOURS WITH GOOGLE MAPS PLACEHOLDER */}
      <section id="location" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Find The Lab</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">Hours &amp; Location</h2>
          <p className="text-sm text-slate-400 mt-2">
            Located in Sector 62, Noida with convenient access from the metro station and dedicated basement parking for members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Block */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Operating Timings</span>
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/5 text-slate-300">
                  <span>Monday &ndash; Friday</span>
                  <span className="text-amber-400 font-bold">05:30 AM &ndash; 10:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5 text-slate-300">
                  <span>Saturday</span>
                  <span className="text-amber-400 font-bold">06:30 AM &ndash; 09:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-400">
                  <span>Sunday</span>
                  <span>08:00 AM &ndash; 02:00 PM (Recovery Only)</span>
                </div>
              </div>
            </div>

            {/* Address & Quick Actions */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase font-mono">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Facility Address</span>
              </div>
              
              <div className="text-xs text-slate-300 leading-relaxed font-mono">
                <p className="font-bold text-white">IRON DISTRICT ATHLETIC CLUB</p>
                <p>Plot 8A, Institutional Area, Sector 62</p>
                <p>Noida, Uttar Pradesh &ndash; 201309</p>
                <p className="text-slate-400 mt-1">(500m from Electronic City Metro &middot; Basement Parking Available)</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/30 text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Open in Google Maps
                </a>
                <a
                  href="tel:+919876543210"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Call Front Desk
                </a>
              </div>
            </div>

          </div>

          {/* Google Maps Integration Placeholder */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-xl">
              <div className="bg-[#101420] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-bold">Interactive Google Maps Embed</span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold">Ready for Client API Key</span>
              </div>

              <div className="relative h-[340px] sm:h-[400px] bg-[#121622] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white uppercase mb-1 font-mono">
                  Google Maps Integration Window
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
                  For a real gym client, this component embeds an interactive Google Maps iframe matching their verified Google Business Profile.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-[11px] font-mono text-amber-300">
                  <span>Coordinates: 28.6280° N, 77.3649° E</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-400">
                <div>Covered Parking</div>
                <div>Locker Rooms</div>
                <div>Filter Water Bar</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 12. FREE TRIAL FORM & CONVERSION SECTION */}
      <section id="trial" className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#141A29] to-[#0D111A] border-2 border-amber-500/30 p-6 sm:p-12 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2 font-bold">
              Zero Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Book your free 60-minute trial session. Test the facility, participate in a coached class, and speak with our staff before deciding.
            </p>
          </div>

          {trialSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold uppercase text-white font-mono">Trial Pass Confirmed!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, {trialName || 'Athlete'}. Your request has been logged. (Demo Prototype Mode &mdash; no actual pass generated).
              </p>
              <button
                type="button"
                onClick={() => setTrialSuccess(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-amber-300 text-xs font-mono hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Book Another Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleTrialSubmit} className="space-y-4" noValidate>
              
              {formError && (
                <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={nameId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                    Full Name *
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    placeholder="e.g. Aryan Malhotra"
                    value={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor={phoneId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={trialPhone}
                    onChange={(e) => setTrialPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={emailId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                    Email Address *
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="aryan@mybusiness.com"
                    value={trialEmail}
                    onChange={(e) => setTrialEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor={goalId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                    Primary Fitness Objective
                  </label>
                  <select
                    id={goalId}
                    value={trialGoal}
                    onChange={(e) => setTrialGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="Strength & Muscle">Pure Strength &amp; Barbell Hypertrophy</option>
                    <option value="Hyrox & Fat Loss">Hyrox Engine &amp; Fat Loss Conditioning</option>
                    <option value="Mobility & Rehab">Mobility, Joint Health &amp; Rehab</option>
                    <option value="General Athletic Health">General Athletic Health &amp; Stamina</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={timeId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                  Preferred Trial Slot
                </label>
                <select
                  id={timeId}
                  value={trialTime}
                  onChange={(e) => setTrialTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="Morning (06:30 AM – 09:30 AM)">Morning Session (06:30 AM &ndash; 09:30 AM)</option>
                  <option value="Midday (11:00 AM – 02:00 PM)">Midday Quiet Hours (11:00 AM &ndash; 02:00 PM)</option>
                  <option value="Evening (05:30 PM – 08:30 PM)">Evening Peak Class (05:30 PM &ndash; 08:30 PM)</option>
                  <option value="Weekend (Saturday Morning)">Weekend Hyrox Special (Saturday Morning)</option>
                </select>
              </div>

              <div>
                <label htmlFor={msgId} className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                  Questions or Training Background (Optional)
                </label>
                <textarea
                  id={msgId}
                  rows={2}
                  placeholder="e.g. Prior lifting experience, recovering from a minor ankle sprain, etc."
                  value={trialMsg}
                  onChange={(e) => setTrialMsg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg font-mono cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Trial Slot...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Book Free 1-Day Trial Session</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://wa.me/?text=Hi%20Iron%20District,%20I%20would%20like%20to%20book%20a%20free%201-day%20trial%20workout%20pass.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-mono"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  WhatsApp Direct Inquiry
                </a>
              </div>

            </form>
          )}

        </div>

      </section>

      {/* 13. GYM FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#05070B] text-slate-400 py-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-black text-base uppercase">
                <Dumbbell className="w-5 h-5 text-amber-400" />
                <span>Iron District Fitness &amp; Performance</span>
              </div>
              <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-sans">
                Dedicated powerlifting, functional conditioning, and recovery facility in Sector 62, Noida.
              </p>
              <div className="text-[11px] text-amber-400 pt-1">
                Fictional Concept Prototype built by Vibhor Verma
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Quick Navigation</div>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#programs" className="hover:text-amber-400 transition-colors">Training Programs</a></li>
                <li><a href="#memberships" className="hover:text-amber-400 transition-colors">Pricing Packages</a></li>
                <li><a href="#schedule" className="hover:text-amber-400 transition-colors">Weekly Timetable</a></li>
                <li><a href="#location" className="hover:text-amber-400 transition-colors">Hours &amp; Location</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Facility Contacts</div>
              <ul className="space-y-1.5 text-slate-400">
                <li><span>Phone: +91 98765 43210</span></li>
                <li><span>Email: frontdesk@irondistrict.fake</span></li>
                <li><span>WhatsApp: Concierge Available</span></li>
                <li><span>Hours: 05:30 AM &ndash; 10:30 PM</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Iron District Club. Built by Vibhor Verma.
            </div>
            <a
              href="/"
              className="text-amber-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Vibhor's Main Portfolio
            </a>
          </div>

        </div>
      </footer>

      {/* 14. STICKY MOBILE ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-white/10 bg-[#0A0D15]/95 backdrop-blur-lg px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#programs"
          className="flex-1 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-[11px] font-mono font-bold text-center flex items-center justify-center gap-1"
        >
          <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
          Programs
        </a>
        <a
          href="#schedule"
          className="flex-1 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-[11px] font-mono font-bold text-center flex items-center justify-center gap-1"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          Schedule
        </a>
        <a
          href="#trial"
          className="flex-1 py-2 rounded-lg bg-amber-400 text-zinc-950 text-[11px] font-mono font-black text-center flex items-center justify-center gap-1 shadow"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Free Pass
        </a>
      </div>

    </div>
  );
}