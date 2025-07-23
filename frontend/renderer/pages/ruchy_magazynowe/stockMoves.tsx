import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {RefreshCcw} from 'lucide-react';

export default function StockMovesPage() {
  const [moves, setMoves] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [editingMove, setEditingMove] = useState(null);
  const [selectedMove, setSelectedMove] = useState(null);
  const [warehouses, setWarehouses] = useState([]);

  const modalRef = useRef(null);
  const detailsModalRef = useRef(null);

  const moveTypes = [
    {label: "Przyjęcie", name: "RECEPTION"},
    {label: "Wydanie", name: "RELEASE"},
    {label: "Przesunięcie", name: "SHIFT"},
  ]

  const fetchMoves = () => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/stockMovements/all`)
    .then((res) => {
      console.log(res.data);
      setMoves(res.data);
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie ładowania ruchów magazynowych");
    })
  }

  const fetchWarehouses = () => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/warehouse/all`)
    .then((res) => {
      setWarehouses(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie ładowania magazynów");
    })
  }


  const handleDelete = async (id) => {
    const confirm = await window.ipc.invoke("show-confirm", "Czy napewno chcesz usunąć ten ruch magazynowy?");
    if(!confirm) return;

    try{
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/stockMovements/delete/${id}`)
      window.ipc.invoke("show-alert", res.data);
    }catch(err){
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie usuwania ruchu magazynowego");
    }
  }

  const handleExportCSV = () => {
  axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/stockMovements/csv/all`, {
    responseType: 'blob', // important to handle binary data like CSV
  })
  .then((res) => {
    // Create a URL for the blob object
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'stockMovements.csv'); // specify the file name
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  })
  .catch((err) => {
    console.error(err);
  });
};

  useEffect(() => {
    fetchMoves();
    fetchWarehouses();
  }, []);

  const handleReload = () => {
    fetchMoves();
    fetchWarehouses();
  }
  


  const filtered = moves.filter((move) => {
    const matchType = !selectedType || move.type === selectedType;
    const matchWarehouse =
      !selectedWarehouse ||
      move.sourceWarehouse?.id === Number(selectedWarehouse) ||
      move.targetWarehouse?.id === Number(selectedWarehouse);

      const matchSearch = move.stockMovementNumber?.toLowerCase().includes(search.toLowerCase()) || false;
    return matchType && matchWarehouse && matchSearch;
  });

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

    const handleOpenAdd = () =>{
     const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    window.open(`/ruchy_magazynowe/add`, "_blank", features);
  }


  const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  const d = new Date(isoDate);
  return d.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ruchy magazynowe</h1>
          <p className="text-gray-600 text-sm">Historia operacji magazynowych</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 font-medium transition-all rounded-md"
          onClick={handleOpenAdd}
          >
            + Nowy ruch
          </button>

          <button
            className="px-4 py-2 bg-black text-white rounded-md"
            onClick={handleExportCSV}
          >
            Eksport CSV
          </button>
          </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj ruchu magazynowego..."
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
          {moveTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.label}
            </option>
          ))}
        </select>

        <select
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Wszystkie magazyny</option>
          {warehouses.map((w, i) => (
            <option key={i} value={w.id}>
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

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Numer</th>
              <th className="text-left px-4 py-3">Typ ruchu</th>
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
                  onClick={() => {setSelectedMove(move); console.log(move)}}
                >
                  {move.stockMovementNumber}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      move.type === "RECEPTION"
                        ? "bg-green-100 text-green-800"
                        : move.type === "RELEASE"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {moveTypes.find((t) => t.name === move.type)?.label || move.type}
                  </span>

                </td>
                <td className="px-4 py-3">{move.sourceWarehouse?.name || "-"}</td>
                <td className="px-4 py-3">{move.targetWarehouse?.name || "-"}</td>
                <td className="px-4 py-3">{formatDate(move.data.createdAt)}</td>
                <td className="px-4 py-3 flex gap-1">
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

    

      {/* Details Modal */}
      {selectedMove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={detailsModalRef}
            className="bg-white p-6 rounded-md w-full max-w-2xl space-y-4"
          >
            <h2 className="text-xl font-semibold">Szczegóły ruchu magazynowego</h2>
            
            <div><strong>Numer:</strong> {selectedMove.stockMovementNumber}</div>
            <div>
              <strong>Typ:</strong>{" "}
              <span
                className={`text-xs px-2 py-1 rounded ${
                  selectedMove.type === "RECEPTION"
                    ? "bg-green-100 text-green-800"
                    : selectedMove.type === "RELEASE"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {moveTypes.find((t) => t.name === selectedMove.type)?.label || selectedMove.type}
              </span>
            </div>
            <div><strong>Magazyn źródłowy:</strong> {selectedMove.sourceWarehouse?.name || "-"}</div>
            <div><strong>Magazyn docelowy:</strong> {selectedMove.targetWarehouse?.name || "-"}</div>
            <div><strong>Data:</strong> {formatDate(selectedMove.data.createdAt)}</div>

            {/* Tabela z pozycjami */}
            <div>
              <h3 className="font-semibold text-lg mt-4">Pozycje ruchu</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="text-left px-3 py-2">Produkt</th>
                      <th className="text-left px-3 py-2">Ilość</th>
                      <th className="text-left px-3 py-2">Cena</th>
                      <th className="text-left px-3 py-2">Wartość</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMove.stockMovementItemsDto?.length > 0 ? (
                      selectedMove.stockMovementItemsDto.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-3 py-2">{item.productDto?.name || "-"}</td>
                          <td className="px-3 py-2">{item.quantity}</td>
                          <td className="px-3 py-2">{item.price?.toFixed(2)} zł</td>
                          <td className="px-3 py-2">
                            {(item.quantity * item.price).toFixed(2)} zł
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 py-3">
                          Brak pozycji
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-2">
              <button
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white transition-all rounded"
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
