import React, { useState, useRef, useEffect } from "react";

const initialMoves = [
  {
    id: 1,
    product: "Laptop HP EliteBook",
    type: "przyjęcie",
    quantity: 10,
    sourceWarehouse: null,
    targetWarehouse: "Magazyn Warszawa",
    date: "2025-07-01",
  },
  {
    id: 2,
    product: "Smartfon Samsung",
    type: "wydanie",
    quantity: -5,
    sourceWarehouse: "Magazyn Kraków",
    targetWarehouse: null,
    date: "2025-07-02",
  },
  {
    id: 3,
    product: 'Monitor Dell 27"',
    type: "przesunięcie",
    quantity: -3,
    sourceWarehouse: "Magazyn Warszawa",
    targetWarehouse: "Magazyn Gdańsk",
    date: "2025-07-03",
  },
];

export default function StockMovesPage() {
  const [moves, setMoves] = useState(initialMoves);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [editingMove, setEditingMove] = useState(null);
  const [selectedMove, setSelectedMove] = useState(null);

  const modalRef = useRef(null);
  const detailsModalRef = useRef(null);

  const uniqueWarehouses = [
    ...new Set(
      moves.flatMap((m) => [m.sourceWarehouse, m.targetWarehouse]).filter(Boolean)
    ),
  ];

  const filtered = moves.filter((move) => {
    const matchType = !selectedType || move.type === selectedType;
    const matchWarehouse =
      !selectedWarehouse ||
      move.sourceWarehouse === selectedWarehouse ||
      move.targetWarehouse === selectedWarehouse;
    const matchSearch = move.product.toLowerCase().includes(search.toLowerCase());
    return matchType && matchWarehouse && matchSearch;
  });

  const handleEditChange = (field, value) => {
    setEditingMove((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (editingMove.isDuplicate) {
      const newId = Math.max(...moves.map((m) => m.id)) + 1;
      setMoves((prev) => [
        ...prev,
        { ...editingMove, id: newId, isDuplicate: undefined },
      ]);
    } else {
      setMoves((prev) =>
        prev.map((m) => (m.id === editingMove.id ? editingMove : m))
      );
    }
    setEditingMove(null);
  };

  const handleDelete = (id) => {
    setMoves((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDuplicate = (move) => {
    setEditingMove({ ...move, isDuplicate: true });
  };

  // Zamknij modal edycji po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setEditingMove(null);
      }
    };
    if (editingMove) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingMove]);

  // Zamknij modal szczegółów po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutsideDetails = (e) => {
      if (
        selectedMove &&
        detailsModalRef.current &&
        !detailsModalRef.current.contains(e.target)
      ) {
        setSelectedMove(null);
      }
    };
    if (selectedMove) {
      document.addEventListener("mousedown", handleClickOutsideDetails);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDetails);
    };
  }, [selectedMove]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ruchy magazynowe</h1>
          <p className="text-gray-600 text-sm">Historia operacji magazynowych</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          + Nowy ruch
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj produktu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-64"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Wszystkie typy</option>
          <option value="przyjęcie">Przyjęcie</option>
          <option value="wydanie">Wydanie</option>
          <option value="przesunięcie">Przesunięcie</option>
        </select>
        <select
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Wszystkie magazyny</option>
          {uniqueWarehouses.map((w, i) => (
            <option key={i} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Numer</th>
              <th className="text-left px-4 py-3">Produkt</th>
              <th className="text-left px-4 py-3">Typ ruchu</th>
              <th className="text-left px-4 py-3">Ilość</th>
              <th className="text-left px-4 py-3">Magazyn źródłowy</th>
              <th className="text-left px-4 py-3">Magazyn docelowy</th>
              <th className="text-left px-4 py-3">Data</th>
              <th className="text-left px-4 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((move, idx) => (
              <tr key={move.id} className="border-t">
                <td
                  className="px-4 py-3 text-primary font-semibold cursor-pointer hover:underline"
                  onClick={() => setSelectedMove(move)}
                >
                  MOV-{String(idx).padStart(3, "0")}
                </td>
                <td className="px-4 py-3">{move.product}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      move.type === "przyjęcie"
                        ? "bg-green-100 text-green-800"
                        : move.type === "wydanie"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {move.type}
                  </span>
                </td>
                <td className="px-4 py-3">{move.quantity}</td>
                <td className="px-4 py-3">{move.sourceWarehouse || "-"}</td>
                <td className="px-4 py-3">{move.targetWarehouse || "-"}</td>
                <td className="px-4 py-3">{move.date}</td>
                <td className="px-4 py-3 flex gap-1">
                  <button
                    onClick={() => setEditingMove(move)}
                    className="text-gray-700 hover:underline"
                  >
                    Edytuj
                  </button>
                  /
                  <button
                    onClick={() => handleDuplicate(move)}
                    className="text-blue-600 hover:underline"
                  >
                    Duplikuj
                  </button>
                  /
                  <button
                    onClick={() => handleDelete(move.id)}
                    className="text-red-600 hover:underline"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-6">
                  Brak wyników
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingMove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-md w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              {editingMove.isDuplicate ? "Duplikuj" : "Edytuj"} ruch magazynowy
            </h2>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingMove.product}
              onChange={(e) => handleEditChange("product", e.target.value)}
              placeholder="Produkt"
            />

            <select
              className="w-full border px-3 py-2 rounded"
              value={editingMove.type}
              onChange={(e) => handleEditChange("type", e.target.value)}
            >
              <option value="przyjęcie">Przyjęcie</option>
              <option value="wydanie">Wydanie</option>
              <option value="przesunięcie">Przesunięcie</option>
            </select>

            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={editingMove.quantity}
              onChange={(e) => handleEditChange("quantity", parseInt(e.target.value))}
              placeholder="Ilość"
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingMove.sourceWarehouse || ""}
              onChange={(e) => handleEditChange("sourceWarehouse", e.target.value)}
              placeholder="Magazyn źródłowy"
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingMove.targetWarehouse || ""}
              onChange={(e) => handleEditChange("targetWarehouse", e.target.value)}
              placeholder="Magazyn docelowy"
            />

            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={editingMove.date}
              onChange={(e) => handleEditChange("date", e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setEditingMove(null)}
              >
                Anuluj
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={saveEdit}
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedMove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={detailsModalRef}
            className="bg-white p-6 rounded-md w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-semibold">Szczegóły ruchu magazynowego</h2>
            <div><strong>Produkt:</strong> {selectedMove.product}</div>
            <div><strong>Typ:</strong> {selectedMove.type}</div>
            <div><strong>Ilość:</strong> {selectedMove.quantity}</div>
            <div><strong>Magazyn źródłowy:</strong> {selectedMove.sourceWarehouse || "-"}</div>
            <div><strong>Magazyn docelowy:</strong> {selectedMove.targetWarehouse || "-"}</div>
            <div><strong>Data:</strong> {selectedMove.date}</div>
            <div className="flex justify-end pt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setSelectedMove(null)}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
