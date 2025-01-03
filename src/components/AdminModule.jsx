import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus } from 'lucide-react';
import { CompanyForm } from './admin/CompanyForm';
import { CompanyList } from './admin/CompanyList';
import { CommunicationMethodList } from './admin/CommunicationMethodList';

export const AdminModule = () => {
  const {
    companies,
    communicationMethods,
    addCompany,
    updateCompany,
    deleteCompany,
    updateCommunicationMethod,
  } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState({});
  const [activeTab, setActiveTab] = useState('companies');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingCompany.name) return;

    const company = {
      id: editingCompany.id || crypto.randomUUID(),
      name: editingCompany.name,
      location: editingCompany.location || '',
      linkedinProfile: editingCompany.linkedinProfile || '',
      emails: editingCompany.emails || [],
      phoneNumbers: editingCompany.phoneNumbers || [],
      comments: editingCompany.comments || '',
      communicationPeriodicity: editingCompany.communicationPeriodicity || 14,
    };

    if (isEditing) {
      updateCompany(company);
    } else {
      addCompany(company);
    }

    setEditingCompany({});
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateSequence = (methodId, newSequence) => {
    const method = communicationMethods.find(m => m.id === methodId);
    if (!method) return;

    const affectedMethod = communicationMethods.find(m => m.sequence === newSequence);
    if (!affectedMethod) return;

    updateCommunicationMethod({ ...method, sequence: newSequence });
    updateCommunicationMethod({ ...affectedMethod, sequence: method.sequence });
  };

  const handleToggleMandatory = (methodId) => {
    const method = communicationMethods.find(m => m.id === methodId);
    if (!method) return;

    updateCommunicationMethod({ ...method, isMandatory: !method.isMandatory });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        {/* Tabs for larger screens */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('companies')}
                className={`${
                  activeTab === 'companies'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab('methods')}
                className={`${
                  activeTab === 'methods'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                Communication Methods
              </button>
            </nav>
          </div>
        </div>

        {/* Tabs for smaller screens */}
        <div className="sm:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="companies">Companies</option>
            <option value="methods">Communication Methods</option>
          </select>
        </div>
      </div>

      {activeTab === 'companies' && (
        <div className="space-y-6">
          {!showForm && (
            <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Company Management</h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCompany({});
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Company
              </button>
            </div>
          )}

          {showForm ? (
            <CompanyForm
              company={editingCompany}
              setCompany={setEditingCompany}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingCompany({});
                setIsEditing(false);
              }}
              isEditing={isEditing}
            />
          ) : (
            <CompanyList
              companies={companies}
              onEdit={handleEdit}
              onDelete={deleteCompany}
            />
          )}
        </div>
      )}

      {activeTab === 'methods' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Communication Methods</h2>
          <CommunicationMethodList
            methods={communicationMethods}
            onUpdateSequence={handleUpdateSequence}
            onToggleMandatory={handleToggleMandatory}
          />
        </div>
      )}
    </div>
  );
};
