
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Heart, Minus, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { Language, Message } from '../types';
import { translations } from '../translations';
import { getGeminiResponse } from '../services/geminiService';
import { QUICK_QUESTIONS } from '../constants/faq';
import { WHATSAPP_NUMBER } from '../constants';

// Added React import to satisfy the React.FC namespace requirement
const ChatWidget: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'es' ? '¡Hola! Soy tu asistente de Love Love. ¿En qué puedo ayudarte hoy? ❤️' : (lang === 'ca' ? 'Hola! Soc el teu assistent de Love Love. En què puc ajudar-te avui? ❤️' : 'Hello! I am your Love Love assistant. How can I help you today? ❤️') }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const suggestions = QUICK_QUESTIONS[lang as keyof typeof QUICK_QUESTIONS] || QUICK_QUESTIONS.es;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText || isLoading) return;
    
    setHasError(false);
    const newMessages: Message[] = [...messages, { role: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(newMessages, lang);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setHasError(true);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: lang === 'es' 
          ? "Parece que mi conexión está un poco tímida ahora mismo. Pero no te preocupes, ¡puedes hablar conmigo directamente por WhatsApp! ❤️" 
          : "It seems my connection is a bit shy right now. But don't worry, you can talk to me directly on WhatsApp! ❤️" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola Love Love! ❤️ Necesito ayuda con una duda...`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[550px] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-[#e5989b]/30 animate-fade-in">
          {/* Header */}
          <div className="bg-[#6d1a1d] p-5 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                <Heart size={20} className="text-[#e5989b] fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">Love Love Care</h3>
                <div className="flex items-center space-x-1">
                  <span className={`w-1.5 h-1.5 ${hasError ? 'bg-orange-400' : 'bg-green-400'} rounded-full animate-pulse`}></span>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-black">
                    {hasError ? 'Modo Respaldo' : 'En línea'}
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <Minus size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf3ef]/30">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-[#6d1a1d] text-white rounded-br-none' 
                  : 'bg-white text-[#6d1a1d] rounded-bl-none border border-[#e5989b]/20'
                }`}>
                  {m.text}
                  {idx === messages.length - 1 && hasError && (
                    <button 
                      onClick={openWhatsApp}
                      className="mt-3 w-full py-2 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#128C7E] transition-colors"
                    >
                      <span>Hablar por WhatsApp</span>
                      <ExternalLink size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e5989b]/20 flex space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#e5989b] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#e5989b] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#e5989b] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-pink-50 space-y-3">
            {!hasError && (
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
                {suggestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-[#faf3ef] hover:bg-[#e5989b]/20 text-[#6d1a1d] text-[10px] font-bold rounded-full border border-[#e5989b]/20 transition-all flex items-center space-x-1"
                  >
                    <Sparkles size={10} className="text-[#e5989b]" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="w-full pl-4 pr-12 py-3.5 bg-[#faf3ef] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e5989b]/50 transition-all text-[#6d1a1d]"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-[#6d1a1d] hover:bg-[#e5989b]/20 rounded-xl transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#6d1a1d] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#a32a2e] transition-all transform hover:scale-110 group relative"
        >
          <div className="absolute inset-0 bg-[#e5989b]/20 rounded-full animate-ping group-hover:hidden"></div>
          <MessageCircle size={28} className="relative z-10" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
