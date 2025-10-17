
import React from 'react';
import { Code, Star, GitBranch } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface CodingTrackCardProps {
  id: string;
  title: string;
  language: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  rating: number;
  progress: number;
  problemCount: number;
  completedCount: number;
  image?: string;
  onClick?: () => void;
}

const difficultyColors = {
  'Easy': 'bg-green-500',
  'Medium': 'bg-yellow-500',
  'Hard': 'bg-orange-500',
  'Expert': 'bg-red-500',
};

const CodingTrackCard: React.FC<CodingTrackCardProps> = ({
  title,
  language,
  difficulty,
  rating,
  progress,
  problemCount,
  completedCount,
  image,
  onClick,
}) => {
  const difficultyColor = difficultyColors[difficulty];
  
  return (
    <Card 
      className="overflow-hidden hover-scale card-shadow border border-border/40 bg-card/70"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-32 w-full">
          <img
            src={image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400"}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <Badge className={cn("text-white border-none", difficultyColor)}>
              {difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs">
            {language}
          </Badge>
          <div className="flex items-center text-yellow-500">
            <Star size={14} className="fill-yellow-500" />
            <span className="text-xs ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
        
        <div className="flex flex-col gap-1 mt-3">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{completedCount}/{problemCount} Problems</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/50 flex justify-between text-xs">
        <div className="flex items-center">
          <Code size={14} className="mr-1" />
          {language}
        </div>
        <div className="flex items-center">
          <GitBranch size={14} className="mr-1" />
          {completedCount} Completed
        </div>
      </CardFooter>
    </Card>
  );
};

export default CodingTrackCard;
