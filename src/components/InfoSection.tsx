/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Heart, Award, Sparkles, MapPin, Layers } from 'lucide-react';
import { TEACHERS } from '../data';
// @ts-expect-error - Vite handles asset bundling for png seamlessly at build time
import shiatsuTherapyImg from '../assets/images/shiatsu_therapy_1780004600309.png';

interface ChannelExplainer {
  name: string;
  kanji: string;
  meridian: string;
  focus: string;
  symptoms: string;
  description: string;
}

const SHIATSU_CHANNELS: ChannelExplainer[] = [
  {
    name: 'Espalda y Lumbares',
    kanji: '膀胱経',
    meridian: 'Meridiano de la Vejiga (el canal más largo)',
    focus: 'Eje nervioso simpático y toda la columna vertebral.',
    symptoms: 'Rigidez por mala postura, contracturas crónicas, lumbalgia, insomnio y estrés general.',
    description: 'La espalda concentra los puntos "Yu", que conectan directamente con los órganos principales de todo el cuerpo. Trabajar esta zona calma profundamente el sistema nervioso.',
  },
  {
    name: 'Abdomen (Hara)',
    kanji: '腹部 • 腹',
    meridian: 'El Centro Vital de Energía',
    focus: 'Reflejos viscerales y digestivos amplios.',
    symptoms: 'Problemas digestivos, gastritis nerviosa, ansiedad latente, fatiga y mala respiración.',
    description: 'En Shiatsu Zen, el Hara es el espejo del cuerpo. Al presionar rítmicamente el abdomen con las manos de forma suave pero firme, se desbloquea la tensión contenida y reestablece el Ki original.',
  },
  {
    name: 'Caderas y Miembros Inferiores',
    kanji: '胆経 • 胃経',
    meridian: 'Meridianos de Vesícula Biliar y Estómago',
    focus: 'Rigidez en ciático, movilidad pélvica e irrigación inferior.',
    symptoms: 'Pesadez de piernas, dolor de ciática, tensión en glúteos y falta de arraigo.',
    description: 'Los estiramientos japoneses de piernas de estilo Masunaga abren las articulaciones pélvicas, liberando el flujo hacia las extremidades inferiores y mejorando la vitalidad de la base.',
  },
  {
    name: 'Hombros y Brazos',
    kanji: '肺経',
    meridian: 'Meridiano de Pulmón y Corazón',
    focus: 'Respiración, pecho cerrado y articulación del hombro.',
    symptoms: 'Pecho comprimido, respiración superficial, hombros adelantados por pantallas de PC, y angustia acumulada.',
    description: 'Presionar los canales en brazos y pectorales ayuda a abrir la caja torácica, expandiendo la capacidad pulmonar y liberando el peso emocional de los hombros.',
  }
];

export default function InfoSection() {
  const [selectedChannel, setSelectedChannel] = useState<number>(0);

  return (
    <section id="info-section" className="py-20 bg-stone-sand scroll-mt-20 border-b border-stone-borders">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Core Philosophy Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Column 1: Philosophy text */}
          <div id="philo-text">
            <h3 className="text-primary font-semibold tracking-[0.2em] text-[10px] uppercase mb-4">La Esencia del Bienestar Oriental</h3>
            <h2 className="font-serif text-4xl font-light text-stone-charcoal sm:text-5xl leading-tight">
              Unificar Mente y Cuerpo: <br />El despertar del flujo vital y el bienestar
            </h2>
            <p className="mt-6 text-stone-500 leading-relaxed text-sm sm:text-base font-light">
              Mientras que en occidente solemos tratar el síntoma físico por separado, la medicina tradicional japonesa considera los dolores corporales como una manifestación de un flujo energético bloqueado o debilitado (llamado <strong className="text-stone-charcoal font-semibold">Ki</strong>).
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-primary text-stone-sand">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-light text-stone-charcoal">Zen Yoga: Respiración & Silencio</h4>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                    No buscamos la pose mecánicamente acrobática; priorizamos la meditación en acción, la alineación natural y la flexibilidad restaurativa profunda.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-stone-charcoal text-stone-sand">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-light text-stone-charcoal">Shiatsu: Tacto que restaura la energía</h4>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                    La técnica consiste en presionar perpendicularmente con los pulgares los canales vitales del organismo. Despierta el flujo vital profundo (Tsubo) y relaja las contracturas acumuladas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Photo Block */}
          <div id="philo-photo" className="relative justify-self-center lg:justify-self-end w-full max-w-md">
            <div className="rounded-none border border-stone-borders bg-white p-4 shadow-none">
              <img
                src={shiatsuTherapyImg}
                alt="Ambiente de meditación y camilla de tatami de masaje"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full rounded-none object-cover"
              />
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <span className="font-serif text-sm font-semibold tracking-wide text-stone-charcoal block">Terapia Shiatsu Zen (Ko-Do)</span>
                  <span className="text-[9px] text-stone-400 tracking-wider">Flujo de luz y desconexión en el espacio central de práctica</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-none bg-stone-sand border border-stone-borders text-stone-charcoal">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic & Interactive Section: Meridian Channels Explainer (Bento Box style with design shape) */}
        <div id="meridians-explainer" className="mt-24 rounded-none bg-white border border-stone-borders p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-block border border-primary/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-4">Estudio de Digitopresión</span>
            <h3 className="font-serif text-3xl font-light text-stone-charcoal sm:text-4xl">Preguntas del Cuerpo: Canales de Alivio</h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Haz clic en cualquiera de las regiones corporales para comprender cómo la alineación tradicional del Shiatsu japonés desbloquea los canales meridianos obstruidos.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            
            {/* Interactive Selector Buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SHIATSU_CHANNELS.map((channel, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedChannel(idx)}
                  className={`relative flex items-center justify-between text-left rounded-none p-5 border transition-all cursor-pointer ${
                    selectedChannel === idx
                      ? 'bg-stone-charcoal border-stone-charcoal text-stone-sand'
                      : 'bg-[#FDFCF8] border-stone-borders text-stone-700 hover:border-stone-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-none text-xs font-semibold ${
                      selectedChannel === idx ? 'bg-white/20 text-white' : 'bg-stone-sand text-stone-500'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-[9px] tracking-widest uppercase opacity-75 block font-sans">Canal corporal</span>
                      <h4 className="font-serif text-sm sm:text-base font-semibold">{channel.name}</h4>
                    </div>
                  </div>
                  <span className={`font-serif text-lg ${selectedChannel === idx ? 'text-stone-gold' : 'text-stone-400'}`}>
                    {channel.kanji}
                  </span>
                </button>
              ))}
            </div>

            {/* Explainer viewer */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-none border border-stone-borders bg-[#FDFCF8] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedChannel}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-stone-borders pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-light text-stone-charcoal">
                        {SHIATSU_CHANNELS[selectedChannel].name}
                      </h4>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-[0.15em] mt-1">
                        {SHIATSU_CHANNELS[selectedChannel].meridian}
                      </p>
                    </div>
                    <span className="hidden sm:inline-block border border-stone-borders bg-white px-3 py-1 text-[9px] font-sans tracking-wider uppercase text-stone-400">
                      Vía Energética Tsubo
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-none bg-stone-sand p-4 border border-stone-borders">
                      <span className="text-[9px] font-bold text-stone-charcoal uppercase tracking-wider block">Síntomas comunes</span>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed font-light">
                        {SHIATSU_CHANNELS[selectedChannel].symptoms}
                      </p>
                    </div>
                    <div className="rounded-none bg-white p-4 border border-stone-borders">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">Zona de Enfoque</span>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed font-light">
                        {SHIATSU_CHANNELS[selectedChannel].focus}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed border-t border-stone-borders pt-5 font-light">
                    {SHIATSU_CHANNELS[selectedChannel].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-2 border-t border-stone-borders pt-6">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-[9px] text-stone-400 tracking-[0.1em] uppercase leading-relaxed">
                  Diferencia Core: No es doloroso; se trata de una presión rítmica que induce un apagado del estado reactivo simpático.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Antropotécnica Section */}
        <div id="antropotecnica-section" className="mt-28 border-t border-stone-borders pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Header & Main Pillar */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Formación & Filosofía</span>
              <h2 className="font-serif text-3.5xl font-light text-stone-charcoal leading-tight sm:text-4xl">
                Antropotécnica: <br />El Arte de Ejercitar la Vida
              </h2>
              <p className="text-xs text-stone-400 font-mono tracking-widest uppercase pt-2">
                Metamorfosis • Praxis
              </p>
              <div className="h-[1px] w-20 bg-primary/40 my-4" />
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Entendemos la práctica no como una mera repetición mecánica o complacencia perezosa, sino como una herramienta activa de transformación consciente. Dejar la pasividad para dirigir la voluntad propia hacia el equilibrio corporal y anímico completo.
              </p>
            </div>

            {/* Structured concepts / quotes block */}
            <div className="lg:col-span-7 bg-[#FDFCF8] border border-stone-borders p-6 sm:p-10 relative">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-primary" />
              
              <div className="space-y-8">
                <div>
                  <p className="font-serif text-base text-stone-charcoal italic leading-relaxed">
                    "Concebimos la existencia como una práctica consciente: el ser humano que se ejercita de manera atenta y constante. Así, vivir se convierte en un camino de fortalecimiento y autodescubrimiento, liberándonos de la inercia que desvitaliza y rompiendo los patrones repetitivos que condicionan nuestro bienestar."
                  </p>
                </div>

                <div className="h-[1px] bg-stone-borders" />

                <div className="grid gap-6 sm:grid-cols-2 text-xs">
                  <div className="space-y-2.5">
                    <h4 className="font-serif font-semibold text-stone-charcoal text-sm">Sintonizar el impulso de cambio</h4>
                    <p className="text-stone-500 leading-relaxed font-light">
                      Nos situamos junto a quienes atienden esa intuición profunda que les recuerda que es posible transformarse. Es una invitación a no resignarse ante el malestar físico o emocional crónico, cultivando el hábito diario de participar en la propia restauración.
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    <h4 className="font-serif font-semibold text-stone-charcoal text-sm">La Práctica como Herramienta</h4>
                    <p className="text-stone-500 leading-relaxed font-light">
                      El Yoga y el Shiatsu son excelentes mapas de recursos prácticos y acciones físicas integradas. Estas herramientas facilitan la transición de un estado de asimilación pasiva al despertar de una voluntad consciente, capaz de timonear la salud corporal.
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-stone-borders" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-stone-400 font-mono uppercase tracking-wider">
                  <span className="text-primary font-bold">La salud se cultiva con la acción diaria.</span>
                  <span>El camino se transita con el cuerpo entero.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Teachers profile grid */}
        <div id="therapeutic-team" className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Fundadora e Instructora</span>
            <h2 className="font-serif text-3.5xl font-light text-stone-charcoal mt-2 sm:text-4xl">
              Guía de Bienestar
            </h2>
            <p className="text-xs text-stone-500 mt-3 font-light leading-relaxed">
              María Clara Chiaravalli propone clases y terapias orientadas a la autorregulación y el equilibrio, integrando la respiración consciente y la meditación como medicina para la vida moderna.
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            {TEACHERS.map((teacher) => (
              <div 
                key={teacher.id} 
                id={`teacher-card-${teacher.id}`}
                className="flex flex-col gap-6 rounded-none border border-stone-borders bg-[#FDFCF8] p-6 shadow-none transition-all hover:border-stone-charcoal sm:flex-row sm:items-center sm:p-8"
              >
                {/* Teacher Avatar */}
                <div className="mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-none border border-stone-borders bg-white p-1 sm:mx-0">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover rounded-none"
                  />
                </div>

                {/* Teacher Details */}
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
                    <h3 className="font-serif text-lg font-semibold text-stone-charcoal">{teacher.name}</h3>
                    <span className="mx-auto w-fit rounded-none border border-primary/30 px-2 py-0.5 text-[8px] font-bold text-primary uppercase tracking-widest sm:mx-0">
                      Certificación
                    </span>
                  </div>
                  <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-widest">
                    {teacher.role}
                  </p>
                  
                  <p className="text-xs text-stone-400 mt-3 leading-relaxed font-light">
                    {teacher.bio}
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-1.5 rounded-none bg-stone-sand px-3 py-2 text-[10px] text-stone-500 sm:justify-start border border-stone-borders font-light">
                    <span className="font-bold text-stone-700 tracking-wider uppercase text-[8px]">Especialidad:</span>
                    <span>{teacher.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
