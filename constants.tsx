import React from 'react';
import { Layers, Zap, ShieldCheck, Activity, Users, FileCode } from 'lucide-react';
import { FaqItem, FeatureItem, Testimonial } from './types';

export const NAV_ITEMS = [
  { label: 'Docs', href: '#' },
  { label: 'Book a Call', href: '#book' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Merged the ABIENRIx-v0 PR into staging… everything worked on the first try. I don’t trust infra tools easily but wow.",
    author: "Alicia",
    role: "Platform Engineer",
    handle: "@alicia_platform",
    time: "2h"
  },
  {
    quote: "ABIENRIx-v0 auto-routed around a Razorpay slowdown today. We literally didn’t notice until looking at logs later.",
    author: "Rahul",
    role: "CTO",
    handle: "@rahul_cto_nimbus",
    time: "5h"
  },
  {
    quote: "Not gonna lie… Monitoring Super Bowl is the cleanest infra dashboard I’ve used. Found an issue we would’ve missed for hours.",
    author: "Sandeep",
    role: "DevOps Engineer",
    handle: "@opsforge_sandeep",
    time: "1d"
  },
  {
    quote: "We replaced 12 integrations with one API key. Feels like cheating.",
    author: "Dan Li",
    role: "Senior Backend Engineer",
    handle: "@dan_li_be",
    time: "2h"
  },
  {
    quote: "ABIENRIx-v0 reduced our latency by ~25% in a day. Didn’t expect much… but routing actually works.",
    author: "Megha",
    role: "SaaS Founder",
    handle: "@megha_builds",
    time: "4h"
  },
  {
    quote: "That feeling when infra just works. ABIENRIx-v0 made our stack boring in the best way possible.",
    author: "Harsh",
    role: "DevTools Founder",
    handle: "@harsh_engineer",
    time: "6h"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Will ABIENRIx-v0 slow down our requests?",
    answer: "No. ABIENRIx-v0 is designed to add only a few milliseconds while often reducing overall latency by routing to faster providers."
  },
  {
    question: "Do we have to change providers to use ABIENRIx-v0?",
    answer: "No. You can keep your current providers — ABIENRIx-v0 simply centralizes and optimizes them. You can add or swap providers later with minimal change."
  },
  {
    question: "How invasive is the migration?",
    answer: "We start read-only: scanning your code, proposing patches. You review and approve PRs. You’re always in control."
  },
  {
    question: "What happens if ABIENRIx-v0 goes down?",
    answer: "We design ABIENRIx-v0 to be highly available with multiple fail-safes. You can configure fallback behavior to call providers directly if needed."
  },
  {
    question: "Who should join the waitlist?",
    answer: "SaaS teams with 10–60 people, or DevOps/platform teams supporting 5–50 clients, who are tired of managing infra by hand."
  }
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Unified API Layer",
    subtitle: "Remove 20–40 distinct integrations.",
    description: "One schema: auth, payments, storage, db, email, analytics, queues, logging, webhooks.",
    icon: <Layers className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Smart Routing Engine",
    subtitle: "Faster apps, lower bills.",
    description: "Chooses best provider per request by cost, latency, region, error rate, and failover readiness.",
    icon: <Zap className="w-6 h-6 text-amber-500" />
  },
  {
    title: "Automatic Healing Layer",
    subtitle: "Outages become minor blips.",
    description: "Retries, circuit breakers, self-healing watchdogs ensure incidents are handled automatically.",
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />
  },
  {
    title: "Monitoring Super Bowl™",
    subtitle: "Clarity in seconds.",
    description: "360° health map, traffic heatmap, error volcano, cost radar, AI insights.",
    icon: <Activity className="w-6 h-6 text-purple-600" />
  },
  {
    title: "Multi-Client DevOps Dashboard",
    subtitle: "Handle 3–5× more clients.",
    description: "Per-client routing rules, keys, and monitoring. Ideal for agencies and platform teams.",
    icon: <Users className="w-6 h-6 text-indigo-600" />
  },
  {
    title: "Zero-Code Integration Rewrite",
    subtitle: "Safe, repeatable migrations.",
    description: "Automatic detection + migration patches that replace provider-specific calls with the unified API.",
    icon: <FileCode className="w-6 h-6 text-rose-500" />
  }
];