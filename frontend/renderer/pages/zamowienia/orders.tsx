import React, { useState, useMemo, useEffect, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import axios from "axios";

const ITEMS_PER_LOAD = 20;

export default function ZamowieniaPage() {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [orderProducts, setOrderProducts] = useState([]);


  const loaderRef = useRef(null);
  const modalRef = useRef(null);

  // Fetch all orders on mount

    const fetchOrders = async () => {
      axios.get("http://localhost:8080/api/orders/all")
      .then((res) => {
        console.log(res.data)
        setOrders(res.data);
      })
      .catch((err) => {
        window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany błąd")
        console.error(err);
      })
  };
  
    const fetchStatuses = () => {
      axios.get("http://localhost:8080/api/status/all/order")
      .then((res) => setOrderStatuses(res.data))
      .catch((err) => {
        console.error("Błąd podczas pobierania statusów", err);
      });
    }

  useEffect(() => {
    fetchOrders();
    fetchStatuses();
  }, []);


  // Close modal if clicked outside
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

  // Szukanie tylko po numerze zamówienia
  if (searchTerm) {
    const lower = searchTerm.toLowerCase();
  filtered = filtered.filter(order =>
    order.documentNumber.toLowerCase().includes(lower) ||
    order.clientDto.name.toLowerCase().includes(lower)
  );
  }

  // Filtrowanie po statusie
  if (statusFilter) {
    filtered = filtered.filter(order => order.statusDto.name === statusFilter);
  }

  // Sortowanie
  if (sortOption === "created-desc") {
    filtered.sort((a, b) => b.data.createdAt.localeCompare(a.data.createdAt));
  } else if (sortOption === "created-asc") {
    filtered.sort((a, b) => a.data.createdAt.localeCompare(b.data.createdAt));
  } else if (sortOption === "client-asc") {
    filtered.sort((a, b) => a.clientDto.name.localeCompare(b.clientDto.name));
  } else if (sortOption === "client-desc") {
    filtered.sort((a, b) => b.clientDto.name.localeCompare(a.clientDto.name));
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  } else if (sortOption === "price-asc") {
    filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
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

  useEffect(() => {
  if (selectedOrder && selectedOrder.orderItems) {
    fetchProductsForOrder(selectedOrder.orderItems);
  }
}, [selectedOrder]);


  const handleEditClick = (order) => {
    console.log("ORDER:", order);
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

    window.open(`/zamowienia/editor?id=${order}`, "_blank", features);
  };

  const openAddPanel = () => {

    const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbar=yes`;

    window.open('/zamowienia/add', "_blank", features);

  }


  const fetchProductsForOrder = async (orderItems) => {
    try {
      const productRequests = orderItems.map(item =>
        axios.get(`http://localhost:8080/api/products/one/${item.productId}`)
      );

      const responses = await Promise.all(productRequests);
      const products = responses.map(res => res.data);
      setOrderProducts(products);
      console.log("PRODUCTS:", products);
    } catch (error) {
      console.error("Błąd przy pobieraniu produktów zamówienia", error);
    }
  };


  // Usuń zamówienie przez API
  const handleDelete = async (id) => {
    const confirm = await window.ipc.invoke("show-confirm", "Czy napewno chcesz usunąć to zamówienie?");
    if(!confirm) return ;
      try {
        await axios.delete(`http://localhost:8080/api/orders/delete/${id}`);
        setOrders((prev) => prev.filter((order) => order.id !== id));

        // Zamknij modal jeśli usuwane jest wybrane zamówienie
        if (selectedOrder && selectedOrder.id === id) {
          closeModal();
        }
      } catch (err) {
        console.error("Failed to delete order", err);
        window.ipc.invoke("show-alert", "Nie udało się usunąć zamówienia");
      }
  };


  const handleReload = async () => {
    fetchOrders();
    fetchStatuses();
};


const handleExportCSV = () => {
  axios.get("http://localhost:8080/api/orders/csv/all", {
    responseType: 'blob', // important to handle binary data like CSV
  })
  .then((res) => {
    // Create a URL for the blob object
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv'); // specify the file name
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  })
  .catch((err) => {
    console.error(err);
  });
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

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 font-medium transition-all rounded-md"
            onClick={openAddPanel}
          >
            + Nowe zamówienie
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md"
            onClick={handleExportCSV}
            >
            Eksport CSV
          </button>
 
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj po kliencie lub numerze..."
          className="px-3 py-2 border rounded-md w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status zamówienia</option>
          {orderStatuses.map((status) => (
            <option key={status.id} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded-md"
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

        <button
          onClick={handleReload}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
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
                  className="px-4 py-2 font-medium text-primary cursor-pointer hover:underline"
                  onClick={() => handleEditClick(order)}
                >
                  {order.documentNumber}
                </td>
                <td className="px-4 py-2">{order.clientDto.name}</td>
                <td className="px-4 py-2"><span className={`${order.statusDto.color} px-1 rounded-md`}>{order.statusDto.name} </span> </td>
                <td className="px-4 py-2">{new Date(order.data.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2">
                  {parseFloat(order.price).toFixed(2)} PLN
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:underline"
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
          <div
            ref={modalRef}
            className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-8 relative space-y-8 max-h-[90vh] overflow-auto"
          >
            <h2 className="text-2xl font-bold">Dane zamówienia: <span className="text-primary">{selectedOrder.documentNumber}</span></h2>
            {/* Dane zamówienia */}
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
                  <td className="px-4 py-2">{selectedOrder.clientDto.name}</td>
                  <td className="px-4 py-2">{selectedOrder.statusDto.name}</td>
                  <td className="px-4 py-2">{new Date(selectedOrder.data.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{selectedOrder.paymentStatus}</td>
                  <td className="px-4 py-2">
                    {parseFloat(selectedOrder.price).toFixed(2)} PLN
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Adres dostawy */}
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
                  <td className="px-4 py-2">{selectedOrder.addressDto.province}</td>
                  <td className="px-4 py-2">{selectedOrder.addressDto.city}</td>
                  <td className="px-4 py-2">{selectedOrder.addressDto.street}</td>
                  <td className="px-4 py-2">{selectedOrder.addressDto.buildingNumber}</td>
                  <td className="px-4 py-2">{selectedOrder.addressDto.apartmentNumber}</td>
                  <td className="px-4 py-2">{selectedOrder.addressDto.postalCode}</td>
                </tr>
              </tbody>
            </table>

            {/* Produkty */}
            <h3 className="text-xl font-bold text-center">Produkty</h3>
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Produkt</th>
                    <th className="px-4 py-2 text-left">Ilość</th>
                    <th className="px-4 py-2 text-left">Cena</th>
                    <th className="px-4 py-2 text-left">Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {orderProducts.map((product, idx) => {
                    const item = selectedOrder.orderItems.find(
                      (oi) => oi.productId === product.id
                    );

                    return (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{item?.quantity ?? '-'}</td>
                        <td className="px-4 py-2">
                          {(item?.price / item?.quantity).toFixed(2)} PLN
                        </td>
                        <td className="px-4 py-2">
                          {(item ? product.price * item.quantity : 0).toFixed(2)} PLN
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>


            <div className="flex justify-end space-x-3">
              <button
                onClick={() => openEditor(selectedOrder.id)}
                className="px-4 py-2 bg-primary hover:bg-primaryhover transition-all text-white rounded-md"
              >
                Edytuj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
