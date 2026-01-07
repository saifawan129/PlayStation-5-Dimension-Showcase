
import React from 'react';
import { Product, HardwareType } from './types';

export const COLORS = {
  black: '#121314',
  white: '#FFFFFF',
  accent: '#FFE135', // Banana Yellow
  psBlue: '#0070D1',
};

export const PRODUCTS: Product[] = [
  {
    id: HardwareType.PS5_PRO,
    name: 'PlayStation 5 Pro',
    category: 'Console',
    description: 'The pinnacle of console gaming performance. Featuring an advanced GPU, specialized AI-driven upscaling (PSSR), and an expansive 2TB SSD.',
    price: '$699.99',
    color: '#FFFFFF',
    features: ['AI-Driven Upscaling', 'Advanced Ray Tracing', '2TB SSD Storage'],
    specs: {
      GPU: '16.7 TFLOPS',
      Storage: '2TB Custom NVMe SSD',
      Video: '4K 120Hz / 8K Support'
    },
    modelType: 'console',
    details: [
      { id: 'vents', name: 'Advanced Intake Vents', position: [0.3, 1, 0.5], description_fallback: 'High-efficiency thermal management system.' },
      { id: 'pssr', name: 'PSSR Core', position: [0, 0, 0.2], description_fallback: 'AI-driven upscaling for razor-sharp clarity.' }
    ]
  },
  {
    id: HardwareType.PS5_SLIM,
    name: 'PlayStation 5 Slim',
    category: 'Console',
    description: 'A more compact, sleek design with the same legendary power. Experience lightning-fast loading and deeper immersion.',
    price: '$499.99',
    color: '#FFFFFF',
    features: ['Ultra-High Speed SSD', 'Integrated I/O', 'Ray Tracing'],
    specs: {
      Dimensions: '358 × 96 × 216 mm',
      Storage: '1TB Custom SSD',
      Weight: '3.2kg'
    },
    modelType: 'console',
    details: [
      { id: 'ssd', name: 'Custom SSD Slot', position: [0, -1, 0.5], description_fallback: 'Ultra-high speed data throughput for near-instant loading.' }
    ]
  },
  {
    id: HardwareType.DUALSENSE_EDGE,
    name: 'DualSense Edge™',
    category: 'Controller',
    description: 'Built with high performance and personalization in mind, this new PS5 controller invites you to craft your own unique gaming experience.',
    price: '$199.99',
    color: '#FFFFFF',
    features: ['Changeable Stick Caps', 'Mappable Buttons', 'Adjustable Triggers'],
    specs: {
      Connectivity: 'USB-C / Bluetooth',
      Feedback: 'Haptic / Adaptive Triggers',
      Battery: 'Rechargeable Li-Ion'
    },
    modelType: 'controller',
    details: [
      { id: 'grip', name: 'Micro-Texture Grip', position: [0.8, -0.4, 0.2], description_fallback: 'Thousands of micro-etched icons for superior control.' },
      { id: 'trigger', name: 'Adaptive Triggers', position: [0.5, 0.6, -0.2], description_fallback: 'Dynamic resistance for immersive tension.' }
    ]
  },
  {
    id: HardwareType.PULSE_ELITE,
    name: 'PULSE Elite™',
    category: 'Audio',
    description: 'Enter a new era of gaming audio with planar magnetic drivers that reproduce soundscapes with ultra-low distortion.',
    price: '$149.99',
    color: '#FFFFFF',
    features: ['Planar Magnetic Drivers', 'PlayStation Link™', 'AI Noise Rejection'],
    specs: {
      Battery: 'Up to 30 Hours',
      Drivers: 'Planar Magnetic',
      Microphone: 'Retractable'
    },
    modelType: 'headset',
    details: [
      { id: 'driver', name: 'Planar Magnetic Driver', position: [1, 0.2, 0], description_fallback: 'Audiophile-grade sound reproduction.' },
      { id: 'mic', name: 'AI Noise Rejection Mic', position: [-0.8, -0.2, 0.5], description_fallback: 'Clear communication powered by machine learning.' }
    ]
  },
  {
    id: HardwareType.INZONE_M10S,
    name: 'INZONE M10S',
    category: 'Monitor',
    description: 'A 27-inch OLED gaming monitor co-designed with Fnatic. Super-fast 480Hz refresh rate and 0.03ms GtG response time.',
    price: '$1099.99',
    color: '#121314',
    features: ['480Hz Refresh Rate', 'OLED Panel', '27-inch QHD'],
    specs: {
      Response: '0.03ms GtG',
      Display: '27" OLED QHD',
      Nits: '1300 Peak Brightness'
    },
    modelType: 'monitor',
    details: [
      { id: 'oled', name: 'OLED Array', position: [0, 1.5, 0.1], description_fallback: 'Self-lit pixels for perfect blacks and infinite contrast.' }
    ]
  }
];

export const PSIcons = {
  Triangle: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="8">
      <path d="M50 15 L85 80 L15 80 Z" />
    </svg>
  ),
  Circle: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="8">
      <circle cx="50" cy="50" r="35" />
    </svg>
  ),
  Cross: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="8">
      <path d="M25 25 L75 75 M75 25 L25 75" />
    </svg>
  ),
  Square: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="8">
      <rect x="20" y="20" width="60" height="60" rx="4" />
    </svg>
  )
};
