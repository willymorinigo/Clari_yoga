/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, KeyRound, ShieldCheck, PlusCircle, Trash2, Edit3, 
  Save, Undo2, AlertCircle, CheckCircle, Sparkles, X, ChevronRight, FileText, Plus
} from 'lucide-react';
import { Service } from '../types';

interface AdminPanelProps {
  services: Service[];
  onServicesUpdated: (updatedServices: Service[]) => void;
  onClose: () => void;
}

// Pre-defined templates for creating new service cards
const SERVICE_TEMPLATES = {
  yoga: {
    name: 'Nueva Práctica de Yoga',
    description: 'Descripción detallada de la propuesta, indicando los enfoques en respiración (Pranayama), posturas (Asanas) y meditación Zen.',
    category: 'yoga' as const,
    duration: 60,
    price: 4000,
    intensity: 'Suave' as const,
    benefits: [
      'Reduce notablemente el estrés y la tensión mental',
      'Mejora la flexibilidad corporal y el balance general',
      'Fomenta la autorregulación física y mental'
    ]
  },
  shiatsu: {
    name: 'Nueva Sesión de Shiatsu',
    description: 'Terapia manual de acupresión que sigue los meridianos tradicionales para desbloquear y liberar la tensión corporal acumulada.',
    category: 'shiatsu' as const,
    duration: 60,
    price: 7000,
    intensity: 'Moderada' as const,
    benefits: [
      'Alivia contracturas corporales y dolores cronificados',
      'Sincroniza y estimula la circulación de energía vital',
      'Aporta un profundo estado de bienestar y armonía física'
    ]
  },
  combo: {
    name: 'Nuevo Ritual Especial',
    description: 'Combinación armoniosa y exclusiva de yoga restaurativo con digitopresión corporal para obtener la experiencia máxima de relajación zen.',
    category: 'combo' as const,
    duration: 90,
    price: 10000,
    intensity: 'Restaurativa' as const,
    benefits: [
      'Sinergia premium de estiramientos suaves y masaje Shiatsu hara',
      'Incluye una infusión de cortesía al concluir la sesión',
      'Espacio completo de desconexión y profunda presencia mental'
    ]
  }
};

export default function AdminPanel({ services, onServicesUpdated, onClose }: AdminPanelProps) {
  // Authentication states
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  // Listing and editing states
  const [editedServices, setEditedServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newServiceCategory, setNewServiceCategory] = useState<'yoga' | 'shiatsu' | 'combo'>('yoga');
  const [deleteConfirmCardId, setDeleteConfirmCardId] = useState<string | null>(null);

  // Input states for active editor
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editCategory, setEditCategory] = useState<'yoga' | 'shiatsu' | 'combo'>('yoga');
  const [editDuration, setEditDuration] = useState<number>(60);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editIntensity, setEditIntensity] = useState<'Suave' | 'Moderada' | 'Intensa' | 'Restaurativa'>('Suave');
  const [editBenefits, setEditBenefits] = useState<string[]>([]);
  const [newBenefitInput, setNewBenefitInput] = useState<string>('');

  // Status message overlays
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Load token from localStorage on initialization
  useEffect(() => {
    const savedToken = localStorage.getItem('clara_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Set editable services list when props or authentication changes
  useEffect(() => {
    setEditedServices([...services]);
  }, [services, isAuthenticated]);

  // Handle administrator login
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoginLoading(true);

    try {
      const resp = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await resp.json();

      if (data.success && data.token) {
        localStorage.setItem('clara_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setLoginError(data.message || 'Contraseña incorrecta. Por favor reintente.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('No se pudo establecer conexión con el backend.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('clara_admin_token');
    setToken('');
    setIsAuthenticated(false);
    setSelectedService(null);
    setIsCreatingNew(false);
  };

  // Open the card editor for a specific service
  const handleStartEdit = (service: Service) => {
    setSelectedService(service);
    setIsCreatingNew(false);
    setEditName(service.name);
    setEditDescription(service.description);
    setEditCategory(service.category);
    setEditDuration(service.duration);
    setEditPrice(service.price);
    setEditIntensity(service.intensity || 'Suave');
    setEditBenefits([...service.benefits]);
    setNewBenefitInput('');
    setStatusMessage(null);
  };

  // Start creation of a service based on matching templates
  const handleStartCreate = (category: 'yoga' | 'shiatsu' | 'combo') => {
    const template = SERVICE_TEMPLATES[category];
    const temporaryId = `service-${Date.now()}-${Math.floor(Math.random() * 100)}`;
    
    setSelectedService({
      id: temporaryId,
      ...template
    });
    setIsCreatingNew(true);
    setEditName(template.name);
    setEditDescription(template.description);
    setEditCategory(template.category);
    setEditDuration(template.duration);
    setEditPrice(template.price);
    setEditIntensity(template.intensity);
    setEditBenefits([...template.benefits]);
    setNewBenefitInput('');
    setStatusMessage(null);
  };

  // Benefit dynamic lists
  const handleAddBenefit = () => {
    if (newBenefitInput.trim() !== '') {
      setEditBenefits([...editBenefits, newBenefitInput.trim()]);
      setNewBenefitInput('');
    }
  };

  const handleRemoveBenefit = (indexToRemove: number) => {
    setEditBenefits(editBenefits.filter((_, i) => i !== indexToRemove));
  };

  // Save the temporary edited card into state and sync with the database immediately
  const handleSaveCardLocally = async () => {
    if (!editName.trim()) {
      setStatusMessage({ text: 'El nombre del servicio no puede estar vacío.', isError: true });
      return;
    }

    if (!selectedService) return;

    const updatedServiceItem: Service = {
      id: selectedService.id,
      name: editName.trim(),
      description: editDescription.trim(),
      category: editCategory,
      duration: Number(editDuration) || 60,
      price: Number(editPrice) || 0,
      intensity: editIntensity,
      benefits: editBenefits
    };

    let updatedList: Service[];
    if (isCreatingNew) {
      updatedList = [...editedServices, updatedServiceItem];
    } else {
      updatedList = editedServices.map(s => s.id === selectedService.id ? updatedServiceItem : s);
    }

    setEditedServices(updatedList);
    setSelectedService(null);
    setIsCreatingNew(false);

    // Save directly to backend for instant feedback and a highly reactive admin experience
    await handleSyncWithBackend(updatedList);
  };

  // Sync state list with the Express JSON backend
  const handleSyncWithBackend = async (listToSync = editedServices) => {
    setSaveLoading(true);
    setStatusMessage(null);

    try {
      const resp = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ services: listToSync })
      });

      const data = await resp.json();

      if (resp.ok && data.success) {
        onServicesUpdated(data.services);
        setEditedServices(data.services);
        setStatusMessage({ text: '¡Cambios guardados con éxito en la base de datos! Las tarjetas de reserva han sido actualizadas.', isError: false });
      } else {
        setStatusMessage({ text: data.message || 'Error al guardar los cambios en el servidor.', isError: true });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ text: 'Error de red. No se pudo sincronizar con el backend de datos.', isError: true });
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete a service card (uses clean state-based confirmation instead of vulnerable window.confirm)
  const handleDeleteCard = (id: string) => {
    const updatedList = editedServices.filter(s => s.id !== id);
    setEditedServices(updatedList);
    setDeleteConfirmCardId(null);
    
    // Sync with backend immediately
    handleSyncWithBackend(updatedList);
  };

  return (
    <div id="admin-panel-container" className="mx-auto max-w-5xl px-4 py-12">
      
      {/* Title & Close Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-borders mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary block">Consola Privada</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Sesión activa" />
          </div>
          <h2 className="font-serif text-3xl font-light text-stone-charcoal mt-1">
            Gestión del Tatami & Oferta
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Administra los datos, precios, intensidades y los textos explicativos de las tarjetas de reserva que los clientes visualizan en la web.
          </p>
        </div>

        <button
          onClick={onClose}
          className="self-start md:self-auto flex items-center justify-center gap-1.5 border border-stone-borders hover:border-stone-charcoal hover:bg-stone-charcoal hover:text-stone-sand text-stone-600 font-bold text-[9px] uppercase tracking-widest px-4 py-2.5 transition-all duration-300 rounded-none cursor-pointer"
        >
          <Undo2 className="h-3.5 w-3.5" />
          Volver a la Web
        </button>
      </div>

      {/* 🔐 AUTHENTICATION FORM OVERLAY if not authenticated */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white border border-stone-borders p-8 shadow-none mt-12">
          <div className="flex flex-col items-center text-center space-y-4 mb-6">
            <div className="bg-stone-sand rounded-none p-4 border border-stone-borders">
              <Lock className="h-6 w-6 text-stone-gold" />
            </div>
            <h3 className="font-serif text-xl font-light text-stone-charcoal">Ingreso Seguro</h3>
            <p className="text-xs text-stone-400 font-light">
              Por favor introduce la clave de acceso de Clara para administrar las reservas y tarjetas de servicios.
            </p>
            <p className="text-[10px] text-stone-gold bg-stone-charcoal/5 border border-stone-gold/15 p-2.5 font-mono">
              Clave de acceso: <span className="font-bold underline">ubuntu</span> (o tu variable ADMIN_PASSWORD si fue personalizada)
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                Clave de Administración
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Introduce la contraseña"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal placeholder:text-stone-300 font-mono transition-colors focus:border-stone-charcoal outline-hidden pr-10"
                  required
                />
                <KeyRound className="absolute right-3.5 top-3 h-4 w-4 text-stone-300" />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-100 text-red-650 rounded-none">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-[11px] font-medium">{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoginLoading}
              className={`w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDFCF8] rounded-none transition-all duration-300 cursor-pointer bg-stone-charcoal border border-stone-charcoal hover:bg-primary hover:border-primary disabled:bg-stone-300 disabled:border-stone-300 disabled:cursor-not-allowed`}
            >
              {isLoginLoading ? 'Verificando...' : 'Iniciar Administración'}
            </button>

            <div className="text-center pt-2">
              <span className="text-[10px] text-stone-400 font-light">
                Espacio: Ubuntu Multiespacio (Calle 48, La Plata)
              </span>
            </div>
          </form>
        </div>
      ) : (
        /* 🛠️ AUTHENTICATED ADMIN AREA */
        <div className="space-y-8">
          
          {/* Admin Context Header Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-stone-sand border border-stone-borders">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-charcoal">
                Sesión de Admin autorizada
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-[9px] uppercase font-bold tracking-widest text-stone-400 hover:text-red-650 transition-colors cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Status feedback panel if active */}
          {statusMessage && (
            <div className={`p-4 border flex items-start gap-3 rounded-none ${
              statusMessage.isError 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              {statusMessage.isError ? (
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
              )}
              <div className="text-xs font-light">
                {statusMessage.text}
              </div>
              <button 
                onClick={() => setStatusMessage(null)} 
                className="ml-auto text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* TWO COLUMN GRID: LEFT = CARD LIST OR CREATE ACTIONS, RIGHT = CARD EDITOR */}
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* LEFT AREA: Cards & templates list (8 columns or full if editor closed) */}
            <div className={`${selectedService ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-6`}>
              
              {/* Template creation area */}
              <div className="bg-white border border-stone-borders p-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-charcoal block mb-4">
                  Crear Nueva Tarjeta basado en Plantillas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleStartCreate('yoga')}
                    className="flex flex-col items-center text-center p-4 border border-stone-borders bg-stone-sand/20 hover:bg-stone-sand hover:border-stone-charcoal transition-all duration-300 rounded-none cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🧘</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-charcoal">Plantilla Yoga</span>
                    <span className="text-[9px] text-stone-400 font-light mt-1">Shin-Shin-Toitsu-Do</span>
                  </button>

                  <button
                    onClick={() => handleStartCreate('shiatsu')}
                    className="flex flex-col items-center text-center p-4 border border-stone-borders bg-stone-sand/20 hover:bg-stone-sand hover:border-stone-charcoal transition-all duration-300 rounded-none cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💆</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6044]">Plantilla Shiatsu</span>
                    <span className="text-[9px] text-stone-400 font-light mt-1">Acupresión Japonesa</span>
                  </button>

                  <button
                    onClick={() => handleStartCreate('combo')}
                    className="flex flex-col items-center text-center p-4 border border-[#C5A059]/40 bg-[#FCDA16]/5 hover:bg-[#FCDA16]/10 hover:border-stone-gold transition-all duration-300 rounded-none cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎐</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-gold">Plantilla Combo</span>
                    <span className="text-[9px] text-stone-450 font-light mt-1">Ritual Combinado</span>
                  </button>
                </div>
              </div>

              {/* Master List of current editable cards */}
              <div className="bg-white border border-stone-borders p-6">
                <div className="flex justify-between items-center pb-4 border-b border-stone-borders mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-charcoal block">
                    Tarjetas Actuales ({editedServices.length})
                  </span>
                  <button
                    onClick={() => handleSyncWithBackend()}
                    disabled={saveLoading}
                    className="flex items-center gap-1.5 border border-[#C5A059] bg-[#FDFCF8] hover:bg-stone-charcoal hover:border-stone-charcoal hover:text-stone-sand text-stone-gold font-bold text-[9px] uppercase tracking-widest px-3.5 py-1.5 transition-all duration-300 rounded-none cursor-pointer disabled:bg-stone-100 disabled:border-stone-105"
                  >
                    <Save className="h-3 w-3" />
                    {saveLoading ? 'Sincronizando...' : 'Guardar todo en Servidor'}
                  </button>
                </div>

                <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                  {editedServices.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 font-light text-xs">
                      No hay tarjetas disponibles. Crea una con las plantillas superiores.
                    </div>
                  ) : (
                    editedServices.map((service) => {
                      const isActiveEd = selectedService?.id === service.id;
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border transition-all duration-300 flex items-center justify-between gap-4 ${
                            isActiveEd 
                              ? 'border-stone-charcoal bg-stone-sand/40 scale-[0.99] shadow-inner' 
                              : service.category === 'combo'
                              ? 'border-stone-gold/50 bg-stone-sand/10 hover:border-stone-charcoal'
                              : 'border-stone-borders hover:border-stone-charcoal bg-white'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[8px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 ${
                                service.category === 'yoga' ? 'bg-indigo-50 border border-indigo-100 text-indigo-750' :
                                service.category === 'shiatsu' ? 'bg-olive-50 border border-olive-150 text-olive-800' :
                                'bg-[#FDFCF8] border border-stone-gold text-stone-gold'
                              }`}>
                                {service.category === 'yoga' ? '🧘 Yoga' : service.category === 'shiatsu' ? '💆 Shiatsu' : '🎐 Combo'}
                              </span>
                              <span className="text-[9px] font-mono text-stone-400">
                                {service.duration} min • ${service.price.toLocaleString('es-AR')}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-medium text-stone-charcoal truncate">
                              {service.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {deleteConfirmCardId === service.id ? (
                              <div className="flex items-center gap-1 bg-red-50 border border-red-200 p-1">
                                <span className="text-[9px] text-red-650 font-bold uppercase tracking-wider px-1">
                                  ¿Borrar?
                                </span>
                                <button
                                  onClick={() => handleDeleteCard(service.id)}
                                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white bg-red-650 hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                  Sí
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmCardId(null)}
                                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-stone-600 border border-stone-borders bg-white hover:bg-stone-sand transition-colors cursor-pointer"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleStartEdit(service)}
                                  title="Editar propiedades de tarjeta"
                                  className="p-2 border border-stone-borders bg-white text-stone-600 hover:border-stone-charcoal hover:bg-stone-charcoal hover:text-stone-sand transition-all rounded-none cursor-pointer"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmCardId(service.id)}
                                  title="Eliminar tarjeta"
                                  className="p-2 border border-red-150 bg-red-50 text-red-650 hover:bg-red-650 hover:text-white transition-all rounded-none cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT AREA: THE ACTIVE FORM EDITOR (7 columns) */}
            <AnimatePresence mode="wait">
              {selectedService && (
                <motion.div
                  key={`editor-${selectedService.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-7 bg-white border border-stone-charcoal p-6 md:p-8"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-stone-borders mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-stone-gold animate-bounce" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-charcoal">
                        {isCreatingNew ? 'Creando Nueva Opción' : 'Editando Tarjeta de Opción'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setIsCreatingNew(false);
                      }}
                      className="text-stone-400 hover:text-stone-750 transition-colors p-1"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Unique ID displays as informational */}
                    <div>
                      <label className="block text-[8px] font-mono uppercase tracking-widest text-stone-400 mb-1">
                        ID Único de Identificación (Slug)
                      </label>
                      <input
                        type="text"
                        value={selectedService.id}
                        disabled
                        className="w-full rounded-none border border-stone-borders bg-stone-sand/20 px-3.5 py-2 text-xs font-mono text-stone-500 outline-hidden cursor-not-allowed"
                      />
                    </div>

                    {/* Title Name */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                        Título de la Disciplina / Sesión
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Yoga Zen para Principiantes"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal font-sans transition-colors focus:border-stone-charcoal outline-hidden"
                      />
                    </div>

                    {/* Category Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                          Categoría Técnica
                        </label>
                        <select
                          value={editCategory}
                          onChange={(e: any) => setEditCategory(e.target.value)}
                          className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal transition-colors focus:border-stone-charcoal outline-hidden cursor-pointer"
                        >
                          <option value="yoga">🧘 Yoga Zen (Japonés)</option>
                          <option value="shiatsu">💆 Masaje Shiatsu (Táctil)</option>
                          <option value="combo">🎐 Ritual Sinergia (Premium)</option>
                        </select>
                      </div>

                      {/* Intensity Select level */}
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                          Nivel de Intensidad
                        </label>
                        <select
                          value={editIntensity}
                          onChange={(e: any) => setEditIntensity(e.target.value)}
                          className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal transition-colors focus:border-stone-charcoal outline-hidden cursor-pointer"
                        >
                          <option value="Suave">Suave (Relajante)</option>
                          <option value="Moderada">Moderada (Activa)</option>
                          <option value="Intensa">Intensa (Física)</option>
                          <option value="Restaurativa">Restaurativa (Fascia/Sostén)</option>
                        </select>
                      </div>
                    </div>

                    {/* Duration / Price numbers row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                          Duración de Sesión (Minutos)
                        </label>
                        <input
                          type="number"
                          placeholder="60"
                          min="15"
                          max="240"
                          value={editDuration}
                          onChange={(e) => setEditDuration(Number(e.target.value) || 0)}
                          className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal font-sans transition-colors focus:border-stone-charcoal outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                          Precio de Inversión ($ ARS)
                        </label>
                        <input
                          type="number"
                          placeholder="3500"
                          min="0"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value) || 0)}
                          className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal font-sans transition-colors focus:border-stone-charcoal outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                        Descripción Informativa de la Clase o Manual
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Brinda detalles precisos de la práctica, técnicas asimiladas y enfoque sutil zen..."
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full rounded-none border border-stone-borders bg-white px-3.5 py-3 text-xs text-stone-charcoal font-sans transition-colors focus:border-stone-charcoal outline-hidden resize-none leading-relaxed"
                      />
                    </div>

                    {/* Benefits bullet system (Interactive list) */}
                    <div className="border-t border-stone-borders pt-5">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-charcoal mb-2">
                        Puntos de Beneficios Informativos ({editBenefits.length})
                      </label>
                      
                      <div className="space-y-2 mb-4 max-h-[140px] overflow-y-auto pr-1">
                        {editBenefits.length === 0 ? (
                          <span className="text-[11px] text-stone-400 italic block">
                            No se han añadido beneficios aún.
                          </span>
                        ) : (
                          editBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-center justify-between gap-3 p-1.5 border border-stone-sand bg-stone-sand/20 text-xs">
                              <span className="truncate pr-4 text-stone-550">{benefit}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveBenefit(index)}
                                className="text-stone-300 hover:text-red-500 cursor-pointer p-0.5"
                                title="Eliminar fila"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Benefits inputs */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Añade un beneficio destacado..."
                          value={newBenefitInput}
                          onChange={(e) => setNewBenefitInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddBenefit();
                            }
                          }}
                          className="flex-1 rounded-none border border-stone-borders bg-white px-3.5 py-2.5 text-xs text-stone-charcoal transition-colors focus:border-stone-charcoal outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={handleAddBenefit}
                          className="flex items-center justify-center p-2.5 bg-stone-charcoal hover:bg-primary text-stone-sand transition-all rounded-none cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Save Locally Actions */}
                    <div className="pt-6 border-t border-stone-borders flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSaveCardLocally}
                        className="flex-1 flex items-center justify-center gap-2 rounded-none bg-stone-charcoal border border-stone-charcoal text-[#FDFCF8] font-bold text-[10px] uppercase tracking-wider px-6 py-4 cursor-pointer hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        Aplicar Cambios en Tarjeta
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedService(null);
                          setIsCreatingNew(false);
                        }}
                        className="rounded-none border border-stone-borders bg-white hover:bg-stone-sand text-stone-500 font-bold text-[10px] uppercase tracking-wider px-6 py-4 cursor-pointer transition-colors"
                      >
                        Descartar
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Massive footer instruction for Clara */}
          <div className="bg-stone-charcoal border border-stone-charcoal p-6 md:p-8 text-stone-sand/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 md:max-w-2xl text-center md:text-left">
              <span className="text-[10px] text-stone-gold font-bold uppercase tracking-[0.2em] block">Sincronización de Base de Datos</span>
              <h3 className="font-serif text-lg font-light text-[#FDFCF8]">¿Terminaste de actualizar tus tarjetas?</h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Cada tarjeta modificada arriba se aplica temporalmente en tu navegador. Para que estos cambios queden grabados permanentemente en el servidor y sean visibles para todos los alumnos que ingresen a la aplicación, haz clic en el botón Sincronizar.
              </p>
            </div>

            <button
              onClick={() => handleSyncWithBackend()}
              disabled={saveLoading}
              className={`w-full md:w-auto shrink-0 flex items-center justify-center gap-2 rounded-none bg-[#FDFCF8] hover:bg-stone-gold border border-[#FDFCF8] hover:border-stone-gold px-8 py-4.5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-charcoal hover:text-stone-sand active:scale-98 transition-all duration-300 cursor-pointer shadow-md`}
            >
              <Save className="h-4.5 w-4.5" />
              {saveLoading ? 'Sincronizando...' : 'Sincronizar con el Servidor'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
