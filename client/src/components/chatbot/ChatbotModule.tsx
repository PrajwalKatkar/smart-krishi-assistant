import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { sendChatMessage } from '../../services/api';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  Image as ImageIcon,
  Share2,
  PhoneCall,
  Sparkles,
  WifiOff,
  User,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  imageUrl?: string;
  quickReplies?: string[];
}

export const ChatbotModule: React.FC = () => {
  const { language, t, speakText, listenSpeech, isListening } = useLanguage();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I am your AI Krishi Mitra assistant. Ask me anything about crop diseases, weather advisory, PM-KISAN status, or mandi rates in your native language.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['PM-KISAN Status', 'Wheat Fertilizer Dose', 'Mandi Rates Today', 'Yellow Leaf Fix']
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [smsFallbackMode, setSmsFallbackMode] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() && !attachedImage) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query || 'Uploaded crop leaf photo for diagnosis',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: attachedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    const imagePresent = Boolean(attachedImage);
    setAttachedImage(null);
    setLoading(true);

    const botResponse = await sendChatMessage(query, language, imagePresent);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botResponse.text,
      timestamp: botResponse.timestamp,
      quickReplies: botResponse.quickReplies
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);

    // Auto voice read response
    speakText(botResponse.text);
  };

  const handleVoiceInput = () => {
    listenSpeech((spokenText) => {
      setInputMessage(spokenText);
      handleSend(spokenText);
    });
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 pb-12 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-600 rounded-xl">
            <Bot className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl flex items-center gap-2">
              <span>Krishi Mitra AI Assistant</span>
              <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">Live LLM</span>
            </h1>
            <p className="text-xs text-purple-200">Voice-Activated Multi-lingual Farming Advisory</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* SMS Fallback Mode Toggle */}
          <button
            onClick={() => setSmsFallbackMode(prev => !prev)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
              smsFallbackMode ? 'bg-amber-400 text-gray-900' : 'bg-purple-700/80 hover:bg-purple-600 text-purple-100'
            }`}
            title="Simulate SMS/2G fallback mode for low connectivity"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>{smsFallbackMode ? 'SMS Mode ON' : 'SMS Fallback'}</span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={() => setShowWhatsappModal(true)}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition"
            title="Open WhatsApp Chat Integration"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Stream Window */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 min-h-[460px] max-h-[550px] overflow-y-auto flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="p-2 bg-purple-100 text-purple-800 rounded-full h-8 w-8 flex items-center justify-center font-bold text-xs shrink-0">
                  🤖
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl p-4 space-y-2 text-sm shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-none'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 rounded-bl-none'
              }`}>
                {msg.imageUrl && (
                  <img src={msg.imageUrl} alt="Attached crop" className="max-h-40 rounded-xl border mb-2 object-cover" />
                )}

                <p className="leading-relaxed text-xs md:text-sm whitespace-pre-wrap">{msg.text}</p>

                <div className="flex items-center justify-between pt-1 border-t border-gray-200/40 text-[10px] opacity-75">
                  <span>{msg.timestamp}</span>

                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="flex items-center gap-1 hover:text-emerald-700 font-bold px-1 py-0.5 rounded"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  )}
                </div>

                {/* Quick Replies chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {msg.quickReplies.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="bg-white border border-purple-200 text-purple-800 hover:bg-purple-50 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm transition"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-full h-8 w-8 flex items-center justify-center font-bold text-xs shrink-0">
                  👨‍🌾
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-gray-500 bg-gray-50 p-3 rounded-xl w-fit">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              <span>Krishi Mitra is drafting agricultural advisory...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-200 flex items-center gap-2">
        {/* Photo Upload Icon */}
        <label className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-xl cursor-pointer transition">
          <ImageIcon className="w-5 h-5" />
          <input type="file" accept="image/*" onChange={handleImageAttach} className="hidden" />
        </label>

        {/* Voice Input Microphone */}
        <button
          onClick={handleVoiceInput}
          className={`p-2.5 rounded-xl transition ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}
          title="Click to speak in your native language"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={attachedImage ? 'Image attached. Click send or add text query...' : t('askChatbot')}
          className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSend()}
          className="bg-purple-700 hover:bg-purple-600 text-white font-bold p-2.5 rounded-xl transition shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">WhatsApp Bot Integration</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Farmers can also text Krishi Mitra directly on WhatsApp at <strong>+91 98000-KRISHI</strong> for instant crop advisories and voice note responses.
            </p>
            <a
              href="https://wa.me/?text=Namaste%20Krishi%20Mitra%20Assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Open WhatsApp Assistant ➔
            </a>
            <button onClick={() => setShowWhatsappModal(false)} className="text-xs text-gray-400 font-bold block mx-auto">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
