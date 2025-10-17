
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AttendanceData {
  subject: string;
  present: number;
  absent: number;
  total: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  // Calculate percentage for each entry
  const chartData = data.map(item => ({
    ...item,
    percentage: Math.round((item.present / item.total) * 100)
  }));

  const config = {
    present: { 
      label: 'Present',
      color: '#4ade80' 
    },
    absent: { 
      label: 'Absent',
      color: '#f87171' 
    },
    percentage: {
      label: 'Attendance %',
      color: '#60a5fa'
    }
  };

  return (
    <ChartContainer className="h-80" config={config}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis yAxisId="left" orientation="left" stroke="#4ade80" />
        <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar yAxisId="left" dataKey="present" fill="#4ade80" name="Present" />
        <Bar yAxisId="right" dataKey="absent" fill="#f87171" name="Absent" />
      </BarChart>
    </ChartContainer>
  );
};

export default AttendanceChart;
