import React, { useEffect, useState } from "react";
import ProductDashboard from "./dashboard";
import EditProduct from "./edit";
import ProductPage from "./page";
import { RefreshCcw } from "lucide-react";
import clsx from 'clsx';
import axios from 'axios';

const tabs = ['Podsumowanie', 'Strona produktu', 'Edycja'];

export default function ProduktyPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Podsumowanie');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [topProductId, setTopProductId] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = () => {
  axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/products/all`)
    .then((res) => {
      const products = res.data;

      // Oblicz sumę zamówień każdego produktu
      const productWithOrderCount = products.map(p => ({
        ...p,
        totalOrders: p.orderItemDtos?.reduce((sum, item) => sum + item.quantity, 0) || 0
      }));  

      // Znajdź produkt z największą ilością zamówień
      const topProduct = productWithOrderCount.reduce((max, p) =>
        p.totalOrders > max.totalOrders ? p : max, productWithOrderCount[0]
      );

      setProducts(productWithOrderCount); // aktualizacja produktów z totalOrders
      setTopProductId(topProduct?.id);    // ustawienie ID topowego produktu
    })
    .catch((err) => {
      console.error("Błąd podczas pobierania produktów:", err);
    });
};


  const handleReload = () =>{
    fetchProducts();
  }

  const openAddPanel = () => {
    const width = 1200;
    const height = 900;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open(`/produkty/add`, "_blank", features);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryDto?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.categoryDto?.name === selectedCategory;

    const matchesStatus =
      !selectedStatus || product.statusDto?.name === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (selectedProduct) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedProduct(null)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Powrót do listy produktów
        </button>
        <br />
        <div className="inline-flex rounded-md bg-gray-100 p-1 relative left-[50%] translate-x-[-50%]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200',
                activeTab === tab
                  ? 'bg-white rounded-md shadow-sm'
                  : 'hover:text-black'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Podsumowanie" && <ProductDashboard productId={selectedProduct.id} />}
        {activeTab === "Edycja" && <EditProduct productId={selectedProduct.id} />}
        {activeTab === "Strona produktu" && <ProductPage selectedProduct={selectedProduct.id} />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produkty</h1>
          <p className="text-gray-600 text-sm">Zarządzaj asortymentem i cenami produktów</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md" onClick={openAddPanel}>+ Nowy produkt</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj po nazwie lub kategorii..."
          className="px-3 py-2 border rounded-md w-full sm:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Wszystkie kategorie</option>
          {[...new Set(products.map(p => p.categoryDto?.name))].filter(Boolean).map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded-md"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Wszystkie statusy</option>
          {[...new Set(products.map(p => p.statusDto?.name))].filter(Boolean).map((status, i) => (
            <option key={i} value={status}>{status}</option>
          ))}
        </select>
                <button
          onClick={handleReload}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
      <div
        key={product.id}
        onClick={() => setSelectedProduct(product)}
        className={clsx(
          "cursor-pointer border rounded-lg transition hover:shadow-md",
          product.id === topProductId
            ? "shadow-[0_0_10px] shadow-primary "
            : "shadow-sm"
        )}
      >

            <div className="h-40 bg-gray-200 overflow-hidden">
              <img
              src={
                product.imagesDto?.[0]?.path
                  ? `${process.env.NEXT_PUBLIC_SERVER}${product.imagesDto[0].path}`
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
    </div>
  );
}
