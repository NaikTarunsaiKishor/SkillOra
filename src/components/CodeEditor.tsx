
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Bug, Save, RotateCcw, MessageSquare, Lock, Lightbulb, X } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  problem?: {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  };
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here',
  language = 'javascript',
  problem,
}) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution with a delay
    setTimeout(() => {
      setOutput('Code executed successfully!\n\nOutput:\nHello, World!');
      setIsRunning(false);
    }, 1500);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const difficultyColors = {
    'Easy': 'bg-green-100 text-green-800 border-green-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hard': 'bg-orange-100 text-orange-800 border-orange-200',
    'Expert': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="h-full flex flex-col rounded-lg border overflow-hidden">
      {/* Editor header */}
      <div className="bg-gray-100 border-b p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          
          {problem && (
            <div className="hidden md:block">
              <span className="font-medium text-sm">{problem.title}</span>
              {problem.difficulty && (
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => setShowAiAssistant(!showAiAssistant)}
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleResetCode}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1 bg-campus-600 hover:bg-campus-700"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main editor area */}
        <div className={`flex-1 flex flex-col ${showAiAssistant ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Code editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-code text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
            
            {/* Output panel */}
            <div className="h-1/3 border-t">
              <Tabs defaultValue="output">
                <div className="border-b px-4">
                  <TabsList className="h-9">
                    <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
                    <TabsTrigger value="tests" className="text-xs">Tests</TabsTrigger>
                    <TabsTrigger value="debug" className="text-xs">Debug</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="output" className="p-0 h-full">
                  <div className="bg-gray-50 text-sm font-code p-4 h-full overflow-y-auto">
                    {output || 'Run your code to see output here'}
                  </div>
                </TabsContent>
                
                <TabsContent value="tests" className="p-0 h-full">
                  <div className="bg-gray-50 p-4 h-full overflow-y-auto">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                        ✓
                      </div>
                      <p className="text-sm">Test Case 1: Passed</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white mr-2">
                        ?
                      </div>
                      <p className="text-sm">Test Case 2: Not run</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="debug" className="p-0 h-full">
                  <div className="bg-gray-50 p-4 h-full overflow-y-auto flex justify-center items-center">
                    <div className="text-center">
                      <Bug className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Debugging tools not active</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Launch Debugger
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* AI Assistant panel (conditionally shown) */}
        {showAiAssistant && (
          <div className="hidden lg:flex flex-col w-1/3 border-l">
            <div className="bg-gray-100 border-b p-3 flex justify-between items-center">
              <h3 className="font-medium">AI Assistant</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowAiAssistant(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-campus-50 rounded-lg p-3 border border-campus-200">
                <div className="flex items-start gap-2">
                  <div className="bg-campus-100 p-1 rounded-full">
                    <Lightbulb className="h-4 w-4 text-campus-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-campus-800">Suggestion</p>
                    <p className="text-sm text-gray-600">Consider using a more efficient algorithm to solve this problem. The current approach has O(n²) time complexity.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Bug className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Bug Detection</p>
                    <p className="text-sm text-gray-600">There might be an off-by-one error in your loop. Check the boundary condition on line 5.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <p className="text-sm font-medium">Ask AI</p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask a question about your code..."
                    className="w-full rounded-lg border p-2 pr-10 text-sm"
                  />
                  <Button size="icon" variant="ghost" className="absolute right-1 top-1">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              AI suggestions are private and secure
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
