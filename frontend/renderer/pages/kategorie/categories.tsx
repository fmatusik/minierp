import React, { useState, useEffect } from "react";
import { Boxes } from "lucide-react";
import CategoryPage from "./page";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
export default function KategoriePage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/category/all");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Nie udało się załadować kategorii.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories
    .filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const openAddPanel = () => {
    const width = 1200;
    const height = 900;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    window.open("/kategorie/add", "_blank", features);
  };

  const handleReload = () => {
    fetchCategories();
  }

  if (category) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setCategory(null)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Powrót do listy kategorii
        </button>
        <CategoryPage categoryId={category.id} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kategorie</h1>
          <p className="text-gray-600 text-sm">Grupy produktów w Twoim katalogu</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md" onClick={openAddPanel}>
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
          className="px-3 py-2 border rounded-md w-full sm:w-64"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded-md w-full sm:w-64"
        >
          <option value="desc">Najnowsze</option>
          <option value="asc">Najstarsze</option>
        </select><button
          onClick={() => handleReload()}
          title="Odśwież zamówienia"
          className="p-2 transition-all hover:-rotate-180 hover:text-primaryhover"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p>Ładowanie kategorii...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setCategory(cat)}
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
      )}
    </div>
  );
}
