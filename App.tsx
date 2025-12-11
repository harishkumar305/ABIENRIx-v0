
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, CheckCircle, ArrowRight, Layout, RefreshCw, 
  Zap, ShieldCheck, Activity, Clock, TrendingDown, Moon,
  XCircle, Smartphone, Globe, Webhook, FileJson, AlertCircle, BarChart, TrendingUp, GitFork, 
  Database, Cloud, Mail, CreditCard, Lock, Server, Cpu, Users, Layers, AlertTriangle, Check,
  Terminal, Sparkles, MinusCircle, PlusCircle, Shield, ScanSearch, Plus, Minus, AlertOctagon
} from 'lucide-react';
import { NAV_ITEMS } from './constants';
import SimulatedApp from './components/SimulatedApp';
import WaitlistForm from './components/WaitlistForm';

// --- CUSTOM LOGO COMPONENT ---
const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.5 2.5L4 21.5H10.5L13 15.5C13.8 13.5 15.5 13.5 16.5 14.5L17.5 16L13.5 2.5H12.5Z" />
    <path d="M18 16.5L19.5 21.5H23L21 15C20 15 18.5 15.5 18 16.5Z" />
  </svg>
);

// --- VISUAL ANIMATION COMPONENT FOR COMPARISON ---
const ComparisonVisual = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      
      {/* BEFORE: CHAOS */}
      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 relative overflow-hidden h-64 flex flex-col items-center justify-center">
         <div className="absolute top-4 left-4 text-xs font-bold text-red-400 uppercase tracking-widest">Without ABIENRIx-v0</div>
         
         {/* Chaos Animation */}
         <div className="relative w-full h-full flex items-center justify-between px-8">
            {/* Source */}
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center z-10">
               <Webhook size={20} className="text-slate-400"/>
            </div>

            {/* Path */}
            <div className="flex-1 relative h-px bg-red-200 mx-4">
               {/* Dropped Packets */}
               {[0, 1, 2].map(i => (
                 <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-red-500 rounded-full top-1/2 -mt-1"
                    initial={{ left: "0%", opacity: 1, y: 0 }}
                    animate={{ 
                      left: ["0%", "40%", "45%"],
                      y: [0, 0, 20],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.8,
                      ease: "linear"
                    }}
                 />
               ))}
               {/* X Markers */}
               <motion.div 
                  className="absolute left-[45%] top-2 text-red-500"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, times: [0.4, 0.5, 0.6] }}
               >
                 <X size={12} strokeWidth={4} />
               </motion.div>
            </div>

            {/* Dest (Broken) */}
            <div className="w-12 h-12 bg-white border border-red-200 rounded-lg shadow-sm flex items-center justify-center relative z-10">
               <Server size={20} className="text-red-400"/>
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
         </div>
         <div className="mt-4 text-xs font-mono text-red-500 bg-red-100 px-2 py-1 rounded">502 Bad Gateway</div>
      </div>

      {/* AFTER: ORDER */}
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden h-64 flex flex-col items-center justify-center">
         <div className="absolute top-4 left-4 text-xs font-bold text-emerald-600 uppercase tracking-widest">With ABIENRIx-v0</div>
         
         {/* Order Animation */}
         <div className="relative w-full h-full flex items-center justify-between px-8">
            {/* Source */}
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center z-10">
               <Webhook size={20} className="text-slate-400"/>
            </div>

            {/* Path */}
            <div className="flex-1 relative h-px bg-emerald-200 mx-4 flex items-center">
                {/* Buffer Zone */}
               <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-16 h-8 bg-emerald-100/50 rounded border border-emerald-200 flex items-center justify-center space-x-1">
                  {[0,1,2].map(i => (
                     <motion.div 
                        key={i}
                        className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                     />
                  ))}
               </div>

               {/* Success Packet */}
               <motion.div
                    className="absolute w-2 h-2 bg-emerald-500 rounded-full top-1/2 -mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               />
            </div>

            {/* Dest (Healthy) */}
            <div className="w-12 h-12 bg-white border border-emerald-200 rounded-lg shadow-sm flex items-center justify-center relative z-10">
               <Server size={20} className="text-emerald-500"/>
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Check size={8} className="text-white" strokeWidth={4} />
               </div>
            </div>
         </div>
         <div className="mt-4 text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">200 OK (Retried)</div>
      </div>

    </div>
  );
}

// --- FAQ COMPONENT ---
const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className={`text-base md:text-lg font-medium pr-8 transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 transition-all duration-300 transform ${isOpen ? 'rotate-180' : ''}`}>
           {isOpen ? (
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
               <Minus size={16} />
             </div>
           ) : (
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600">
               <Plus size={16} />
             </div>
           )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-slate-600 leading-relaxed text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);

  // Smooth Scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const problemItems = [
    { text: "Payments succeed but accounts don’t update", icon: CreditCard },
    { text: "Orders get created but your system never sees them", icon: FileJson },
    { text: "AI workflows trigger but agents never execute", icon: Sparkles },
    { text: "Backend slowdowns delete entire pipelines", icon: TrendingDown },
    { text: "Deployments cause missed events you’ll never detect", icon: GitFork },
    { text: "Providers retry unpredictably — and stop silently", icon: AlertOctagon },
  ];

  const solutionItems = [
    { title: "Write-first durability", desc: "Events saved before delivery" },
    { title: "Smart retries", desc: "Automatic recovery from failures" },
    { title: "Auto-generated backup endpoint", desc: "Failover even without infra" },
    { title: "Health-aware routing", desc: "Waits until your app is stable" },
    { title: "Delivery timeline", desc: "Full visibility into what happened" },
    { title: "One-click replay", desc: "Fix state instantly" },
  ];

  const faqs = [
    {
      question: "What happens if my server is down when a webhook arrives?",
      answer: "ABIENRIx stores the event, retries it, and delivers it when your server comes back online. No setup. No lost data."
    },
    {
      question: "Why do I need this if I already have basic retries?",
      answer: "Your retries only work after your server receives the webhook. ABIENRIx protects events before your server ever sees them."
    },
    {
      question: "Do I need a backup server for failover to work?",
      answer: "No. ABIENRIx automatically gives you a backup endpoint—we handle the failover for you."
    },
    {
      question: "What problem does ABIENRIx actually solve?",
      answer: "It stops the #1 hidden failure in SaaS: lost webhook events → broken payments, orders, or workflows."
    },
    {
      question: "What makes ABIENRIx different from other webhook tools?",
      answer: (
        <div className="space-y-4">
          <p>Others retry. ABIENRIx guarantees delivery with:</p>
          <ul className="space-y-2">
            {[
              "Durable storage",
              "Instant failover",
              "Full replay",
              "Delivery timeline"
            ].map((item, i) => (
              <li key={i} className="flex items-center text-slate-800 font-medium">
                <Check className="w-4 h-4 text-emerald-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-bold text-slate-900 border-l-2 border-blue-500 pl-3">Reliability, not just routing.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* ---------------- UPDATES MODAL ---------------- */}
      <AnimatePresence>
        {isUpdatesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsUpdatesOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-0 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                 <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Latest Updates</h3>
                        <p className="text-xs text-slate-500">What's new in ABIENRIx-v0</p>
                    </div>
                 </div>
                 <button onClick={() => setIsUpdatesOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                 <div className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                    <span className="text-xs font-mono text-blue-600 font-bold mb-1 block">v0.9.2 &middot; Just now</span>
                    <h4 className="text-sm font-bold text-slate-900">Smart Retry Logic v2</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Improved backoff algorithms for high-load scenarios. Added "jitter" to prevent thundering herd problems during outages.
                    </p>
                 </div>
                 <div className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <span className="text-xs font-mono text-slate-400 font-bold mb-1 block">v0.9.1 &middot; Oct 10</span>
                    <h4 className="text-sm font-bold text-slate-900">Monitoring Dashboard</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                       Real-time latency tracking and error rate visualization. Now you can see exactly when Stripe goes down before they even tweet about it.
                    </p>
                 </div>
                 <div className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></div>
                    <span className="text-xs font-mono text-slate-400 font-bold mb-1 block">v0.9.0 &middot; Sep 28</span>
                    <h4 className="text-sm font-bold text-slate-900">Public Beta Launch</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                       We are live! Welcoming our first cohort of engineering teams to the platform.
                    </p>
                 </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                 <button onClick={() => setIsUpdatesOpen(false)} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                    Got it
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- STICKY NAV ---------------- */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-12"
      >
        <div className="font-bold text-lg tracking-tighter flex items-center space-x-2 z-50 relative">
            <Logo className="w-8 h-8 text-slate-900" />
            <span>ABIENRIx-v0</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
             <a href="#" onClick={(e) => { e.preventDefault(); setIsUpdatesOpen(true); }} className="hover:text-slate-900 transition-colors">Updates</a>
             <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="hover:text-slate-900 transition-colors">FAQ</a>
             <a href="mailto:harishakil@gmail.com" className="hover:text-slate-900 transition-colors">Contact</a>
            <button 
                onClick={() => scrollToSection('book')}
                className="ml-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-colors"
            >
                Join Waitlist
            </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
            className="md:hidden text-slate-600 z-50 relative p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 space-y-6 md:hidden"
                >
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsUpdatesOpen(true); setIsMenuOpen(false); }} className="text-xl font-medium text-slate-900 border-b border-slate-100 pb-4">Updates</a>
                    <a href="#faq" onClick={() => { setIsMenuOpen(false); scrollToSection('faq'); }} className="text-xl font-medium text-slate-900 border-b border-slate-100 pb-4">FAQ</a>
                    <a href="mailto:harishakil@gmail.com" className="text-xl font-medium text-slate-900 border-b border-slate-100 pb-4">Contact</a>
                    <button 
                        onClick={() => { scrollToSection('book'); setIsMenuOpen(false); }}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl text-lg font-bold"
                    >
                        Join Waitlist
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden bg-slate-50">
        
        {/* VIBRANT FLOATING BACKGROUNDS */}
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
           {/* Top Right Pink/Purple */}
           <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-gradient-to-b from-fuchsia-300/40 to-purple-400/30 blur-[100px] animate-blob mix-blend-multiply"></div>
           
           {/* Center Left Blue/Cyan */}
           <div className="absolute top-[20%] left-[-20%] w-[70vw] h-[70vw] lg:w-[45vw] lg:h-[45vw] rounded-full bg-gradient-to-r from-blue-300/40 to-cyan-300/30 blur-[90px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
           
           {/* Bottom Right Orange/Amber */}
           <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-gradient-to-t from-orange-300/40 to-amber-200/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
           
           {/* Noise Overlay */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-full px-3 py-1 mb-8 shadow-sm"
            >
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-600 tracking-wide uppercase">Waitlist v1 Coming Soon</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              Guaranteed <span className="relative inline-block px-1 mx-1 z-10">
                <span className="absolute inset-0 bg-lime-400 -skew-y-2 transform -z-10 rounded-sm"></span>
                <span className="relative text-slate-900">Webhook</span>
              </span> Delivery <br />
              Even When Your — App Is Offline
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 max-w-xl"
            >
              ABIENRIx-v0 ensures you never lose an event, a customer, or a night fixing webhook failures — with built-in retries, failover, durable storage, and full transparency.
            </motion.p>

            {/* Waitlist Form (Left Aligned) */}
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="w-full max-w-md relative z-20"
            >
               <WaitlistForm heroMode={true} layout="row" center={false} />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: SIMULATED APP DEMO */}
          <div className="relative w-full h-full lg:min-h-[400px] flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full rounded-xl shadow-2xl border border-white/50 bg-white/50 backdrop-blur-sm p-1"
              >
                  <div className="rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-white">
                     <SimulatedApp />
                  </div>
                  
                  {/* Decorative Elements behind app */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-2xl opacity-40 -z-10 animate-pulse"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-full blur-2xl opacity-40 -z-10 animate-pulse animation-delay-2000"></div>
              </motion.div>
          </div>

        </div>

        {/* Scroll Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 animate-pulse cursor-pointer z-20"
          onClick={() => scrollToSection('benefits')}
        >
           <span className="text-[10px] font-medium mb-1">Scroll to explore</span>
           <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ---------------- BENEFITS GRID ---------------- */}
      <section id="benefits" className="py-20 bg-white relative z-20">
         <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { 
                  icon: <Shield className="w-8 h-8 text-emerald-500" />,
                  title: "Guaranteed Delivery", 
                  desc: "Every event is stored before delivery and retried intelligently — meaning no lost webhooks, ever." 
                },
                { 
                  icon: <ScanSearch className="w-8 h-8 text-blue-500" />,
                  title: "Debug Instantly", 
                  desc: "Full event timelines, exact failure causes, and instant replay eliminate hours of debugging." 
                },
                { 
                  icon: <Moon className="w-8 h-8 text-amber-500" />,
                  title: "Relax Completely", 
                  desc: "No matter what goes down — servers, providers, networks — ABIENRIx-v0 keeps your events safe and delivers them when you return." 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="mb-4 p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform animate-pulse">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* ---------------- PROBLEM -> SOLUTION FLOW (PREMIUM UPGRADE) ---------------- */}
      <section className="py-32 bg-white relative border-y border-slate-100 overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
              
              {/* HEADLINE */}
              <div className="text-center mb-24 max-w-5xl mx-auto">
                 <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                    Everything in Your SaaS Depends on <span className="relative inline-block px-2">
                        <span className="relative z-10 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Webhooks.</span>
                        <span className="absolute inset-0 bg-blue-100/50 -skew-x-6 rounded-md -z-10 transform scale-105"></span>
                    </span>
                    <br className="hidden md:block"/>
                    <span className="font-serif italic font-medium text-4xl md:text-6xl text-slate-400 mt-4 block">But Webhooks Don’t Depend on You.</span>
                 </h2>
                 
                 <div className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                    Critical events fail silently — breaking <span className="font-semibold text-slate-900 border-b-2 border-red-100">billing</span>, <span className="font-semibold text-slate-900 border-b-2 border-red-100">orders</span>, and <span className="font-semibold text-slate-900 border-b-2 border-red-100">trust</span>.
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl shadow-slate-900/20">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            <span className="font-medium">ABIENRIx-v0 finally makes event delivery reliable.</span>
                        </div>
                    </div>
                 </div>
              </div>

              {/* PART 1: THE PAIN (LEFT) & PART 3: THE SOLUTION (RIGHT) - SPLIT VIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                  
                  {/* LEFT: THE PROBLEM */}
                  <div>
                      <div className="flex items-center space-x-3 mb-8">
                         <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                             <XCircle size={20} />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900">When Events Don’t Arrive,<br/>Your Product Breaks.</h3>
                      </div>
                      
                      <ul className="space-y-6">
                         {problemItems.map((item, i) => (
                             <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start group"
                             >
                                 <div className="flex-shrink-0 mt-1 p-1 bg-red-50 rounded text-red-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                                     <item.icon size={16} />
                                 </div>
                                 <div className="ml-4">
                                     <p className="text-slate-700 font-medium leading-relaxed">{item.text}</p>
                                 </div>
                             </motion.li>
                         ))}
                      </ul>

                      <div className="mt-10 p-6 bg-slate-50 border-l-4 border-red-400 rounded-r-xl">
                          <p className="text-slate-700 italic font-medium">
                              "One invisible webhook failure can corrupt your entire product — and users blame YOU."
                          </p>
                      </div>
                  </div>

                  {/* RIGHT: THE SOLUTION */}
                  <div className="md:mt-12 lg:mt-0">
                      <div className="flex items-center space-x-3 mb-8">
                         <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                             <Zap size={20} fill="currentColor" />
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900">Guaranteed Delivery — Even<br/>When Everything Else Fails.</h3>
                      </div>
                      
                       <div className="bg-white border border-slate-200 border-l-4 border-l-blue-500 rounded-xl p-6 shadow-sm mb-8">
                          <p className="text-lg text-slate-700 leading-relaxed font-medium">
                            <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 mr-1">ABIENRIx-v0</span> sits between providers and your backend, capturing, verifying, storing, retrying, failing-over, and delivering every event with complete consistency.
                          </p>
                       </div>

                       <ul className="grid grid-cols-1 gap-4">
                          {solutionItems.map((item, i) => (
                             <motion.li 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all bg-white shadow-sm"
                             >
                                 <CheckCircle size={18} className="text-emerald-500 flex-shrink-0 mr-3" />
                                 <div>
                                     <span className="block text-slate-900 font-bold text-sm">{item.title}</span>
                                     <span className="block text-slate-500 text-xs">{item.desc}</span>
                                 </div>
                             </motion.li>
                          ))}
                       </ul>
                  </div>

              </div>

              {/* PART 2: VISUAL MOMENT (CENTERED) */}
              <ComparisonVisual />

              {/* PART 4: EMOTIONAL & CTA */}
              <div className="mt-20 text-center max-w-2xl mx-auto">
                  <div className="inline-block mb-6 px-4 py-1 rounded-full bg-slate-100 text-slate-500 text-sm font-medium">
                      → No lost revenue. No broken workflows. No angry customers.
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">
                      Stop trusting “best effort” delivery.<br/>
                      <span className="text-blue-600">Start guaranteeing it.</span>
                  </h3>
                  
                  <div className="flex flex-col items-center">
                      <button 
                        onClick={() => scrollToSection('book')}
                        className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl flex items-center group"
                      >
                          Join the Waitlist
                          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="mt-4 text-xs text-slate-400 uppercase tracking-wide">
                          Early access limited to teams processing critical flows
                      </p>
                  </div>
              </div>

          </div>
      </section>

      {/* ---------------- FAQ SECTION ---------------- */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                  Everything you need to know about the reliability engine.
                </p>
             </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-slate-100 p-2 md:p-8"
          >
             {faqs.map((faq, index) => (
               <div key={index} className="px-4">
                 <FaqItem 
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === index}
                    onClick={() => toggleFaq(index)}
                 />
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- FOOTER / CTA ---------------- */}
      <footer id="book" className="bg-slate-900 text-white py-24 relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to make your infra boring?</h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Join the waiting list today and get early access to the reliability engine that powers the next generation of SaaS.
              </p>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 max-w-md mx-auto shadow-2xl">
                  <WaitlistForm heroMode={false} />
                  <p className="mt-4 text-xs text-slate-500">
                      No credit card required. Invite only for now.
                  </p>
              </div>

              <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                  <div className="flex items-center space-x-2 mb-4 md:mb-0">
                      <Logo className="w-6 h-6 text-white" />
                      <span className="font-bold text-white">ABIENRIx-v0</span>
                  </div>
                  <div className="flex space-x-6">
                      <a href="#" className="hover:text-white transition-colors">Privacy</a>
                      <a href="#" className="hover:text-white transition-colors">Terms</a>
                      <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  </div>
                  <div className="mt-4 md:mt-0">
                      © 2024 ABIENRIx Inc.
                  </div>
              </div>
          </div>
      </footer>

    </div>
  );
}

export default App;
