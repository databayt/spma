"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/use-translations";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sendMessage as sendMessageAction } from "@/components/chatbot/actions";
import { SendIcon, PriceIcon, TimeIcon, ServicesIcon, InfoIcon, VoiceIcon } from "@/components/chatbot/icons";
import type { ModelMessage } from "ai";

export default function ChatbotPage() {
  const { t, isRTL } = useTranslations();
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (messageText && !isLoading) {
      const newUserMessage = { text: messageText, isUser: true };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setIsLoading(true);

      try {
        const coreMessages: ModelMessage[] = updatedMessages.map((msg) => ({
          role: msg.isUser ? ("user" as const) : ("assistant" as const),
          content: msg.text,
        }));

        const result = await sendMessageAction(coreMessages);

        if (!result.success) {
          throw new Error(result.error || "Failed to send message");
        }

        setMessages((prev) => [
          ...prev,
          {
            text: result.content || "I couldn't process that request. Please try again.",
            isUser: false,
          },
        ]);
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

        setMessages((prev) => [
          ...prev,
          {
            text: `Sorry, there was an error: ${errorMessage}`,
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVoiceInput = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as unknown as any).webkitSpeechRecognition || (window as unknown as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = isRTL ? "ar-SA" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.start();
    setIsListening(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInputValue(speechResult);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Speech recognition error. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [isListening, isRTL]);

  const handleGoBack = () => {
    router.back();
  };

  // SPMA-specific bilingual quick questions
  const quickQuestionsAr = [
    { label: "العضوية", message: "ما هي أنواع العضوية المتاحة؟", icon: PriceIcon },
    { label: "الخدمات", message: "ما هي خدمات الجمعية؟", icon: ServicesIcon },
    { label: "الفعاليات", message: "ما هي الفعاليات القادمة؟", icon: TimeIcon },
    { label: "عن الجمعية", message: "أخبرني عن الجمعية السودانية لإدارة المشاريع", icon: InfoIcon },
  ];

  const quickQuestionsEn = [
    { label: "Membership", message: "What membership tiers are available?", icon: PriceIcon },
    { label: "Services", message: "What services does SPMA offer?", icon: ServicesIcon },
    { label: "Events", message: "What upcoming events are there?", icon: TimeIcon },
    { label: "About SPMA", message: "Tell me about SPMA", icon: InfoIcon },
  ];

  const quickQuestions = isRTL ? quickQuestionsAr : quickQuestionsEn;

  return (
    <div className="fixed inset-0 bg-background h-screen w-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-border bg-background">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(isRTL && "rotate-180")}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="text-base font-medium">{t?.common?.back || (isRTL ? "رجوع" : "Back")}</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4" dir={isRTL ? "rtl" : "ltr"}>
        {messages.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="mb-6 text-center text-muted-foreground text-sm font-medium">
                {isRTL ? "اختر سؤالاً أو اكتب رسالتك" : "Choose a question or type your message"}
              </p>
              <div className="grid grid-cols-2 gap-2 w-full px-2 max-w-sm">
                {quickQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSend(q.message)}
                    className="text-xs h-auto py-2.5 px-3 flex items-center gap-2 bg-muted hover:bg-muted/80 border-0"
                  >
                    <q.icon size={16} />
                    <span>{q.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2",
                  message.isUser ? (isRTL ? "flex-row" : "flex-row-reverse") : ""
                )}
              >
                {!message.isUser && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%] break-words",
                    message.isUser
                      ? "bg-primary text-white ms-auto"
                      : "bg-muted"
                  )}
                >
                  <p className={cn("text-sm whitespace-pre-wrap", message.isUser && "text-white")}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-3 pb-20">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <div className="flex items-center border border-muted-foreground rounded-lg px-3 bg-background relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder=""
              className="w-full bg-transparent border-none outline-none text-[16px] h-10 py-2"
              dir={isRTL ? "rtl" : "ltr"}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              inputMode="text"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="h-12 w-12 hover:scale-110 transition-transform shrink-0 disabled:opacity-50 disabled:hover:scale-100"
              title="Send message"
            >
              <SendIcon size={32} className={cn(isRTL && "scale-x-[-1]")} />
            </button>

            <button
              type="button"
              onClick={handleVoiceInput}
              className={cn(
                "h-12 w-12 hover:scale-110 transition-transform shrink-0",
                isListening && "text-red-500 animate-pulse"
              )}
              title="Voice input"
            >
              <VoiceIcon size={32} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
