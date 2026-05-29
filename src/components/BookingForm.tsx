/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Calendar, Clock, User, Mail, Phone, ChevronRight, 
  ChevronLeft, MessageSquare, AlertCircle, Sparkles, Heart 
} from 'lucide-react';
import { HOLES_CALENDAR } from '../data';
import { Service, Booking } from '../types';

interface BookingFormProps {
  services: Service[];
  preselectedServiceId: string | null;
  onBookingSuccess: () => void;
  onViewReservations: () => void;
}

export default function BookingForm({ 
  services,
  preselectedServiceId, 
  onBookingSuccess, 
  onViewReservations 
}: BookingFormProps) {
  
  // Steps: 1 = Service, 2 = Date/Time, 3 = Personal Info, 4 = Success
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Date and Time selection
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string>(''); // HH:MM
  
  // Client Info
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+54 9 ');
  const [clientComments, setClientComments] = useState<string>('');
  
  // Validation messages
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Generated success ticket details
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Set pre-selected service if provided
  useEffect(() => {
    if (preselectedServiceId) {
      const found = services.find(s => s.id === preselectedServiceId);
      if (found) {
        setSelectedService(found);
        setStep(2); // Jump straight to date selection for a smoother UX!
      }
    }
  }, [preselectedServiceId]);

  // Calendar dates generation (Next 30 days starting tomorrow)
  const getUpcomingDates = () => {
    const dates = [];
    const baseDate = new Date();
    // Start tomorrow
    
    for (let i = 1; i <= 30; i++) {
      const future = new Date(baseDate);
      future.setDate(baseDate.getDate() + i);
      
      // Skip Sundays since we are closed
      if (future.getDay() === 0) continue;
      
      dates.push({
        iso: future.toISOString().split('T')[0],
        dayNum: future.getDate(),
        dayName: future.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', ''),
        monthLabel: future.toLocaleDateString('es-AR', { month: 'long' }),
        year: future.getFullYear(),
      });
    }
    return dates;
  };

  const datesToPick = getUpcomingDates();

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setErrorMsg('');
    setStep(2);
  };

  // Step 2 Validation: Check Date & Time
  const handleNextToInfo = () => {
    if (!selectedDate) {
      setErrorMsg('Por favor seleccione una fecha en el calendario.');
      return;
    }
    if (!selectedTime) {
      setErrorMsg('Por favor elija un horario disponible.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  // Step 3 Validation: Form inputs & Submit Booking
  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim()) {
      setErrorMsg('Por favor ingrese su nombre completo.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientEmail.trim() || !emailRegex.test(clientEmail)) {
      setErrorMsg('Por favor ingrese un correo electrónico válido.');
      return;
    }

    if (!clientPhone.trim() || clientPhone.length < 7) {
      setErrorMsg('Por favor ingrese un número telefónico de contacto válido.');
      return;
    }

    if (!selectedService) {
      setErrorMsg('No hay ningún servicio seleccionado.');
      return;
    }

    // Compose Booking object
    const bookingCode = `ZEN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: bookingCode,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceCategory: selectedService.category,
      date: selectedDate,
      time: selectedTime,
      userName: clientName,
      userEmail: clientEmail,
      userPhone: clientPhone,
      comments: clientComments,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      const existing = localStorage.getItem('yoga_shiatsu_bookings');
      const list: Booking[] = existing ? JSON.parse(existing) : [];
      list.push(newBooking);
      localStorage.setItem('yoga_shiatsu_bookings', JSON.stringify(list));
      
      setConfirmedBooking(newBooking);
      setErrorMsg('');
      setStep(4);
      onBookingSuccess(); // notify parent component to refresh count badge!
    } catch (err) {
      setErrorMsg('Ocurrió un error guardando su turno. Intente nuevamente.');
    }
  };

  // Simple date formatter
  const formatDateLabel = (isoString: string) => {
    if (!isoString) return '';
    const parts = isoString.split('-');
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return dateObj.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  // Generate dynamic WhatsApp link prefilled with reservation details
  const getWhatsAppLink = () => {
    if (!confirmedBooking || !selectedService) return '#';
    
    // WhatsApp number configured for Clara's studio
    const whatsappPhone = '542215034442';
    
    // Using ultra-safe, highly compatible emojis to ensure they render perfectly everywhere
    const message = `¡Hola Clara! Acabo de registrar un turno desde la web y me gustaría confirmarlo:\n\n` +
      `🌸 *Disciplina:* ${selectedService.name}\n` +
      `👤 *Alumno/Paciente:* ${confirmedBooking.userName}\n` +
      `📞 *Teléfono de contacto:* ${confirmedBooking.userPhone}\n` +
      `📅 *Fecha:* ${formatDateLabel(confirmedBooking.date)}\n` +
      `⏰ *Horario:* ${confirmedBooking.time} hs\n` +
      `⏳ *Duración:* ${selectedService.duration} min\n` +
      `💵 *Inversión:* $${selectedService.price.toLocaleString('es-AR')} ARS\n` +
      `🎫 *Código de Reserva:* ${confirmedBooking.id}\n` +
      (confirmedBooking.comments ? `\n💬 *Comentarios:* "${confirmedBooking.comments}"` : '') +
      `\n\nQuedo a la espera de la confirmación. ¡Muchas gracias!`;

    return `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="booking-wizard-container" className="mx-auto max-w-4xl px-4 py-12">
      
      {/* Wizard Progress Stepper - Sharp minimalist boxes */}
      {step < 4 && (
        <div id="progress-bar-steps" className="mb-12 flex items-center justify-between px-3 md:px-12 relative">
          <div className="absolute top-5 left-12 right-12 h-[1px] bg-stone-borders -z-10" />
          {[
            { num: 1, label: 'Elegir Sesión' },
            { num: 2, label: 'Fecha y Hora' },
            { num: 3, label: 'Tus Datos' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-stone-sand px-3 relative z-10">
              <div className={`flex h-10 w-10 items-center justify-center rounded-none text-xs font-bold border transition-all duration-300 ${
                step >= s.num 
                  ? 'bg-stone-charcoal border-stone-charcoal text-stone-sand' 
                  : 'bg-white border-stone-borders text-stone-400'
              }`}>
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                step >= s.num ? 'text-stone-charcoal' : 'text-stone-400'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="mb-6 flex items-center gap-2 rounded-none bg-[#FDFCF8] border border-red-200 p-4 text-xs text-red-700 animate-fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <span className="font-light">{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Reserva de Turno</span>
            <h3 className="font-serif text-3xl font-light text-stone-charcoal mt-1">Elige la disciplina o terapia</h3>
            <p className="text-xs text-stone-400 mt-2 font-light">
              Selecciona una de las clases de Yoga o una sesión de masaje individual Shiatsu para continuar.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                onClick={() => handleServiceSelect(s)}
                className="group relative cursor-pointer rounded-none border border-stone-borders bg-white p-6 transition-all hover:border-stone-charcoal flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="border border-stone-borders bg-stone-sand px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-stone-charcoal">
                      {s.category === 'yoga' ? '🧘 Yoga Zen' : s.category === 'shiatsu' ? '💆 Shiatsu' : '🎐 Ritual'}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary">
                      ${s.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-stone-charcoal mt-3.5 group-hover:text-primary transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-2 line-clamp-2 font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-borders flex items-center justify-between text-[10px] text-stone-400 font-sans tracking-wide">
                  <span className="uppercase font-semibold">⏰ {s.duration} min</span>
                  <span className="text-stone-charcoal font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Seleccionar <ChevronRight className="h-3 w-3 text-primary" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* STEP 2: Date & Time picker */}
      {step === 2 && selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header of selection */}
          <div className="flex items-center justify-between border-b border-stone-borders pb-5">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Volver a terapias
            </button>
            <div className="text-right">
              <span className="text-[9px] text-[#5A6044] uppercase tracking-widest block">Servicio elegido</span>
              <span className="font-serif text-sm font-semibold text-stone-charcoal">{selectedService.name}</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            
            {/* Custom Interactive Calendar Columns */}
            <div className="md:col-span-12">
              <h4 className="font-serif text-xl font-light text-stone-charcoal mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                1. Elige la Fecha para tu Sesión
              </h4>

              {/* Day selection horizontal container or grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-6 max-h-[310px] overflow-y-auto rounded-none border border-stone-borders bg-white p-4">
                {datesToPick.map((dateItem) => {
                  const isSelected = selectedDate === dateItem.iso;
                  return (
                    <button
                      key={dateItem.iso}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateItem.iso);
                        setErrorMsg('');
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-none border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-charcoal border-stone-charcoal text-stone-sand shadow-sm'
                          : 'bg-[#FDFCF8] border-stone-borders hover:border-stone-charcoal text-stone-700'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold tracking-widest opacity-75">{dateItem.dayName}</span>
                      <span className="text-xl font-light my-1 font-serif">{dateItem.dayNum}</span>
                      <span className="text-[8px] uppercase tracking-wider text-stone-400 truncate max-w-full">{dateItem.monthLabel.slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slot picker row */}
            <div className="md:col-span-12">
              <h4 className="font-serif text-xl font-light text-stone-charcoal mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                2. Horarios de Apertura Disponibles
              </h4>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 rounded-none border border-stone-borders bg-white p-4">
                {HOLES_CALENDAR.map((timeSlot) => {
                  const isSelected = selectedTime === timeSlot;
                  return (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(timeSlot);
                        setErrorMsg('');
                      }}
                      className={`py-3 rounded-none border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-primary border-primary text-stone-sand shadow-sm'
                          : 'bg-[#FDFCF8] border-stone-borders hover:border-stone-charcoal text-stone-600'
                      }`}
                    >
                      {timeSlot} hs
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Wizard Actions Footer */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-stone-borders pt-6">
            <div className="text-xs text-stone-500 font-serif italic font-light">
              {selectedDate && selectedTime ? (
                <span className="text-stone-700 font-medium">
                  Fecha asignada: <strong className="text-primary not-italic font-bold font-sans tracking-wide">{formatDateLabel(selectedDate)}</strong> a las <strong className="text-primary not-italic font-bold font-mono">{selectedTime} hs</strong>
                </span>
              ) : (
                'Elija día y hora correspondientes para continuar.'
              )}
            </div>

            <button
              onClick={handleNextToInfo}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-none bg-stone-charcoal border border-stone-charcoal px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-sand hover:bg-primary hover:border-primary active:scale-98 transition-all duration-300 cursor-pointer"
            >
              Siguiente Paso <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Client Details */}
      {step === 3 && selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header of selection */}
          <div className="flex items-center justify-between border-b border-stone-borders pb-5">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Volver a fecha
            </button>
            <div className="text-right">
              <span className="text-[9px] text-[#5A6044] uppercase tracking-widest block">Resumen Horario</span>
              <span className="font-serif text-sm font-semibold text-stone-charcoal">
                {formatDateLabel(selectedDate)} — {selectedTime} hs
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitBooking} className="grid gap-6 md:grid-cols-12 rounded-none border border-stone-borders bg-white p-6 sm:p-8">
            
            <div className="md:col-span-12">
              <h3 className="font-serif text-xl font-light text-stone-charcoal">Reserva de Turno: Tus Datos de Contacto</h3>
              <p className="text-xs text-stone-400 mt-1 font-light">
                La solicitud quedará registrada. Te enviaré un correo de confirmación antes de la sesión.
              </p>
            </div>

            {/* Full Name input */}
            <div className="md:col-span-12 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-650 block">Nombre Completo *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Sofía Martínez"
                  className="w-full rounded-none border border-stone-borders bg-white py-3.5 pl-11 pr-4 text-xs text-stone-charcoal placeholder-stone-400 focus:border-stone-charcoal focus:outline-hidden transition-all"
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-650 block">Correo Electrónico *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="sofia@ejemplo.com"
                  className="w-full rounded-none border border-stone-borders bg-white py-3.5 pl-11 pr-4 text-xs text-stone-charcoal placeholder-stone-400 focus:border-stone-charcoal focus:outline-hidden transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone input */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-650 block">Teléfono Móvil (WhatsApp) *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+54 9"
                  className="w-full rounded-none border border-stone-borders bg-white py-3.5 pl-11 pr-4 text-xs text-stone-charcoal placeholder-stone-400 focus:border-stone-charcoal focus:outline-hidden transition-all"
                  required
                />
              </div>
            </div>

            {/* Comments input */}
            <div className="md:col-span-12 space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-650 block">Comentarios, lesiones o síntomas (Opcional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <textarea
                  value={clientComments}
                  onChange={(e) => setClientComments(e.target.value)}
                  placeholder="Ej: Tengo dolor cervical recurrente; es mi primera vez recibiendo Shiatsu..."
                  rows={3}
                  className="w-full rounded-none border border-stone-borders bg-white py-3.5 pl-11 pr-4 text-xs text-stone-charcoal placeholder-stone-400 focus:border-stone-charcoal focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Summary card before submitting */}
            <div className="md:col-span-12 mt-4 rounded-none bg-stone-sand border border-stone-borders p-4">
              <div className="flex justify-between items-center text-xs text-stone-500">
                <span className="font-serif italic">Servicio seleccionado:</span>
                <span className="font-bold text-stone-800">{selectedService.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-500 mt-2">
                <span className="font-serif italic">Inversión de sesión:</span>
                <span className="font-bold text-primary font-mono">${selectedService.price.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            {/* Form actions */}
            <div className="md:col-span-12 border-t border-stone-borders pt-6 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-none bg-stone-charcoal border border-stone-charcoal px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-sand hover:bg-primary hover:border-primary active:scale-98 transition-all duration-300 cursor-pointer"
              >
                Concluir y Confirmar Turno
              </button>
            </div>
            
          </form>
        </motion.div>
      )}

      {/* STEP 4: Successful Confirmation */}
      {step === 4 && confirmedBooking && selectedService && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-none border border-stone-borders bg-white p-6 sm:p-10 shadow-none text-center space-y-8"
        >
          {/* Zen Stamp */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none bg-stone-sand text-stone-charcoal border border-stone-borders animate-pulse">
            <Check className="h-8 w-8" />
          </div>

          <div id="confirmation-header">
            <h3 className="font-serif text-3.5xl font-light text-stone-charcoal">¡Tu Reserva se ha registrado con éxito!</h3>
            <p className="text-[10px] text-primary tracking-[0.2em] font-medium uppercase mt-2">
              Código de confirmación: {confirmedBooking.id} • Clara Chiaravalli • Yoga & Shiatsu
            </p>
          </div>

          {/* Ticket Card */}
          <div className="mx-auto max-w-md border border-dashed border-stone-borders rounded-none p-6 bg-stone-sand relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
            
            <h4 className="font-serif text-base font-semibold text-stone-charcoal text-left border-b border-stone-borders pb-3">Resumen de Turno Zen</h4>
            
            <div className="mt-4 space-y-2.5 text-xs text-stone-500 text-left">
              <div className="flex justify-between">
                <span className="font-serif italic text-stone-400">Servicio:</span>
                <strong className="text-stone-750">{selectedService.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-serif italic text-stone-400">Paciente / Alumno:</span>
                <strong className="text-stone-750">{confirmedBooking.userName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-serif italic text-stone-400">Fecha:</span>
                <strong className="text-stone-750">{formatDateLabel(confirmedBooking.date)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-serif italic text-stone-400">Horario:</span>
                <strong className="text-primary font-bold font-mono">{confirmedBooking.time} hs</strong>
              </div>
              <div className="flex justify-between">
                <span className="font-serif italic text-stone-400">Duración:</span>
                <strong className="text-stone-700">{selectedService.duration} min</strong>
              </div>
              <div className="flex justify-between border-t border-stone-borders pt-3 text-sm">
                <span className="font-serif font-semibold text-stone-600">Inversión total:</span>
                <strong className="text-primary font-mono font-bold">${selectedService.price.toLocaleString('es-AR')} ARS</strong>
              </div>
            </div>

            {confirmedBooking.comments && (
              <div className="mt-4 rounded-none bg-white p-3 border border-stone-borders text-left">
                <span className="text-[9px] font-bold uppercase text-stone-400 tracking-wider block">Notas del paciente:</span>
                <p className="text-xs text-stone-500 mt-1 italic font-light">"{confirmedBooking.comments}"</p>
              </div>
            )}
          </div>

          {/* Guidance details */}
          <div className="max-w-xl mx-auto rounded-none bg-[#FDFCF8] border border-stone-borders p-5 text-left flex gap-3.5">
            <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-sans text-[10px] font-bold text-stone-charcoal uppercase tracking-[0.15em]">Recomendaciones para tu Visita:</h5>
              <ul className="list-disc list-inside text-xs text-stone-550 space-y-1 leading-relaxed pt-1.5 font-light">
                <li>Asiste con <span className="text-stone-700 font-medium font-sans">ropa cómoda de algodón</span> (pantalón largo cómodo y camiseta suave). El Shiatsu se practica sobre prendas sueltas.</li>
                <li>Por favor, llega 10 minutos antes para aclimatar tu espíritu con un té orgánico de cortesía antes de comenzar.</li>
                <li>Si necesitas reprogramar o cancelar, te ruego que me avises con al menos 24 horas de antelación.</li>
              </ul>
            </div>
          </div>

          {/* Direct Actions in screen 4 */}
          <div className="pt-6 flex flex-col items-center justify-center gap-4 border-t border-stone-borders">
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-[0.2em]">Siguiente paso sugerido</span>
            
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-none bg-emerald-600 border border-emerald-600 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDFCF8] hover:bg-emerald-700 hover:border-emerald-700 active:scale-98 transition-all duration-300 cursor-pointer shadow-md"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              Confirmar Turno por WhatsApp
            </a>

            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto mt-2">
              <button
                onClick={() => {
                  // Reset state
                  setStep(1);
                  setSelectedService(null);
                  setSelectedDate('');
                  setSelectedTime('');
                  setClientComments('');
                  setConfirmedBooking(null);
                }}
                className="rounded-none border border-stone-borders bg-transparent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-charcoal hover:bg-stone-charcoal hover:text-stone-sand cursor-pointer transition-all duration-300"
              >
                Agendar otro turno
              </button>

              <button
                onClick={onViewReservations}
                className="rounded-none bg-stone-charcoal border border-stone-charcoal px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-sand hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer"
              >
                Ver mis turnos agendados
              </button>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}
