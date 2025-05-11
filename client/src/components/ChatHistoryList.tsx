import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";
import { MessageSquare, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Function to format timestamp to relative time
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Convert diff to appropriate unit
  if (diff < 60000) {
    return 'just now';
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  } else if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  } else if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}d ago`;
  } else {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};

export default function ChatHistoryList() {
  const { chats, currentChatId, setCurrentChatId, createNewChat, updateChatTitle, deleteChat } = useChat();
  const [_, navigate] = useLocation();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
    navigate("/"); // Navigate to the AI chat page
  };

  const handleCreateNewChat = () => {
    createNewChat();
    navigate("/"); // Navigate to the AI chat page
  };

  const startEditingChat = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const saveEditedTitle = () => {
    if (editingChatId && editTitle.trim()) {
      updateChatTitle(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
  };

  const cancelEditing = () => {
    setEditingChatId(null);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <div className="flex flex-col h-full pb-3 overflow-hidden">
      <div className="px-3 py-2 flex items-center justify-between border-b border-white border-opacity-20">
        <h3 className="text-sm font-medium opacity-90">Chat History</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 bg-white bg-opacity-10 hover:bg-opacity-20"
          onClick={handleCreateNewChat}
          title="New Chat"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-1 chat-history-scroll">
        {chats.length === 0 ? (
          <div className="text-center p-4 text-sm opacity-70">
            No chats yet. Start a new conversation!
          </div>
        ) : (
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <div 
                  className={cn(
                    "group flex items-center px-2 py-2 rounded cursor-pointer",
                    currentChatId === chat.id 
                      ? "bg-white bg-opacity-10" 
                      : "hover:bg-white hover:bg-opacity-5"
                  )}
                  onClick={() => handleChatClick(chat.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                  
                  {editingChatId === chat.id ? (
                    <div className="flex flex-1 items-center">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="h-7 text-sm bg-white bg-opacity-5 border-white border-opacity-20 text-white mr-1"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-white hover:bg-opacity-10"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            saveEditedTitle(); 
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-white hover:bg-opacity-10"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            cancelEditing(); 
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm">{chat.title}</div>
                        <div className="text-xs opacity-60">
                          {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                        </div>
                      </div>
                      
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-white hover:bg-opacity-10"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            startEditingChat(chat.id, chat.title); 
                          }}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-red-400 hover:bg-white hover:bg-opacity-10"
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* New Chat button at the bottom */}
      <div className="px-3 pt-2">
        <Button 
          variant="outline" 
          className="w-full justify-center border-white border-opacity-30 hover:bg-white hover:bg-opacity-10"
          onClick={handleCreateNewChat}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>New Chat</span>
        </Button>
      </div>
    </div>
  );
}