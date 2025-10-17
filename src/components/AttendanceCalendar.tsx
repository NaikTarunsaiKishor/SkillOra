
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface AttendanceRecord {
  date: Date;
  status: 'present' | 'absent' | 'late';
  subject?: string;
}

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Find if there's a record for the selected date
  const selectedRecord = selectedDate 
    ? records.find(record => 
        format(record.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : undefined;

  // Function to customize the appearance of calendar days
  const modifiers = {
    present: records
      .filter(record => record.status === 'present')
      .map(record => new Date(record.date)),
    absent: records
      .filter(record => record.status === 'absent')
      .map(record => new Date(record.date)),
    late: records
      .filter(record => record.status === 'late')
      .map(record => new Date(record.date)),
  };

  const modifiersStyles = {
    present: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      borderRadius: '50%'
    },
    absent: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      borderRadius: '50%'
    },
    late: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      borderRadius: '50%'
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-medium mb-3">
              {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {selectedRecord ? (
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium w-24">Status:</span>
                  <Badge 
                    className={`${
                      selectedRecord.status === 'present' ? 'bg-green-500' : 
                      selectedRecord.status === 'absent' ? 'bg-red-500' : 
                      'bg-yellow-500'
                    }`}
                  >
                    {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                  </Badge>
                </div>
                {selectedRecord.subject && (
                  <div className="flex items-center">
                    <span className="font-medium w-24">Subject:</span>
                    <span>{selectedRecord.subject}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground italic">
                No attendance record for this date.
              </div>
            )}
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Legend:</h4>
              <div className="flex gap-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-200 mr-1"></div>
                  <span className="text-sm">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-200 mr-1"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-200 mr-1"></div>
                  <span className="text-sm">Late</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCalendar;
