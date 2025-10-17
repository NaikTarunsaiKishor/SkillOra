
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample calendar events
  const events = [
    { id: 1, title: "Data Structures Lecture", date: "2025-04-12", time: "10:00 AM - 11:30 AM", type: "lecture" },
    { id: 2, title: "Web Dev Assignment Due", date: "2025-04-12", time: "11:59 PM", type: "assignment" },
    { id: 3, title: "Database Systems Lab", date: "2025-04-15", time: "2:00 PM - 4:00 PM", type: "lab" },
    { id: 4, title: "JavaScript Quiz", date: "2025-04-15", time: "10:00 AM", type: "assessment" },
    { id: 5, title: "Study Group: Algorithms", date: "2025-04-16", time: "3:00 PM - 5:00 PM", type: "personal" },
    { id: 6, title: "OS Project Meeting", date: "2025-04-20", time: "1:00 PM - 2:30 PM", type: "meeting" },
  ];

  // Get events for the selected date
  const selectedDateStr = date ? date.toISOString().split('T')[0] : '';
  const selectedDateEvents = events.filter(event => event.date === selectedDateStr);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Academic Calendar</h1>
            <p className="text-muted-foreground">View and manage your academic schedule and deadlines.</p>
          </div>
          <Button className="bg-campus-600 hover:bg-campus-700">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                      <Badge 
                        className={`
                          mt-0.5 
                          ${event.type === 'lecture' ? 'bg-blue-500' : 
                          event.type === 'assignment' ? 'bg-yellow-500' : 
                          event.type === 'assessment' ? 'bg-red-500' : 
                          event.type === 'lab' ? 'bg-green-500' : 
                          event.type === 'meeting' ? 'bg-purple-500' : 
                          'bg-gray-500'}
                        `}
                      >
                        {event.type}
                      </Badge>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No events scheduled for this day.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                <div key={event.id} className="flex items-start space-x-4 pb-3 border-b border-gray-100 last:border-0">
                  <div className="min-w-16 text-center">
                    <p className="font-bold">{new Date(event.date).getDate()}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge 
                        className={`
                          ${event.type === 'lecture' ? 'bg-blue-500' : 
                          event.type === 'assignment' ? 'bg-yellow-500' : 
                          event.type === 'assessment' ? 'bg-red-500' : 
                          event.type === 'lab' ? 'bg-green-500' : 
                          event.type === 'meeting' ? 'bg-purple-500' : 
                          'bg-gray-500'}
                        `}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Calendar;
