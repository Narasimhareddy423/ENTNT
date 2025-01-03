import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getCommunicationsForDay } = useStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
          >
            {day}
          </div>
        ))}

        {days.map(day => {
          const communications = getCommunicationsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] p-2 ${
                !isCurrentMonth
                  ? 'bg-gray-50 text-gray-400'
                  : 'bg-white'
              } ${
                isToday(day) ? 'bg-blue-50' : ''
              }`}
            >
              <div className={`text-right text-sm ${
                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {format(day, 'd')}
              </div>
              
              <div className="mt-2 space-y-1">
                {communications.map((comm, idx) => (
                  <div
                    key={idx}
                    className="text-xs p-1.5 rounded bg-blue-100 text-blue-800"
                  >
                    <div className="font-medium">{comm.company.name}</div>
                    <div>{comm.method.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
