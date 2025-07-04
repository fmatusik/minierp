import React, { useState } from "react";
import Head from "next/head";
import {
  Home,
  Search,
  PackageOpen,
  ListOrdered,
  Users,
  Warehouse,
  Box,
  Boxes,
  Settings,
  Database,
  Truck
} from "lucide-react";
import ZamowieniaPage from "./orders";
import ProduktyPage from "./products";
import KategoriePage from "./categories";
import KlienciPage from "./clients";
import StockLevelsPage from "./stockLevels";
import StockMovesPage from "./stockMoves";
import WarehousesPage from "./warehouses";
import StatusesPage from "./statuses";
import SystemDataPage from "./systemData";

export default function HomePage() {
  const [activeView, setActiveView] = useState("home");

  const menuItems = [
    {
      section: null,
      items: [
        { label: "Strona główna", key: "home", icon: <Home size={18} /> },
        { label: "Wyszukaj", key: "search", icon: <Search size={18} /> },
        { label: "Zamówienia", key: "orders", icon: <ListOrdered size={18} /> },
        { label: "Produkty", key: "products", icon: <PackageOpen size={18} /> },
        { label: "Kategorie", key: "categories", icon: <Boxes size={18} /> },
        { label: "Klienci", key: "clients", icon: <Users size={18} /> },
      ],
    },
    {
      section: "Magazyn",
      items: [
        { label: "Stany magazynowe", key: "stockLevels", icon: <Box size={18} /> },
        { label: "Ruchy magazynowe", key: "stockMoves", icon: <Truck size={18} /> },
        { label: "Magazyny", key: "warehouses", icon: <Warehouse size={18} /> },
      ],
    },
    {
      section: "Ustawienia",
      items: [
        { label: "Statusy", key: "statuses", icon: <Settings size={18} /> },
        { label: "Dane systemowe", key: "systemData", icon: <Database size={18} /> },
      ],
    },
  ];

  const renderContent = () => {
    if (activeView === "home") {
      return (
        <>
          {/* Tabs */}
          {/*<div className="flex space-x-4 mb-6">
            <button className="px-4 py-1 bg-gray-100 rounded">Tab</button>
            <button className="px-4 py-1 bg-gray-100 rounded">Tab</button>
            <button className="px-4 py-1 bg-gray-100 rounded">Tab</button>
          </div>*/}

          {/* Produkty */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">Produkty</h1>
              <p className="text-gray-600 text-sm cursor-pointer hover:text-primary transition-all">Zobacz więcej</p>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-md">Button</button>
          </div>

          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden shadow-sm border">
                  <div className="bg-gray-200 h-40"></div>
                  <div className="p-4">
                    <h3 className="font-semibold">Produkt {item}</h3>
                    <p className="text-sm text-gray-500">Opis produktu</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kategorie */}
          <section>
            <div className="flex flex-col mb-4 gap-1">
              <h2 className="text-2xl font-bold">Kategorie</h2>
              <p className="text-gray-600 text-sm cursor-pointer hover:text-primary transition-all">Zobacz więcej</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["Laptopy", "Smartfony", "Słuchawki", "Monitory", "Tablety", "Smartwatche"].map(
                (category, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="bg-gray-300 h-28 flex items-center justify-center" />
                    <div className="p-2">
                      <h3 className="font-semibold text-sm">{category}</h3>
                      <p className="text-xs text-gray-500">Zobacz produkty</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </>
      );
    }

    if(activeView == "orders"){
      return(
        <ZamowieniaPage/>
      )
    }

    if(activeView == "products") {
      return (
        <ProduktyPage/>
      )
    }

    if(activeView == "categories") {
      return <KategoriePage/>
    }

    if(activeView == "clients") {
      return <KlienciPage/>
    }

    if(activeView == "stockLevels") {
      return <StockLevelsPage/>
    }

    if(activeView == "stockMoves") {
      return <StockMovesPage/>
    }

    if(activeView == "warehouses") {
      return <WarehousesPage/>
    }
    if(activeView == "statuses") {
      return <StatusesPage/>
    }

    if(activeView == "systemData") {
      return <SystemDataPage/>
    }

    // Placeholdery dla innych zakładek
    return <h1 className="text-2xl font-bold">{menuItems.flatMap(s => s.items).find(i => i.key === activeView)?.label}</h1>;
  };

  return (
    <>
      <Head>
        <title>Home - Zakładki</title>
      </Head>

    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">

        {/* Sidebar */}
        <aside className="w-64 border-r p-4 space-y-6">
          <div className="text-2xl font-bold px-2 text-primary">Bizo</div>
          {menuItems.map((section, idx) => (
            <div key={idx} className="space-y-2">
              {section.section && (
                <div className="text-xs font-semibold text-gray-500 uppercase px-2">
                  {section.section}
                </div>
              )}
              {section.items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveView(item.key)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition ${
                    activeView === item.key ? "bg-gray-200 font-medium text-primary" : ""
                  }`}
                >
                  <div className="mr-2">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 h-full">
          {renderContent()}</main>
      </div>
    </>
  );
}
