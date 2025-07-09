import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";

const dummyClients = [
  {
    id: 1,
    firstName: "XYZ",
    lastName: "S.A",
    email: "jan.kowalski@example.com",
    phone: "+48 123 456 789",
    status: "Aktywny",
    createdAt: "2024-12-01",
    companyContacts: [
      { name: "Kontakt 1", email: "kontakt1@firma.com", phone: "+48 111 222 333" },
      { name: "Kontakt 2", email: "kontakt2@firma.com", phone: "+48 444 555 666" },
    ],
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@example.com",
    phone: "+48 987 654 321",
    status: "Nieaktywny",
    createdAt: "2024-11-10",
    companyContacts: [],
  },
  {
    id: 3,
    firstName: "Marek",
    lastName: "Wiśniewski",
    email: "marek.w@example.com",
    phone: "+48 555 123 456",
    status: "Aktywny",
    createdAt: "2025-01-15",
    companyContacts: [
      { name: "Dział IT", email: "it@firma.com", phone: "+48 999 000 111" },
    ],
  },
];

export default function KlienciPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const modalRef =  useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedClient(null);
      }
    }

    if (selectedClient) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedClient]);

  const filteredAndSortedClients = dummyClients
    .filter((client) => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      } else if (sortOption === "name-desc") {
        return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
      } else if (sortOption === "date-asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        // default to date-desc
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

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

      {/* Search & Sort Controls */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj..."
          className="px-3 py-2 border rounded-md w-full sm:w-64 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded-md outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-desc">Data dodania (najnowsze)</option>
          <option value="date-asc">Data dodania (najstarsze)</option>
          <option value="name-asc">Nazwa A-Z</option>
          <option value="name-desc">Nazwa Z-A</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAndSortedClients.map((client) => (
          <div
            key={client.id}
            className="rounded-lg border shadow-sm p-4 hover:shadow-md transition flex flex-col gap-2 cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-2 rounded-full">
                <User size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {client.firstName} {client.lastName}
                </h3>
              </div>
            </div>
            <div className="text-sm mt-2">
              <p className="text-gray-800">{client.email}</p>
              <p className="text-gray-600">{client.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative space-y-8 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold border-b pb-2">
              Informacje o kliencie: {selectedClient.firstName} {selectedClient.lastName}
            </h2>

            {/* Sekcja: Dane kontaktowe */}
            <div className="space-y-2 text-sm">
              <h3 className="text-lg font-semibold text-gray-800">Dane kontaktowe</h3>
              <table className="min-w-full text-sm border rounded-md overflow-hidden">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium bg-gray-50 w-1/3">Email</td>
                    <td className="px-4 py-2">{selectedClient.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium bg-gray-50">Telefon</td>
                    <td className="px-4 py-2">{selectedClient.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium bg-gray-50">Status</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                          selectedClient.status === "Aktywny"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedClient.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sekcja: Kontakty firmowe */}
            {selectedClient.companyContacts?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Dodatkowe kontakty (firma)</h3>
                <table className="min-w-full text-sm border rounded-md overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Imię/Nazwa</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Telefon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClient.companyContacts.map((contact, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{contact.name}</td>
                        <td className="px-4 py-2">{contact.email}</td>
                        <td className="px-4 py-2">{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  window.open(`/klienci/client-edit?id=${selectedClient.id}`, "_blank", "width=800,height=700")
                }
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primaryhover transition-all font-medium"
              >
                Edytuj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
