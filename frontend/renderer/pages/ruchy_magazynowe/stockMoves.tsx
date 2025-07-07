import React, { useState } from "react";

const dummyMoves = [
  {
    id: 1,
    product: "Laptop HP EliteBook",
    type: "przyjęcie",
    quantity: 10,
    warehouseFrom: null,
    warehouseTo: "Magazyn Warszawa",
    date: "2025-07-01",
  },
  {
    id: 2,
    product: "Smartfon Samsung",
    type: "wydanie",
    quantity: -5,
    warehouseFrom: "Magazyn Kraków",
    warehouseTo: null,
    date: "2025-07-02",
  },
  {
    id: 3,
    product: "Monitor Dell 27\"",
    type: "przesunięcie",
    quantity: -3,
    warehouseFrom: "Magazyn Warszawa",
    warehouseTo: "Magazyn Gdańsk",
    date: "2025-07-03",
  },
];

const uniqueWarehouses = [
  ...new Set(
    dummyMoves.flatMap((m) => [m.warehouseFrom, m.warehouseTo]).filter(Boolean)
  ),
];

export default function StockMovesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const filtered = dummyMoves.filter((move) => {
    const matchType = !selectedType || move.type === selectedType;
    const matchWarehouse =
      !selectedWarehouse ||
      move.warehouseFrom === selectedWarehouse ||
      move.warehouseTo === selectedWarehouse;
    const matchSearch = move.product.toLowerCase().includes(search.toLowerCase());
    return matchType && matchWarehouse && matchSearch;
  });

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
              <th className="text-left px-4 py-3">Produkt</th>
              <th className="text-left px-4 py-3">Typ ruchu</th>
              <th className="text-left px-4 py-3">Ilość</th>
              <th className="text-left px-4 py-3">Magazyn źródłowy</th>
              <th className="text-left px-4 py-3">Magazyn docelowy</th>
              <th className="text-left px-4 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((move) => (
              <tr key={move.id} className="border-t">
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
                <td className="px-4 py-3">{move.warehouseFrom || "-"}</td>
                <td className="px-4 py-3">{move.warehouseTo || "-"}</td>
                <td className="px-4 py-3">{move.date}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  Brak wyników
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
