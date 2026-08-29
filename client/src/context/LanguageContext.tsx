import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageCode } from '../types';
import { getTranslation } from '../utils/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  listenSpeech: (onResult: (text: string) => void) => void;
  isListening: boolean;
  lowLiteracyMode: boolean;
  toggleLowLiteracyMode: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('hi');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lowLiteracyMode, setLowLiteracyMode] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to BCP 47 language tag
    const langMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      pa: 'pa-IN',
      gu: 'gu-IN',
      bn: 'bn-IN'
    };
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.9; // Slightly slower for clear farmer understanding

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const listenSpeech = (onResult: (text: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition requires Chrome, Edge, or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    const langMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      pa: 'pa-IN',
      gu: 'gu-IN',
      bn: 'bn-IN'
    };
    recognition.lang = langMap[language] || 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  };

  const toggleLowLiteracyMode = () => setLowLiteracyMode(prev => !prev);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        speakText,
        isSpeaking,
        stopSpeaking,
        listenSpeech,
        isListening,
        lowLiteracyMode,
        toggleLowLiteracyMode
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
