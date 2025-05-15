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
          messages: [...messages, newUserMessage]
            .filter(m => m.role !== 'system') // Filter out any system messages from the frontend
            .map(m => ({
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
    <div className="flex flex-col h-full w-full">
      <Card className="flex-1 flex flex-col overflow-hidden border border-[#e9e1ca] bg-white h-full shadow-lg">
        <CardHeader className="bg-[#1b4d3e]/5 backdrop-blur-sm border-b border-[#e9e1ca] py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1b4d3e] flex items-center text-xl">
                <Sparkles className="h-6 w-6 mr-2 text-[#1b4d3e]" />
                Sanafi AI Assistant
              </CardTitle>
              <CardDescription className="text-base">
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
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 relative">
          <div className="space-y-8 pb-2 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[85%] rounded-xl p-4 shadow-sm flex",
                  message.role === 'user' 
                    ? "bg-[#1b4d3e] text-[#f5f0e5] rounded-tr-none border border-[#1b4d3e]/20" 
                    : "bg-[#f5f0e5] text-[#1b4d3e] rounded-tl-none border border-[#e9e1ca]"
                )}>
                  <div className={cn(
                    "rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 mt-1",
                    message.role === 'user' ? "bg-[#f5f0e5]" : "bg-[#1b4d3e]"
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-[#1b4d3e]" />
                    ) : (
                      <Bot className="h-4 w-4 text-[#f5f0e5]" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="space-y-2">
                      <div className="text-base leading-relaxed whitespace-pre-wrap">
                        {message.content.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className={pIdx > 0 ? "mt-4" : ""}>
                            {paragraph.split('\n').map((line, lIdx) => {
                              // Check if this is a list item
                              if (line.match(/^[\d*-]+\.\s+/) || line.match(/^[•*-]\s+/)) {
                                return (
                                  <span key={lIdx} className="block ml-4 my-1">
                                    {line}
                                  </span>
                                );
                              }
                              // Check if this is a heading (starting with #)
                              else if (line.match(/^#+\s+/)) {
                                const headingMatch = line.match(/^(#+)\s+/);
                                const level = headingMatch?.[1]?.length || 1;
                                const text = line.replace(/^#+\s+/, '');
                                return (
                                  <span key={lIdx} 
                                    className={`block font-semibold ${level === 1 ? 'text-lg mt-3 mb-2' : 'mt-2 mb-1'}`}>
                                    {text}
                                  </span>
                                );
                              }
                              // Regular line
                              return (
                                <span key={lIdx} className={lIdx > 0 ? "block mt-1" : ""}>
                                  {line}
                                </span>
                              );
                            })}
                          </p>
                        ))}
                      </div>
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#1b4d3e]/10 text-sm">
                          <div className="font-medium mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                              <path d="M12 11h1v6h-1" />
                              <path d="M7 7a4 4 0 0 1 8 0v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
                              <circle cx="12" cy="8" r="1" />
                            </svg>
                            Sources:
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {message.citations.map((citation, idx) => {
                              // Extract domain name for display
                              const urlObj = new URL(citation);
                              const domain = urlObj.hostname.replace(/^www\./, '');
                              
                              return (
                                <li key={idx} className="border border-[#1b4d3e]/10 rounded-md px-3 py-1.5 bg-[#1b4d3e]/5 hover:bg-[#1b4d3e]/10 transition-colors">
                                  <a 
                                    href={citation} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full text-[#1b4d3e]"
                                  >
                                    <span className="flex items-center">
                                      <span className="inline-block w-5 h-5 mr-2 text-center text-xs font-medium bg-[#1b4d3e] text-white rounded-full">
                                        {idx + 1}
                                      </span>
                                      <span className="truncate max-w-[200px]">{domain}</span>
                                    </span>
                                    <ExternalLink className="h-3 w-3 ml-1 inline flex-shrink-0" />
                                  </a>
                                </li>
                              );
                            })}
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
                <div className="bg-[#f5f0e5] max-w-[85%] rounded-xl p-4 rounded-tl-none shadow-sm border border-[#e9e1ca]">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[#1b4d3e]/10 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-t-2 border-[#1b4d3e] animate-spin"></div>
                        <Bot className="h-4 w-4 text-[#1b4d3e]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-[#1b4d3e]">
                        <span className="text-sm font-medium">Sanafi AI</span>
                        <span className="text-xs ml-2 px-1.5 py-0.5 rounded-full bg-[#1b4d3e]/10 text-[#1b4d3e] font-medium">
                          Thinking...
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1.5">
                        <div className="h-1.5 w-1.5 bg-[#1b4d3e] rounded-full animate-pulse"></div>
                        <div className="h-1.5 w-1.5 bg-[#1b4d3e] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-1.5 w-1.5 bg-[#1b4d3e] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        {messages.length === 1 && (
          <div className="px-6 pb-5">
            <div className="grid grid-cols-2 gap-3 max-w-4xl mx-auto">
              {SUGGESTIONS.map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className={cn(
                    "text-left justify-start text-sm p-4 bg-[#f5f0e5] hover:bg-[#e9e1ca] text-[#1b4d3e] border-[#e9e1ca]",
                    selectedSuggestion === suggestion && "border-[#1b4d3e] bg-[#1b4d3e]/5"
                  )}
                  onClick={() => handleSuggestion(suggestion)}
                >
                  <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-6 border-t border-[#e9e1ca] bg-white">
          <form onSubmit={handleSubmit} className="flex space-x-3 max-w-4xl mx-auto">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Islamic finance..."
              className="min-h-[60px] max-h-[150px] border-[#e9e1ca] focus:border-[#1b4d3e] focus:ring-[#1b4d3e] text-base"
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
              className="bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#f5f0e5] px-4 h-[60px]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <div className="text-sm text-center mt-3 text-gray-500 max-w-4xl mx-auto">
            <span className="flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 mr-1 text-[#1b4d3e]" />
              Powered by Perplexity LLM technology
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

