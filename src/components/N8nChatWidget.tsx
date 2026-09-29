import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertTriangle,
  Bot,
  User as UserIcon,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
}

const N8N_WEBHOOK_URL =
  'https://asmitha-04.app.n8n.cloud/webhook/0877d24f-2993-43d3-b09f-e7f692ccfdf9/chat';

const QUICK_PROMPTS = [
  'Show me traditional bridal lehangas',
  'What kurtis and frocks are available?',
  'How does Cash on Delivery (COD) work?',
  'Tell me about custom bespoke stitching'
];

export const N8nChatWidget: React.FC = () => {
  const { user, setSelectedCategory, setCurrentPage } = useShop();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('ashdediva_n8n_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: "Namaste! Welcome to ashdediva's label. I am your personal couture concierge connected directly to our n8n styling assistant. How may I assist you with our traditional kurtis, bridal lehangas, maternal wear, or bespoke tailoring today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    let sid = localStorage.getItem('ashdediva_n8n_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 12);
      localStorage.setItem('ashdediva_n8n_session_id', sid);
    }
    return sid;
  });

  const [webhookWarning, setWebhookWarning] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-n8n-chat', handleOpenEvent);
    return () => window.removeEventListener('open-n8n-chat', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem('ashdediva_n8n_chat_history', JSON.stringify(messages));
    } catch {
      // storage quota
    }
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setWebhookWarning(null);

    try {
      // Payload matching n8n Chat Trigger specification
      const payload = {
        action: 'sendMessage',
        sessionId,
        chatInput: text,
        metadata: {
          clientName: user?.name || 'Guest Patron',
          clientEmail: user?.email || '',
          brand: "ashdediva's label",
          timestamp: new Date().toISOString()
        }
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch {
          // not json
        }

        // If n8n says workflow is not active (standard 404 response from n8n)
        if (response.status === 404 && errorData?.message?.includes('not registered')) {
          setWebhookWarning(
            errorData.hint ||
              'Your n8n workflow must be toggled to ACTIVE in the n8n editor (top-right switch) to respond in production.'
          );

          // Provide smart automated boutique styling response while webhook is being activated
          const fallbackBotMsg: ChatMessage = {
            id: 'ast_' + Date.now(),
            sender: 'assistant',
            text: getBoutiqueFallbackReply(text),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setMessages((prev) => [...prev, fallbackBotMsg]);
          if (!isOpen) setUnreadCount((c) => c + 1);
          return;
        }

        throw new Error(
          errorData?.message || `n8n server responded with status ${response.status}`
        );
      }

      // Handle successful n8n response
      const contentType = response.headers.get('content-type') || '';
      let replyText = '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (typeof data === 'string') {
          replyText = data;
        } else if (data.output) {
          replyText = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        } else if (data.text) {
          replyText = data.text;
        } else if (data.message) {
          replyText = data.message;
        } else if (Array.isArray(data) && data[0]?.output) {
          replyText = data[0].output;
        } else {
          replyText = JSON.stringify(data);
        }
      } else {
        replyText = await response.text();
      }

      const botMessage: ChatMessage = {
        id: 'ast_' + Date.now(),
        sender: 'assistant',
        text: replyText || 'Thank you for your message. How else may I assist you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch (err: any) {
      console.warn('n8n chat request error:', err);

      // Offer informative error state with offline fallback
      setWebhookWarning(
        `Webhook call issue (${err.message || 'Network error'}). If you are activating the workflow in n8n Cloud, please ensure the production URL is active and CORS allows incoming requests.`
      );

      const botFallback: ChatMessage = {
        id: 'ast_fallback_' + Date.now(),
        sender: 'assistant',
        text: getBoutiqueFallbackReply(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botFallback]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    const newSid = 'session_' + Math.random().toString(36).substring(2, 12);
    setSessionId(newSid);
    localStorage.setItem('ashdediva_n8n_session_id', newSid);
    const initialMsg: ChatMessage = {
      id: 'msg_welcome_' + Date.now(),
      sender: 'assistant',
      text: "Namaste! Conversation reset. I am ashdediva's live couture assistant. What can I help you discover in our collections?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
    setWebhookWarning(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#1C2C1A]/95 text-[#F3F8F2] px-3.5 py-2 rounded-full border border-[#3E5C38] shadow-lg cursor-pointer hover:border-[#FF6B81] transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-serif-luxury font-medium text-[#FFA4B2]">
              Stylist Concierge
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-[#CC2240] hover:bg-[#A8132D] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-[#FFA4B2]/40"
          aria-label={isOpen ? 'Close chat' : 'Open ashdediva couture chat'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#CC2240] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {unreadCount}
                </span>
              )}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#1F301D]" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[94vw] h-[580px] max-h-[82vh] rounded-2xl bg-[#1B2919] border border-[#3E5C38] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header in Deep Matcha Green & Cherry Accents */}
          <div className="bg-[#152313] px-4 py-3.5 border-b border-[#2C4427] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#273B24] border border-[#FF6B81]/40 flex items-center justify-center text-[#FF6B81] relative">
                <Sparkles className="w-5 h-5 text-[#FF6B81]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#152313]" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-[#FFA4B2] leading-tight">
                  ashdediva&apos;s Concierge
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A5C8A1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>n8n Live Webhook Connected</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetConversation}
                className="p-1.5 text-[#A5C8A1] hover:text-[#FFA4B2] hover:bg-[#253922] rounded-md transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#A5C8A1] hover:text-[#FFA4B2] hover:bg-[#253922] rounded-md transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Notice / Status Banner */}
          <div className="bg-[#121E11] px-3.5 py-1.5 text-[10px] text-[#8EA88A] border-b border-[#253922] flex items-center justify-between">
            <span className="truncate max-w-[280px]">
              Webhook: <span className="font-mono text-[#A5C8A1]">0877d24f.../chat</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">Ready</span>
          </div>

          {/* Warning Banner if n8n is in Draft/Inactive state */}
          {webhookWarning && (
            <div className="bg-[#2D1B1F] border-b border-[#73192B] p-2.5 px-3 text-xs text-[#FFA4B2] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF6B81] shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px] leading-tight">
                <p className="font-semibold text-white">n8n Workflow Notice:</p>
                <p className="mt-0.5 text-[#FFCBD3]">{webhookWarning}</p>
                <p className="mt-1 text-[10px] text-[#FF9EAE]">
                  Boutique styling assistant is answering your request in the meantime!
                </p>
              </div>
              <button
                onClick={() => setWebhookWarning(null)}
                className="text-[#FFCBD3] hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#1B2919]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      isUser
                        ? 'bg-[#CC2240] text-white'
                        : 'bg-[#273B24] border border-[#3E5C38] text-[#FFA4B2]'
                    }`}
                  >
                    {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#CC2240] text-white rounded-tr-none shadow-md'
                        : 'bg-[#223520] text-[#F3F8F2] border border-[#385532] rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        isUser ? 'text-white/70' : 'text-[#8EA88A]'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#273B24] border border-[#3E5C38] flex items-center justify-center shrink-0 text-[#FFA4B2]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#223520] border border-[#385532] text-[#A5C8A1] rounded-xl rounded-tl-none px-3.5 py-2 text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B81] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B81] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B81] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-[#A5C8A1]">Consulting n8n agent...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#172515] border-t border-[#273D23] flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#233821] hover:bg-[#2F4A2C] text-[#C7DEC4] hover:text-white border border-[#3E5E37] text-[10px] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#152313] border-t border-[#294025] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask our n8n stylist anything..."
              disabled={isLoading}
              className="flex-1 bg-[#233821] border border-[#3A5934] rounded-lg px-3.5 py-2.5 text-xs text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-lg bg-[#CC2240] hover:bg-[#A8132D] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:hover:bg-[#CC2240] cursor-pointer shrink-0 shadow-md"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

// Intelligent boutique styling answers that activate gracefully if n8n workflow is in draft or returning 404
function getBoutiqueFallbackReply(userText: string): string {
  const query = userText.toLowerCase();

  if (query.includes('bridal') || query.includes('wedding') || query.includes('lehanga') || query.includes('lehenga')) {
    return "Our Bridal Collection features handcrafted velvet and raw silk lehangas adorned with antique zardozi, dabka, and pearl resham embroidery. Each bridal ensemble comes with customized blouse tailoring and personal fitting consultations. Explore the 'Bridal' category in our boutique!";
  }

  if (query.includes('kurti') || query.includes('traditional') || query.includes('frock')) {
    return "In our Traditional collection, you'll find:\n• Straight cut Silk Kurtis with chikankari\n• Short Kurtis with mirror-work accents\n• Flared Anarkali Frocks\n• Floor-length Georgette Long Frocks\n• Handwoven Chanderi sets with matching dupattas.";
  }

  if (query.includes('cod') || query.includes('cash on delivery') || query.includes('payment') || query.includes('upi')) {
    return "We accept both Cash on Delivery (COD) across India with doorstep inspection, as well as Instant UPI via Google Pay, PhonePe, Paytm, or direct UPI ID with dynamic QR code confirmation.";
  }

  if (query.includes('size') || query.includes('measure') || query.includes('stitch') || query.includes('bespoke') || query.includes('custom')) {
    return "We offer complimentary made-to-measure tailoring! Sizes range from XS (34) to XXL (44), and you can request custom bust, waist, and length adjustments directly through our Bespoke Consultation form.";
  }

  if (query.includes('spring') || query.includes('summer') || query.includes('maternal') || query.includes('maternity')) {
    return "Our Spring & Summer collection features lightweight mulmul cottons and breathable handwoven linens in matcha and blush hues. We also feature bump-friendly maternal wear designed with nursing-friendly zippers and pleats.";
  }

  return "Thank you for asking! ashdediva's label is an exclusive haute couture boutique for women's wear. You can explore our categories (Traditional, Kurtis, Frocks, Lehangas, Bridal, Spring/Summer, Maternal Wear, Accessories, and Footwear), add items to bag or cart, and checkout via COD or UPI!";
}
