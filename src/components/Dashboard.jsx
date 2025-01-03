import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CompanyTable } from './dashboard/CompanyTable';
import { CommunicationModal } from './dashboard/CommunicationModal';
import { NotificationPanel } from './dashboard/NotificationPanel';
import { CalendarView } from './dashboard/CalendarView';
import { Bell, List, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const { companies, getOverdueCommunications, getTodayCommunications } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [view, setView] = useState('table');

  const overdueTasks = getOverdueCommunications();
  const todayTasks = getTodayCommunications();
  const notificationCount = overdueTasks.length + todayTasks.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                view === 'table'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4 inline-block sm:mr-2" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b -ml-px ${
                view === 'calendar'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4 inline-block sm:mr-2" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowModal(true)}
            disabled={selectedCompanies.length === 0}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Communication Performed
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
            >
              <span className="sr-only">Notifications</span>
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationPanel
                overdueTasks={overdueTasks}
                todayTasks={todayTasks}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {view === 'table' ? (
          <CompanyTable
            companies={companies}
            selectedCompanies={selectedCompanies}
            onSelectCompany={(companyId) => {
              setSelectedCompanies((prev) =>
                prev.includes(companyId)
                  ? prev.filter((id) => id !== companyId)
                  : [...prev, companyId]
              );
            }}
          />
        ) : (
          <CalendarView />
        )}
      </div>

      {showModal && (
        <CommunicationModal
          companies={selectedCompanies.map((id) => companies.find((c) => c.id === id))}
          onClose={() => {
            setShowModal(false);
            setSelectedCompanies([]);
          }}
        />
      )}
    </div>
  );
};
