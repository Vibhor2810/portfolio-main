import { useState, useMemo } from 'react';
import {
  Coffee,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Utensils,
  ArrowLeft,
  Sparkles,
  Compass,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
  Leaf,
  CheckCircle2
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: 'coffee' | 'breakfast' | 'bakery' | 'beverages';
  tag?: string;
  dietary: 'Veg' | 'Vegan' | 'Contains Egg' | 'Specialty';
  description: string;
  origin?: string;
}

const MENU_DATA: MenuItem[] = [
  // Manual Brews & Coffee
  {
    id: 'c1',
    name: 'Estate Pour-Over (Monsooned Malabar)',
    price: '₹240',
    category: 'coffee',
    tag: 'Signature Roast',
    dietary: 'Vegan',
    origin: 'Attikan Estate, Biligirirangana Hills',
    description: 'Slow-poured through Japanese V60 paper. Notes of dark chocolate, smoked spice, and sweet caramel finish.'
  },
  {
    id: 'c2',
    name: '18-Hour Slow Cold Drip',
    price: '₹220',
    category: 'coffee',
    tag: 'Bestseller',
    dietary: 'Vegan',
    origin: 'Chikmagalur Arabica (1,400m altitude)',
    description: 'Cold water drop extraction filtered overnight. Ultra-smooth with zero bitterness and natural cacao undertones.'
  },
  {
    id: 'c3',
    name: 'Silk Flat White / Oat Cortado',
    price: '₹195',
    category: 'coffee',
    dietary: 'Veg',
    description: 'Double shot of dark roast espresso combined with velvety textured whole milk or organic oat milk.'
  },
  {
    id: 'c4',
    name: 'Spiced Cardamom & Honey Cortado',
    price: '₹210',
    category: 'coffee',
    tag: 'House Special',
    dietary: 'Veg',
    description: 'Ristretto cut 1:1 with steamed farm milk, infused with crushed Idukki green cardamom and wild forest honey.'
  },

  // Fresh Kitchen & Breakfast
  {
    id: 'b1',
    name: 'Truffled Wild Mushroom Tartine',
    price: '₹380',
    category: 'breakfast',
    tag: 'Chef Choice',
    dietary: 'Veg',
    description: 'Pan-seared button & oyster mushrooms over toasted house sourdough, garlic labneh, and fresh micro herbs.'
  },
  {
    id: 'b2',
    name: 'Turkish Poached Eggs (Cilbir)',
    price: '₹360',
    category: 'breakfast',
    dietary: 'Contains Egg',
    description: 'Two organic runny poached eggs resting on garlic Greek yogurt, finished with warm Aleppo chili brown butter.'
  },
  {
    id: 'b3',
    name: 'Whipped Ricotta & Fig Toast',
    price: '₹340',
    category: 'breakfast',
    dietary: 'Veg',
    description: 'Artisan grilled sourdough spread thick with lemon zest ricotta, sliced purple figs, roasted walnuts, and thyme honey.'
  },
  {
    id: 'b4',
    name: 'Avocado & Slow-Roasted Tomato Sourdough',
    price: '₹390',
    category: 'breakfast',
    tag: 'Vegan Favorite',
    dietary: 'Vegan',
    description: 'Chunky Hass avocado mash, balsamic blistered cherry tomatoes, toasted seeds, and sea salt flakes on rustic bread.'
  },

  // Artisan Bakery
  {
    id: 'k1',
    name: '72-Layer Classic Butter Croissant',
    price: '₹180',
    category: 'bakery',
    tag: 'Baked Fresh at 7 AM',
    dietary: 'Veg',
    description: 'Golden, flaky, paper-thin laminated pastry prepared strictly with cultured French butter.'
  },
  {
    id: 'k2',
    name: '70% Dark Coorg Chocolate Babka',
    price: '₹230',
    category: 'bakery',
    dietary: 'Veg',
    description: 'Tender brioche dough twisted with single-estate dark chocolate fudge and crunchy roasted hazelnut crumb.'
  },
  {
    id: 'k3',
    name: 'Almond & Frangipane Twice-Baked Croissant',
    price: '₹240',
    category: 'bakery',
    dietary: 'Veg',
    description: 'Filled with velvety almond cream, baked twice till crispy, and dusted with powdered vanilla sugar.'
  },

  // Refreshers & Coolers
  {
    id: 'v1',
    name: 'Wild Orange & Cold Brew Tonic',
    price: '₹240',
    category: 'beverages',
    dietary: 'Vegan',
    description: 'Cold brew concentrate paired with artisanal botanical tonic, fresh Nagpur orange slice, and bruised rosemary.'
  },
  {
    id: 'v2',
    name: 'Uji Ceremonial Matcha Latte',
    price: '₹260',
    category: 'beverages',
    dietary: 'Veg',
    description: 'First-harvest Japanese stone-ground green tea whisked with creamy oat milk and a touch of agave nectar.'
  }
];

export default function CafeDemo() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'breakfast' | 'bakery' | 'beverages'>('all');
  
  // Reservation state
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('11:30 AM');
  const [resGuests, setResGuests] = useState('2');
  const [resSpecialReq, setResSpecialReq] = useState('');
  const [resSubmitted, setResSubmitted] = useState(false);

  // Filtered menu
  const displayedItems = useMemo(() => {
    if (activeCategory === 'all') return MENU_DATA;
    return MENU_DATA.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResSubmitted(true);
    setTimeout(() => {
      setResSubmitted(false);
      setResName('');
      setResPhone('');
      setResSpecialReq('');
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#F5F2EB] font-sans antialiased selection:bg-amber-600/30 selection:text-amber-200 pb-20 sm:pb-0">
      
      {/* 1. TOP CONCEPT BANNER (Clear client transparency) */}
      <aside aria-label="Demo notice" className="bg-[#1C140E] border-b border-amber-600/20 px-4 py-2.5 text-xs text-amber-200/90 z-50 sticky top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold border border-amber-500/30 shrink-0">
              Concept Demo
            </span>
            <span className="text-[11px] sm:text-xs">
              Live sample website built by Vibhor Verma for cafe, bistro, and artisanal dining owners.
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

      {/* 2. CAFE NAVIGATION */}
      <header className="border-b border-white/[0.08] bg-[#140F0B]/90 backdrop-blur-xl sticky top-[41px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Fictional Cafe Branding */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700/60 to-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold text-amber-100 tracking-wide block leading-tight">
                Ember &amp; Bean
              </span>
              <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest block">
                Artisan Roastery &middot; Kitchen
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-amber-100/70">
            <a href="#menu" className="hover:text-amber-300 transition-colors">Menu</a>
            <a href="#story" className="hover:text-amber-300 transition-colors">Our Roastery</a>
            <a href="#hours-location" className="hover:text-amber-300 transition-colors">Hours &amp; Location</a>
            <a href="#gallery" className="hover:text-amber-300 transition-colors">Ambiance</a>
            <a href="#reserve" className="hover:text-amber-300 transition-colors">Book a Table</a>
          </nav>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-white/10 text-xs font-mono text-amber-200/90 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>
            <a
              href="#reserve"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Reserve Table
            </a>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#18120C] via-[#100D0A] to-[#0C0A09]">
        {/* Warm Cafe Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="max-w-3xl space-y-6">
            
            {/* Live Open Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/20 text-xs font-mono text-amber-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Kitchen &amp; Espresso Bar Open Today &middot; 07:30 AM &ndash; 10:30 PM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-amber-50 tracking-tight leading-[1.1]">
              Crafted in small batches. Served with deliberate care.
            </h1>

            <p className="text-base sm:text-lg text-amber-100/70 max-w-2xl leading-relaxed">
              Single-origin coffees sourced directly from shade-grown estates in Coorg &amp; Chikmagalur, roasted twice weekly and paired with fresh morning sourdough.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40"
              >
                <Utensils className="w-4 h-4" />
                Explore Food &amp; Brew Menu
              </a>
              <a
                href="#reserve"
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                Reserve a Table
              </a>
              <a
                href="#hours-location"
                className="px-4 py-3.5 rounded-xl bg-transparent border border-white/10 text-amber-200/70 hover:text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Get Directions
              </a>
            </div>

          </div>

          {/* Quick Info Strip */}
          <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-amber-400" />
                100% Arabica
              </div>
              <p className="text-xs text-amber-200/60 font-mono">Direct-trade South Indian estates</p>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-400" />
                Sourdough Kitchen
              </div>
              <p className="text-xs text-amber-200/60 font-mono">Breads &amp; pastries baked every morning</p>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                Pure Ingredients
              </div>
              <p className="text-xs text-amber-200/60 font-mono">No artificial flavors, syrups or preservatives</p>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Quiet Work Friendly
              </div>
              <p className="text-xs text-amber-200/60 font-mono">Fiber WiFi &amp; power sockets at every booth</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MENU SECTION — PRIMARY COMMERCIAL REASON VISITORS VISIT */}
      <section id="menu" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
              <Utensils className="w-3.5 h-3.5" />
              Fresh Every Day
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Food &amp; Beverage Selection
            </h2>
            <p className="text-sm text-amber-100/70 mt-2 max-w-xl">
              All coffee roasted on our restored drum roaster. Pastries laminated daily with cultured butter. Click categories below to discover items.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              { id: 'all', label: 'Complete Menu' },
              { id: 'coffee', label: 'Coffee & Brews' },
              { id: 'breakfast', label: 'Kitchen & Brunch' },
              { id: 'bakery', label: 'Fresh Bakery' },
              { id: 'beverages', label: 'Coolers & Tea' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                className={`px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-sm'
                    : 'bg-stone-900/60 text-amber-200/80 border-white/10 hover:border-amber-500/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedItems.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-stone-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Item Top Meta */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-base font-mono font-bold text-amber-400 shrink-0">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.origin && (
                  <div className="text-[11px] font-mono text-amber-300/80 flex items-center gap-1.5 mb-3">
                    <Compass className="w-3 h-3 text-amber-400" />
                    <span>Origin: {item.origin}</span>
                  </div>
                )}
              </div>

              {/* Item Footer Tag */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  item.dietary === 'Vegan' 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    : item.dietary === 'Veg'
                    ? 'bg-amber-950/50 text-amber-300 border border-amber-500/20'
                    : 'bg-stone-800 text-stone-300'
                }`}>
                  {item.dietary}
                </span>
                <a
                  href="#reserve"
                  className="text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  Order at counter &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dietary Transparency Box */}
        <div className="mt-8 p-4 rounded-xl bg-stone-900/30 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Have severe food allergies? Inform our barista when placing your table order. Oat milk and gluten-conscious options available.</span>
          </div>
          <a
            href="https://wa.me/?text=Hi%20Ember%20and%20Bean,%20I%20have%20a%20dietary%20question%20regarding%20your%20menu."
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-white font-mono flex items-center gap-1 shrink-0"
          >
            <span>Ask via WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </section>

      {/* 5. LOCATION, HOURS & GOOGLE MAPS PLACEHOLDER */}
      <section id="hours-location" className="py-20 bg-[#120E0A] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Visit The Roastery</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Opening Hours &amp; Location</h2>
            <p className="text-sm text-stone-400 mt-2">
              Located on a quiet tree-lined lane in Indiranagar. Free street parking for two-wheelers and valet on weekends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Hours & Address Card */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Hours Block */}
              <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 space-y-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white font-serif">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Dine-In &amp; Takeaway Hours</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-stone-300">
                    <span>Monday &ndash; Friday</span>
                    <span className="text-amber-300 font-semibold">07:30 AM &ndash; 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-stone-300">
                    <span>Saturday &amp; Sunday</span>
                    <span className="text-amber-300 font-semibold">08:00 AM &ndash; 11:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-stone-400">
                    <span>Kitchen Closes Daily</span>
                    <span>10:00 PM Sharp</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-[11px] text-amber-200">
                  <strong>Roastery Schedule:</strong> Live drum roasting takes place every Tuesday and Friday morning between 9:00 AM and 11:30 AM.
                </div>
              </div>

              {/* Location & Quick Contact */}
              <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 space-y-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white font-serif">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Address &amp; Landmark</span>
                </div>
                
                <div className="text-xs text-stone-300 leading-relaxed">
                  <p className="font-semibold text-white">Ember &amp; Bean Coffee Studio</p>
                  <p>14 Heritage Lane, 100 Feet Road Cross</p>
                  <p>Indiranagar, Bengaluru, Karnataka &ndash; 560038</p>
                  <p className="text-stone-400 mt-1">(Opposite Old Banyan Tree Park &middot; Above Plant Haven)</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 text-xs font-mono">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call Cafe
                  </a>
                </div>
              </div>

            </div>

            {/* Google Maps Integration Placeholder */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-stone-900 border border-white/10 overflow-hidden shadow-xl">
                {/* Simulated Map Header */}
                <div className="bg-[#18130E] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold">Google Maps Live Embed Placeholder</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold">Ready for Client API Key</span>
                </div>

                {/* Simulated Map Canvas */}
                <div className="relative h-[340px] sm:h-[400px] bg-[#1A1816] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white mb-1">
                    Google Maps Integration Window
                  </h3>
                  <p className="text-xs text-stone-400 max-w-sm mb-4 leading-relaxed">
                    For a live cafe client, this box seamlessly embeds an interactive Google Maps iframe matching their verified Google Business Profile.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950 border border-white/10 text-[11px] font-mono text-amber-300">
                    <span>Coordinates: 12.9716° N, 77.5946° E</span>
                  </div>
                </div>

                {/* Map Bottom Features */}
                <div className="p-4 bg-stone-950/80 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-stone-400">
                  <div>Free Guest WiFi</div>
                  <div>Pet Friendly Yard</div>
                  <div>Dedicated Cycle Racks</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. AMBIANCE & VISUAL GALLERY */}
      <section id="gallery" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Space &amp; Atmosphere</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Crafted For Slow Mornings</h2>
          <p className="text-sm text-stone-400 mt-2">
            Reclaimed teak tables, natural sunlight, filtered acoustic playlists, and the soothing hum of manual pour-overs.
          </p>
        </div>

        {/* Visual Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-stone-900/40 border border-white/10 space-y-3">
            <div className="h-44 rounded-xl bg-gradient-to-br from-amber-950/60 to-stone-900 border border-white/5 flex flex-col items-center justify-center text-center p-4">
              <Coffee className="w-10 h-10 text-amber-400 mb-2" />
              <span className="text-xs font-mono text-amber-300 font-bold">Pour-Over Bar</span>
              <span className="text-[10px] text-stone-400">Japanese drippers &amp; temperature controlled kettle</span>
            </div>
            <h3 className="text-base font-serif font-bold text-white">Manual Brew Station</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Sit along the copper bar and watch single-origin microlots ground and extracted by hand.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/40 border border-white/10 space-y-3">
            <div className="h-44 rounded-xl bg-gradient-to-br from-amber-950/60 to-stone-900 border border-white/5 flex flex-col items-center justify-center text-center p-4">
              <Utensils className="w-10 h-10 text-amber-400 mb-2" />
              <span className="text-xs font-mono text-amber-300 font-bold">Open Hearth Kitchen</span>
              <span className="text-[10px] text-stone-400">Fermentation chambers &amp; stone deck oven</span>
            </div>
            <h3 className="text-base font-serif font-bold text-white">Bakehouse Sourdough</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Our wild yeast sourdough undergoes a 36-hour slow fermentation before baking every morning at dawn.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/40 border border-white/10 space-y-3">
            <div className="h-44 rounded-xl bg-gradient-to-br from-amber-950/60 to-stone-900 border border-white/5 flex flex-col items-center justify-center text-center p-4">
              <Sparkles className="w-10 h-10 text-amber-400 mb-2" />
              <span className="text-xs font-mono text-amber-300 font-bold">Sunlit Courtyard</span>
              <span className="text-[10px] text-stone-400">Lush indoor botanicals &amp; shaded outdoor patio</span>
            </div>
            <h3 className="text-base font-serif font-bold text-white">Garden Seating</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              A serene oasis away from traffic noise. Pet-friendly with plenty of shade and morning breeze.
            </p>
          </div>

        </div>

      </section>

      {/* 7. INSTAGRAM & COMMUNITY SOCIAL STRIP */}
      <section className="py-14 bg-stone-950 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white block font-serif">Follow @emberandbeancafe</span>
              <span className="text-xs text-stone-400 font-mono">Behind the roaster updates, weekly coffee drops, and morning pastry bakes.</span>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-stone-900 border border-white/10 hover:border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>View Instagram Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 8. TABLE RESERVATION & DIRECT WHATSAPP INQUIRY FLOW */}
      <section id="reserve" className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#18130E] to-[#120D09] border border-amber-500/20 p-6 sm:p-12 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">Instant Booking</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Reserve Your Table</h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2">
              Walk-ins are always welcomed. For weekend brunches or parties larger than 4, reserve below for immediate priority seating.
            </p>
          </div>

          {resSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Table Request Received!</h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto leading-relaxed">
                Thank you, {resName || 'Guest'}. A confirmation has been logged. (Demo Prototype Mode &mdash; no actual booking sent).
              </p>
              <button
                type="button"
                onClick={() => setResSubmitted(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 text-amber-200 text-xs font-mono hover:bg-stone-700 transition-colors cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs placeholder:text-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1.5">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs placeholder:text-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1.5">Party Size</label>
                  <select
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="1">1 Person (Quiet Bar Seat)</option>
                    <option value="2">2 Persons (Standard Table)</option>
                    <option value="4">4 Persons (Booth)</option>
                    <option value="6+">6+ Persons (Courtyard Big Table)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1.5">Preferred Slot</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="08:30 AM">08:30 AM (Early Roast &amp; Bakes)</option>
                    <option value="11:30 AM">11:30 AM (Popular Brunch Slot)</option>
                    <option value="03:30 PM">03:30 PM (Quiet Work Session)</option>
                    <option value="07:30 PM">07:30 PM (Evening Dinner &amp; Brews)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-200 mb-1.5">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. High-chair needed, quiet corner for laptop work, pet accompanying"
                  value={resSpecialReq}
                  onChange={(e) => setResSpecialReq(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-white text-xs placeholder:text-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  Submit Table Reservation
                </button>
                <a
                  href={`https://wa.me/?text=Hi%20Ember%20and%20Bean,%20I%20would%20like%20to%20reserve%20a%20table%20for%20${resGuests}%20guests%20at%20${encodeURIComponent(resTime)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Instant WhatsApp Booking
                </a>
              </div>

            </form>
          )}

        </div>

      </section>

      {/* 9. PROFESSIONAL CAFE FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#080706] text-stone-400 py-12 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span>Ember &amp; Bean Coffee Studio</span>
              </div>
              <p className="text-stone-400 text-xs max-w-sm leading-relaxed font-sans">
                Dedicated specialty coffee roasters, sourdough bakers, and purveyors of quiet morning rituals in Indiranagar, Bengaluru.
              </p>
              <div className="text-[11px] text-amber-400 pt-1">
                Fictional Concept Prototype built by Vibhor Verma
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Quick Navigation</div>
              <ul className="space-y-1.5 text-stone-400">
                <li><a href="#menu" className="hover:text-amber-300 transition-colors">Digital Food Menu</a></li>
                <li><a href="#hours-location" className="hover:text-amber-300 transition-colors">Hours &amp; Location Map</a></li>
                <li><a href="#gallery" className="hover:text-amber-300 transition-colors">Roastery Photo Tour</a></li>
                <li><a href="#reserve" className="hover:text-amber-300 transition-colors">Book a Table</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px]">Direct Contact</div>
              <ul className="space-y-1.5 text-stone-400">
                <li><span>Phone: +91 98765 43210</span></li>
                <li><span>Email: hello@emberandbean.fake</span></li>
                <li><span>WhatsApp: Concierge Available</span></li>
                <li><span>FSSAI License: 11223344000000 (Sample)</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Ember &amp; Bean Roastery. Designed by Vibhor Verma.
            </div>
            <a
              href="/"
              className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Vibhor's Main Portfolio
            </a>
          </div>

        </div>
      </footer>

      {/* 10. STICKY MOBILE ACTION BAR — ESSENTIAL FOR HIGH MOBILE CONVERSION */}
      <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-amber-900/40 bg-[#120E0A]/95 backdrop-blur-lg px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#menu"
          className="flex-1 py-2 rounded-lg bg-stone-900 border border-white/10 text-white text-[11px] font-mono font-bold text-center flex items-center justify-center gap-1"
        >
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          Menu
        </a>
        <a
          href="#hours-location"
          className="flex-1 py-2 rounded-lg bg-stone-900 border border-white/10 text-white text-[11px] font-mono font-bold text-center flex items-center justify-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          Map
        </a>
        <a
          href="#reserve"
          className="flex-1 py-2 rounded-lg bg-amber-500 text-stone-950 text-[11px] font-mono font-bold text-center flex items-center justify-center gap-1 shadow"
        >
          <Calendar className="w-3.5 h-3.5" />
          Reserve
        </a>
      </div>

    </div>
  );
}