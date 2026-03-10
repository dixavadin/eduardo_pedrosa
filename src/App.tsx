import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Phone, ArrowRight, CheckCircle2, Instagram, Facebook, Globe, Settings } from 'lucide-react';
import { ChatAssistant } from './components/ChatAssistant';
import { RegistrationModal } from './components/RegistrationModal';

const PageWrapper = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const Highlight = ({ children, color = "blue" }: { children: React.ReactNode, color?: "blue" | "green" | "dark-blue" | "dark-green" }) => {
  const colors = {
    blue: "text-brand-accent-blue font-bold",
    green: "text-brand-accent-green font-bold",
    "dark-blue": "text-blue-400 font-bold",
    "dark-green": "text-emerald-400 font-bold"
  };
  return <span className={colors[color]}>{children}</span>;
};

const NavDots = ({ activeIndex, total }: { activeIndex: number, total: number }) => {
  const scrollToSlide = (index: number) => {
    const element = document.getElementById(`slide-${index}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {Array.from({ length: total }).map((_, i) => (
        <button 
          key={i}
          onClick={() => scrollToSlide(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer outline-none ${
            activeIndex === i ? 'bg-brand-accent-blue scale-125' : 'bg-white/20 hover:bg-white/40'
          }`}
          aria-label={`Ir para slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 6;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLDivElement;
      const index = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(index);
    };

    const container = document.getElementById('main-container');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="main-container" className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth text-neutral-300 bg-black">
      <NavDots activeIndex={activeIndex} total={totalPages} />
      {activeIndex !== 0 && <ChatAssistant />}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Page 1: Hero */}
      <PageWrapper id="slide-0" className="snap-start p-0 relative bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <img 
            src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/Q1_Foto1.jpeg" 
            alt="Eduardo Pedrosa" 
            className="w-full h-full object-cover scale-125 origin-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </PageWrapper>

      {/* Page 2: Telemedicine Benefits */}
      <PageWrapper id="slide-1" className="snap-start gradient-blue">
        <div className="max-w-5xl w-full flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-neutral-300">
              Entendendo as <Highlight color="dark-blue">dificuldades</Highlight> que possa existir ao visitar um hospital, o deputado Eduardo Pedrosa irá lhe oferecer as <Highlight color="dark-blue">facilidades</Highlight> da telemedicina.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <img 
              src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/Foto02.jpeg" 
              alt="Telemedicina" 
              className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </PageWrapper>

      {/* Page 3: Mobile Consultations */}
      <PageWrapper id="slide-2" className="snap-start gradient-blue">
        <div className="max-w-5xl w-full text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 text-neutral-200"
          >
            Consultas com médico <Highlight color="dark-blue">on-line</Highlight>, <br /> na tela do seu celular.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <img 
              src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/Foto03.jpeg" 
              alt="Médico Online" 
              className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </PageWrapper>

      {/* Page 4: Visual Impact */}
      <PageWrapper id="slide-3" className="snap-start gradient-blue">
        <div className="max-w-5xl w-full text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 text-neutral-200"
          >
            Quem sabe faz <Highlight color="dark-blue">agora</Highlight>, <br /> não espera o amanhã.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl mx-auto"
          >
            <img 
              src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/Foto04.jpeg" 
              alt="Atendimento" 
              className="w-full rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </PageWrapper>

      {/* Page 5: Atypical Families & Referral */}
      <PageWrapper id="slide-4" className="snap-start gradient-blue">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="mb-8 text-neutral-200">
                Compromisso real com as <Highlight color="dark-blue">famílias atípicas</Highlight>.
              </h2>
              <div className="space-y-6">
                <p className="text-neutral-400">
                  Deputado Eduardo Pedrosa além de cuidar da sua saúde também irá lhe oferecer a possibilidade de você gerar <Highlight color="dark-blue">renda recorrente</Highlight> usando o programa exclusivo de <Highlight color="dark-blue">Indicação</Highlight> da G8 Saúde Digital.
                </p>
                <p className="text-neutral-400">
                  Para você que busca um oportunidade para fazer <Highlight color="dark-blue">renda on line</Highlight> apenas usando o seu celular, basta você indicar os serviços da telemedicina e assim adquirir o direito ao <Highlight color="dark-blue">Cashbak recorrente</Highlight>. Sem falar que você também acaba ganhando o direito ao pagamento de <Highlight color="dark-blue">INSS</Highlight> a seu favor.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <img 
                src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/Foto05.jpeg" 
                alt="Indicação G8" 
                className="w-full rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-accent-blue text-brand-blue px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-lg"
            >
              Quero saber mais <ArrowRight size={24} />
            </button>
          </motion.div>
        </div>
      </PageWrapper>

      {/* Page 6: Final Call to Action */}
      <PageWrapper id="slide-5" className="snap-start gradient-black">
        <div className="max-w-4xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <img 
              src="https://raw.githubusercontent.com/dixavadin/arquivos/refs/heads/main/G8_Foto5.png" 
              alt="Cadastro" 
              className="w-full rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-neutral-200 text-black px-12 py-6 rounded-full font-bold hover:bg-brand-accent-blue hover:text-white transition-all flex items-center gap-4 mx-auto shadow-xl group"
            >
              Quero me cadastrar <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="mt-8 text-neutral-500">
              Eduardo Pedrosa & G8 Saúde Digital
            </p>
          </motion.div>
        </div>
      </PageWrapper>

    </div>
  );
}

