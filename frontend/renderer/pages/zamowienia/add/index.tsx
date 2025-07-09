import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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

  const [newOrder, setNewOrder] = useState({
    client: { name: "" },
    status: { name: "W realizacji" },
    data: { createdAt: "" },
    deliveryDate: "",
    paymentStatus: "Nieopłacone",
    totalPrice: 0,
    address: {
      province: "",
      city: "",
      street: "",
      buildingNumber: "",
      apartmentNumber: "",
      postalCode: "",
    },
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setNewOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setNewOrder((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSave = () => {
    setSaving(true);
    axios
      .post("http://localhost:8080/api/orders", newOrder)
      .then(() => {
        alert("Zamówienie zostało dodane.");
        router.push("/orders");
      })
      .catch(() => {
        alert("Błąd podczas dodawania zamówienia.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Nowe zamówienie</h1>
        <p className="text-gray-500 text-sm">Wprowadź dane zamówienia</p>
      </div>

      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-6 text-black">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4" />
            Klient
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.client.name}
            onChange={(e) =>
              setNewOrder((prev) => ({
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
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.status.name}
            onChange={(e) =>
              setNewOrder((prev) => ({
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
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.data.createdAt}
            onChange={(e) =>
              setNewOrder((prev) => ({
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
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.deliveryDate}
            onChange={(e) => handleChange("deliveryDate", e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <CreditCard className="w-4 h-4" />
            Status płatności
          </label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.paymentStatus}
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
            className="w-full border rounded-md px-3 py-2"
            value={newOrder.totalPrice}
            onChange={(e) => handleChange("totalPrice", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 mt-6">Adres dostawy</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: <MapPin />, label: "Województwo", field: "province" },
            { icon: <Building2 />, label: "Miasto", field: "city" },
            { icon: <Home />, label: "Ulica", field: "street" },
            { icon: <Hash />, label: "Nr budynku", field: "buildingNumber" },
            { icon: <Hash />, label: "Nr mieszkania", field: "apartmentNumber" },
            { icon: <Mail />, label: "Kod pocztowy", field: "postalCode" },
          ].map(({ icon, label, field }) => (
            <div key={field}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                {icon}
                {label}
              </label>
              <input
                type={field.includes("Number") ? "number" : "text"}
                className="w-full border rounded-md px-3 py-2"
                value={newOrder.address[field]}
                onChange={(e) => handleAddressChange(field, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md font-medium transition"
          onClick={handleCancel}
          disabled={saving}
        >
          Anuluj
        </button>
        <button
          className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Zapisywanie..." : "Dodaj zamówienie"}
        </button>
      </div>
    </div>
  );
}
