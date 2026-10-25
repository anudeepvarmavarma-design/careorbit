import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  ShoppingBag,
  FileText,
  Clock,
  Compass,
  Calculator,
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  action?: {
    text: string;
    link: string;
  };
}

export const CareAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: "Hello! I am your CareOrbit Assistant. I'm here to help guide you through booking doctor consultations, finding medicines, understanding prescription reviews, and tracking your Care Journey. What can I help you with today?"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedQuestions = [
    'How do I book a doctor appointment?',
    'How can I search for medicines?',
    'Where can I see my order?',
    'How do I upload a prescription?',
    'Where can I manage reminders?',
    'How is my checkout total calculated?',
    'How do I open my Care Journey?'
  ];

  const getAssistantResponse = (query: string): { text: string; action?: { text: string; link: string } } => {
    const q = query.toLowerCase();

    if (q.includes('book') || q.includes('doctor') || q.includes('appointment')) {
      return {
        text: 'You can book an appointment in 3 easy steps: 1) Go to Find Doctors, 2) Select your preferred specialist and consultation slot, and 3) Enter patient details to confirm. Your booking will appear directly on your appointments dashboard.',
        action: { text: 'Explore Doctors Directory', link: '/doctors' }
      };
    }

    if (q.includes('search') && (q.includes('medicine') || q.includes('pharmacy') || q.includes('drug'))) {
      return {
        text: 'Head over to our Online Medical Store where you can filter by OTC Essentials, First Aid, Personal Care, and Wellness products, or search directly by brand or generic salt name.',
        action: { text: 'Browse Medicine Store', link: '/medicines' }
      };
    }

    if (q.includes('order') || q.includes('track') || q.includes('delivery')) {
      return {
        text: 'All your placed pharmacy orders are tracked live in "My Orders". You can view order status stages from "Processing" to "Delivered", check itemized invoices, or trigger instant 1-click reorders.',
        action: { text: 'Go to My Orders', link: '/orders' }
      };
    }

    if (q.includes('prescription') || q.includes('rx') || q.includes('upload')) {
      return {
        text: 'Regulated prescription products require doctor authorization. Visit the Prescription Desk to upload your doctor prescription (PDF or Image). Once verified in the simulated queue, eligible medications unlock for checkout.',
        action: { text: 'Upload Prescription', link: '/prescriptions' }
      };
    }

    if (q.includes('reminder') || q.includes('dose') || q.includes('schedule') || q.includes('refill')) {
      return {
        text: 'Manage your daily medication schedules under Medicine Reminders. You can set customized times, mark daily doses as taken, and track remaining supplies with low-supply refill warnings.',
        action: { text: 'Manage Reminders', link: '/reminders' }
      };
    }

    if (q.includes('cost') || q.includes('total') || q.includes('calculate') || q.includes('discount')) {
      return {
        text: 'Your order total equals item prices + ₹40 delivery fee (free on orders over ₹500). Orders over ₹800 receive an automatic 10% volume discount. You can also use our interactive Cost Estimator tool to calculate total healthcare budgets.',
        action: { text: 'Open Cost Estimator', link: '/cost-estimator' }
      };
    }

    if (q.includes('journey') || q.includes('orbit') || q.includes('care journey')) {
      return {
        text: 'The Care Journey connects all 9 phases of patient health: from finding specialists to post-consultation prescription review, doorstep pharmacy delivery, and scheduled daily recovery. It updates dynamically as you use the app.',
        action: { text: 'Open Care Journey', link: '/care-journey' }
      };
    }

    return {
      text: "I can assist you with finding doctors, ordering medicines, tracking prescriptions, managing daily dose reminders, or estimating healthcare costs. Select one of the quick questions below or navigate directly using our menu."
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text
    };

    const resp = getAssistantResponse(text);
    const assistantMsg: ChatMessage = {
      id: `asst-${Date.now() + 1}`,
      sender: 'assistant',
      text: resp.text,
      action: resp.action
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputVal('');
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'assistant',
        text: 'Chat history cleared. How can I help you today?'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* Disclaimer Notice */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-900 text-xs">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-bold">Medical Disclaimer & Emergency Protocol:</p>
          <p className="text-[11px] text-rose-800">
            CareOrbit Assistant is an informational platform navigator. It does not diagnose illnesses, prescribe medicines, or substitute a licensed doctor. In a medical emergency, call <strong>112</strong> immediately.
          </p>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col h-[580px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-700 text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-navy-950">CareOrbit Assistant</h2>
              <p className="text-[10px] text-teal-700 font-semibold">Simulated Navigation Support</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser ? 'bg-slate-900 text-white' : 'bg-teal-700 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                    isUser
                      ? 'bg-teal-700 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.action && (
                    <Link
                      to={msg.action.link}
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-xs"
                    >
                      <span>{msg.action.text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Quick Queries:</span>
          {predefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="py-1 px-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-800 transition-colors shrink-0 text-[11px] font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your question (e.g. How do I book an appointment?)..."
            className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
