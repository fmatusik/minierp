import React from "react";
import { User } from "lucide-react";

const dummyClients = [
  {
    id: 1,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    phone: "+48 123 456 789",
    status: "Aktywny",
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@example.com",
    phone: "+48 987 654 321",
    status: "Nieaktywny",
  },
  {
    id: 3,
    firstName: "Marek",
    lastName: "Wiśniewski",
    email: "marek.w@example.com",
    phone: "+48 555 123 456",
    status: "Aktywny",
  },
];

export default function KlienciPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Klienci</h1>
          <p className="text-gray-600 text-sm">Lista zarejestrowanych klientów</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">+ Nowy klient</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyClients.map((client) => (
          <div
            key={client.id}
            className="rounded-lg border shadow-sm p-4 hover:shadow-md transition flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-2 rounded-full">
                <User size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-xs text-gray-500">{client.status}</p>
              </div>
            </div>
            <div className="text-sm mt-2">
              <p className="text-gray-800">{client.email}</p>
              <p className="text-gray-600">{client.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
