import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Users,
  Clock,
  CalendarDays,
  MessageSquare,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Share2,
  Search,
  Plus,
  BookOpen,
} from "lucide-react";
import { StudyRoom, User } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock data for study rooms
const mockStudyRooms: StudyRoom[] = [
  {
    id: "1",
    name: "Data Structures Study Group",
    description:
      "Join us to review AVL trees, heaps, and graph algorithms before the midterm.",
    subject: "Data Structures",
    host: {
      id: "101",
      name: "Nandini Naik",
      email: "naik.nandini@university.edu",
      role: "student",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSukj-rU6mx_TwzMlqhMW_3E4fFfUZ9N6R1w&s",
      program: "Computer Science",
    },
    participants: [],
    maxParticipants: 10,
    startTime: new Date("2025-04-15T14:00:00"),
    endTime: new Date("2025-04-15T16:00:00"),
    status: "scheduled",
    roomUrl: "#",
  },
  {
    id: "2",
    name: "Algorithm Design Workshop",
    description:
      "Practice solving complex algorithm problems with optimal solutions.",
    subject: "Algorithms",
    host: {
      id: "102",
      name: "Mayank Sharma",
      email: "sharma.mayank@university.edu",
      role: "faculty",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgARhjZHHVyipkylk4MApB2w2c3Pn4a0uQ5g&s",
      department: "Computer Science",
    },
    participants: [],
    maxParticipants: 15,
    startTime: new Date("2025-04-16T10:00:00"),
    endTime: new Date("2025-04-16T12:00:00"),
    status: "scheduled",
    roomUrl: "#",
  },
  {
    id: "3",
    name: "Web Development Live Coding",
    description:
      "Building a full-stack web application from scratch using modern frameworks.",
    subject: "Web Development",
    host: {
      id: "103",
      name: "Janvi Patel",
      email: "sarah.johnson@university.edu",
      role: "faculty",
      avatar:
        "data:image/jpeg;base64,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",
      department: "Computer Science",
    },
    participants: [],
    maxParticipants: 20,
    startTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    endTime: new Date(Date.now() + 1000 * 60 * 90), // 90 minutes from now
    status: "live",
    roomUrl: "#",
  },
];

const mockParticipants: User[] = [
  {
    id: "103",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "faculty",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
    department: "Computer Science",
  },
  {
    id: "104",
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150",
    program: "Computer Science",
  },
  {
    id: "105",
    name: "Maria Garcia",
    email: "maria.garcia@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150",
    program: "Software Engineering",
  },
  {
    id: "106",
    name: "Tom Wilson",
    email: "tom.wilson@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150",
    program: "Computer Science",
  },
];

const LiveStudyRoom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string; timestamp: Date }[]
  >([
    {
      id: "1",
      sender: "Sarah Johnson",
      text: "Welcome everyone to our Web Development live coding session!",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: "2",
      sender: "Alex Chen",
      text: "Thanks for hosting this! I had a question about React hooks.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: "3",
      sender: "Maria Garcia",
      text: "Could you explain the difference between useState and useEffect?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const filteredRooms = mockStudyRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinRoom = (room: StudyRoom) => {
    setActiveRoom(room);
    toast({
      title: "Joined study room",
      description: `You've joined ${room.name}`,
    });
  };

  const handleHostRoom = () => {
    toast({
      title: "Create a new study room",
      description: "You can now host your own study session.",
    });
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    toast({
      title: "Left study room",
      description: "You've left the study room.",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (activeRoom) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {activeRoom.name}
              </h1>
              <p className="text-muted-foreground">{activeRoom.subject}</p>
            </div>
            <Button variant="destructive" onClick={handleLeaveRoom}>
              <PhoneOff className="mr-2 h-4 w-4" />
              Leave Room
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
            {/* Main video area */}
            <div className="lg:col-span-2 h-full flex flex-col">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-grow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200"
                    alt="Study session"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    {!isVideoEnabled ? (
                      <>
                        <VideoOff size={50} className="mb-2" />
                        <p>Your video is off</p>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Participants grid */}
                <div className="absolute bottom-4 right-4 left-4 flex flex-wrap justify-center gap-2">
                  {mockParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white"
                    >
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                        {participant.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-100 rounded-lg mt-4 p-4 flex justify-center gap-4">
                <Button
                  variant={isAudioEnabled ? "default" : "secondary"}
                  size="icon"
                  className={isAudioEnabled ? "bg-campus-600" : ""}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </Button>
                <Button
                  variant={isVideoEnabled ? "default" : "secondary"}
                  size="icon"
                  className={isVideoEnabled ? "bg-campus-600" : ""}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? (
                    <VideoIcon size={20} />
                  ) : (
                    <VideoOff size={20} />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={20} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleLeaveRoom}
                >
                  <PhoneOff size={20} />
                </Button>
              </div>
            </div>

            {/* Chat and participants */}
            <div className="h-full">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsList>
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="participants" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="chat"
                  className="flex-grow flex flex-col overflow-hidden data-[state=active]:flex-grow"
                >
                  <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-lg border mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "You"
                            ? "justify-end"
                            : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === "You"
                              ? "bg-campus-100 text-campus-800"
                              : "bg-gray-100"
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {message.sender}
                            </span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </TabsContent>
                <TabsContent
                  value="participants"
                  className="data-[state=active]:flex-grow overflow-y-auto"
                >
                  <div className="bg-white rounded-lg border p-4 space-y-4">
                    <div>
                      <h3 className="font-medium">Host</h3>
                      <div className="flex items-center gap-3 mt-2 p-2 rounded-lg hover:bg-gray-50">
                        <img
                          src={activeRoom.host.avatar}
                          alt={activeRoom.host.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{activeRoom.host.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activeRoom.host.role === "faculty"
                              ? "Faculty"
                              : "Student"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">
                        Participants ({mockParticipants.length})
                      </h3>
                      <div className="space-y-1 mt-2">
                        {mockParticipants.map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                          >
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{participant.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {participant.role === "faculty"
                                  ? "Faculty"
                                  : "Student"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Live Study Rooms
            </h1>
            <p className="text-muted-foreground">
              Join virtual study sessions or create your own
            </p>
          </div>
          <Button
            className="bg-campus-600 hover:bg-campus-700 gap-2"
            onClick={handleHostRoom}
          >
            <Plus size={16} />
            Host a Study Room
          </Button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search study rooms..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="live">
          <TabsList>
            <TabsTrigger value="live" className="flex gap-2 items-center">
              <Badge className="bg-green-500 h-2 w-2 p-0 rounded-full" />
              Live Now
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="myrooms">My Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <motion.div
              className="space-y-4 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRooms
                .filter((room) => room.status === "live")
                .map((room) => (
                  <motion.div key={room.id} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle>{room.name}</CardTitle>
                              <Badge className="bg-green-500">Live</Badge>
                            </div>
                            <CardDescription>{room.subject}</CardDescription>
                          </div>

                          <Link to={"https://evtechtcmeet.vercel.app/meeting/user_2eOZQ4WeZ71dMaVzVi9RH2zBjiI?personal=true"} target="_blank">
                            <Button>Join</Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Users size={12} />
                            {Math.floor(Math.random() * 10)}/
                            {room.maxParticipants}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock size={12} />
                            Started{" "}
                            {Math.floor(
                              (Date.now() - room.startTime.getTime()) /
                              (1000 * 60)
                            )}{" "}
                            mins ago
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={room.host.avatar}
                            alt={room.host.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {room.host.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Host
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}

              {filteredRooms.filter((room) => room.status === "live").length ===
                0 && (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">
                      No live study rooms yet
                    </h3>
                    <p className="text-muted-foreground">
                      Create a room or check back later!
                    </p>
                  </div>
                )}
            </motion.div>
          </TabsContent>

          <TabsContent value="upcoming">
            <motion.div
              className="space-y-4 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRooms
                .filter((room) => room.status === "scheduled")
                .map((room) => (
                  <motion.div key={room.id} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{room.name}</CardTitle>
                            <CardDescription>{room.subject}</CardDescription>
                          </div>
                          <Button variant="outline">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Remind Me
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <CalendarDays size={12} />
                            {room.startTime.toLocaleDateString()} at{" "}
                            {room.startTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock size={12} />
                            {Math.floor(
                              (room.endTime.getTime() -
                                room.startTime.getTime()) /
                              (1000 * 60 * 60)
                            )}{" "}
                            hours
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Users size={12} />
                            {Math.floor(Math.random() * 5)}/
                            {room.maxParticipants}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={room.host.avatar}
                            alt={room.host.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {room.host.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Host
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="myrooms">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">
                You haven't joined any rooms yet
              </h3>
              <p className="text-muted-foreground">
                Join a live room or schedule your own study session
              </p>
              <Button
                className="mt-4 bg-campus-600 hover:bg-campus-700"
                onClick={handleHostRoom}
              >
                <Plus className="mr-2 h-4 w-4" />
                Host a Study Room
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LiveStudyRoom;
