
import React from 'react';
import { Book, Clock, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  instructor: string;
  progress: number;
  duration: string;
  enrolledStudents: number;
  image?: string;
  isNew?: boolean;
  color?: 'purple' | 'blue' | 'green' | 'orange';
  onClick?: () => void;
}

const cardColors = {
  purple: 'from-campus-500/10 to-campus-700/10 border-campus-200',
  blue: 'from-blue-500/10 to-blue-700/10 border-blue-200',
  green: 'from-green-500/10 to-green-700/10 border-green-200',
  orange: 'from-orange-500/10 to-orange-700/10 border-orange-200',
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category,
  instructor,
  progress,
  duration,
  enrolledStudents,
  image,
  isNew = false,
  color = 'purple',
  onClick,
}) => {
  const colorClass = cardColors[color];
  
  return (
    <Card 
      className={cn(
        "overflow-hidden hover-scale card-shadow border bg-gradient-to-br transition-all",
        colorClass
      )}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <img
            src={image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400"}
            alt={title}
            className="object-cover w-full h-full"
          />
          {isNew && (
            <Badge className="absolute top-2 right-2 bg-red-500">New</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {category}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">Instructor: {instructor}</p>
        
        <div className="flex flex-col gap-1 mt-3">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/50 flex justify-between text-xs">
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {duration}
        </div>
        <div className="flex items-center">
          <User size={14} className="mr-1" />
          {enrolledStudents} Students
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
