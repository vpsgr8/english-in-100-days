/**
 * AI Service — local fallbacks (no backend required)
 */
const AIService = (() => {
  const CHAT_FALLBACKS = {
    introduce: "To introduce yourself, say: 'Hello, my name is [your name]. I am from [city]. Nice to meet you!' Practice daily for confidence.",
    interview: "In interviews, start with: 'Good morning. My name is [name]. I am a [profession/student] from [city].' Keep it under 60 seconds.",
    order: "At a restaurant, say: 'I would like [food], please.' To ask for the bill: 'Can I have the bill, please?'",
    default: "Great question! Focus on simple sentences: Listen → Repeat → Use in conversation. Try today's 5-minute lesson!"
  };

  const BUDDY_FALLBACK = {
    'मुझे अंग्रेजी बोलना सीखना है': { en: 'I want to learn English speaking.', meaning: 'Expressing desire to learn spoken English', phonetic: 'I want to lern ENG-lish SPEE-king', practice: 'Say: I want to learn English speaking.' },
    'मेरा नाम': { en: 'My name is...', meaning: 'Introducing yourself', phonetic: 'my NAYM is', practice: 'Say: My name is [your name].' },
    'मुझे नौकरी चाहिए': { en: 'I need a job.', meaning: 'Looking for employment', phonetic: 'I need a JOB', practice: 'Say: I need a job.' },
    'कीमत क्या है': { en: 'What is the price?', meaning: 'Asking about cost', phonetic: 'what is the PRYS', practice: 'Say: What is the price?' },
    'आप कैसे हैं': { en: 'How are you?', meaning: 'A common greeting', phonetic: 'how ar YOO', practice: 'Say: How are you?' }
  };

  function localChatFallback(message) {
    const lower = message.toLowerCase();
    if (lower.includes('introduce') || lower.includes('myself')) return CHAT_FALLBACKS.introduce;
    if (lower.includes('interview') || lower.includes('job')) return CHAT_FALLBACKS.interview;
    if (lower.includes('order') || lower.includes('restaurant')) return CHAT_FALLBACKS.order;
    return CHAT_FALLBACKS.default;
  }

  function localBuddyFallback(text) {
    for (const [hindi, data] of Object.entries(BUDDY_FALLBACK)) {
      if (text.includes(hindi) || hindi.includes(text)) return { ...data, source: 'local' };
    }
    return {
      en: 'I want to learn English speaking.',
      meaning: 'Try typing a common Hindi phrase from the examples.',
      phonetic: 'I want to lern ENG-lish SPEE-king',
      practice: 'Say: I want to learn English speaking.',
      source: 'local'
    };
  }

  async function chatTeacher(message) {
    return { reply: localChatFallback(message), source: 'local' };
  }

  async function englishBuddy(text) {
    return { ...localBuddyFallback(text), source: 'local' };
  }

  return { chatTeacher, englishBuddy };
})();

if (typeof window !== 'undefined') window.AIService = AIService;
