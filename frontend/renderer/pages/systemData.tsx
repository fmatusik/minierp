import React, { useState } from "react";

type LogEntry = {
  id: number;
  entityType: string;
  entityId: number;
  action: "create" | "update" | "delete";
  user: string;
  timestamp: string;
  deleted?: boolean; // Dla uproszczenia w mocku
};

const mockLogs: LogEntry[] = [
  { id: 1, entityType: "Produkt", entityId: 101, action: "create", user: "admin", timestamp: "2025-07-01 10:00" },
  { id: 2, entityType: "Klient", entityId: 55, action: "update", user: "jan.k", timestamp: "2025-07-02 11:30" },
  { id: 3, entityType: "Zamówienie", entityId: 22, action: "delete", user: "admin", timestamp: "2025-07-03 09:15", deleted: true },
  { id: 4, entityType: "Magazyn", entityId: 7, action: "delete", user: "ania", timestamp: "2025-07-03 12:00", deleted: true },
];

export default function SystemLogsPage() {
  const [tab, setTab] = useState<"logs" | "trash">("logs");

  const activeLogs = mockLogs.filter(log => !log.deleted);
  const deletedLogs = mockLogs.filter(log => log.deleted);

  const renderTable = (logs: LogEntry[], isTrash = false) => (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-4 py-3">Typ</th>
            <th className="text-left px-4 py-3">ID</th>
            <th className="text-left px-4 py-3">Akcja</th>
            <th className="text-left px-4 py-3">Użytkownik</th>
            <th className="text-left px-4 py-3">Data</th>
            <th className="text-left px-4 py-3">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-3">{log.entityType}</td>
              <td className="px-4 py-3">{log.entityId}</td>
              <td className="px-4 py-3 capitalize">{log.action}</td>
              <td className="px-4 py-3">{log.user}</td>
              <td className="px-4 py-3">{log.timestamp}</td>
              <td className="px-4 py-3 space-x-2">
                {isTrash ? (
                  <>
                    <button className="text-blue-600 hover:underline text-xs">Przywróć</button>
                    <button className="text-red-600 hover:underline text-xs">Usuń trwale</button>
                  </>
                ) : (
                  log.action === "delete" && (
                    <button className="text-gray-600 hover:underline text-xs">Przenieś do kosza</button>
                  )
                )}
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-6">
                Brak logów
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dane systemowe</h1>
          <p className="text-gray-600 text-sm">Logi systemowe i działania użytkowników</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setTab("logs")}
          className={`text-sm pb-1 border-b-2 ${
            tab === "logs" ? "border-black font-medium" : "border-transparent"
          }`}
        >
          Ostatnie działania
        </button>
        <button
          onClick={() => setTab("trash")}
          className={`text-sm pb-1 border-b-2 ${
            tab === "trash" ? "border-black font-medium" : "border-transparent"
          }`}
        >
          Kosz
        </button>
      </div>

      {/* Tabela */}
      {tab === "logs" ? renderTable(activeLogs) : renderTable(deletedLogs, true)}
    </div>
  );
}
