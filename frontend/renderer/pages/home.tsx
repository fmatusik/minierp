import React, { useEffect, useState } from "react";
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
import ZamowieniaPage from "./zamowienia/orders";
import ProduktyPage from "./produkty/products";
import KategoriePage from "./kategorie/categories";
import KlienciPage from "./klienci/clients";
import StockLevelsPage from "./stany_magazynowe/stockLevels";
import StockMovesPage from "./ruchy_magazynowe/stockMoves";
import WarehousesPage from "./magazyny/warehouses";
import StatusesPage from "./statusy/statuses";
import axios from "axios";
import clsx from "clsx";
import { RefreshCcw } from "lucide-react";

export default function HomePage() {
  const [activeView, setActiveView] = useState("home");
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);

  const menuItems = [
    {
      section: null,
      items: [
        { label: "Strona główna", key: "home", icon: <Home size={18} /> },
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
      ],
    },
  ];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/products/all`)
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie ładowania produktów");
    })
  }


  const fetchCategories = () => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/category/all`)
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => {
      console.error(err);
      window.ipc.invoke("show-alert", "Wystąpił nieoczekiwany problem w trakcie ładowania kategorii");
    })
  }

  const handleReload = () => {
    fetchProducts();
    fetchCategories();
  }

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
                  <button
          onClick={handleReload}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>

          {/* Produkty */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">Produkty</h1>
              <p className="text-gray-600 text-sm cursor-pointer hover:text-primary transition-all" onClick={() => setActiveView("products")}>Zobacz więcej</p>
            </div>
          </div>

          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0,4).map((product) => (
                        <div
                          key={product.id}
                          className="cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <div className="h-40 bg-gray-200 overflow-hidden">
                            <img
                            src={
                              product.imagesDto?.[0]?.path
                                ? `http://localhost:8080${product.imagesDto[0].path}`
                                : "placeholder"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
              
                          </div>
                          <div className="p-4 space-y-1">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.categoryDto?.name}</p>
                            <p className="text-sm text-gray-800">{product.price}</p>
                            <span
                              className={clsx(
                                "inline-block text-xs px-2 py-1 rounded",
                                product.statusDto?.color
                              )}
                            >
                              {product.statusDto?.name || "Brak statusu"}
                            </span>
                          </div>
                        </div>
                      ))}
            </div>
          </section>

          {/* Kategorie */}
          <section>
            <div className="flex flex-col mb-4 gap-1">
              <h2 className="text-2xl font-bold">Kategorie</h2>
              <p className="text-gray-600 text-sm cursor-pointer hover:text-primary transition-all" onClick={() => setActiveView("categories")}>Zobacz więcej</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(0,6).map((cat) => (
                          <div
                            key={cat.id}
                            className="rounded-lg border shadow-sm p-4 hover:shadow-md transition flex flex-col items-center text-center cursor-pointer"
                          >
                          <div className={`rounded-full p-3 mb-3 ${cat.color}`}>
                              <Boxes size={28} className="text-white" />
                            </div>
                            <h3 className="font-semibold text-sm">{cat.name}</h3>
                            <p className="text-xs text-gray-500">
                              {cat.productCount ?? 0} produktów
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              Dodano: {new Date(cat.data.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
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
