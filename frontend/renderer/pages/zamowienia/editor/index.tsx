import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dummyOrders from "../DummyOrders";
import {
  User,
  BadgeCheck,
  CalendarDays,
  Truck,
  CreditCard,
  DollarSign,
  MapPin,
  Building2,
  Home,
  Hash,
  Mail,
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  const orderId = router.query.id as string;

  const [order, setOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);

  useEffect(() => {
    const found = dummyOrders.find((o) => o.id === orderId);
    if (found) {
      setOrder(found);
      setEditedOrder({ ...found });
    }
  }, [orderId]);

  if (!order || !editedOrder) {
    return <div className="p-6 text-gray-600">Ładowanie danych zamówienia...</div>;
  }

  const handleChange = (field, value) => {
    setEditedOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setEditedOrder((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSave = () => {
    console.log("Zapisano:", editedOrder);
    alert("Zamówienie zostało zapisane (symulacja)");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Edycja zamówienia</h1>
        <p className="text-gray-500 text-sm">ID: {order.id}</p>
      </div>

      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-6 text-black">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4" />
              Klient
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.client.name}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  client: { ...prev.client, name: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <BadgeCheck className="w-4 h-4" />
              Status
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.status.name}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  status: { ...prev.status, name: e.target.value },
                }))
              }
            >
              <option value="W realizacji">W realizacji</option>
              <option value="Zrealizowane">Zrealizowane</option>
              <option value="Anulowane">Anulowane</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CalendarDays className="w-4 h-4" />
              Data utworzenia
            </label>
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.data.createdAt}
              onChange={(e) =>
                setEditedOrder((prev) => ({
                  ...prev,
                  data: { ...prev.data, createdAt: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Truck className="w-4 h-4" />
              Data dostawy
            </label>
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.deliveryDate}
              onChange={(e) => handleChange("deliveryDate", e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CreditCard className="w-4 h-4" />
              Status płatności
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.paymentStatus}
              onChange={(e) => handleChange("paymentStatus", e.target.value)}
            >
              <option value="Opłacone">Opłacone</option>
              <option value="Nieopłacone">Nieopłacone</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <DollarSign className="w-4 h-4" />
              Wartość (PLN)
            </label>
            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={editedOrder.totalPrice}
              onChange={(e) => handleChange("totalPrice", e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 mt-6">Adres dostawy</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" />
                Województwo
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.province}
                onChange={(e) => handleAddressChange("province", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Building2 className="w-4 h-4" />
                Miasto
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Home className="w-4 h-4" />
                Ulica
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Hash className="w-4 h-4" />
                Nr budynku
              </label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.buildingNumber}
                onChange={(e) => handleAddressChange("buildingNumber", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Hash className="w-4 h-4" />
                Nr mieszkania
              </label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.apartmentNumber}
                onChange={(e) => handleAddressChange("apartmentNumber", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4" />
                Kod pocztowy
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={editedOrder.address.postalCode}
                onChange={(e) => handleAddressChange("postalCode", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md font-medium transition"
            onClick={() => close()}
          >
            Anuluj
          </button>
          <button
            className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
            onClick={handleSave}
          >
            Zapisz zmiany
          </button>
        </div>
      </div>
    </div>
  );
}
