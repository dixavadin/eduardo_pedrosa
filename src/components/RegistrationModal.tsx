import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'telemedicine'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', interest: 'telemedicine' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-brand-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="text-brand-accent-green" size={48} />
                  </motion.div>
                  <h3 className="font-bold text-white mb-2">Inscrição Realizada!</h3>
                  <p className="text-neutral-400">
                    Obrigado pelo seu interesse. Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-white mb-2">Faça seu Cadastro</h3>
                  <p className="text-neutral-400 mb-8">
                    Preencha os dados abaixo para receber mais informações sobre a G8 Saúde e as ações do Deputado Eduardo Pedrosa.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-neutral-500 mb-2 font-bold">Nome Completo</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent-blue transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-2 font-bold">E-mail</label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent-blue transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-2 font-bold">Telefone / WhatsApp</label>
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent-blue transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-2 font-bold">Interesse Principal</label>
                      <select 
                        value={formData.interest}
                        onChange={e => setFormData({...formData, interest: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-accent-blue transition-colors appearance-none"
                      >
                        <option value="telemedicine" className="bg-neutral-900">Telemedicina Gratuita</option>
                        <option value="referral" className="bg-neutral-900">Programa de Indicação (Renda)</option>
                        <option value="atypical" className="bg-neutral-900">Apoio a Famílias Atípicas</option>
                        <option value="other" className="bg-neutral-900">Outros Assuntos</option>
                      </select>
                    </div>

                    <button 
                      disabled={status === 'loading'}
                      type="submit"
                      className="w-full bg-brand-accent-blue text-white py-4 rounded-xl font-bold mt-4 hover:bg-brand-accent-blue/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>Enviar Cadastro <Send size={18} /></>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center mt-2">
                        Ocorreu um erro ao enviar. Tente novamente.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
