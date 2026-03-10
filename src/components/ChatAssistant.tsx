import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Olá! Sou o assistente virtual do Deputado Eduardo Pedrosa. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Você é o assistente virtual do Deputado Eduardo Pedrosa. 
            Eduardo Pedrosa é um deputado comprometido com a saúde digital (G8 Saúde Digital) e o bem-estar social, especialmente focado em telemedicina e apoio a famílias atípicas.
            
            Contexto da apresentação:
            1. Telemedicina: Consultas on-line rápidas e seguras pelo celular, facilitando o acesso à saúde.
            2. Famílias Atípicas: Compromisso real com suporte e melhores condições de saúde.
            3. Programa de Indicação: Possibilidade de gerar renda recorrente através da G8 Saúde Digital.
            
            Responda de forma cortês, profissional e informativa, sempre em português do Brasil.
            
            Pergunta do usuário: ${userMessage}` }]
          }
        ],
        config: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      const botResponse = response.text || "Desculpe, não consegui processar sua solicitação no momento. Como posso ajudar com informações sobre o Deputado Eduardo Pedrosa ou a G8 Saúde?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-neutral-900 border border-white/10 w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-brand-accent-blue p-4 flex items-center justify-between">
              <h3 className="text-white font-bold">Assistente Virtual</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' ? 'bg-brand-accent-blue text-white' : 'bg-white/10 text-neutral-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Loader2 className="animate-spin text-brand-accent-blue" size={18} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-white focus:outline-none focus:border-brand-accent-blue"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-accent-blue rounded-full flex items-center justify-center text-white"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-accent-blue rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};
