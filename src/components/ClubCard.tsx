
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ExternalLink } from 'lucide-react';
import { Club } from '@/types';

interface ClubCardProps {
  club: Club;
  onJoinClub: (clubId: string) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onJoinClub }) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="h-36 overflow-hidden relative">
        <img 
          src={club.bannerUrl} 
          alt={club.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {club.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="relative pt-12">
        <div className="absolute -top-8 left-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
          <img 
            src={club.logoUrl} 
            alt={club.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{club.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Users size={14} className="mr-1" />
              {club.members} members
            </CardDescription>
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Calendar size={14} className="mr-1" />
            Est. {club.foundedAt.getFullYear()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{club.description}</p>
        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium">Faculty Advisor:</span> {club.faculty}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={() => window.open(club.socialLinks?.website || '#', '_blank')}
        >
          <ExternalLink size={14} />
          Visit
        </Button>
        <Button 
          size="sm" 
          className="bg-campus-600 hover:bg-campus-700"
          onClick={() => onJoinClub(club.id)}
        >
          Join Club
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
