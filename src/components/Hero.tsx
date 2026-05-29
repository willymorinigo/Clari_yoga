/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, ChevronRight, Activity, Smile, BookOpen } from 'lucide-react';

const heroImage = 'https://instagram.feze7-1.fna.fbcdn.net/v/t51.82787-15/651196360_18084723140248895_3890060755378393577_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzU0OTI3Nzc0MTE1NTg1NTg5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG95by5DMyJ9&_nc_ohc=kp_3eeq3w2gQ7kNvwH7cER5&_nc_oc=AdolMS9b2F61q7SjJOjeVNnE8_OPJIkmnETyMTKJn5j8zY4iAqDf1hJF8lkveqU8aYg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.feze7-1.fna&_nc_gid=M7fDDIakT0U-ZMfwlTW5Fw&_nc_ss=7a22e&oh=00_Af62aElRF7osdNe84AMkE1wGrWG8Tnh0czD9brqE3FpQ9g&oe=6A1F4D3A';

interface HeroProps {
  onStartBooking: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onStartBooking, onExploreServices }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-stone-sand pt-8 pb-16 md:py-24 border-b border-stone-borders">
      {/* Subtle Japanese pattern accent in background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Zen label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 border-b border-primary/40 pb-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-primary mb-6"
            >
              Sabiduría Tradicional de Japón • 伝統
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-5xl font-light tracking-tight text-stone-charcoal sm:text-6xl lg:text-7.5xl leading-[0.95]"
            >
              Encuentra tu centro. <br />
              <span className="text-primary italic font-light">Yoga Zen & <br />Shiatsu Tradicional</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-base sm:text-lg text-[#5A6044] font-serif italic font-light max-w-xl leading-relaxed"
            >
              "El arte japonés de la sanación a través del tacto sutil y el movimiento consciente." Propongo clases personalizadas de Zen Yoga para coordinar mente-cuerpo, e individuales masajes de digitopresión.
            </motion.p>

            {/* Call to actions - flattened, uppercase tracking-widest */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <button
                id="hero-book-btn"
                onClick={onStartBooking}
                className="group flex items-center justify-center gap-2 rounded-none bg-stone-charcoal border border-stone-charcoal px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-sand hover:bg-primary hover:border-primary active:scale-98 transition-all duration-300 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Reservar turno
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreServices}
                className="group flex items-center justify-center gap-2 rounded-none border border-stone-charcoal bg-transparent px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-charcoal hover:bg-stone-charcoal hover:text-stone-sand active:scale-98 transition-all duration-300 cursor-pointer"
              >
                Explorar terapias
              </button>
            </motion.div>



          </div>

          {/* Hero Right Visual Column (Arch style like original shape) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-t-[180px] rounded-b-none bg-stone-borders p-1 shadow-md border border-stone-borders"
            >
              <img
                src={heroImage}
                alt="Ambiente zen japonés silente con tatami"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover rounded-t-[180px] rounded-b-none transition-transform duration-700 hover:scale-105"
              />
              
              {/* Absolutes for zen detail */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-4 right-4 rounded-none bg-stone-sand/90 p-4 border border-stone-charcoal/10 shadow-xs">
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-primary text-stone-sand">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-wider uppercase text-stone-800">Espacio de Armonía</h4>
                    <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                      Salas acondicionadas con tatami, aromaterapia sutil y sonido natural relajante.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative organic round elements for Japanese feel (Komorebi light) */}
            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-primary/10 blur-xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-stone-gold/10 blur-2xl pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
