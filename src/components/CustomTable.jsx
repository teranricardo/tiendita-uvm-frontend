import React from 'react';

export default function CustomTable({ columns, data, actions, loading }) {
  // Función para acceder a propiedades anidadas
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
  };

  return (
    <div className="min-w-full bg-white rounded-lg overflow-x-auto shadow-md">
      {loading ? (
        <div className="p-4 text-center">Cargando...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-greenDark text-white text-left text-xs md:text-sm leading-normal">
              {columns.map((column) => (
                <th key={column.accessor} className="py-2 px-4 md:py-3 md:px-6">
                  {column.header}
                </th>
              ))}
              {actions && <th className="py-2 px-4 md:py-3 md:px-6 text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs md:text-sm">
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.accessor} className="py-2 px-4 md:py-3 md:px-6">
                    {getNestedValue(item, column.accessor)}
                  </td>
                ))}
                {actions && (
                  <td className="py-2 px-4 md:py-3 md:px-6 text-center flex space-x-2 justify-center">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(item)}
                        className={`text-${action.color}-500 hover:text-${action.color}-700`}
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}