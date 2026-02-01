
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Heart, Minus } from 'lucide-react';
import { Language, Message } from '../types';
import { translations } from '../translations';
import { getGeminiResponse } from '../services/geminiService';

const ChatWidget: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'es' ? '¡Hola! Soy tu asistente de Love Love. ¿Cómo puedo ayudarte hoy?' : 'Hello! I am your Love Love assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(newMessages, lang);
    setMessages([...newMessages, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#e5989b]/30">
          {/* Header */}
          <div className="bg-[#6d1a1d] p-5 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-[#e5989b] fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Love Love Care</h3>
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <Minus size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf3ef]/30">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-[#6d1a1d] text-white rounded-br-none' 
                  : 'bg-white text-[#6d1a1d] shadow-sm rounded-bl-none border border-[#e5989b]/20'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e5989b]/20 flex space-x-2">
                  <div className="w-2 h-2 bg-[#e5989b] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#e5989b] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-[#e5989b] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-pink-50">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="w-full pl-4 pr-12 py-3 bg-[#faf3ef] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e5989b]/50 transition-all text-[#6d1a1d]"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#6d1a1d] hover:bg-white rounded-xl transition-all disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#6d1a1d] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#a32a2e] transition-all transform hover:scale-110 group relative"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 bg-white text-[#6d1a1d] text-xs font-bold py-2 px-4 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#e5989b]/20">
            {t.contactSupport}
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
