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
import { User } from "lucide-react";


export default function ProductDashboard({ productId }) {
  const [product, setProduct] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);
  const [availableProductCount, setAvailableProductCount] = useState(0);
  const [salesGrowth, setSalesGrowth] = useState("0%");
  const [unitsGrowth, setUnitsGrowth] = useState("0%");
  const [clients, setClients] = useState([]);

  const getProcentByMonth = (orderItems) => {
    // Get current and previous month
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Group sales and units by month and year
    const salesByMonth = orderItems.reduce(
      (acc, item) => {
        const createdAt = new Date(item.data.createdAt);
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        const key = `${year}-${month}`;

        acc.sales[key] = (acc.sales[key] || 0) + item.price;
        acc.units[key] = (acc.units[key] || 0) + item.quantity;
        return acc;
      },
      { sales: {}, units: {} }
    );

    // Calculate sales and units for current and previous month
    const currentMonthKey = `${currentYear}-${currentMonth}`;
    const prevMonthKey = `${prevYear}-${prevMonth}`;
    const currentSales = salesByMonth.sales[currentMonthKey] || 0;
    const prevSales = salesByMonth.sales[prevMonthKey] || 0;
    const currentUnits = salesByMonth.units[currentMonthKey] || 0;
    const prevUnits = salesByMonth.units[prevMonthKey] || 0;

    // Calculate percentage growth for sales
    const salesGrowth =
      prevSales === 0
        ? currentSales > 0
          ? "∞"
          : "0%"
        : `${((currentSales - prevSales) / prevSales) * 100 >= 0 ? "+" : ""}${(
            ((currentSales - prevSales) / prevSales) *
            100
          ).toFixed(2)}%`;

    // Calculate percentage growth for units
    const unitsGrowth =
      prevUnits === 0
        ? currentUnits > 0
          ? "∞"
          : "0%"
        : `${((currentUnits - prevUnits) / prevUnits) * 100 >= 0 ? "+" : ""}${(
            ((currentUnits - prevUnits) / prevUnits) *
            100
          ).toFixed(2)}%`;

    return { salesGrowth, unitsGrowth };
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/products/one/${productId}`
      );
      const data = res.data;
      setProduct(data);

      if (data.stockLevelsDto && data.stockLevelsDto.length > 0) {
        const totalProd = data.stockLevelsDto.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setAvailableProductCount(totalProd);
      }

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

        // Calculate sales and units growth
        const { salesGrowth, unitsGrowth } = getProcentByMonth(data.orderItemDtos);
        setSalesGrowth(salesGrowth);
        setUnitsGrowth(unitsGrowth);

        const now = new Date();
        const last7Days = [...Array(7)].map((_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (6 - i));
          const dateKey = date.toISOString().split("T")[0];
          return {
            date: dateKey,
            name: `${date.getDate()} ${date.toLocaleString("default", {
              month: "short",
            })}`,
            value: 0,
          };
        });

        const salesMap = new Map(last7Days.map((d) => [d.date, d]));
        data.orderItemDtos.forEach((item) => {
          const createdAt = new Date(item.data.createdAt);
          const key = createdAt.toISOString().split("T")[0];
          if (salesMap.has(key)) {
            const entry = salesMap.get(key);
            entry.value += item.price;
          }
        });

        const finalSalesData = Array.from(salesMap.values());
        setLineData(finalSalesData);
      }

      const uniqueClientsMap = new Map();

      data.orderItemDtos.forEach((item) => {
        const client = item.order?.clientDto;
        if (client && !uniqueClientsMap.has(client.id)) {
          uniqueClientsMap.set(client.id, {
            name: client.name,
            email: `client${client.id}@example.com`, // zastąp, jeśli backend zwraca email
          });
        }
      });

      // Pobierz maksymalnie 6 klientów
      setClients(Array.from(uniqueClientsMap.values()).slice(0, 6));
      console.log("clients:", clients);

      const stockLevels = res.data.stockLevelsDto;
      const formattedBarData = stockLevels.map((item) => ({
        warehouse: item.warehouseDto?.name,
        value: item.quantity,
      }));
      setBarData(formattedBarData);


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
          {totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })} PLN
        </p>
        <p
          className={`text-sm mt-1 ${
            salesGrowth.startsWith("-") ? "text-red-600" : "text-green-600"
          }`}
        >
          {salesGrowth} miesiąc do miesiąca
        </p>
      </div>
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
        <h4 className="text-sm text-gray-500">Sprzedane jednostki</h4>
        <p className="text-2xl font-bold">{totalUnitsSold}</p>
        <p
          className={`text-sm mt-1 ${
            unitsGrowth.startsWith("-") ? "text-red-1" : "text-green-600"
          }`}
        >
          {unitsGrowth} miesiąc do miesiąca
        </p>
      </div>
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow grid place-items-left">
        <h4 className="text-sm text-gray-500">Ilość dostępnego produktu</h4>
        <p className="text-2xl font-bold">{availableProductCount}</p>
      </div>

      {/* Line Chart */}
      <div className="col-span-2 border rounded-xl p-6 bg-white shadow focus:outline-none focus:ring-0">
        <h4 className="text-sm text-gray-500 mb-4">
          Sprzedaż w ostatnich dniach
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Clients */}
      <div className="col-span-1 border rounded-xl p-6 bg-white shadow">
        <h4 className="text-sm text-gray-500 mb-4">Klienci</h4>
        <ul className="space-y-4">
          {clients.map((client, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="bg-gray-200 p-2 rounded-full">
                <User size={24} className="text-gray-600" />
              </div>
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
            <XAxis dataKey="warehouse" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#000" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}