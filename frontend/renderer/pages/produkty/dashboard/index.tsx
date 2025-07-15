import React, { useEffect, useState } from "react";
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

import axios from "axios";

const clients = [
  { name: "Helena", email: "email@email.net" },
  { name: "Oscar", email: "email@email.net" },
  { name: "Daniel", email: "email@email.net" },
  { name: "Daniel Jay Park", email: "email@email.net" },
  { name: "Mark Rojas", email: "email@email.net" },
];

export default function ProductDashboard({ productId }) {
  const [product, setProduct] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/products/one/${productId}`
      );
      const data = res.data;
      setProduct(data); 
      console.log(data);

      // Order-based sales data
      if (data.orderItemDtos && data.orderItemDtos.length > 0) {
        const totalQty = data.orderItemDtos.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalRevenue = data.orderItemDtos.reduce(
          (sum, item) => sum + item.price,
          0
        );

        setTotalUnitsSold(totalQty);
        setTotalSales(totalRevenue);

        const now = new Date();

        // Przygotuj ostatnie 7 dni w formacie YYYY-MM-DD i nazwie
        const last7Days = [...Array(7)].map((_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (6 - i));
          const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

          return {
            date: dateKey,
            name: `${date.getDate()} ${date.toLocaleString("default", {
              month: "short",
            })}`,
            value: 0,
          };
        });

        // Zamień na mapę do szybszego dostępu
        const salesMap = new Map(last7Days.map(d => [d.date, d]));

        // Załóżmy że `product` to obiekt zwrócony z API
        data.orderItemDtos.forEach(item => {
          const createdAt = new Date(item.data.createdAt);
          const key = createdAt.toISOString().split("T")[0];

          if (salesMap.has(key)) {
            const entry = salesMap.get(key)!;
            entry.value += item.price;
          }
        });

        // Zaktualizuj wykres
        const finalSalesData = Array.from(salesMap.values());
        setLineData(finalSalesData);

      }

      // Generate dummy stock data if no stockLevelsDto
      const stockByMonth = [...Array(6)].map((_, i) => ({
        month: `mag${i + 1}`,
        value: Math.floor(Math.random() * 50),
      }));
      setBarData(stockByMonth);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">
      {/* Top Cards */}
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
        <h4 className="text-sm text-gray-500">Łączna sprzedaż</h4>
        <p className="text-2xl font-bold">
          {totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}PLN
        </p>
        <p className="text-green-600 text-sm mt-1">+12% miesiąc do miesiąca</p>
      </div>
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
        <h4 className="text-sm text-gray-500">Sprzedane jednostki</h4>
        <p className="text-2xl font-bold">{totalUnitsSold}</p>
        <p className="text-green-600 text-sm mt-1">+8% miesiąc do miesiąca</p>
      </div>
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
        <h4 className="text-sm text-gray-500">Ilość dostępnego produktu</h4>
        <p className="text-2xl font-bold">{product.stockLevelsDto?.length || 87}</p>
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
}
