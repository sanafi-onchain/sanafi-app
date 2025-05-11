import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string; 
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  createNewChat: () => string;
  addMessageToChat: (chatId: string, role: 'user' | 'assistant', content: string) => void;
  getChatById: (chatId: string) => Chat | undefined;
  updateChatTitle: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [chats, setChats] = useLocalStorage<Chat[]>('sanafi-chats', []);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Initialize with a default chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      const newChatId = createNewChat();
      setCurrentChatId(newChatId);
    } else if (!currentChatId) {
      setCurrentChatId(chats[0].id);
    }
  }, [chats]);

  const createNewChat = (): string => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const addMessageToChat = (chatId: string, role: 'user' | 'assistant', content: string) => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          // Update chat title based on first user message if still default
          let updatedTitle = chat.title;
          if (chat.title === 'New Chat' && role === 'user' && chat.messages.length === 0) {
            updatedTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
          }
          
          return {
            ...chat,
            title: updatedTitle,
            messages: [
              ...chat.messages,
              {
                id: Date.now().toString(),
                role,
                content,
                timestamp: Date.now()
              }
            ],
            updatedAt: Date.now()
          };
        }
        return chat;
      })
    );
  };

  const getChatById = (chatId: string) => {
    return chats.find(chat => chat.id === chatId);
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, title, updatedAt: Date.now() } 
          : chat
      )
    );
  };

  const deleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    
    // Update current chat if the deleted one was selected
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        // If no chats remain, create a new one
        createNewChat();
      }
    }
  };

  return (
    <ChatContext.Provider 
      value={{ 
        chats, 
        currentChatId, 
        setCurrentChatId, 
        createNewChat, 
        addMessageToChat, 
        getChatById,
        updateChatTitle,
        deleteChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};