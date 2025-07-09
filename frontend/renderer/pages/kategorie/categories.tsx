import React, { useState } from "react";
import { Boxes } from "lucide-react";
import CategoryPage from "./page";

const dummyCategories = [
  { id: 1, name: "Laptopy", productsCount: 12, createdAt: "2024-12-01" },
  { id: 2, name: "Smartfony", productsCount: 18, createdAt: "2025-01-15" },
  { id: 3, name: "Monitory", productsCount: 7, createdAt: "2025-02-10" },
  { id: 4, name: "Tablety", productsCount: 5, createdAt: "2025-03-20" },
  { id: 5, name: "Smartwatche", productsCount: 9, createdAt: "2025-04-05" },
  { id: 6, name: "Słuchawki", productsCount: 14, createdAt: "2025-05-30" },
];

export default function KategoriePage() {
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  const filteredCategories = dummyCategories
    .filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  if (category) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setCategory(null)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Powrót do listy kategorii
        </button>
        <CategoryPage category={category} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kategorie</h1>
          <p className="text-gray-600 text-sm">
            Grupy produktów w Twoim katalogu
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          + Nowa kategoria
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Szukaj kategorii..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-64 outline-none"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-64 outline-none"
        >
          <option value="desc">Najnowsze</option>
          <option value="asc">Najstarsze</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setCategory(cat)}
            className="rounded-lg border shadow-sm p-4 hover:shadow-md transition flex flex-col items-center text-center cursor-pointer"
          >
            <div className="bg-gray-200 rounded-full p-3 mb-3">
              <Boxes size={28} className="text-gray-600" />
            </div>
            <h3 className="font-semibold text-sm">{cat.name}</h3>
            <p className="text-xs text-gray-500">
              {cat.productsCount} produktów
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Dodano: {new Date(cat.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
