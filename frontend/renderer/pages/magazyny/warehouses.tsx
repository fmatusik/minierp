import React, { useEffect, useState } from "react";
import axios from "axios";
import {RefreshCcw} from 'lucide-react';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);

  const openAddWindow = () => {
    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    window.open(`/magazyny/add`, "_blank", features);
  }

  useEffect(() => {
    fetchWarehouses();

  },[]);

  const fetchWarehouses = () => {
    axios.get("http://localhost:8080/api/warehouse/all")
    .then((res) => {
      setWarehouses(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie ładowania magazynów")
      console.error(err);
    })
  } 
  const handleReload = () => {
    fetchWarehouses();
  }

  const deleteWarehouse = async (id) => {
    const confirm = await window.ipc.invoke("show-confirm", "Czy napewno chcesz usunąć ten magazyn?")
    if(!confirm) return ;

    try{
      const res = await axios.delete(`http://localhost:8080/api/warehouse/delete/${id}`)
      handleReload();
    }catch(err) {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie usuwania magazynu");
    }

  }

  const openEdit = (warehouseId) => {
    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    console.log(warehouseId);
      window.open(`/magazyny/edit?id=${warehouseId}`, "_blank", features);
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Magazyny</h1>
          <p className="text-gray-600 text-sm">Lista zarejestrowanych magazynów</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md"
          onClick={openAddWindow}
        >
          + Dodaj magazyn
        </button>
      </div>
              <button
          onClick={handleReload}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>

      {/* Grid of Warehouses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((w) => (
          <div
            key={w.id}
            className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white cursor-pointer"

          >
            <div className="bg-gray-100 px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">{w.name}</h2>
              <p className="text-sm text-gray-500">{w.addressDto.street} {w.addressDto.buildingNumber}, {w.addressDto.city}</p>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Liczba produktów:</span>
                <span className="font-medium">{w.stockLevelsDto.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Łączny stan magazynowy:</span>
                <span className="font-medium">
                  {w.stockLevelsDto.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                onClick={() => deleteWarehouse(w.id)}
                className="bg-gray-200 hover:bg-gray-300 transition-all w-full rounded-md py-1 text-black font-medium">
                  Usuń 
                </button>
                <button
                  onClick={() => openEdit(w.id)}
                  className="bg-primary hover:bg-primaryhover w-full rounded-md py-1 text-white font-medium">
                  Edytuj
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
