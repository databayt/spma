'use client';

import { useState, useCallback } from 'react';
import { sendMessage as sendMessageAction } from './actions';
import type { ChatbotState, ChatMessage } from './type';
import type { ModelMessage } from 'ai';

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setError(undefined);
    setIsLoading(true);

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const coreMessages: ModelMessage[] = [...messages, userMessage].map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      const result = await sendMessageAction(coreMessages);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: result.content || '',
        id: Date.now().toString() + '_ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, there was an error: ${errorMessage}`,
        id: Date.now().toString() + '_error',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(undefined);
  }, []);

  const state: ChatbotState = {
    isOpen,
    messages,
    isLoading,
    error,
  };

  return {
    state,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages,
  };
}
