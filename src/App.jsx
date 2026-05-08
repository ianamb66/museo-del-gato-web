import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Ticket, Clock, Camera, Users, ShoppingBag,
  ChevronRight, Menu, X,
  Sun, Moon, CheckCircle2, ChevronDown, Download, ArrowRight, Loader2,
  HeartHandshake, Coffee
} from 'lucide-react';

// --- CUSTOM HOOK PARA ANIMACIONES POR SCROLL ---
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// --- ICONOS CUSTOM (Estilo Moodboard) ---
const CatEyeIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M12 9V15" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Logo = ({ textColor = 'text-[#F4EFE6]', borderColor = '#F4EFE6' }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div
      className={`${textColor} relative flex items-center justify-center w-10 h-10 border rounded-t-full rounded-b-md transition-transform duration-700 group-hover:rotate-12`}
      style={{ borderColor }}
    >
      <CatEyeIcon className={`w-5 h-5 ${textColor}`} />
    </div>
    <div className={`flex flex-col ${textColor}`}>
      <span className="text-xl font-serif leading-none tracking-widest uppercase">Museo</span>
      <span className="text-sm font-sans tracking-[0.3em] font-light">DEL GATO</span>
    </div>
  </div>
);

// --- COMPONENTES UI ---
const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const baseStyle = 'relative inline-flex items-center justify-center px-8 py-3 rounded-full font-sans font-medium text-sm tracking-widest uppercase transition-all duration-500 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group';

  const variants = {
    primary: 'bg-[#C6A25A] hover:bg-[#B79A5B] text-white shadow-[0_0_20px_rgba(198,162,90,0.3)]',
    outline: 'border border-[#C6A25A] text-[#C6A25A] hover:bg-[#C6A25A] hover:text-[#1A1A1D]',
    ghost: 'text-[#8E9A8A] hover:text-[#C6A25A] transition-colors'
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

const SectionTitle = ({ subtitle, title, align = 'left', light = false }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className={`w-8 h-[1px] ${light ? 'bg-[#F4EFE6]/50' : 'bg-[#C6A25A]'}`}></div>
        <span className={`${light ? 'text-[#F4EFE6]/70' : 'text-[#C6A25A]'} font-sans font-medium tracking-[0.3em] uppercase text-xs`}>
          {subtitle}
        </span>
      </div>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif transition-colors duration-500 leading-tight ${light ? 'text-[#F4EFE6]' : 'text-[#1A1A1D] dark:text-[#F4EFE6]'}`}>
        {title}
      </h2>
    </div>
  );
};

// --- SECCIONES PRINCIPALES ---
const Hero = ({ onExplore }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#1A1A1D]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1A1A1D]/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D]/80 via-transparent to-[#1A1A1D] z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
          alt="Arcos arquitectónicos"
          className={`w-full h-full object-cover grayscale contrast-125 brightness-50 transform transition-all duration-[3000ms] ${isLoaded ? 'scale-105 opacity-100' : 'scale-110 opacity-0'}`}
        />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C6A25A]/15 blur-[150px] pointer-events-none z-10"></div>

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C6A25A]/40 rounded-full blur-[1px] animate-float"
            style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s`, animationDuration: `${15 + Math.random() * 10}s` }}
          ></div>
        ))}
      </div>

      <div className={`relative z-20 text-center px-6 max-w-5xl mt-16 md:mt-0 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <CatEyeIcon className="w-12 h-12 text-[#C6A25A] mx-auto mb-8 animate-pulse-slow" />
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-[#F4EFE6] mb-6 tracking-tight drop-shadow-2xl">
          El mundo a través<br />del ojo felino.
        </h1>
        <p className="text-base md:text-xl text-[#F4EFE6]/80 mb-10 font-sans font-light leading-relaxed max-w-2xl mx-auto">
          La primera experiencia inmersiva, lúdica y educativa que celebra el universo de los felinos a través del arte, el juego y las emociones.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button onClick={() => onExplore('tickets')} className="w-full sm:w-auto">Adquirir Acceso</Button>
          <Button
            variant="outline"
            onClick={() => onExplore('manifesto')}
            className="w-full sm:w-auto border-[#F4EFE6]/30 text-[#F4EFE6] hover:bg-[#F4EFE6] hover:text-[#1A1A1D]"
          >
            Descubrir
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-70">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C6A25A]">Paseo de la Reforma, CDMX</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#C6A25A] to-transparent"></div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  const [ref, isVisible] = useReveal();
  return (
    <section id="manifesto" className="py-32 bg-[#F4EFE6] dark:bg-[#1A1A1D] transition-colors duration-500">
      <div ref={ref} className={`container mx-auto px-6 max-w-4xl text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-3xl md:text-5xl font-serif text-[#1A1A1D] dark:text-[#F4EFE6] mb-8 leading-snug">
          "Más que un museo: un punto de encuentro, un motor de comunidad y una experiencia con impacto real."
        </h3>
        <div className="w-16 h-[1px] bg-[#C56A4A] mx-auto mb-8"></div>
        <p className="text-lg text-[#1A1A1D]/80 dark:text-[#F4EFE6]/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
          Generamos una conexión genuina con nuestros visitantes. Una plataforma cultural, comercial y experiencial donde convergen los sentidos y la admiración profunda por la naturaleza felina.
        </p>
      </div>
    </section>
  );
};

const SalaCard = ({ sala, idx }) => {
  const [ref, isVisible] = useReveal();

  return (
    <div ref={ref} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
      <div className="w-full lg:w-1/2 group relative">
        <div className="absolute -inset-4 border border-[#C6A25A]/30 rounded-t-[50%] rounded-b-xl transform group-hover:scale-105 transition-transform duration-1000"></div>
        <div className="overflow-hidden rounded-t-[50%] rounded-b-xl relative shadow-2xl aspect-[3/4] bg-[#1A1A1D]">
          <div className="absolute inset-0 bg-[#0D1B2A]/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
          <img src={sala.img} alt={sala.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 sepia-[.15]" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-6">
        <div className="text-[#C56A4A] font-sans text-sm tracking-widest uppercase mb-2 flex items-center gap-4">
          <span>Sala 0{idx + 1}</span>
          <div className="w-12 h-[1px] bg-[#C56A4A]"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1D] dark:text-[#F4EFE6] transition-colors duration-500 leading-tight">{sala.title}</h3>
        <p className="text-lg text-[#1A1A1D]/70 dark:text-[#F4EFE6]/70 font-sans font-light leading-relaxed transition-colors duration-500">{sala.desc}</p>
        <div className="pt-8">
          <a href="#tickets" className="inline-flex items-center gap-3 text-[#C6A25A] font-sans font-medium uppercase tracking-widest text-sm group transition-colors">
            <span className="relative overflow-hidden pb-1">
              Reservar acceso
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A25A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const salas = [
    {
      title: 'Percepción Sensorial',
      desc: 'Descubre cómo los gatos perciben el mundo. Estaciones sensoriales interactivas, proyecciones y juegos de luz que te permitirán ver, escuchar y sentir a través de un ojo felino.',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000'
    },
    {
      title: 'Naturaleza e Instinto',
      desc: '¡Rasguñar es natural! Una sala donde el instinto cobra vida a través de instalaciones como nuestro Muro Rascador Interactivo. Para un gato, cada movimiento y olor cuenta una historia.',
      img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000'
    },
    {
      title: 'Sala del Arenero',
      desc: 'El cierre más divertido. Una instalación a macro-escala con un arenero gigante, rascadores y juguetes de tamaño real. Un espacio colorido y memorable que invita a jugar y compartir la experiencia.',
      img: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000'
    }
  ];

  return (
    <section id="experience" className="py-32 bg-[#F4EFE6] dark:bg-[#1A1A1D] transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionTitle subtitle="Inmersión" title="Las Áreas del Museo" />
        <div className="space-y-40 mt-24">
          {salas.map((sala, idx) => (
            <SalaCard key={idx} sala={sala} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialImpact = () => {
  const [ref, isVisible] = useReveal();
  return (
    <section className="py-32 bg-[#C6A25A] text-[#1A1A1D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
      <div ref={ref} className={`container mx-auto px-6 max-w-5xl relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center">
          <HeartHandshake className="w-16 h-16 mx-auto mb-8 text-[#1A1A1D]/80" strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Responsabilidad Animal</h2>
          <p className="text-lg md:text-xl font-sans font-medium max-w-3xl mx-auto leading-relaxed mb-10 text-[#1A1A1D]/80">
            Nuestro compromiso con los felinos se extiende más allá del museo. Queremos ser un agente de cambio social con beneficios prácticos y medibles.
          </p>
          <div className="bg-[#1A1A1D]/5 border border-[#1A1A1D]/10 p-8 md:p-10 rounded-2xl max-w-3xl mx-auto text-left backdrop-blur-sm">
            <p className="font-sans text-base leading-relaxed">
              Con parte de los ingresos obtenidos a través de tus visitas, <strong>financiaremos una unidad móvil de esterilización para gatos</strong> que visitará distintas zonas urbanas, comenzando en la Ciudad de México, ofreciendo un servicio completamente gratuito para la comunidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({ date: '', time: '', type: 'general', tickets: 1 });
  const [status, setStatus] = useState('idle');
  const [ref, isVisible] = useReveal();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  const inputClasses = 'w-full bg-white dark:bg-[#1E1E22] border border-[#C6A25A]/30 rounded-none p-4 text-[#1A1A1D] dark:text-[#F4EFE6] font-sans focus:border-[#C6A25A] outline-none transition-colors duration-300';

  return (
    <section id="tickets" className="py-32 bg-[#E8E4D9] dark:bg-[#1E1E22] transition-colors duration-500 relative">
      <div ref={ref} className={`container mx-auto px-6 max-w-6xl relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionTitle subtitle="Acceso" title="Asegura tu Entrada" />
            <div className="bg-[#1A1A1D] dark:bg-[#1A1A1D] p-8 text-[#F4EFE6] border-l-4 border-[#C6A25A] mb-10">
              <p className="font-sans font-light text-sm leading-relaxed">
                Para mantener la calidad de la experiencia inmersiva, el acceso está limitado a grupos por horario. Al comprar tu boleto, no solo vives el museo, también <strong className="text-[#C6A25A]">apoyas nuestra unidad móvil de esterilización gratuita.</strong>
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Ticket, title: 'Admisión General', desc: '$250 MXN - Recorrido inmersivo completo.' },
                { icon: Users, title: 'Tarifa Especial', desc: '$180 MXN - Estudiantes e INAPAM (credencial vigente).' },
                { icon: Clock, title: 'Horarios', desc: 'Martes a Domingo. Cupo limitado por hora.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-[#C6A25A] rounded-t-full rounded-b-md flex items-center justify-center text-[#C6A25A] flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-serif text-xl text-[#1A1A1D] dark:text-[#F4EFE6]">{item.title}</h5>
                    <p className="text-[#1A1A1D]/70 dark:text-[#F4EFE6]/70 font-sans text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1D] p-10 md:p-12 shadow-2xl border border-[#C6A25A]/20 transition-colors duration-500">
            {status === 'success' ? (
              <div className="text-center py-16 animate-fade-in">
                <CheckCircle2 className="w-20 h-20 text-[#7A8A7A] mx-auto mb-6" />
                <h4 className="text-3xl font-serif text-[#1A1A1D] dark:text-[#F4EFE6] mb-4">Acceso confirmado</h4>
                <p className="text-[#1A1A1D]/70 dark:text-[#F4EFE6]/70 font-sans">Redirigiendo a la pasarela de pago seguro...</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout}>
                <div className="flex items-center justify-between mb-10">
                  <h4 className="text-2xl font-serif text-[#1A1A1D] dark:text-[#F4EFE6]">Configurar Acceso</h4>
                  <CatEyeIcon className="text-[#C6A25A] w-6 h-6" />
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#C56A4A] mb-2 font-bold font-sans">Fecha de visita</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#C56A4A] mb-2 font-bold font-sans">Horario de Ingreso</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="">Seleccionar bloque</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 text-[#C6A25A] pointer-events-none" size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C56A4A] mb-2 font-bold font-sans">Admisión</label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className={`${inputClasses} appearance-none`}
                        >
                          <option value="general">General</option>
                          <option value="especial">Especial</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-4 text-[#C6A25A] pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[#C56A4A] mb-2 font-bold font-sans">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={formData.tickets}
                        onChange={(e) => setFormData({ ...formData, tickets: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#C6A25A]/30 mt-10 pt-6 mb-8 flex justify-between items-end text-[#1A1A1D] dark:text-[#F4EFE6]">
                  <span className="font-sans text-sm uppercase tracking-widest text-[#1A1A1D]/70 dark:text-[#F4EFE6]/70">Total estimado:</span>
                  <span className="text-3xl font-serif">
                    ${formData.type === 'general' ? formData.tickets * 250 : formData.tickets * 180} <span className="text-lg">MXN</span>
                  </span>
                </div>

                <Button type="submit" className="w-full py-5 text-sm" isLoading={status === 'loading'}>
                  Adquirir Boletos
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CafeAndBoutique = () => {
  const items = [
    { title: 'Merch Exclusiva MDG', price: '$350', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600', tag: 'Edición Limitada' },
    { title: 'Café de Especialidad', price: '$85', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600', tag: 'Barra de Café' },
    { title: 'Libro: Curaduría Felina', price: '$450', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600', tag: 'Editorial' },
    { title: 'Juguetes Artesanales', price: '$220', img: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=600', tag: 'Boutique' }
  ];

  return (
    <section id="cafe" className="py-32 bg-[#F4EFE6] dark:bg-[#1A1A1D] transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <SectionTitle subtitle="Espacio Social" title="Café & Boutique" />
            <p className="text-lg text-[#1A1A1D]/70 dark:text-[#F4EFE6]/70 font-sans font-light mt-[-20px] leading-relaxed">
              El punto de encuentro donde convergen sabores y la experiencia. Disfruta de nuestra barra y llévate un recuerdo con la mercancía de edición limitada del museo y productos de nuestros patrocinadores.
            </p>
          </div>
          <a href="#" className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-[#C6A25A] hover:text-[#B79A5B] flex items-center gap-2 mb-6 group shrink-0">
            Ver catálogo <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <div key={i} className="group cursor-pointer transition-all duration-1000 transform">
              <div className="overflow-hidden rounded-t-[50%] rounded-b-md mb-6 aspect-[3/4] relative bg-[#E8E4D9] dark:bg-[#1E1E22] border border-[#C6A25A]/20">
                <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1A1A1D]/80 backdrop-blur-md text-[#F4EFE6] text-[9px] font-sans uppercase tracking-[0.3em] px-4 py-2 rounded-full z-10 whitespace-nowrap">
                  {item.tag}
                </span>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[.1]" />
                <div className="absolute inset-0 bg-[#1A1A1D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-[#C6A25A] text-white p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.tag === 'Barra de Café' ? <Coffee size={20} /> : <ShoppingBag size={20} />}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-serif text-xl text-[#1A1A1D] dark:text-[#F4EFE6] mb-2">{item.title}</h4>
                <p className="text-[#C56A4A] font-sans font-medium">{item.price} MXN</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GroupsAndPress = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Solicitud enviada. Nuestro equipo te contactará pronto.');
      setIsSubmitting(false);
    }, 1500);
  };

  const inputClasses = 'w-full bg-transparent border-b border-[#1A1A1D]/20 dark:border-[#F4EFE6]/20 p-3 text-[#1A1A1D] dark:text-[#F4EFE6] font-sans focus:border-[#C6A25A] outline-none transition-colors duration-300 placeholder:text-[#1A1A1D]/40 dark:placeholder:text-[#F4EFE6]/40';

  return (
    <section id="groups" className="py-32 bg-[#1A1A1D] transition-colors duration-500 relative">
      <div className="absolute inset-0 bg-[#C6A25A]/5"></div>
      <div ref={ref} className={`container mx-auto px-6 max-w-5xl relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SectionTitle subtitle="Conexiones" title="Alianzas y Grupos" align="center" light />

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <button
            onClick={() => setActiveTab('groups')}
            className={`text-sm font-sans font-medium uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${activeTab === 'groups' ? 'border-[#C6A25A] text-[#F4EFE6]' : 'border-transparent text-[#F4EFE6]/50 hover:text-[#C6A25A]'}`}
          >
            Visitas Escolares / Eventos
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`text-sm font-sans font-medium uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${activeTab === 'press' ? 'border-[#C6A25A] text-[#F4EFE6]' : 'border-transparent text-[#F4EFE6]/50 hover:text-[#C6A25A]'}`}
          >
            Prensa y RP
          </button>
        </div>

        <div className="bg-[#1E1E22] p-10 md:p-16 rounded-t-[100px] rounded-b-md transition-colors duration-500 min-h-[500px] flex items-center justify-center border border-[#C6A25A]/20 shadow-2xl">
          {activeTab === 'groups' ? (
            <div className="max-w-2xl w-full mx-auto animate-fade-in text-center">
              <h4 className="text-3xl font-serif text-[#F4EFE6] mb-4">Experiencias Privadas</h4>
              <p className="text-[#F4EFE6]/70 font-sans font-light mb-10 leading-relaxed">
                Diseñamos recorridos guiados para escuelas, corporativos y eventos privados. Una excelente oportunidad para conectar en comunidad.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-8">
                  <input placeholder="Institución o Empresa" required className={`${inputClasses} !text-[#F4EFE6] !border-[#F4EFE6]/20 focus:!border-[#C6A25A]`} />
                  <input placeholder="Nombre de Contacto" required className={`${inputClasses} !text-[#F4EFE6] !border-[#F4EFE6]/20 focus:!border-[#C6A25A]`} />
                  <input type="email" placeholder="Correo Electrónico" required className={`${inputClasses} !text-[#F4EFE6] !border-[#F4EFE6]/20 focus:!border-[#C6A25A]`} />
                  <input type="tel" placeholder="Teléfono" required className={`${inputClasses} !text-[#F4EFE6] !border-[#F4EFE6]/20 focus:!border-[#C6A25A]`} />
                </div>
                <div className="pt-8 text-center">
                  <Button type="submit" isLoading={isSubmitting}>Solicitar Información</Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-xl w-full mx-auto text-center animate-fade-in">
              <Camera className="w-12 h-12 text-[#C6A25A] mx-auto mb-8" strokeWidth={1} />
              <h4 className="text-3xl font-serif text-[#F4EFE6] mb-4">Relaciones Públicas</h4>
              <p className="text-[#F4EFE6]/70 font-sans font-light mb-10 leading-relaxed">
                Para cobertura de medios, entrevistas con curadores, creadores de contenido cultural o solicitudes específicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="outline" className="gap-3 font-sans !border-[#C6A25A] !text-[#C6A25A] hover:!bg-[#C6A25A] hover:!text-[#1A1A1D]">
                  <Download size={18} /> Kit de Prensa
                </Button>
                <Button onClick={() => (window.location.href = 'mailto:rp@museodelgato.mx')}>Contactar a RP</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
    isScrolled
      ? 'bg-[#F4EFE6]/95 dark:bg-[#1A1A1D]/95 backdrop-blur-md py-4 border-[#C6A25A]/20 shadow-sm'
      : 'bg-transparent py-8 border-transparent text-[#F4EFE6]'
  }`;

  const textColor = isScrolled ? (isDark ? 'text-[#F4EFE6]' : 'text-[#1A1A1D]') : 'text-[#F4EFE6]';
  const borderColor = isScrolled ? (isDark ? '#F4EFE6' : '#1A1A1D') : '#F4EFE6';

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div onClick={() => scrollTo('hero')}>
          <Logo textColor={textColor} borderColor={borderColor} />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'El Proyecto', id: 'manifesto' },
            { label: 'Salas', id: 'experience' },
            { label: 'Café & Shop', id: 'cafe' },
            { label: 'Grupos', id: 'groups' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-colors hover:text-[#C6A25A] ${textColor}`}
            >
              {item.label}
            </button>
          ))}

          <button onClick={toggleTheme} className={`p-2 rounded-full hover:bg-[#C6A25A]/10 transition-colors ${textColor}`}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Button
            variant="outline"
            className="px-6 py-2 text-xs"
            style={{ borderColor, color: isScrolled ? (isDark ? '#F4EFE6' : '#1A1A1D') : '#F4EFE6' }}
            onClick={() => scrollTo('tickets')}
          >
            Boletos
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={toggleTheme} className={`p-2 ${textColor}`}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={textColor}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#F4EFE6] dark:bg-[#1A1A1D] border-b border-[#C6A25A]/20 overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-8 flex flex-col gap-6 text-[#1A1A1D] dark:text-[#F4EFE6] text-center">
          {['manifesto', 'experience', 'cafe', 'groups'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-xl font-serif tracking-widest uppercase border-b border-[#C6A25A]/10 pb-4">
              {id === 'cafe' ? 'Café & Tienda' : id}
            </button>
          ))}
          <Button className="mt-4 w-full" onClick={() => scrollTo('tickets')}>Adquirir Acceso</Button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1D] text-[#F4EFE6]/70 py-24 font-sans border-t-4 border-[#C6A25A]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-20">
          <Logo textColor="text-[#F4EFE6]" borderColor="#F4EFE6" />
          <p className="mt-8 font-light max-w-md text-sm leading-relaxed tracking-wide">
            Una experiencia museográfica inmersiva para percibir el mundo a través del misterio, la sombra y la visión felina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-sm tracking-widest uppercase mb-20">
          <div>
            <h6 className="text-[#C6A25A] font-medium mb-6">Ubicación</h6>
            <p className="mb-2">Paseo de la Reforma 450</p>
            <p className="text-xs text-[#F4EFE6]/50">Colonia Juárez, CDMX</p>
          </div>
          <div>
            <h6 className="text-[#C6A25A] font-medium mb-6">Contacto & RP</h6>
            <p className="mb-2 hover:text-[#C6A25A] cursor-pointer transition-colors">rp@museodelgato.mx</p>
            <p className="text-xs text-[#F4EFE6]/50">Kit de Prensa Disponible</p>
          </div>
          <div>
            <h6 className="text-[#C6A25A] font-medium mb-6">Redes</h6>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-[#C6A25A] transition-colors"><Camera size={20} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-[#C6A25A] transition-colors"><Users size={20} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F4EFE6]/10 text-[10px] flex flex-col md:flex-row justify-between gap-4 uppercase tracking-[0.2em] font-light">
          <p>&copy; {new Date().getFullYear()} MUSEO DEL GATO CDMX.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C6A25A] transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-[#C6A25A] transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        :root {
          --color-carbon: #1A1A1D;
          --color-crema: #F4EFE6;
          --color-terracota: #C97B63;
          --color-terracota-dark: #C56A4A;
          --color-dorado: #C6A25A;
          --color-dorado-dark: #B79A5B;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: var(--color-crema);
        }

        .dark body {
          background-color: var(--color-carbon);
        }

        h1, h2, h3, h4, h5, h6, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-20vh) translateX(20px); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }

        .animate-float { animation: float linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`min-h-screen selection:bg-[#C6A25A]/30 selection:text-[#C6A25A] ${isDark ? 'dark' : ''}`}>
        <div className="bg-[#F4EFE6] dark:bg-[#1A1A1D] text-[#1A1A1D] dark:text-[#F4EFE6] transition-colors duration-700 flex flex-col min-h-screen">
          <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

          <main className="flex-grow">
            <Hero onExplore={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} />
            <Manifesto />
            <Experience />
            <SocialImpact />
            <Booking />
            <CafeAndBoutique />
            <GroupsAndPress />
          </main>

          <Footer />

          <div className="fixed bottom-6 right-6 z-40 lg:hidden">
            <button
              onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#C6A25A] text-white p-4 rounded-full shadow-[0_0_20px_rgba(198,162,90,0.4)] flex items-center justify-center border border-[#F4EFE6]/20"
            >
              <Ticket size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
