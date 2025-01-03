import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const CommunicationMethodList = ({
  methods,
  onUpdateSequence,
  onToggleMandatory,
}) => {
  const sortedMethods = [...methods].sort((a, b) => a.sequence - b.sequence);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sequence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mandatory
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reorder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMethods.map((method, index) => (
              <tr key={method.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {method.sequence}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{method.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{method.description}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onToggleMandatory(method.id)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        method.isMandatory ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          method.isMandatory ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {index > 0 && (
                    <button
                      onClick={() => onUpdateSequence(method.id, method.sequence - 1)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  )}
                  {index < methods.length - 1 && (
                    <button
                      onClick={() => onUpdateSequence(method.id, method.sequence + 1)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
