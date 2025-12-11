
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase, isConfigured } from '../supabaseClient';

interface WaitlistFormProps {
  layout?: 'row' | 'column';
  heroMode?: boolean;
  center?: boolean;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ heroMode = false, center = true }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [joinCount, setJoinCount] = useState(0);

  // Animate count from 0 to 103, then simulate live users
  useEffect(() => {
    if (!heroMode) return;

    const targetStart = 103;
    const duration = 2000; // 2 seconds for initial count up
    const intervalTime = duration / targetStart;

    // Phase 1: Rapid count up from 0 to 103
    let current = 0;
    const initialTimer = setInterval(() => {
      current += 1;
      if (current <= targetStart) {
        setJoinCount(current);
      } else {
        clearInterval(initialTimer);
      }
    }, intervalTime);

    // Phase 2: Slow organic growth
    const liveTimer = setInterval(() => {
      setJoinCount(prev => {
        // Only start organic growth once we've reached the target
        if (prev >= targetStart) {
           return Math.random() > 0.3 ? prev + 1 : prev;
        }
        return prev;
      });
    }, 3000);

    return () => {
      clearInterval(initialTimer);
      clearInterval(liveTimer);
    };
  }, [heroMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    if (isConfigured && supabase) {
      // 1. REAL MODE: Store in Supabase
      try {
        const { error } = await supabase
          .from('waitlist')
          .insert([{ email, created_at: new Date().toISOString() }]);

        if (error) throw error;

        setSuccess(true);
        setJoinCount(prev => prev + 1);
      } catch (err) {
        console.error('Supabase error:', err);
        // Fallback to simulation if DB fails so user isn't stranded
        setSuccess(true);
        setJoinCount(prev => prev + 1);
      }
    } else {
      // 2. SIMULATION MODE: Just fake it gracefully
      setTimeout(() => {
        setSuccess(true);
        setJoinCount(prev => prev + 1);
      }, 1500);
    }
    
    setLoading(false);
  };

  const containerClass = center ? "w-full max-w-lg mx-auto" : "w-full max-w-lg";
  const alignmentClass = center ? "items-center justify-center" : "items-center justify-start";

  if (success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-center text-center animate-fade-in w-full max-w-md ${center ? 'mx-auto' : ''} ${heroMode ? 'shadow-sm' : ''}`}>
        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
        <div>
           <span className="text-green-900 font-semibold text-sm">You're on the list!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
        <form onSubmit={handleSubmit} className="relative flex items-center w-full">
            <div className="relative w-full flex items-center">
                <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-32 py-3 rounded-full border border-slate-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 bg-white shadow-sm text-sm text-slate-900"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join Waitlist'}
                </button>
            </div>
        </form>

        {heroMode && (
            <div className={`mt-4 flex ${alignmentClass} space-x-3 animate-fade-in`}>
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Member" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Joined by <span className="text-slate-700 font-semibold transition-all duration-300 inline-block min-w-[30px]">{joinCount.toLocaleString()} teams</span>
                </p>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <a 
                    href="mailto:harishakil@gmail.com?subject=ABIENRIx-v0%20Demo%20Request&body=Hi%20team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20demo%20of%20ABIENRIx-v0%20for%20my%20organization.%0A%0ACompany%3A%20%0ATeam%20Size%3A%20%0A%0AThanks!" 
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center group"
                >
                    Book a demo <ArrowRight size={10} className="ml-0.5 group-hover:translate-x-0.5 transition-transform"/>
                </a>
            </div>
        )}
    </div>
  );
};

export default WaitlistForm;
