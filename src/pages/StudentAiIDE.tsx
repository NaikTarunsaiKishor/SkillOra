
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Save, RotateCcw, Bug, FileCode, Clock, Download, Files } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import AiAssistantIDE from '../components/AiAssistantIDE';

const languageExamples = {
  javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!");\n\n// Example function\nfunction add(a, b) {\n  return a + b;\n}\n\nconst result = add(5, 3);\nconsole.log(`Result: ${result}`);',
  python: '# Write your Python code here\nprint("Hello, World!")\n\n# Example function\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(f"Result: {result}")',
  java: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Example function\n        int result = add(5, 3);\n        System.out.println("Result: " + result);\n    }\n    \n    public static int add(int a, int b) {\n        return a + b;\n    }\n}',
  cpp: '// Write your C++ code here\n#include <iostream>\n\n// Example function\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    \n    int result = add(5, 3);\n    std::cout << "Result: " << result << std::endl;\n    \n    return 0;\n}',
};

const StudentAiIDE = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageExamples.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [savedPrograms, setSavedPrograms] = useState([
    { id: 1, name: "Hello World", language: "javascript", lastModified: "2025-04-10" },
    { id: 2, name: "Sorting Algorithm", language: "python", lastModified: "2025-04-09" },
    { id: 3, name: "Calculator", language: "java", lastModified: "2025-04-08" },
  ]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(languageExamples[lang as keyof typeof languageExamples] || "");
    setOutput("");
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Running code...");

    // Simulate code execution
    setTimeout(() => {
      if (language === "javascript") {
        try {
          // Simulating JavaScript execution (would be handled by a real runtime in production)
          setOutput("Program executed successfully!\n\n> Hello, World!\n> Result: 8");
        } catch (error) {
          setOutput(`Error: ${error}`);
        }
      } else {
        // For other languages we just simulate a successful run
        setOutput(`Program executed in ${language}!\n\nHello, World!\nResult: 8`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const handleAiGenerate = (prompt: string) => {
    // In a real implementation, this would integrate with an AI service
    // For now, we'll just update the code based on the prompt
    if (prompt.toLowerCase().includes('sorting')) {
      if (language === 'javascript') {
        setCode(`// Bubble Sort implementation in JavaScript
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// Test the function
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);
console.log("Sorted array:", bubbleSort([...numbers]));`);
      } else if (language === 'python') {
        setCode(`# Bubble Sort implementation in Python
def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr

# Test the function
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", numbers)
print("Sorted array:", bubble_sort(numbers.copy()))`);
      }
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI-Powered Coding Environment</h1>
            <p className="text-muted-foreground">Write, run, and optimize code with AI assistance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Files className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </Button>
            <Button variant="outline" className="gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-1">
              <FileCode className="h-4 w-4" />
              <span>New File</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-full h-[calc(100vh-14rem)]">
            <div className="border rounded-lg overflow-hidden h-full">
              <CodeEditor
                initialCode={code}
                language={language}
                problem={{
                  title: "Interactive Coding Environment",
                  description: "Write and run code with real-time AI assistance",
                  difficulty: "Medium"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentAiIDE;
