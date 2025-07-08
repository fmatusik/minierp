import React, { useState } from "react";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

const dummyStock = [
  { id: 1, product: "Laptop HP EliteBook", warehouse: "Magazyn Warszawa", quantity: 12, min: 5 },
  { id: 2, product: "Smartfon Samsung Galaxy", warehouse: "Magazyn Kraków", quantity: 3, min: 10 },
  { id: 3, product: "Monitor Dell 27\"", warehouse: "Magazyn Warszawa", quantity: 8, min: 8 },
  { id: 4, product: "Słuchawki Bose 700", warehouse: "Magazyn Gdańsk", quantity: 0, min: 2 },
];

const uniqueWarehouses = [...new Set(dummyStock.map((s) => s.warehouse))];

export default function StockLevelsPage() {
  const [search, setSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [stock, setStock] = useState(dummyStock);
  const [editingQuantities, setEditingQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        const newDirection =
          prev.direction === "asc" ? "desc" : prev.direction === "desc" ? null : "asc";
        return { key: newDirection ? key : null, direction: newDirection };
      }
      return { key, direction: "asc" };
    });
  };

  const sorted = [...stock].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  const filtered = sorted.filter((item) => {
    const matchWarehouse = !selectedWarehouse || item.warehouse === selectedWarehouse;
    const matchSearch = item.product.toLowerCase().includes(search.toLowerCase());
    return matchWarehouse && matchSearch;
  });

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(0, Number(value));
    setEditingQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const applyQuantityChange = (id) => {
    if (editingQuantities[id] === undefined) return;

    setStock((prevStock) =>
      prevStock.map((item) =>
        item.id === id ? { ...item, quantity: editingQuantities[id] } : item
      )
    );

    const updatedItem = stock.find((item) => item.id === id);
    if (updatedItem) {
      const newQty = editingQuantities[id];
      if (newQty < updatedItem.min) {
        setAlertMessage(`Uwaga! Produkt "${updatedItem.product}" ma niski stan.`);
      } else {
        setAlertMessage(`Produkt "${updatedItem.product}" zaktualizowany poprawnie.`);
      }
    }

    setEditingQuantities((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    setTimeout(() => setAlertMessage(null), 3000);
  };

  const incrementQuantity = (id) => {
    const current = editingQuantities[id] ?? stock.find((item) => item.id === id)?.quantity ?? 0;
    handleQuantityChange(id, current + 1);
  };

  const decrementQuantity = (id) => {
    const current = editingQuantities[id] ?? stock.find((item) => item.id === id)?.quantity ?? 0;
    handleQuantityChange(id, current - 1);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="inline w-4 h-4 ml-1" />;
    if (sortConfig.direction === "asc") return <ArrowUp className="inline w-4 h-4 ml-1" />;
    if (sortConfig.direction === "desc") return <ArrowDown className="inline w-4 h-4 ml-1" />;
    return <ChevronsUpDown className="inline w-4 h-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stany magazynowe</h1>
          <p className="text-gray-600 text-sm">Kontroluj aktualne ilości produktów w magazynach</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 font-medium transition-all rounded-md">
            Dodaj stan
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md">Eksport CSV</button>
        </div>
      </div>

      {alertMessage && (
        <div className="p-3 bg-yellow-200 text-yellow-900 rounded-md">{alertMessage}</div>
      )}

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

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th
                className="text-left px-4 py-3 cursor-pointer select-none"
                onClick={() => handleSort("product")}
              >
                Produkt {renderSortIcon("product")}
              </th>
              <th
                className="text-left px-4 py-3 cursor-pointer select-none"
                onClick={() => handleSort("warehouse")}
              >
                Magazyn {renderSortIcon("warehouse")}
              </th>
              <th
                className="text-left px-4 py-3 cursor-pointer select-none"
                onClick={() => handleSort("quantity")}
              >
                Ilość {renderSortIcon("quantity")}
              </th>
              <th
                className="text-left px-4 py-3 cursor-pointer select-none"
                onClick={() => handleSort("min")}
              >
                Minimalny stan {renderSortIcon("min")}
              </th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isLow = item.quantity < item.min;
              const editingValue = editingQuantities[item.id];
              const displayQuantity = editingValue !== undefined ? editingValue : item.quantity;

              return (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.product}</td>
                  <td className="px-4 py-3">{item.warehouse}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={displayQuantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      onBlur={() => applyQuantityChange(item.id)}
                      className="w-16 text-center border rounded"
                    />
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-3">{item.min}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        isLow ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {isLow ? "Niski stan" : "OK"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-1">
                    <button
                      onClick={() => applyQuantityChange(item.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Zapisz
                    </button>
                    /
                    <button onClick={() => {}} className="text-red-600 hover:underline">
                      Usuń
                    </button>
                  </td>
                </tr>
              );
            })}
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
