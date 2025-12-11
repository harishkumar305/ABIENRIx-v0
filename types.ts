
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  handle: string;
  time: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}
