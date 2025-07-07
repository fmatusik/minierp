import React, { useState } from "react";

const dummyStock = [
  {
    id: 1,
    product: "Laptop HP EliteBook",
    warehouse: "Magazyn Warszawa",
    quantity: 12,
    min: 5,
  },
  {
    id: 2,
    product: "Smartfon Samsung Galaxy",
    warehouse: "Magazyn Kraków",
    quantity: 3,
    min: 10,
  },
  {
    id: 3,
    product: "Monitor Dell 27\"",
    warehouse: "Magazyn Warszawa",
    quantity: 8,
    min: 8,
  },
  {
    id: 4,
    product: "Słuchawki Bose 700",
    warehouse: "Magazyn Gdańsk",
    quantity: 0,
    min: 2,
  },
];

const uniqueWarehouses = [...new Set(dummyStock.map((s) => s.warehouse))];

export default function StockLevelsPage() {
  const [search, setSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const filtered = dummyStock.filter((item) => {
    const matchWarehouse =
      !selectedWarehouse || item.warehouse === selectedWarehouse;
    const matchSearch = item.product.toLowerCase().includes(search.toLowerCase());
    return matchWarehouse && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stany magazynowe</h1>
          <p className="text-gray-600 text-sm">
            Kontroluj aktualne ilości produktów w magazynach
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Zarządzaj stanem
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
              <th className="text-left px-4 py-3">Magazyn</th>
              <th className="text-left px-4 py-3">Ilość</th>
              <th className="text-left px-4 py-3">Minimalny stan</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isLow = item.quantity < item.min;
              return (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.product}</td>
                  <td className="px-4 py-3">{item.warehouse}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.min}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        isLow
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {isLow ? "Niski stan" : "OK"}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
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
