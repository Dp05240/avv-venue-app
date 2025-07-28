'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

// Simplified types for build compatibility
interface Booking {
  id: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface CalendarBlock {
  id: string;
  date: string;
  type: string;
  reason: string;
}

type CalendarStatus = 'available' | 'booked' | 'partial' | 'closed' | 'blocked' | 'space_blocked';

interface DayData {
  status: CalendarStatus;
  bookings: Booking[];
  blocks: CalendarBlock[];
}

// Unified color scheme matching the booking calendar
const colors = {
  primary: '#6366f1', // Indigo
  primaryGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  secondary: '#f59e0b', // Amber
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  background: '#f8fafc', // Slate 50
  surface: '#ffffff',
  border: '#e2e8f0', // Slate 200
  text: {
    primary: '#1e293b', // Slate 800
    secondary: '#64748b', // Slate 500
    muted: '#94a3b8', // Slate 400
  }
};

export default function CalendarSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarData, setCalendarData] = useState<Record<string, DayData>>({});
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);

  useEffect(() => {
    // Simplified - no API calls for now
    initializeCalendarData();
  }, [currentDate]);

  const initializeCalendarData = () => {
    const monthData: Record<string, DayData> = {};
    
    // Get the first and last day of the current month view
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    
    // Initialize all days in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const key = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      
      // Check if it's a weekend (closed)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      monthData[key] = {
        status: isWeekend ? 'closed' : 'available',
        bookings: [],
        blocks: [],
      };
    }
    
    setCalendarData(monthData);
  };

  const getDayStatus = (date: Date): CalendarStatus => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.status || 'available';
  };

  const getDayBookings = (date: Date): Booking[] => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.bookings || [];
  };

  const getDayBlocks = (date: Date): CalendarBlock[] => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.blocks || [];
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const formatTime = (time: string): string => {
    return time;
  };

  const getStatusColor = (status: CalendarStatus): string => {
    switch (status) {
      case 'available':
        return colors.success;
      case 'booked':
        return colors.danger;
      case 'partial':
        return colors.warning;
      case 'closed':
        return colors.text.muted;
      case 'blocked':
        return colors.danger;
      case 'space_blocked':
        return colors.warning;
      default:
        return colors.text.muted;
    }
  };

  const getStatusText = (status: CalendarStatus): string => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'booked':
        return 'Booked';
      case 'partial':
        return 'Partial';
      case 'closed':
        return 'Closed';
      case 'blocked':
        return 'Blocked';
      case 'space_blocked':
        return 'Space Blocked';
      default:
        return 'Unknown';
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const status = getDayStatus(date);
      const bookings = getDayBookings(date);
      const blocks = getDayBlocks(date);
      
      return (
        <div className="relative w-full h-full">
          {/* Status indicator */}
          <div 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: getStatusColor(status) }}
          />
          
          {/* Booking count */}
          {bookings.length > 0 && (
            <div className="absolute bottom-1 left-1 text-xs font-medium text-blue-600">
              {bookings.length}
            </div>
          )}
          
          {/* Block indicator */}
          {blocks.length > 0 && (
            <div className="absolute bottom-1 right-1 text-xs font-medium text-red-600">
              ⚠
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const status = getDayStatus(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      
      let className = 'relative';
      
      if (isToday) {
        className += ' bg-blue-100 font-bold';
      }
      
      if (isSelected) {
        className += ' bg-indigo-500 text-white';
      }
      
      if (status === 'closed') {
        className += ' text-gray-400';
      }
      
      return className;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar</h3>
        <p className="text-sm text-gray-600">Select a date to view bookings</p>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-full"
        />
      </div>

      {/* Status Legend */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Status Legend</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Partial</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
            <span>Closed</span>
          </div>
        </div>
      </div>

      {/* Selected Date Info */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium" style={{ color: getStatusColor(getDayStatus(selectedDate)) }}>
              {getStatusText(getDayStatus(selectedDate))}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Bookings:</span>
            <span className="font-medium">{getDayBookings(selectedDate).length}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Blocks:</span>
            <span className="font-medium">{getDayBlocks(selectedDate).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}