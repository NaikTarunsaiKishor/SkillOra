"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BrainCircuit, Send, X, Maximize2, Minimize2,
  Zap, FileCode2, Lightbulb, MessageCircleCode
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useAIAssistantStore } from '../stores/aiAssistantStore';

// Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const generateRandomId = () => Math.random().toString(36).substring(2, 10);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCAsGXnn58wIBDqdE4_liU0KUP0l-qxkXw");

const AIAssistant: React.FC = () => {
  const { isOpen, setIsOpen } = useAIAssistantStore(); 
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateRandomId(),
      text: "Hi there! I'm your AI coding assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchGeminiResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(userMessage);
      const response = result.response.text();

      const assistantMessage: Message = {
        id: generateRandomId(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: generateRandomId(),
        text: "Oops! Something went wrong while contacting the AI 😕",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: generateRandomId(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    fetchGeminiResponse(message);
    setMessage('');
  };

  const suggestedQuestions = [
    "How can I optimize this algorithm?",
    "Debug my React component",
    "Explain recursion with an example",
    "Help me with this code error"
  ];

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-campus-600 hover:bg-campus-700 shadow-lg"
          >
            <BrainCircuit className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              height: isMinimized ? 'auto' : '500px',
              width: isMinimized ? 'auto' : '380px'
            }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-gray-200 ${isMinimized ? 'w-auto h-auto' : 'w-[380px] h-[500px]'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-campus-600 text-white p-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                <h3 className="font-medium">AI Coding Assistant</h3>
                <Badge variant="outline" className="text-xs border-white/40 text-white">Beta</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Chat UI */}
            {!isMinimized && (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-campus-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                          {msg.sender === 'assistant' ? (
                            <ReactMarkdown
                              components={{
                                code({ node, inline = false, className, children, ...props }) {
                                  const match = /language-(\w+)/.exec(className || '');
                                  return !inline ? (
                                    <SyntaxHighlighter
                                      style={oneDark}
                                      language={match?.[1] || 'javascript'}
                                      PreTag="div"
                                      customStyle={{
                                        borderRadius: "0.5rem",
                                        fontSize: "0.8rem",
                                        padding: "0.8rem"
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className="bg-gray-200 px-1 rounded" {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          ) : (
                            <p>{msg.text}</p>
                          )}
                          <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggestions */}
                {messages.length < 3 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs font-normal h-auto py-1"
                          onClick={() => setMessage(q)}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="px-4 pt-1 pb-2 border-t border-gray-100">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-muted-foreground">
                      <FileCode2 size={14} /> <span>Code</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-muted-foreground">
                      <Lightbulb size={14} /> <span>Hints</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-muted-foreground">
                      <Zap size={14} /> <span>Debug</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-muted-foreground">
                      <MessageCircleCode size={14} /> <span>Explain</span>
                    </Button>
                  </div>
                </div>

                {/* Input Box */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Textarea
                      placeholder="Ask me anything about coding..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[44px] max-h-[120px] resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-10 w-10 rounded-full bg-campus-600 hover:bg-campus-700 flex-shrink-0"
                      disabled={!message.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
