import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, RotateCcw, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message submission
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() && !selectedSuggestion) return;
    
    const userMessage = inputValue.trim() || selectedSuggestion || '';
    
    // Add user message to chat
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setSelectedSuggestion(null);
    setIsLoading(true);
    
    try {
      // Send the message to our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, newUserMessage].map(m => ({
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
      
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        citations: data.citations || []
      }]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, but I'm having trouble connecting to my knowledge source. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestion = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setInputValue(suggestion);
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputValue('');
    setSelectedSuggestion(null);
  };

  // Format message timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col overflow-hidden border border-[#e9e1ca] bg-white">
        <CardHeader className="bg-[#1b4d3e]/5 backdrop-blur-sm border-b border-[#e9e1ca]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1b4d3e] flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-[#1b4d3e]" />
                Sanafi AI Assistant
              </CardTitle>
              <CardDescription>
                Ask me anything about Islamic finance and Sharia-compliant investing
              </CardDescription>
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
        </CardHeader>
        
        <div className="islamic-pattern opacity-5 absolute inset-0 pointer-events-none"></div>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          <div className="space-y-6 pb-2">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[85%] rounded-xl p-4 shadow-sm flex",
                  message.role === 'user' 
                    ? "bg-[#1b4d3e] text-[#f5f0e5] rounded-tr-none" 
                    : "bg-[#f5f0e5] text-[#1b4d3e] rounded-tl-none"
                )}>
                  <div className={cn(
                    "rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2",
                    message.role === 'user' ? "bg-[#f5f0e5]" : "bg-[#1b4d3e]"
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-3 w-3 text-[#1b4d3e]" />
                    ) : (
                      <Bot className="h-3 w-3 text-[#f5f0e5]" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="space-y-2">
                      <div className="text-sm leading-relaxed">{message.content}</div>
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#1b4d3e]/10 text-xs">
                          <div className="font-medium mb-1">Sources:</div>
                          <ul className="space-y-1">
                            {message.citations.map((citation, idx) => (
                              <li key={idx}>
                                <a 
                                  href={citation} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center hover:underline"
                                >
                                  {citation.replace(/^https?:\/\/(www\.)?/, '').substring(0, 30)}...
                                  <ExternalLink className="h-3 w-3 ml-1 inline" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-xs opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#f5f0e5] max-w-[85%] rounded-xl p-4 rounded-tl-none shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-[#1b4d3e] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-sm text-[#1b4d3e]/70">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map((suggestion, idx) => (
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
        
        <div className="p-4 border-t border-[#e9e1ca] bg-white">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Islamic finance..."
              className="min-h-[50px] max-h-[150px] border-[#e9e1ca] focus:border-[#1b4d3e] focus:ring-[#1b4d3e]"
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
              className="bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#f5f0e5] px-3 h-[50px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-xs text-center mt-2 text-gray-500">
            <span className="flex items-center justify-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-[#1b4d3e]" />
              Powered by Perplexity LLM technology
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

