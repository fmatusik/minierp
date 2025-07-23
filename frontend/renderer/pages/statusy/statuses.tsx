import React, { useEffect, useRef, useState } from "react";
import ColorPicker from "../../components/ColorPicker";
import axios from "axios";
import { RefreshCcw } from "lucide-react";

export default function StatusesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [allStatuses, setAllStatuses] = useState([]);
  const [editedStatus, setEditedStatus] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const editModalRef = useRef(null);

  // Fetch statuses from API
  const fetchStatuses = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/status/all`);
      setAllStatuses(res.data);
    } catch (error) {
      console.error("Failed to fetch statuses", error);
      // Optionally show some error UI here
    }
  };

  const handleReload = () => {
    fetchStatuses();
  }

  const types = [
    { label: "Zamówienie", value: "ORDER" },
    { label: "Produkt", value: "PRODUCT" },
  ];

  useEffect(() => {
    fetchStatuses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showEditModal &&
        editModalRef.current &&
        !editModalRef.current.contains(e.target)
      ) {
        setShowEditModal(false);
        setEditedStatus(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEditModal]);

  const handleEditClick = (status) => {
    setEditedStatus(status);
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setEditedStatus((prev) => ({ ...prev, [field]: value }));
  };

const handleSaveEdit = async () => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/status/edit/${editedStatus.id}`, editedStatus);
    fetchStatuses(); // reload whole list, which will include the updated status
    setShowEditModal(false);
    setEditedStatus(null);
  } catch (err) {
    console.log(err);
  }
};


const handleDelete = async (id) => {
  try {
    const confirmed = await window.ipc.invoke("show-confirm", "Czy na pewno chcesz usunąć ten status?");
    if (!confirmed) return;

    const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/status/delete/${id}`);
    window.ipc.invoke("show-alert", res.data);
    fetchStatuses();
  } catch (err) {
    console.error("Błąd przy usuwaniu", err);

  }
};


  const filteredStatuses = allStatuses.filter((status) => {
    const matchesSearch = status.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || status.type === filterType;
    return matchesSearch && matchesType;
  });

  const openAdd = () => {
    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    window.open(`/statusy/add`, "_blank", features);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Statusy</h1>
          <p className="text-gray-600 text-sm">Zarządzaj statusami w systemie</p>
        </div>
        <button
          className="px-4 py-2 bg-black text-white rounded-md"
          onClick={openAdd}
        >
          + Dodaj status
        </button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-64"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Wszystkie typy</option>
            {types.map((type, index) => (
              <option key={index} value={type.value}>{type.label}</option>
            ))}
        </select>

                <button
          onClick={handleReload}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
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
            {filteredStatuses.map((s) => (
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
                  <button
                    onClick={() => handleEditClick(s)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
            {filteredStatuses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  Brak pasujących statusów
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showEditModal && editedStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            ref={editModalRef}
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Edytuj status</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nazwa</label>
                <input
                  type="text"
                  value={editedStatus.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Typ</label>
                <select
                  value={editedStatus.type}
                  onChange={(e) => handleEditChange("type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {types.map((type, index) => (
                    <option key={index} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Kolor</label>
                <ColorPicker
                  selectedColor={editedStatus.color}
                  onSelect={(color) => handleEditChange("color", color)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition-all"
              >
                Anuluj
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-primary hover:bg-primaryhover font-medium transition-all text-white rounded-md"
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
