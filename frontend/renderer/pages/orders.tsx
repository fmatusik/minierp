import React from "react";

const dummyOrders = [
  {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
    {
    id: "ORD-001",
    client: "ABC Sp. z o.o.",
    status: "W realizacji",
    totalPrice: "12 300 PLN",
    createdAt: "2025-06-01",
    deliveryDate: "2025-06-07",
    paymentStatus: "Opłacone",
  },
  {
    id: "ORD-002",
    client: "XYZ S.A.",
    status: "Zrealizowane",
    totalPrice: "4 700 PLN",
    createdAt: "2025-05-25",
    deliveryDate: "2025-05-30",
    paymentStatus: "Nieopłacone",
  },
  
];

export default function ZamowieniaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Zamówienia</h1>
          <p className="text-gray-600 text-sm">Przeglądaj i zarządzaj zamówieniami klientów</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">+ Nowe zamówienie</button>
      </div>

      {/* Filters (placeholder) */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj po kliencie lub numerze..."
          className="px-3 py-2 border rounded-md w-full sm:w-64 outline-none"
        />
        <select className="px-3 py-2 border rounded-md outline-none">
          <option>Status zamówienia</option>
          <option>W realizacji</option>
          <option>Zrealizowane</option>
          <option>Anulowane</option>
        </select>
      </div>

      {/* Orders Table */}
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
              <th className="px-4 py-2 text-left">Kwota</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2 font-medium text-primary">{order.id}</td>
                <td className="px-4 py-2">{order.client}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.createdAt}</td>
                <td className="px-4 py-2">{order.deliveryDate}</td>
                <td className="px-4 py-2">{order.paymentStatus}</td>
                <td className="px-4 py-2">{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
