
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Lightbulb, MessageSquare, Zap, Copy, Download, Save, RotateCcw, Play } from 'lucide-react';

interface AiAssistantIDEProps {
  onGenerateCode?: (prompt: string) => void;
}

const AiAssistantIDE: React.FC<AiAssistantIDEProps> = ({ onGenerateCode }) => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiMessages, setAiMessages] = useState<{
    id: number;
    text: string;
    type: 'suggestion' | 'explanation' | 'error';
    icon: React.ReactNode;
  }[]>([
    {
      id: 1,
      text: "Welcome to AI Assistant IDE! I can help you write and debug code. Try asking me to create a simple program or explain a concept.",
      type: 'explanation',
      icon: <Lightbulb className="h-4 w-4 text-blue-600" />
    }
  ]);

  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    
    // Simulating AI response
    setTimeout(() => {
      const newMessageType: 'suggestion' | 'explanation' | 'error' = 
        Math.random() > 0.3 ? 'explanation' : 
        (Math.random() > 0.5 ? 'suggestion' : 'error');

      const newMessage = {
        id: Date.now(),
        text: generateMockResponse(prompt),
        type: newMessageType,
        icon: <Lightbulb className="h-4 w-4 text-blue-600" />
      };
      
      setAiMessages(prev => [newMessage, ...prev]);
      setPrompt("");
      setGenerating(false);
      
      if (onGenerateCode) {
        onGenerateCode(prompt);
      }
    }, 1500);
  };

  const generateMockResponse = (userPrompt: string) => {
    if (userPrompt.toLowerCase().includes('python')) {
      return "Here's a simple Python function that does what you asked:\n\n```python\ndef calculate_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n\n# Example usage\nnums = [1, 2, 3, 4, 5]\nprint(calculate_average(nums))  # Output: 3.0\n```";
    } else if (userPrompt.toLowerCase().includes('javascript')) {
      return "Here's a JavaScript function to solve your problem:\n\n```javascript\nfunction calculateAverage(numbers) {\n  if (!numbers.length) return 0;\n  const sum = numbers.reduce((acc, val) => acc + val, 0);\n  return sum / numbers.length;\n}\n\n// Example usage\nconst nums = [1, 2, 3, 4, 5];\nconsole.log(calculateAverage(nums));  // Output: 3\n```";
    } else if (userPrompt.toLowerCase().includes('error')) {
      return "I found an issue in your code. The error is likely occurring because you're trying to access an array index that doesn't exist. Make sure your loop condition uses `<` rather than `<=` when iterating through arrays.";
    } else {
      return "Based on your prompt, here's some code that might help you:\n\n```javascript\n// Simple function to demonstrate\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```\n\nYou can run this code by clicking the Run button. Let me know if you need more specific assistance!";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiMessages.map((message) => (
          <div 
            key={message.id}
            className={`rounded-lg p-3 border ${
              message.type === 'suggestion' ? 'bg-blue-50 border-blue-200' :
              message.type === 'error' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start gap-2">
              <div className={`p-1 rounded-full ${
                message.type === 'suggestion' ? 'bg-blue-100' :
                message.type === 'error' ? 'bg-red-100' :
                'bg-gray-100'
              }`}>
                {message.icon || <Lightbulb className="h-4 w-4 text-blue-600" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  message.type === 'suggestion' ? 'text-blue-800' :
                  message.type === 'error' ? 'text-red-800' :
                  'text-gray-800'
                }`}>
                  {message.type === 'suggestion' ? 'Suggestion' :
                   message.type === 'error' ? 'Issue Detected' :
                   'AI Assistant'}
                </p>
                <div className="text-sm text-gray-600 whitespace-pre-wrap prose prose-sm max-w-none">
                  {message.text.split('```').map((part, index) => {
                    if (index % 2 === 0) {
                      return <p key={index}>{part}</p>;
                    } else {
                      const codeParts = part.split('\n');
                      const language = codeParts[0];
                      const code = codeParts.slice(1).join('\n');
                      
                      return (
                        <div key={index} className="relative mt-2 mb-2">
                          <div className="bg-gray-800 rounded-t-md py-1 px-4 text-xs text-gray-300">
                            {language || 'code'}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 absolute right-1 top-1 text-gray-400 hover:text-white"
                              onClick={() => navigator.clipboard.writeText(code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-md overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t bg-gray-50">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI to write or explain code..."
            className="w-full min-h-[80px] rounded-lg border border-gray-300 p-3 pr-12 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-campus-500 focus:border-transparent"
          />
          <Button 
            className="absolute right-2 bottom-2 bg-campus-600 hover:bg-campus-700"
            size="sm"
            onClick={handleSubmitPrompt}
            disabled={generating || !prompt.trim()}
          >
            {generating ? (
              <>
                <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                Thinking...
              </>
            ) : (
              <>
                <Zap className="mr-1 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>
        
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <div>
            Powered by advanced AI
          </div>
          <div className="flex items-center">
            <span className="mr-1">Suggestions:</span>
            <button className="underline hover:text-campus-600">Python function</button>
            <span className="mx-1">•</span>
            <button className="underline hover:text-campus-600">Fix errors</button>
            <span className="mx-1">•</span>
            <button className="underline hover:text-campus-600">Optimize code</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantIDE;
