import React from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Laptop HP EliteBook",
    category: "Laptopy",
    price: "4 599 PLN",
    status: "Aktywny",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Smartfon Samsung Galaxy",
    category: "Smartfony",
    price: "3 299 PLN",
    status: "Aktywny",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Słuchawki Bose 700",
    category: "Słuchawki",
    price: "1 199 PLN",
    status: "Wycofany",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function ProduktyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produkty</h1>
          <p className="text-gray-600 text-sm">Zarządzaj asortymentem i cenami produktów</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">+ Nowy produkt</button>
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
          <option>Laptopy</option>
          <option>Smartfony</option>
          <option>Słuchawki</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-gray-200 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-800">{product.price}</p>
              <span
                className={`inline-block text-xs px-2 py-1 rounded ${
                  product.status === "Aktywny"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
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
