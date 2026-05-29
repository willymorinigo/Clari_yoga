/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Minus, MapPin, Phone, Mail, Clock, ShieldCheck, Instagram
} from 'lucide-react';
import { FAQS } from '../data';

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <footer id="main-footer" className="bg-stone-charcoal text-[#EDE8E0] pt-16 pb-12 overflow-hidden border-t border-stone-borders">
      
      {/* Upper Footer: FAQ section (Zen architecture) */}
      <div className="mx-auto max-w-4xl px-6 sm:px-8 pb-16 border-b border-stone-800">
        <div className="text-center mb-10 max-w-lg mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Instrucción y Práctica</span>
          <h3 className="font-serif text-3xl font-light mt-1">Preguntas Frecuentes</h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-none border border-stone-800 bg-[#252525]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold tracking-wide hover:text-stone-gold transition-colors cursor-pointer text-[#EDE8E0]"
                >
                  <span className="font-serif">{faq.q}</span>
                  <span className="translate-x-1">
                    {isOpen ? <Minus className="h-4.5 w-4.5 text-stone-gold" /> : <Plus className="h-4.5 w-4.5 text-stone-gold" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 text-xs text-stone-400 leading-relaxed border-t border-stone-800/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Footer: Location details, Operating hours, and quick menu */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12 grid gap-10 md:grid-cols-12 md:gap-8">
        
        {/* Branch 1: Braded Identity */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5 font-sans">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-stone-sand font-bold">
              <span className="font-serif text-base">C</span>
            </div>
            <div>
              <h4 className="font-serif text-[15px] font-semibold text-stone-sand tracking-wide flex items-center gap-1 leading-none">
                Clara <span className="text-stone-gold italic font-light">Chiaravalli</span>
              </h4>
              <p className="font-sans text-[8px] tracking-[0.18em] uppercase text-stone-400 mt-1.5 font-bold">YOGA & SHIATSU</p>
            </div>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Unificando técnicas antiguas orientales para responder a las exigencias modernas. Propongo clases meditativas de Yoga adaptadas y masajes Shiatsu que alivian la fatiga de forma permanente.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-gold bg-[#252525]/50 p-2.5 rounded-none border border-stone-800 w-fit font-mono font-medium tracking-wide">
            <ShieldCheck className="h-4 w-4 text-stone-gold inline shrink-0" />
            <span>HOMOLOGADO SEGÚN LINEAMIENTOS TRADICIONALES.</span>
          </div>
        </div>

        {/* Branch 2: Location Sim */}
        <div className="md:col-span-4 space-y-4">
          <h5 className="font-serif text-sm font-semibold text-stone-gold uppercase tracking-[0.15em]">Espacio de Práctica</h5>
          <ul className="space-y-3.5 text-xs text-stone-300">
            <li className="flex items-start gap-2.5 font-light">
              <MapPin className="h-4.5 w-4.5 text-stone-gold shrink-0 mt-0.5" />
              <span>Ubuntu Multiespacio | Calle 48 #1780 entre 30 y 31,<br />La Plata, Buenos Aires, Argentina.</span>
            </li>
            <li className="flex items-center gap-2.5 font-light">
              <Phone className="h-4.5 w-4.5 text-stone-gold shrink-0" />
              <span>+54 221 523-2417</span>
            </li>
            <li className="flex items-center gap-2.5 font-light">
              <Mail className="h-4.5 w-4.5 text-stone-gold shrink-0" />
              <span>macatachavalli@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Branch 3: Operating Hours info */}
        <div className="md:col-span-4 space-y-4">
          <h5 className="font-serif text-sm font-semibold text-stone-gold uppercase tracking-[0.15em]">Horarios de Atención</h5>
          <ul className="space-y-3 text-xs text-stone-300">
            <li className="flex items-start gap-2.5">
              <Clock className="h-4.5 w-4.5 text-stone-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold">Lunes a Viernes</span>
                <span className="text-stone-400 text-[11px] block mt-0.5 font-light">08:00 a 21:00 hs (Clases y masajes programados)</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4.5 w-4.5 text-stone-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold">Sábados</span>
                <span className="text-stone-400 text-[11px] block mt-0.5 font-light">09:00 a 17:00 hs</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-none bg-stone-gold mt-2 shrink-0 animate-pulse" />
              <div>
                <span className="text-stone-400 text-[11px] block font-light">Domingos y Feriados Estrictos Cerrado</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Extreme bottom copyright and small icons */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <p>© 2026 María Clara Chiaravalli. Todos los derechos reservados. Clases y terapias orientadas a la autorregulación y el equilibrio.</p>
        <div className="flex items-center gap-4.5">
          {onAdminClick && (
            <button 
              onClick={onAdminClick}
              className="text-[10px] items-center gap-1.5 uppercase font-semibold text-stone-500 hover:text-stone-gold tracking-[0.15em] transition-colors cursor-pointer"
            >
              🔒 Acceso Privado
            </button>
          )}
          <a href="#" className="hover:text-stone-gold transition-colors block">
            <Instagram className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>

    </footer>
  );
}
