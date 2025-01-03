import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AdminModule } from './components/AdminModule';
import { AnalyticsModule } from './components/analytics/AnalyticsModule';
import { LayoutGrid, Users, BarChart } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xl font-bold text-gray-900 focus:outline-none"
                >
                  CommTracker
                </button>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex sm:space-x-8 ml-6">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`${
                    activeTab === 'admin'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Admin
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="dashboard">Dashboard</option>
                <option value="admin">Admin</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'admin' && <AdminModule />}
        {activeTab === 'analytics' && <AnalyticsModule />}
      </main>
    </div>
  );
}

export default App;
