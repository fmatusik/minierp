import React, { useEffect, useState } from "react";
import axios from "axios";

const warehouses = [
  {
    id: 1,
    name: "Magazyn Warszawa",
    location: "ul. Przykładowa 12, Warszawa",
    products: 123,
    totalStock: 4500,
  },
  {
    id: 2,
    name: "Magazyn Kraków",
    location: "ul. Rynek 1, Kraków",
    products: 87,
    totalStock: 3100,
  },
  {
    id: 3,
    name: "Magazyn Gdańsk",
    location: "ul. Nadmorska 3, Gdańsk",
    products: 65,
    totalStock: 1900,
  },
];

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

      {/* Grid of Warehouses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((w) => (
          <div
            key={w.id}
            className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white cursor-pointer"
            onClick={() => openEdit(w.id)}
          >
            <div className="bg-gray-100 px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">{w.name}</h2>
              <p className="text-sm text-gray-500">{w.addressDto.street} {w.addressDto.buildingNumber}, {w.addressDto.city}</p>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Liczba produktów:</span>
                <span className="font-medium">{w.products}</span>
              </div>
              <div className="flex justify-between">
                <span>Łączny stan magazynowy:</span>
                <span className="font-medium">{w.totalStock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
