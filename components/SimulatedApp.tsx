
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XCircle, Search, Clock, 
  Database, RefreshCw, GitMerge, PlayCircle, FileText, 
  BarChart3, Server, ArrowRight, Zap,
  Layers, Activity,
  ShoppingBag, CreditCard, Terminal, ShieldCheck, CheckCircle2,
  AlertTriangle, Check, ArrowDown
} from 'lucide-react';

// --- CONFIGURATION ---

const SCENES = {
  PROBLEM: 0,
  SOLUTION: 1,
  OVERVIEW: 2,
  FEATURES: 3,
  TREE_FLOW: 4,
  OUTRO: 5
};

const FEATURE_STEPS = {
  INGESTION: 0,
  STORAGE: 1,
  RETRY: 2,
  FAILOVER: 3,
  REPLAY: 4,
  LOGS: 5,
  MONITORING: 6
};

// Precise timing per script (ms)
const TIMELINE = {
  [SCENES.PROBLEM]: 6000,
  [SCENES.SOLUTION]: 3000,
  [SCENES.OVERVIEW]: 4000,
  [SCENES.FEATURES]: 16000, // ~2.2s per feature
  [SCENES.TREE_FLOW]: 16000, // Extended slightly for full 7-stage narrative
  [SCENES.OUTRO]: 5000 
};

const SimulatedApp: React.FC = () => {
  const [scene, setScene] = useState(SCENES.PROBLEM);
  const [featureStep, setFeatureStep] = useState(0);

  // Scaling Logic
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Base dimensions for coordinate systems
  const DESKTOP_BASE = { w: 700, h: 394 }; // 16:9 approx
  const MOBILE_BASE = { w: 400, h: 533 };  // 3:4 approx

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const currentWidth = containerRef.current.offsetWidth;
        // Determine mobile state based on container width
        const mobile = currentWidth < 500;
        setIsMobile(mobile);

        const baseW = mobile ? MOBILE_BASE.w : DESKTOP_BASE.w;
        setScale(currentWidth / baseW);
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    handleResize();

    return () => observer.disconnect();
  }, []);

  // Main Sequencer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let featureInterval: ReturnType<typeof setInterval>;

    const runSequence = (s: number) => {
      if (s > SCENES.OUTRO) {
        setScene(SCENES.PROBLEM);
        setFeatureStep(0);
        runSequence(SCENES.PROBLEM);
        return;
      }

      setScene(s);

      if (s === SCENES.FEATURES) {
        let fStep = 0;
        setFeatureStep(0);
        featureInterval = setInterval(() => {
          fStep++;
          if (fStep > FEATURE_STEPS.MONITORING) {
            clearInterval(featureInterval);
          } else {
            setFeatureStep(fStep);
          }
        }, 2200); 
      } else {
        if (featureInterval) clearInterval(featureInterval);
      }

      timeout = setTimeout(() => {
        runSequence(s + 1);
      }, TIMELINE[s as keyof typeof TIMELINE]);
    };

    runSequence(scene);

    return () => {
      clearTimeout(timeout);
      if (featureInterval) clearInterval(featureInterval);
    };
  }, []);

  // Calculate dynamic styles based on mobile state
  const baseWidth = isMobile ? MOBILE_BASE.w : DESKTOP_BASE.w;
  const baseHeight = isMobile ? MOBILE_BASE.h : DESKTOP_BASE.h;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5 transition-all duration-300 ${isMobile ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}
    >
      <div 
        style={{
          width: baseWidth,
          height: baseHeight, 
          transform: scale ? `scale(${scale})` : 'none',
          transformOrigin: 'top left',
          opacity: scale ? 1 : 0,
          transition: 'opacity 0.2s ease-in'
        }}
        className="flex flex-col bg-[#F8FAFC] font-sans select-none overflow-hidden"
      >
      
        {/* Header Chrome */}
        <div className="h-9 bg-white border-b border-slate-100 flex items-center px-4 justify-between z-40 shrink-0">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1 rounded text-[10px] font-mono font-medium text-slate-500 border border-slate-100">
            <span>demo://abienrix-v0/live</span>
          </div>
          <div className="w-8"></div>
        </div>

        {/* Main Stage */}
        <div className="flex-1 relative bg-[#F8FAFC] overflow-hidden">
          <AnimatePresence mode="wait">
            
            {scene === SCENES.PROBLEM && <SceneProblem isMobile={isMobile} />}
            {scene === SCENES.SOLUTION && <SceneSolution isMobile={isMobile} />}
            {scene === SCENES.OVERVIEW && <SceneOverview isMobile={isMobile} />}
            {scene === SCENES.FEATURES && <SceneFeatures step={featureStep} isMobile={isMobile} />}
            {scene === SCENES.TREE_FLOW && <SceneTreeFlow isMobile={isMobile} />}
            {scene === SCENES.OUTRO && <SceneOutro isMobile={isMobile} />}

          </AnimatePresence>
        </div>

        {/* Timeline Progress Bar */}
        <div className="h-1 bg-slate-100 w-full relative z-50 shrink-0">
          <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: `${((scene + (scene === SCENES.FEATURES ? (featureStep/7) : 0)) / 6) * 100}%` }}
              transition={{ ease: "linear" }}
          />
        </div>

      </div>
    </div>
  );
};

// --- SCENE COMPONENTS ---

const SceneProblem = ({ isMobile }: { isMobile: boolean }) => (
  <motion.div
    key="problem"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className={`absolute inset-0 flex flex-col items-center justify-center bg-white ${isMobile ? 'p-6' : 'p-12'}`}
  >
    <div className={`space-y-4 mb-12 w-full max-w-md ${isMobile ? 'pl-0 text-center' : 'pl-8 text-left'}`}>
      {[
        { text: 'Webhooks fail.', icon: XCircle, color: 'text-red-500' },
        { text: 'Endpoints go down.', icon: Server, color: 'text-red-500' },
        { text: 'Events disappear.', icon: Search, color: 'text-slate-400' },
        { text: 'Debugging is painful.', icon:  Clock, color: 'text-orange-500' }
      ].map((line, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: i * 0.8 }}
          className={`flex items-center space-x-3 text-2xl font-bold text-slate-900 font-mono tracking-tight ${isMobile ? 'justify-center' : ''}`}
        >
           <line.icon size={24} className={line.color} />
           <span>{line.text}</span>
        </motion.div>
      ))}
    </div>
    <motion.div
       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5 }}
       className="text-sm font-medium text-slate-600 bg-slate-50 px-6 py-2 rounded-full border border-slate-100 text-center"
    >
       Developers deserve a reliable way to receive events.
    </motion.div>
  </motion.div>
);

const SceneSolution = ({ isMobile }: { isMobile: boolean }) => (
  <motion.div
    key="solution"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="bg-blue-600 text-white p-4 rounded-2xl mb-4 shadow-xl shadow-blue-200">
        <Zap size={40} fill="currentColor" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">ABIENRIx-v0</h1>
      <p className="text-slate-500 font-medium text-lg uppercase tracking-widest text-xs mb-8">The Webhook Reliability Engine</p>
      
      <div className={`flex flex-wrap justify-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-50 px-4 py-3 rounded-lg border border-slate-100 max-w-xs ${isMobile ? 'flex-col items-center space-y-1' : 'items-center space-x-1'}`}>
         {['Capture', 'Store', 'Retry', 'Failover', 'Deliver', 'Monitor'].map((step, i) => (
           <React.Fragment key={step}>
             <motion.span 
               initial={{ color: '#94a3b8' }} 
               animate={{ color: '#0f172a' }} 
               transition={{ delay: 0.5 + (i * 0.2) }}
             >
               {step}
             </motion.span>
             {i < 5 && (
                isMobile ? 
                <ArrowDown size={10} className="text-slate-300 my-0.5" /> : 
                <ArrowRight size={10} className="mx-1 text-slate-300" />
             )}
           </React.Fragment>
         ))}
      </div>
    </motion.div>
  </motion.div>
);

const SceneOverview = ({ isMobile }: { isMobile: boolean }) => (
  <motion.div
    key="overview"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-8"
  >
     <div className={`grid gap-4 w-full max-w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
       {['Projects', 'Ingestion', 'Durable Storage', 'Retry Engine', 'Failover Logic', 'Monitoring'].map((item, i) => (
         <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: i * 0.15 }}
            className="bg-white h-24 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-2 hover:border-blue-500 transition-colors"
         >
            <div className={`w-2 h-2 rounded-full mb-2 ${i < 2 ? 'bg-blue-500' : i < 4 ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{item}</span>
         </motion.div>
       ))}
     </div>
     <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="mt-8 text-slate-500 text-sm font-medium text-center"
     >
        Guaranteed delivery for every event.
     </motion.p>
  </motion.div>
);

const SceneFeatures = ({ step, isMobile }: { step: number, isMobile: boolean }) => {
  const features = [
    { title: "Unified Ingestion", desc: "One endpoint replaces every webhook integration.", icon: Layers },
    { title: "Durable Storage", desc: "Events are saved before delivery — never lost.", icon: Database },
    { title: "Smart Retry Engine", desc: "Automatic retries with adaptive backoff.", icon: RefreshCw },
    { title: "Failover Delivery", desc: "If primary is down, ABIENRIx reroutes instantly.", icon: GitMerge },
    { title: "Manual Replay", desc: "Replay failed events with full context.", icon: PlayCircle },
    { title: "Developer Logs", desc: "See the full delivery truth, attempt by attempt.", icon: FileText },
    { title: "Monitoring", desc: "Reliability at a glance.", icon: Activity },
  ];

  const current = features[step] || features[0];
  const Icon = current.icon;

  return (
    <div className={`absolute inset-0 bg-white flex flex-col items-center justify-center text-center ${isMobile ? 'p-6' : 'p-12'}`}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center w-full"
        >
          {/* Visual Container based on Step */}
          <div className={`${isMobile ? 'h-40' : 'h-48'} w-full max-w-lg mb-8 flex items-center justify-center`}>
             {step === 0 && (
                <div className="flex items-center space-x-4">
                   <div className="flex flex-col space-y-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><ShoppingBag size={20}/></div>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><CreditCard size={20}/></div>
                   </div>
                   <div className="h-px w-12 bg-slate-300 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-[3px] border-4 border-transparent border-l-slate-300"></div></div>
                   <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-xl">
                      API
                   </div>
                </div>
             )}
             {step === 1 && (
                 <div className="relative">
                    <Database size={isMobile ? 60 : 80} className="text-slate-200" strokeWidth={1} />
                    <motion.div 
                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-mono shadow-lg"
                       initial={{ scale: 0 }} animate={{ scale: 1 }}
                    >
                       id: evt_892
                    </motion.div>
                 </div>
             )}
             {step === 2 && (
                 <div className="w-full max-w-xs space-y-3">
                    <div className="flex items-center justify-between text-xs text-red-500 font-mono opacity-50"><span className="flex items-center"><XCircle size={12} className="mr-2"/> Attempt 1</span> <span>500 Error</span></div>
                    <div className="flex items-center justify-between text-xs text-red-500 font-mono opacity-75"><span className="flex items-center"><XCircle size={12} className="mr-2"/> Attempt 2</span> <span>Timeout</span></div>
                    <div className="flex items-center justify-between text-xs text-green-600 font-mono font-bold bg-green-50 p-2 rounded border border-green-200"><span className="flex items-center"><CheckCircle2 size={12} className="mr-2"/> Attempt 3</span> <span>200 OK</span></div>
                 </div>
             )}
             {step === 3 && (
                 <div className="flex items-center space-x-6">
                     <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 font-mono text-xs">Primary</div>
                     <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                           <div className="w-12 h-px bg-red-400"></div>
                           <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-500"><XCircle size={14}/></div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="w-12 h-px bg-orange-400"></div>
                           <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-500 border border-orange-200"><Server size={14}/></div>
                        </div>
                     </div>
                 </div>
             )}
             {step === 4 && (
                 <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                     <div className="text-xs font-mono text-slate-500">evt_99</div>
                     <ArrowRight size={14} className="text-slate-300"/>
                     <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
                     >
                        <PlayCircle size={18} />
                     </motion.button>
                     <ArrowRight size={14} className="text-green-500"/>
                     <div className="text-xs font-bold text-green-600">Delivered</div>
                 </div>
             )}
             {step === 5 && (
                 <div className="w-full max-w-sm bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 shadow-xl text-left">
                     <div className="text-red-400 mb-1 flex justify-between">
                         <span>Attempt 1: 504</span>
                         <span>12s</span>
                     </div>
                     <div className="text-green-400 mb-2 flex justify-between border-t border-slate-700 pt-1">
                         <span>Attempt 2: 200 OK</span>
                         <span>120ms</span>
                     </div>
                     <div className="opacity-50 border-l border-slate-700 pl-2 mb-2">
                         POST /webhooks
                     </div>
                 </div>
             )}
             {step === 6 && (
                 <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                     <div className="bg-white border border-slate-200 p-3 rounded shadow-sm">
                         <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Success</div>
                         <div className="text-lg font-bold text-slate-900">99.99%</div>
                     </div>
                     <div className="bg-white border border-slate-200 p-3 rounded shadow-sm">
                         <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Latency</div>
                         <div className="text-lg font-bold text-slate-900">42ms</div>
                     </div>
                     <div className="col-span-2 bg-white border border-slate-200 p-3 rounded shadow-sm flex items-end justify-between h-12">
                         {[40, 60, 45, 70, 30, 80, 50, 65, 90, 40].map((h, i) => (
                             <div key={i} className="w-2 bg-blue-500 rounded-t" style={{ height: `${h}%` }}></div>
                         ))}
                     </div>
                 </div>
             )}
          </div>

          {/* Text Content */}
          <div className="bg-blue-50 p-3 rounded-xl mb-4 text-blue-600">
             <Icon size={isMobile ? 24 : 32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{current.title}</h2>
          <p className="text-slate-500 text-sm md:text-lg">{current.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- CINEMATIC TREE FLOW ANIMATION COMPONENT ---

const FLOW_STAGES = {
    CHAOS: 0,      // 0-2s
    PROBLEM: 1,    // 2-3s
    SOLUTION: 2,   // 3-4s
    PIPELINE: 3,   // 4-7s
    FAILOVER: 4,   // 7-10s
    RECOVERY: 5,   // 10-12s
    TRUTH: 6       // 12-14s
};

const SceneTreeFlow = ({ isMobile }: { isMobile: boolean }) => {
    const [stage, setStage] = useState(FLOW_STAGES.CHAOS);

    useEffect(() => {
        const times = [2000, 1000, 1000, 3000, 3000, 2000, 2000]; // Durations
        let currentStage = 0;

        const nextStage = () => {
            if (currentStage < 6) {
                currentStage++;
                setStage(currentStage);
                setTimeout(nextStage, times[currentStage]);
            }
        };

        const timer = setTimeout(nextStage, times[0]);
        return () => clearTimeout(timer);
    }, []);

    // Layout Constants
    const CENTER_X = isMobile ? 200 : 350;
    const CENTER_Y = isMobile ? 260 : 200; // Center coordinate of the "ABIENRIx" node

    return (
        <div className="absolute inset-0 bg-white flex flex-col font-sans select-none overflow-hidden">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

            {/* --- NARRATIVE TEXT OVERLAY --- */}
            <div className={`absolute z-50 ${isMobile ? 'top-6 left-0 right-0 text-center px-4' : 'bottom-8 left-8 text-left'}`}>
                <AnimatePresence mode="wait">
                    {stage <= FLOW_STAGES.PROBLEM && (
                        <motion.div key="text1" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-slate-500 text-sm font-medium">
                            Real systems run on events.<br/><span className="text-slate-900 font-bold">Real systems also fail.</span>
                        </motion.div>
                    )}
                    {stage === FLOW_STAGES.PROBLEM && (
                         <motion.div key="text2" initial={{opacity:0}} animate={{opacity:1}} className="text-red-600 text-sm font-bold mt-2">
                             Without reliability, events vanish.
                         </motion.div>
                    )}
                    {stage === FLOW_STAGES.SOLUTION && (
                        <motion.div key="text3" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-slate-900 text-sm font-bold">
                            The point where chaos becomes certainty.
                        </motion.div>
                    )}
                    {stage === FLOW_STAGES.PIPELINE && (
                        <motion.div key="text4" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-slate-600 text-sm">
                            Captured, stored, guaranteed.
                        </motion.div>
                    )}
                    {stage >= FLOW_STAGES.FAILOVER && stage < FLOW_STAGES.TRUTH && (
                        <motion.div key="text5" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-slate-900 text-sm font-bold">
                            When your system breaks, your events don’t.
                            {stage === FLOW_STAGES.RECOVERY && <div className="text-green-600 mt-1">Auto recovery & replay.</div>}
                        </motion.div>
                    )}
                    {stage === FLOW_STAGES.TRUTH && (
                        <motion.div key="text6" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-slate-900 text-sm font-bold">
                            ABIENRIx-v0<br/><span className="text-slate-500 font-normal">Reliability as an infrastructure layer.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- MAIN STAGE --- */}
            <div className="flex-1 relative">
                
                {/* 1. SOURCES */}
                {/* Desktop: Left Column | Mobile: Top Row */}
                <div className={`absolute flex ${isMobile ? 'top-[80px] left-0 right-0 justify-center space-x-4' : 'left-6 top-1/2 -translate-y-1/2 flex-col space-y-12'}`}>
                    {['STRIPE', 'SHOPIFY'].map((name, i) => (
                        <div key={name} className="relative group flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-900 tracking-wider mb-1">{name}</div>
                            <div className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                {i===0 ? '{"pay":"ok"}' : '{"ord":"new"}'}
                            </div>
                            
                            {/* Arrows Source -> Center */}
                            {/* Desktop: Horizontal Line */}
                            {!isMobile && (
                              <div className="absolute left-full top-1/2 ml-4 w-32 h-[1px] bg-slate-100 overflow-hidden">
                                  {stage < FLOW_STAGES.SOLUTION ? (
                                      <FlickeringArrow delay={i * 0.3} dying={stage === FLOW_STAGES.PROBLEM} />
                                  ) : (
                                      <StableArrow delay={i * 0.2} />
                                  )}
                              </div>
                            )}

                            {/* Mobile: Vertical Line Down */}
                            {isMobile && (
                               <div className="absolute top-full left-1/2 -ml-[1px] mt-2 h-24 w-[1px] bg-slate-100 overflow-hidden">
                                   {stage < FLOW_STAGES.SOLUTION ? (
                                       <FlickeringArrowVertical delay={i * 0.3} dying={stage === FLOW_STAGES.PROBLEM} />
                                   ) : (
                                       <StableArrowVertical delay={i * 0.2} />
                                   )}
                               </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 2. CENTER NODE (ABIENRIx) */}
                <motion.div 
                    style={{ 
                        left: '50%', 
                        top: isMobile ? '50%' : '50%', 
                        x: '-50%', 
                        y: '-50%' 
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                        opacity: stage >= FLOW_STAGES.SOLUTION ? 1 : 0,
                        scale: stage >= FLOW_STAGES.SOLUTION ? 1 : 0.95
                    }}
                    transition={{ duration: 0.8 }}
                    className={`absolute bg-white rounded-lg border-2 border-slate-900 shadow-2xl z-20 flex flex-col overflow-hidden ${isMobile ? 'w-[300px] h-[120px]' : 'w-[320px] h-[140px]'}`}
                >
                    <div className="h-7 border-b border-slate-100 flex items-center justify-center bg-slate-50">
                        <span className="text-[10px] font-bold text-slate-900 tracking-widest">ABIENRIx-v0</span>
                    </div>
                    
                    {/* Internal Pipeline Animation */}
                    <div className="flex-1 flex items-center justify-between px-4 relative">
                         {['CAPTURE', 'STORE', 'RETRY', 'ROUTE'].map((step, i) => (
                             <div key={step} className="flex flex-col items-center relative z-10">
                                 <div className={`w-2 h-2 rounded-full mb-1 transition-colors duration-300 ${stage >= FLOW_STAGES.PIPELINE ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                                 <span className={`text-[8px] font-bold tracking-wider transition-colors duration-300 ${stage >= FLOW_STAGES.PIPELINE ? 'text-slate-900' : 'text-slate-300'}`}>{step}</span>
                             </div>
                         ))}
                         {/* Connecting Line */}
                         <div className="absolute left-6 right-6 top-[22px] h-[1px] bg-slate-100">
                             {stage >= FLOW_STAGES.PIPELINE && (
                                 <PipelineArrow />
                             )}
                         </div>
                    </div>
                </motion.div>

                {/* 3. DESTINATIONS */}
                {/* Desktop: Right Column | Mobile: Bottom Row */}
                <div className={`absolute flex ${isMobile ? 'bottom-[40px] left-0 right-0 justify-center space-x-6' : 'right-6 top-1/2 -translate-y-1/2 flex-col space-y-16'}`}>
                    {/* Primary */}
                    <div className="relative flex flex-col items-center">
                        <div className={`text-xs font-bold tracking-wider mb-1 transition-colors text-center ${stage === FLOW_STAGES.FAILOVER ? 'text-red-500' : 'text-slate-900'}`}>
                            APP <span className="text-[9px] opacity-50 font-normal">(Primary)</span>
                        </div>
                        <div className={`w-32 h-8 rounded border flex items-center justify-center transition-colors ${stage === FLOW_STAGES.FAILOVER ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
                            {stage === FLOW_STAGES.FAILOVER ? <XCircle size={14}/> : <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                        </div>
                        
                        {/* Success Badge */}
                        <AnimatePresence>
                            {(stage >= FLOW_STAGES.SOLUTION && stage !== FLOW_STAGES.FAILOVER) && (
                                <motion.div 
                                   initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                   className={`absolute bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded ${isMobile ? '-right-2 -top-2' : '-left-20 top-2'}`}
                                >
                                   200 OK
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Failover */}
                    <div className="relative flex flex-col items-center">
                         <div className="text-xs font-bold text-slate-400 tracking-wider mb-1 text-center">
                            BACKUP
                        </div>
                        <div className="w-32 h-8 rounded border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-300">
                             <Database size={14} />
                        </div>

                         {/* Stored Badge */}
                         <AnimatePresence>
                            {stage === FLOW_STAGES.FAILOVER && (
                                <motion.div 
                                   initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                   className={`absolute bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center ${isMobile ? '-right-4 -top-2' : '-left-24 top-2'}`}
                                >
                                   <Database size={8} className="mr-1"/> STORED
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Connecting Lines Center -> Right (Desktop) / Center -> Bottom (Mobile) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {!isMobile ? (
                        /* Desktop Paths */
                        <g transform={`translate(${CENTER_X + 160}, ${CENTER_Y})`}>
                            {/* Primary Path */}
                            <path d="M0,0 C50,0 50,-50 100,-50" fill="none" stroke={stage === FLOW_STAGES.FAILOVER ? '#FECACA' : '#E2E8F0'} strokeWidth="1.5" />
                            {/* Failover Path */}
                            <path d="M0,0 C50,0 50,50 100,50" fill="none" stroke={stage === FLOW_STAGES.FAILOVER ? '#FDBA74' : '#F1F5F9'} strokeWidth="1.5" strokeDasharray="4 4" />
                            
                            {stage >= FLOW_STAGES.SOLUTION && stage !== FLOW_STAGES.FAILOVER && (
                                <FlowDotOnPath path="M0,0 C50,0 50,-50 100,-50" color="#10B981" delay={0} />
                            )}
                             {stage === FLOW_STAGES.FAILOVER && (
                                <FlowDotOnPath path="M0,0 C50,0 50,50 100,50" color="#F97316" delay={0} />
                            )}
                             {stage === FLOW_STAGES.RECOVERY && (
                                <motion.circle r="3" fill="#2563EB" initial={{ offsetDistance: "100%" }} animate={{ offsetDistance: "0%" }} style={{ offsetPath: 'path("M0,0 C50,0 50,50 100,50")' }} transition={{ duration: 1, repeat: 2 }} />
                            )}
                        </g>
                    ) : (
                        /* Mobile Paths (Vertical) */
                        <g transform={`translate(${CENTER_X}, ${CENTER_Y + 60})`}>
                             {/* Downward to Primary (Leftish) */}
                            <path d="M0,0 C0,30 -40,30 -75,60" fill="none" stroke={stage === FLOW_STAGES.FAILOVER ? '#FECACA' : '#E2E8F0'} strokeWidth="1.5" />
                            {/* Downward to Backup (Rightish) */}
                            <path d="M0,0 C0,30 40,30 75,60" fill="none" stroke={stage === FLOW_STAGES.FAILOVER ? '#FDBA74' : '#F1F5F9'} strokeWidth="1.5" strokeDasharray="4 4" />
                            
                            {stage >= FLOW_STAGES.SOLUTION && stage !== FLOW_STAGES.FAILOVER && (
                                <FlowDotOnPath path="M0,0 C0,30 -40,30 -75,60" color="#10B981" delay={0} />
                            )}
                            {stage === FLOW_STAGES.FAILOVER && (
                                <FlowDotOnPath path="M0,0 C0,30 40,30 75,60" color="#F97316" delay={0} />
                            )}
                            {stage === FLOW_STAGES.RECOVERY && (
                                <motion.circle r="3" fill="#2563EB" initial={{ offsetDistance: "100%" }} animate={{ offsetDistance: "0%" }} style={{ offsetPath: 'path("M0,0 C0,30 40,30 75,60")' }} transition={{ duration: 1, repeat: 2 }} />
                            )}
                        </g>
                    )}
                </svg>
            </div>

            {/* --- TRUTH STATS (Bottom) --- */}
            <AnimatePresence>
                {stage === FLOW_STAGES.TRUTH && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 right-4 flex space-x-6 z-50 bg-white/90 p-2 rounded-lg backdrop-blur-sm border border-slate-100"
                    >
                         <div className="text-right">
                             <div className="text-lg font-bold text-slate-900">100%</div>
                             <div className="text-[9px] uppercase font-bold text-slate-400">Captured</div>
                         </div>
                         <div className="text-right">
                             <div className="text-lg font-bold text-slate-900">0</div>
                             <div className="text-[9px] uppercase font-bold text-slate-400">Lost</div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- VISUAL HELPERS ---

const FlickeringArrow = ({ delay, dying }: { delay: number, dying: boolean }) => (
    <motion.div 
        className="h-full bg-slate-900 w-[2px] absolute top-0"
        initial={{ left: -10, opacity: 0 }}
        animate={{ 
            left: dying ? "60%" : "100%", 
            opacity: dying ? [1, 1, 0] : [0, 1, 1, 0] 
        }}
        transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: delay,
            ease: "linear"
        }}
    />
);

const StableArrow = ({ delay }: { delay: number }) => (
    <motion.div 
        className="h-full bg-slate-900 w-[2px] absolute top-0"
        initial={{ left: -10, opacity: 0 }}
        animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: delay, ease: "linear" }}
    />
);

const FlickeringArrowVertical = ({ delay, dying }: { delay: number, dying: boolean }) => (
    <motion.div 
        className="w-full bg-slate-900 h-[2px] absolute left-0"
        initial={{ top: -10, opacity: 0 }}
        animate={{ 
            top: dying ? "60%" : "100%", 
            opacity: dying ? [1, 1, 0] : [0, 1, 1, 0] 
        }}
        transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: delay,
            ease: "linear"
        }}
    />
);

const StableArrowVertical = ({ delay }: { delay: number }) => (
    <motion.div 
        className="w-full bg-slate-900 h-[2px] absolute left-0"
        initial={{ top: -10, opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: delay, ease: "linear" }}
    />
);

const PipelineArrow = () => (
    <motion.div 
        className="h-full bg-blue-600 w-[20px] rounded-full absolute top-0"
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
);


const SceneOutro = ({ isMobile }: { isMobile: boolean }) => (
  <motion.div
    key="outro"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center"
  >
     <motion.div 
        className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative"
        animate={{ boxShadow: ["0 0 0 0px rgba(37, 99, 235, 0.2)", "0 0 0 20px rgba(37, 99, 235, 0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
     >
        <ShieldCheck size={40} className="text-blue-600" />
     </motion.div>
     
     <h1 className="text-3xl font-bold text-slate-900 mb-2">ABIENRIx-v0</h1>
     <p className="text-lg text-slate-500 font-medium max-w-md mx-auto">
        Reliability as an infrastructure layer.<br/>Every event delivered. Always.
     </p>
  </motion.div>
);

// --- UTILS ---

const FlowDotOnPath = ({ path, color, delay }: any) => (
    <motion.div
        className="absolute w-2 h-2 rounded-full -ml-1 -mt-1"
        style={{ backgroundColor: color, offsetPath: `path("${path}")` }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: delay, repeat: Infinity, repeatDelay: 1 }}
    />
);

export default SimulatedApp;
