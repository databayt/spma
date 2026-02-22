export { ChatbotContent as Chatbot } from './content';
export { ChatbotContent } from './content';
export { ChatButton } from './chat-button';
export { ChatWindow } from './chat-window';

export { useChatbot } from './use-chatbot';
export { getClientDictionary } from './dictionary-client';

export type {
  ChatMessage,
  ChatbotState,
  ChatbotTheme,
  ChatbotAPIConfig,
  ChatbotDictionary,
  ChatbotConfig,
  ChatbotProps,
  ChatButtonProps,
  ChatWindowProps,
  ChatbotHookConfig
} from './type';

export {
  DEFAULT_CONFIG,
  DEFAULT_THEME,
  DEFAULT_DICTIONARY
} from './constant';

export { mergeConfig } from './utils';
