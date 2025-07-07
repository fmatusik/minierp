import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { NextPage } from "next";

const lineData = [
  { name: "23 Nov", value: 24000 },
  { name: "24", value: 26000 },
  { name: "25", value: 30000 },
  { name: "26", value: 28000 },
  { name: "27", value: 35000 },
  { name: "28", value: 33000 },
  { name: "29", value: 42000 },
  { name: "30", value: 46000 },
];

const barData = [
    { month: "mag1", value: 10 },
    { month: "mag2", value: 1 },
    { month: "mag3", value: 20 },
    { month: "mag4", value: 0 },
    { month: "mag5", value: 5 },
    { month: "mag6", value: 1 },
    { month: "mag1", value: 50 },
    { month: "mag2", value: 0 },
    { month: "mag3", value: 0 },
    { month: "mag4", value: 0 },
    { month: "mag5", value: 0 },
    { month: "mag6", value: 0 },
];

const clients = [
  { name: "Helena", email: "email@email.net" },
  { name: "Oscar", email: "email@email.net" },
  { name: "Daniel", email: "email@email.net" },
  { name: "Daniel Jay Park", email: "email@email.net" },
  { name: "Mark Rojas", email: "email@email.net" },
];

  export default function ProductDashboard() {
    return (
<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">

        {/* Top Cards */}
        <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
          <h4 className="text-sm text-gray-500">Łączna sprzedaż</h4>
          <p className="text-2xl font-bold">$12,340.00</p>
          <p className="text-green-600 text-sm mt-1">+12% miesiąc do miesiąca</p>
        </div>
        <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
          <h4 className="text-sm text-gray-500">Sprzedane jednostki</h4>
          <p className="text-2xl font-bold">1,230</p>
          <p className="text-green-600 text-sm mt-1">+8% miesiąc do miesiąca</p>
        </div>
        <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
          <h4 className="text-sm text-gray-500">Ilość dostępnego produktu</h4>
          <p className="text-2xl font-bold">87</p>
          <p className="text-red-600 text-sm mt-1">-5% względem poprzedniego miesiąca</p>
        </div>

        {/* Line Chart */}
      <div className="col-span-2 border rounded-xl p-6 bg-white shadow focus:outline-none focus:ring-0">
          <h4 className="text-sm text-gray-500 mb-4">Sprzedaż w ostatnich dniach</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Clients */}
        <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
          <h4 className="text-sm text-gray-500 mb-4">Klienci</h4>
          <ul className="space-y-4">
            {clients.map((client, index) => (
              <li key={index} className="flex items-center space-x-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={client.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Inventory Bar Chart */}
        <div className="col-span-3 border rounded-xl p-6 bg-white shadow">
          <h4 className="text-sm text-gray-500 mb-4">Stan magazynowy</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#000" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };