import React, { useState } from "react";
import { products, images, categories } from '../dummyData'; // Import from dummyData.js
import ProductDashboard from "./dashboard";
import EditProduct from "./edit";
import ProductPage from "./page";
import clsx from 'clsx';

const tabs = ['Podsumowanie', 'Strona produktu', 'Edycja'];

export default function ProduktyPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Podsumowanie');

  // Map categories to products for easier lookup
  const categoryMap = categories.reduce((acc, category) => ({
    ...acc,
    [category.product.id]: category.name
  }), {});

  // Map images to products for easier lookup
  const imageMap = images.reduce((acc, image) => ({
    ...acc,
    [image.product.id]: image.path
  }), {});

  const openAddPanel = () => {
        const width = 1200;
    const height = 900;

    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    window.open(`/produkty/add`, "_blank", features);
  }
 
  // Prepare product data for display
  const formattedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    category: categoryMap[product.id] || 'Brak kategorii', // Use category from categories array
    price: `${product.price.toFixed(2)} PLN`, // Format price with PLN
    status: product.status.name, // Use status name (Aktywne, Nieaktywne, Oczekujące)
    image: imageMap[product.id] || 'https://via.placeholder.com/300x200' // Use image path or fallback
  }));

  if (selectedProduct) {
    // Dashboard widoku produktu
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
        {activeTab === "Podsumowanie" && <ProductDashboard />}
        {activeTab === "Edycja" && <EditProduct product={selectedProduct} />}
        {activeTab === "Strona produktu" && <ProductPage selectedProduct={selectedProduct} />}
      </div>
    );
  }

  // Widok listy produktów
  return (
    <div className="space-y-6">
      {/* Header */}
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
        />
        <select className="px-3 py-2 border rounded-md">
          <option>Kategoria</option>
          {Object.values(categories).map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {formattedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-800">{product.price}</p>
              <span
                className={clsx(
                  'inline-block text-xs px-2 py-1 rounded',
                  product.status === "Aktywny"
                    ? "bg-green-100 text-green-800"
                    : product.status === "Nieaktywne"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                )}
              >
                {product.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}