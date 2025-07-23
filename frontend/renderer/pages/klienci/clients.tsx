import React, { useState, useRef, useEffect } from "react";
import { User, RefreshCcw } from "lucide-react";
import axios from "axios";

export default function KlienciPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [clients, setClients] = useState([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const loadClients = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/api/client/all`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Failed to load clients:", error);
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

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

  const filteredAndSortedClients = clients
    .filter((client) => {
      const fullName = `${client.name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") {
        return `${a.name}`.localeCompare(`${b.name}`);
      } else if (sortOption === "name-desc") {
        return `${b.name}`.localeCompare(`${a.name}`);
      } else if (sortOption === "date-asc") {
        return new Date(a.data.createdAt).getTime() - new Date(b.data.createdAt).getTime();
      } else {
        // default to date-desc
        return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime();
      }
    });

    const handleUserDelete = async (clientId) => {
      const confirm = await window.ipc.invoke("show-confirm", "Czy napewno chcesz usunąć tego kontrahenta?")
      if(!confirm) return;
      
      axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/client/delete/${clientId}`)
      .then((res) =>{
        console.log(res.data);
        loadClients();
      }
      ).catch((err) => {
        alert(err);
      })
    }

    const handleReload = () => {
      loadClients();
      setSortOption("date-desc")
      setSearchTerm("")
    }

  const openAddPanel = () => {
    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbar=yes`;

    window.open("/klienci/add", "_blank", features);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Klienci</h1>
          <p className="text-gray-600 text-sm">Lista zarejestrowanych klientów</p>
        </div>
        <button
         onClick={openAddPanel}
         className="px-4 py-2 bg-black text-white rounded-md">+ Nowy klient</button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj..."
          className="px-3 py-2 border rounded-md w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded-md"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-desc">Data dodania (najnowsze)</option>
          <option value="date-asc">Data dodania (najstarsze)</option>
          <option value="name-asc">Nazwa A-Z</option>
          <option value="name-desc">Nazwa Z-A</option>
        </select>
                          <button
          onClick={() => handleReload()}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
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
                  {client.name}
                </h3>
              </div>
            </div>
            <div className="text-sm mt-2">
              {client.clientContactsDto?.length > 0 && (
                <>
                  <p className="text-gray-800">{client.clientContactsDto[0].email}</p>
                  <p className="text-gray-600">{client.clientContactsDto[0].phoneNumber}</p>
                </>
              )}
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
              Informacje o kliencie: {selectedClient.name}
            </h2>




              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Dane kontaktowe</h3>
                <table className="min-w-full text-sm border rounded-md overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Osoba</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Telefon</th>
                      <th className="px-4 py-2 text-left">Stanowisko</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClient.clientContactsDto.map((contact, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{contact.firstName} {contact.lastName}</td>
                        <td className="px-4 py-2">{contact.email}</td>
                        <td className="px-4 py-2">{contact.phoneNumber}</td>
                        <td className="px-4 py-2">{contact.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

                            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Adresy</h3>
                <table className="min-w-full text-sm border rounded-md overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Ulica</th>
                      <th className="px-4 py-2 text-left">Numer budynku</th>
                      <th className="px-4 py-2 text-left">Numer mieszkania</th>
                      <th className="px-4 py-2 text-left">Miasto</th>
                      <th className="px-4 py-2 text-left">Kod pocztowy</th>
                      <th className="px-4 py-2 text-left">Województwo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClient.addressesDto.map((address, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{address.street || "-"}</td>
                        <td className="px-4 py-2">{address.buildingNumber || "-"}</td>
                        <td className="px-4 py-2">{address.apartmentNumber || "-"}</td>
                        <td className="px-4 py-2">{address.city || "-"}</td>
                        <td className="px-4 py-2">{address.postalCode || "-"}</td>
                        <td className="px-4 py-2">{address.province || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleUserDelete(selectedClient.id)}
                className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-all font-medium">
                  Usuń
                </button>
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
