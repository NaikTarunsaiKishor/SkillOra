
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import CodeEditor from '@/components/CodeEditor';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Code, Send, MessageSquare, ThumbsUp, Zap } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';

// Updated problem data with explanation in all examples
const problemData = {
  1: {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy" as const,
    constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
    },
  },
  2: {
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.`,
    difficulty: "Easy" as const,
    constraints: `The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merging the two sorted lists results in a new sorted list.",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
        explanation: "Both lists are empty, so the result is empty as well.",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
        explanation: "The first list is empty, so the result is just the second list.",
      },
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Your code here
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
        
    }
}`,
    },
  }
};

// Mock discussions data
const discussions = [
  {
    id: 1,
    user: "SoftwareDev123",
    content: "Can someone explain why a hashmap is more efficient than a nested loop for this problem?",
    likes: 12,
    time: "2 hours ago",
    replies: [
      {
        id: 101,
        user: "AlgoPro",
        content: "A hashmap gives you O(1) lookup time compared to O(n) with a loop, reducing your overall time complexity from O(n²) to O(n).",
        likes: 8,
        time: "1 hour ago",
      },
    ],
  },
  {
    id: 2,
    user: "CodeNewbie",
    content: "What's the best way to handle edge cases here? I'm getting stuck when the input array is empty.",
    likes: 5,
    time: "5 hours ago",
    replies: [],
  }
];

const CodingPage = () => {
  const { id } = useParams<{id: string}>();
  const problemId = id ? parseInt(id) : 1;
  const problem = problemData[problemId as keyof typeof problemData] || problemData[1];
  
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.starterCode.javascript);
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang as keyof typeof problem.starterCode] || problem.starterCode.javascript);
  };
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  
  const handleRun = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      const outcomes = ["[0, 1]", "[1, 2]", "Error: Time Limit Exceeded"];
      const randomOutput = outcomes[Math.floor(Math.random() * outcomes.length)];
      setOutput(randomOutput);
      setIsRunning(false);
    }, 1500);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate code submission
    setTimeout(() => {
      const results = [
        "Success! All test cases passed.",
        "Runtime Error: Cannot read property '0' of undefined",
        "Time Limit Exceeded on test case 3"
      ];
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setOutput(randomResult);
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={problem.difficulty === "Easy" ? "outline" : problem.difficulty === "Medium" ? "secondary" : "destructive"}>
                      {problem.difficulty}
                    </Badge>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <ThumbsUp size={12} /> 85%
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MessageSquare size={12} /> {discussions.length}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                    <Zap size={14} /> Hint
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
                    <Code size={14} /> Solution
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 flex-1 overflow-y-auto">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4">
                  <div>
                    <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Examples:</h3>
                    <div className="space-y-3">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm font-mono mb-1"><span className="font-medium">Input:</span> {example.input}</p>
                          <p className="text-sm font-mono mb-1"><span className="font-medium">Output:</span> {example.output}</p>
                          {example.explanation && (
                            <p className="text-sm"><span className="font-medium">Explanation:</span> {example.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Constraints:</h3>
                    <p className="text-gray-700 whitespace-pre-line font-mono text-sm">{problem.constraints}</p>
                  </div>
                </TabsContent>
                <TabsContent value="discussion">
                  <div className="space-y-4">
                    {discussions.map(discussion => (
                      <div key={discussion.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">{discussion.user}</span>
                            <span className="text-xs text-gray-500 ml-2">{discussion.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <ThumbsUp size={12} /> {discussion.likes}
                          </div>
                        </div>
                        <p className="text-sm mt-2">{discussion.content}</p>
                        {discussion.replies.length > 0 && (
                          <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                            {discussion.replies.map(reply => (
                              <div key={reply.id} className="bg-white p-2 rounded">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="font-medium">{reply.user}</span>
                                    <span className="text-xs text-gray-500 ml-2">{reply.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                                    <ThumbsUp size={12} /> {reply.likes}
                                  </div>
                                </div>
                                <p className="text-sm mt-2">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="submissions">
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span className="text-green-600 font-medium">Accepted</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" /> 2 days ago
                        </span>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Runtime:</span> 76 ms
                        </div>
                        <div>
                          <span className="text-gray-500">Memory:</span> 42.1 MB
                        </div>
                        <div>
                          <span className="text-gray-500">Language:</span> JavaScript
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span className="text-red-600 font-medium">Time Limit Exceeded</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" /> 3 days ago
                        </span>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Runtime:</span> N/A
                        </div>
                        <div>
                          <span className="text-gray-500">Memory:</span> N/A
                        </div>
                        <div>
                          <span className="text-gray-500">Language:</span> Python
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="mb-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Tabs defaultValue={language}>
                <TabsList>
                  <TabsTrigger 
                    value="javascript" 
                    className={language === 'javascript' ? 'bg-yellow-100 data-[state=active]:bg-yellow-100' : ''}
                    onClick={() => handleLanguageChange('javascript')}
                  >
                    JavaScript
                  </TabsTrigger>
                  <TabsTrigger 
                    value="python" 
                    className={language === 'python' ? 'bg-blue-100 data-[state=active]:bg-blue-100' : ''}
                    onClick={() => handleLanguageChange('python')}
                  >
                    Python
                  </TabsTrigger>
                  <TabsTrigger 
                    value="java" 
                    className={language === 'java' ? 'bg-orange-100 data-[state=active]:bg-orange-100' : ''}
                    onClick={() => handleLanguageChange('java')}
                  >
                    Java
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1" onClick={handleRun} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running...
                  </>
                ) : (
                  <>Run</>
                )}
              </Button>
              <Button className="gap-1 bg-campus-600 hover:bg-campus-700" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Submit
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-rows-3 gap-3">
            <div className="bg-gray-50 rounded-md row-span-2 overflow-hidden">
              <CodeEditor
                initialCode={code}
                language={language}
                problem={problem}
              />
            </div>
            <div className="bg-gray-50 rounded-md overflow-hidden p-3 font-mono text-sm">
              <div className="text-gray-500 mb-2">Output:</div>
              <pre className="whitespace-pre-wrap">
                {output || 'Run your code to see output here...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CodingPage;
