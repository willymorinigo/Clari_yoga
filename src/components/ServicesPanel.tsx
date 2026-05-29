/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Tag, Sparkles, Check, Flame, Waves } from 'lucide-react';
import { Service } from '../types';

interface ServicesPanelProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
}

type FilterCategory = 'all' | 'yoga' | 'shiatsu' | 'combo';

export default function ServicesPanel({ services, onSelectService }: ServicesPanelProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredServices = services.filter((service) => {
    if (activeFilter === 'all') return true;
    return service.category === activeFilter;
  });

  const categories = [
    { id: 'all', label: 'Todo el Menú', emoji: '☯️' },
    { id: 'yoga', label: 'Yoga Japonés', emoji: '🧘' },
    { id: 'shiatsu', label: 'Shiatsu Acupresión', emoji: '💆' },
    { id: 'combo', label: 'Rituales Especiales', emoji: '🎐' },
  ] as const;

  return (
    <section id="services-section" className="py-20 bg-stone-sand border-b border-stone-borders scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-borders">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary block">Servicios y Clases</span>
            <h2 className="font-serif text-3.5xl font-light text-stone-charcoal mt-2 md:text-4.5xl leading-tight">
              Terapias & Sesiones
            </h2>
            <p className="text-xs text-stone-400 mt-2 max-w-xl leading-relaxed font-light">
              Elige el espacio ideal para tu sanación. Todas las propuestas son de atención personalizada, realizadas en un ambiente privado y confortable, y brindadas bajo los estilos tradicionales Masunaga y Namikoshi.
            </p>
          </div>

          {/* Filtering Chips - Square border style */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 rounded-none px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-stone-charcoal border-stone-charcoal text-stone-sand shadow-xs'
                    : 'bg-white border-stone-borders text-stone-500 hover:border-stone-charcoal hover:text-stone-charcoal'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid Display */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => {
            const isCombo = service.category === 'combo';
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative flex flex-col justify-between rounded-none border bg-white p-6 shadow-none transition-all hover:border-stone-charcoal duration-300 ${
                  isCombo 
                    ? 'border-stone-gold bg-stone-sand/40' 
                    : 'border-stone-borders'
                }`}
              >
                {/* Special Highlight Badge for premium/combinations */}
                {isCombo && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 border border-[#C5A059] bg-[#FDFCF8] px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#C5A059]">
                    <Sparkles className="h-3 w-3" />
                    Recomendado Premium
                  </div>
                )}

                {/* Card Top Section info */}
                <div>
                  
                  {/* Category Pill + Intensity level indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${
                      service.category === 'yoga' 
                        ? 'bg-stone-sand text-primary border-stone-borders' 
                        : service.category === 'shiatsu' 
                        ? 'bg-stone-sand text-[#5A6044] border-stone-borders'
                        : 'bg-stone-sand text-[#C5A059] border-stone-borders'
                    }`}>
                      {service.category === 'yoga' ? '🧘 Yoga Zen' : service.category === 'shiatsu' ? '💆 Masaje Shiatsu' : '🎐 Ritual'}
                    </span>

                    {service.intensity && (
                      <span className="flex items-center gap-0.5 text-[9px] text-stone-400 font-mono tracking-wider">
                        • {service.intensity.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-light text-stone-charcoal leading-snug">
                    {service.name}
                  </h3>

                  {/* Duration and Price */}
                  <div className="my-4 flex items-center gap-4 text-xs font-mono text-stone-500 border-b border-t border-stone-sand py-2.5">
                    <span className="flex items-center gap-1 font-sans text-stone-400">
                      <Clock className="h-3.5 w-3.5 text-stone-300" />
                      {service.duration} minutos
                    </span>
                    <span className="h-1.5 w-1.5 bg-stone-borders rounded-none" />
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      ${service.price.toLocaleString('es-AR')} ARS
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Benefits bullets list */}
                  <div className="mt-5 border-t border-stone-borders pt-5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-charcoal block mb-3">Beneficios Principales:</span>
                    <ul className="space-y-2.5">
                      {service.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-stone-500 font-light">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Bottom: Button trigger */}
                <div className="mt-8 border-t border-stone-borders pt-5">
                  <button
                    id={`book-btn-${service.id}`}
                    onClick={() => onSelectService(service.id)}
                    className={`block w-full py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 cursor-pointer ${
                      isCombo
                        ? 'bg-stone-gold border border-stone-gold text-stone-sand hover:bg-stone-charcoal hover:border-stone-charcoal shadow-none'
                        : 'bg-stone-charcoal border border-stone-charcoal text-stone-sand hover:bg-primary hover:border-primary hover:text-stone-sand'
                    }`}
                  >
                    Agendar Reserva de Turno
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
