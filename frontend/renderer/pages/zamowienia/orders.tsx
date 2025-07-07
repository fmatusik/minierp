import React, { useState, useMemo, useEffect, useRef } from "react";

import dummyOrders from "./DummyOrders";

const ITEMS_PER_LOAD = 20;

export default function ZamowieniaPage() {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const loaderRef = useRef(null);
  const modalRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (selectedOrder) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOrder]);


  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(lower) ||
          order.client.name.toLowerCase().includes(lower)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status.name === statusFilter);
    }
    if (sortOption === "created-desc") {
      filtered.sort((a, b) => b.data.createdAt.localeCompare(a.data.createdAt));
    } else if (sortOption === "created-asc") {
      filtered.sort((a, b) => a.data.createdAt.localeCompare(b.data.createdAt));
    } else if (sortOption === "client-asc") {
      filtered.sort((a, b) => a.client.name.localeCompare(b.client.name));
    } else if (sortOption === "client-desc") {
      filtered.sort((a, b) => b.client.name.localeCompare(a.client.name));
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => parseInt(b.totalPrice) - parseInt(a.totalPrice));
    } else if (sortOption === "price-asc") {
      filtered.sort((a, b) => parseInt(a.totalPrice) - parseInt(b.totalPrice));
    }
    return filtered;
  }, [orders, searchTerm, statusFilter, sortOption]);

  const visibleOrders = filteredOrders.slice(0, visibleCount);

  // Lazy loading trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleCount < filteredOrders.length) {
          setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [filteredOrders.length, visibleCount]);

  // Reset visible count on filter/sort change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [searchTerm, statusFilter, sortOption]);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order });
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setEditedOrder(null);
  };

  const openEditor = (order) => {
    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    const win = window.open(`/zamowienia/editor?id=${order.id}`, "_blank", features);
  };



  const handleDuplicate = (order) => {
    const newOrder = {
      ...order,
      id: `COPY-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć to zamówienie?")) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Zamówienia</h1>
          <p className="text-gray-600 text-sm">
            Przeglądaj i zarządzaj zamówieniami klientów
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          + Nowe zamówienie
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj po kliencie lub numerze..."
          className="px-3 py-2 border rounded-md w-full sm:w-64 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status zamówienia</option>
          <option value="W realizacji">W realizacji</option>
          <option value="Zrealizowane">Zrealizowane</option>
          <option value="Anulowane">Anulowane</option>
        </select>
        <select
          className="px-3 py-2 border rounded-md outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sortuj</option>
          <option value="created-desc">Data zamówienia - malejąco</option>
          <option value="created-asc">Data zamówienia - rosnąco</option>
          <option value="client-desc">Klient - malejąco</option>
          <option value="client-asc">Klient - rosnąco</option>
          <option value="price-desc">Zakres cen - malejąco</option>
          <option value="price-asc">Zakres cen - rosnąco</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Numer</th>
              <th className="px-4 py-2 text-left">Klient</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Data utworzenia</th>
              <th className="px-4 py-2 text-left">Dostawa</th>
              <th className="px-4 py-2 text-left">Płatność</th>
              <th className="px-4 py-2 text-left">Wartość</th>
              <th className="px-4 py-2 text-left">Operacja</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order, idx) => (
              <tr key={`${order.id}-${idx}`} className="border-t hover:bg-gray-50">
                <td
                  className="px-4 py-2 font-medium text-primary cursor-pointer"
                  onClick={() => handleEditClick(order)}
                >
                  {order.id}
                </td>
                <td className="px-4 py-2">{order.client.name}</td>
                <td className="px-4 py-2">{order.status.name}</td>
                <td className="px-4 py-2">{order.data.createdAt}</td>
                <td className="px-4 py-2">{order.deliveryDate}</td>
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2">
                  {parseInt(order.totalPrice).toLocaleString()} PLN
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDuplicate(order)}
                    className="text-blue-600 underline"
                  >
                    Duplikuj
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 underline"
                  >
                    Usuń
                  </button>
                </td>

              </tr>

            ))}

          </tbody>
        </table>
        <div ref={loaderRef} className="h-6" />
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-8 relative space-y-8 max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold">Dane zamówienia: {selectedOrder.id}</h2>
            {/* Sekcja: Dane zamówienia */}
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Klient</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Data utworzenia</th>
                  <th className="px-4 py-2 text-left">Dostawa</th>
                  <th className="px-4 py-2 text-left">Płatność</th>
                  <th className="px-4 py-2 text-left">Kwota</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">{selectedOrder.client.name}</td>
                  <td className="px-4 py-2">{selectedOrder.status.name}</td>
                  <td className="px-4 py-2">{selectedOrder.data.createdAt}</td>
                  <td className="px-4 py-2">{selectedOrder.deliveryDate}</td>
                  <td className="px-4 py-2">{selectedOrder.paymentStatus}</td>
                  <td className="px-4 py-2">
                    {parseInt(selectedOrder.totalPrice).toLocaleString()} PLN
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Sekcja: Adres dostawy (tutaj pokazujemy dane klienta ponownie, bo nie mamy adresu) */}
            <h3 className="text-xl font-bold text-center">Adres dostawy</h3>
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Województwo</th>
                  <th className="px-4 py-2 text-left">Miasto</th>
                  <th className="px-4 py-2 text-left">Ulica</th>
                  <th className="px-4 py-2 text-left">Numer budynku</th>
                  <th className="px-4 py-2 text-left">Numer pokoju</th>
                  <th className="px-4 py-2 text-left">Kod pocztowy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">{selectedOrder.address.province}</td>
                  <td className="px-4 py-2">{selectedOrder.address.city}</td>
                  <td className="px-4 py-2">{selectedOrder.address.street}</td>
                  <td className="px-4 py-2">{selectedOrder.address.buildingNumber}</td>
                  <td className="px-4 py-2">{selectedOrder.address.apartmentNumber}</td>
                  <td className="px-4 py-2">{selectedOrder.address.postalCode}</td>
                </tr>
              </tbody>
            </table>

            {/* Sekcja: Produkty (brak danych produktów w strukturze, więc tylko placeholder) */}
            <h3 className="text-xl font-bold text-center">Produkty</h3>
            <div className="grid grid-cols-2 gap-6">
              {selectedOrder.products.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm text-gray-800">{product.price}</p>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded ${
                        product.status === "Aktywny"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>  

            {/*<h3 className="text-xl font-bold text-center">Ruchy magazynowe</h3>*/}

            {/* Przycisk Edycji i Eksportu */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => openEditor(selectedOrder)}
                className="px-6 py-2 bg-gray-200 rounded-md text-black font-bold"
              >
                Edytuj
              </button>
              <button
                onClick={() => alert("Eksport...")}
                className="px-6 py-2 bg-primary text-white rounded-md font-bold hover:bg-primaryhover transition-all"
              >
                Wyeksportuj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}