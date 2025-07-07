import React from "react";

const statuses = [
  { id: 1, name: "Nowe", type: "Zamówienie", color: "bg-blue-500" },
  { id: 2, name: "W realizacji", type: "Zamówienie", color: "bg-yellow-500" },
  { id: 3, name: "Zrealizowane", type: "Zamówienie", color: "bg-green-500" },
  { id: 4, name: "Niedostępny", type: "Produkt", color: "bg-red-500" },
  { id: 5, name: "Oczekuje na dostawę", type: "Produkt", color: "bg-purple-500" },
];

export default function StatusesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Statusy</h1>
          <p className="text-gray-600 text-sm">Zarządzaj statusami w systemie</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          + Dodaj status
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Nazwa</th>
              <th className="text-left px-4 py-3">Typ</th>
              <th className="text-left px-4 py-3">Kolor</th>
              <th className="text-left px-4 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block w-4 h-4 rounded-full ${s.color}`}
                    title={s.color}
                  ></span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline text-xs">Edytuj</button>
                  <button className="text-red-600 hover:underline text-xs">Usuń</button>
                </td>
              </tr>
            ))}
            {statuses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  Brak zdefiniowanych statusów
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
