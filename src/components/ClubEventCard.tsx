
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { ClubEvent, Club } from '@/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface ClubEventCardProps {
  event: ClubEvent;
  club?: Club;
  onRegister: (eventId: string) => void;
}

const ClubEventCard: React.FC<ClubEventCardProps> = ({ event, club, onRegister }) => {
  const isSameDay = event.startDate.toDateString() === event.endDate.toDateString();
  
  const renderDateBadge = () => {
    if (isSameDay) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <CalendarDays size={12} />
          {format(event.startDate, 'MMMM d, yyyy')}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <CalendarDays size={12} />
          {format(event.startDate, 'MMM d')} - {format(event.endDate, 'MMM d, yyyy')}
        </Badge>
      );
    }
  };
  
  const renderTimeBadge = () => {
    if (isSameDay) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock size={12} />
          {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
        </Badge>
      );
    } else {
      return null;
    }
  };
  
  const getStatusColor = () => {
    switch (event.status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex gap-1 items-center">
                    By 
                    <span className="font-medium text-gray-800">
                      {club?.name || 'Unknown Club'}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className={`uppercase ${getStatusColor()}`}>
                {event.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {renderDateBadge()}
              {renderTimeBadge()}
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin size={12} />
                {event.location}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users size={12} />
                {event.registeredParticipants}/{event.maxParticipants || 'Unlimited'}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="mt-auto border-t pt-4 flex justify-between">
            <div className="text-sm">
              {event.registeredParticipants !== undefined && event.maxParticipants !== undefined && (
                <motion.div 
                  className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="h-full bg-campus-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(event.registeredParticipants / event.maxParticipants) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </motion.div>
              )}
            </div>
            <Button 
              className="bg-campus-600 hover:bg-campus-700"
              disabled={event.status === 'completed'}
              onClick={() => onRegister(event.id)}
            >
              Register Now
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ClubEventCard;
