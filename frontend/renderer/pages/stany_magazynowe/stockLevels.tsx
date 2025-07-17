import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, ChevronsUpDown, RefreshCcw } from "lucide-react";
import axios from "axios";

export default function StockLevelsPage() {
  const [search, setSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [stock, setStock] = useState([]);
  const [uniqueWarehouses, setUniqueWarehouses] = useState([]);
  const [editingQuantities, setEditingQuantities] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchStockLevels();
    fetchFilterWarehouses();
  }, []);



  const fetchStockLevels = () => {
    axios
      .get("http://localhost:8080/api/stockLevels/all")
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => {
        console.error(err);
        window.ipc?.invoke(
          "show-alert",
          "Wystąpił nieoczekiwany problem w trakcie ładowania stanów magazynowych"
        );
      });
  };

  const fetchFilterWarehouses = () => {
    axios.get("http://localhost:8080/api/warehouse/all")
    .then((res) => {
      setUniqueWarehouses(res.data)
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcia ładowania dostępnych magazynów");
    })
  }

  const handleReload = () => {
    fetchStockLevels();
    fetchFilterWarehouses();
  }

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        const newDirection =
          prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? null
            : "asc";
        return { key: newDirection ? key : null, direction: newDirection };
      }
      return { key, direction: "asc" };
    });
  };

  const sorted = [...stock].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    const valA =
      sortConfig.key === "product"
        ? a.productDto.name
        : sortConfig.key === "warehouse"
        ? a.warehouseDto.name
        : a[sortConfig.key];

    const valB =
      sortConfig.key === "product"
        ? b.productDto.name
        : sortConfig.key === "warehouse"
        ? b.warehouseDto.name
        : b[sortConfig.key];

    if (typeof valA === "string") {
      return sortConfig.direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return sortConfig.direction === "asc" ? valA - valB : valB - valA;
  });

  const filtered = sorted.filter((item) => {
  const matchWarehouse =
    !selectedWarehouse || item.warehouseDto.id === Number(selectedWarehouse);

    const matchSearch = item.productDto.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchWarehouse && matchSearch;
  });

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(0, Number(value));
    setEditingQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const applyQuantityChange = (stockLevel) => {
    if (editingQuantities[stockLevel.id] === undefined)  return;

    const updatedItem = stock.find((item) => item.id === stockLevel.id);
    if (!updatedItem) return;

    if (updatedItem.quantity === editingQuantities[stockLevel.id]) return;

    const newQty = editingQuantities[stockLevel.id];


    setStock((prevStock) =>
      prevStock.map((item) =>
        item.id === stockLevel ? { ...item, quantity: newQty } : item
      )
    );

    const stockLevelUpdateBody = {
      quantity: newQty,
    }

    axios.put(`http://localhost:8080/api/stockLevels/update/${stockLevel.id}`, stockLevelUpdateBody)
    .then((res) => {
      console.log(res.data);
      if (newQty < updatedItem.minimumQuantity) {
      setAlertMessage(
        `Uwaga! Produkt "${updatedItem.productDto.name}" ma niski stan.`
      );
    } else {
      setAlertMessage(
        `Produkt "${updatedItem.productDto.name}" zaktualizowany poprawnie.`
      );
    }

    setTimeout(() => setAlertMessage(null), 3000);
    handleReload();
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie edycji stanu magazynowego");
    })




  };

  const incrementQuantity = (id) => {
    const current =
      editingQuantities[id] ??
      stock.find((item) => item.id === id)?.quantity ??
      0;
    handleQuantityChange(id, current + 1);
  };

  const decrementQuantity = (id) => {
    const current =
      editingQuantities[id] ??
      stock.find((item) => item.id === id)?.quantity ??
      0;
    handleQuantityChange(id, current - 1);
  };

  const handleExportCSV = () => {
    const csv = [
      ["Produkt", "Magazyn", "Ilość", "Minimalny stan"],
      ...filtered.map((item) => [
        item.productDto.name,
        item.warehouseDto.name,
        item.quantity,
        item.minimumQuantity,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stock_levels.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <ChevronsUpDown className="inline w-4 h-4 ml-1" />;
    if (sortConfig.direction === "asc")
      return <ArrowUp className="inline w-4 h-4 ml-1" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown className="inline w-4 h-4 ml-1" />;
    return <ChevronsUpDown className="inline w-4 h-4 ml-1" />;
  };

  const handleOpenAdd = () => {
    const width = 1200;
    const height = 900;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open(`/stany_magazynowe/add`, "_blank", features);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Stany magazynowe</h1>
          <p className="text-gray-600 text-sm">
            Kontroluj aktualne ilości produktów w magazynach
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 font-medium transition-all rounded-md"
            onClick={handleOpenAdd}
          >
            Dodaj stan
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md"
            onClick={handleExportCSV}
          >
            Eksport CSV
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="p-3 bg-yellow-200 text-yellow-900 rounded-md">
          {alertMessage}
        </div>
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
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
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
                onClick={() => handleSort("minimumQuantity")}
              >
                Minimalny stan {renderSortIcon("minimumQuantity")}
              </th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isLow = item.quantity < item.minimumQuantity;
              const editingValue = editingQuantities[item.id];
              const displayQuantity =
                editingValue !== undefined ? editingValue : item.quantity;

              return (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.productDto.name}</td>
                  <td className="px-4 py-3">{item.warehouseDto.name}</td>
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
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
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
                  <td className="px-4 py-3">{item.minimumQuantity}</td>
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
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => applyQuantityChange(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Zapisz
                    </button> 
                     / 
                    <button
                      onClick={() => {}}
                      className="text-red-600 hover:underline"
                    >
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
