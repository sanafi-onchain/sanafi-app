import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, RotateCcw, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat, ChatMessage as ContextChatMessage } from '@/contexts/ChatContext';

// Types for chat messages
type MessageRole = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp: Date;
  citations?: string[];
}

// Predefined suggestions
const SUGGESTIONS = [
  "What is Mudarabah in Islamic finance?",
  "Explain the difference between conventional and Islamic banking",
  "How does Sukuk work as an investment?",
  "What makes an investment Halal or Haram?",
  "Explain profit-sharing in Islamic finance",
  "What are the principles of Riba in Sharia law?"
];

// Welcome message
const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Assalamu alaikum! I'm your Sanafi AI assistant, ready to help you understand Islamic finance principles and Sharia-compliant investing. What would you like to learn about today?",
  timestamp: new Date(),
};

export function SanafiAIChat() {
  const { chats, currentChatId, createNewChat, addMessageToChat, getChatById } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  
  // Convert chat messages from context format to component format
  const getLocalMessages = (): ChatMessage[] => {
    if (!currentChatId) return [WELCOME_MESSAGE];
    
    const currentChat = getChatById(currentChatId);
    if (!currentChat || currentChat.messages.length === 0) return [WELCOME_MESSAGE];
    
    return currentChat.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      citations: [] // We don't store citations in context yet
    }));
  };
  
  const localMessages = getLocalMessages();

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  // Handle message submission
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() && !selectedSuggestion) return;
    
    const userMessage = inputValue.trim() || selectedSuggestion || '';
    
    // Ensure we have a current chat to add messages to
    let chatId = currentChatId;
    if (!chatId) {
      chatId = createNewChat();
    }
    
    // Add user message to chat context
    addMessageToChat(chatId, 'user', userMessage);
    
    setInputValue('');
    setSelectedSuggestion(null);
    setIsLoading(true);
    
    try {
      // Get current messages including the one we just added
      const currentMessages = getLocalMessages();
      
      // Send the message to our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: currentMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.message || 'Failed to get response');
      }
      
      const data = await response.json();
      
      // Add AI response to chat context
      addMessageToChat(chatId, 'assistant', data.content);
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat context
      addMessageToChat(
        chatId, 
        'assistant', 
        "I apologize, but I'm having trouble connecting to my knowledge source. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestion = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setInputValue(suggestion);
  };

  // Clear chat history by creating a new chat
  const handleClearChat = () => {
    createNewChat();
    setInputValue('');
    setSelectedSuggestion(null);
  };

  // Format message timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Full-page chat interface similar to ChatGPT */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-4 md:px-6 border-b border-[#e9e1ca] bg-white">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#1b4d3e]" />
            <h1 className="text-xl font-medium text-[#1b4d3e]">Sanafi AI</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearChat}
            className="text-gray-500 hover:text-[#1b4d3e]"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        </div>
        
        {/* Main conversation area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Welcome header only shown at start of conversation */}
          {localMessages.length === 1 && (
            <div className="max-w-3xl mx-auto px-4 py-10 text-center">
              <h2 className="text-2xl font-bold text-[#1b4d3e] mb-2">
                Sanafi AI Assistant
              </h2>
              <p className="text-gray-600 mb-8">
                Ask me anything about Islamic finance and Sharia-compliant investing
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="max-w-3xl mx-auto px-4 pb-24">
            <div className="space-y-6">
              {localMessages.map((message: ChatMessage, index: number) => (
                <div key={index} className={cn(
                  "flex items-start",
                  message.role === 'user' ? "justify-end md:justify-start" : "justify-start"
                )}>
                  <div 
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                      message.role === 'user' ? "bg-[#1b4d3e] text-white" : "bg-[#f5f0e5] text-[#1b4d3e]"
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="max-w-[90%] md:max-w-[80%] space-y-1">
                    <div 
                      className={cn(
                        "text-base leading-relaxed",
                        message.role === 'user' ? "text-[#1b4d3e]" : "text-gray-800"
                      )}
                    >
                      {message.content}
                    </div>
                    
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[#1b4d3e]/10 text-xs">
                        <div className="font-medium mb-1">Sources:</div>
                        <ul className="space-y-1">
                          {message.citations.map((citation: string, idx: number) => (
                            <li key={idx}>
                              <a 
                                href={citation} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center hover:underline text-[#1b4d3e]"
                              >
                                {citation.replace(/^https?:\/\/(www\.)?/, '').substring(0, 30)}...
                                <ExternalLink className="h-3 w-3 ml-1 inline" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-[#f5f0e5] text-[#1b4d3e] flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center h-8">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Footer with input and suggested questions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e9e1ca]">
          {/* Suggestions */}
          {localMessages.length === 1 && (
            <div className="max-w-3xl mx-auto px-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SUGGESTIONS.map((suggestion: string, idx: number) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cn(
                      "text-left justify-start text-sm p-3 bg-[#f5f0e5] hover:bg-[#e9e1ca] text-[#1b4d3e] border-[#e9e1ca]",
                      selectedSuggestion === suggestion && "border-[#1b4d3e] bg-[#1b4d3e]/5"
                    )}
                    onClick={() => handleSuggestion(suggestion)}
                  >
                    <Sparkles className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input form */}
          <div className="max-w-3xl mx-auto px-4 py-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Islamic finance..."
                className="min-h-[50px] max-h-[150px] border-[#e9e1ca] focus:border-[#1b4d3e] focus:ring-[#1b4d3e] rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading || (!inputValue.trim() && !selectedSuggestion)}
                className="bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#f5f0e5] px-3 h-[50px] rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="text-xs text-center mt-2 text-gray-500">
              <span className="flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 mr-1 text-[#1b4d3e]" />
                Powered by OpenRouter AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

