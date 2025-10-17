
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'lecture' | 'assignment' | 'exam' | 'lab';
}

const eventTypeClasses = {
  lecture: 'bg-blue-100 text-blue-700 border-blue-200',
  assignment: 'bg-orange-100 text-orange-700 border-orange-200',
  exam: 'bg-red-100 text-red-700 border-red-200',
  lab: 'bg-green-100 text-green-700 border-green-200',
};

const EventItem: React.FC<{ event: Event }> = ({ event }) => (
  <div className="flex items-start gap-3 mb-4 last:mb-0">
    <div className="flex flex-col items-center">
      <div className="text-center w-12 p-1 border rounded-t-md bg-muted font-medium text-xs">
        {event.date.split(' ')[0]}
      </div>
      <div className="text-center w-12 p-1 border-x border-b rounded-b-md font-bold">
        {event.date.split(' ')[1]}
      </div>
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-sm">{event.title}</h3>
      <p className="text-xs text-muted-foreground">{event.time}</p>
      <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1.5 border ${eventTypeClasses[event.type]}`}>
        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
      </div>
    </div>
  </div>
);

const UpcomingEvents: React.FC = () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Data Structures Lecture',
      date: 'Sep 12',
      time: '10:00 AM - 11:30 AM',
      type: 'lecture',
    },
    {
      id: '2',
      title: 'JavaScript Assignment Due',
      date: 'Sep 15',
      time: '11:59 PM',
      type: 'assignment',
    },
    {
      id: '3',
      title: 'Database Systems Midterm',
      date: 'Sep 18',
      time: '9:00 AM - 11:00 AM',
      type: 'exam',
    },
    {
      id: '4',
      title: 'Computer Networks Lab',
      date: 'Sep 20',
      time: '2:00 PM - 4:00 PM',
      type: 'lab',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-campus-600" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
