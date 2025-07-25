'use client';

import { useState } from 'react';
// @ts-ignore
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Status = 'fully_booked' | 'closed' | 'available' | 'partial';

type Event = {
  title: string;
  time: string;
  status: Status;
};

type DayData = {
  status: Status;
  events: Event[];
};

const statusLabels: Record<Status, string> = {
  fully_booked: 'Fully Booked',
  closed: 'Venue Closed',
  available: 'Fully Available',
  partial: 'Partially Available',
};

const COLORS = {
  fully_booked: '#b0b0b0', // medium grey
  closed: 'repeating-linear-gradient(135deg, #222 0px, #222 6px, #fff 6px, #fff 12px)', // striped
  available: '#d4f8e8', // soft green
  partial: '#fffbe6', // soft yellow
  partialBorder: '#b59f00',
};

function generateRandomCalendarData(): Record<string, DayData> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: Record<string, DayData> = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday
    
    let status: Status = 'available';
    let events: Event[] = [];
    
    // Tuesday and Wednesday are closed
    if (dayOfWeek === 2 || dayOfWeek === 3) {
      status = 'closed';
    }
    // Example: 15th is fully booked
    else if (day === 15) {
      status = 'fully_booked';
      events = [
        { title: 'Wedding Reception', time: 'All Day', status },
        { title: 'Setup', time: '8:00 AM', status },
      ];
    }
    // Example: 20th is partially available
    else if (day === 20) {
      status = 'partial';
      events = [
        { title: 'Morning Yoga', time: '8:00 AM', status },
      ];
    }
    // Example: 25th is fully booked
    else if (day === 25) {
      status = 'fully_booked';
      events = [
        { title: 'Corporate Event', time: '6PM - 11PM', status },
      ];
    }
    
    data[key] = { status, events };
  }
  return data;
}

const sampleCalendarData = generateRandomCalendarData();

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function CalendarSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dayData = sampleCalendarData[formatDate(selectedDate)];
  const status = dayData?.status || 'available';
  const events = dayData?.events || [];

  return (
    <div style={{
      width: 280,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 16px rgba(31,38,135,0.08)',
      padding: '24px 16px 16px 16px',
      marginRight: 32,
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12, color: '#6a82fb' }}>Calendar</h3>
      <Calendar
        // @ts-ignore
        onChange={(date: any) => setSelectedDate(Array.isArray(date) ? date[0] : date)}
        value={selectedDate}
        // @ts-ignore
        tileClassName={({ date, view }: any) => {
          if (view !== 'month') return '';
          const day = sampleCalendarData[formatDate(date)];
          if (!day) return 'cal-available';
          switch (day.status) {
            case 'fully_booked': return 'cal-fully-booked';
            case 'closed': return 'cal-closed';
            case 'available': return 'cal-available';
            case 'partial': return 'cal-partial';
            default: return '';
          }
        }}
      />
      <style>{`
        .react-calendar,
        .react-calendar *,
        .react-calendar button {
          color: #222 !important;
          font-weight: bold !important;
        }
        .react-calendar__tile,
        .react-calendar__tile abbr,
        .react-calendar__tile button {
          font-weight: bold !important;
        }
        .cal-fully-booked,
        .cal-closed,
        .cal-available,
        .cal-partial {
          position: relative;
          background: none !important;
          border-radius: 0 !important;
          color: inherit !important;
          font-weight: bold !important;
        }
        .cal-fully-booked::before,
        .cal-closed::before,
        .cal-available::before,
        .cal-partial::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          z-index: 0;
          opacity: 0.7;
        }
        .cal-fully-booked::before {
          background: #b0b0b0;
        }
        .cal-closed::before {
          background: repeating-linear-gradient(135deg, #222 0px, #222 6px, #fff 6px, #fff 12px);
        }
        .cal-available::before {
          background: #d4f8e8;
        }
        .cal-partial::before {
          background: #fffbe6;
          border: 1.5px solid #b59f00;
        }
        .react-calendar__tile--active {
          box-shadow: 0 0 0 2px #6a82fb !important;
        }
      `}</style>
      <div style={{ marginTop: 24, width: '100%' }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#444' }}>
          {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
        <div style={{
          marginBottom: 10,
          fontWeight: 500,
          color:
            status === 'fully_booked' ? COLORS.fully_booked
            : status === 'closed' ? '#222'
            : status === 'available' ? '#1a7f5a'
            : COLORS.partialBorder,
        }}>
          {statusLabels[status]}
        </div>
        {events.length === 0 ? (
          <div style={{ color: '#aaa', fontSize: 15 }}>No events for this day.</div>
        ) : (
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {events.map((ev, i) => (
              <li key={i} style={{
                background:
                  ev.status === 'fully_booked'
                    ? `linear-gradient(90deg, ${COLORS.fully_booked} 0%, #d3d3d3 100%)`
                    : ev.status === 'partial'
                    ? 'linear-gradient(90deg, #fffbe6 0%, #ffe066 100%)'
                    : 'linear-gradient(90deg, #d4f8e8 0%, #a8e6cf 100%)',
                borderRadius: 8,
                padding: '8px 12px',
                marginBottom: 8,
                color: ev.status === 'fully_booked' ? '#fff' : ev.status === 'partial' ? COLORS.partialBorder : '#1a7f5a',
                fontSize: 15,
              }}>
                <b>{ev.title}</b>
                <div style={{ fontSize: 14, marginTop: 2 }}>{ev.time}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Legend */}
      <div style={{
        marginTop: 24,
        width: '100%',
        color: '#222',
        fontWeight: 500,
        fontSize: 15,
      }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: '#444' }}>Legend:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: COLORS.fully_booked,
              borderRadius: '50%',
              marginRight: 6,
              verticalAlign: 'middle',
              border: '1.5px solid #888'
            }} />
            <span style={{ color: COLORS.fully_booked }}>Fully Booked</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: COLORS.closed,
              borderRadius: '50%',
              marginRight: 6,
              verticalAlign: 'middle',
              border: '1.5px solid #888'
            }} />
            <span style={{ color: '#222' }}>Venue Closed</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: COLORS.available,
              borderRadius: '50%',
              marginRight: 6,
              verticalAlign: 'middle',
              border: '1.5px solid #1a7f5a'
            }} />
            <span style={{ color: '#1a7f5a' }}>Fully Available</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: COLORS.partial,
              borderRadius: '50%',
              marginRight: 6,
              verticalAlign: 'middle',
              border: `1.5px solid ${COLORS.partialBorder}`
            }} />
            <span style={{ color: COLORS.partialBorder }}>Partially Available</span>
          </span>
        </div>
      </div>
    </div>
  );
}